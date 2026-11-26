import { promise } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

/** "The Matrutva Promise": centred statement on deep green. */
export function PromiseSection() {
  return (
    <section id="promise" aria-labelledby="promise-title" className="scroll-mt-20 bg-emerald text-ivory">
      <Reveal className="mx-auto max-w-[48rem] px-6 py-28 text-center sm:px-10 md:py-40">
        <p lang="sa" className="font-devanagari text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] leading-tight text-gold">
          {promise.devanagari}
        </p>
        <h2 id="promise-title" className="eyebrow mt-3 text-ivory/70">
          {promise.eyebrow}
        </h2>
        <p className="mt-8 font-display text-[clamp(1.6rem,1.2rem+1.5vw,2.5rem)] leading-[1.25] tracking-[-0.01em]">
          <span className="text-aqua">{promise.highlight}</span>
          {promise.text}
        </p>
        <p lang="sa" className="mt-8 font-devanagari text-lg text-ivory/65">
          {promise.sanskrit}
        </p>
        <p className="eyebrow mt-1 text-[0.6rem] tracking-[0.24em] text-ivory/60">{promise.footer}</p>
      </Reveal>
    </section>
  );
}
