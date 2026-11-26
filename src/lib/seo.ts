import { siteConfig } from "./site";

/**
 * Public URL of the site. Set NEXT_PUBLIC_SITE_URL in .env.local / hosting
 * settings once the domain is live (used for canonical URLs, sitemap, social cards).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.matrutvawellness.com").replace(/\/$/, "");

/** schema.org structured data for Google (Organization + WebSite). */
export function organizationJsonLd() {
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
        email: siteConfig.contact.email,
        sameAs: Object.values(siteConfig.social).filter((u) => u.startsWith("http")),
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
