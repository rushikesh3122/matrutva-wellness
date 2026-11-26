/** Brand-wide constants and navigation, kept in one place. */
export const siteConfig = {
  name: "Matrutva Wellness",
  tagline: "मातृवत् पोषणम्",
  taglineMeaning: "Nourishment with a Mother's Care",
  description:
    "Premium Indian spirulina and plant-based wellness, made with scientific transparency and a mother's care.",
  contact: {
    email: "care@matrutvawellness.com",
    phone: "+91 00000 00000",
    hours: "Mon–Sat, 10 AM – 6 PM IST",
    address: "Your registered address, Maharashtra, India",
  },
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
    whatsapp: "#",
  },
  /**
   * WhatsApp number for orders, digits only with country code (e.g. "919876543210").
   * While empty, every "Order" / "Buy" button opens the Contact page instead.
   */
  whatsappNumber: "",
} as const;

/** Link for an order button: a WhatsApp chat with a prefilled message, or the Contact page until a number is set. */
export function orderHref(message = "Hi Matrutva Wellness, I'd like to place an order."): string {
  const n = siteConfig.whatsappNumber as string;
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : "/contact";
}

export type NavItem = { label: string; href: string };

/** Header navigation, as in the Figma design: Products · Promise · Ritual. */
export const mainNav: NavItem[] = [
  { label: "Products", href: "/#products" },
  { label: "Promise", href: "/#promise" },
  { label: "Ritual", href: "/#ritual" },
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

/** Rotating messages in the announcement bar — edit, add or remove freely. */
export const announcements: string[] = [
  "Discover a more natural approach to everyday wellness",
  "Nourishment with a Mother's Care",
  // Optional — uncomment once your shipping policy is final:
  // "Free shipping across India on orders above ₹___",
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Discover Spirulina", href: "/discover-spirulina" },
      { label: "Our Story", href: "/our-story" },
      { label: "Quality & Transparency", href: "/quality" },
      { label: "Wellness Journal", href: "/journal" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping Information", href: "/shipping-policy" },
      { label: "Returns & Refunds", href: "/refund-policy" },
      { label: "Track Your Order", href: "/track-order" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];
