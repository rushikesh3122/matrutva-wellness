import type { Metadata } from "next";
import {
  DiscoverSpirulina,
  FeaturedProducts,
  HeroSection,
  JournalPreview,
  OurStory,
  ProcessJourney,
  QualityTransparency,
  Testimonials,
  TrustBar,
  WhyMatrutva,
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
 * Homepage. Sections 1 (announcement bar), 2 (header) and 14 (footer) come
 * from the root layout; everything in between is composed here.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <WhyMatrutva />
      <DiscoverSpirulina />
      <OurStory />
      <QualityTransparency />
      <ProcessJourney />
      <Testimonials />
      <JournalPreview />
      <NewsletterSection />
    </>
  );
}
