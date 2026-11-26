"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useLockBody } from "@/hooks/useLockBody";

type SearchOverlayProps = { open: boolean; onClose: () => void };

/** Full-width search panel. Filters the local product list for now. */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  useLockBody(open, onClose);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => `${p.name} ${p.subtitle ?? ""} ${p.description}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="search-backdrop"
            className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <m.div
            key="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed inset-x-0 top-0 z-50 rounded-b-panel bg-ivory shadow-lift"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-luxe py-8 sm:py-10">
              <div className="flex items-center gap-4 border-b border-gold/40 pb-3">
                <Search className="size-5 shrink-0 text-teal" aria-hidden />
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="site-search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search spirulina, wellness, rituals…"
                  className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-emerald placeholder:text-forest/40 focus:outline-none sm:text-3xl"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="grid size-10 place-items-center rounded-full text-emerald transition hover:bg-emerald/5"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-6 min-h-12">
                {query && results.length === 0 && (
                  <p className="text-sm text-forest/60">No products found for &ldquo;{query}&rdquo;.</p>
                )}
                {!query && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="eyebrow mr-2 text-teal">Popular</span>
                    {["Spirulina", "Capsules", "Protein"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setQuery(t)}
                        className="rounded-full border border-gold/40 px-4 py-1.5 text-forest/80 transition hover:border-gold hover:bg-gold/10"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
                <ul className="divide-y divide-gold/15">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/shop/${p.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between py-4"
                      >
                        <span>
                          <span className="block font-display text-emerald">{p.name}</span>
                          <span className="text-sm text-forest/60">{p.subtitle}</span>
                        </span>
                        <span className="flex items-center gap-3 text-emerald">
                          {formatPrice(p.price)}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
