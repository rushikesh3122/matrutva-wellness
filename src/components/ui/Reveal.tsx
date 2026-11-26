import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  /** Stagger, in seconds as before (0.1 = a little later). Mapped onto the scroll range. */
  delay?: number;
  /** Distance in px the element rises while fading in */
  y?: number;
};

/**
 * Fades and lifts its children in as they scroll into view.
 * Pure CSS (scroll-driven animation), so it ships no JavaScript and
 * works in Server Components. See `.reveal` in globals.css.
 */
export function Reveal({
  delay = 0,
  y,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const vars = {
    ...(delay ? { "--reveal-delay": Math.min(delay * 2, 1) } : {}),
    ...(y !== undefined ? { "--reveal-y": `${y}px` } : {}),
    ...style,
  } as CSSProperties;
  return (
    <div className={cn("reveal", className)} style={vars} {...props}>
      {children}
    </div>
  );
}
