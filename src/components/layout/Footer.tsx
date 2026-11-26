import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { NewsletterForm } from "./NewsletterForm";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
];

/** Cached so the footer stays fully prerendered (Next.js Cache Components). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-forest text-ivory">
      <FeatherWave className="pointer-events-none absolute -top-2 left-0 h-16 opacity-60 sm:h-24" />

      <div className="container-luxe relative grid gap-12 pt-24 pb-12 sm:pt-28 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
          <Logo layout="horizontal" tone="light" showTagline />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{siteConfig.description}</p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow font-sans text-gold">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ivory/70 transition hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + contact */}
        <div className="lg:col-span-3">
          <h3 className="eyebrow font-sans text-gold">Join our wellness circle</h3>
          <p className="mt-4 mb-5 text-sm text-ivory/70">Rituals, recipes and early access to new launches.</p>
          <NewsletterForm />
          <ul className="mt-8 space-y-3 text-sm text-ivory/70">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-gold" /> {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-gold" /> {siteConfig.contact.phone}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-gold" /> {siteConfig.contact.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/50 sm:flex-row">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-center">
            This product is a dietary supplement and is not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
