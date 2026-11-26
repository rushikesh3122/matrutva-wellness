import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { homeFaq } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Short FAQ using native <details>, so it works without JavaScript and is fully indexable. */
export function HomeFaq() {
  return (
    <Section tone="sage" aria-labelledby="faq-title">
      <Container className="max-w-narrow">
        <SectionHeading eyebrow={homeFaq.eyebrow} title={<span id="faq-title">{homeFaq.title}</span>} />
        <div className="mt-10 divide-y divide-gold/25 overflow-hidden rounded-card border border-gold/25 bg-white">
          {homeFaq.items.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-base text-emerald marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus aria-hidden className="size-5 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="px-6 pb-5 text-forest/85">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={homeFaq.cta.href} className="inline-flex items-center gap-2 text-caption font-medium tracking-[0.16em] text-emerald uppercase hover:text-teal">
            {homeFaq.cta.label} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
