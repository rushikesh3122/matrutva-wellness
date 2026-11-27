"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { btnCls, ghostCls, inputCls } from "./ui";
import { OrdersPanel } from "./OrdersPanel";
import { ProductsPanel } from "./ProductsPanel";
import { SettingsPanel } from "./SettingsPanel";
import { ReviewsPanel } from "./ReviewsPanel";

type Gate = "loading" | "signed-out" | "not-admin" | "admin";

/** Private dashboard: sign in with the Supabase user you added to the `admins` table. */
export function AdminApp() {
  const [gate, setGate] = useState<Gate>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<"orders" | "products" | "reviews" | "settings">("orders");

  useEffect(() => {
    if (!supabaseConfigured) return;
    const sb = getSupabase();
    const check = async (s: Session | null) => {
      setSession(s);
      if (!s) return setGate("signed-out");
      const { data } = await sb.rpc("is_admin");
      setGate(data === true ? "admin" : "not-admin");
    };
    sb.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => {
      void check(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabaseConfigured) {
    return <p className="text-forest/80">The database is not configured. Add the Supabase values to the .env file.</p>;
  }
  if (gate === "loading") return <div className="h-64 animate-pulse rounded-figure bg-sage/50" aria-hidden />;
  if (gate === "signed-out") return <SignIn />;
  if (gate === "not-admin") {
    return (
      <div className="mx-auto max-w-md rounded-figure border border-forest/10 bg-white p-8 text-center">
        <p className="text-forest/80">
          {session?.user.email} is signed in but is not an admin. Add it to the <code>admins</code> table (see supabase/schema.sql).
        </p>
        <button type="button" className={cn(ghostCls, "mt-6")} onClick={() => getSupabase().auth.signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal-deep">Admin</p>
          <h1 className="mt-2 font-display text-4xl text-emerald">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-forest/70">
          <span className="hidden sm:inline">{session?.user.email}</span>
          <button type="button" className={ghostCls} onClick={() => getSupabase().auth.signOut()}>
            <LogOut className="size-4" aria-hidden /> Sign out
          </button>
        </div>
      </div>
      <div role="tablist" aria-label="Dashboard sections" className="mt-8 flex gap-2 overflow-x-auto border-b border-forest/10">
        {(["orders", "products", "reviews", "settings"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-medium capitalize",
              tab === t ? "border-teal-deep text-emerald" : "border-transparent text-forest/70 hover:text-emerald",
            )}
          >
            {t === "products" ? "Products & stock" : t === "settings" ? "Settings" : t === "reviews" ? "Reviews" : "Orders"}
          </button>
        ))}
      </div>
      <div className="mt-8">{tab === "orders" ? <OrdersPanel /> : tab === "products" ? <ProductsPanel /> : tab === "reviews" ? <ReviewsPanel /> : <SettingsPanel />}</div>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await getSupabase().auth.signInWithPassword({ email, password });
    if (err) setError(err.message);
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm rounded-figure border border-forest/10 bg-white p-8">
      <h1 className="font-display text-3xl text-emerald">Admin sign in</h1>
      <label htmlFor="admin-email" className="mt-6 block text-sm font-medium text-forest">
        Email
      </label>
      <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={cn(inputCls, "mt-1.5")} />
      <label htmlFor="admin-password" className="mt-4 block text-sm font-medium text-forest">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={cn(inputCls, "mt-1.5")}
      />
      {error && (
        <p role="alert" className="mt-4 text-sm text-terracotta-deep">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={cn(btnCls, "mt-6 w-full")}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
