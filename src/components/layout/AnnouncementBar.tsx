"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type AnnouncementBarProps = {
  messages: string[];
  /** Milliseconds each message stays visible */
  interval?: number;
  className?: string;
};

/** Thin emerald strip above the header with gently rotating messages, set in /admin → Settings. */
export function AnnouncementBar({ messages, interval = 4500, className }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % messages.length), interval);
    return () => window.clearInterval(t);
  }, [messages.length, interval]);

  if (messages.length === 0) return null;

  return (
    <div className={cn("bg-emerald text-ivory", className)}>
      <div className="container-luxe flex h-9 items-center justify-center gap-3 text-center text-[0.625rem] tracking-[0.12em] uppercase sm:text-xs sm:tracking-[0.2em]">
        <span lang="mr" className="hidden font-devanagari text-sm tracking-normal text-gold-light normal-case md:inline">
          {siteConfig.tagline}
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-gold/50 md:inline-block" />
        <div className="relative h-5 min-w-0 flex-1 overflow-hidden md:flex-none" aria-live="polite">
          <p key={index} className={cn("truncate leading-5", index > 0 && "animate-ticker")}>
            {messages[index]}
          </p>
        </div>
      </div>
    </div>
  );
}
