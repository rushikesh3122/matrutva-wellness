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

export default async function Page({ params }: PageProps<"/journal/[slug]">) {
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
