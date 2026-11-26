import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductStory, OrderCta } from "@/components/home";

export const metadata: Metadata = {
  title: "Shop Spirulina",
  description: "Shop Matrutva Wellness Spirulina Capsules: 100% spirulina, no fillers, two capsules a day.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Shop"
        title="One product."
        accent="Made with care."
        description="We make one thing, and we make it well. Pure spirulina in a daily capsule, with nothing else added."
      />
      <div className="border-t border-forest/10">
        {products.map((product, i) => (
          <ProductStory key={product.id} product={product} imageFirst={i % 2 === 0} />
        ))}
      </div>
      <OrderCta />
    </>
  );
}
