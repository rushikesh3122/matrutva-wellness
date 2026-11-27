/**
 * Public reads for the website (server side): products, store settings, reviews.
 * Each returns null when the database can't be reached, so the site falls back to the built-in data.
 * To switch database, re-implement these three functions.
 */
import { restGet } from "./supabase/rest";
import type { ProductRow } from "@/lib/live-products";
import type { Review } from "@/lib/live-reviews";

export const fetchProductRows = () => restGet<ProductRow[]>("products?select=*&order=sort.asc,name.asc");

export const fetchSettingsRow = async () => (await restGet<Record<string, unknown>[]>("settings?id=eq.1&select=*"))?.[0] ?? null;

export const fetchApprovedReviews = () =>
  restGet<Review[]>("reviews?select=id,name,city,product_slug,rating,quote,created_at&approved=eq.true&order=created_at.desc&limit=12");
