/**
 * HOMEPAGE CONTENT
 * Copy, prices and figures come from the Figma design "Matrutva Brand Website".
 * Edit text here without touching components.
 *
 * Product details (price, facts, label) live in src/data/products.ts.
 *
 * BEFORE LAUNCH: confirm every claim is true and documented for the product
 * you sell (for example "Organic", "<45°C", "60% plant protein") and that the price is final. Indian food-supplement rules (FSSAI) require
 * claims to be backed up.
 */

export const hero = {
  eyebrow: "Nourishment with a Mother's Care",
  title: ["Pure plant", "energy."],
  titleAccent: "Nothing else.",
  description: "No scoops. No shakers. No fillers. The living essence of spirulina, in a precise daily capsule.",
  primaryCta: { label: "Shop spirulina", href: "/shop/spirulina-capsules" },
  secondaryCta: { label: "Ask on WhatsApp" },
  image: {
    src: "/images/products/white-bottle-hero.jpg",
    alt: "Matrutva Wellness Spirulina Capsules, a white bottle with a deep green label, beside natural stone",
  },
};

export const stats = [
  { value: "100%", label: "Organic sourcing" },
  { value: "<45°C", label: "Low-temp dried" },
  { value: "0", label: "Synthetic fillers" },
  { value: "2", label: "A day, that's all" },
];

export const inside = {
  eyebrow: "What's inside",
  title: "One ingredient. Read the label.",
  description: "Everything on our pack, in plain words. Nothing hidden, nothing added.",
};

export const faq = {
  eyebrow: "Questions",
  title: "Good to know.",
};

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
    { title: "Take 2 daily", text: "With water, or as directed by a healthcare professional." },
    { title: "Stay consistent", text: "Living nutrition compounds quietly, over weeks." },
    { title: "Store it cool", text: "Away from sun. Keep tightly capped." },
  ],
};

export const orderCta = {
  title: "Naturally yours.",
  description: "Tell us what you're reaching for. We'll help you choose and order right in chat.",
  cta: "Shop spirulina",
};
