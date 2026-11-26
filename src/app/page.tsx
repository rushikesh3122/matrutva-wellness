import type { Metadata } from "next";
import {
  BrandPhilosophy,
  DiscoverSpirulina,
  FinalCta,
  HomeFaq,
  ProductSpotlight,
  FeaturedProducts,
  HeroSection,
  JournalPreview,
  OurStory,
  ProcessJourney,
  QualityTransparency,
  Testimonials,
  TrustBar,
} from "@/components/home";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Premium Indian Spirulina for Everyday Wellness` },
  description:
    "Discover Matrutva Wellness spirulina, thoughtfully crafted to bring natural nutrition into your everyday routine. Nourishment with a mother's care.",
  alternates: { canonical: "/" },
};

/*
 * Homepage, told as one product story: why we began, the symbol, the
 * ingredient, the journey, the bottle, our promise, then the collection.
 * WhyMatrutva is kept in components/home but left out because the brand
 * philosophy section now covers the same ground.
 *
 * Homepage. Sections 1 (announcement bar), 2 (header) and 14 (footer) come
 * from the root layout; everything in between is composed here.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <OurStory />
      <BrandPhilosophy />
      <DiscoverSpirulina />
      <ProcessJourney />
      <ProductSpotlight />
      <QualityTransparency />
      <FeaturedProducts />
      <Testimonials />
      <JournalPreview />
      <HomeFaq />
      <FinalCta />
      <NewsletterSection />
    </>
  );
}
