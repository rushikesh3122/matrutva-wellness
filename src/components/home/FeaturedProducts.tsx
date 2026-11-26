import { ArrowRight } from "lucide-react";
import { featured } from "@/content/home";
import { featuredProducts } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SecondaryButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  return (
    <Section id="featured-products" aria-labelledby="featured-title">
      <Container>
        <SectionHeading eyebrow={featured.eyebrow} title={<span id="featured-title">{featured.title}</span>} description={featured.description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <SecondaryButton href={featured.cta.href} rightIcon={<ArrowRight />}>
            {featured.cta.label}
          </SecondaryButton>
        </div>
      </Container>
    </Section>
  );
}
