import type { Metadata } from "next";
import { DiscoverSpirulina, FeaturedProducts, HeroSection, TrustBar, WhyMatrutva } from "@/components/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Premium Indian Spirulina for Everyday Wellness` },
  description:
    "Discover Matrutva Wellness spirulina, thoughtfully crafted to bring natural nutrition into your everyday routine. Nourishment with a mother's care.",
  alternates: { canonical: "/" },
};

/*
 * Homepage — part 1 (sections 1–7).
 * 1 Announcement bar and 2 Header come from the root layout.
 * Sections 8–14 (Our Story → Footer) are added in part 2.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProducts />
      <WhyMatrutva />
      <DiscoverSpirulina />
    </>
  );
}
