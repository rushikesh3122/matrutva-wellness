import type { Product } from "@/types/product";

/**
 * Placeholder catalogue. Images are cropped from the brand reference
 * board until final packaging photography is supplied.
 */
export const products: Product[] = [
  {
    id: "spirulina-capsules-60",
    slug: "spirulina-capsules",
    name: "Spirulina Capsules",
    subtitle: "60 Vegetarian Capsules · 500 mg",
    description:
      "100% pure spirulina, a natural superfood rich in plant protein, vitamins, minerals and antioxidants.",
    price: 599,
    mrp: 799,
    images: [
      {
        src: "/images/products/spirulina-capsules-alt.jpg",
        alt: "Matrutva Wellness Spirulina Capsules emerald bottle",
      },
      {
        src: "/images/products/spirulina-capsules.jpg",
        alt: "Close-up of the Matrutva Wellness Spirulina Capsules label",
      },
    ],
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 126,
    benefits: ["Plant protein", "Natural energy", "Immunity support"],
    inStock: true,
  },
];
