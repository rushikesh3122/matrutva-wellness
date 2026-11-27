-- Product photos managed from /admin.
-- Run once in Supabase → SQL Editor, after schema.sql. Safe to run again.

-- List of photos per product: [{ "src": "https://…", "alt": "…" }, …]
-- Empty list = the website uses the built-in photos from the code.
alter table public.products add column if not exists images jsonb not null default '[]'::jsonb;

-- Public bucket for the photo files (anyone can view, only admins can change).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins upload product images" on storage.objects;
create policy "admins upload product images" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admins update product images" on storage.objects;
create policy "admins update product images" on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admins delete product images" on storage.objects;
create policy "admins delete product images" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admins list product images" on storage.objects;
create policy "admins list product images" on storage.objects for select to authenticated
  using (bucket_id = 'product-images' and public.is_admin());
