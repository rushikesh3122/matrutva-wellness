"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/Button";
import { OrderSummary } from "@/components/checkout/OrderSummary";

/** Step 1 of checkout: cart lines and the order summary. */
export function CartSummary() {
  const { items, ready, updateQuantity, removeItem } = useCart();

  if (!ready) return <div className="mt-12 h-64 animate-pulse rounded-figure bg-sage/50" aria-hidden />;

  if (items.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-6 rounded-figure border border-forest/10 bg-white p-10 text-center">
        <ShoppingBag className="size-10 text-teal-deep" strokeWidth={1.25} aria-hidden />
        <p className="text-forest/80">Your cart is empty.</p>
        <PrimaryButton href="/shop/spirulina-capsules">Shop spirulina</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <ul className="divide-y divide-forest/10 rounded-figure border border-forest/10 bg-white px-5 sm:px-8">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-x-5 gap-y-4 py-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-ivory">
              {item.image && <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/shop/${item.slug}`} className="font-medium text-emerald hover:text-teal-deep">
                {item.name}
              </Link>
              <p className="mt-0.5 text-sm text-forest/70">{formatPrice(item.price)} each</p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-1 py-1 text-sm text-forest/70 underline underline-offset-4 hover:text-terracotta-deep"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex h-11 items-center rounded-xl border border-forest/15">
                <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid size-11 place-items-center text-emerald">
                  <Minus className="size-4" />
                </button>
                <span className="w-8 border-x border-forest/15 text-center leading-[2.75rem]" aria-live="polite" aria-label={`Quantity ${item.quantity}`}>
                  {item.quantity}
                </span>
                <button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, Math.min(20, item.quantity + 1))} className="grid size-11 place-items-center text-emerald">
                  <Plus className="size-4" />
                </button>
              </div>
              <p className="w-20 text-right font-medium text-emerald">{formatPrice((item.price ?? 0) * item.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>

      <OrderSummary items={items}>
        <Link
          href="/checkout"
          className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald"
        >
          Proceed to checkout
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <ul className="mt-6 space-y-3 text-sm text-forest/75">
          <li className="flex gap-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden />
            No online payment yet. We confirm every order, shipping and payment with you personally.
          </li>
          <li className="flex gap-3">
            <MessageCircle className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden />
            <span>
              Questions?{" "}
              <Link href="/contact" className="font-medium text-teal-deep underline underline-offset-4">
                Contact us
              </Link>
            </span>
          </li>
        </ul>
      </OrderSummary>
    </div>
  );
}
