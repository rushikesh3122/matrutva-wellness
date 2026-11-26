"use client";

import { m } from "framer-motion";
import { process } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";

const ease = [0.22, 1, 0.36, 1] as const;

/** "From Nature to You": horizontal timeline on desktop, vertical on mobile. Steps from content/home.ts. */
export function ProcessJourney() {
  return (
    <Section tone="ivory" className="overflow-hidden">
      <Container>
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <m.div
            aria-hidden
            className="absolute top-8 right-[8%] left-[8%] hidden h-px origin-left bg-gradient-to-r from-gold/20 via-gold to-gold/20 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease }}
          />
          {/* connecting line (mobile) */}
          <div aria-hidden className="absolute top-2 bottom-2 left-8 w-px bg-gradient-to-b from-gold/20 via-gold to-gold/20 lg:hidden" />

          <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
            {process.steps.map((step, i) => (
              <m.li
                key={step.title}
                className="flex gap-5 lg:flex-col lg:items-center lg:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
              >
                <span className="relative grid size-16 shrink-0 place-items-center rounded-full border border-gold/60 bg-white text-emerald shadow-soft transition-colors duration-500 hover:bg-emerald hover:text-ivory">
                  <BrandIcon name={step.icon} className="size-6" />
                  <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-gold font-display text-[0.7rem] text-emerald">
                    {i + 1}
                  </span>
                </span>
                <div className="pt-2 lg:pt-0">
                  <h3 className="font-display text-base text-emerald lg:mt-4">{step.title}</h3>
                  <p className="mt-1 text-caption text-forest/75">{step.text}</p>
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
