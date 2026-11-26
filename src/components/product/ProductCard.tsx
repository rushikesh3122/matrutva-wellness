"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { m } from "framer-motion";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
  /** Override the default behaviour (adding one unit to the cart) */
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlisted?: boolean;
  /** Load the image eagerly (use for above-the-fold cards) */
  priority?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlisted = false,
  priority = false,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const href = `/shop/${product.slug}`;
  const [primary, secondary] = product.images;
  const discount =
    product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  function handleAdd() {
    if (onAddToCart) onAddToCart(product);
    else addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <m.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-gold/20 bg-ivory-light shadow-soft transition-shadow duration-500 hover:shadow-lift",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-dark">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          {primary && (
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn(
                "object-cover transition-all duration-700 ease-luxe group-hover:scale-105",
                secondary && "group-hover:opacity-0",
              )}
            />
          )}
          {secondary && (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="scale-105 object-cover opacity-0 transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {product.badge && (
              <span className="rounded-full bg-emerald px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-ivory uppercase">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="w-fit rounded-full bg-gold px-3 py-1 text-[0.6rem] font-semibold tracking-[0.15em] text-emerald uppercase">
                {discount}% off
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onToggleWishlist?.(product)}
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="pointer-events-auto grid size-10 place-items-center rounded-full bg-ivory/90 text-emerald backdrop-blur transition hover:bg-ivory hover:text-teal"
          >
            <Heart className={cn("size-4", wishlisted && "fill-gold text-gold")} />
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 grid place-items-center bg-ivory/60 backdrop-blur-[2px]">
            <span className="eyebrow rounded-full bg-forest px-4 py-2 text-ivory">Out of stock</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {product.rating !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-forest/70">
            <div className="flex" role="img" aria-label={`Rated ${product.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden
                  className={cn(
                    "size-3.5",
                    i < Math.round(product.rating ?? 0) ? "fill-gold text-gold" : "text-gold/40",
                  )}
                />
              ))}
            </div>
            <span>
              {product.rating.toFixed(1)}
              {product.reviewCount ? ` (${product.reviewCount})` : ""}
            </span>
          </div>
        )}

        <div>
          <h3 className="font-display text-lg leading-snug text-emerald sm:text-xl">
            <Link href={href} className="transition-colors hover:text-teal">
              {product.name}
            </Link>
          </h3>
          {product.subtitle && <p className="mt-1 text-sm text-forest/60">{product.subtitle}</p>}
        </div>

        {product.benefits && product.benefits.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {product.benefits.map((b) => (
              <li key={b} className="rounded-full border border-teal/20 bg-teal/5 px-2.5 py-0.5 text-[0.7rem] text-teal">
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-emerald">{formatPrice(product.price)}</span>
            {discount > 0 && product.mrp && (
              <span className="text-sm text-forest/60 line-through">{formatPrice(product.mrp)}</span>
            )}
          </div>
        </div>

        <Button
          variant={added ? "gold" : "primary"}
          fullWidth
          onClick={handleAdd}
          disabled={!product.inStock}
          leftIcon={added ? <Check /> : <ShoppingBag />}
          aria-live="polite"
        >
          {added ? "Added" : "Add to cart"}
        </Button>
      </div>
    </m.article>
  );
}
