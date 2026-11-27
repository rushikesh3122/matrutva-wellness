import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getLiveProduct } from "@/lib/live-products";
import { siteConfig } from "@/lib/site";
import { BuyNowButton } from "@/components/product/BuyNowButton";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { LabelDetails } from "@/components/product/LabelDetails";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FaqList } from "@/components/ui/FaqList";
import { PromiseSection, ReviewsSection, RitualSection } from "@/components/home";
import { getReviews } from "@/lib/live-reviews";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getLiveProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.shortDescription} ${product.description}`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { images: [product.images[0].src] },
  };
}

/** Reads the URL param inside Suspense so the page shell can be prefetched for instant navigation. */
export default function Page({ params }: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<div aria-hidden className="bg-ivory"><div className="container-luxe grid gap-12 pt-8 pb-20 md:pt-12 lg:grid-cols-2 lg:gap-20"><div className="aspect-[4/5] animate-pulse rounded-figure bg-sage/60" /><div className="space-y-6 lg:pt-6"><div className="h-4 w-40 rounded bg-sage/60" /><div className="h-14 w-3/4 rounded bg-sage/60" /><div className="h-24 rounded bg-sage/50" /></div></div></div>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/shop/[slug]">, "params">) {
  const { slug } = await params;
  const [product, allReviews] = await Promise.all([getLiveProduct(slug), getReviews()]);
  if (!product) notFound();
  const reviews = allReviews.filter((r) => !r.product_slug || r.product_slug === product.slug);
  const price = product.price ? formatPrice(product.price) : null;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} ${product.name}`,
    description: product.description,
    image: product.images.map((i) => (i.src.startsWith("http") ? i.src : `${siteUrl}${i.src}`)),
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${siteUrl}/shop/${product.slug}`,
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <section className="bg-ivory">
        <div className="container-luxe grid gap-12 pt-8 pb-20 md:pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pb-28">
          <ProductGallery images={product.images} />

          <div className="lg:pt-6">
            <nav aria-label="Breadcrumb" className="text-xs text-forest/70">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li>
                  <Link href="/" className="inline-block py-1 hover:text-emerald">
                    Home
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <Link href="/shop" className="inline-block py-1 hover:text-emerald">
                    Shop
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li aria-current="page" className="text-emerald">
                  {product.name}
                </li>
              </ol>
            </nav>
            {product.eyebrow && <p className="eyebrow mt-8 text-teal-deep">{product.eyebrow}</p>}
            <h1 className="mt-4 font-display text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-[1.08] tracking-[-0.02em] text-emerald">
              {product.name}
            </h1>
            {product.headline && <p className="mt-3 font-display text-2xl font-light text-teal">{product.headline}</p>}
            <p className="mt-6 max-w-md text-lg leading-[1.625] text-forest/70">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-4xl text-emerald">{price ?? "Price coming soon"}</span>
              {product.mrp && product.price && product.mrp > product.price && (
                <>
                  <span className="text-lg text-forest/75 line-through">
                    <span className="sr-only">MRP </span>
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="rounded-full bg-gold/25 px-2.5 py-0.5 text-xs font-medium text-gold-deep">
                    Save {Math.round((1 - product.price / product.mrp) * 100)}%
                  </span>
                </>
              )}
              <span className="eyebrow text-[0.62rem] text-forest/65">{product.quantity}</span>
            </div>
            {price && <p className="mt-1 text-sm text-forest/65">Inclusive of all taxes</p>}
            {!product.inStock && <p className="mt-3 font-medium text-terracotta-deep">Currently out of stock. Contact us to be told when it is back.</p>}

            {product.facts && (
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-y border-forest/10 py-6">
                {product.facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse">
                    <dt className="eyebrow mt-1 text-[0.58rem] leading-4 tracking-[0.2em] text-forest/65">{f.label}</dt>
                    <dd className="font-display text-3xl leading-9 text-emerald">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div id="buy-box" className="mt-10 flex flex-col gap-4">
              <BuyNowButton
                product={product}
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald disabled:opacity-50 sm:w-auto sm:self-start"
              >
                {price ? `Buy now · ${price}` : "Buy now"}
              </BuyNowButton>
              <AddToCart product={product} />
            </div>
            <p className="mt-6 text-sm text-forest/65">Online payment is not available yet. We confirm every order, shipping and payment with you personally.</p>
          </div>
        </div>
      </section>

      {product.label && (
        <section aria-labelledby="label-title" className="border-t border-forest/10 bg-ivory">
          <div className="container-luxe py-24 md:py-28">
            <SectionTitle id="label-title" eyebrow="On the label" title="One ingredient. Read the label." />
            <div className="mx-auto mt-14 max-w-5xl">
              <LabelDetails label={product.label} />
              <p className="mt-5 text-center text-sm text-forest/70">Values from our label artwork. Always check the pack you receive.</p>
            </div>
          </div>
        </section>
      )}

      <PromiseSection />
      <RitualSection />
      <ReviewsSection reviews={reviews} />

      {product.faq && (
        <section aria-labelledby="product-faq-title" className="bg-ivory">
          <div className="container-luxe pb-24 md:pb-32">
            <SectionTitle id="product-faq-title" eyebrow="Questions" title="Good to know." />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqList items={product.faq} />
            </div>
          </div>
        </section>
      )}

      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StickyBuyBar product={product} />
    </>
  );
}
