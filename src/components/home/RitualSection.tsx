import { ritual } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/** "Small ritual. Long arc." Three numbered steps. */
export function RitualSection() {
  return (
    <section id="ritual" aria-labelledby="ritual-title" className="scroll-mt-20 bg-ivory">
      <div className="container-luxe py-24 md:py-36">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-emerald/70">{ritual.eyebrow}</p>
          <h2
            id="ritual-title"
            className="mt-6 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.4rem)] leading-[1.25] font-light tracking-[-0.02em] text-emerald"
          >
            {ritual.title}
          </h2>
        </Reveal>
        <ol className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3 md:gap-12">
          {ritual.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="text-center">
                <span aria-hidden className="block font-display text-4xl leading-10 text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-8 text-emerald">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[19rem] leading-[1.625] text-forest/70">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
