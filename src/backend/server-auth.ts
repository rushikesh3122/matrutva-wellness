/** Server-side check that an access token belongs to an admin (used before refreshing the site cache). */
import { rpc } from "./supabase/rest";

export async function isAdminToken(accessToken: string): Promise<boolean> {
  if (!accessToken) return false;
  const res = await rpc<boolean>("is_admin", {}, { token: accessToken, timeoutMs: 4000 });
  return res.data === true;
}
