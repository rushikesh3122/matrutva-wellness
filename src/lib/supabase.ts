import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let client: SupabaseClient | null = null;

/** Browser client (checkout + /admin). Loaded only where it is used, so it stays out of other pages. */
export function getSupabase(): SupabaseClient {
  if (!supabaseConfigured) throw new Error("Supabase is not configured");
  client ??= createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, storageKey: "matrutva-admin" } });
  return client;
}
