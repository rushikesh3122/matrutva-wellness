import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost, Tiro_Devanagari_Marathi } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/context/CartContext";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/lib/site";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

/*
 * Fonts are self-hosted at build time by next/font: no request to Google
 * from the visitor's browser, no layout shift. Cinzel, Cormorant and Jost are
 * variable fonts: one small file per family covers every weight.
 */
/** Headings + wordmark: flared classical capitals matching MATRUTVA */
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], display: "swap" });
/** Editorial serif for quotes and italic accents */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
/** Body text and spaced labels ("W E L L N E S S") */
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });
/** Marathi tagline */
const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
  preload: false,
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
