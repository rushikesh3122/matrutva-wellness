"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Search } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

type Tracked = {
  number: string;
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  tracking: string | null;
  created_at: string;
  subtotal: number;
  shipping: number | null;
  total: number;
  payment: string | null;
  city: string;
  items: { name: string; quantity: number; price: number }[] | null;
};

const steps = [
  { key: "new", label: "Order received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

const input =
  "h-12 w-full rounded-xl border border-forest/25 bg-white px-4 text-forest placeholder:text-forest/45 focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20 focus:outline-none";

/** Looks up one order by its number and the phone it was placed with (database function track_order). */
export function TrackOrderForm() {
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Tracked | null>(null);

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (!number.trim()) return setError("Enter your order number, e.g. MW-261127-4821.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Enter the 10-digit mobile number you ordered with.");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return setError("Order tracking isn't available right now. Please contact us with your order number.");
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${url}/rest/v1/rpc/track_order`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ order_number: number.trim(), phone: digits }),
        signal: AbortSignal.timeout(10000),
      });
      const data = res.ok ? ((await res.json()) as Tracked | null) : null;
      if (!res.ok) setError("Order tracking isn't available right now. Please contact us with your order number.");
      else if (!data) setError("We couldn't find an order with that number and phone. Please check both and try again.");
      setOrder(data);
    } catch {
      setError("We couldn't reach our system. Please check your connection and try again.");
    }
    setBusy(false);
  }

  // Move to the result so screen-reader and phone users land on it.
  useEffect(() => {
    if (order) document.getElementById("track-result")?.focus();
  }, [order]);

  const current = order ? steps.findIndex((s) => s.key === order.status) : -1;

  return (
    <div className="space-y-10">
      <form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-figure border border-forest/10 bg-white p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-8">
        <div>
          <label htmlFor="track-number" className="text-sm font-medium text-forest">
            Order number
          </label>
          <input id="track-number" value={number} onChange={(e) => setNumber(e.target.value.toUpperCase())} placeholder="MW-261127-4821" autoComplete="off" className={cn(input, "mt-1.5")} />
        </div>
        <div>
          <label htmlFor="track-phone" className="text-sm font-medium text-forest">
            Phone number
          </label>
          <input id="track-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" className={cn(input, "mt-1.5")} />
        </div>
        <button type="submit" disabled={busy} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal-deep px-6 font-medium text-ivory transition-colors hover:bg-emerald disabled:opacity-60">
          <Search className="size-4" aria-hidden />
          {busy ? "Looking…" : "Track"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-terracotta-deep sm:col-span-3">
            {error}
          </p>
        )}
      </form>

      {order && (
        <section aria-labelledby="track-result" className="rounded-figure border border-forest/10 bg-white p-6 sm:p-8">
          <p className="eyebrow text-teal-deep">Order {order.number}</p>
          <h2 id="track-result" tabIndex={-1} className="mt-3 scroll-mt-28 font-display text-3xl text-emerald focus:outline-none">
            {order.status === "cancelled" ? "This order was cancelled" : steps[current]?.label}
          </h2>
          <p className="mt-2 text-sm text-forest/70">
            Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { dateStyle: "long" })} · delivering to {order.city}
          </p>

          {order.status !== "cancelled" && (
            <ol className="mt-8 grid gap-4 sm:grid-cols-5 sm:gap-2">
              {steps.map((s, i) => (
                <li key={s.key} className="flex items-center gap-3 sm:flex-col sm:text-center">
                  <span
                    aria-hidden
                    className={cn("grid size-9 shrink-0 place-items-center rounded-full border-2 text-sm", i <= current ? "border-teal-deep bg-teal-deep text-ivory" : "border-forest/20 text-forest/50")}
                  >
                    {i <= current ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className={cn("text-sm", i <= current ? "font-medium text-emerald" : "text-forest/60")}>
                    {s.label}
                    <span className="sr-only">{i < current ? " (done)" : i === current ? " (current step)" : " (to come)"}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}

          {order.tracking && (
            <p className="mt-8 rounded-xl bg-sage/60 px-4 py-3 text-sm text-forest">
              Courier tracking: <strong className="font-medium">{order.tracking}</strong>
            </p>
          )}

          {order.items && (
            <dl className="mt-8 divide-y divide-forest/10 border-t border-forest/10 text-sm">
              {order.items.map((i) => (
                <div key={i.name} className="flex justify-between gap-4 py-3">
                  <dt>
                    {i.name} × {i.quantity}
                  </dt>
                  <dd>{formatPrice(i.price * i.quantity)}</dd>
                </div>
              ))}
              {order.shipping ? (
                <div className="flex justify-between gap-4 py-3">
                  <dt>Shipping</dt>
                  <dd>{formatPrice(order.shipping)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 py-3 font-medium text-emerald">
                <dt>Total</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
            </dl>
          )}
          <p className="mt-6 text-sm text-forest/70">
            Questions about this order?{" "}
            <Link href="/contact" className="text-teal-deep underline underline-offset-4">
              Contact us
            </Link>{" "}
            with your order number.
          </p>
        </section>
      )}
    </div>
  );
}
