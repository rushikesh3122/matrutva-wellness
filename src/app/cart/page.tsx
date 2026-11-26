import type { Metadata } from "next";
import { CartSummary } from "@/components/cart/CartSummary";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageIntro eyebrow="Your cart" title="Your selection." className="pb-0" />
      <section className="bg-ivory">
        <div className="container-luxe max-w-3xl pb-24">
          <CartSummary />
        </div>
      </section>
    </>
  );
}
