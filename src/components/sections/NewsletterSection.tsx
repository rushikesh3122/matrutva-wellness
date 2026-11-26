import { Leaf } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/brand/LogoMark";
import { FeatherWave } from "@/components/brand/FeatherWave";

type NewsletterSectionProps = {
  title?: string;
  description?: string;
};

/** Emerald band inviting visitors to join the mailing list. */
export function NewsletterSection({
  title = "Join Our Wellness Circle",
  description = "Seasonal rituals, spirulina recipes and early access to new launches, delivered with care.",
}: NewsletterSectionProps) {
  return (
    <section className="section-y-sm px-4 sm:px-6">
      <Container size="wide" className="relative overflow-hidden rounded-panel bg-emerald px-6 py-14 sm:px-12 sm:py-20">
        {/* botanical ornaments */}
        <LogoMark variant="gold" title="" className="pointer-events-none absolute -top-10 -right-10 w-56 opacity-[0.07] sm:w-72" />
        <FeatherWave className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-50 sm:h-24" />

        <div className="relative flex flex-col items-center gap-8 text-center">
          <SectionHeading tone="light" eyebrow="Newsletter" title={title} marathi={siteConfig.tagline} description={description} />
          <NewsletterForm tone="light" />
          <p className="flex items-center gap-2 text-caption text-ivory/75">
            <Leaf className="size-3.5 text-gold" /> No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
