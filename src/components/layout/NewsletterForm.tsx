"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

/** Footer newsletter signup. Front-end only for now; no data is sent anywhere. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-gold-light" role="status">
        <Check className="size-4" /> Thank you. Welcome to the Matrutva family.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-center rounded-full border border-ivory/25 bg-ivory/5 p-1 focus-within:border-gold">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
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
