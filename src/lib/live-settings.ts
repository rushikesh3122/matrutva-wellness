import { cacheLife, cacheTag } from "next/cache";
import { defaultSettings, settingsFromRow, type StoreSettings } from "./settings";

/**
 * Store settings from /admin (Supabase). Cached so pages stay fast; saving in /admin refreshes it
 * straight away. Falls back to the defaults in src/lib/settings.ts if the database can't be reached.
 */
export async function getSettings(): Promise<StoreSettings> {
  "use cache";
  cacheLife("minutes");
  cacheTag("settings");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return defaultSettings;
  try {
    const res = await fetch(`${url}/rest/v1/settings?id=eq.1&select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return defaultSettings;
    const rows = (await res.json()) as Record<string, unknown>[];
    return settingsFromRow(rows[0]);
  } catch {
    return defaultSettings;
  }
}
