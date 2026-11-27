"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { refreshShop } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { products as catalogue } from "@/data/products";
import type { ProductImage } from "@/types/product";
import { ImagesEditor } from "./ImagesEditor";
import { DetailsEditor, initialDetails, type ProductDetails } from "./DetailsEditor";
import { btnCls, ghostCls, inputCls, rupees } from "./ui";

type Product = {
  slug: string;
  name: string;
  price: number;
  mrp: number | null;
  active: boolean;
  track_stock: boolean;
  stock: number;
  low_stock_alert: number;
  images: ProductImage[] | null;
  [column: string]: unknown;
};
type Movement = { id: number; product_slug: string; change: number; reason: string; batch: string | null; expiry: string | null; order_number: string | null; created_at: string };

/** Products: price, MRP, visibility, stock tracking, and stock adjustments with history. */
export function ProductsPanel() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [moves, setMoves] = useState<Movement[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const sb = getSupabase();
    const [p, m] = await Promise.all([
      sb.from("products").select("*").order("name"),
      sb.from("stock_movements").select("*").order("created_at", { ascending: false }).limit(30),
    ]);
    setError(p.error?.message ?? m.error?.message ?? "");
    setProducts((p.data as Product[]) ?? []);
    setMoves((m.data as Movement[]) ?? []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  if (!products) return <div className="h-48 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  return (
    <div className="space-y-10">
      {error && <p className="text-sm text-terracotta-deep">{error}</p>}
      <p className="text-sm text-forest/70">
        Changes show on the website as soon as you save.
      </p>
      {products.map((p) => (
        <ProductEditor key={p.slug} product={p} onSaved={load} />
      ))}
      <AddProduct existing={products.map((p) => p.slug)} onAdded={load} />

      <section aria-labelledby="history-title">
        <h2 id="history-title" className="font-display text-2xl text-emerald">
          Stock history
        </h2>
        {moves.length === 0 ? (
          <p className="mt-3 text-sm text-forest/70">No stock changes yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-forest/10 bg-white">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="text-forest/70">
                <tr className="border-b border-forest/10">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Change</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Batch / expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {moves.map((m) => (
                  <tr key={m.id}>
                    <td className="px-4 py-3">{new Date(m.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                    <td className="px-4 py-3">{products.find((p) => p.slug === m.product_slug)?.name ?? m.product_slug}</td>
                    <td className={cn("px-4 py-3 font-medium", m.change > 0 ? "text-teal-deep" : "text-terracotta-deep")}>{m.change > 0 ? `+${m.change}` : m.change}</td>
                    <td className="px-4 py-3">
                      {m.reason}
                      {m.order_number ? ` (${m.order_number})` : ""}
                    </td>
                    <td className="px-4 py-3">{[m.batch, m.expiry && `exp. ${m.expiry}`].filter(Boolean).join(" · ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function ProductEditor({ product: p, onSaved }: { product: Product; onSaved: () => void }) {
  const [f, setF] = useState({ price: String(p.price), mrp: p.mrp ? String(p.mrp) : "", active: p.active, track: p.track_stock, low: String(p.low_stock_alert) });
  const [adj, setAdj] = useState({ change: "", reason: "New batch received", batch: "", expiry: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const low = p.track_stock && p.stock <= p.low_stock_alert;
  const id = p.slug;

  async function publish(done: string) {
    const { data } = await getSupabase().auth.getSession();
    const ok = await refreshShop(data.session?.access_token ?? "").catch(() => false);
    setMsg(ok ? `${done}. The website is updated.` : `${done}. The website will show it within a few minutes.`);
  }

  const builtIn = catalogue.find((c) => c.slug === p.slug)?.images ?? [];
  const usingBuiltIn = !p.images?.length && builtIn.length > 0;

  async function saveImages(images: ProductImage[]) {
    const { error } = await getSupabase().from("products").update({ images, updated_at: new Date().toISOString() }).eq("slug", p.slug);
    if (error) return error.message;
    await publish("Photos saved");
    onSaved();
    return null;
  }

  async function saveText(t: ProductDetails) {
    const { error } = await getSupabase()
      .from("products")
      .update({ ...t, name: t.name.trim(), updated_at: new Date().toISOString() })
      .eq("slug", p.slug);
    if (error) return error.message.includes("column") ? "Run supabase/04-product-details.sql in Supabase first." : error.message;
    await publish("Product text saved");
    onSaved();
    return null;
  }

  async function saveDetails() {
    const price = Number(f.price);
    const mrp = f.mrp ? Number(f.mrp) : null;
    if (!Number.isInteger(price) || price <= 0) return setMsg("Enter a valid price.");
    if (mrp !== null && (!Number.isInteger(mrp) || mrp < price)) return setMsg("MRP must be a whole number, at least the price.");
    setBusy(true);
    const { error } = await getSupabase()
      .from("products")
      .update({ price, mrp, active: f.active, track_stock: f.track, low_stock_alert: Number(f.low) || 0, updated_at: new Date().toISOString() })
      .eq("slug", p.slug);
    setBusy(false);
    if (error) return setMsg(error.message);
    await publish("Saved");
    onSaved();
  }

  async function adjustStock() {
    const change = Number(adj.change);
    if (!Number.isInteger(change) || change === 0) return setMsg("Enter a whole number, e.g. 50 or -2.");
    setBusy(true);
    const { error } = await getSupabase()
      .from("stock_movements")
      .insert({ product_slug: p.slug, change, reason: adj.reason || "Adjustment", batch: adj.batch || null, expiry: adj.expiry || null });
    setBusy(false);
    if (error) return setMsg(error.message);
    await publish("Stock updated");
    setAdj({ change: "", reason: "New batch received", batch: "", expiry: "" });
    onSaved();
  }

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-2xl border border-forest/10 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id={`${id}-title`} className="font-display text-2xl text-emerald">
          {p.name}
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <span className={cn("rounded-full px-2.5 py-0.5 font-medium", p.active ? "bg-teal/15 text-teal-deep" : "bg-forest/10 text-forest/70")}>
            {p.active ? "Visible" : "Hidden"}
          </span>
          {p.track_stock && (
            <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium", low ? "bg-terracotta/15 text-terracotta-deep" : "bg-sage text-emerald")}>
              {low && <AlertTriangle className="size-3.5" aria-hidden />}
              {p.stock <= 0 ? "Out of stock" : `${p.stock} in stock`}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-price`} className="text-sm font-medium">
              Price (₹)
            </label>
            <input id={`${id}-price`} inputMode="numeric" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} className={cn(inputCls, "mt-1.5")} />
          </div>
          <div>
            <label htmlFor={`${id}-mrp`} className="text-sm font-medium">
              MRP (₹, optional)
            </label>
            <input id={`${id}-mrp`} inputMode="numeric" value={f.mrp} onChange={(e) => setF({ ...f, mrp: e.target.value })} className={cn(inputCls, "mt-1.5")} />
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} className="size-5 accent-teal-deep" />
            Show on website
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={f.track} onChange={(e) => setF({ ...f, track: e.target.checked })} className="size-5 accent-teal-deep" />
            Track stock (sell out at 0)
          </label>
          <div>
            <label htmlFor={`${id}-low`} className="text-sm font-medium">
              Low-stock warning at
            </label>
            <input id={`${id}-low`} inputMode="numeric" value={f.low} onChange={(e) => setF({ ...f, low: e.target.value })} className={cn(inputCls, "mt-1.5")} />
          </div>
          <div className="flex items-end">
            <button type="button" onClick={saveDetails} disabled={busy} className={btnCls}>
              Save details
            </button>
          </div>
          <p className="text-sm text-forest/70 sm:col-span-2">Current price on site: {rupees(p.price)}</p>
        </div>

        <div className="rounded-2xl bg-sage/50 p-5">
          <h3 className="font-medium text-emerald">Add or remove stock</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-change`} className="text-sm font-medium">
                Quantity (+50 or −2)
              </label>
              <input id={`${id}-change`} inputMode="numeric" value={adj.change} onChange={(e) => setAdj({ ...adj, change: e.target.value })} className={cn(inputCls, "mt-1.5")} />
            </div>
            <div>
              <label htmlFor={`${id}-reason`} className="text-sm font-medium">
                Reason
              </label>
              <select id={`${id}-reason`} value={adj.reason} onChange={(e) => setAdj({ ...adj, reason: e.target.value })} className={cn(inputCls, "mt-1.5")}>
                <option>New batch received</option>
                <option>Stock count correction</option>
                <option>Damaged / expired</option>
                <option>Sample / gift</option>
                <option>Sold offline</option>
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-batch`} className="text-sm font-medium">
                Batch no. (optional)
              </label>
              <input id={`${id}-batch`} value={adj.batch} onChange={(e) => setAdj({ ...adj, batch: e.target.value })} className={cn(inputCls, "mt-1.5")} />
            </div>
            <div>
              <label htmlFor={`${id}-expiry`} className="text-sm font-medium">
                Expiry (optional)
              </label>
              <input id={`${id}-expiry`} type="date" value={adj.expiry} onChange={(e) => setAdj({ ...adj, expiry: e.target.value })} className={cn(inputCls, "mt-1.5")} />
            </div>
          </div>
          <button type="button" onClick={adjustStock} disabled={busy} className={cn(btnCls, "mt-4")}>
            Update stock
          </button>
        </div>
      </div>
      {msg && (
        <p role="status" className="mt-4 text-sm text-forest/80">
          {msg}
        </p>
      )}
      <DetailsEditor slug={p.slug} initial={initialDetails(p, catalogue.find((c) => c.slug === p.slug))} onSave={saveText} />
      <ImagesEditor slug={p.slug} name={p.name} initial={usingBuiltIn ? builtIn : p.images!} usingBuiltIn={usingBuiltIn} onSave={saveImages} />
    </section>
  );
}

/** Turns a name into a web address part: "Spirulina Powder 100 g" → "spirulina-powder-100-g". */
const toSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/** Adds a new product, hidden until you've added its text and photos and ticked "Show on website". */
function AddProduct({ existing, onAdded }: { existing: string[]; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const slug = toSlug(name);

  async function add() {
    const amount = Number(price);
    if (!slug) return setMsg("Enter a product name.");
    if (existing.includes(slug)) return setMsg("A product with this name already exists.");
    if (!Number.isInteger(amount) || amount <= 0) return setMsg("Enter a price in whole rupees.");
    setBusy(true);
    const { error } = await getSupabase()
      .from("products")
      .insert({ slug, name: name.trim(), price: amount, active: false, track_stock: true, stock: 0, low_stock_alert: 5, images: [] });
    setBusy(false);
    if (error) return setMsg(error.message);
    setName("");
    setPrice("");
    setOpen(false);
    onAdded();
  }

  if (!open)
    return (
      <button type="button" onClick={() => setOpen(true)} className={ghostCls}>
        + Add a product
      </button>
    );

  return (
    <section aria-labelledby="add-title" className="rounded-2xl border border-dashed border-forest/25 bg-white p-6">
      <h2 id="add-title" className="font-display text-2xl text-emerald">
        Add a product
      </h2>
      <p className="mt-1 text-sm text-forest/70">
        It starts hidden. Add its text, photos and stock, then tick &ldquo;Show on website&rdquo;.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="new-name" className="text-sm font-medium">
            Name
          </label>
          <input id="new-name" value={name} onChange={(e) => setName(e.target.value)} className={cn(inputCls, "mt-1.5")} placeholder="Spirulina Capsules, 120" />
          {slug && <p className="mt-1 text-xs text-forest/65">Web address: /shop/{slug} (can&apos;t be changed later)</p>}
        </div>
        <div>
          <label htmlFor="new-price" className="text-sm font-medium">
            Price (₹)
          </label>
          <input id="new-price" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} className={cn(inputCls, "mt-1.5")} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={add} disabled={busy} className={btnCls}>
          {busy ? "Adding…" : "Add product"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className={ghostCls}>
          Cancel
        </button>
        {msg && (
          <p role="status" className="text-sm text-terracotta-deep">
            {msg}
          </p>
        )}
      </div>
    </section>
  );
}
