import type { Metadata } from "next";
import { ArrowRight, Download, Leaf, ShoppingBag } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LogoMark } from "@/components/brand/LogoMark";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { Button, PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Primary Emerald", hex: "#003D32", cls: "bg-emerald text-ivory", token: "emerald" },
  { name: "Peacock Teal", hex: "#006B70", cls: "bg-teal text-ivory", token: "teal" },
  { name: "Muted Gold", hex: "#C9A66A", cls: "bg-gold text-emerald", token: "gold" },
  { name: "Deep Gold (text)", hex: "#7D5F28", cls: "bg-gold-deep text-ivory", token: "gold-deep" },
  { name: "Warm Ivory", hex: "#F6F0E4", cls: "bg-ivory text-emerald ring-1 ring-gold/30", token: "ivory" },
  { name: "Light Sage", hex: "#E5EBDD", cls: "bg-sage text-emerald", token: "sage" },
  { name: "Dark Forest", hex: "#173B32", cls: "bg-forest text-ivory", token: "forest" },
  { name: "White", hex: "#FFFFFF", cls: "bg-white text-emerald ring-1 ring-gold/30", token: "white" },
];

const typeScale = [
  { token: "text-display", cls: "font-display text-display", sample: "Pure Nourishment", note: "Cinzel 500 · hero" },
  { token: "text-h1", cls: "font-display text-h1", sample: "Discover Spirulina", note: "Cinzel 500 · page title" },
  { token: "text-h2", cls: "font-display text-h2", sample: "Our Story", note: "Cinzel 500 · section" },
  { token: "text-h3", cls: "font-display text-h3", sample: "Lab Tested Purity", note: "Cinzel 500 · card title" },
  { token: "text-h4", cls: "font-serif text-h4 italic", sample: "Nourishment with a Mother's Care", note: "Cormorant 500 · accent" },
  { token: "text-lead", cls: "text-lead", sample: "A natural superfood for everyday vitality.", note: "Jost 400 · intro" },
  { token: "text-body", cls: "text-body", sample: "Clean, modern and readable body text.", note: "Jost 400 · body" },
  { token: "text-caption", cls: "text-caption text-forest/80", sample: "60 vegetarian capsules · 500 mg", note: "Jost 400 · meta" },
  { token: "text-label", cls: "eyebrow text-teal", sample: "Natural Wellness", note: "Jost 500 · labels" },
];

const demoProducts: Product[] = products.slice(0, 3);

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gold/20 py-14 sm:py-16">
      <h2 className="eyebrow mb-8 flex items-center gap-2 font-sans text-teal">
        <span aria-hidden className="size-1 rounded-full bg-gold" /> {title}
      </h2>
      {children}
    </section>
  );
}

const tile = "grid place-items-center gap-4 rounded-card p-8 text-center";

