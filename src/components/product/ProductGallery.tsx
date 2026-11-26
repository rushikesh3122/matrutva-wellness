"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

/** Main image with thumbnails underneath. The first image is the page's LCP, so it loads with priority. */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-figure bg-white">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          preload={active === 0}
          fetchPriority={active === 0 ? "high" : undefined}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl bg-white ring-1 transition",
                  i === active ? "ring-emerald" : "ring-forest/10 hover:ring-forest/30",
                )}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
