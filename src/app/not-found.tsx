import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { SecondaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Coming soon", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="section-y flex flex-col items-center gap-8 text-center">
      <SectionHeading
        as="h1"
        eyebrow="Coming soon"
        title="This page is still growing"
        description="We are crafting this part of the Matrutva experience. Please check back soon."
      />
      <SecondaryButton href="/" leftIcon={<ArrowLeft />}>
        Back to home
      </SecondaryButton>
    </Container>
  );
}
