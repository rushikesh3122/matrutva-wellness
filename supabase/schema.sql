-- =====================================================================
-- Matrutva Wellness – database setup (run ONCE in Supabase → SQL Editor)
-- Safe to re-run: every statement checks before creating.
-- =====================================================================

-- ---------- Admins: who may use /admin ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins for select to authenticated using (user_id = auth.uid());

-- ---------- Products: price, stock, visibility ----------
-- Descriptions, photos and label text stay in the website code (src/data/products.ts);
-- this table holds what changes often.
create table if not exists public.products (
  slug text primary key,
  name text not null,
  price integer not null check (price >= 0),          -- selling price in ₹
  mrp integer check (mrp is null or mrp >= 0),         -- optional MRP for strike-through
  active boolean not null default true,                -- false = hidden from shop
  track_stock boolean not null default false,          -- true = use the stock number below
  stock integer not null default 0,
  low_stock_alert integer not null default 10,
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;

drop policy if exists "anyone reads active products" on public.products;
create policy "anyone reads active products" on public.products for select to anon, authenticated using (active or public.is_admin());
drop policy if exists "admins manage products" on public.products;
create policy "admins manage products" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.products (slug, name, price)
values ('spirulina-capsules', 'Spirulina Capsules', 649)
on conflict (slug) do nothing;

-- ---------- Stock history ----------
create table if not exists public.stock_movements (
  id bigint generated always as identity primary key,
  product_slug text not null references public.products (slug) on update cascade,
  change integer not null,                 -- +50 new batch, -2 order, -1 damaged …
  reason text not null,
  batch text,
  expiry date,
  order_number text,
  created_at timestamptz not null default now(),
  created_by uuid default auth.uid()
);
alter table public.stock_movements enable row level security;
drop policy if exists "admins manage stock" on public.stock_movements;
create policy "admins manage stock" on public.stock_movements for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Every movement updates products.stock
create or replace function public.apply_stock_movement()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.products set stock = stock + new.change, updated_at = now() where slug = new.product_slug;
  return new;
end $$;
drop trigger if exists stock_movement_applied on public.stock_movements;
create trigger stock_movement_applied after insert on public.stock_movements
for each row execute function public.apply_stock_movement();

-- ---------- Orders ----------
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  number text not null unique,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text,
  address1 text not null,
  address2 text,
  city text not null,
  state text not null,
  pincode text not null,
  gstin text,
  notes text,
  subtotal integer not null,
  shipping integer not null default 0,
  total integer not null,
  tracking text,
  admin_notes text,
  stock_deducted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders (id) on delete cascade,
  product_slug text not null,
  name text not null,
  price integer not null,
  quantity integer not null check (quantity between 1 and 50)
);
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
drop policy if exists "admins manage orders" on public.orders;
create policy "admins manage orders" on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins read order items" on public.order_items;
create policy "admins read order items" on public.order_items for select to authenticated using (public.is_admin());

-- Confirming an order takes its items out of stock; cancelling a confirmed order puts them back.
create or replace function public.order_stock_sync()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if new.status in ('confirmed', 'packed', 'shipped', 'delivered') and not old.stock_deducted then
    insert into public.stock_movements (product_slug, change, reason, order_number)
      select oi.product_slug, -oi.quantity, 'Order confirmed', new.number
      from public.order_items oi join public.products p on p.slug = oi.product_slug
      where oi.order_id = new.id and p.track_stock;
    new.stock_deducted := true;
  elsif new.status = 'cancelled' and old.stock_deducted then
    insert into public.stock_movements (product_slug, change, reason, order_number)
      select oi.product_slug, oi.quantity, 'Order cancelled', new.number
      from public.order_items oi join public.products p on p.slug = oi.product_slug
      where oi.order_id = new.id and p.track_stock;
    new.stock_deducted := false;
  end if;
  return new;
end $$;
drop trigger if exists order_status_stock on public.orders;
create trigger order_status_stock before update of status on public.orders
for each row execute function public.order_stock_sync();

-- ---------- place_order: the ONLY way the public website writes ----------
-- Prices come from the products table (never trusted from the browser).
create or replace function public.place_order(customer jsonb, items jsonb)
returns json language plpgsql security definer set search_path = public as $$
declare
  v_order_id bigint;
  v_number text;
  v_subtotal integer := 0;
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

  -- validate items and work out the subtotal
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

  v_number := 'MW-' || to_char(now() at time zone 'Asia/Kolkata', 'YYMMDD') || '-' || lpad((floor(random() * 10000))::text, 4, '0');
  while exists (select 1 from public.orders where number = v_number) loop
    v_number := 'MW-' || to_char(now() at time zone 'Asia/Kolkata', 'YYMMDD') || '-' || lpad((floor(random() * 10000))::text, 4, '0');
  end loop;

  insert into public.orders (number, first_name, last_name, phone, email, address1, address2, city, state, pincode, gstin, notes, subtotal, total)
  values (
    v_number,
    left(customer->>'first_name', 80), left(coalesce(customer->>'last_name', ''), 80), customer->>'phone',
    nullif(left(customer->>'email', 120), ''), left(customer->>'address1', 200), nullif(left(customer->>'address2', 200), ''),
    left(customer->>'city', 80), left(coalesce(customer->>'state', ''), 80), customer->>'pincode',
    nullif(upper(left(customer->>'gstin', 15)), ''), nullif(left(customer->>'notes', 500), ''),
    v_subtotal, v_subtotal
  ) returning id into v_order_id;

  insert into public.order_items (order_id, product_slug, name, price, quantity)
    select v_order_id, p.slug, p.name, p.price, (i->>'quantity')::integer
    from jsonb_array_elements(items) i join public.products p on p.slug = i->>'slug';

  return json_build_object('number', v_number, 'total', v_subtotal);
end $$;

revoke all on function public.place_order(jsonb, jsonb) from public;
grant execute on function public.place_order(jsonb, jsonb) to anon, authenticated;

-- Data API access (RLS above decides what each role can actually see)
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select, insert on public.stock_movements to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- =====================================================================
-- LAST STEP – make yourself an admin.
-- 1. Supabase → Authentication → Users → "Add user" → enter your email + a strong password
--    (tick "Auto Confirm User").
-- 2. Replace the email below with that email and run just these two lines:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'YOUR-EMAIL@example.com' on conflict do nothing;
-- =====================================================================
