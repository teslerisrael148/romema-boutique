// ───────────────────────────────────────────────────────────
// טיפוסים מרכזיים — מבנה הנתונים תוכנן כך שיתחבר בקלות
// בעתיד ל-Shopify / WooCommerce / Supabase.
// ───────────────────────────────────────────────────────────

export type CategorySlug = "long" | "meruba" | "buboim";

export interface Category {
  slug: CategorySlug;
  /** שם לתצוגה */
  name: string;
  /** תיאור קצר לעמוד הקטגוריה */
  description: string;
  /** טקסט נלווה לכרטיס בעמוד הבית */
  tagline: string;
  /** טלפון ייעודי לקטגוריה (אופציונלי) */
  phone?: string;
  phoneHref?: string;
  /** מספר וואטסאפ בפורמט בינלאומי ללא + (אופציונלי) */
  whatsapp?: string;
}

export interface ProductVariant {
  id: string;
  /** למשל: "פודרה", "שמנת", "זהב עתיק" */
  name: string;
  /** קוד צבע HEX להצגת דגימה */
  swatch: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string; // ISO
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** מחיר נוכחי בש"ח */
  price: number;
  /** מחיר לפני מבצע (אופציונלי) */
  compareAtPrice?: number;
  category: CategorySlug;
  tags: string[];
  variants: ProductVariant[];
  /** מספר התמונות בגלריה (placeholder גנרטיבי) */
  imageCount: number;
  rating: number;
  reviewsCount: number;
  reviews: ProductReview[];
  /** מלאי כולל לצורך תצוגת "אזל" */
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  /** חומר / הרכב */
  material: string;
  /** מידות / אורך */
  dimensions: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  /** אחוז הנחה (0-100) */
  percentOff: number;
  description: string;
}

export type ShippingMethodId = "courier" | "registered" | "pickup";

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  description: string;
  price: number;
  estimate: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}
