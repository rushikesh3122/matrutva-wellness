import type { Metadata } from "next";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderConfirm } from "@/components/checkout/OrderConfirm";

export const metadata: Metadata = { title: "Confirm your order", robots: { index: false } };

export default function ConfirmPage() {
  return (
    <section className="bg-ivory">
      <div className="container-luxe pt-12 pb-24 md:pt-16">
        <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] leading-tight text-emerald">Confirm your order</h1>
        <CheckoutSteps current={3} />
        <OrderConfirm />
      </div>
    </section>
  );
}
