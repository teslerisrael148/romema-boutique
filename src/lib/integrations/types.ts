import type { Product } from "@/lib/types";

// ───────────────────────────────────────────────────────────
// שכבת הפשטה לספקי מסחר. כל ספק (Shopify / WooCommerce / Supabase)
// מממש את הממשק הזה, כך שהקוד באפליקציה לא משתנה בעת החלפת ספק.
// ───────────────────────────────────────────────────────────

export interface CommerceProvider {
  name: string;
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
}

export interface CheckoutLineInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface PaymentResult {
  ok: boolean;
  orderId?: string;
  redirectUrl?: string;
  error?: string;
}

export interface PaymentProvider {
  name: string;
  createCheckout(
    lines: CheckoutLineInput[],
    metadata?: Record<string, string>,
  ): Promise<PaymentResult>;
}
