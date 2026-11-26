import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, legalNav, siteConfig } from "@/lib/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FeatherWave } from "@/components/brand/FeatherWave";
import { LogoMark } from "@/components/brand/LogoMark";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

const socials = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, Icon: WhatsAppIcon },
];

/** Cached so the footer stays fully prerendered (Next.js Cache Components). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="eyebrow flex items-center justify-center gap-2 font-sans text-gold md:justify-start">
      <span aria-hidden className="size-1 rounded-full bg-gold" />
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-emerald text-ivory">
      <FeatherWave className="pointer-events-none absolute -top-2 left-0 h-16 opacity-50 sm:h-24" />
      <LogoMark
        variant="gold"
        title=""
        className="pointer-events-none absolute -right-16 -bottom-16 w-72 opacity-[0.05] lg:w-96"
      />

      <div className="container-luxe relative grid gap-12 pt-24 pb-14 sm:pt-28 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center md:col-span-2 md:items-start md:text-left lg:col-span-4">
          <BrandLogo variant="horizontal" tone="light" showTagline />
          <p className="mt-3 font-serif text-lg text-ivory/80 italic">{siteConfig.taglineMeaning}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">{siteConfig.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + Customer support */}
        {footerNav.map((group, i) => (
          <div key={group.title} className={i === 0 ? "text-center md:text-left lg:col-span-2" : "text-center md:text-left lg:col-span-3"}>
            <FooterHeading>{group.title}</FooterHeading>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition duration-300 hover:pl-1 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="text-center md:col-span-2 md:text-left lg:col-span-3">
          <FooterHeading>Get in Touch</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm text-ivory/70">
            <li className="flex items-start justify-center gap-3 md:justify-start">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-gold-light">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start justify-center gap-3 md:justify-start">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{siteConfig.contact.phone}</span>
            </li>
            <li className="flex items-start justify-center gap-3 md:justify-start">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{siteConfig.contact.hours}</span>
            </li>
            <li className="flex items-start justify-center gap-3 md:justify-start">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{siteConfig.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative container-luxe">
        <div className="gold-rule opacity-50" />
      </div>

      <div className="container-luxe relative flex flex-col items-center gap-4 py-7 text-xs text-ivory/75 lg:flex-row lg:justify-between">
        <p>
          © <CopyrightYear /> {siteConfig.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Legal">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-gold-light">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="container-luxe relative pb-8 text-center text-[0.7rem] text-ivory/60">
        This product is a dietary supplement and is not intended to diagnose, treat, cure or prevent any disease.
      </p>
    </footer>
  );
}
