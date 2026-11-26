import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { OrderCta, PromiseSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Matrutva means motherhood. Why we started Matrutva Wellness, and the promise behind every bottle.",
  alternates: { canonical: "/our-story" },
};

const values = [
  { title: "Pure & natural", text: "One ingredient, clearly labelled. Nothing hidden." },
  { title: "Protective & caring", text: "Choices made the way a mother chooses for her family." },
  { title: "Balanced living", text: "Small, steady habits over quick fixes." },
  { title: "For a healthier tomorrow", text: "Nutrition that fits easily into everyday life." },
];

export default function OurStoryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Story"
        title="Born from a mother's"
        accent="instinct to nourish."
        description="Matrutva means motherhood. Our philosophy is simple: nourish the people you love the way a mother would, with care, honesty and the best that nature offers."
      />

      <section className="border-y border-forest/10 bg-ivory">
        <div className="container-luxe grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-figure bg-ivory-dark">
            <Image
              src="/images/products/white-bottle-hero.jpg"
              alt="Matrutva Wellness Spirulina Capsules bottle beside natural stone"
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal className="max-w-lg space-y-6 text-lg leading-[1.7] text-forest/75">
            <p>
              Matrutva Wellness began with a simple question: how would a mother choose nutrition for her family? She would look for something pure,
              honest and genuinely nourishing.
            </p>
            <p>
              Inspired by India&apos;s timeless respect for nature and the grace of the peacock, we bring spirulina to modern Indian homes,
              presented with the care it deserves.
            </p>
            <p className="font-display text-2xl leading-snug text-emerald">Nourishment with a mother&apos;s care.</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-ivory">
        <div className="container-luxe py-24 md:py-32">
          <SectionTitle id="values-title" eyebrow="What guides us" title="Four quiet promises." />
          <ol className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="text-center">
                <span aria-hidden className="font-display text-4xl text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl text-emerald">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-forest/70">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PromiseSection />
      <OrderCta />
    </>
  );
}
