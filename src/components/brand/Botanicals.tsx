import { useId } from "react";
import { cn } from "@/lib/utils";

type IllustrationProps = { className?: string };

/** Single botanical leaf with a centre vein. Rotate/scale with className. */
export function Leaf({ className, tone = "leaf" }: IllustrationProps & { tone?: "leaf" | "teal" | "emerald" | "gold" }) {
  const uid = useId().replace(/:/g, "");
  const stops = {
    leaf: ["#5FA374", "#2E7D5B"],
    teal: ["#1C8C8A", "#0E687A"],
    emerald: ["#1E6A4E", "#0F3D2E"],
    gold: ["#E2C48A", "#A8854A"],
  }[tone];
  return (
    <svg viewBox="0 0 120 240" aria-hidden className={cn("h-auto", className)}>
      <defs>
        <linearGradient id={`${uid}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="1" stopColor={stops[1]} />
        </linearGradient>
      </defs>
      <path d="M60 4C104 50 118 120 96 180C84 212 70 228 60 236C50 228 36 212 24 180C2 120 16 50 60 4Z" fill={`url(#${uid}-l)`} />
      <path d="M60 18C62 90 62 160 60 236" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      {[60, 95, 130, 165].map((y, i) => (
        <g key={y} stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.4" fill="none">
          <path d={`M61 ${y + 6}C${74 + i * 2} ${y - 4} ${84 + i} ${y - 12} ${92 - i * 3} ${y - 22}`} />
          <path d={`M59 ${y + 6}C${46 - i * 2} ${y - 4} ${36 - i} ${y - 12} ${28 + i * 3} ${y - 22}`} />
        </g>
      ))}
    </svg>
  );
}

/** Branch with several leaves — used to frame the hero and section corners. */
export function LeafSprig({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 260 320" aria-hidden className={cn("h-auto", className)}>
      <path d="M40 310C80 240 120 170 200 40" stroke="#2E7D5B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        { x: 70, y: 250, r: -55, c: "#2E7D5B" },
        { x: 92, y: 210, r: 35, c: "#4C9A62" },
        { x: 118, y: 168, r: -48, c: "#1F6B4A" },
        { x: 140, y: 126, r: 40, c: "#5FA374" },
        { x: 166, y: 88, r: -40, c: "#2E7D5B" },
        { x: 196, y: 44, r: 10, c: "#4C9A62" },
      ].map((l, i) => (
        <path
          key={i}
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          d="M0 0C14 -18 18 -44 0 -70C-18 -44 -14 -18 0 0Z"
          fill={l.c}
        />
      ))}
    </svg>
  );
}

/** Stylised peacock feather (eye + barbs), the brand's signature motif. */
export function PeacockFeather({ className }: IllustrationProps) {
  const uid = useId().replace(/:/g, "");
  const barbs = Array.from({ length: 26 }, (_, i) => i);
  return (
    <svg viewBox="0 0 160 420" aria-hidden className={cn("h-auto", className)}>
      <defs>
        <radialGradient id={`${uid}-e`} cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#F0C25A" />
          <stop offset="1" stopColor="#B07A2A" />
        </radialGradient>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A8064" />
          <stop offset="1" stopColor="#2A8064" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* barbs */}
      <g stroke={`url(#${uid}-b)`} strokeWidth="1.3" fill="none" opacity="0.85">
        {barbs.map((i) => {
          const y = 40 + i * 12;
          const spread = 62 - Math.abs(i - 6) * 2.2;
          return (
            <g key={i}>
              <path d={`M80 ${y + 14}Q${80 - spread * 0.6} ${y + 2} ${80 - spread} ${y - 10}`} />
              <path d={`M80 ${y + 14}Q${80 + spread * 0.6} ${y + 2} ${80 + spread} ${y - 10}`} />
            </g>
          );
        })}
      </g>
      {/* shaft */}
      <path d="M80 40C82 160 80 300 76 418" stroke="#A8854A" strokeWidth="2" fill="none" />
      {/* eye */}
      <ellipse cx="80" cy="96" rx="40" ry="52" fill="#1E6A4E" />
      <ellipse cx="80" cy="100" rx="30" ry="40" fill={`url(#${uid}-e)`} />
      <ellipse cx="80" cy="106" rx="20" ry="25" fill="#17A2B8" />
      <ellipse cx="80" cy="110" rx="13" ry="16" fill="#1B2A6B" />
    </svg>
  );
}

/** Spirulina's natural spiral filament — used as a subtle scientific motif. */
export function SpirulinaSpiral({ className }: IllustrationProps) {
  // Two offset sine strands read as the helical filament of spirulina
  const strand = (phase: number) => {
    let d = `M10 40`;
    for (let i = 0; i < 18; i++) {
      const x = 10 + i * 20;
      const y = i % 2 === 0 ? 40 - 30 * Math.sign(phase || 1) : 40 + 30 * Math.sign(phase || 1);
      d += ` Q${x + 10} ${y} ${x + 20} 40`;
    }
    return d;
  };
  return (
    <svg viewBox="0 0 380 80" aria-hidden className={cn("h-auto", className)} fill="none">
      <path d={strand(1)} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d={strand(-1)} stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
