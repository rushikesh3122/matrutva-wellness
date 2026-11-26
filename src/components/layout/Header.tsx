"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { AnnouncementBar } from "./AnnouncementBar";
import { DesktopNavigation } from "./DesktopNavigation";

// The menu drawer and search panel load only when first opened, keeping the initial page light.
const MobileNavigation = dynamic(() => import("./MobileNavigation").then((m) => m.MobileNavigation), { ssr: false });
const SearchOverlay = dynamic(() => import("./SearchOverlay").then((m) => m.SearchOverlay), { ssr: false });

const iconBtn =
  "relative grid size-10 place-items-center rounded-full text-emerald transition-colors duration-300 hover:bg-emerald/5 hover:text-teal";

/**
 * Sticky site header.
 * - below 640px: compact logo, search, cart, menu
 * - 640–1279px: full horizontal logo, search, cart, menu
 * - 1280px+: full logo, desktop navigation, search, cart
 */
export function Header({ showAnnouncement = true }: { showAnnouncement?: boolean }) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Mount overlays after first use so their code is fetched on demand
  const [menuUsed, setMenuUsed] = useState(false);
  const [searchUsed, setSearchUsed] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showAnnouncement && <AnnouncementBar />}

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500 ease-luxe",
          scrolled ? "border-b border-gold/25 bg-ivory/85 shadow-soft backdrop-blur-md" : "border-b border-gold/10 bg-ivory",
        )}
      >
        <div
          className={cn(
            "container-luxe flex items-center justify-between gap-6 transition-[height] duration-500 ease-luxe",
            scrolled ? "h-16" : "h-18 lg:h-22",
          )}
        >
          <BrandLogo variant="compact" className="sm:hidden" />
          <BrandLogo variant="horizontal" className="hidden sm:inline-flex" />

          <DesktopNavigation className="hidden xl:block" />

          <div className="flex items-center gap-1">
            <button type="button" aria-label="Search" onClick={() => {
                setSearchUsed(true);
                setSearchOpen(true);
              }} className={iconBtn}>
              <Search className="size-[1.15rem]" />
            </button>
            <Link href="/cart" aria-label={`Shopping cart, ${count} ${count === 1 ? "item" : "items"}`} className={iconBtn}>
              <ShoppingBag className="size-[1.15rem]" />
              {count > 0 && (
                <span
                  key={count}
                  className="animate-pop absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.625rem] font-semibold text-emerald"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuUsed(true);
                setMenuOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={cn(iconBtn, "xl:hidden")}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {menuUsed && <MobileNavigation open={menuOpen} onClose={closeMenu} />}
      {searchUsed && <SearchOverlay open={searchOpen} onClose={closeSearch} />}
    </>
  );
}
