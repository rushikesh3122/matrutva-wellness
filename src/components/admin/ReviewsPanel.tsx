"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { refreshShop } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { btnCls, ghostCls, inputCls } from "./ui";

type Review = { id: number; name: string; city: string | null; product_slug: string | null; rating: number | null; quote: string; source: string | null; approved: boolean; created_at: string };
type Product = { slug: string; name: string };

const blank = { name: "", city: "", product_slug: "", rating: "", quote: "", source: "" };

/** Real customer reviews: add what customers sent you (with their permission), then approve to show it. */
export function ReviewsPanel() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const sb = getSupabase();
    const [r, p] = await Promise.all([sb.from("reviews").select("*").order("created_at", { ascending: false }), sb.from("products").select("slug,name").order("name")]);
    setError(r.error ? (r.error.message.includes("reviews") ? "Run supabase/05-track-and-reviews.sql in the Supabase SQL Editor first." : r.error.message) : "");
    setReviews((r.data as Review[]) ?? []);
    setProducts((p.data as Product[]) ?? []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  async function publish() {
    const { data } = await getSupabase().auth.getSession();
    await refreshShop(data.session?.access_token ?? "").catch(() => false);
  }

  async function add() {
    if (!f.name.trim()) return setMsg("Add the customer's name (first name is fine).");
    if (f.quote.trim().length < 5) return setMsg("Add what the customer said.");
    setBusy(true);
    const { error } = await getSupabase()
      .from("reviews")
      .insert({
        name: f.name.trim(),
        city: f.city.trim() || null,
        product_slug: f.product_slug || null,
        rating: f.rating ? Number(f.rating) : null,
        quote: f.quote.trim(),
        source: f.source.trim() || null,
        approved: false,
      });
    setBusy(false);
    if (error) return setMsg(error.message);
    setF(blank);
    setMsg("Review added. Tick “Show on website” when you're ready.");
    void load();
  }

  async function update(id: number, patch: Partial<Review>) {
    const { error } = await getSupabase().from("reviews").update(patch).eq("id", id);
    if (error) return setMsg(error.message);
    await publish();
    void load();
  }

  async function remove(id: number) {
    const { error } = await getSupabase().from("reviews").delete().eq("id", id);
    if (error) return setMsg(error.message);
    await publish();
    void load();
  }

  if (!reviews) return <div className="h-48 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  return (
    <div className="space-y-8">
      {error && <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta-deep">{error}</p>}
      <p className="text-sm text-forest/70">
        Only add reviews real customers sent you, with their permission. Approved reviews show on the home page and product page; nothing shows while none are approved.
      </p>

      <section aria-labelledby="add-review" className="rounded-2xl border border-forest/10 bg-white p-6">
        <h2 id="add-review" className="font-display text-2xl text-emerald">
          Add a review
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rv-name" className="text-sm font-medium">
              Customer name
            </label>
            <input id="rv-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={cn(inputCls, "mt-1.5")} placeholder="Priya S." />
          </div>
          <div>
            <label htmlFor="rv-city" className="text-sm font-medium">
              City (optional)
            </label>
            <input id="rv-city" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} className={cn(inputCls, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor="rv-product" className="text-sm font-medium">
              Product
            </label>
            <select id="rv-product" value={f.product_slug} onChange={(e) => setF({ ...f, product_slug: e.target.value })} className={cn(inputCls, "mt-1.5")}>
              <option value="">General (all products)</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rv-rating" className="text-sm font-medium">
              Stars the customer gave (optional)
            </label>
            <select id="rv-rating" value={f.rating} onChange={(e) => setF({ ...f, rating: e.target.value })} className={cn(inputCls, "mt-1.5")}>
              <option value="">No stars</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="rv-quote" className="text-sm font-medium">
              What they said
            </label>
            <textarea id="rv-quote" rows={3} value={f.quote} onChange={(e) => setF({ ...f, quote: e.target.value })} className={cn(inputCls, "mt-1.5 h-auto py-2")} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="rv-source" className="text-sm font-medium">
              Where it came from (private, e.g. WhatsApp 12 Dec)
            </label>
            <input id="rv-source" value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })} className={cn(inputCls, "mt-1.5")} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="button" onClick={add} disabled={busy || Boolean(error)} className={btnCls}>
            {busy ? "Adding…" : "Add review"}
          </button>
          {msg && (
            <p role="status" className="text-sm text-forest/80">
              {msg}
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="all-reviews">
        <h2 id="all-reviews" className="font-display text-2xl text-emerald">
          Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="mt-3 text-sm text-forest/70">No reviews yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-emerald">
                      {r.name}
                      {r.city && <span className="font-normal text-forest/65"> · {r.city}</span>}
                      {r.rating && <span className="ml-2 text-gold-deep">{"★".repeat(r.rating)}</span>}
                    </p>
                    <p className="mt-1 text-xs text-forest/60">
                      {products.find((p) => p.slug === r.product_slug)?.name ?? "General"} · added {new Date(r.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      {r.source && ` · ${r.source}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={r.approved} onChange={(e) => void update(r.id, { approved: e.target.checked })} className="size-5 accent-teal-deep" />
                      Show on website
                    </label>
                    <button type="button" onClick={() => void remove(r.id)} className={cn(ghostCls, "h-9 px-3 text-terracotta-deep")} aria-label={`Delete review by ${r.name}`}>
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-forest/85">&ldquo;{r.quote}&rdquo;</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
