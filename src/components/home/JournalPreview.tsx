import { ArrowRight } from "lucide-react";
import { journalSection } from "@/content/home";
import { journalPosts } from "@/data/journal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SecondaryButton } from "@/components/ui/Button";
import { JournalCard } from "@/components/journal/JournalCard";

export function JournalPreview() {
  return (
    <Section tone="ivory">
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading align="left" eyebrow={journalSection.eyebrow} title={journalSection.title} className="items-center text-center md:items-start md:text-left" />
          <SecondaryButton href={journalSection.cta.href} rightIcon={<ArrowRight />} className="shrink-0">
            {journalSection.cta.label}
          </SecondaryButton>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {journalPosts.slice(0, 3).map((post, i) => (
            <JournalCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
