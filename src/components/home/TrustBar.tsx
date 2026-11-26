import { trustItems } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";

/** Four brand trust indicators. Labels and text come from content/home.ts. */
export function TrustBar() {
  return (
    <section aria-label="Why customers trust Matrutva Wellness" className="relative z-10 -mt-8 sm:-mt-10">
      <Container>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-gold/25 bg-gold/20 shadow-soft lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <li key={item.title} className="bg-white">
              <Reveal delay={i * 0.08} className="flex h-full flex-col items-center gap-3 px-4 py-7 text-center sm:px-6 lg:flex-row lg:items-start lg:text-left">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-ivory text-emerald">
                  <BrandIcon name={item.icon} className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-base leading-snug text-emerald">{item.title}</span>
                  <span className="mt-1 block text-caption text-forest/75">{item.text}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
