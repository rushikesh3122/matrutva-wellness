import { cacheLife, cacheTag } from "next/cache";
import { fetchSettingsRow } from "@/backend/catalog";
import { settingsFromRow, type StoreSettings } from "./settings";

/**
 * Store settings from /admin. Cached so pages stay fast; saving in /admin refreshes it
 * straight away. Falls back to the defaults in src/lib/settings.ts if the database can't be reached.
 */
export async function getSettings(): Promise<StoreSettings> {
  "use cache";
  cacheLife("minutes");
  cacheTag("settings");
  return settingsFromRow(await fetchSettingsRow());
}
