import Link from "next/link";
import { legalNav, orderHref, siteConfig } from "@/lib/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** Cached so the footer stays fully prerendered (Next.js Cache Components). */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const link = "text-forest/70 transition-colors hover:text-emerald";

/** Minimal footer from the Figma design. */
export function Footer() {
  const { instagram, facebook } = siteConfig.social;
  return (
    <footer className="mt-auto bg-ivory text-forest">
      <div className="container-luxe flex flex-col gap-8 pt-14 pb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <BrandLogo variant="wordmark" size="sm" />
          <p className="mt-3 font-mono text-[0.62rem] tracking-[0.24em] text-forest/65 uppercase">
            <span lang="mr" className="font-devanagari text-xs tracking-normal normal-case">
              {siteConfig.tagline}
            </span>{" "}
            · Natural Wellness · Thoughtful Living
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <li>
            <a href={`mailto:${siteConfig.contact.email}`} className={link}>
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="text-forest/70">
            <a href={instagram} className={link}>
              Instagram
            </a>{" "}
            ·{" "}
            <a href={facebook} className={link}>
              Facebook
            </a>
          </li>
          <li>
            <Link href={orderHref()} className={`inline-flex items-center gap-2 ${link}`}>
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </Link>
          </li>
        </ul>
      </div>
      <div className="container-luxe flex flex-col gap-3 pb-10 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.6rem] tracking-[0.18em] text-forest/70 uppercase">
          © <CopyrightYear /> {siteConfig.name} · Not intended to diagnose or treat. Consult your healthcare professional.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase" aria-label="Legal">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-1.5 text-forest/70 transition-colors hover:text-emerald">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
