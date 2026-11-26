import type { Product } from "@/types/product";

/**
 * Central product catalogue — every page and component reads from here.
 *
 * Matrutva currently sells one product: Spirulina Capsules.
 * Add new products here when they launch; the shop, product pages and sitemap update automatically.
 */
export const products: Product[] = [
  {
    id: "spirulina-capsules",
    slug: "spirulina-capsules",
    name: "Spirulina Capsules",
    eyebrow: "Rise · Spirulina",
    headline: "Living blue-green. Nothing else.",
    shortDescription: "Pure spirulina in easy, everyday capsules.",
    description: "Cold-compressed microalgae, pressed without heat so the phycocyanin stays alive.",
    quantity: "60 / 120 capsules",
    // Price from the Figma design. Confirm before launch.
    price: 649,
    images: [
      { src: "/images/products/white-bottle-hero.jpg", alt: "Matrutva Wellness Spirulina Capsules white bottle with green label beside natural stone" },
      { src: "/images/products/white-bottle-front.jpg", alt: "Front label of the Matrutva Wellness Spirulina Capsules bottle" },
      { src: "/images/products/white-bottle-lifestyle.jpg", alt: "Matrutva Wellness Spirulina Capsules bottle lying on stone with green leaves and capsules" },
      { src: "/images/products/white-bottle-cap.jpg", alt: "Green bottle cap embossed with the Matrutva peacock emblem" },
    ],
    badge: "Our signature",
    tags: ["Plant based"],
    inStock: true,
    featured: true,
    // Claims from the Figma design. Confirm each one is documented before launch.
    facts: [
      { value: "100%", label: "Organic" },
      { value: "60%", label: "Plant protein" },
      { value: "0", label: "Fillers" },
    ],
    // From the printed label artwork. Check against the final pack.
    label: {
      usage: "Take 2 capsules daily with water, or as directed by a healthcare professional.",
      ingredients: "Spirulina (100%)",
      nutritionTitle: "Nutrition information, per serving (approx.)",
      nutrition: [
        { label: "Energy", value: "10 kcal" },
        { label: "Protein", value: "2 g" },
        { label: "Carbohydrate", value: "0.5 g" },
        { label: "Fat", value: "0.2 g" },
      ],
      storage: "Store in a cool, dry place. Keep tightly closed.",
      warnings: ["Not for medicinal use.", "Keep out of reach of children.", "Consult your doctor if pregnant or lactating."],
    },
    faq: [
      { q: "What is in the capsules?", a: "One ingredient: spirulina (100%), in a capsule." },
      { q: "How many should I take?", a: "Take 2 capsules daily with water, or as directed by a healthcare professional." },
      { q: "Is it a medicine?", a: "No. Spirulina is a food supplement and is not for medicinal use. It is not a substitute for a varied diet." },
      { q: "Can I take it if I am pregnant or breastfeeding?", a: "Please consult your doctor first if you are pregnant or lactating, or if you take any medication." },
      { q: "How should I store it?", a: "In a cool, dry place, tightly closed and out of reach of children." },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
