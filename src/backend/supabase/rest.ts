/**
 * Tiny REST helpers for public reads and database functions (no supabase-js, so public pages stay light).
 * Server and browser safe.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const restConfigured = Boolean(url && key);

const headers = (token = key) => ({ apikey: key, Authorization: `Bearer ${token}`, "Content-Type": "application/json" });

/** GET a table query, e.g. restGet("products?select=*"). Returns null if unreachable. */
export async function restGet<T>(query: string, timeoutMs = 4000): Promise<T | null> {
  if (!restConfigured) return null;
  try {
    const res = await fetch(`${url}/rest/v1/${query}`, { headers: headers(), signal: AbortSignal.timeout(timeoutMs) });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Calls a database function. `status` 0 means the database couldn't be reached. */
export async function rpc<T>(name: string, body: unknown, opts: { token?: string; timeoutMs?: number } = {}) {
  if (!restConfigured) return { status: 0, data: null as T | null, message: undefined as string | undefined };
  try {
    const res = await fetch(`${url}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: headers(opts.token),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(opts.timeoutMs ?? 10000),
    });
    const json = (await res.json().catch(() => null)) as (T & { message?: string }) | null;
    return { status: res.status, data: res.ok ? (json as T | null) : null, message: res.ok ? undefined : json?.message };
  } catch {
    return { status: 0, data: null as T | null, message: undefined as string | undefined };
  }
}
