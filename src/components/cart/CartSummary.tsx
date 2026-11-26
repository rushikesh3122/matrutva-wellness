"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { orderHref } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { PrimaryButton } from "@/components/ui/Button";

/** Simple cart list (no checkout or payment in this stage). */
export function CartSummary() {
  const { items, count, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);
  const message = `Hi Matrutva Wellness, I'd like to order:\n${items
    .map((i) => `• ${i.name} × ${i.quantity}${i.price ? ` (${formatPrice(i.price * i.quantity)})` : ""}`)
    .join("\n")}${subtotal ? `\nSubtotal: ${formatPrice(subtotal)}` : ""}`;

  if (count === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-6 rounded-figure border border-forest/10 bg-white p-10 text-center">
        <ShoppingBag className="size-10 text-teal-deep" strokeWidth={1.25} aria-hidden />
        <p className="text-forest/80">Your cart is empty.</p>
        <PrimaryButton href="/shop/spirulina-capsules">Shop spirulina</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-figure border border-forest/10 bg-white p-5 sm:p-8">
      <ul className="divide-y divide-forest/10">
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
      {subtotal > 0 && (
        <div className="mt-6 flex items-baseline justify-between border-t border-forest/10 pt-6">
          <span className="eyebrow text-[0.62rem] text-forest/70">Subtotal</span>
          <span className="font-display text-3xl text-emerald">{formatPrice(subtotal)}</span>
        </div>
      )}
      <a
        href={orderHref(message)}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald"
      >
        <WhatsAppIcon className="size-5" />
        Send order on WhatsApp
      </a>
      <p className="mt-4 text-center text-sm text-forest/70">Online payment is not available yet. We confirm every order with you on WhatsApp.</p>
    </div>
  );
}
