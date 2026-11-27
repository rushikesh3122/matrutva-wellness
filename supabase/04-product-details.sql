-- Product text edited in /admin → Products (and new products added there).
-- Run once in Supabase → SQL Editor, after 02-product-images.sql. Safe to run again.
-- Empty (null) columns mean "use the text built into the website code".

alter table public.products add column if not exists eyebrow text;
alter table public.products add column if not exists headline text;
alter table public.products add column if not exists short_description text;
alter table public.products add column if not exists description text;
alter table public.products add column if not exists quantity text;          -- pack size, e.g. "60 capsules"
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists featured boolean not null default false;
alter table public.products add column if not exists sort integer not null default 0;
alter table public.products add column if not exists facts jsonb;            -- [{ "value": "100%", "label": "Organic" }]
alter table public.products add column if not exists label jsonb;            -- { usage, ingredients, nutritionTitle, nutrition: [{label, value}], storage, warnings: [] }
alter table public.products add column if not exists faq jsonb;              -- [{ "q": "…", "a": "…" }]

-- The current product stays featured on the home page.
update public.products set featured = true where slug = 'spirulina-capsules' and not featured;

-- Slugs (web addresses) are lowercase words joined by hyphens.
alter table public.products drop constraint if exists products_slug_format;
alter table public.products add constraint products_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
