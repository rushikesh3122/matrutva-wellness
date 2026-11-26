"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { isActivePath } from "./Navigation";

type MobileMenuProps = { open: boolean; onClose: () => void };

/** Full-height slide-in navigation drawer for mobile and tablet. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-lift xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/20 px-6 py-5">
              <Logo layout="horizontal" href="/" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-emerald hover:bg-emerald/5"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-6 py-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
                className="flex flex-col"
              >
                {mainNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                      className="border-b border-gold/15"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-lg transition-colors",
                          active ? "text-teal" : "text-emerald hover:text-teal",
                        )}
                      >
                        {item.label}
                        {active && <span className="size-1.5 rounded-full bg-gold" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            <div className="relative px-6 pt-4 pb-10">
              <p lang="mr" className="font-devanagari text-lg text-gold">
                {siteConfig.tagline}
              </p>
              <p className="mt-1 text-sm text-forest/60">{siteConfig.taglineMeaning}</p>
              <FeatherWave className="mt-6 h-10" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
