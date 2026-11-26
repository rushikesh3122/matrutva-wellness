import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { LogoMark, type LogoMarkVariant } from "./LogoMark";

export type BrandLogoVariant =
  /** Primary logo: emblem above MATRUTVA / WELLNESS / Marathi tagline */
  | "full"
  /** Emblem beside the wordmark — desktop header */
  | "horizontal"
  /** Emblem + MATRUTVA only — mobile header */
  | "compact"
  /** Emblem only — app icon, avatars, small spaces */
  | "icon"
  /** Text only */
  | "wordmark";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  /** dark = for ivory/white/sage backgrounds, light = for emerald/forest backgrounds */
  tone?: "dark" | "light";
  /** Show the Marathi tagline (always shown on `full`) */
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  /** Wraps the logo in a link. Pass null for a plain, non-clickable logo. */
  href?: string | null;
  className?: string;
};

const markWidth = {
  full: { sm: "w-16", md: "w-24 sm:w-28", lg: "w-28 sm:w-36" },
  horizontal: { sm: "w-8", md: "w-10 sm:w-11", lg: "w-14" },
  compact: { sm: "w-7", md: "w-9", lg: "w-11" },
  icon: { sm: "w-8", md: "w-12", lg: "w-20" },
  wordmark: { sm: "", md: "", lg: "" },
} as const;

function Tagline({ size, lines }: { size: "sm" | "md" | "lg"; lines: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 font-devanagari leading-none text-gold",
        // Logotype colours are exempt from contrast rules; the text is decorative (the logo has an aria-label)
        size === "lg" ? "text-xl" : size === "md" ? "text-lg" : "text-sm",
      )}
    >
      {lines && <span aria-hidden className="h-px w-6 bg-gold/70 sm:w-8" />}
      {/* Drawn as SVG text: part of the logo artwork, so it keeps the exact brand gold */}
      <svg viewBox="0 0 136 28" className="h-[1.4em] w-auto overflow-visible" aria-hidden>
        <text
          x="68"
          y="20"
          textAnchor="middle"
          fontSize="20"
          fill="currentColor"
          textLength="132"
          lengthAdjust="spacingAndGlyphs"
          style={{ fontFamily: "var(--font-devanagari)" }}
        >
          {siteConfig.tagline}
        </text>
      </svg>
      {lines && <span aria-hidden className="h-px w-6 bg-gold/70 sm:w-8" />}
    </span>
  );
}

function Wordmark({
  tone,
  size,
  centered,
  showWellness = true,
  showTagline = false,
}: {
  tone: "dark" | "light";
  /** "inline-lg" = large size for side-by-side lockups (smaller than stacked lg) */
  size: "sm" | "md" | "lg" | "inline-lg";
  centered: boolean;
  showWellness?: boolean;
  showTagline?: boolean;
}) {
  const main = tone === "dark" ? "text-emerald" : "text-ivory";
  const sub = tone === "dark" ? "text-teal" : "text-gold-light";
  const nameSize = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-3xl xs:text-4xl sm:text-5xl",
    "inline-lg": "text-2xl sm:text-3xl",
  }[size];
  const subSize = {
    sm: "mt-1 text-[0.55rem] tracking-[0.5em]",
    md: "mt-1 text-[0.6rem] tracking-[0.5em] sm:text-[0.65rem]",
    lg: "mt-2 text-sm tracking-[0.55em] sm:text-base",
    "inline-lg": "mt-1.5 text-[0.7rem] tracking-[0.5em]",
  }[size];

  return (
    <span className={cn("flex flex-col leading-none", centered ? "items-center" : "items-start")}>
      <span className={cn("font-display font-semibold tracking-[0.04em]", main, nameSize)}>MATRUTVA</span>
      {showWellness && (
        <span className={cn("font-sans font-medium uppercase", sub, subSize, centered && "pl-[0.5em]")}>Wellness</span>
      )}
      {showTagline && (
        <span className={size === "lg" ? "mt-3" : "mt-1.5"}>
          <Tagline size={size === "lg" ? "lg" : "sm"} lines={centered} />
        </span>
      )}
    </span>
  );
}

/**
 * MATRUTVA WELLNESS logo in every approved lockup.
 * The emblem is an inline SVG (LogoMark); the name is live text in the
 * brand fonts, so it stays crisp at any size and is readable by search engines.
 */
export function BrandLogo({
  variant = "horizontal",
  tone = "dark",
  showTagline = false,
  size = "md",
  href = "/",
  className,
}: BrandLogoProps) {
  const markVariant: LogoMarkVariant = tone === "dark" ? "color" : "light";
  const mw = markWidth[variant][size];

  let content: React.ReactNode;
  switch (variant) {
    case "full":
      content = (
        <span className="flex flex-col items-center gap-4">
          <LogoMark variant={markVariant} className={mw} title="" />
          <Wordmark tone={tone} size={size === "sm" ? "md" : "lg"} centered showTagline />
        </span>
      );
      break;
    case "icon":
      content = <LogoMark variant={markVariant} className={mw} title="" />;
      break;
    case "wordmark":
      content = <Wordmark tone={tone} size={size} centered={false} showTagline={showTagline} />;
      break;
    case "compact":
      content = (
        <span className="flex items-center gap-2">
          <LogoMark variant={markVariant} className={mw} title="" />
          <Wordmark tone={tone} size="sm" centered={false} showWellness={false} />
        </span>
      );
      break;
    default:
      content = (
        <span className="flex items-center gap-2.5 sm:gap-3">
          <LogoMark variant={markVariant} className={mw} title="" />
          <Wordmark tone={tone} size={size === "lg" ? "inline-lg" : size} centered={false} showTagline={showTagline} />
        </span>
      );
  }

  const classes = cn("inline-flex shrink-0", className);
  const label = `${siteConfig.name}${href ? " — home" : ""}`;

  if (!href) {
    return (
      <span role="img" aria-label={label} className={classes}>
        <span aria-hidden className="contents">
          {content}
        </span>
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={classes}>
      <span aria-hidden className="contents">
        {content}
      </span>
    </Link>
  );
}
