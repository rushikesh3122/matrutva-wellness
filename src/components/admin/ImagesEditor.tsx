"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import { uploadProductPhoto } from "@/backend/admin";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";
import { btnCls, ghostCls, inputCls } from "./ui";

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Product photos: upload, set the description (alt text), reorder and remove.
 * The first photo is the main one on the shop and product pages.
 */
export function ImagesEditor({
  slug,
  name,
  initial,
  usingBuiltIn,
  onSave,
}: {
  slug: string;
  name: string;
  initial: ProductImage[];
  usingBuiltIn: boolean;
  onSave: (images: ProductImage[]) => Promise<string | null>;
}) {
  const [list, setList] = useState<ProductImage[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const update = (next: ProductImage[]) => {
    setList(next);
    setDirty(true);
  };
  const move = (i: number, by: number) => {
    const next = [...list];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    update(next);
  };

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setMsg("");
    const added: ProductImage[] = [];
    for (const file of Array.from(files)) {
      if (file.size > MAX_BYTES) {
        setMsg(`${file.name} is over 5 MB. Please use a smaller photo.`);
        continue;
      }
      const res = await uploadProductPhoto(slug, file);
      if ("error" in res) {
        setMsg(res.error);
        continue;
      }
      added.push({ src: res.url, alt: name });
    }
    setBusy(false);
    if (added.length) {
      update([...list, ...added]);
      setMsg(`${added.length} photo${added.length > 1 ? "s" : ""} uploaded. Check the descriptions, then press Save photos.`);
    }
  }

  async function save() {
    if (list.length === 0) return setMsg("Keep at least one photo.");
    if (list.some((i) => !i.alt.trim())) return setMsg("Every photo needs a short description.");
    setBusy(true);
    const result = await onSave(list.map((i) => ({ src: i.src, alt: i.alt.trim() })));
    setBusy(false);
    if (result) setMsg(result);
    setDirty(false);
  }

  return (
    <div className="mt-8 border-t border-forest/10 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-medium text-emerald">Photos</h3>
        <label className={cn(ghostCls, "cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-deep")}>
          <ImagePlus className="size-4" aria-hidden />
          Upload photos
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple className="sr-only" disabled={busy} onChange={(e) => void upload(e.target.files).then(() => (e.target.value = ""))} />
        </label>
      </div>
      <p className="mt-1 text-sm text-forest/70">
        The first photo is the main one. JPG, PNG or WebP up to 5 MB; square photos at least 1200 px wide look best.
        {usingBuiltIn && " These are the photos built into the website; saving here replaces them."}
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((img, i) => (
          <li key={img.src} className="rounded-2xl border border-forest/10 p-3">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-sage/40">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin preview, any source */}
              <img src={img.src} alt="" className="size-full object-cover" loading="lazy" />
              {i === 0 && <span className="absolute top-2 left-2 rounded-full bg-emerald px-2 py-0.5 text-xs font-medium text-ivory">Main</span>}
            </div>
            <label htmlFor={`${slug}-alt-${i}`} className="mt-3 block text-xs font-medium">
              Description (for screen readers and Google)
            </label>
            <input
              id={`${slug}-alt-${i}`}
              value={img.alt}
              onChange={(e) => update(list.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
              className={cn(inputCls, "mt-1 h-10 text-sm")}
            />
            <div className="mt-2 flex gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg p-2 text-emerald hover:bg-sage disabled:opacity-30" aria-label={`Move photo ${i + 1} earlier`}>
                <ArrowUp className="size-4" aria-hidden />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === list.length - 1} className="rounded-lg p-2 text-emerald hover:bg-sage disabled:opacity-30" aria-label={`Move photo ${i + 1} later`}>
                <ArrowDown className="size-4" aria-hidden />
              </button>
              <button type="button" onClick={() => update(list.filter((_, j) => j !== i))} className="ml-auto rounded-lg p-2 text-terracotta-deep hover:bg-terracotta/10" aria-label={`Remove photo ${i + 1}`}>
                <Trash2 className="size-4" aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button type="button" onClick={save} disabled={busy || !dirty} className={btnCls}>
          {busy ? "Working…" : "Save photos"}
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
