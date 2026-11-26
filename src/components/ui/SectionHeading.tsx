"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/LogoMark";

type SectionHeadingProps = {
  /** Small spaced label above the title */
  eyebrow?: string;
  title: ReactNode;
  /** Optional Marathi / Devanagari line under the title */
  marathi?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Show the small peacock mark ornament */
  ornament?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/** Section title block with eyebrow, gold ornament and optional Marathi line. Animates in on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  marathi,
  description,
  align = "center",
  tone = "dark",
  ornament = true,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <m.div
      // h1 is usually the largest element on screen: show it instantly for a fast LCP
      initial={Tag === "h1" ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
      className={cn("flex max-w-3xl flex-col gap-4", centered ? "mx-auto items-center text-center" : "items-start text-left", className)}
    >
      {(eyebrow || ornament) && (
        <m.div
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          {ornament && <span aria-hidden className={cn("h-px w-10 bg-gradient-to-r from-transparent to-gold", !centered && "hidden")} />}
          {ornament && <LogoMark variant="gold" className="w-5" title="" />}
          {eyebrow && <span className={cn("eyebrow", dark ? "text-teal" : "text-gold-light")}>{eyebrow}</span>}
          {ornament && <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />}
        </m.div>
      )}

      <m.div variants={fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <Tag
          className={cn(
            "font-display text-3xl leading-tight font-medium text-balance sm:text-4xl lg:text-5xl",
            dark ? "text-emerald" : "text-ivory",
          )}
        >
          {title}
        </Tag>
      </m.div>

      {marathi && (
        <m.p
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          lang="mr"
          className={cn("font-devanagari text-lg sm:text-xl", dark ? "text-gold-deep" : "text-gold")}
        >
          {marathi}
        </m.p>
      )}

      {description && (
        <m.p
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn("text-base leading-relaxed text-pretty sm:text-lg", dark ? "text-forest/75" : "text-ivory/80")}
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
