import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost, Tiro_Devanagari_Marathi } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/* Display / wordmark: flared classical capitals, matching the MATRUTVA wordmark */
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
/* Editorial serif for quotes and italic accents */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
/* Clean geometric sans for body text and spaced labels ("W E L L N E S S") */
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
/* Devanagari for the Marathi tagline मातृवत् पोषणम् */
const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Premium Indian Spirulina`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#003D32",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${tiro.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
