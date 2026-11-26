import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  narrow: "max-w-(--container-narrow)",
  content: "max-w-(--container-content)",
  wide: "max-w-(--container-wide)",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** narrow 768px · content 1280px (default) · wide 1536px */
  size?: keyof typeof sizes;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size">;

/** Centered wrapper with the site's standard widths and side padding. */
export function Container<T extends ElementType = "div">({ as, size = "content", className, ...props }: ContainerProps<T>) {
  const Tag = as ?? "div";
  return <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)} {...props} />;
}
