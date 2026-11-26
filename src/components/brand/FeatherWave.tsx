import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The brand "feather wave": the flowing teal + gold ribbon used across
 * packaging, the bottle label and digital touchpoints.
 */
export function FeatherWave({ className, flip = false }: { className?: string; flip?: boolean }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 600 120"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("w-full", flip && "-scale-x-100", className)}
    >
      <defs>
        <linearGradient id={`${uid}-t`} x1="0" x2="1">
          <stop offset="0" stopColor="#0E687A" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#0E687A" />
          <stop offset="1" stopColor="#1B8496" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${uid}-g`} x1="0" x2="1">
          <stop offset="0" stopColor="#C9A66A" stopOpacity="0" />
          <stop offset="0.4" stopColor="#E2C48A" />
          <stop offset="1" stopColor="#C9A66A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M0 92C90 60 170 48 260 66C350 84 420 98 600 22L600 46C430 116 340 112 255 92C170 74 95 80 0 108Z"
        fill={`url(#${uid}-t)`}
      />
      <path
        d="M0 100C110 70 190 62 270 78C360 96 450 92 600 34"
        fill="none"
        stroke={`url(#${uid}-g)`}
        strokeWidth="2.5"
      />
    </svg>
  );
}
