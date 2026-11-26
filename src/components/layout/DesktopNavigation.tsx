"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, type NavItem } from "@/lib/site";
import { cn, isActivePath } from "@/lib/utils";

/** Desktop navigation: a gold underline grows on hover; the active page keeps it with a gold seed. */
export function DesktopNavigation({ items = mainNav, className }: { items?: NavItem[]; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-6 xl:gap-9">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block py-2 text-xs font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300",
                  active ? "text-emerald" : "text-forest/75 hover:text-emerald",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0.5 h-px origin-center bg-gold transition-transform duration-500 ease-luxe",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-[-0.5px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-gold transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
