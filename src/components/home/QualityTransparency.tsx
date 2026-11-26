import { ArrowRight, FileText, Lock } from "lucide-react";
import { quality } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/LogoMark";
import { FeatherWave } from "@/components/brand/FeatherWave";

/** Quality pillars + document slots. Documents show "Coming soon" until a real file is linked. */
export function QualityTransparency() {
  return (
    <Section tone="emerald" className="overflow-hidden">
      <LogoMark variant="gold" title="" className="pointer-events-none absolute -top-16 -left-16 w-80 opacity-[0.05]" />
      <FeatherWave className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-40" />
      <Container className="relative">
        <SectionHeading tone="light" eyebrow={quality.eyebrow} title={quality.title} description={quality.description} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quality.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="group h-full rounded-card border border-ivory/15 bg-ivory/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:bg-ivory/[0.07]">
                <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-gold-light">
                  <BrandIcon name={p.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-h4 text-ivory">{p.title}</h3>
                <p className="mt-2 text-caption text-ivory/80">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <h3 className="eyebrow text-center text-gold-light">Certificates & Reports</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {quality.documents.map((d) => {
              const content = (
                <>
                  <FileText className="size-5 shrink-0 text-gold-light" aria-hidden />
                  <span className="flex-1 text-sm text-ivory">{d.title}</span>
                  <span className="flex items-center gap-1 rounded-full border border-ivory/20 px-2.5 py-1 text-[0.65rem] tracking-wider text-ivory/80 uppercase">
                    {!d.href && <Lock className="size-3" aria-hidden />}
                    {d.href ? "View" : d.status}
                  </span>
                </>
              );
              return (
                <li key={d.title}>
                  {d.href ? (
                    <a href={d.href} className="flex items-center gap-3 rounded-card border border-gold/40 px-5 py-4 transition hover:bg-ivory/5">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-card border border-dashed border-ivory/25 px-5 py-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <PrimaryButton tone="light" href={quality.cta.href} rightIcon={<ArrowRight />}>
            {quality.cta.label}
          </PrimaryButton>
        </div>
      </Container>
    </Section>
  );
}
