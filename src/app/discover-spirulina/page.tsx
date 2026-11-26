import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { OrderCta, RitualSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Discover Spirulina",
  description:
    "What spirulina is, where it grows and what it contains: a plain guide to the blue-green microalga behind Matrutva Wellness Spirulina Capsules.",
  alternates: { canonical: "/discover-spirulina" },
};

/** General values as reported in nutrition literature. Not product-specific claims. */
const composition = [
  { value: "55–70%", label: "Plant protein", text: "Typical share of dry weight reported in nutrition literature." },
  { value: "Fe · Mg · K", label: "Minerals", text: "Including iron, magnesium and potassium." },
  { value: "B · β", label: "Vitamins", text: "Including B-group vitamins and beta-carotene." },
  { value: "Blue", label: "Phycocyanin", text: "The natural pigment behind its blue-green colour." },
];

const facts = [
  { title: "A microalga, not a seaweed", text: "Spirulina is a blue-green microalga (a cyanobacterium) that grows naturally in warm, alkaline lakes." },
  { title: "Eaten for centuries", text: "It has been gathered and eaten as food for hundreds of years, and is now cultivated carefully around the world." },
  { title: "Dense, in a small serving", text: "A small daily amount brings plant protein, minerals and vitamins, which is why it fits so easily into a routine." },
];

export default function DiscoverSpirulinaPage() {
  return (
    <>
      <PageIntro
        eyebrow="Discover Spirulina"
        title="A tiny spiral."
        accent="Remarkable nutrition."
        description="Spirulina is one of the oldest foods on earth. Here is what it is, where it comes from, and why people make it part of their day."
      />

      <section aria-labelledby="what-title" className="border-y border-forest/10 bg-ivory">
        <div className="container-luxe grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-figure bg-white">
            <Image
              src="/images/products/white-bottle-front.jpg"
              alt="Matrutva Wellness Spirulina Capsules bottle"
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              className="object-contain p-6"
            />
          </Reveal>
          <div>
            <p className="eyebrow text-teal-deep">What it is</p>
            <h2 id="what-title" className="mt-5 font-display text-[clamp(2.1rem,1.5rem+2.2vw,3.2rem)] leading-[1.12] tracking-[-0.02em] text-emerald">
              Living blue-green, from warm water.
            </h2>
            <ul className="mt-10 space-y-8">
              {facts.map((f, i) => (
                <li key={f.title} className="flex gap-6">
                  <span aria-hidden className="font-display text-3xl leading-none text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-emerald">{f.title}</h3>
                    <p className="mt-2 leading-relaxed text-forest/75">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="inside-title" className="bg-ivory">
        <div className="container-luxe py-24 md:py-32">
          <SectionTitle id="inside-title" eyebrow="What's inside spirulina" title="Small serving. Long list." />
          <dl className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-figure border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-4">
            {composition.map((c) => (
              <div key={c.label} className="flex flex-col bg-ivory p-8 text-center">
                <dd className="font-display text-4xl text-emerald">{c.value}</dd>
                <dt className="eyebrow mt-3 text-[0.62rem] text-teal-deep">{c.label}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-forest/70">{c.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-forest/70">
            General values reported in nutrition literature. For our product, see the{" "}
            <Link href="/shop/spirulina-capsules" className="underline underline-offset-4 hover:text-emerald">
              label details
            </Link>
            .
          </p>
        </div>
      </section>

      <RitualSection />

      <section className="bg-ivory">
        <p className="container-luxe max-w-3xl pb-20 text-center text-sm leading-relaxed text-forest/70">
          Spirulina is a food supplement, not a medicine, and not a substitute for a varied diet. Consult your doctor if you are pregnant,
          nursing or on medication.
        </p>
      </section>

      <OrderCta />
    </>
  );
}
