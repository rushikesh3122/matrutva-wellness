import Image from "next/image";
import { AlertCircle, ArrowRight, Archive, Leaf as LeafIcon, Pill } from "lucide-react";
import { capsuleLabel } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PeacockFeather } from "@/components/brand/Botanicals";

/** Product feature with label details: highlights, usage, ingredients, nutrition, storage and warnings. */
export function ProductSpotlight() {
  const l = capsuleLabel;
  return (
    <Section tone="ivory" className="overflow-hidden" aria-labelledby="spotlight-title">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <PeacockFeather className="absolute -top-6 -right-4 z-10 w-14 rotate-12 sm:w-16" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-panel bg-sage shadow-lift">
            <Image src={l.image.src} alt={l.image.alt} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
          </div>
          <dl className="relative -mt-10 mx-4 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-gold/30 bg-gold/25 shadow-soft sm:grid-cols-4">
            {l.highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center bg-emerald px-2 py-4 text-center">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-h4 text-gold-light">{h.value}</dd>
                <dd className="mt-1 text-label tracking-[0.12em] text-ivory/90 uppercase">{h.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <SectionHeading align="left" eyebrow={l.eyebrow} title={<span id="spotlight-title">{l.title}</span>} description={l.description} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-card bg-white p-6">
              <Pill aria-hidden className="size-5 text-teal" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-base text-emerald">Suggested usage</h3>
              <p className="mt-1 text-caption text-forest/85">{l.usage}</p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-card bg-white p-6">
              <LeafIcon aria-hidden className="size-5 text-teal" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-base text-emerald">Ingredients</h3>
              <p className="mt-1 text-caption text-forest/85">{l.ingredients}</p>
            </Reveal>
          </div>

          <Reveal className="mt-4 overflow-hidden rounded-card border border-gold/30 bg-white">
            <table className="w-full text-left text-caption">
              <caption className="bg-sage px-6 py-3 text-left font-display text-sm text-emerald">{l.nutritionTitle}</caption>
              <tbody className="divide-y divide-gold/20">
                {l.nutrition.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-6 py-3 font-normal text-forest/85">{row.label}</th>
                    <td className="px-6 py-3 text-right font-medium text-emerald">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-card bg-white p-6">
              <Archive aria-hidden className="size-5 text-teal" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-base text-emerald">Storage</h3>
              <p className="mt-1 text-caption text-forest/85">{l.storage}</p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-card bg-white p-6">
              <AlertCircle aria-hidden className="size-5 text-gold-deep" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-base text-emerald">Please note</h3>
              <ul className="mt-1 space-y-1 text-caption text-forest/85">
                {l.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <p className="mt-5 text-caption text-forest/70 italic">{l.note}</p>
          <PrimaryButton href={l.cta.href} className="mt-7" rightIcon={<ArrowRight />}>
            {l.cta.label}
          </PrimaryButton>
        </div>
      </Container>
    </Section>
  );
}
