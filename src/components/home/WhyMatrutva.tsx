import Image from "next/image";
import { why } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LeafSprig } from "@/components/brand/Botanicals";

export function WhyMatrutva() {
  return (
    <Section tone="sage" className="overflow-hidden">
      <LeafSprig className="pointer-events-none absolute -top-6 -right-10 hidden w-64 rotate-[200deg] opacity-30 lg:block" />
      <Container className="relative">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} description={why.description} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1} className="h-full">
              <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-card bg-emerald shadow-soft">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover opacity-80 transition-transform duration-[1.2s] ease-luxe group-hover:scale-110"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald via-emerald/75 to-emerald/5" />
                <div className="relative p-6">
                  <span className="font-display text-sm text-gold-light">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-h4 text-ivory">{card.title}</h3>
                  <div className="my-3 h-px w-10 bg-gold transition-all duration-700 group-hover:w-20" />
                  <p className="text-caption text-ivory/85">{card.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
