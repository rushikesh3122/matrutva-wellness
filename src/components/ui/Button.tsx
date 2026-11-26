import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "gold" | "outline" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald text-ivory shadow-soft hover:bg-emerald-light hover:shadow-lift hover:-translate-y-0.5",
  gold: "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-emerald shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-emerald/30 text-emerald hover:border-gold hover:bg-emerald hover:text-ivory",
  ghost: "text-emerald hover:bg-emerald/5",
  light: "border border-ivory/40 text-ivory hover:bg-ivory hover:text-emerald",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.65rem]",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-9 text-sm",
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
