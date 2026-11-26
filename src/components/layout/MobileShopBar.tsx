"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, ShoppingBag, Store } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom bar on phones: Shop, Cart and a contact shortcut.
 * Shows WhatsApp once siteConfig.social.whatsapp holds a real link, otherwise the Contact page.
 */
export function MobileShopBar() {
  const pathname = usePathname();
  const { count } = useCart();
  const hasWhatsApp = siteConfig.social.whatsapp.startsWith("http");

  const items = [
    { href: "/shop", label: "Shop", icon: <Store className="size-5" strokeWidth={1.5} /> },
    {
      href: "/cart",
      label: count > 0 ? `Cart (${count})` : "Cart",
      icon: <ShoppingBag className="size-5" strokeWidth={1.5} />,
    },
    hasWhatsApp
      ? { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: <WhatsAppIcon className="size-5" />, external: true }
      : { href: "/contact", label: "Contact", icon: <Mail className="size-5" strokeWidth={1.5} /> },
  ];

  return (
    <>
      <div aria-hidden className="h-16 md:hidden" />
      <nav
        aria-label="Quick shop"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-emerald/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="grid h-16 grid-cols-3">
          {items.map((item) => {
            const active = !("external" in item) && pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  {...("external" in item ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-full flex-col items-center justify-center gap-1 text-label tracking-[0.14em] uppercase transition-colors",
                    active ? "text-gold-light" : "text-ivory/90 hover:text-gold-light",
                  )}
                >
                  <span aria-hidden>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
