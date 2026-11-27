import { siteConfig } from "./site";
import type { StoreSettings } from "./settings";

/**
 * Public URL of the site. Set NEXT_PUBLIC_SITE_URL in .env.local / hosting
 * settings once the domain is live (used for canonical URLs, sitemap, social cards).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.matrutvawellness.com").replace(/\/$/, "");

/** schema.org structured data for Google (Organization + WebSite). */
export function organizationJsonLd(s: StoreSettings) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        logo: `${siteUrl}/brand/matrutva-logo-full.png`,
        slogan: siteConfig.taglineMeaning,
        email: s.email,
        ...(s.phone ? { telephone: s.phone } : {}),
        sameAs: [s.instagram, s.facebook, s.youtube].filter((u) => u.startsWith("http")),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}
