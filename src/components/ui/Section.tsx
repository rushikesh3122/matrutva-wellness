import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const tones = {
  ivory: "bg-ivory text-forest",
  sage: "bg-sage text-forest",
  white: "bg-white text-forest",
  emerald: "bg-emerald text-ivory",
  forest: "bg-forest text-ivory",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof tones;
  /** default = standard section rhythm, sm = tighter, none = no vertical padding */
  spacing?: "default" | "sm" | "none";
};

/** Page section with the standard vertical spacing and a brand background. */
export function Section({ tone = "ivory", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tones[tone],
        spacing === "default" && "section-y",
        spacing === "sm" && "section-y-sm",
        className,
      )}
      {...props}
    />
  );
}