export default function StyleGuidePage() {
  return (
    <>
      <Container className="pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Stage 2"
          title="Brand Identity & Design System"
          marathi={siteConfig.tagline}
          description="Design tokens and reusable building blocks for the Matrutva Wellness website."
        />

        <div className="mt-16">
          <Block title="Logo">
            <div className="grid gap-6 md:grid-cols-2">
              <div className={`${tile} bg-white shadow-soft`}>
                <BrandLogo variant="full" href={null} />
                <p className="text-caption text-forest/75">Full logo · variant=&quot;full&quot;</p>
              </div>
              <div className={`${tile} bg-emerald`}>
                <BrandLogo variant="full" tone="light" href={null} />
                <p className="text-caption text-ivory/80">Full logo on emerald · tone=&quot;light&quot;</p>
              </div>
              <div className={`${tile} bg-white shadow-soft`}>
                <BrandLogo variant="horizontal" size="lg" href={null} />
                <p className="text-caption text-forest/75">Horizontal · desktop header</p>
                <BrandLogo variant="compact" href={null} />
                <p className="text-caption text-forest/75">Compact · mobile header</p>
              </div>
              <div className={`${tile} bg-sage`}>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <BrandLogo variant="icon" size="lg" href={null} />
                  <div className="grid size-20 place-items-center rounded-full bg-emerald">
                    <LogoMark variant="gold" className="w-10" title="" />
                  </div>
                  <div className="grid size-20 place-items-center rounded-full bg-forest">
                    <LogoMark variant="light" className="w-10" title="" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element -- previewing the actual favicon file */}
                  <img src="/icon.svg" alt="Favicon" width={48} height={48} className="rounded-xl" />
                </div>
                <p className="text-caption text-forest/75">Icon · gold (bottle cap) · on forest · favicon</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                ["Full logo (SVG)", "/brand/matrutva-logo-full.svg"],
                ["Full logo (PNG)", "/brand/matrutva-logo-full.png"],
                ["Emblem (SVG)", "/brand/matrutva-mark.svg"],
                ["Gold emblem (SVG)", "/brand/matrutva-mark-gold.svg"],
                ["Favicon (SVG)", "/brand/matrutva-favicon.svg"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-emerald/20 px-4 py-2 text-caption text-emerald transition hover:border-gold"
                >
                  <Download className="size-3.5" /> {label}
                </a>
              ))}
            </div>
          </Block>

          <Block title="Colours">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {colours.map((c) => (
                <div key={c.hex} className={`flex aspect-[4/5] flex-col justify-end rounded-card p-4 ${c.cls}`}>
                  <p className="font-display text-sm leading-tight">{c.name}</p>
                  <p className="mt-1 text-xs opacity-90">{c.hex}</p>
                  <p className="text-xs opacity-90">bg-{c.token}</p>
                </div>
              ))}
            </div>
            <FeatherWave className="mt-10 h-16" />
          </Block>

          <Block title="Typography">
            <div className="divide-y divide-gold/15">
              {typeScale.map((t) => (
                <div key={t.token} className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:items-baseline">
                  <div className="text-caption text-forest/75">
                    <p className="font-medium text-forest">{t.token}</p>
                    <p>{t.note}</p>
                  </div>
                  <p className={`${t.cls} text-emerald`}>{t.sample}</p>
                </div>
              ))}
              <div className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:items-baseline">
                <div className="text-caption text-forest/75">
                  <p className="font-medium text-forest">font-devanagari</p>
                  <p>Tiro Devanagari Marathi</p>
                </div>
                <p lang="mr" className="font-devanagari text-h3 text-gold-deep">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </Block>

          <Block title="Spacing, widths & corners">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-card bg-white p-6 shadow-soft">
                <p className="font-display text-emerald">Section spacing</p>
                <ul className="mt-3 space-y-1 text-caption text-forest/70">
                  <li>
                    <code>section-y</code>: 64 / 80 / 112px
                  </li>
                  <li>
                    <code>section-y-sm</code>: 40 / 56 / 64px
                  </li>
                  <li>
                    <code>&lt;Section tone=&quot;sage&quot;&gt;</code> wraps both
                  </li>
                </ul>
              </div>
              <div className="rounded-card bg-white p-6 shadow-soft">
                <p className="font-display text-emerald">Container widths</p>
                <ul className="mt-3 space-y-1 text-caption text-forest/70">
                  <li>narrow: 768px (articles, forms)</li>
                  <li>content: 1280px (default)</li>
                  <li>wide: 1536px (galleries)</li>
                  <li>side padding: 20 / 32 / 48px</li>
                </ul>
              </div>
              <div className="rounded-card bg-white p-6 shadow-soft">
                <p className="font-display text-emerald">Corners & shadows</p>
                <div className="mt-3 flex items-end gap-3 text-caption text-forest">
                  <div className="grid size-16 place-items-center rounded-card bg-sage">card</div>
                  <div className="grid size-16 place-items-center rounded-panel bg-sage">panel</div>
                  <div className="grid h-10 w-20 place-items-center rounded-full bg-sage">pill</div>
                </div>
              </div>
            </div>
          </Block>

          <Block title="Buttons">
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton rightIcon={<ArrowRight />}>Shop now</PrimaryButton>
              <SecondaryButton>Discover spirulina</SecondaryButton>
              <Button variant="gold" leftIcon={<ShoppingBag />}>
                Add to cart
              </Button>
              <Button variant="ghost" leftIcon={<Leaf />}>
                Our story
              </Button>
              <Button loading>Processing</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PrimaryButton size="sm">Small</PrimaryButton>
              <PrimaryButton size="md">Medium</PrimaryButton>
              <PrimaryButton size="lg">Large</PrimaryButton>
              <SecondaryButton size="icon" aria-label="Cart">
                <ShoppingBag className="size-4" />
              </SecondaryButton>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card bg-emerald p-6">
              <PrimaryButton tone="light" rightIcon={<ArrowRight />}>
                Shop now
              </PrimaryButton>
              <SecondaryButton tone="light">Learn more</SecondaryButton>
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
                marathi={siteConfig.tagline}
                description="Left-aligned variant with the Marathi line."
              />
              <div className="rounded-panel bg-emerald px-6 py-14">
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
            <p className="-mt-4 mb-8 text-caption text-forest/80">
              &ldquo;Add to cart&rdquo; updates the cart count in the header and is remembered after a page reload.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {demoProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i === 0} />
              ))}
            </div>
          </Block>
        </div>
      </Container>

      <div className="border-t border-gold/20 pt-6">
        <Container>
          <p className="eyebrow flex items-center gap-2 text-teal">
            <span aria-hidden className="size-1 rounded-full bg-gold" /> Newsletter section
          </p>
        </Container>
        <NewsletterSection />
      </div>
    </>
  );
}
