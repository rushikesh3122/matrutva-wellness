import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileShopBar } from "@/components/layout/MobileShopBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/context/CartContext";
import { CartToast } from "@/components/cart/CartToast";
import { SettingsProvider } from "@/context/SettingsContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { getSettings } from "@/lib/live-settings";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

/*
 * Fonts are bundled in src/fonts (no internet needed for `npm run dev` or `npm run build`).
 * next/font optimises them: preloading, size-matched fallbacks (no layout shift), long caching.
 * Kalnia and Figtree are variable fonts: one small file covers every weight.
 */
/** Headings + wordmark: flared classical capitals matching MATRUTVA */
const kalnia = localFont({
  src: "../fonts/kalnia-latin-var.woff2",
  variable: "--font-kalnia",
  weight: "100 700",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const figtree = localFont({
  src: "../fonts/figtree-latin-var.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
// Cinzel is kept only for the MATRUTVA wordmark, which is drawn in it.
const cinzel = localFont({
  src: "../fonts/cinzel-latin-var.woff2",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const dmMono = localFont({
  src: "../fonts/dm-mono-400-latin.woff2",
  variable: "--font-dm-mono",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
const tiro = localFont({
  src: "../fonts/tiro-devanagari-marathi-devanagari.woff2",
  variable: "--font-tiro",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["Noto Serif Devanagari", "serif"],
});

const defaultTitle = `${siteConfig.name} | Premium Indian Spirulina`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "spirulina",
    "spirulina capsules",
    "spirulina India",
    "plant protein",
    "superfood",
    "Matrutva Wellness",
    "natural wellness",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#123324",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  return (
    <html
      lang="en-IN"
      className={`${kalnia.variable} ${figtree.variable} ${cinzel.variable} ${dmMono.variable} ${tiro.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <SettingsProvider value={settings}>
          <CartProvider>
            {settings.announcements.length > 0 && <AnnouncementBar messages={settings.announcements} />}
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer settings={settings} />
            {/* Reads the URL, so it sits in Suspense: pages that refresh in the background (e.g. a product
                added in /admin) can then still be prerendered. */}
            <Suspense fallback={null}>
              <MobileShopBar />
            </Suspense>
            <CartToast />
          </CartProvider>
        </SettingsProvider>
        <JsonLd data={organizationJsonLd(settings)} />
      </body>
    </html>
  );
}
