import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { hero } from "@/content/home";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Leaf, LeafSprig, PeacockFeather } from "@/components/brand/Botanicals";
import { LogoMark } from "@/components/brand/LogoMark";
import { RotatingSeal } from "./RotatingSeal";

/**
 * Homepage hero. Server-rendered for the fastest first paint; motion comes from
 * CSS (float / sway / fade-up), so the bottle photo (the LCP element) is never hidden.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* soft background light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-sage/70 blur-3xl" />
        <div className="absolute right-0 -bottom-40 size-[30rem] rounded-full bg-gold/10 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-[1.12fr_1fr] lg:gap-8 lg:pt-16 lg:pb-28">
        {/* Copy */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="eyebrow animate-fade-up flex items-center gap-3 text-teal">
            <span aria-hidden className="h-px w-8 bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,1.5rem+3.4vw,4.2rem)] leading-[1.05] font-medium text-balance text-emerald">
            <span className="block">{hero.title[0]}</span>
            <span className="mt-1 block font-serif text-[0.92em] font-normal text-teal italic">{hero.title[1]}</span>
          </h1>
          <p lang="mr" className="mt-5 font-devanagari text-xl text-gold-deep">
            {siteConfig.tagline}
          </p>
          <p className="mt-5 max-w-xl text-lead text-forest/80">{hero.description}</p>

          <div className="mt-8 flex w-full flex-col gap-3 xs:w-auto xs:flex-row">
            <PrimaryButton href={hero.primaryCta.href} size="lg" rightIcon={<ArrowRight />}>
              {hero.primaryCta.label}
            </PrimaryButton>
            <SecondaryButton href={hero.secondaryCta.href} size="lg">
              {hero.secondaryCta.label}
            </SecondaryButton>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-caption text-forest/80 lg:justify-start">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-emerald/10 text-emerald">
                  <Check className="size-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: the bottle is the hero */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          {/* circle backdrop (teal / sage split) */}
          <div aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-sage">
              <div className="absolute inset-x-0 bottom-0 h-[46%] bg-teal" />
              <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[44%] h-10 w-full">
                <path d="M0 40C80 0 160 60 240 30C300 8 360 20 400 10V60H0Z" fill="#0E687A" />
                <path d="M0 42C80 2 160 62 240 32C300 10 360 22 400 12" stroke="#C9A66A" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="absolute -inset-3 rounded-full border border-gold/50" />
          </div>

          {/* feather + leaves breaking out of the circle */}
          <PeacockFeather className="animate-sway absolute -top-6 -right-4 w-20 origin-bottom opacity-90 [--sway-from:6deg] [--sway-to:12deg] sm:w-24 lg:-right-8" />
          <LeafSprig className="animate-sway absolute -bottom-10 -left-10 w-40 origin-bottom-left [--sway-from:-3deg] [--sway-to:3deg] sm:w-48 lg:-left-16" />
          <Leaf tone="teal" className="animate-float absolute top-[18%] -left-6 w-12 -rotate-[35deg] sm:w-14" />
          <Leaf tone="leaf" className="animate-float absolute -right-2 bottom-[16%] w-12 rotate-[30deg] [animation-delay:-3s] sm:w-16" />

          {/* bottle photograph in an arch */}
          <div className="relative mx-auto aspect-[3/4] w-[78%] overflow-hidden rounded-t-full rounded-b-[2.5rem] border-4 border-white shadow-lift">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 360px, 78vw"
              className="object-cover object-[50%_40%]"
            />
          </div>

          {/* rotating brand seal */}
          <div className="absolute right-[2%] -bottom-6 w-24 sm:w-28 lg:right-[4%]">
            <RotatingSeal />
          </div>
          <LogoMark variant="gold" title="" className="absolute top-[6%] left-[6%] w-8 opacity-80" />
        </div>
      </Container>
    </section>
  );
}
