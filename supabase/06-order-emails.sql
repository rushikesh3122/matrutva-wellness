-- Order emails: lets the website send one "order confirmed" email (to the customer) and one
-- "new order" alert (to you) per order. Run once in Supabase → SQL Editor, after 05. Safe to run again.

alter table public.orders add column if not exists emailed_at timestamptz;

-- Returns an order's details for the emails, only to someone who knows its number + phone,
-- only within 30 minutes of placing it, and only once (so it can't be used to send spam).
create or replace function public.claim_order_email(order_number text, phone text)
returns json language plpgsql volatile security definer set search_path = public as $$
declare
  o public.orders;
begin
  update public.orders x
     set emailed_at = now()
   where upper(x.number) = upper(trim(order_number))
     and x.phone = right(regexp_replace(phone, '\D', '', 'g'), 10)
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

notify pgrst, 'reload schema';
