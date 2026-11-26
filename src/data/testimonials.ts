import type { Testimonial } from "@/types/product";

/**
 * SAMPLE testimonials for layout only. Each is labelled "Sample review" on the site.
 * Replace with genuine customer reviews (with their permission) and set isSample: false.
 */
export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    quote: "The packaging feels premium and the capsules are easy to take with breakfast. A calm, simple addition to my mornings.",
    name: "Sample Customer",
    location: "Pune",
    product: "Spirulina Capsules",
    isSample: true,
  },
  {
    id: "sample-2",
    quote: "I like that the label is clear about what is inside. It made choosing much easier for our family.",
    name: "Sample Customer",
    location: "Mumbai",
    product: "Spirulina Capsules",
    isSample: true,
  },
  {
    id: "sample-3",
    quote: "Beautiful brand with a thoughtful story. The Marathi tagline made me smile.",
    name: "Sample Customer",
    location: "Nashik",
    isSample: true,
  },
];
