"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { orderHref } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { DesktopNavigation } from "./DesktopNavigation";

// The menu drawer loads only when first opened, keeping the initial page light.
const MobileNavigation = dynamic(() => import("./MobileNavigation").then((m) => m.MobileNavigation), { ssr: false });

const iconBtn =
  "relative grid size-10 place-items-center rounded-full text-emerald transition-colors duration-300 hover:bg-emerald/5 hover:text-teal-deep";

/**
 * Sticky header from the Figma design: wordmark, mono navigation, dark "Order" pill.
 * Translucent ivory with a blur once the page scrolls.
 */
export function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuUsed, setMenuUsed] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-colors duration-500",
          scrolled ? "border-b border-forest/10 bg-ivory/70 backdrop-blur-md" : "border-b border-transparent bg-ivory",
        )}
      >
        <div className="container-luxe flex h-18 items-center justify-between gap-6 md:h-21">
          <BrandLogo variant="wordmark" size="sm" />

          <DesktopNavigation className="hidden lg:block" />

          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/cart" aria-label={`Shopping cart, ${count} ${count === 1 ? "item" : "items"}`} className={iconBtn}>
              <ShoppingBag className="size-[1.15rem]" strokeWidth={1.5} />
              {count > 0 && (
                <span
                  key={count}
                  className="animate-pop absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.625rem] font-semibold text-emerald"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <Link
              href={orderHref()}
              className="hidden items-center gap-2 rounded-full bg-emerald px-5 py-2.5 font-mono text-sm tracking-[0.15em] text-ivory uppercase transition-colors hover:bg-teal-deep sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              Order
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
              className={cn(iconBtn, "lg:hidden")}
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {menuUsed && <MobileNavigation open={menuOpen} onClose={closeMenu} />}
    </>
  );
}
