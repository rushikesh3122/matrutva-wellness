import { stats } from "@/content/home";

/** Four headline figures between thin rules, as in the Figma design. */
export function StatsStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-forest/10 bg-ivory">
      <dl className="container-luxe grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse items-center text-center">
            <dt className="eyebrow mt-2 text-[0.62rem] tracking-[0.22em] text-forest/65">{s.label}</dt>
            <dd className="font-display text-[clamp(2.25rem,1.8rem+1.5vw,3rem)] leading-none text-emerald">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
