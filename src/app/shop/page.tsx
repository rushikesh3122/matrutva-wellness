import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop Spirulina",
  description: "Shop Matrutva Wellness spirulina capsules and more natural wellness essentials.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <PagePlaceholder
      eyebrow="Shop"
      title="The Matrutva Collection"
      description="The full shop experience arrives in the next stage. You can already browse and add products below."
      primary={{ label: "Discover Spirulina", href: "/discover-spirulina" }}
    >
      <div className="grid w-[min(100vw-2.5rem,72rem)] gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </PagePlaceholder>
  );
}
