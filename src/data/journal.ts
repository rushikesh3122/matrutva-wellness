import type { JournalPost } from "@/types/product";

/** Wellness Journal articles. Titles and excerpts are drafts — edit freely. */
export const journalPosts: JournalPost[] = [
  {
    slug: "what-is-spirulina",
    title: "What Is Spirulina? A Gentle Introduction",
    excerpt: "Where this blue-green algae comes from, what it contains, and why it has been eaten for centuries.",
    category: "Discover",
    readingTime: "5 min read",
    image: { src: "/images/textures/leaf.jpg", alt: "Fresh green leaf with dew drops" },
    date: "2026-11-01",
  },
  {
    slug: "adding-spirulina-to-your-day",
    title: "Simple Ways to Add Spirulina to Your Day",
    excerpt: "From morning smoothies to capsules with breakfast, easy ideas for building a consistent routine.",
    category: "Rituals",
    readingTime: "4 min read",
    image: { src: "/images/products/white-bottle-cap.jpg", alt: "Matrutva Wellness bottle cap embossed with the peacock emblem" },
    date: "2026-11-08",
  },
  {
    slug: "reading-a-supplement-label",
    title: "How to Read a Supplement Label",
    excerpt: "What to look for in ingredients, serving sizes and batch details, so you can choose with confidence.",
    category: "Transparency",
    readingTime: "6 min read",
    image: { src: "/images/products/white-bottle-front.jpg", alt: "Front label of the Matrutva Wellness Spirulina Capsules bottle" },
    date: "2026-11-15",
  },
];
