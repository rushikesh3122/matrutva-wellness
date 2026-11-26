/**
 * HOMEPAGE CONTENT
 * All homepage text lives here so it can be edited without touching components.
 *
 * Content rules for this brand:
 *  - No medical or cure claims.
 *  - No certifications, test results or prices until they are real and documented.
 *  - Nutrition facts are general (from published literature) unless they come from your product label.
 */

import type { BrandIconName } from "@/components/ui/BrandIcon";

export const hero = {
  eyebrow: "Premium Indian Spirulina",
  title: ["Nature's Finest Nutrition.", "A Better Everyday."],
  description:
    "Discover the goodness of spirulina, thoughtfully crafted to bring natural nutrition into your everyday wellness routine.",
  primaryCta: { label: "Explore Products", href: "/shop" },
  secondaryCta: { label: "Discover Spirulina", href: "/discover-spirulina" },
  image: {
    src: "/images/brand/hero-bottle-stone.jpg",
    alt: "Matrutva Wellness Spirulina Capsules bottle standing on natural stone among leaves and a peacock feather",
  },
  highlights: ["Natural wellness", "Plant based"],
};

/** Trust indicators under the hero. Keep each statement factual and verifiable. */
export const trustItems = [
  { icon: "leaf", title: "Pure & Natural", text: "Spirulina as the listed ingredient. Nothing hidden." },
  { icon: "shield", title: "Quality Focused", text: "Carefully sourced, packed and checked batch by batch." },
  { icon: "flask", title: "Science-Informed Nutrition", text: "Guided by published nutrition research." },
  { icon: "sun", title: "Everyday Wellness", text: "Simple to add to your daily routine." },
] as const;

export const featured = {
  eyebrow: "Chapter 07 · Your Daily Ritual",
  title: "Choose Your Spirulina",
  description: "Begin with our signature spirulina capsules. More ways to enjoy spirulina are on their way.",
  cta: { label: "View all products", href: "/shop" },
};

export const why = {
  eyebrow: "Why Matrutva Wellness",
  title: "Wellness Begins With What Nature Gives Us.",
  description:
    "Matrutva means motherhood. Our philosophy is simple: nourish the people you love the way a mother would, with care, honesty and the best that nature offers.",
  cards: [
    {
      title: "Rooted in Nature",
      text: "We start with spirulina, one of nature's most nutrient-dense foods, and keep it simple.",
      image: "/images/textures/leaf.jpg",
      alt: "Green leaf with dew drops",
    },
    {
      title: "A Mother's Care",
      text: "मातृवत् पोषणम्, nourishment with a mother's care, guides every choice we make.",
      image: "/images/textures/peacock-feather.jpg",
      alt: "Peacock feather detail",
    },
    {
      title: "Honest Transparency",
      text: "Clear labels, clear sourcing information and batch details you can ask us about.",
      image: "/images/textures/sandalwood.jpg",
      alt: "Warm natural sandalwood texture",
    },
    {
      title: "Thoughtful Everyday Ritual",
      text: "Wellness is built in small, consistent moments. We make that moment beautiful.",
      image: "/images/textures/teal-silk.jpg",
      alt: "Flowing teal silk",
    },
  ],
};

