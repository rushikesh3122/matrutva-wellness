"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getSettingsRow, refreshWebsite, updateSettings } from "@/backend/admin";
import { cn } from "@/lib/utils";
import { btnCls, inputCls } from "./ui";

type Form = {
  whatsapp: string;
  phone: string;
  email: string;
  hours: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  announcements: string;
  shipping_fee: string;
  free_shipping_above: string;
  cod_enabled: boolean;
  fssai: string;
  sales_open: boolean;
};

const blank: Form = {
  whatsapp: "",
  phone: "",
  email: "",
  hours: "",
  address: "",
  instagram: "",
  facebook: "",
  youtube: "",
  announcements: "",
  shipping_fee: "",
  free_shipping_above: "",
  cod_enabled: false,
  fssai: "",
  sales_open: false,
};

/** Store settings: contact details, WhatsApp, social links, announcement bar, shipping, cash on delivery, FSSAI. */
export function SettingsPanel() {
  const [f, setF] = useState<Form | null>(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void getSettingsRow().then(({ data, error }) => {
        if (error) {
          setError(error.includes("settings") ? "Run supabase/03-store-settings.sql in the Supabase SQL Editor first." : error);
          setF(blank);
          return;
        }
        const r = (data ?? {}) as Record<string, unknown>;
        const text = (k: keyof Form) => (typeof r[k] === "string" ? (r[k] as string) : "");
        const num = (k: keyof Form) => (typeof r[k] === "number" ? String(r[k]) : "");
        setF({
          whatsapp: text("whatsapp"),
          phone: text("phone"),
          email: text("email"),
          hours: text("hours"),
          address: text("address"),
          instagram: text("instagram"),
          facebook: text("facebook"),
          youtube: text("youtube"),
          announcements: Array.isArray(r.announcements) ? (r.announcements as string[]).join("\n") : "",
          shipping_fee: num("shipping_fee"),
          free_shipping_above: num("free_shipping_above"),
          cod_enabled: r.cod_enabled === true,
          fssai: text("fssai"),
          sales_open: r.sales_open === true,
        });
      });
  }, []);

  if (!f) return <div className="h-48 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  const field = (key: keyof Form) => ({
    id: `set-${key}`,
    value: f[key] as string,
    onChange: (e: { target: { value: string } }) => setF({ ...f, [key]: e.target.value }),
    className: cn(inputCls, "mt-1.5"),
  });

  async function save() {
    if (!f) return;
    const digits = f.whatsapp.replace(/\D/g, "");
    const whatsapp = digits.length === 10 ? `91${digits}` : digits;
    if (whatsapp && !/^91[6-9]\d{9}$/.test(whatsapp)) return setMsg("WhatsApp: enter a 10-digit Indian mobile number.");
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) return setMsg("Enter a valid email address.");
    for (const k of ["instagram", "facebook", "youtube"] as const) {
      if (f[k].trim() && !/^https:\/\/\S+$/.test(f[k].trim())) return setMsg(`${k[0].toUpperCase() + k.slice(1)}: paste the full link, starting with https://`);
    }
    const money = (v: string) => (v.trim() === "" ? null : Number(v));
    const fee = money(f.shipping_fee);
    const free = money(f.free_shipping_above);
    if (fee !== null && (!Number.isInteger(fee) || fee < 0)) return setMsg("Shipping charge: a whole number of rupees, or leave it empty.");
    if (free !== null && (!Number.isInteger(free) || free <= 0)) return setMsg("Free shipping above: a whole number of rupees, or leave it empty.");
    const fssai = f.fssai.replace(/\s/g, "");
    if (fssai && !/^\d{14}$/.test(fssai)) return setMsg("FSSAI licence numbers have 14 digits.");

    setBusy(true);
    const error = await updateSettings({
        whatsapp,
        phone: f.phone.trim(),
        email: f.email.trim(),
        hours: f.hours.trim(),
        address: f.address.trim(),
        instagram: f.instagram.trim(),
        facebook: f.facebook.trim(),
        youtube: f.youtube.trim(),
        announcements: f.announcements
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .slice(0, 5),
        shipping_fee: fee,
        free_shipping_above: free,
        cod_enabled: f.cod_enabled,
        fssai,
        sales_open: f.sales_open,
    });
    if (error) {
      setBusy(false);
      return setMsg(error);
    }
    setF({ ...f, whatsapp, fssai });
    const ok = await refreshWebsite();
    setBusy(false);
    setMsg(ok ? "Saved. The website is updated." : "Saved. The website will show it within a few minutes.");
  }

  return (
    <div className="space-y-8">
      {error && <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta-deep">{error}</p>}

      <Group title="Shop status" note="Off = Coming soon: every page stays visible, but buy buttons become “Notify me” and orders are refused.">
        <label className="flex items-center gap-3 text-sm font-medium sm:col-span-2">
          <input type="checkbox" checked={f.sales_open} onChange={(e) => setF({ ...f, sales_open: e.target.checked })} className="size-5 accent-teal-deep" />
          Open for orders
        </label>
      </Group>

      <Group title="Orders & contact" note="Empty fields are hidden on the website.">
        <Field label="WhatsApp number for orders" hint="10-digit mobile. Empty = orders go by email." htmlFor="set-whatsapp">
          <input {...field("whatsapp")} inputMode="tel" placeholder="98765 43210" />
        </Field>
        <Field label="Phone" hint="As you want it shown, e.g. +91 98765 43210" htmlFor="set-phone">
          <input {...field("phone")} inputMode="tel" />
        </Field>
        <Field label="Email" htmlFor="set-email">
          <input {...field("email")} type="email" />
        </Field>
        <Field label="Working hours" htmlFor="set-hours">
          <input {...field("hours")} placeholder="Mon–Sat, 10 AM – 6 PM IST" />
        </Field>
        <Field label="Address" className="sm:col-span-2" htmlFor="set-address">
          <input {...field("address")} />
        </Field>
      </Group>

      <Group title="Shipping & payment" note="Shipping is added on the server, so customers can't change it.">
        <Field label="Shipping charge (₹)" hint="Empty = not shown; you confirm shipping with each customer." htmlFor="set-shipping_fee">
          <input {...field("shipping_fee")} inputMode="numeric" />
        </Field>
        <Field label="Free shipping above (₹)" hint="Empty = no free-shipping offer." htmlFor="set-free_shipping_above">
          <input {...field("free_shipping_above")} inputMode="numeric" />
        </Field>
        <label className="flex items-center gap-3 text-sm sm:col-span-2">
          <input type="checkbox" checked={f.cod_enabled} onChange={(e) => setF({ ...f, cod_enabled: e.target.checked })} className="size-5 accent-teal-deep" />
          Offer cash on delivery at checkout
        </label>
      </Group>

      <Group title="Announcement bar" note="One message per line, up to 5. Leave empty to hide the bar.">
        <Field label="Messages" className="sm:col-span-2" htmlFor="set-announcements">
          <textarea
            id="set-announcements"
            rows={3}
            value={f.announcements}
            onChange={(e) => setF({ ...f, announcements: e.target.value })}
            className={cn(inputCls, "mt-1.5 h-auto py-2")}
            placeholder="Free shipping across India on orders above ₹999"
          />
        </Field>
      </Group>

      <Group title="Social links & licence" note="Full links starting with https://. Empty ones are hidden.">
        <Field label="Instagram" htmlFor="set-instagram">
          <input {...field("instagram")} type="url" placeholder="https://instagram.com/…" />
        </Field>
        <Field label="Facebook" htmlFor="set-facebook">
          <input {...field("facebook")} type="url" placeholder="https://facebook.com/…" />
        </Field>
        <Field label="YouTube" htmlFor="set-youtube">
          <input {...field("youtube")} type="url" placeholder="https://youtube.com/@…" />
        </Field>
        <Field label="FSSAI licence number" hint="14 digits, shown in the footer." htmlFor="set-fssai">
          <input {...field("fssai")} inputMode="numeric" />
        </Field>
      </Group>

      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={save} disabled={busy || Boolean(error)} className={btnCls}>
          {busy ? "Saving…" : "Save settings"}
        </button>
        {msg && (
          <p role="status" className="text-sm text-forest/80">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

function Group({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-forest/10 bg-white p-6">
      <h2 className="font-display text-2xl text-emerald">{title}</h2>
      <p className="mt-1 text-sm text-forest/70">{note}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, hint, htmlFor, className, children }: { label: string; hint?: string; htmlFor: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-forest/65">{hint}</p>}
    </div>
  );
}
