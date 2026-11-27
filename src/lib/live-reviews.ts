import { cacheLife, cacheTag } from "next/cache";

export type Review = { id: number; name: string; city: string | null; product_slug: string | null; rating: number | null; quote: string; created_at: string };

/**
 * Approved customer reviews from /admin → Reviews. Nothing is shown until you approve real reviews;
 * the sample reviews in src/data/testimonials.ts are never published.
 */
export async function getReviews(): Promise<Review[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("reviews");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/reviews?select=id,name,city,product_slug,rating,quote,created_at&approved=eq.true&order=created_at.desc&limit=12`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(4000),
    });
    return res.ok ? ((await res.json()) as Review[]) : [];
  } catch {
    return [];
  }
}
