import type { Metadata } from "next";
import { CartSummary } from "@/components/cart/CartSummary";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <Container size="narrow" className="section-y">
      <SectionHeading as="h1" eyebrow="Your Cart" title="Your Selection" />
      <CartSummary />
    </Container>
  );
}
