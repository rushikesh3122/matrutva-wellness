import { Info } from "lucide-react";
import { testimonialsSection } from "@/content/home";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Leaf } from "@/components/brand/Botanicals";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export function Testimonials() {
  const hasSamples = testimonials.some((t) => t.isSample);
  return (
    <Section tone="sage" className="overflow-hidden">
      <Leaf tone="leaf" className="pointer-events-none absolute top-10 -left-6 hidden w-20 -rotate-[30deg] opacity-40 md:block" />
      <Leaf tone="teal" className="pointer-events-none absolute -right-4 bottom-10 hidden w-24 rotate-[25deg] opacity-30 md:block" />
      <Container className="relative">
        <SectionHeading eyebrow={testimonialsSection.eyebrow} title={testimonialsSection.title} />
        <div className="mt-12">
          <TestimonialsCarousel items={testimonials} />
        </div>
        {hasSamples && (
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-caption text-forest/75">
            <Info className="size-3.5 shrink-0 text-teal" aria-hidden /> {testimonialsSection.note}
          </p>
        )}
      </Container>
    </Section>
  );
}
