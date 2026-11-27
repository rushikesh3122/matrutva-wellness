import type { MetadataRoute } from "next";
import { allPages } from "@/lib/site";
import { siteUrl } from "@/lib/seo";
import { getLiveProducts } from "@/lib/live-products";

/** Lists every public page. Product URLs are added automatically from the product data. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getLiveProducts();
  const pages = allPages.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const productPages = products.map((p) => ({
    url: `${siteUrl}/shop/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  return [...pages, ...productPages];
}
