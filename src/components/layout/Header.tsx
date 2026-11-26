"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

type HeaderProps = {
  /** Number of items in the cart. Connected to cart state in a later stage. */
  cartCount?: number;
  /** Show the thin announcement strip above the header */
  announcement?: string | null;
};

const iconBtn =
  "relative grid size-10 place-items-center rounded-full text-emerald transition-colors hover:bg-emerald/5 hover:text-teal";

/** Sticky site header. Turns frosted ivory with a shadow once the page scrolls. */
export function Header({
  cartCount = 0,
  announcement = "Free shipping across India on orders above ₹999",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {announcement && (
        <div className="bg-emerald text-ivory">
          <p className="container-luxe flex h-9 items-center justify-center gap-3 text-center text-[0.65rem] tracking-[0.2em] uppercase sm:text-xs">
            <span className="hidden font-devanagari tracking-normal text-gold-light normal-case sm:inline" lang="mr">
              {siteConfig.tagline}
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-gold/50 sm:inline-block" />
            <span>{announcement}</span>
          </p>
        </div>
      )}

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500 ease-luxe",
          scrolled
            ? "border-b border-gold/20 bg-ivory/85 shadow-soft backdrop-blur-md"
            : "border-b border-transparent bg-ivory",
        )}
      >
        <div
          className={cn(
            "container-luxe flex items-center justify-between gap-6 transition-all duration-500",
            scrolled ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Logo layout="horizontal" />

          <Navigation className="hidden xl:block" />

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button type="button" aria-label="Search" className={cn(iconBtn, "hidden sm:grid")}>
              <Search className="size-[1.15rem]" />
            </button>
            <Link href="/account" aria-label="Account" className={cn(iconBtn, "hidden sm:grid")}>
              <User className="size-[1.15rem]" />
            </Link>
            <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className={iconBtn}>
              <ShoppingBag className="size-[1.15rem]" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.6rem] leading-5 font-semibold text-emerald"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(iconBtn, "xl:hidden")}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
