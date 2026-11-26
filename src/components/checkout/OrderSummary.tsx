"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Order summary card (cart, checkout and confirmation).
 * Shipping is not priced on the site yet: it is confirmed with the customer on WhatsApp.
 */
export function OrderSummary({
  items,
  title = "Order summary",
  showItems = false,
  editLink = false,
  children,
  className,
}: {
  items: CartItem[];
  title?: string;
  showItems?: boolean;
  editLink?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const subtotal = items.reduce((n, i) => n + (i.price ?? 0) * i.quantity, 0);
  return (
    <section aria-label={title} className={cn("rounded-figure border border-forest/10 bg-sage/60 p-6 sm:p-8", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl text-emerald">{title}</h2>
        {editLink && (
          <Link href="/cart" className="py-1 text-sm text-teal-deep underline underline-offset-4 hover:text-emerald">
            Edit cart
          </Link>
        )}
      </div>

      {showItems && (
        <ul className="mt-6 space-y-4 border-b border-forest/10 pb-6">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-ivory">
                {i.image && <Image src={i.image} alt="" fill sizes="56px" className="object-cover" />}
                <span className="absolute top-0.5 right-0.5 grid size-5 place-items-center rounded-full bg-emerald text-[0.7rem] text-ivory">
                  {i.quantity}
                </span>
              </div>
              <p className="min-w-0 flex-1 text-sm font-medium text-emerald">{i.name}</p>
              <p className="text-sm text-forest">{formatPrice((i.price ?? 0) * i.quantity)}</p>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 divide-y divide-forest/10 text-sm">
        <div className="flex justify-between py-3">
          <dt className="text-forest/75">Subtotal</dt>
          <dd className="text-forest">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-6 py-3">
          <dt className="text-forest/75">Shipping</dt>
          <dd className="text-right text-forest/75">Confirmed with you</dd>
        </div>
        <div className="flex items-baseline justify-between py-4">
          <dt className="font-medium text-emerald">Total</dt>
          <dd className="font-display text-2xl text-emerald">{formatPrice(subtotal)}</dd>
        </div>
      </dl>
      {children}
    </section>
  );
}
