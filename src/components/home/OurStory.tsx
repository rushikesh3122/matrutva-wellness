import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { story } from "@/content/home";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SecondaryButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PeacockFeather } from "@/components/brand/Botanicals";

/** Editorial brand story with an image collage. */
export function OurStory() {
  return (
    <Section tone="white" className="overflow-hidden">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* collage */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <PeacockFeather className="absolute -top-10 -left-6 w-16 -rotate-12 opacity-80 sm:w-20" />
          <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-full rounded-b-card shadow-lift">
            <Image src={story.images.main.src} alt={story.images.main.alt} fill sizes="(min-width: 1024px) 38vw, 80vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 left-0 aspect-[4/3] w-[52%] overflow-hidden rounded-card border-4 border-white shadow-lift">
            <Image src={story.images.secondary.src} alt={story.images.secondary.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute top-8 -right-3 bottom-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        </Reveal>

        {/* text */}
        <div className="pt-6 lg:pt-0">
          <SectionHeading align="left" eyebrow={story.eyebrow} title={story.title} />
          <Reveal className="mt-6 space-y-5 text-forest/85">
            {story.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-gold-deep" : undefined}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="mt-8 rounded-card border-l-2 border-gold bg-ivory px-6 py-5">
              <Quote aria-hidden className="size-5 text-gold" />
              <blockquote className="mt-2 font-serif text-h4 text-emerald italic">{story.quote}</blockquote>
              <figcaption lang="mr" className="mt-1 font-devanagari text-gold-deep">
                {siteConfig.tagline}
              </figcaption>
            </figure>
            <SecondaryButton href={story.cta.href} className="mt-8" rightIcon={<ArrowRight />}>
              {story.cta.label}
            </SecondaryButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
