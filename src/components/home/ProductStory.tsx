import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { orderHref } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** One product, told in a single row: photo, name, a line of copy, three facts and a buy button. */
export function ProductStory({
  product,
  imageFirst = true,
  imageIndex = 1,
  headingLevel: H = "h2",
}: {
  product: Product;
  imageFirst?: boolean;
  /** Which product image to show (defaults to the studio front shot) */
  imageIndex?: number;
  headingLevel?: "h2" | "h3";
}) {
  const image = product.images[imageIndex] ?? product.images[0];
  const price = product.price ? formatPrice(product.price) : null;
  return (
    <section id={product.slug} aria-labelledby={`${product.slug}-title`} className="scroll-mt-24 border-b border-forest/10 bg-ivory">
      <div className="container-luxe grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:gap-24 lg:py-28">
        <Reveal className={cn("mx-auto w-full max-w-md", !imageFirst && "md:order-2")}>
          <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-figure bg-white">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 448px, 90vw" className="object-contain p-6" />
          </Link>
        </Reveal>

        <Reveal className={cn("max-w-[30rem]", !imageFirst && "md:order-1")}>
          {product.eyebrow && <p className="eyebrow text-teal-deep">{product.eyebrow}</p>}
          <H id={`${product.slug}-title`} className="mt-5 font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.45rem)] leading-[1.1] tracking-[-0.02em] text-emerald">
            {product.headline ?? product.name}
          </H>
          <p className="mt-6 max-w-sm text-lg leading-[1.625] text-forest/70">{product.description}</p>

          {product.facts && (
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              {product.facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="eyebrow mt-1 text-[0.58rem] leading-4 tracking-[0.2em] text-forest/65">{f.label}</dt>
                  <dd className="font-display text-3xl leading-9 text-emerald">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={orderHref(`Hi Matrutva Wellness, I'd like to order ${product.name}${price ? ` (${price})` : ""}.`)}
              className="inline-flex items-center gap-3 rounded-full bg-teal-deep px-7 py-3.5 font-medium text-ivory transition-colors hover:bg-emerald"
            >
              <WhatsAppIcon className="size-5" />
              {price ? `Buy · ${price}` : "Order"}
            </Link>
            <Link href={`/shop/${product.slug}`} className="eyebrow text-[0.66rem] text-forest/70 underline-offset-4 hover:text-teal-deep hover:underline">
              View details
            </Link>
          </div>
          <p className="eyebrow mt-5 text-[0.62rem] tracking-[0.2em] text-forest/65">{product.quantity}</p>
        </Reveal>
      </div>
    </section>
  );
}
