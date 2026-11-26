import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading in the Figma style: mono eyebrow above a light Kalnia title. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", dark ? "text-emerald/70" : "text-ivory/70")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-5 font-display text-[clamp(2.1rem,1.5rem+2.2vw,3.4rem)] leading-[1.15] font-light tracking-[-0.02em]",
          dark ? "text-emerald" : "text-ivory",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-[1.625]", dark ? "text-forest/70" : "text-ivory/80", center && "mx-auto max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
