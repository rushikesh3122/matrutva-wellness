"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

/** Quantity stepper and "Add to cart" button. */
export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-12 items-center rounded-full border border-forest/20">
        <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 place-items-center text-emerald">
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center" aria-live="polite" aria-label={`Quantity ${qty}`}>
          {qty}
        </span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid size-12 place-items-center text-emerald">
          <Plus className="size-4" />
        </button>
      </div>
      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => {
          addItem(product, qty);
          setAdded(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setAdded(false), 1800);
        }}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-emerald px-7 font-medium text-emerald transition-colors hover:bg-emerald hover:text-ivory disabled:opacity-50"
      >
        {added ? (
          <>
            <Check className="size-4" /> Added
          </>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
}
