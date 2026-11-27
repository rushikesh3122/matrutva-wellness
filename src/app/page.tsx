import type { Metadata } from "next";
import {
  FaqSection,
  HeroSection,
  InsideSection,
  OrderCta,
  ProductStory,
  PromiseSection,
  ReviewsSection,
  RitualSection,
  StatsStrip,
} from "@/components/home";
import { getReviews } from "@/lib/live-reviews";
import { getLiveProducts } from "@/lib/live-products";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Pure Spirulina Capsules, Nothing Else` },
  description:
    "Matrutva Wellness Spirulina Capsules: 100% spirulina, no fillers, two capsules a day. Nourishment with a mother's care.",
  alternates: { canonical: "/" },
};

/** Homepage in the Figma style, focused on our one product: Spirulina Capsules. */
export default async function HomePage() {
  const [[spirulina], reviews] = await Promise.all([getLiveProducts(), getReviews()]);
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <div id="products" className="scroll-mt-20">
        <ProductStory product={spirulina} />
      </div>
      <InsideSection product={spirulina} />
      <PromiseSection />
      <RitualSection />
      <ReviewsSection reviews={reviews} />
      {spirulina.faq && <FaqSection items={spirulina.faq} />}
      <OrderCta />
    </>
  );
}
