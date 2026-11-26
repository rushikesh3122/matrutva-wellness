"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/Button";

/** Simple cart list (no checkout or payment in this stage). */
export function CartSummary() {
  const { items, count, updateQuantity, removeItem } = useCart();

  if (count === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-6 rounded-panel border border-gold/25 bg-white p-10 text-center">
        <ShoppingBag className="size-10 text-gold" aria-hidden />
        <p className="text-forest/80">Your cart is empty.</p>
        <PrimaryButton href="/shop">Explore Products</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-panel border border-gold/25 bg-white p-4 shadow-soft sm:p-8">
      <ul className="divide-y divide-gold/15">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            {item.image && (
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-ivory">
                <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <Link href={`/shop/${item.slug}`} className="font-display text-emerald hover:text-teal">
                {item.name}
              </Link>
              <p className="text-caption text-forest/75">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center rounded-full border border-emerald/20">
              <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid size-9 place-items-center text-emerald">
                <Minus className="size-3.5" />
              </button>
              <span className="w-6 text-center text-sm" aria-live="polite">
                {item.quantity}
              </span>
              <button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid size-9 place-items-center text-emerald">
                <Plus className="size-3.5" />
              </button>
            </div>
            <button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)} className="grid size-9 place-items-center rounded-full text-forest/60 hover:text-[#9A3412]">
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-card bg-sage px-4 py-3 text-center text-caption text-forest/80">
        Online checkout is not available yet. Prices and ordering will open soon.
      </p>
    </div>
  );
}
