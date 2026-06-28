import type { Product } from "@/lib/types";
import type { CommerceProvider } from "./types";

// ───────────────────────────────────────────────────────────
// Shopify Storefront API — שלד מוכן לחיבור.
// מלאו את משתני הסביבה SHOPIFY_STORE_DOMAIN ו-SHOPIFY_STOREFRONT_ACCESS_TOKEN
// והשלימו את ה-mapping מתשובת ה-GraphQL לטיפוס Product.
// ───────────────────────────────────────────────────────────

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  if (!domain || !token) {
    throw new Error("Shopify env vars are missing");
  }
  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  const json = (await res.json()) as { data: T };
  return json.data;
}

export const shopifyProvider: CommerceProvider = {
  name: "shopify",
  async getProducts(): Promise<Product[]> {
    // const data = await shopifyFetch<...>(PRODUCTS_QUERY);
    // return data.products.edges.map(mapShopifyProduct);
    void shopifyFetch;
    throw new Error("מימוש Shopify טרם הופעל — ראו README");
  },
  async getProductBySlug(): Promise<Product | null> {
    throw new Error("מימוש Shopify טרם הופעל — ראו README");
  },
  async getProductsByCategory(): Promise<Product[]> {
    throw new Error("מימוש Shopify טרם הופעל — ראו README");
  },
};
