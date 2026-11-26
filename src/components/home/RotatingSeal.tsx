import { LogoMark } from "@/components/brand/LogoMark";

/** Circular "Natural Wellness · Plant Based" seal that slowly rotates, like the brand's packaging sticker. */
export function RotatingSeal({ text = "NATURAL WELLNESS • PLANT BASED • MATRUTVA • " }: { text?: string }) {
  return (
    <div className="relative aspect-square rounded-full bg-emerald shadow-lift">
      <svg viewBox="0 0 200 200" aria-hidden className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id="seal-circle" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
        </defs>
        <text fontSize="15.5" letterSpacing="3.2" fill="#E2C48A" style={{ fontFamily: "var(--font-jost)" }}>
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[30%]">
        <LogoMark variant="gold" title="" />
      </div>
      <div className="absolute inset-1.5 rounded-full border border-gold/40" />
    </div>
  );
}
