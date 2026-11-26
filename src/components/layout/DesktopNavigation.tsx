import Link from "next/link";
import { mainNav, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Desktop navigation in DM Mono capitals, as in the Figma design. */
export function DesktopNavigation({ items = mainNav, className }: { items?: NavItem[]; className?: string }) {
  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-10">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn("font-mono text-sm tracking-[0.18em] text-forest/70 uppercase transition-colors duration-300 hover:text-emerald")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
