import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { OrderCta } from "@/components/home";

export const metadata: Metadata = {
  title: "Quality & Transparency",
  description: "What we share with every Matrutva Wellness product: ingredients, label details, batch information and testing documents.",
  alternates: { canonical: "/quality" },
};

const pillars = [
  { title: "Ingredient information", text: "Every ingredient is listed clearly on the label. Our capsules list one: spirulina." },
  { title: "Batch details", text: "Batch number, manufacturing date and expiry date are printed on every pack." },
  { title: "Laboratory testing", text: "Batch testing details will be published here as reports become available." },
  { title: "Honest labelling", text: "Directions, storage and cautions are written plainly, with no medical claims." },
];

const journey = ["Sourcing", "Cultivation", "Harvesting", "Gentle drying", "Quality checks", "Packing"];

/** Replace with real certificates and lab reports. Leave `href` empty until a document exists. */
const documents = [
  { title: "Batch lab report", status: "Coming soon", href: "" },
  { title: "Licences & registrations", status: "Coming soon", href: "" },
  { title: "Ingredient specification", status: "Coming soon", href: "" },
];

export default function QualityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Quality & Transparency"
        title="Know exactly"
        accent="what you are taking."
        description="Trust is earned with information. Here is what we share with every bottle, and the documents we publish as they become available."
      />

      <section aria-label="What we share" className="border-y border-forest/10 bg-ivory">
        <ul className="container-luxe grid gap-px bg-forest/10 py-px sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} className="bg-ivory px-2 py-12 sm:px-8">
              <span aria-hidden className="font-display text-3xl text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-xl text-emerald">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-forest/70">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="journey-title" className="bg-ivory">
        <div className="container-luxe py-24 md:py-32">
          <SectionTitle id="journey-title" eyebrow="From nature to you" title="A careful journey." />
          <ol className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-x-4 gap-y-6">
            {journey.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="rounded-full border border-forest/15 px-5 py-2.5 font-mono text-xs tracking-[0.16em] text-emerald uppercase">
                  {step}
                </span>
                {i < journey.length - 1 && (
                  <span aria-hidden className="text-forest/50">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="docs-title" className="border-t border-forest/10 bg-ivory">
        <div className="container-luxe py-24 md:py-28">
          <SectionTitle id="docs-title" eyebrow="Documents" title="Published as they arrive." />
          <ul className="mx-auto mt-12 max-w-3xl divide-y divide-forest/10 border-y border-forest/10">
            {documents.map((d) => (
              <li key={d.title} className="flex items-center justify-between gap-6 py-6">
                <span className="font-display text-xl text-emerald">{d.title}</span>
                {d.href ? (
                  <a href={d.href} className="eyebrow text-teal-deep underline underline-offset-4">
                    View
                  </a>
                ) : (
                  <span className="eyebrow text-[0.62rem] text-forest/65">{d.status}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OrderCta />
    </>
  );
}
