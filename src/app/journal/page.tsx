import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { JournalCard } from "@/components/journal/JournalCard";
import { journalPosts } from "@/data/journal";

export const metadata: Metadata = {
  title: "Wellness Journal",
  description: "Notes on spirulina, natural nutrition and mindful everyday rituals.",
  alternates: { canonical: "/journal" },
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Wellness Journal"
      title="Notes on Natural Living"
      description="Full articles are being written. Here is what is coming soon."
    >
      <div className="grid w-[min(100vw-2.5rem,72rem)] gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
        {journalPosts.map((post, i) => (
          <JournalCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </PagePlaceholder>
  );
}
