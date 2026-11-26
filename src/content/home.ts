/**
 * HOMEPAGE CONTENT
 * Copy, prices and figures come from the Figma design "Matrutva Brand Website".
 * Edit text here without touching components.
 *
 * BEFORE LAUNCH: confirm every claim below is true and documented for the product
 * you sell (for example "Organic", "<45°C", "60% plant protein", "single origin"),
 * and that the prices are final. Indian food-supplement rules (FSSAI) require
 * claims to be backed up.
 */

export const hero = {
  eyebrow: "Nourishment with a Mother's Care",
  title: ["Pure plant", "energy."],
  titleAccent: "Nothing else.",
  description: "No scoops. No shakers. No fillers. The living essence of superfoods, in a precise daily tablet.",
  primaryCta: { label: "Shop the range", href: "#products" },
  secondaryCta: { label: "Ask on WhatsApp" },
  image: {
    src: "/images/figma/hero-bottle-cutout.png",
    alt: "Matrutva Wellness Spirulina Capsules bottle with capsules beside it",
    width: 448,
    height: 560,
  },
};

export const stats = [
  { value: "100%", label: "Organic sourcing" },
  { value: "<45°C", label: "Low-temp dried" },
  { value: "0", label: "Synthetic fillers" },
  { value: "1–2", label: "A day, that's all" },
];

export type ProductAccent = "teal" | "moss" | "saffron" | "terracotta";

export type HomeProduct = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  facts: { value: string; label: string }[];
  price: string;
  pack: string;
  accent: ProductAccent;
  image: { src: string; alt: string };
  /** Image on the left (true) or right (false) on desktop */
  imageFirst: boolean;
};

export const products: HomeProduct[] = [
  {
    id: "spirulina",
    eyebrow: "Rise · Spirulina",
    title: "Living blue-green. Nothing else.",
    description: "Cold-compressed microalgae, pressed without heat so the phycocyanin stays alive.",
    facts: [
      { value: "100%", label: "Organic" },
      { value: "60%", label: "Plant protein" },
      { value: "0", label: "Fillers" },
    ],
    price: "₹649",
    pack: "60 / 120 tablets",
    accent: "teal",
    image: { src: "/images/figma/spirulina-bottle-hires.jpg", alt: "Matrutva Wellness Spirulina bottle with capsules and spirulina powder" },
    imageFirst: true,
  },
  {
    id: "moringa",
    eyebrow: "Green · Moringa",
    title: "The everyday green.",
    description: "Shade-dried moringa leaf, milled whole and sealed in a vegetarian shell.",
    facts: [
      { value: "A·C·E", label: "Vitamins" },
      { value: "HPMC", label: "Veg shell" },
      { value: "0", label: "Stearate" },
    ],
    price: "₹499",
    pack: "60 / 120 capsules",
    accent: "moss",
    image: { src: "/images/figma/moringa.jpg", alt: "Moringa leaf powder in a wooden bowl with a brass scoop" },
    imageFirst: false,
  },
  {
    id: "turmeric",
    eyebrow: "Warm · Turmeric",
    title: "The golden root, precise.",
    description: "Standardised curcumin from single-origin roots, for daily joint and inflammatory balance.",
    facts: [
      { value: "High", label: "Curcumin" },
      { value: "1 farm", label: "Single origin" },
      { value: "0", label: "Additives" },
    ],
    price: "₹579",
    pack: "60 / 120 capsules",
    accent: "saffron",
    image: { src: "/images/figma/turmeric.jpg", alt: "Bowl of golden turmeric powder seen from above" },
    imageFirst: true,
  },
  {
    id: "fruit-veg",
    eyebrow: "Daily · Fruit & Veg",
    title: "A field, in a capsule.",
    description: "Low-temperature dehydrated whole produce, sealed to lock the antioxidant colour in.",
    facts: [
      { value: "<45°C", label: "Dried" },
      { value: "Whole", label: "Food extract" },
      { value: "0", label: "Preservatives" },
    ],
    price: "₹539",
    pack: "60 / 120 capsules",
    accent: "terracotta",
    image: { src: "/images/figma/fruit-veg.jpg", alt: "Close-up of whole dried fruits" },
    imageFirst: false,
  },
];

export const promise = {
  devanagari: "मातृवत् पोषणम्",
  eyebrow: "The Matrutva Promise",
  highlight: "Matrutva",
  text: " means a mother's care — nourishment given without compromise. Whole foods, gently dried, honestly sourced. That is the whole recipe.",
  sanskrit: "प्रकृतेः ऊर्जा · जीवनस्य संतुलनम्",
  footer: "Natural Wellness · Thoughtful Living",
};

export const ritual = {
  eyebrow: "Suggested daily use",
  title: "Small ritual. Long arc.",
  steps: [
    { title: "Take 1–2 daily", text: "With water, preferably after meals." },
    { title: "Stay consistent", text: "Living nutrition compounds quietly, over weeks." },
    { title: "Store it cool", text: "Away from sun. Keep tightly capped." },
  ],
};

export const orderCta = {
  title: "Naturally yours.",
  description: "Tell us what you're reaching for. We'll help you choose and order right in chat.",
  cta: "Order on WhatsApp",
};
