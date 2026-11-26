import type { Metadata } from "next";
import { CartSummary } from "@/components/cart/CartSummary";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <section className="bg-ivory">
      <div className="container-luxe pt-12 pb-24 md:pt-16">
        <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] leading-tight text-emerald">Your cart</h1>
        <CheckoutSteps current={1} />
        <CartSummary />
      </div>
    </section>
  );
}
