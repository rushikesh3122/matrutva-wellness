import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, legalNav, siteConfig } from "@/lib/site";
import { whatsappHref, type StoreSettings } from "@/lib/settings";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

/** Cached so the footer stays fully prerendered (Next.js Cache Components). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const linkClass = "inline-block py-1 text-ivory/75 transition-colors hover:text-ivory";

/**
 * Site footer: brand column with an order button, three link columns, contact
 * details, then a disclaimer and a legal row. Contact details and social links
 * come from /admin → Settings and stay hidden while empty.
 */
export function Footer({ settings: s }: { settings: StoreSettings }) {
  const wa = whatsappHref(s);
  const socials = [
    { label: "Instagram", href: s.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: s.facebook, Icon: FacebookIcon },
    { label: "YouTube", href: s.youtube, Icon: YoutubeIcon },
  ].filter((x) => x.href.startsWith("http"));

  return (
    <footer className="mt-auto bg-emerald text-ivory">
      <div className="container-luxe grid gap-12 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr] lg:gap-10 lg:pt-20">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-1">
          <BrandLogo variant="horizontal" tone="light" size="md" href="/" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/75">
            Pure spirulina, grown with care and packed without fillers. Nourishment with a mother&apos;s care.
          </p>
          <Link
            href={wa ?? "/shop/spirulina-capsules"}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-emerald transition-colors hover:bg-gold-light"
          >
            {wa ? (
              <>
                <WhatsAppIcon className="size-4" />
                Order on WhatsApp
              </>
            ) : (
              "Shop now"
            )}
          </Link>
          {socials.length > 0 && (
            <ul className="mt-7 flex gap-3" aria-label="Follow us">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-2 lg:col-span-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="font-mono text-xs tracking-[0.24em] text-gold-light uppercase">{group.title}</h2>
              <ul className="mt-5 space-y-2 text-sm">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Contact */}
        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="font-mono text-xs tracking-[0.24em] text-gold-light uppercase">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-sm text-ivory/75">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-ivory/60" strokeWidth={1.5} aria-hidden />
              <a href={`mailto:${s.email}`} className="break-all transition-colors hover:text-ivory">
                {s.email}
              </a>
            </li>
            {s.phone && (
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-ivory/60" strokeWidth={1.5} aria-hidden />
                <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-ivory">
                  {s.phone}
                </a>
              </li>
            )}
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-ivory/60" strokeWidth={1.5} aria-hidden />
              <span>{s.hours}</span>
            </li>
            {s.address && (
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ivory/60" strokeWidth={1.5} aria-hidden />
                <span>{s.address}</span>
              </li>
            )}
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-1.5 py-1 text-sm text-ivory transition-colors hover:text-gold-light"
          >
            Contact page
            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="container-luxe">
        <p className="border-t border-ivory/15 py-7 text-xs leading-relaxed text-ivory/65">
          {siteConfig.name} products are food supplements. They are not intended to diagnose, treat, cure or prevent any
          disease. Consult your healthcare professional before use, especially if you are pregnant, nursing or taking
          medication.
        </p>
      </div>

      {/* Legal row */}
      <div className="bg-forest">
        <div className="container-luxe flex flex-col gap-3 py-5 text-xs text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved. · Made in India
            {s.fssai && <> · FSSAI Lic. No. {s.fssai}</>}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Legal">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1.5 transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
