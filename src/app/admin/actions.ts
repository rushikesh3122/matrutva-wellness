"use server";

import { updateTag } from "next/cache";

/**
 * Called by the admin dashboard after a price, stock or settings change, so the shop shows it
 * on the next page load instead of after the cache expires. Only works for a signed-in admin.
 */
export async function refreshShop(accessToken: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !accessToken) return false;
  try {
    const res = await fetch(`${url}/rest/v1/rpc/is_admin`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok || (await res.json()) !== true) return false;
    updateTag("products");
    updateTag("settings");
    return true;
  } catch {
    return false;
  }
}
