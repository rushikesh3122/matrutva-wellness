import { Star } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Review } from "@/lib/live-reviews";

/** Approved customer reviews. Renders nothing until at least one is approved in /admin. */
export function ReviewsSection({ reviews, title = "In their words." }: { reviews: Review[]; title?: string }) {
  if (reviews.length === 0) return null;
  return (
    <section aria-labelledby="reviews-title" className="border-t border-forest/10 bg-ivory">
      <div className="container-luxe py-24 md:py-28">
        <SectionTitle id="reviews-title" eyebrow="From our customers" title={title} />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <li key={r.id} className="flex flex-col rounded-card border border-gold/20 bg-white p-7 shadow-soft">
              {r.rating && (
                <p className="flex gap-0.5 text-gold" role="img" aria-label={`Rated ${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4" fill={i < r.rating! ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden />
                  ))}
                </p>
              )}
              <blockquote className="mt-4 flex-1 leading-relaxed text-forest/85">&ldquo;{r.quote}&rdquo;</blockquote>
              <p className="mt-6 text-sm font-medium text-emerald">
                {r.name}
                {r.city && <span className="font-normal text-forest/65"> · {r.city}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
