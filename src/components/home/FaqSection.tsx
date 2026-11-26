import Link from "next/link";
import { faq } from "@/content/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FaqList } from "@/components/ui/FaqList";

/** Short FAQ before the closing order prompt. */
export function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-title" className="bg-ivory">
      <div className="container-luxe pb-24 md:pb-32">
        <SectionTitle id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={items} />
          <p className="mt-8 text-center">
            <Link href="/faqs" className="eyebrow text-[0.66rem] text-forest/70 underline-offset-4 hover:text-teal-deep hover:underline">
              All questions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
