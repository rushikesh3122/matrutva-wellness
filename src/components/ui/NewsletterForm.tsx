"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | null {
  const email = value.trim();
  if (!email) return "Please enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address, like name@example.com.";
  return null;
}

/**
 * Email signup with inline validation.
 * Front-end only for now: connect `onSubscribe` to your email service later.
 */
export function NewsletterForm({
  tone = "light",
  className,
  onSubscribe,
}: {
  tone?: "dark" | "light";
  className?: string;
  /** Called with a valid email. Return a promise to show the loading state. */
  onSubscribe?: (email: string) => Promise<void> | void;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const light = tone === "light";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problem = validateEmail(email);
    setError(problem);
    if (problem) return;
    setStatus("loading");
    try {
      await onSubscribe?.(email.trim());
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm", light ? "text-gold-light" : "text-teal", className)}>
        <Check className="size-4" /> Thank you. Welcome to the Matrutva family.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-md", className)}>
      <div
        className={cn(
          "flex items-center rounded-full border p-1 transition-colors focus-within:border-gold",
          light ? "border-ivory/25 bg-ivory/5" : "border-emerald/20 bg-white",
          error && (light ? "border-[#F2B8A2]" : "border-[#B4462B]"),
        )}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none",
            light ? "text-ivory placeholder:text-ivory/60" : "text-forest placeholder:text-forest/50",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-gold px-4 text-xs font-medium tracking-[0.15em] text-emerald uppercase transition hover:bg-gold-light disabled:opacity-70 sm:px-5"
        >
          {status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          <span className="hidden xs:inline">Subscribe</span>
          <ArrowRight className="size-4 xs:hidden" aria-hidden />
          <span className="sr-only xs:hidden">Subscribe</span>
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className={cn("mt-2 px-4 text-left text-caption", light ? "text-[#F7CBBA]" : "text-[#9A3412]")}>
          {error}
        </p>
      )}
    </form>
  );
}
