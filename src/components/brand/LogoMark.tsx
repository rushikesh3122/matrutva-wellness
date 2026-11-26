import { useId } from "react";
import { cn } from "@/lib/utils";

export type LogoMarkVariant = "color" | "gold" | "light" | "mono";

type LogoMarkProps = {
  variant?: LogoMarkVariant;
  className?: string;
  title?: string;
};

/**
 * The Matrutva peacock symbol, traced from the brand logo:
 * gold ring + gold seed, the central S-shaped peacock curve,
 * two leaf blades on the left, and the peacock feather with a
 * leaf on the right.
 *
 * Variants
 * - color: full-colour primary mark (light backgrounds)
 * - gold:  all-gold, as embossed on the bottle cap (dark backgrounds)
 * - light: ivory + gold, for emerald/forest backgrounds
 * - mono:  single colour, inherits `currentColor`
 *
 * Pass `title=""` when the mark is purely decorative.
 */
export function LogoMark({ variant = "color", className, title = "Matrutva Wellness" }: LogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;

  const fills = {
    color: {
      neck: `url(#${id("neck")})`,
      inner: `url(#${id("teal")})`,
      outer: `url(#${id("leaf")})`,
      right: `url(#${id("leaf")})`,
      feather: "#1E6A4E",
      featherSheen: "#2A8064",
      accent: `url(#${id("gold")})`,
      eye: true,
    },
    gold: {
      neck: `url(#${id("gold")})`,
      inner: `url(#${id("gold")})`,
      outer: `url(#${id("gold")})`,
      right: `url(#${id("gold")})`,
      feather: `url(#${id("gold")})`,
      featherSheen: "transparent",
      accent: `url(#${id("gold")})`,
      eye: false,
    },
    light: {
      neck: "#F6F0E4",
      inner: "#7FB8A8",
      outer: "#5E9E7E",
      right: "#5E9E7E",
      feather: "#C9D9CF",
      featherSheen: "transparent",
      accent: `url(#${id("gold")})`,
      eye: true,
    },
    mono: {
      neck: "currentColor",
      inner: "currentColor",
      outer: "currentColor",
      right: "currentColor",
      feather: "currentColor",
      featherSheen: "transparent",
      accent: "currentColor",
      eye: false,
    },
  }[variant];

  return (
    <svg
      viewBox="0 0 190 210"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("h-auto w-full", className)}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={id("neck")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1D5A43" />
          <stop offset="1" stopColor="#0F3D2E" />
        </linearGradient>
        <linearGradient id={id("teal")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E7A78" />
          <stop offset="1" stopColor="#005A5E" />
        </linearGradient>
        <linearGradient id={id("leaf")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C9A62" />
          <stop offset="1" stopColor="#1F6B4A" />
        </linearGradient>
        <linearGradient id={id("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E2C48A" />
          <stop offset="0.55" stopColor="#C9A66A" />
          <stop offset="1" stopColor="#A8854A" />
        </linearGradient>
        <radialGradient id={id("eye")} cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#F0C25A" />
          <stop offset="1" stopColor="#C98A2E" />
        </radialGradient>
      </defs>

      {/* Gold ring (crown) */}
      <circle cx="98" cy="17" r="6.5" fill="none" stroke={fills.accent} strokeWidth="4" />

      {/* Outer left leaf */}
      <path
        d="M80 196C52 184 22 160 15 128C12 118 14 110 20 102C20 128 34 156 58 176C66 183 74 190 80 196Z"
        fill={fills.outer}
      />
      {/* Inner left leaf */}
      <path
        d="M88 196C60 180 32 150 28 112C26 94 36 78 50 66C42 88 42 116 54 142C63 162 76 180 88 196Z"
        fill={fills.inner}
      />

      {/* Central peacock curve — the nurturing embrace */}
      <path
        d="M100 198C92 180 72 160 64 132C54 100 56 66 76 46C92 30 116 26 130 38C140 47 139 62 127 68C124 70 120 69 121 66C129 60 129 48 117 44C106 40 95 44 89 55C82 68 84 86 92 102C102 122 118 138 118 160C118 178 110 190 100 198Z"
        fill={fills.neck}
      />
      {/* Golden seed — vitality and wholeness */}
      <circle cx="111" cy="56" r="8.5" fill={fills.accent} />

      {/* Right leaf */}
      <path
        d="M108 196C142 188 170 162 174 130C175 120 173 112 170 106C162 138 142 164 108 196Z"
        fill={fills.right}
      />

      {/* Peacock feather */}
      <path
        d="M146 66C160 82 168 102 166 124C164 144 152 158 138 164C128 158 122 146 122 130C122 104 134 82 146 66Z"
        fill={fills.feather}
      />
      <path
        d="M146 76C156 92 160 106 158 124C156 140 148 150 139 155C132 150 129 140 129 128C129 108 138 90 146 76Z"
        fill={fills.featherSheen}
        opacity="0.7"
      />
      <path
        d="M138 164C132 176 124 186 114 192"
        stroke={fills.feather}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {fills.eye ? (
        <>
          <ellipse cx="143" cy="124" rx="13" ry="17" fill={`url(#${id("eye")})`} />
          <ellipse cx="143" cy="126" rx="9.5" ry="11" fill="#17A2B8" />
          <ellipse cx="143" cy="127" rx="6.5" ry="7.5" fill="#1B2A6B" />
        </>
      ) : (
        <ellipse
          cx="143"
          cy="126"
          rx="8"
          ry="10"
          fill={variant === "mono" ? "var(--color-ivory)" : "#0F3D2E"}
          opacity="0.9"
        />
      )}
    </svg>
  );
}
