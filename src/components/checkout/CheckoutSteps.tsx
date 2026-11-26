import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Cart", href: "/cart" },
  { label: "Your details", href: "/checkout" },
  { label: "Confirm", href: null },
] as const;

/** Progress bar for the 3-step checkout: Cart → Your details → Confirm. */
export function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Checkout progress" className="mt-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm sm:gap-x-4">
        {steps.map((step, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          const badge = (
            <span
              aria-hidden
              className={cn(
                "grid size-7 shrink-0 sm:size-8 place-items-center rounded-full text-sm font-medium",
                active ? "bg-emerald text-ivory" : done ? "bg-sage text-emerald" : "bg-sage/70 text-forest/70",
              )}
            >
              {done ? <Check className="size-4" /> : n}
            </span>
          );
          return (
            <li key={step.label} className="flex items-center gap-2 sm:gap-4">
              {done && step.href ? (
                <Link href={step.href} className="flex items-center gap-2 text-forest/80 underline-offset-4 hover:underline">
                  {badge}
                  {step.label}
                </Link>
              ) : (
                <span aria-current={active ? "step" : undefined} className={cn("flex items-center gap-2", active ? "font-medium text-emerald" : "text-forest/70")}>
                  {badge}
                  {step.label}
                </span>
              )}
              {n < steps.length && <span aria-hidden className="h-px w-3 bg-forest/20 sm:w-10" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
