"use client";

/**
 * Everything the /admin dashboard reads and writes, in one place.
 * The dashboard never talks to the database directly, so moving to another database or API
 * means re-implementing this file (and catalog.ts / orders.ts), not the screens.
 */
import { refreshShop } from "@/app/admin/actions";
import { getSupabase, supabaseConfigured } from "./supabase/client";

export const adminConfigured = supabaseConfigured;

/** Every call returns its data plus an error message (null when it worked). */
export type Result<T> = { data: T; error: string | null };
const wrap = <T,>(data: T, error: { message: string } | null): Result<T> => ({ data, error: error?.message ?? null });

// ---------- Sign-in ----------
export type AdminUser = { email: string };

/** Calls `cb` now and on every sign-in / sign-out. Returns an unsubscribe function. */
export function watchAdminUser(cb: (user: AdminUser | null) => void): () => void {
  const sb = getSupabase();
  sb.auth.getSession().then(({ data }) => cb(data.session ? { email: data.session.user.email ?? "" } : null));
  const { data } = sb.auth.onAuthStateChange((_e, s) => cb(s ? { email: s.user.email ?? "" } : null));
  return () => data.subscription.unsubscribe();
}

export async function isAdmin(): Promise<boolean> {
  const { data } = await getSupabase().rpc("is_admin");
  return data === true;
}

export async function signIn(email: string, password: string): Promise<string | null> {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password });
  return error?.message ?? null;
}

export const signOut = () => getSupabase().auth.signOut();

/** Tells the website to show the latest data straight away. False = it will catch up within minutes. */
export async function refreshWebsite(): Promise<boolean> {
  const { data } = await getSupabase().auth.getSession();
  return refreshShop(data.session?.access_token ?? "").catch(() => false);
}

// ---------- Orders ----------
export async function listOrders<T>(): Promise<Result<T[]>> {
  const { data, error } = await getSupabase().from("orders").select("*, order_items(name, quantity, price)").order("created_at", { ascending: false }).limit(200);
  return wrap((data as T[]) ?? [], error);
}

export async function updateOrder(id: number, patch: { status: string; tracking: string | null; admin_notes: string | null }) {
  const { error } = await getSupabase().from("orders").update(patch).eq("id", id);
  return error?.message ?? null;
}

// ---------- Products & stock ----------
export async function listProducts<T>(): Promise<Result<T[]>> {
  const { data, error } = await getSupabase().from("products").select("*").order("sort").order("name");
  return wrap((data as T[]) ?? [], error);
}

export async function listProductNames(): Promise<{ slug: string; name: string }[]> {
  const { data } = await getSupabase().from("products").select("slug,name").order("name");
  return data ?? [];
}

export async function updateProduct(slug: string, patch: Record<string, unknown>) {
  const { error } = await getSupabase()
    .from("products")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  return error?.message ?? null;
}

export async function addProduct(row: { slug: string; name: string; price: number }) {
  const { error } = await getSupabase()
    .from("products")
    .insert({ ...row, active: false, track_stock: true, stock: 0, low_stock_alert: 5, images: [] });
  return error?.message ?? null;
}

export async function listStockMovements<T>(limit = 30): Promise<Result<T[]>> {
  const { data, error } = await getSupabase().from("stock_movements").select("*").order("created_at", { ascending: false }).limit(limit);
  return wrap((data as T[]) ?? [], error);
}

export async function addStockMovement(row: { product_slug: string; change: number; reason: string; batch: string | null; expiry: string | null }) {
  const { error } = await getSupabase().from("stock_movements").insert(row);
  return error?.message ?? null;
}

// ---------- Product photos ----------
const PHOTO_BUCKET = "product-images";

/** Uploads one photo and returns its public address. */
export async function uploadProductPhoto(slug: string, file: File): Promise<{ url: string } | { error: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const sb = getSupabase();
  const { error } = await sb.storage.from(PHOTO_BUCKET).upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) return { error: error.message };
  return { url: sb.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl };
}

// ---------- Store settings ----------
export async function getSettingsRow(): Promise<Result<Record<string, unknown> | null>> {
  const { data, error } = await getSupabase().from("settings").select("*").eq("id", 1).maybeSingle();
  return wrap((data as Record<string, unknown> | null) ?? null, error);
}

export async function updateSettings(patch: Record<string, unknown>) {
  const { error } = await getSupabase()
    .from("settings")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", 1);
  return error?.message ?? null;
}

// ---------- Reviews ----------
export async function listReviews<T>(): Promise<Result<T[]>> {
  const { data, error } = await getSupabase().from("reviews").select("*").order("created_at", { ascending: false });
  return wrap((data as T[]) ?? [], error);
}

export async function addReview(row: { name: string; city: string | null; product_slug: string | null; rating: number | null; quote: string; source: string | null }) {
  const { error } = await getSupabase()
    .from("reviews")
    .insert({ ...row, approved: false });
  return error?.message ?? null;
}

export async function updateReview(id: number, patch: { approved?: boolean }) {
  const { error } = await getSupabase().from("reviews").update(patch).eq("id", id);
  return error?.message ?? null;
}

export async function deleteReview(id: number) {
  const { error } = await getSupabase().from("reviews").delete().eq("id", id);
  return error?.message ?? null;
}
