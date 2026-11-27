-- Order tracking for customers, and customer reviews managed from /admin.
-- Run once in Supabase → SQL Editor, after 03-store-settings.sql. Safe to run again.

-- ---------- Track order: a customer sees one order by its number + the phone used ----------
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

-- ---------- Reviews: added by you in /admin, shown only once approved ----------
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  name text not null check (length(name) between 1 and 80),
  city text check (city is null or length(city) <= 80),
  product_slug text references public.products (slug) on delete set null,
  rating integer check (rating is null or rating between 1 and 5),
  quote text not null check (length(quote) between 5 and 1000),
  source text,                                   -- where it came from: WhatsApp, email, Amazon… (private)
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
drop policy if exists "anyone reads approved reviews" on public.reviews;
create policy "anyone reads approved reviews" on public.reviews for select to anon, authenticated using (approved or public.is_admin());
drop policy if exists "admins manage reviews" on public.reviews;
create policy "admins manage reviews" on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());
-- The public can read every column except where a review came from.
revoke select on public.reviews from anon;
grant select (id, name, city, product_slug, rating, quote, approved, created_at) on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
