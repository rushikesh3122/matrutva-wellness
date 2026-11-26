import type { Metadata } from "next";
import { JournalCard } from "@/components/journal/JournalCard";
import { PageIntro } from "@/components/ui/PageIntro";
import { journalPosts } from "@/data/journal";

export const metadata: Metadata = {
  title: "Wellness Journal",
  description: "Notes on spirulina, natural nutrition and mindful everyday rituals.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageIntro eyebrow="Wellness Journal" title="Notes on" accent="natural living." description="Short, honest reads on spirulina, labels and building a daily ritual." />
      <section aria-label="Articles" className="border-t border-forest/10 bg-ivory">
        <div className="container-luxe grid gap-x-10 gap-y-16 py-20 sm:grid-cols-2 md:py-28 lg:grid-cols-3">
          {journalPosts.map((post, i) => (
            <JournalCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
