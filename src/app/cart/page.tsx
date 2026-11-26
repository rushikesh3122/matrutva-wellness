import type { Metadata } from "next";
import Link from "next/link";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <section className="bg-ivory">
      <div className="container-luxe max-w-6xl pt-12 pb-24 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] leading-tight text-emerald">Your cart</h1>
          <Link href="/shop" className="py-1 text-forest underline underline-offset-4 hover:text-teal-deep">
            Continue shopping
          </Link>
        </div>
        {/* Reserved height keeps the footer still while the saved cart loads (no layout shift). */}
        <div className="min-h-[34rem]">
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
