import { cacheLife, cacheTag } from "next/cache";
import { products as catalogue } from "@/data/products";
import type { Product, ProductImage } from "@/types/product";

/** A row of the Supabase `products` table. Text columns are null until edited in /admin. */
export type ProductRow = {
  slug: string;
  name: string;
  price: number;
  mrp: number | null;
  active: boolean;
  track_stock: boolean;
  stock: number;
  images?: ProductImage[] | null;
  eyebrow?: string | null;
  headline?: string | null;
  short_description?: string | null;
  description?: string | null;
  quantity?: string | null;
  badge?: string | null;
  featured?: boolean;
  sort?: number;
  facts?: Product["facts"] | null;
  label?: Product["label"] | null;
  faq?: Product["faq"] | null;
};

const text = (v: string | null | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback);
const list = <T,>(v: T[] | null | undefined, fallback: T[] | undefined) => (Array.isArray(v) ? v : fallback);

/** Database row on top of the built-in catalogue entry (or on its own, for products added in /admin). */
export function mergeProduct(row: ProductRow, base?: Product): Product | null {
  const images = (Array.isArray(row.images) ? row.images : []).filter((i) => i && typeof i.src === "string" && i.src);
  const finalImages = images.length ? images.map((i) => ({ src: i.src, alt: i.alt || row.name })) : (base?.images ?? []);
  // A product added in /admin shows on the site only once it has a photo and a description.
  if (!base && (finalImages.length === 0 || !row.description?.trim())) return null;
  return {
    ...(base ?? { id: row.slug, tags: [] }),
    id: base?.id ?? row.slug,
    slug: row.slug,
    name: text(row.name, base?.name ?? row.slug),
    eyebrow: text(row.eyebrow, base?.eyebrow ?? "") || undefined,
    headline: text(row.headline, base?.headline ?? "") || undefined,
    shortDescription: text(row.short_description, base?.shortDescription ?? ""),
    description: text(row.description, base?.description ?? ""),
    quantity: text(row.quantity, base?.quantity ?? ""),
    badge: text(row.badge, base?.badge ?? "") || undefined,
    featured: base && row.featured === undefined ? base.featured : Boolean(row.featured),
    facts: list(row.facts, base?.facts),
    label: row.label ?? base?.label,
    faq: list(row.faq, base?.faq),
    price: row.price,
    mrp: row.mrp,
    images: finalImages,
    inStock: row.active && !(row.track_stock && row.stock <= 0),
  };
}

/**
 * Products from the admin dashboard (Supabase) merged with the built-in catalogue.
 * Cached, and refreshed as soon as something is saved in /admin; if the database can't be
 * reached, the site falls back to src/data/products.ts.
 */
export async function getLiveProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return catalogue;

  try {
    const res = await fetch(`${url}/rest/v1/products?select=*&order=sort.asc,name.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return catalogue;
    const rows = (await res.json()) as ProductRow[];
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    const known = new Set(catalogue.map((p) => p.slug));
    // Hidden products aren't returned to the public, so a missing row means "not for sale".
    const fromCatalogue = catalogue.map((p) => {
      const row = bySlug.get(p.slug);
      return row ? (mergeProduct(row, p) as Product) : { ...p, inStock: false };
    });
    const added = rows.filter((r) => !known.has(r.slug)).map((r) => mergeProduct(r)).filter((p): p is Product => p !== null);
    return [...fromCatalogue, ...added];
  } catch {
    return catalogue;
  }
}

export async function getLiveProduct(slug: string) {
  return (await getLiveProducts()).find((p) => p.slug === slug);
}
