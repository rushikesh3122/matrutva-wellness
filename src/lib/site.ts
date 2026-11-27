/** Brand-wide constants and navigation. Contact details, WhatsApp and shipping are in /admin → Settings (src/lib/settings.ts). */
export const siteConfig = {
  name: "Matrutva Wellness",
  tagline: "मातृवत् पोषणम्",
  taglineMeaning: "Nourishment with a Mother's Care",
  description:
    "Premium Indian spirulina and plant-based wellness, made with scientific transparency and a mother's care.",
} as const;

export type NavItem = { label: string; href: string };

/** Header navigation: the main pages of the site. */
export const mainNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Discover", href: "/discover-spirulina" },
  { label: "Our Story", href: "/our-story" },
  { label: "Quality", href: "/quality" },
  { label: "Contact", href: "/contact" },
];

/** Full page list, used by the mobile menu. */
export const allPages: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Discover Spirulina", href: "/discover-spirulina" },
  { label: "Our Story", href: "/our-story" },
  { label: "Quality", href: "/quality" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns, grouped the way shoppers look for them. */
export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Spirulina Capsules", href: "/shop/spirulina-capsules" },
      { label: "All Products", href: "/shop" },
      { label: "Your Cart", href: "/cart" },
      { label: "Track Your Order", href: "/track-order" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Discover Spirulina", href: "/discover-spirulina" },
      { label: "Our Story", href: "/our-story" },
      { label: "Quality & Transparency", href: "/quality" },
      { label: "Wellness Journal", href: "/journal" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping Information", href: "/shipping-policy" },
      { label: "Returns & Refunds", href: "/refund-policy" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];
