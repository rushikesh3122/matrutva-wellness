import type { CSSProperties, ReactNode } from "react";
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

/** Section title block with eyebrow, gold ornament and optional Marathi line. Animates in on scroll with CSS only. */
export function SectionHeading({
  eyebrow,
  title,
  marathi,
  description,
  align = "center",
  tone = "dark",
  ornament = false,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  // The page h1 is usually the LCP element: render it without animation.
  const reveal = Tag === "h1" ? undefined : "reveal";
  const stagger = (n: number) =>
    reveal ? ({ "--reveal-delay": n * 0.12 } as CSSProperties) : undefined;
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        centered ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {(eyebrow || ornament) && (
        <div className={cn("flex items-center gap-3", reveal)}>
          {ornament && (
            <span
              aria-hidden
              className={cn(
                "h-px w-10 bg-gradient-to-r from-transparent to-gold",
                !centered && "hidden",
              )}
            />
          )}
          {ornament && <LogoMark variant="gold" className="w-5" title="" />}
          {eyebrow && (
            <span
              className={cn("eyebrow", dark ? "text-teal" : "text-gold-light")}
            >
              {eyebrow}
            </span>
          )}
          {ornament && (
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-l from-transparent to-gold"
            />
          )}
        </div>
      )}

      <div className={reveal} style={stagger(1)}>
        <Tag
          className={cn(
            "font-display text-[clamp(2.1rem,1.5rem+2.2vw,3.4rem)] leading-[1.15] font-light tracking-[-0.02em] text-balance",
            dark ? "text-emerald" : "text-ivory",
          )}
        >
          {title}
        </Tag>
      </div>

      {marathi && (
        <p
          lang="mr"
          style={stagger(2)}
          className={cn(
            reveal,
            "font-devanagari text-lg sm:text-xl",
            dark ? "text-gold-deep" : "text-gold",
          )}
        >
          {marathi}
        </p>
      )}

      {description && (
        <p
          style={stagger(3)}
          className={cn(
            reveal,
            "text-base leading-relaxed text-pretty sm:text-lg",
            dark ? "text-forest/75" : "text-ivory/80",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
