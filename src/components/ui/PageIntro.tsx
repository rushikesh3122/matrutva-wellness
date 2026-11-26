import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  /** Last line of the title, shown in teal like the homepage hero */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

/** Page header in the Figma style: mono eyebrow, large Kalnia title, muted intro. */
export function PageIntro({ eyebrow, title, accent, description, align = "left", children, className }: PageIntroProps) {
  const center = align === "center";
  return (
    <section className={cn("bg-ivory", className)}>
      <div className={cn("container-luxe pt-12 pb-14 md:pt-20 md:pb-20", center && "text-center")}>
        <div className={cn("animate-fade-up max-w-3xl", center && "mx-auto")}>
          <p className="eyebrow text-emerald/70">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,1.5rem+3.6vw,4.4rem)] leading-[1.08] tracking-[-0.02em] text-emerald">
            {title}
            {accent && <span className="block text-teal">{accent}</span>}
          </h1>
          {description && (
            <p className={cn("mt-7 max-w-xl text-lg leading-[1.625] text-forest/70", center && "mx-auto")}>{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
