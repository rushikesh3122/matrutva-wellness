"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  /** Override the default behaviour (adding one unit to the cart) */
  onAddToCart?: (product: Product) => void;
  /** Load the image eagerly (use for above-the-fold cards) */
  priority?: boolean;
  /** Stagger index for the entrance animation */
  index?: number;
  className?: string;
};

/** Product tile: image, quantity, name, short description, price, View Product and Add to Cart. */
export function ProductCard({
  product,
  onAddToCart,
  priority = false,
  index = 0,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const href = `/shop/${product.slug}`;
  const [primary, secondary] = product.images;
  const hasPrice = product.price !== null;
  const discount =
    hasPrice &&
    product.mrp &&
    product.price !== null &&
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function handleAdd() {
    if (onAddToCart) onAddToCart(product);
    else addItem(product);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      style={{ "--reveal-delay": Math.min(index * 0.16, 1) } as CSSProperties}
      className={cn(
        "reveal group relative flex h-full flex-col overflow-hidden rounded-card border border-gold/20 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[4/5] overflow-hidden bg-ivory-dark"
      >
        {primary && (
          <Image
            src={primary.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 90vw"
            className={cn(
              "object-cover transition-all duration-700 ease-luxe group-hover:scale-105",
              secondary && "group-hover:opacity-0",
            )}
          />
        )}
        {secondary && (
          <Image
            src={secondary.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 90vw"
            className="scale-105 object-cover opacity-0 transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100"
          />
        )}

        <span className="absolute inset-x-4 top-4 flex flex-wrap items-start gap-2">
          {product.badge && (
            <span className="rounded-full bg-emerald px-3 py-1 text-[0.625rem] font-medium tracking-[0.18em] text-ivory uppercase">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.625rem] font-semibold tracking-[0.15em] text-emerald uppercase">
              {discount}% off
            </span>
          )}
          {product.isDemo && (
            <span className="ml-auto rounded-full bg-white/90 px-3 py-1 text-[0.625rem] font-medium tracking-[0.15em] text-forest uppercase backdrop-blur">
              Demo image
            </span>
          )}
        </span>

        {!product.inStock && (
          <span className="absolute inset-0 grid place-items-center bg-ivory/60 backdrop-blur-[2px]">
            <span className="eyebrow rounded-full bg-forest px-4 py-2 text-ivory">
              Out of stock
            </span>
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <p className="eyebrow text-teal">{product.quantity}</p>
        <h3 className="font-display text-h4 text-emerald">
          <Link href={href} className="transition-colors hover:text-teal">
            {product.name}
          </Link>
        </h3>
        <p className="text-caption text-forest/75">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span
            className={cn(
              "font-display text-emerald",
              hasPrice ? "text-2xl" : "text-base text-forest/80",
            )}
          >
            {formatPrice(product.price)}
          </span>
          {discount > 0 && product.mrp && (
            <span className="text-sm text-forest/60 line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Button
            variant={added ? "gold" : "primary"}
            size="sm"
            fullWidth
            onClick={handleAdd}
            disabled={!product.inStock}
            leftIcon={added ? <Check /> : <ShoppingBag />}
          >
            {added ? "Added to cart" : "Add to cart"}
            <span className="sr-only">: {product.name}</span>
          </Button>
          <Button href={href} variant="outline" size="sm" fullWidth>
            View product
            <span className="sr-only">: {product.name}</span>
          </Button>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {added ? `${product.name} added to cart` : ""}
        </span>
      </div>
    </article>
  );
}
