import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { orderHref, siteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCart } from "@/components/product/AddToCart";
import { LabelDetails } from "@/components/product/LabelDetails";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FaqList } from "@/components/ui/FaqList";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { PromiseSection, RitualSection } from "@/components/home";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.shortDescription} ${product.description}`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const price = product.price ? formatPrice(product.price) : null;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} ${product.name}`,
    description: product.description,
    image: product.images.map((i) => `${siteUrl}${i.src}`),
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

  return (
    <>
      <section className="bg-ivory">
        <div className="container-luxe grid gap-12 pt-8 pb-20 md:pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pb-28">
          <ProductGallery images={product.images} />

          <div className="lg:pt-6">
            <nav aria-label="Breadcrumb" className="eyebrow text-[0.62rem] text-forest/65">
              <Link href="/shop" className="hover:text-emerald">
                Shop
              </Link>{" "}
              / <span aria-current="page">{product.name}</span>
            </nav>
            {product.eyebrow && <p className="eyebrow mt-8 text-teal-deep">{product.eyebrow}</p>}
            <h1 className="mt-4 font-display text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-[1.08] tracking-[-0.02em] text-emerald">
              {product.name}
            </h1>
            {product.headline && <p className="mt-3 font-display text-2xl font-light text-teal">{product.headline}</p>}
            <p className="mt-6 max-w-md text-lg leading-[1.625] text-forest/70">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-4xl text-emerald">{price ?? "Price coming soon"}</span>
              <span className="eyebrow text-[0.62rem] text-forest/65">{product.quantity}</span>
            </div>
            {price && <p className="mt-1 text-sm text-forest/65">Inclusive of all taxes</p>}

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

            <div className="mt-10 flex flex-col gap-4">
              <Link
                href={orderHref(`Hi Matrutva Wellness, I'd like to order ${product.name}${price ? ` (${price})` : ""}.`)}
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-teal-deep px-8 font-medium text-ivory transition-colors hover:bg-emerald sm:w-auto sm:self-start"
              >
                <WhatsAppIcon className="size-5" />
                {price ? `Buy on WhatsApp · ${price}` : "Order on WhatsApp"}
              </Link>
              <AddToCart product={product} />
            </div>
            <p className="mt-6 text-sm text-forest/65">Online payment is not available yet. We confirm every order with you on WhatsApp.</p>
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
    </>
  );
}
