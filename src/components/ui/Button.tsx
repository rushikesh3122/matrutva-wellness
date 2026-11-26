import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "gold" | "outline" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

// Figma style: solid pills in Figtree, no capitals.
const variants: Record<ButtonVariant, string> = {
  primary: "bg-teal-deep text-ivory hover:bg-emerald",
  gold: "bg-ivory text-emerald hover:bg-white",
  outline: "border border-forest/20 text-emerald hover:border-emerald hover:bg-emerald hover:text-ivory",
  ghost: "text-emerald hover:bg-emerald/5",
  light: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-emerald",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-base",
  lg: "h-14 px-8 text-base",
  icon: "size-11 p-0",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label; nudges right on hover */
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
    loading?: boolean;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<CommonProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

/**
 * Brand button. Renders a Next.js <Link> when `href` is given,
 * otherwise a native <button>.
 */
export function Button(props: ButtonProps) {
  const { variant, size, leftIcon, rightIcon, fullWidth, className, children } = props;
  const classes = buttonClasses({ variant, size, fullWidth, className });

  const inner = (
    <>
      {leftIcon && <span className="shrink-0 [&>svg]:size-4">{leftIcon}</span>}
      {children}
      {rightIcon && (
        <span className="shrink-0 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1 [&>svg]:size-4">
          {rightIcon}
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _v, size: _s, leftIcon: _l, rightIcon: _r, fullWidth: _f, className: _c, children: _ch, ...linkProps } = props;
    return (
      <Link {...linkProps} className={classes}>
        {inner}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    leftIcon: _l,
    rightIcon: _r,
    fullWidth: _f,
    className: _c,
    children: _ch,
    loading,
    type = "button",
    disabled,
    ...buttonProps
  } = props;

  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={classes} {...buttonProps}>
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {inner}
    </button>
  );
}

type PresetProps = ButtonProps & {
  /** dark = on ivory/white/sage backgrounds, light = on emerald/forest backgrounds */
  tone?: "dark" | "light";
};

/** Main call to action: emerald on light backgrounds, gold on dark backgrounds. */
export function PrimaryButton({ tone = "dark", ...props }: PresetProps) {
  return <Button {...(props as ButtonProps)} variant={tone === "dark" ? "primary" : "gold"} />;
}

/** Supporting action: outlined emerald on light backgrounds, outlined ivory on dark backgrounds. */
export function SecondaryButton({ tone = "dark", ...props }: PresetProps) {
  return <Button {...(props as ButtonProps)} variant={tone === "dark" ? "outline" : "light"} />;
}
