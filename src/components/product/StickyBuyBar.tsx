"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Bottom "Add to cart" bar for product pages.
 * Always visible on phones (it replaces the quick-shop bar there); on larger
 * screens it slides in once the main buy buttons (#buy-box) scroll out of view.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const { addItem, count } = useCart();
  const [buyBoxVisible, setBuyBoxVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const hidden = isDesktop && buyBoxVisible;
  const price = product.price ? formatPrice(product.price) : null;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onMq = () => setIsDesktop(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const target = document.getElementById("buy-box");
    if (!target) return () => mq.removeEventListener("change", onMq);
    const io = new IntersectionObserver(([entry]) => setBuyBoxVisible(entry.isIntersecting || entry.boundingClientRect.top > 0));
    io.observe(target);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="h-18 md:hidden" />
      <div
        inert={hidden}
        aria-hidden={hidden || undefined}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-300",
          hidden && "translate-y-full",
        )}
      >
        <div className="container-luxe flex h-18 items-center gap-3 sm:gap-4">
          <Image
            src={product.images[0].src}
            alt=""
            width={48}
            height={48}
            className="hidden size-12 rounded-xl object-cover sm:block"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base leading-6 sm:text-lg text-emerald">{product.name}</p>
            <p className="truncate text-xs text-forest/70">
              {price ?? "Price coming soon"} · {product.quantity}
            </p>
          </div>
          <Link
            href="/cart"
            aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
            className="relative grid size-11 shrink-0 place-items-center rounded-full border border-forest/20 text-emerald md:hidden"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span aria-hidden className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-gold text-[0.65rem] font-medium text-emerald">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              if (addItem(product, 1) === 0) return;
              setAdded(true);
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setAdded(false), 1800);
            }}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-teal-deep px-5 text-sm font-medium text-ivory transition-colors hover:bg-emerald disabled:opacity-50 sm:px-7"
          >
            {added ? (
              <>
                <Check className="size-4" aria-hidden /> Added
              </>
            ) : (
              <>
                Add to cart
                {price && <span className="hidden sm:inline">· {price}</span>}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