export const discover = {
  eyebrow: "Chapter 03 · The Ingredient",
  watermark: "Spirulina",
  title: "A Tiny Spiral With Remarkable Nutrition",
  intro:
    "Spirulina is a blue-green microalga (cyanobacterium) that grows naturally in warm, alkaline waters. It has been eaten as food for centuries and is now cultivated carefully around the world.",
  /** General composition as reported in nutrition literature. Not product-specific claims. */
  composition: [
    { label: "Plant protein", value: "Typically 55–70% of dry weight" },
    { label: "Minerals", value: "Including iron, magnesium and potassium" },
    { label: "Vitamins", value: "Including B-group vitamins and beta-carotene" },
    { label: "Phycocyanin", value: "The natural blue pigment behind its colour" },
  ],
  compositionNote: "General values reported in nutrition literature. Refer to your product label for exact nutrition information.",
  howTo: {
    title: "How to Enjoy It",
    steps: [
      "Capsules or tablets: take with water, as directed on the label.",
      "Powder: stir into smoothies, juices, yoghurt or bowls.",
      "Start small, stay consistent, and make it part of your routine.",
    ],
  },
  why: {
    title: "Why People Include It",
    points: ["A convenient source of plant protein", "Nutrient-dense in a small serving", "A plant-based source of nutrition", "Easy to make a daily habit"],
  },
  disclaimer: "Spirulina is a food supplement, not a substitute for a varied diet. Consult your doctor if you are pregnant, nursing or on medication.",
  cta: { label: "Learn More About Spirulina", href: "/discover-spirulina" },
};

export const story = {
  eyebrow: "Chapter 01 · Why We Began",
  title: "Born From a Mother's Instinct to Nourish",
  paragraphs: [
    "Matrutva Wellness began with a simple question: how would a mother choose nutrition for her family? She would look for something pure, honest and genuinely nourishing.",
    "Inspired by India's timeless respect for nature and the grace of the peacock, we bring spirulina to modern Indian homes, presented with the care it deserves.",
  ],
  quote: "Nourishment with a Mother's Care",
  cta: { label: "Read Our Story", href: "/our-story" },
  images: {
    main: { src: "/images/brand/bottle-feather-stone.jpg", alt: "Matrutva Wellness bottle with a peacock feather on natural stone" },
    secondary: { src: "/images/brand/shipping-box.jpg", alt: "Matrutva Wellness emerald packaging box" },
  },
};

export const quality = {
  eyebrow: "Chapter 06 · Our Promise",
  title: "Know Exactly What You Are Taking",
  description: "We believe trust is earned with information. Here is what we share with every product.",
  pillars: [
    { icon: "leaf", title: "Ingredient Information", text: "Every ingredient is listed clearly on the label. No hidden fillers." },
    { icon: "shield", title: "Quality Assurance", text: "Defined quality checks at sourcing, processing and packing." },
    { icon: "flask", title: "Laboratory Testing", text: "Batch testing details will be published here as reports become available." },
    { icon: "file", title: "Product Transparency", text: "Batch number, manufacturing and expiry dates on every pack." },
  ] as { icon: BrandIconName; title: string; text: string }[],
  /** Replace with real certificates / lab reports. Leave `href` empty until a document exists. */
  documents: [
    { title: "Batch lab report", status: "Coming soon", href: "" },
    { title: "Licences & registrations", status: "Coming soon", href: "" },
    { title: "Ingredient specification", status: "Coming soon", href: "" },
  ],
  cta: { label: "Our Quality Promise", href: "/quality" },
};

/** "From Nature to You" journey. Edit the descriptions to match your actual process. */
export const process = {
  eyebrow: "Chapter 04 · From Nature to You",
  title: "A Careful Journey, Step by Step",
  steps: [
    { icon: "map", title: "Sourcing", text: "Partnering with trusted spirulina growers." },
    { icon: "droplets", title: "Cultivation", text: "Grown in clean, controlled water ponds." },
    { icon: "sprout", title: "Harvesting", text: "Harvested fresh at the right stage." },
    { icon: "factory", title: "Processing", text: "Gently dried to protect its nutrition." },
    { icon: "flask", title: "Quality Testing", text: "Checked against our quality standards." },
    { icon: "package", title: "Packaging", text: "Sealed in our protective emerald pack." },
  ] as { icon: BrandIconName; title: string; text: string }[],
};

export const testimonialsSection = {
  eyebrow: "Kind Words",
  title: "Loved by Families",
  note: "Sample reviews shown for layout. Real customer reviews will appear here after launch.",
};

export const journalSection = {
  eyebrow: "Wellness Journal",
  title: "Notes on Natural Living",
  cta: { label: "Visit the Journal", href: "/journal" },
};

