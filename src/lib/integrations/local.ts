import type { Product } from "@/lib/types";
import {
  products,
  getProductBySlug,
  getProductsByCategory,
} from "@/data/products";
import type { CommerceProvider } from "./types";

// ספק ברירת המחדל — נתונים סטטיים מקומיים (המצב הנוכחי).
export const localProvider: CommerceProvider = {
  name: "local",
  async getProducts(): Promise<Product[]> {
    return products;
  },
  async getProductBySlug(slug: string): Promise<Product | null> {
    return getProductBySlug(slug) ?? null;
  },
  async getProductsByCategory(category: string): Promise<Product[]> {
    return getProductsByCategory(category);
  },
};
