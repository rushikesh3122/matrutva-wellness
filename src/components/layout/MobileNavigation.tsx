"use client";

import { MotionProvider } from "@/components/providers/MotionProvider";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import { allPages, siteConfig } from "@/lib/site";
import { cn, isActivePath } from "@/lib/utils";
import { useLockBody } from "@/hooks/useLockBody";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FeatherWave } from "@/components/brand/FeatherWave";

type MobileNavigationProps = { open: boolean; onClose: () => void };

/** Slide-in navigation drawer for mobile and tablet (below 1280px). */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  useLockBody(open, onClose);

  // Framer Motion is only needed here, so it loads with the menu, not with every page.
  return (
    <MotionProvider>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <m.aside
              key="panel"
              id="mobile-navigation"
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
                <BrandLogo variant="horizontal" href="/" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full text-emerald transition hover:bg-emerald/5"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 px-6 py-4">
                <m.ul
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                >
                  {allPages.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <m.li
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: 24 },
                          show: { opacity: 1, x: 0 },
                        }}
                        className="border-b border-gold/15"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 font-display text-lg transition-colors",
                            active
                              ? "text-teal"
                              : "text-emerald hover:text-teal",
                          )}
                        >
                          {item.label}
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 rounded-full bg-gold transition-opacity",
                              active ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </Link>
                      </m.li>
                    );
                  })}
                </m.ul>
              </nav>

              <div className="space-y-3 px-6 pt-2 pb-10 text-sm text-forest/70">
                <p lang="mr" className="font-devanagari text-lg text-gold-deep">
                  {siteConfig.tagline}
                </p>
                <p>{siteConfig.taglineMeaning}</p>
                <p className="flex items-center gap-2 pt-2">
                  <Mail className="size-4 text-teal" />{" "}
                  {siteConfig.contact.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-teal" />{" "}
                  {siteConfig.contact.phone}
                </p>
                <FeatherWave className="mt-4 h-10" />
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>
    </MotionProvider>
  );
}
