-- Fixes from the pre-launch audit. Run once in Supabase → SQL Editor, after 06. Safe to run again.
-- 1. Track order ignored the phone number (a column had the same name as the input), so an order
--    number alone was enough to see an order's status and items. Now both must match.
-- 2. The order-email function failed for the same reason, so no order emails were sent.
-- 3. An order listing the same product twice could get past the stock check.

create or replace function public.track_order(order_number text, phone text)
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'number', o.number,
    'status', o.status,
    'tracking', o.tracking,
    'created_at', o.created_at,
    'subtotal', o.subtotal,
    'shipping', o.shipping,
    'total', o.total,
    'payment', o.payment_method,
    'city', o.city,
    'items', (select json_agg(json_build_object('name', i.name, 'quantity', i.quantity, 'price', i.price)) from public.order_items i where i.order_id = o.id)
  )
  from public.orders o
  where upper(o.number) = upper(trim(track_order.order_number))
    and o.phone = right(regexp_replace(track_order.phone, '\D', '', 'g'), 10)
  limit 1;
$$;
revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated;

create or replace function public.claim_order_email(order_number text, phone text)
returns json language plpgsql volatile security definer set search_path = public as $$
declare
  o public.orders;
begin
  update public.orders x
     set emailed_at = now()
   where upper(x.number) = upper(trim(claim_order_email.order_number))
     and x.phone = right(regexp_replace(claim_order_email.phone, '\D', '', 'g'), 10)
     and x.emailed_at is null
     and x.created_at > now() - interval '30 minutes'
  returning * into o;
  if o.id is null then
    return null;
  end if;
  return json_build_object(
    'number', o.number,
    'created_at', o.created_at,
    'first_name', o.first_name,
    'last_name', o.last_name,
    'phone', o.phone,
    'email', o.email,
    'address1', o.address1,
    'address2', o.address2,
    'city', o.city,
    'state', o.state,
    'pincode', o.pincode,
    'gstin', o.gstin,
    'notes', o.notes,
    'subtotal', o.subtotal,
    'shipping', o.shipping,
    'total', o.total,
    'payment', o.payment_method,
    'items', (select json_agg(json_build_object('name', i.name, 'quantity', i.quantity, 'price', i.price) order by i.id)
                from public.order_items i where i.order_id = o.id)
  );
end;
$$;
revoke all on function public.claim_order_email(text, text) from public;
grant execute on function public.claim_order_email(text, text) to anon, authenticated;

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
  -- The same product twice would get past the stock check, so each product may appear once.
  if (select count(distinct x->>'slug') from jsonb_array_elements(items) x) <> jsonb_array_length(items) then
    raise exception 'Cart has the same product twice';
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

notify pgrst, 'reload schema';
