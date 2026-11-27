export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** One-line description shown on cards */
  shortDescription: string;
  description: string;
  /** Pack size, e.g. "60 capsules" or "100 g" */
  quantity: string;
  /** Selling price in ₹. null = not announced yet (card shows "Price coming soon") */
  price: number | null;
  /** Maximum retail price in ₹, shown struck through when higher than price */
  mrp?: number | null;
  images: ProductImage[];
  badge?: string;
  /** Marks catalogue entries that are placeholders until real products are added */
  isDemo?: boolean;
  /** Only add once you have genuine customer reviews */
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  inStock: boolean;
  /** Most a customer can order: the stock left when stock is tracked in /admin. */
  maxQuantity?: number;
  /** True when stock is at or below the low-stock warning set in /admin. */
  fewLeft?: boolean;
  featured?: boolean;
  /** Short eyebrow line, e.g. "Rise · Spirulina" */
  eyebrow?: string;
  /** Headline used on the homepage and product page */
  headline?: string;
  /** Three headline figures shown under the description */
  facts?: { value: string; label: string }[];
  /** Label details, copied from the printed pack */
  label?: {
    usage: string;
    ingredients: string;
    nutritionTitle: string;
    nutrition: { label: string; value: string }[];
    storage: string;
    warnings: string[];
  };
  faq?: { q: string; a: string }[];
};

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image: ProductImage;
  /** ISO date, e.g. "2026-11-01" */
  date: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location?: string;
  product?: string;
  /** true until replaced with a real, verifiable customer review */
  isSample: boolean;
};
