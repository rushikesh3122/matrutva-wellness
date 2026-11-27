"use client";

import Image from "next/image";
import Link from "next/link";
import { HandHeart, Leaf, MessageCircleHeart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { shippingFor } from "@/lib/settings";
import { cn, formatPrice } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/Button";

/** Cart in a simple table: Product · Quantity · Total, then the estimated total and "Check out". */
export function CartSummary() {
  const { items, ready, subtotal, updateQuantity, removeItem } = useCart();
  const settings = useSettings();
  const ship = shippingFor(settings, subtotal);
  const total = subtotal + (ship ?? 0);
  const toFree = ship && settings.freeShippingAbove ? settings.freeShippingAbove - subtotal : 0;

  // Until the saved cart is read, render the empty state invisibly: same size, so nothing shifts.
  if (!ready || items.length === 0) {
    return (
      <div aria-hidden={!ready || undefined} className={cn("mt-10 flex flex-col items-center gap-6 border-y border-forest/10 py-16 text-center", !ready && "invisible")}>
        <ShoppingBag className="size-10 text-teal-deep" strokeWidth={1.25} aria-hidden />
        <p className="text-forest/80">Your cart is empty.</p>
        <PrimaryButton href="/shop/spirulina-capsules">Shop spirulina</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="hidden grid-cols-[1fr_14rem_8rem] border-b border-forest/10 pb-4 md:grid">
        <span className="eyebrow text-forest/65">Product</span>
        <span className="eyebrow text-forest/65">Quantity</span>
        <span className="eyebrow text-right text-forest/65">Total</span>
      </div>

      <ul className="divide-y divide-forest/10 border-b border-forest/10">
        {items.map((item) => (
          <li key={item.id} className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-4 py-8 md:grid-cols-[8.5rem_1fr_14rem_8rem] md:items-start">
            <Link href={`/shop/${item.slug}`} className="relative row-span-2 aspect-square overflow-hidden rounded-xl bg-white md:row-span-1">
              {item.image && <Image src={item.image} alt="" fill sizes="136px" className="object-cover" />}
            </Link>
            <div className="min-w-0">
              <Link href={`/shop/${item.slug}`} className="text-lg leading-snug text-emerald hover:text-teal-deep">
                {item.name}
              </Link>
              <p className="mt-1.5 text-forest/70">{formatPrice(item.price)}</p>
            </div>
            <div className="col-span-2 flex items-center gap-4 md:col-span-1">
              <div className="flex h-12 items-center rounded-xl border border-forest/25 bg-white">
                <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid size-12 place-items-center text-emerald">
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center" aria-live="polite" aria-label={`Quantity ${item.quantity}`}>
                  {item.quantity}
                </span>
                <button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, Math.min(20, item.quantity + 1))} className="grid size-12 place-items-center text-emerald">
                  <Plus className="size-4" />
                </button>
              </div>
              <button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)} className="grid size-11 place-items-center rounded-full text-forest/70 hover:text-terracotta-deep">
                <Trash2 className="size-5" strokeWidth={1.5} />
              </button>
              <p className="ml-auto text-lg text-emerald md:hidden">{formatPrice((item.price ?? 0) * item.quantity)}</p>
            </div>
            <p className="hidden text-right text-lg text-emerald md:block">{formatPrice((item.price ?? 0) * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
        {/* Matrutva touch: the daily ritual and how we look after the order */}
        <div className="rounded-figure bg-emerald p-7 text-ivory sm:p-9">
          <p lang="mr" className="font-devanagari text-2xl text-gold-light">
            {siteConfig.tagline}
          </p>
          <p className="mt-1 text-sm text-ivory/75">{siteConfig.taglineMeaning}</p>
          <ul className="mt-7 grid gap-5 text-sm sm:grid-cols-3">
            <li className="flex gap-3">
              <Leaf className="mt-0.5 size-5 shrink-0 text-gold-light" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block font-medium text-ivory">Your daily ritual</span>
                <span className="text-ivory/75">2 capsules a day with water.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <HandHeart className="mt-0.5 size-5 shrink-0 text-gold-light" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block font-medium text-ivory">One ingredient</span>
                <span className="text-ivory/75">Spirulina (100%), nothing added.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MessageCircleHeart className="mt-0.5 size-5 shrink-0 text-gold-light" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block font-medium text-ivory">A real person replies</span>
                <span className="text-ivory/75">We confirm every order with you.</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="order-first flex flex-col gap-4 lg:order-none">
          <p className="flex items-baseline justify-between gap-6">
            <span className="text-lg text-emerald">Estimated total</span>
            <span className="font-display text-3xl text-emerald">{formatPrice(total)}</span>
          </p>
          <p className="text-sm text-forest/70">
            {ship === null
              ? "Inclusive of taxes. Shipping and payment are confirmed with you after you place the order."
              : `Inclusive of taxes${ship === 0 ? " and free shipping" : `, with ${formatPrice(ship)} shipping`}.`}
          </p>
          {toFree > 0 && <p className="text-sm font-medium text-teal-deep">Add {formatPrice(toFree)} more for free shipping.</p>}
          <Link
            href="/checkout"
            className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald"
          >
            Check out · {formatPrice(total)}
          </Link>
        </div>
      </div>
    </div>
  );
}
