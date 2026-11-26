import { philosophy } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/LogoMark";
import { Leaf, PeacockFeather } from "@/components/brand/Botanicals";
import { FeatherWave } from "@/components/brand/FeatherWave";

/** Small glyph for each part of the logo, drawn from the brand's own shapes. */
function LogoPart({ part }: { part: (typeof philosophy.logoMeaning)[number]["part"] }) {
  switch (part) {
    case "feather":
      return <PeacockFeather className="h-10 w-auto" />;
    case "leaf":
      return <Leaf tone="emerald" className="h-9 w-auto" />;
    case "curve":
      return (
        <svg viewBox="0 0 40 40" aria-hidden className="size-9">
          <path d="M20 4C9 10 6 22 12 32c3 4 6 5 8 5" fill="none" stroke="var(--color-emerald)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M20 4c11 6 14 18 8 28-3 4-6 5-8 5" fill="none" stroke="var(--color-teal)" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "dot":
      return <span className="block size-6 rounded-full bg-gradient-to-br from-gold-light to-gold-dark shadow-soft" />;
    case "mark":
      return <LogoMark title="" className="h-10 w-auto" />;
  }
}

/** Brand philosophy and the meaning behind the peacock logo (from the brand board). */
export function BrandPhilosophy() {
  return (
    <Section tone="sage" className="overflow-hidden" aria-labelledby="philosophy-title">
      <FeatherWave className="pointer-events-none absolute bottom-0 left-0 h-20 opacity-40 sm:h-28" flip />
      <Container className="relative grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow={philosophy.eyebrow}
            title={<span id="philosophy-title">{philosophy.title}</span>}
            description={philosophy.description}
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {philosophy.values.map((v, i) => (
              <li key={v.title} className={i === philosophy.values.length - 1 ? "sm:col-span-2" : undefined}>
                <Reveal delay={i * 0.06} className="flex items-center gap-4 rounded-card border border-gold/25 bg-white px-5 py-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage text-emerald">
                    <BrandIcon name={v.icon} className="size-5" />
                  </span>
                  <span className="font-display text-base text-emerald">{v.title}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="rounded-panel bg-white p-7 shadow-soft sm:p-10">
          <h3 className="eyebrow text-teal">{philosophy.logoTitle}</h3>
          <div className="gold-rule mt-4" />
          <ul className="mt-6 divide-y divide-gold/20">
            {philosophy.logoMeaning.map((item) => (
              <li key={item.title} className="flex items-center gap-5 py-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory">
                  <LogoPart part={item.part} />
                </span>
                <span>
                  <span className="block font-display text-base text-emerald">{item.title}</span>
                  <span className="mt-0.5 block text-caption text-forest/80">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
