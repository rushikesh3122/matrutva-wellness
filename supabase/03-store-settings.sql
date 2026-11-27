-- Store settings managed from /admin → Settings, plus shipping and payment method on orders.
-- Run once in Supabase → SQL Editor, after schema.sql. Safe to run again.

create table if not exists public.settings (
  id integer primary key default 1 check (id = 1),           -- always exactly one row
  whatsapp text not null default '',                         -- digits with country code, e.g. 919876543210
  phone text not null default '',
  email text not null default 'care@matrutvawellness.com',
  hours text not null default 'Mon–Sat, 10 AM – 6 PM IST',
  address text not null default '',
  instagram text not null default '',
  facebook text not null default '',
  youtube text not null default '',
  announcements text[] not null default '{}',
  shipping_fee integer check (shipping_fee is null or shipping_fee >= 0),            -- null = confirmed with the customer
  free_shipping_above integer check (free_shipping_above is null or free_shipping_above > 0),
  cod_enabled boolean not null default false,
  fssai text not null default '',
  updated_at timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

alter table public.settings enable row level security;
drop policy if exists "anyone reads settings" on public.settings;
create policy "anyone reads settings" on public.settings for select to anon, authenticated using (true);
drop policy if exists "admins update settings" on public.settings;
create policy "admins update settings" on public.settings for update to authenticated using (public.is_admin()) with check (public.is_admin());
grant select on public.settings to anon, authenticated;
grant update on public.settings to authenticated;

alter table public.orders add column if not exists shipping integer not null default 0;
alter table public.orders add column if not exists payment_method text not null default 'prepaid';

-- Shipping for a subtotal, using the settings (null = not priced yet, confirmed with the customer).
create or replace function public.shipping_for(subtotal integer)
returns integer language sql stable security definer set search_path = public as $$
  select case
    when s.shipping_fee is null then null
    when s.free_shipping_above is not null and subtotal >= s.free_shipping_above then 0
    else s.shipping_fee
  end from public.settings s where s.id = 1;
$$;

-- place_order, now with shipping and payment method. Prices and shipping come from the database.
create or replace function public.place_order(customer jsonb, items jsonb)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_order_id bigint;
  v_number text;
  v_subtotal integer := 0;
  v_shipping integer;
  v_payment text;
  v_item jsonb;
  v_product public.products;
  v_qty integer;
begin
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 or jsonb_array_length(items) > 20 then
    raise exception 'Cart is empty or too large';
  end if;
  if coalesce(customer->>'first_name', '') = '' or coalesce(customer->>'phone', '') !~ '^[6-9][0-9]{9}$'
     or coalesce(customer->>'pincode', '') !~ '^[1-9][0-9]{5}$' or coalesce(customer->>'address1', '') = ''
     or coalesce(customer->>'city', '') = '' then
    raise exception 'Missing or invalid delivery details';
  end if;

  for v_item in select * from jsonb_array_elements(items) loop
    v_qty := (v_item->>'quantity')::integer;
    select * into v_product from public.products where slug = v_item->>'slug' and active;
    if not found then raise exception 'Product % is not available', v_item->>'slug'; end if;
    if v_qty is null or v_qty < 1 or v_qty > 50 then raise exception 'Invalid quantity'; end if;
    if v_product.track_stock and v_product.stock < v_qty then
      raise exception 'Only % left of %', greatest(v_product.stock, 0), v_product.name;
    end if;
    v_subtotal := v_subtotal + v_product.price * v_qty;
  end loop;

  v_shipping := coalesce(public.shipping_for(v_subtotal), 0);
  v_payment := case
    when customer->>'payment' = 'cod' and (select cod_enabled from public.settings where id = 1) then 'cod'
    else 'prepaid'
  end;

  v_number := 'MW-' || to_char(now() at time zone 'Asia/Kolkata', 'YYMMDD') || '-' || lpad((floor(random() * 10000))::text, 4, '0');
  while exists (select 1 from public.orders where number = v_number) loop
    v_number := 'MW-' || to_char(now() at time zone 'Asia/Kolkata', 'YYMMDD') || '-' || lpad((floor(random() * 10000))::text, 4, '0');
  end loop;

  insert into public.orders (number, first_name, last_name, phone, email, address1, address2, city, state, pincode, gstin, notes,
                             subtotal, shipping, total, payment_method)
  values (
    v_number,
    left(customer->>'first_name', 80), left(coalesce(customer->>'last_name', ''), 80), customer->>'phone',
    nullif(left(customer->>'email', 120), ''), left(customer->>'address1', 200), nullif(left(customer->>'address2', 200), ''),
    left(customer->>'city', 80), left(coalesce(customer->>'state', ''), 80), customer->>'pincode',
    nullif(upper(left(customer->>'gstin', 15)), ''), nullif(left(customer->>'notes', 500), ''),
    v_subtotal, v_shipping, v_subtotal + v_shipping, v_payment
  ) returning id into v_order_id;

  insert into public.order_items (order_id, product_slug, name, price, quantity)
    select v_order_id, p.slug, p.name, p.price, (i->>'quantity')::integer
    from jsonb_array_elements(items) i join public.products p on p.slug = i->>'slug';

  return json_build_object('number', v_number, 'subtotal', v_subtotal, 'shipping', v_shipping, 'total', v_subtotal + v_shipping, 'payment', v_payment);
end $$;

revoke all on function public.place_order(jsonb, jsonb) from public;
grant execute on function public.place_order(jsonb, jsonb) to anon, authenticated;
revoke all on function public.shipping_for(integer) from public;
grant execute on function public.shipping_for(integer) to anon, authenticated;
