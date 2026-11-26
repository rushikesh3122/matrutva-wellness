import type { Metadata } from "next";
import { HeroSection, OrderCta, ProductStory, PromiseSection, RitualSection, StatsStrip } from "@/components/home";
import { products } from "@/content/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Pure Plant Superfoods, Nothing Else` },
  description:
    "Spirulina, moringa, turmeric and fruit & veg capsules from Matrutva Wellness. Pure plant energy with no fillers. Nourishment with a mother's care.",
  alternates: { canonical: "/" },
};

/** Homepage, following the Figma design "Matrutva Brand Website". Header and footer come from the root layout. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <div id="products" className="scroll-mt-20">
        {products.map((product) => (
          <ProductStory key={product.id} product={product} />
        ))}
      </div>
      <PromiseSection />
      <RitualSection />
      <OrderCta />
    </>
  );
}
