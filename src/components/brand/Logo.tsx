import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { LogoMark, type LogoMarkVariant } from "./LogoMark";

type LogoProps = {
  /** horizontal = header lockup, stacked = primary logo, mark = symbol only, wordmark = text only */
  layout?: "horizontal" | "stacked" | "mark" | "wordmark";
  /** dark text for ivory backgrounds, light text for emerald backgrounds */
  tone?: "dark" | "light";
  showTagline?: boolean;
  href?: string | null;
  className?: string;
};

function Wordmark({
  tone,
  showTagline,
  size,
}: {
  tone: "dark" | "light";
  showTagline: boolean;
  size: "sm" | "lg";
}) {
  const main = tone === "dark" ? "text-emerald" : "text-ivory";
  const sub = tone === "dark" ? "text-teal" : "text-gold-light";
  const lg = size === "lg";

  return (
    <span className={cn("flex flex-col leading-none", lg ? "items-center" : "items-start")}>
      <span
        className={cn(
          "font-display font-semibold tracking-[0.04em]",
          main,
          lg ? "text-3xl xs:text-4xl sm:text-5xl" : "text-xl sm:text-2xl",
        )}
      >
        MATRUTVA
      </span>
      <span
        className={cn(
          "font-sans font-medium uppercase",
          sub,
          lg ? "mt-2 text-sm tracking-[0.55em] sm:text-base" : "mt-1 text-[0.6rem] tracking-[0.5em] sm:text-[0.65rem]",
        )}
      >
        Wellness
      </span>
      {showTagline && (
        <span
          className={cn(
            "flex items-center gap-3 font-devanagari text-gold",
            lg ? "mt-3 text-xl" : "mt-1.5 text-sm",
          )}
        >
          {lg && <span aria-hidden className="h-px w-8 bg-gold/70" />}
          <span lang="mr">{siteConfig.tagline}</span>
          {lg && <span aria-hidden className="h-px w-8 bg-gold/70" />}
        </span>
      )}
    </span>
  );
}

/** Matrutva Wellness logo lockups built from the SVG mark + live wordmark text. */
export function Logo({
  layout = "horizontal",
  tone = "dark",
  showTagline = false,
  href = "/",
  className,
}: LogoProps) {
  const markVariant: LogoMarkVariant = tone === "dark" ? "color" : "light";

  const content =
    layout === "mark" ? (
      <LogoMark variant={markVariant} className="w-full" />
    ) : layout === "wordmark" ? (
      <Wordmark tone={tone} showTagline={showTagline} size="sm" />
    ) : layout === "stacked" ? (
      <span className="flex flex-col items-center gap-4">
        <LogoMark variant={markVariant} className="w-24 sm:w-32" />
        <Wordmark tone={tone} showTagline={showTagline} size="lg" />
      </span>
    ) : (
      <span className="flex items-center gap-2.5 sm:gap-3">
        <LogoMark variant={markVariant} className="w-9 sm:w-11" />
        <Wordmark tone={tone} showTagline={showTagline} size="sm" />
      </span>
    );

  const classes = cn("inline-flex shrink-0", className);

  if (!href) return <span className={classes}>{content}</span>;

  return (
    <Link href={href} aria-label={`${siteConfig.name} — home`} className={classes}>
      {content}
    </Link>
  );
}
