"use client";

import type { ReactNode } from "react";
import { Bell } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { notifyHref } from "@/lib/settings";
import { cn } from "@/lib/utils";

/** True while the shop is in "Coming soon" mode (/admin → Settings → Open for orders is off). */
export const useComingSoon = () => !useSettings().salesOpen;

/** Shows its children only when the shop takes orders; otherwise the fallback. */
export function WhenOpen({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return useComingSoon() ? fallback : children;
}

/** "Coming soon" pill, shown only in Coming soon mode. */
export function ComingSoonBadge({ className }: { className?: string }) {
  if (!useComingSoon()) return null;
  return (
    <span className={cn("rounded-full bg-gold px-3 py-1 text-[0.625rem] font-semibold tracking-[0.15em] text-emerald uppercase", className)}>
      Coming soon
    </span>
  );
}

/** "Notify me" link (WhatsApp or email) that replaces the buy buttons in Coming soon mode. */
export function NotifyMeLink({ productName, className, children }: { productName?: string; className?: string; children?: ReactNode }) {
  const href = notifyHref(useSettings(), productName);
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={className}>
      <Bell className="size-4 shrink-0" aria-hidden />
      {children ?? "Notify me at launch"}
      {productName && <span className="sr-only">: {productName}</span>}
    </a>
  );
}

/** Box shown on the cart and checkout pages while orders are not open yet. */
export function LaunchingSoonNotice() {
  return (
    <div className="rounded-figure border border-gold/40 bg-white p-8 text-center">
      <p className="eyebrow text-teal-deep">Coming soon</p>
      <h2 className="mt-3 font-display text-3xl text-emerald">We&apos;re launching soon.</h2>
      <p className="mx-auto mt-3 max-w-md text-forest/75">
        Orders aren&apos;t open yet. Leave us a message and we&apos;ll tell you the moment they are.
      </p>
      <NotifyMeLink className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal-deep px-7 font-medium text-ivory transition-colors hover:bg-emerald" />
    </div>
  );
}
