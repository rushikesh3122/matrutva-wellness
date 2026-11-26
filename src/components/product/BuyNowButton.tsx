"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

/** "Buy now": puts the product in the cart (once) and goes straight to checkout. */
export function BuyNowButton({ product, className, children }: { product: Product; className?: string; children: ReactNode }) {
  const router = useRouter();
  const { items, addItem } = useCart();
  return (
    <button
      type="button"
      disabled={!product.inStock}
      onClick={() => {
        if (!items.some((i) => i.id === product.id)) addItem(product, 1);
        router.push("/checkout");
      }}
      className={className}
    >
      <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden />
      {children}
    </button>
  );
}
