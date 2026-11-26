import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { LeafSprig } from "@/components/brand/Botanicals";

type PagePlaceholderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  children?: React.ReactNode;
};

/**
 * Branded placeholder for pages scheduled in later stages.
 * Keeps every navigation link working (200, not 404) until the real page replaces it.
 */
export function PagePlaceholder({
  eyebrow = "Coming soon",
  title,
  description = "We are carefully crafting this page. In the meantime, explore our spirulina collection.",
  primary = { label: "Explore Products", href: "/#featured-products" },
  children,
}: PagePlaceholderProps) {
  return (
    <section className="relative overflow-hidden">
      <LeafSprig className="pointer-events-none absolute -top-6 -right-12 w-56 rotate-[200deg] opacity-25" />
      <Container size="narrow" className="section-y relative flex flex-col items-center gap-8 text-center">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} marathi={siteConfig.tagline} description={description} />
        {children}
        <div className="flex flex-col gap-3 xs:flex-row">
          <PrimaryButton href={primary.href} rightIcon={<ArrowRight />}>
            {primary.label}
          </PrimaryButton>
          <SecondaryButton href="/" leftIcon={<ArrowLeft />}>
            Back to home
          </SecondaryButton>
        </div>
      </Container>
      <FeatherWave className="h-16 sm:h-24" />
    </section>
  );
}
