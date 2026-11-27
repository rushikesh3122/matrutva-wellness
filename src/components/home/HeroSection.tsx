import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/home";
import { whatsappHref } from "@/lib/settings";
import { getSettings } from "@/lib/live-settings";

/** Hero from the Figma design: mono eyebrow, Kalnia headline with a teal last line, the white bottle on the right. */
export async function HeroSection() {
  const wa = whatsappHref(await getSettings(), "Hi Matrutva Wellness, I have a question about your products.");
  return (
    <section aria-labelledby="hero-title" className="bg-ivory">
      <div className="container-luxe grid items-center gap-12 pt-10 pb-16 md:grid-cols-[1.1fr_1fr] md:gap-8 md:pt-16 lg:pt-20 lg:pb-24">
        <div className="animate-fade-up">
          <p className="eyebrow text-emerald/70">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.75rem,1.4rem+4.6vw,4.8rem)] leading-[1.07] font-normal tracking-[-0.02em] text-emerald"
          >
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-teal">{hero.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-sm text-lg leading-[1.625] text-forest/70">{hero.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-3 rounded-full bg-teal-deep px-7 py-3.5 font-medium text-ivory transition-colors hover:bg-emerald"
            >
              {hero.primaryCta.label} <span aria-hidden>→</span>
            </Link>
            <Link href={wa ?? "/contact"} className="eyebrow text-[0.7rem] text-forest/70 transition-colors hover:text-teal-deep">
              {wa ? hero.secondaryCta.label : "Ask a question"}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-figure bg-ivory-dark sm:max-w-md md:max-w-[28rem]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 768px) 448px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
