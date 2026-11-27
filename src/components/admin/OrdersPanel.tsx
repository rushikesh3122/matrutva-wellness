"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { listOrders, updateOrder } from "@/backend/admin";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { btnCls, ghostCls, inputCls, rupees } from "./ui";

const STATUSES = ["new", "confirmed", "packed", "shipped", "delivered", "cancelled"] as const;
type Status = (typeof STATUSES)[number];

type Order = {
  id: number;
  number: string;
  status: Status;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  pincode: string;
  gstin: string | null;
  notes: string | null;
  total: number;
  subtotal?: number;
  shipping?: number;
  payment_method?: string;
  tracking: string | null;
  admin_notes: string | null;
  created_at: string;
  order_items: { name: string; quantity: number; price: number }[];
};

const badge: Record<Status, string> = {
  new: "bg-gold/25 text-gold-deep",
  confirmed: "bg-teal/15 text-teal-deep",
  packed: "bg-teal/15 text-teal-deep",
  shipped: "bg-emerald/10 text-emerald",
  delivered: "bg-emerald text-ivory",
  cancelled: "bg-terracotta/15 text-terracotta-deep",
};

/** Orders: newest first, filter by status, change status, add tracking. Confirming takes stock out automatically. */
export function OrdersPanel() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const { data, error: err } = await listOrders<Order>();
    if (err) setError(err);
    setOrders(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch
    void load();
  }, [load]);

  if (!orders) return <div className="h-48 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  const month = new Date().toISOString().slice(0, 7);
  const live = orders.filter((o) => o.status !== "cancelled");
  const stats = [
    { label: "New orders", value: orders.filter((o) => o.status === "new").length },
    { label: "To ship", value: orders.filter((o) => o.status === "confirmed" || o.status === "packed").length },
    { label: "Orders this month", value: live.filter((o) => o.created_at.startsWith(month)).length },
    { label: "Sales this month", value: rupees(live.filter((o) => o.created_at.startsWith(month)).reduce((n, o) => n + o.total, 0)) },
  ];
  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-forest/10 bg-white p-5">
            <dt className="text-sm text-forest/70">{s.label}</dt>
            <dd className="mt-1 font-display text-3xl text-emerald">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label htmlFor="order-filter" className="text-sm text-forest/75">
          Show
        </label>
        <select id="order-filter" value={filter} onChange={(e) => setFilter(e.target.value as Status | "all")} className={cn(inputCls, "w-44")}>
          <option value="all">All orders</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <button type="button" onClick={load} className={ghostCls}>
          <RefreshCw className="size-4" aria-hidden /> Refresh
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-terracotta-deep">{error}</p>}

      {shown.length === 0 ? (
        <p className="mt-10 text-forest/70">No orders here yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-white">
          {shown.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                aria-expanded={open === o.id}
                onClick={() => setOpen(open === o.id ? null : o.id)}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 text-left sm:grid-cols-[9rem_1fr_7rem_6rem]"
              >
                <span className="font-medium text-emerald">{o.number}</span>
                <span className={cn("justify-self-end rounded-full px-2.5 py-0.5 text-xs font-medium capitalize sm:order-3 sm:justify-self-start", badge[o.status])}>
                  {o.status}
                </span>
                <span className="text-sm text-forest/80 sm:order-2">
                  {o.first_name} {o.last_name} · {o.city} · {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </span>
                <span className="justify-self-end text-sm font-medium text-emerald sm:order-4">{rupees(o.total)}</span>
              </button>
              {open === o.id && <OrderDetail order={o} onSaved={load} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OrderDetail({ order: o, onSaved }: { order: Order; onSaved: () => void }) {
  const [status, setStatus] = useState<Status>(o.status);
  const [tracking, setTracking] = useState(o.tracking ?? "");
  const [notes, setNotes] = useState(o.admin_notes ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setBusy(true);
    setMsg("");
    const error = await updateOrder(o.id, { status, tracking: tracking || null, admin_notes: notes || null });
    setBusy(false);
    if (error) return setMsg(error);
    setMsg("Saved");
    onSaved();
  }

  const wa = `https://wa.me/91${o.phone}?text=${encodeURIComponent(`Hi ${o.first_name}, this is Matrutva Wellness about your order ${o.number}.`)}`;

  return (
    <div className="grid gap-6 border-t border-forest/10 bg-ivory/60 px-5 py-6 md:grid-cols-2">
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="eyebrow text-forest/70">Items</h3>
          <ul className="mt-2 space-y-1">
            {o.order_items.map((i) => (
              <li key={i.name} className="flex justify-between gap-4">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>{rupees(i.price * i.quantity)}</span>
              </li>
            ))}
            {o.shipping !== undefined && (
              <li className="flex justify-between gap-4 text-forest/75">
                <span>Shipping</span>
                <span>{o.shipping === 0 ? "Free / to confirm" : rupees(o.shipping)}</span>
              </li>
            )}
            <li className="flex justify-between gap-4 border-t border-forest/10 pt-1 font-medium">
              <span>Total</span>
              <span>{rupees(o.total)}</span>
            </li>
          </ul>
          {o.payment_method && (
            <p className="mt-2">
              Payment: <strong className="font-medium">{o.payment_method === "cod" ? "Cash on delivery" : "Before dispatch (UPI / bank)"}</strong>
            </p>
          )}
        </div>
        <div>
          <h3 className="eyebrow text-forest/70">Deliver to</h3>
          <p className="mt-2 leading-relaxed">
            {o.first_name} {o.last_name}
            <br />
            {o.address1}
            {o.address2 ? `, ${o.address2}` : ""}
            <br />
            {o.city}, {o.state} {o.pincode}
          </p>
        </div>
        <div>
          <h3 className="eyebrow text-forest/70">Contact</h3>
          <p className="mt-2">
            <a href={`tel:+91${o.phone}`} className="underline underline-offset-2">
              +91 {o.phone}
            </a>
            {o.email && (
              <>
                {" · "}
                <a href={`mailto:${o.email}`} className="underline underline-offset-2">
                  {o.email}
                </a>
              </>
            )}
          </p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={cn(ghostCls, "mt-3")}>
            <WhatsAppIcon className="size-4" /> Message customer
          </a>
        </div>
        {o.gstin && <p>GSTIN: {o.gstin}</p>}
        {o.notes && <p className="rounded-xl bg-white p-3">Customer note: {o.notes}</p>}
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`status-${o.id}`} className="text-sm font-medium text-forest">
            Status
          </label>
          <select id={`status-${o.id}`} value={status} onChange={(e) => setStatus(e.target.value as Status)} className={cn(inputCls, "mt-1.5 capitalize")}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-forest/65">Confirming takes the items out of stock. Cancelling a confirmed order puts them back.</p>
        </div>
        <div>
          <label htmlFor={`tracking-${o.id}`} className="text-sm font-medium text-forest">
            Courier / tracking number
          </label>
          <input id={`tracking-${o.id}`} value={tracking} onChange={(e) => setTracking(e.target.value)} className={cn(inputCls, "mt-1.5")} />
        </div>
        <div>
          <label htmlFor={`notes-${o.id}`} className="text-sm font-medium text-forest">
            Private notes
          </label>
          <textarea id={`notes-${o.id}`} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={cn(inputCls, "mt-1.5 h-auto py-2")} />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={save} disabled={busy} className={btnCls}>
            {busy ? "Saving…" : "Save changes"}
          </button>
          {msg && (
            <span role="status" className="text-sm text-forest/75">
              {msg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
