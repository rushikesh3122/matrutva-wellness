/** Brand-wide constants and navigation, kept in one place. */
export const siteConfig = {
  name: "Matrutva Wellness",
  tagline: "मातृवत् पोषणम्",
  taglineMeaning: "Nourishment with a Mother's Care",
  description:
    "Premium Indian spirulina and plant-based wellness, made with scientific transparency and a mother's care.",
  contact: {
    email: "hello@matrutvawellness.com",
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
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
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
