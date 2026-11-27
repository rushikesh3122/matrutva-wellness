"use server";

import { updateTag } from "next/cache";
import { isAdminToken } from "@/backend/server-auth";

/**
 * Called by the admin dashboard after a price, stock, settings or review change, so the shop shows it
 * on the next page load instead of after the cache expires. Only works for a signed-in admin.
 */
export async function refreshShop(accessToken: string): Promise<boolean> {
  if (!(await isAdminToken(accessToken))) return false;
  updateTag("products");
  updateTag("settings");
  updateTag("reviews");
  return true;
}
