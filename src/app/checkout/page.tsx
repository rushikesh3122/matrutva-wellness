import type { Metadata } from "next";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="bg-ivory">
      <div className="container-luxe pt-12 pb-24 md:pt-16">
        <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] leading-tight text-emerald">Checkout</h1>
        <CheckoutSteps current={2} />
        <CheckoutForm />
      </div>
    </section>
  );
}
