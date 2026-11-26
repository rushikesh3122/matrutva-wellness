import Image from "next/image";
import { ArrowRight, Check, Info } from "lucide-react";
import { discover } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Leaf, SpirulinaSpiral } from "@/components/brand/Botanicals";

/** Educational section: what spirulina is, its typical composition, how to take it and why people do. */
export function DiscoverSpirulina() {
  return (
    <Section id="discover-spirulina" className="overflow-hidden">
      {/* oversized faint watermark word */}
      <p
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 font-display text-[22vw] leading-none whitespace-nowrap text-emerald/[0.04] select-none lg:top-32 lg:text-[14rem]"
      >
        {discover.watermark}
      </p>

      <Container className="relative">
        <SectionHeading eyebrow={discover.eyebrow} title={discover.title} description={discover.intro} />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          {/* left: composition */}
          <Reveal className="order-2 lg:order-1">
            <h3 className="font-display text-h4 text-emerald lg:text-right">Nutritional Composition</h3>
            <ul className="mt-6 space-y-5">
              {discover.composition.map((c) => (
                <li key={c.label} className="relative lg:pr-16 lg:text-right">
                  <p className="font-medium text-emerald">{c.label}</p>
                  <p className="text-caption text-forest/75">{c.value}</p>
                  <span aria-hidden className="absolute top-3 right-0 hidden h-px w-12 bg-gold lg:block" />
                </li>
              ))}
            </ul>
            <p className="mt-5 flex gap-2 text-caption text-forest/70 lg:justify-end lg:text-right">
              <Info className="mt-0.5 size-3.5 shrink-0 text-teal" /> {discover.compositionNote}
            </p>
          </Reveal>

          {/* centre: product */}
          <Reveal className="relative order-1 mx-auto w-64 sm:w-72 lg:order-2 lg:w-80">
            <div aria-hidden className="absolute inset-0 -z-10 scale-110 rounded-full bg-sage" />
            <SpirulinaSpiral className="absolute -top-4 left-1/2 w-40 -translate-x-1/2 text-teal/40" />
            <Leaf tone="emerald" className="absolute top-1/3 -left-8 w-14 -rotate-[30deg]" />
            <Leaf tone="leaf" className="absolute -right-6 bottom-10 w-12 rotate-[25deg]" />
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-white shadow-lift">
              <Image
                src="/images/products/spirulina-capsules-main.jpg"
                alt="Matrutva Wellness Spirulina Capsules"
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* right: why */}
          <Reveal className="order-3" delay={0.1}>
            <h3 className="font-display text-h4 text-emerald">{discover.why.title}</h3>
            <ul className="mt-6 space-y-4">
              {discover.why.points.map((p) => (
                <li key={p} className="relative flex items-start gap-3 lg:pl-16">
                  <span aria-hidden className="absolute top-3 left-0 hidden h-px w-12 bg-gold lg:block" />
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald text-ivory">
                    <Check className="size-3" />
                  </span>
                  <span className="text-forest/85">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* how to enjoy */}
        <Reveal className="mt-16 rounded-panel border border-gold/25 bg-white p-6 shadow-soft sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-center">
            <h3 className="font-display text-h3 text-emerald">{discover.howTo.title}</h3>
            <ol className="grid gap-6 md:grid-cols-3">
              {discover.howTo.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-3xl leading-none text-gold">{i + 1}</span>
                  <p className="text-caption text-forest/85">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="gold-rule my-8 opacity-60" />
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <p className="max-w-2xl text-caption text-forest/70">{discover.disclaimer}</p>
            <PrimaryButton href={discover.cta.href} rightIcon={<ArrowRight />}>
              {discover.cta.label}
            </PrimaryButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
