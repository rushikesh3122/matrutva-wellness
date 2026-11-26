import type { Product } from "@/types/product";

/**
 * Central product catalogue — every page and component reads from here.
 *
 * Prices are intentionally `null` until confirmed (cards show "Price coming soon").
 * Entries with `isDemo: true` are placeholders: replace their details and images
 * with real product information before launch.
 */
export const products: Product[] = [
  {
    id: "spirulina-capsules",
    slug: "spirulina-capsules",
    name: "Spirulina Capsules",
    shortDescription: "Pure spirulina in easy, everyday capsules.",
    description:
      "Spirulina in convenient capsules for a simple daily routine. See the product label for ingredients, serving size and directions.",
    quantity: "60 capsules",
    price: null,
    images: [
      { src: "/images/products/spirulina-capsules-main.jpg", alt: "Matrutva Wellness Spirulina Capsules bottle on natural stone with a peacock feather" },
      { src: "/images/brand/front-label.jpg", alt: "Front label of Matrutva Wellness Spirulina Capsules" },
    ],
    badge: "Our signature",
    tags: ["Plant based"],
    inStock: true,
    featured: true,
  },
  {
    id: "spirulina-tablets",
    slug: "spirulina-tablets",
    name: "Spirulina Tablets",
    shortDescription: "Compressed spirulina tablets for nutrition on the go.",
    description: "Demo product. Replace with the final tablet details and photography.",
    quantity: "Pack size to be confirmed",
    price: null,
    images: [{ src: "/images/products/demo-spirulina-tablets.jpg", alt: "Illustration of Matrutva Wellness Spirulina Tablets (demo image)" }],
    isDemo: true,
    tags: ["Plant based"],
    inStock: true,
    featured: true,
  },
  {
    id: "spirulina-powder",
    slug: "spirulina-powder",
    name: "Spirulina Powder",
    shortDescription: "Versatile powder to stir into smoothies, juices and bowls.",
    description: "Demo product. Replace with the final powder details and photography.",
    quantity: "Pack size to be confirmed",
    price: null,
    images: [{ src: "/images/products/demo-spirulina-powder.jpg", alt: "Illustration of Matrutva Wellness Spirulina Powder pouch (demo image)" }],
    isDemo: true,
    tags: ["Plant based"],
    inStock: true,
    featured: true,
  },
  {
    id: "wellness-combo",
    slug: "wellness-combo",
    name: "Wellness Combo",
    shortDescription: "Capsules and powder together for a complete daily ritual.",
    description: "Demo product. Replace with the final combo contents and photography.",
    quantity: "Combo contents to be confirmed",
    price: null,
    images: [{ src: "/images/products/demo-spirulina-combo.jpg", alt: "Illustration of the Matrutva Wellness combo pack (demo image)" }],
    isDemo: true,
    badge: "Combo",
    tags: ["Gift ready"],
    inStock: true,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
