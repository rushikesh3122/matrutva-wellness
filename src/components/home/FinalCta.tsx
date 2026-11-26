import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/home";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FeatherWave } from "@/components/brand/FeatherWave";

/** Closing call to action before the newsletter and footer. */
export function FinalCta() {
  return (
    <Section tone="emerald" className="overflow-hidden" aria-labelledby="final-cta-title">
      <FeatherWave className="pointer-events-none absolute top-0 left-0 h-20 opacity-40 sm:h-28" />
      <Container className="relative grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="eyebrow text-gold">{finalCta.eyebrow}</p>
          <h2 id="final-cta-title" className="mt-4 font-display text-h2 text-ivory">
            {finalCta.title}
          </h2>
          <p lang="mr" className="mt-4 font-devanagari text-lead text-gold-light">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 max-w-xl text-lead text-ivory/85">{finalCta.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton tone="light" href={finalCta.primary.href} rightIcon={<ArrowRight />}>
              {finalCta.primary.label}
            </PrimaryButton>
            <SecondaryButton tone="light" href={finalCta.secondary.href}>
              {finalCta.secondary.label}
            </SecondaryButton>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-xs">
          <div aria-hidden className="absolute -inset-6 rounded-full border border-gold/30" />
          <div className="relative aspect-[476/558] overflow-hidden rounded-t-full rounded-b-card border-4 border-gold/40 shadow-lift">
            <Image src={finalCta.image.src} alt={finalCta.image.alt} fill sizes="320px" className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
