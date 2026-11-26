import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { journalPosts } from "@/data/journal";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/journal/${post.slug}` } };
}

/** Reads the URL param inside Suspense so the page shell can be prefetched for instant navigation. */
export default function Page({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<div aria-hidden className="bg-ivory"><div className="container-luxe py-24"><div className="h-14 w-2/3 animate-pulse rounded bg-sage/60" /></div></div>}>
      <JournalDetails params={params} />
    </Suspense>
  );
}

async function JournalDetails({ params }: Pick<PageProps<"/journal/[slug]">, "params">) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <PagePlaceholder
      eyebrow={post.category}
      title={post.title}
      description={`${post.excerpt} This article is being written and will be published soon.`}
      primary={{ label: "All Journal Notes", href: "/journal" }}
    />
  );
}
