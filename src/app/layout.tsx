import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/context/CartContext";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

/*
 * Fonts are bundled in src/fonts (no internet needed for `npm run dev` or `npm run build`).
 * next/font optimises them: preloading, size-matched fallbacks (no layout shift), long caching.
 * Cinzel, Jost and Cormorant are variable fonts: one small file covers every weight.
 */
/** Headings + wordmark: flared classical capitals matching MATRUTVA */
const cinzel = localFont({
  src: "../fonts/cinzel-latin-var.woff2",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
/** Editorial serif for quotes and italic accents */
const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-var.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic-latin-var.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});
/** Body text and spaced labels ("W E L L N E S S") */
const jost = localFont({
  src: "../fonts/jost-latin-var.woff2",
  variable: "--font-jost",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
/** Marathi tagline */
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
  twitter: { card: "summary_large_image", title: defaultTitle, description: siteConfig.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#003D32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${tiro.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CartProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