/* ------------------------------------------------------------------
   Added from the Matrutva brand board (logo meaning, philosophy,
   capsule label) and from the reference-site review.
------------------------------------------------------------------- */

/** Brand philosophy and logo meaning, as written on the brand board. */
export const philosophy = {
  eyebrow: "Chapter 02 · The Symbol",
  title: "Inspired by Nature, Guided by Tradition",
  description:
    "Inspired by nature, guided by tradition and designed for modern life. Matrutva Wellness brings you pure, natural nutrition for a healthier, more balanced tomorrow.",
  values: [
    { icon: "sprout", title: "Pure & Natural" },
    { icon: "shield", title: "Protective & Caring" },
    { icon: "flower", title: "Balanced Living" },
    { icon: "sun", title: "Vitality & Energy" },
    { icon: "heart", title: "For a Healthier Tomorrow" },
  ] as { icon: BrandIconName; title: string }[],
  logoTitle: "What Our Logo Means",
  logoMeaning: [
    { part: "feather", title: "Peacock Feather", text: "Purity, beauty, renewal and inner strength." },
    { part: "leaf", title: "Inner Leaf", text: "Growth, vitality and natural wellness." },
    { part: "curve", title: "Enclosing Curve", text: "Protection, care and a mother's embrace." },
    { part: "dot", title: "Golden Dot", text: "Hope, energy and new beginnings." },
    { part: "mark", title: "Overall Form", text: "Balance of nature, nutrition and life." },
  ] as { part: "feather" | "leaf" | "curve" | "dot" | "mark"; title: string; text: string }[],
};

/**
 * Spirulina Capsules label details, copied from the brand's label artwork.
 * Check every value against the final printed pack before launch.
 */
export const capsuleLabel = {
  eyebrow: "Chapter 05 · In Every Bottle",
  title: "What's Inside, and How to Take It",
  description: "A nutrient-rich superfood, naturally sourced to support your daily wellness and vitality.",
  image: { src: "/images/products/spirulina-capsules-main.jpg", alt: "Matrutva Wellness Spirulina Capsules bottle with capsules" },
  highlights: [
    { value: "100%", label: "Spirulina" },
    { value: "2", label: "Capsules a day" },
    { value: "2 g", label: "Protein per serving" },
    { value: "Plant", label: "Based" },
  ],
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
  note: "Values from our label artwork. Always check the pack you receive for final details.",
  cta: { label: "Shop Spirulina Capsules", href: "/shop/spirulina-capsules" },
};

/** Homepage FAQ. Answers only use facts from the label; add shipping and payment answers once final. */
export const homeFaq = {
  eyebrow: "Questions",
  title: "Good to Know",
  items: [
    { q: "What is in Matrutva Spirulina Capsules?", a: "The label lists one ingredient: spirulina (100%)." },
    { q: "How many capsules should I take?", a: "Take 2 capsules daily with water, or as directed by a healthcare professional." },
    { q: "Is it a medicine?", a: "No. Spirulina is a food supplement and is not for medicinal use. It is not a substitute for a varied diet." },
    { q: "Can I take it if I am pregnant or breastfeeding?", a: "Please consult your doctor first if you are pregnant or lactating, or if you take any medication." },
    { q: "How should I store it?", a: "Store the bottle in a cool, dry place, tightly closed and out of reach of children." },
  ],
  cta: { label: "See all FAQs", href: "/faqs" },
};

export const finalCta = {
  eyebrow: "Begin Your Ritual",
  title: "Pure Nutrition. Natural Living. A Balanced Tomorrow.",
  description: "Nature's goodness for a healthier tomorrow, with a mother's care in every bottle.",
  primary: { label: "Shop Now", href: "/shop" },
  secondary: { label: "Discover Spirulina", href: "/discover-spirulina" },
  image: { src: "/images/brand/front-label.jpg", alt: "Front label of Matrutva Wellness Spirulina Capsules" },
};
