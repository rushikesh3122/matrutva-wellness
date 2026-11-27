"use client";

import { useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { btnCls, ghostCls, inputCls } from "./ui";

type Label = NonNullable<Product["label"]>;

export type ProductDetails = {
  name: string;
  eyebrow: string;
  headline: string;
  short_description: string;
  description: string;
  quantity: string;
  badge: string;
  featured: boolean;
  facts: { value: string; label: string }[];
  label: Label;
  faq: { q: string; a: string }[];
};

const emptyLabel: Label = { usage: "", ingredients: "", nutritionTitle: "Nutrition information, per serving (approx.)", nutrition: [], storage: "", warnings: [] };

/** Starting values: what is saved in the database, otherwise the text built into the website. */
export function initialDetails(row: Partial<Record<string, unknown>> & { name: string }, base?: Product): ProductDetails {
  const s = (k: string, fallback = "") => (typeof row[k] === "string" && (row[k] as string).trim() ? (row[k] as string) : fallback);
  return {
    name: row.name || base?.name || "",
    eyebrow: s("eyebrow", base?.eyebrow),
    headline: s("headline", base?.headline),
    short_description: s("short_description", base?.shortDescription),
    description: s("description", base?.description),
    quantity: s("quantity", base?.quantity),
    badge: s("badge", base?.badge),
    featured: typeof row.featured === "boolean" ? row.featured : Boolean(base?.featured),
    facts: (row.facts as ProductDetails["facts"]) ?? base?.facts ?? [],
    label: { ...emptyLabel, ...((row.label as Label) ?? base?.label ?? {}) },
    faq: (row.faq as ProductDetails["faq"]) ?? base?.faq ?? [],
  };
}

/** Product text: names, descriptions, headline facts, label and FAQ. */
export function DetailsEditor({ slug, initial, onSave }: { slug: string; initial: ProductDetails; onSave: (d: ProductDetails) => Promise<string | null> }) {
  const [d, setD] = useState(initial);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const id = (k: string) => `${slug}-${k}`;
  const set = <K extends keyof ProductDetails>(k: K, v: ProductDetails[K]) => setD({ ...d, [k]: v });
  const setLabel = <K extends keyof Label>(k: K, v: Label[K]) => setD({ ...d, label: { ...d.label, [k]: v } });

  async function save() {
    if (!d.name.trim()) return setMsg("The product needs a name.");
    if (!d.description.trim()) return setMsg("Add a description.");
    const clean: ProductDetails = {
      ...d,
      facts: d.facts.filter((f) => f.value.trim() && f.label.trim()).slice(0, 4),
      faq: d.faq.filter((f) => f.q.trim() && f.a.trim()),
      label: {
        ...d.label,
        nutrition: d.label.nutrition.filter((n) => n.label.trim() && n.value.trim()),
        warnings: d.label.warnings.map((w) => w.trim()).filter(Boolean),
      },
    };
    setBusy(true);
    const err = await onSave(clean);
    setBusy(false);
    if (err) setMsg(err);
    else {
      setD(clean);
      setMsg("");
    }
  }

  return (
    <div className="mt-8 border-t border-forest/10 pt-6">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between text-left">
        <h3 className="font-medium text-emerald">Product text: description, facts, label &amp; FAQ</h3>
        <span className="text-sm text-teal-deep">{open ? "Close" : "Edit"}</span>
      </button>
      {open && (
        <div className="mt-5 space-y-8">
          <p className="rounded-xl bg-gold/15 px-4 py-3 text-sm text-forest/80">
            Label text, facts and health claims must match your printed pack and lab documents.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Name" id={id("name")}>
              <input id={id("name")} value={d.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
            </F>
            <F label="Pack size" hint='e.g. "60 capsules"' id={id("quantity")}>
              <input id={id("quantity")} value={d.quantity} onChange={(e) => set("quantity", e.target.value)} className={inputCls} />
            </F>
            <F label="Small line above the name" hint='e.g. "Rise · Spirulina"' id={id("eyebrow")}>
              <input id={id("eyebrow")} value={d.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} className={inputCls} />
            </F>
            <F label="Badge on the shop card" hint='e.g. "Our signature". Optional.' id={id("badge")}>
              <input id={id("badge")} value={d.badge} onChange={(e) => set("badge", e.target.value)} className={inputCls} />
            </F>
            <F label="Headline" className="sm:col-span-2" id={id("headline")}>
              <input id={id("headline")} value={d.headline} onChange={(e) => set("headline", e.target.value)} className={inputCls} />
            </F>
            <F label="Short description (shop card)" className="sm:col-span-2" id={id("short")}>
              <input id={id("short")} value={d.short_description} onChange={(e) => set("short_description", e.target.value)} className={inputCls} />
            </F>
            <F label="Description (product page)" className="sm:col-span-2" id={id("desc")}>
              <textarea id={id("desc")} rows={3} value={d.description} onChange={(e) => set("description", e.target.value)} className={cn(inputCls, "h-auto py-2")} />
            </F>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={d.featured} onChange={(e) => set("featured", e.target.checked)} className="size-5 accent-teal-deep" />
              Feature on the home page
            </label>
          </div>

          <Rows
            title="Headline facts (up to 4)"
            rows={d.facts}
            onChange={(v) => set("facts", v)}
            blank={{ value: "", label: "" }}
            max={4}
            fields={[
              { key: "value", label: "Figure", placeholder: "100%" },
              { key: "label", label: "Meaning", placeholder: "Organic" },
            ]}
            slug={`${slug}-facts`}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <h4 className="text-sm font-semibold text-emerald sm:col-span-2">Label</h4>
            <F label="How to use" className="sm:col-span-2" id={id("usage")}>
              <input id={id("usage")} value={d.label.usage} onChange={(e) => setLabel("usage", e.target.value)} className={inputCls} />
            </F>
            <F label="Ingredients" id={id("ingredients")}>
              <input id={id("ingredients")} value={d.label.ingredients} onChange={(e) => setLabel("ingredients", e.target.value)} className={inputCls} />
            </F>
            <F label="Storage" id={id("storage")}>
              <input id={id("storage")} value={d.label.storage} onChange={(e) => setLabel("storage", e.target.value)} className={inputCls} />
            </F>
            <F label="Nutrition table title" className="sm:col-span-2" id={id("ntitle")}>
              <input id={id("ntitle")} value={d.label.nutritionTitle} onChange={(e) => setLabel("nutritionTitle", e.target.value)} className={inputCls} />
            </F>
            <div className="sm:col-span-2">
              <Rows
                title="Nutrition rows"
                rows={d.label.nutrition}
                onChange={(v) => setLabel("nutrition", v)}
                blank={{ label: "", value: "" }}
                fields={[
                  { key: "label", label: "Nutrient", placeholder: "Protein" },
                  { key: "value", label: "Amount", placeholder: "2 g" },
                ]}
                slug={`${slug}-nutrition`}
              />
            </div>
            <F label="Warnings (one per line)" className="sm:col-span-2" id={id("warnings")}>
              <textarea
                id={id("warnings")}
                rows={3}
                value={d.label.warnings.join("\n")}
                onChange={(e) => setLabel("warnings", e.target.value.split("\n"))}
                className={cn(inputCls, "h-auto py-2")}
              />
            </F>
          </div>

          <Rows
            title="Questions & answers"
            rows={d.faq}
            onChange={(v) => set("faq", v)}
            blank={{ q: "", a: "" }}
            fields={[
              { key: "q", label: "Question" },
              { key: "a", label: "Answer", long: true },
            ]}
            slug={`${slug}-faq`}
          />

          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={save} disabled={busy} className={btnCls}>
              {busy ? "Saving…" : "Save product text"}
            </button>
            {msg && (
              <p role="status" className="text-sm text-terracotta-deep">
                {msg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function F({ label, hint, id, className, children }: { label: string; hint?: string; id: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-forest/65">{hint}</p>}
    </div>
  );
}

/** Editable list of small records (facts, nutrition rows, FAQ). */
function Rows<T extends Record<string, string>>({
  title,
  rows,
  onChange,
  blank,
  fields,
  max,
  slug,
}: {
  title: string;
  rows: T[];
  onChange: (rows: T[]) => void;
  blank: T;
  fields: { key: keyof T & string; label: string; placeholder?: string; long?: boolean }[];
  max?: number;
  slug: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-emerald">{title}</legend>
      <ul className="mt-3 space-y-3">
        {rows.map((r, i) => (
          <li key={i} className="flex items-end gap-3">
            {fields.map((f) => (
              <div key={f.key} className={f.long ? "flex-[2]" : "flex-1"}>
                <label htmlFor={`${slug}-${i}-${f.key}`} className="mb-1 block text-xs text-forest/70">
                  {f.label} {i + 1}
                </label>
                {f.long ? (
                  <textarea
                    id={`${slug}-${i}-${f.key}`}
                    rows={2}
                    value={r[f.key]}
                    onChange={(e) => onChange(rows.map((x, j) => (j === i ? { ...x, [f.key]: e.target.value } : x)))}
                    className={cn(inputCls, "h-auto py-2 text-sm")}
                  />
                ) : (
                  <input
                    id={`${slug}-${i}-${f.key}`}
                    value={r[f.key]}
                    placeholder={f.placeholder}
                    onChange={(e) => onChange(rows.map((x, j) => (j === i ? { ...x, [f.key]: e.target.value } : x)))}
                    className={cn(inputCls, "text-sm")}
                  />
                )}
              </div>
            ))}
            <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="mb-1 rounded-lg p-2 text-terracotta-deep hover:bg-terracotta/10" aria-label={`Remove ${title.toLowerCase()} ${i + 1}`}>
              <Trash2 className="size-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      {(!max || rows.length < max) && (
        <button type="button" onClick={() => onChange([...rows, { ...blank }])} className={cn(ghostCls, "mt-3 h-9 px-4")}>
          <Plus className="size-4" aria-hidden /> Add
        </button>
      )}
    </fieldset>
  );
}
