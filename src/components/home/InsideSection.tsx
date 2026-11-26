import { inside } from "@/content/home";
import type { Product } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LabelDetails } from "@/components/product/LabelDetails";

/** "What's inside": the label, in plain words. */
export function InsideSection({ product }: { product: Product }) {
  if (!product.label) return null;
  return (
    <section aria-labelledby="inside-title" className="border-b border-forest/10 bg-ivory">
      <div className="container-luxe py-24 md:py-32">
        <SectionTitle id="inside-title" eyebrow={inside.eyebrow} title={inside.title} description={inside.description} />
        <Reveal className="mx-auto mt-14 max-w-5xl">
          <LabelDetails label={product.label} />
          <p className="mt-5 text-center text-sm text-forest/70">Values from our label artwork. Always check the pack you receive.</p>
        </Reveal>
      </div>
    </section>
  );
}
