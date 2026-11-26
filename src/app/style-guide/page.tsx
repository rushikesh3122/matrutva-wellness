import type { Metadata } from "next";
import { ArrowRight, Leaf, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LogoMark } from "@/components/brand/LogoMark";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Brand Components",
  robots: { index: false },
};

const colours = [
  { name: "Emerald Green", hex: "#003D32", cls: "bg-emerald", text: "text-ivory" },
  { name: "Peacock Teal", hex: "#006B70", cls: "bg-teal", text: "text-ivory" },
  { name: "Muted Gold", hex: "#C9A66A", cls: "bg-gold", text: "text-emerald" },
  { name: "Warm Ivory", hex: "#F6F0E4", cls: "bg-ivory border border-gold/30", text: "text-emerald" },
  { name: "Dark Forest", hex: "#173B32", cls: "bg-forest", text: "text-ivory" },
];

const base = products[0];
const demoProducts: Product[] = [
  base,
  {
    ...base,
    id: "spirulina-capsules-120",
    slug: "spirulina-capsules-120",
    name: "Spirulina Capsules · Family Pack",
    subtitle: "120 Vegetarian Capsules · 500 mg",
    price: 1099,
    mrp: 1499,
    badge: "Best value",
    images: [base.images[1], base.images[0]],
  },
  {
    ...base,
    id: "spirulina-powder",
    slug: "spirulina-powder",
    name: "Spirulina Powder",
    subtitle: "100 g · Coming soon",
    price: 449,
    mrp: undefined,
    badge: undefined,
    rating: undefined,
    inStock: false,
  },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gold/20 py-16">
      <h2 className="eyebrow mb-8 font-sans text-teal">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <Container className="py-16">
      <SectionHeading
        as="h1"
        eyebrow="Stage 1 & 2"
        title="Brand Components"
        marathi="मातृवत् पोषणम्"
        description="Design tokens and reusable building blocks for the Matrutva Wellness website."
      />

      <div className="mt-16">
        <Block title="Logo">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid place-items-center rounded-3xl bg-ivory-light p-8 shadow-soft">
              <Logo layout="stacked" showTagline href={null} />
            </div>
            <div className="grid place-items-center gap-6 rounded-3xl bg-ivory-light p-8 shadow-soft">
              <Logo layout="horizontal" href={null} />
              <Logo layout="wordmark" href={null} showTagline />
            </div>
            <div className="grid place-items-center rounded-3xl bg-emerald p-8">
              <Logo layout="stacked" tone="light" showTagline href={null} />
            </div>
            <div className="grid grid-cols-2 place-items-center gap-6 rounded-3xl bg-ivory-light p-8 shadow-soft">
              <LogoMark className="w-20" />
              <div className="grid size-24 place-items-center rounded-full bg-emerald">
                <LogoMark variant="gold" className="w-12" />
              </div>
              <div className="grid size-24 place-items-center rounded-full bg-forest">
                <LogoMark variant="light" className="w-12" />
              </div>
              <div className="grid size-24 place-items-center rounded-full border border-emerald/30 text-emerald">
                <LogoMark variant="mono" className="w-12" />
              </div>
            </div>
          </div>
        </Block>

        <Block title="Colour palette">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colours.map((c) => (
              <div key={c.hex} className={`flex aspect-[4/3] flex-col justify-end rounded-2xl p-4 ${c.cls} ${c.text}`}>
                <p className="font-display text-sm">{c.name}</p>
                <p className="text-xs opacity-75">{c.hex}</p>
              </div>
            ))}
          </div>
          <FeatherWave className="mt-10 h-16" />
        </Block>

        <Block title="Typography">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="font-display text-5xl text-emerald">MATRUTVA</p>
              <p className="text-sm text-forest/60">Cinzel — wordmark and headings</p>
              <p className="font-serif text-3xl text-teal italic">Nourishment with a Mother&apos;s Care</p>
              <p className="text-sm text-forest/60">Cormorant Garamond — editorial accents</p>
            </div>
            <div className="space-y-4">
              <p className="font-sans text-xl tracking-[0.5em] text-teal uppercase">Wellness</p>
              <p className="max-w-md text-forest/80">
                Jost — clean, modern and readable body text for product details, journal articles and everyday reading.
              </p>
              <p lang="mr" className="font-devanagari text-3xl text-gold">
                मातृवत् पोषणम्
              </p>
              <p className="text-sm text-forest/60">Tiro Devanagari Marathi — cultural tagline</p>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button rightIcon={<ArrowRight />}>Shop now</Button>
            <Button variant="gold" leftIcon={<ShoppingBag />}>
              Add to cart
            </Button>
            <Button variant="outline">Discover spirulina</Button>
            <Button variant="ghost" leftIcon={<Leaf />}>
              Our story
            </Button>
            <Button loading>Processing</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Cart" variant="outline">
              <ShoppingBag className="size-4" />
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-3xl bg-emerald p-6">
            <Button variant="gold" rightIcon={<ArrowRight />}>
              Shop now
            </Button>
            <Button variant="light">Learn more</Button>
          </div>
        </Block>

        <Block title="Section headings">
          <div className="space-y-12">
            <SectionHeading
              eyebrow="Discover spirulina"
              title="Nature's Most Complete Superfood"
              description="Spirulina is a blue-green algae packed with plant protein, vitamins, minerals and antioxidants."
            />
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Rooted in a Mother's Care"
              marathi="मातृवत् पोषणम्"
              description="Left-aligned variant with the Marathi line."
            />
            <div className="rounded-3xl bg-emerald px-6 py-14">
              <SectionHeading
                tone="light"
                eyebrow="Quality & transparency"
                title="Tested. Traceable. Trusted."
                description="Light variant for emerald and forest backgrounds."
              />
            </div>
          </div>
        </Block>

        <Block title="Product cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demoProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i === 0} />
            ))}
          </div>
        </Block>
      </div>
    </Container>
  );
}
