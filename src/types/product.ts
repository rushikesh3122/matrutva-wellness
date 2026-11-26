export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Short line under the name, e.g. "60 Vegetarian Capsules" */
  subtitle?: string;
  description: string;
  price: number;
  /** Maximum retail price; when higher than price the card shows a discount */
  mrp?: number;
  images: ProductImage[];
  badge?: string;
  rating?: number;
  reviewCount?: number;
  benefits?: string[];
  inStock: boolean;
};
