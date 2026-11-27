import { cacheLife, cacheTag } from "next/cache";
import { products as catalogue } from "@/data/products";
import type { Product } from "@/types/product";

type Row = { slug: string; price: number; mrp: number | null; active: boolean; track_stock: boolean; stock: number };

/**
 * Prices and stock from the admin dashboard (Supabase), merged into the product catalogue.
 * Cached for a few minutes, so pages stay fast; if the database can't be reached,
 * the site falls back to the values in src/data/products.ts.
 */
export async function getLiveProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return catalogue;

  try {
    const res = await fetch(`${url}/rest/v1/products?select=slug,price,mrp,active,track_stock,stock`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return catalogue;
    const rows = (await res.json()) as Row[];
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    return catalogue.map((p) => {
      const row = bySlug.get(p.slug);
      // Hidden products aren't returned to the public, so a missing row means "not for sale".
      if (!row) return { ...p, inStock: false };
      return { ...p, price: row.price, mrp: row.mrp, inStock: row.active && !(row.track_stock && row.stock <= 0) };
    });
  } catch {
    return catalogue;
  }
}

export async function getLiveProduct(slug: string) {
  return (await getLiveProducts()).find((p) => p.slug === slug);
}
