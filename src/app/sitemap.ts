import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllProductSlugs } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/gallery",
    "/contact",
    "/faq",
    "/cart",
    "/wishlist",
    "/checkout",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = getAllProductSlugs().map((slug) => ({
    url: `${base}/product/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/shop?category=${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
