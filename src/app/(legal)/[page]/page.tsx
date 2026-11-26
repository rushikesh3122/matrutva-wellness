import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

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

export default async function LegalPage({ params }: PageProps<"/[page]">) {
  const { page } = await params;
  const p = pages[page];
  if (!p) notFound();
  return <PagePlaceholder eyebrow="Customer Care" title={p.title} description={`${p.description} This page is being finalised.`} />;
}
