import { cacheLife, cacheTag } from "next/cache";
import { fetchApprovedReviews } from "@/backend/catalog";

export type Review = { id: number; name: string; city: string | null; product_slug: string | null; rating: number | null; quote: string; created_at: string };

/**
 * Approved customer reviews from /admin → Reviews. Nothing is shown until you approve real reviews;
 * the sample reviews in src/data/testimonials.ts are never published.
 */
export async function getReviews(): Promise<Review[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("reviews");

  return (await fetchApprovedReviews()) ?? [];
}
