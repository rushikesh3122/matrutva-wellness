"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { limitMessage, maxFor, useCart } from "@/context/CartContext";

/** Quantity stepper and "Add to cart" button. */
export function AddToCart({ product }: { product: Product }) {
  const { addItem, items, ready, setLimit, notify } = useCart();
  const max = maxFor(product);
  const inCart = items.find((i) => i.id === product.id)?.quantity ?? 0;
  const left = Math.max(0, max - inCart);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const shown = Math.max(1, Math.min(qty, left || 1));
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // A cart saved before stock ran low is brought down to what is available.
  useEffect(() => {
    if (ready) setLimit(product.id, product.maxQuantity);
  }, [ready, product.id, product.maxQuantity, setLimit]);

  return (
    <div>
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-12 items-center rounded-full border border-forest/20">
        <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, shown - 1))} className="grid size-12 place-items-center text-emerald">
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center" aria-live="polite" aria-label={`Quantity ${shown}`}>
          {shown}
        </span>
        <button type="button" aria-label="Increase quantity" onClick={() => (shown >= left ? notify(limitMessage(product)) : setQty(shown + 1))} aria-disabled={shown >= left || undefined} className="grid size-12 place-items-center text-emerald aria-disabled:opacity-30">
          <Plus className="size-4" />
        </button>
      </div>
      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => {
          if (addItem(product, shown) === 0) return;
          setQty(1);
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
      {product.inStock && left === 0 ? (
        <p className="mt-3 text-sm text-terracotta-deep">You have all {max} available in your cart.</p>
      ) : product.fewLeft && product.maxQuantity ? (
        <p className="mt-3 text-sm font-medium text-terracotta-deep">Only {product.maxQuantity} left</p>
      ) : null}
    </div>
  );
}
