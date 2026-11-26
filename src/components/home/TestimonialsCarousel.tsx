"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types/product";
import { cn } from "@/lib/utils";

type Props = { items: Testimonial[]; interval?: number };

/** Accessible testimonial carousel: arrows, dots, swipe, autoplay that pauses on hover/focus. */
export function TestimonialsCarousel({ items, interval = 6000 }: Props) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + items.length) % items.length, dir]),
    [items.length],
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    const t = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(t);
  }, [paused, go, interval, items.length]);

  if (items.length === 0) return null;
  const t = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative min-h-[17rem] overflow-hidden rounded-panel border border-gold/25 bg-white px-6 py-10 text-center shadow-soft sm:min-h-[15rem] sm:px-14">
        <Quote aria-hidden className="mx-auto size-8 text-gold" />
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <m.figure
            key={t.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className="mt-4 cursor-grab active:cursor-grabbing"
          >
            <blockquote className="font-serif text-h4 leading-relaxed text-emerald italic sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex flex-col items-center gap-1">
              <span className="font-display text-sm tracking-wider text-emerald">{t.name}</span>
              <span className="text-caption text-forest/75">
                {[t.location, t.product].filter(Boolean).join(" · ")}
              </span>
              {t.isSample && (
                <span className="mt-2 rounded-full bg-sage px-3 py-1 text-[0.65rem] font-medium tracking-[0.15em] text-forest uppercase">
                  Sample review
                </span>
              )}
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-emerald/20 text-emerald transition hover:border-gold hover:bg-emerald hover:text-ivory"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-1">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="grid size-6 place-items-center"
              >
                <span className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-6 bg-gold" : "w-2 bg-emerald/25")} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full border border-emerald/20 text-emerald transition hover:border-gold hover:bg-emerald hover:text-ivory"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
