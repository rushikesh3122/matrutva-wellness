import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { PageIntro } from "@/components/ui/PageIntro";
import { FaqList } from "@/components/ui/FaqList";
import { getLiveProducts } from "@/lib/live-products";

/** Support and policy pages linked from the footer. Replace each with final content. */
const pages: Record<string, { title: string; description: string }> = {
  "privacy-policy": { title: "Privacy Policy", description: "How we collect, use and protect your information." },
  terms: { title: "Terms & Conditions", description: "The terms that apply when you use this website and shop with us." },
  "shipping-policy": { title: "Shipping Policy", description: "Delivery areas, timelines and charges." },
  "refund-policy": { title: "Returns & Refunds", description: "Our policy on returns, replacements and refunds." },
  faqs: { title: "Frequently Asked Questions", description: "Answers to common questions about spirulina and your order." },
  "track-order": { title: "Track Your Order", description: "Order tracking will be available once online ordering opens." },
};

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: PageProps<"/[page]">): Promise<Metadata> {
  const { page } = await params;
  const p = pages[page];
  return p ? { title: p.title, description: p.description, alternates: { canonical: `/${page}` } } : {};
}

/** Reads the URL param inside Suspense so the page shell can be prefetched for instant navigation. */
export default function Page({ params }: PageProps<"/[page]">) {
  return (
    <Suspense fallback={<div aria-hidden className="bg-ivory"><div className="container-luxe py-24"><div className="h-14 w-2/3 animate-pulse rounded bg-sage/60" /></div></div>}>
      <LegalDetails params={params} />
    </Suspense>
  );
}

async function LegalDetails({ params }: Pick<PageProps<"/[page]">, "params">) {
  const { page } = await params;
  const p = pages[page];
  if (!p) notFound();
  if (page === "faqs") {
    const items = (await getLiveProducts()).flatMap((product) => product.faq ?? []);
    return (
      <>
        <PageIntro eyebrow="Customer Care" title="Good to know." description={p.description} />
        <section className="border-t border-forest/10 bg-ivory">
          <div className="container-luxe max-w-3xl py-16 md:py-24">
            <FaqList items={items} />
          </div>
        </section>
      </>
    );
  }
  return <PagePlaceholder eyebrow="Customer Care" title={p.title} description={`${p.description} This page is being finalised.`} />;
}
