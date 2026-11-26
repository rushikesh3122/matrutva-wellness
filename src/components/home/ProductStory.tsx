import Image from "next/image";
import Link from "next/link";
import type { HomeProduct, ProductAccent } from "@/content/home";
import { orderHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** Accent colours per product. Text and button shades are tuned to pass WCAG AA contrast. */
const accents: Record<ProductAccent, { eyebrow: string; button: string }> = {
  teal: { eyebrow: "text-teal-deep", button: "bg-teal-deep text-ivory hover:bg-emerald" },
  moss: { eyebrow: "text-moss", button: "bg-moss text-ivory hover:bg-emerald" },
  saffron: { eyebrow: "text-gold-deep", button: "bg-gold text-emerald hover:bg-gold-dark" },
  terracotta: { eyebrow: "text-terracotta-deep", button: "bg-terracotta-deep text-ivory hover:bg-emerald" },
};

/** One product, told in a single row: photo, name, a line of copy, three facts and a buy button. */
export function ProductStory({ product, priority = false }: { product: HomeProduct; priority?: boolean }) {
  const a = accents[product.accent];
  const name = product.eyebrow.split("·").pop()?.trim() ?? product.title;
  return (
    <section id={product.id} aria-labelledby={`${product.id}-title`} className="scroll-mt-24 border-b border-forest/10 bg-ivory">
      <div className="container-luxe grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:gap-24 lg:py-28">
        <Reveal className={cn("mx-auto w-full max-w-md", !product.imageFirst && "md:order-2")}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-figure bg-ivory-dark">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority={priority}
              sizes="(min-width: 768px) 448px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className={cn("max-w-[30rem]", !product.imageFirst && "md:order-1 md:justify-self-start")}>
          <p className={cn("eyebrow", a.eyebrow)}>{product.eyebrow}</p>
          <h2
            id={`${product.id}-title`}
            className="mt-5 font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.45rem)] leading-[1.1] tracking-[-0.02em] text-emerald"
          >
            {product.title}
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-[1.625] text-forest/70">{product.description}</p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {product.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-1 text-[0.58rem] leading-4 tracking-[0.2em] text-forest/65">{f.label}</dt>
                <dd className="font-display text-3xl leading-9 text-emerald">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href={orderHref(`Hi Matrutva Wellness, I'd like to order ${name} (${product.price}).`)}
              className={cn("inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-medium transition-colors", a.button)}
            >
              <WhatsAppIcon className="size-5" />
              Buy · {product.price}
            </Link>
            <span className="eyebrow text-[0.64rem] tracking-[0.2em] text-forest/65">{product.pack}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
