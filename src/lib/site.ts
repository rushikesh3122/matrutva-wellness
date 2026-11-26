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
    address: "Maharashtra, India",
  },
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Discover Spirulina", href: "/discover-spirulina" },
  { label: "Our Story", href: "/our-story" },
  { label: "Quality & Transparency", href: "/quality" },
  { label: "Wellness Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Spirulina Capsules", href: "/shop/spirulina-capsules" },
      { label: "Bundles & Offers", href: "/shop" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Discover Spirulina", href: "/discover-spirulina" },
      { label: "Quality & Transparency", href: "/quality" },
      { label: "Wellness Journal", href: "/journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping & Returns", href: "/contact" },
    ],
  },
];
