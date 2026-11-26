"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Email signup field. Front-end only for now; nothing is sent anywhere. */
export function NewsletterForm({ tone = "light", className }: { tone?: "dark" | "light"; className?: string }) {
  const [done, setDone] = useState(false);
  const light = tone === "light";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm", light ? "text-gold-light" : "text-teal", className)}>
        <Check className="size-4" /> Thank you. Welcome to the Matrutva family.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full max-w-md items-center rounded-full border p-1 transition-colors focus-within:border-gold",
        light ? "border-ivory/25 bg-ivory/5" : "border-emerald/20 bg-white",
        className,
      )}
    >
      <label htmlFor={`newsletter-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${tone}`}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className={cn(
          "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none",
          light ? "text-ivory placeholder:text-ivory/50" : "text-forest placeholder:text-forest/45",
        )}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-emerald transition hover:bg-gold-light"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
