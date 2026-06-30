import type { Coupon, ShippingMethod } from "./types";

// ───────────────────────────────────────────────────────────
// קונפיגורציה מרכזית של המותג — נקודת אמת אחת לכל הפרטים העסקיים.
// ניתן להזין דרך משתני סביבה בעת מעבר לסביבת ייצור.
// ───────────────────────────────────────────────────────────

export const siteConfig = {
  name: "רוממה",
  nameEn: "Romema",
  tagline: "מטפחות וכיסויי ראש בעבודת יד",
  description:
    "רוממה — בוטיק יוקרה למטפחות וכיסויי ראש. בדים נדירים, גימור עדין ועיצוב שנולד מתוך כבוד ואהבה.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.romema.co.il",
  locale: "he_IL",

  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "053-345-4205",
    phoneHref: "tel:+972533454205",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "romyelisha132@gmail.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "972533454205",
    hours: [{ day: "זמינות", time: "זמינות מלאה למעט שבתות וחגים" }],
  },

  social: {
    instagram: `https://instagram.com/${
      process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "romema.boutique"
    }`,
    instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "romema.boutique",
    facebook: "https://facebook.com/romema.boutique",
    tiktok: "https://tiktok.com/@romema.boutique",
  },

  shipping: {
    freeShippingThreshold: 299,
  },
} as const;

export function whatsappLink(message?: string, phone?: string): string {
  const base = `https://wa.me/${phone ?? siteConfig.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const shippingMethods: ShippingMethod[] = [
  {
    id: "courier",
    name: "שליח עד הבית",
    description: "משלוח מהיר עד דלת ביתך בכל הארץ",
    price: 39,
    estimate: "1–3 ימי עסקים",
  },
  {
    id: "registered",
    name: "דואר רשום",
    description: "משלוח חסכוני באמצעות דואר ישראל",
    price: 19,
    estimate: "3–6 ימי עסקים",
  },
  {
    id: "pickup",
    name: "איסוף עצמי מהבוטיק",
    description: "איסוף ללא עלות מהבוטיק בתיאום מראש",
    price: 0,
    estimate: "מוכן תוך 24 שעות",
  },
];

// קודי קופון לדוגמה (בייצור יגיעו ממערכת הסליקה / החנות)
export const coupons: Coupon[] = [
  { code: "ROMEMA10", percentOff: 10, description: "10% הנחה לחברות המועדון" },
  { code: "WELCOME15", percentOff: 15, description: "15% הנחה להזמנה ראשונה" },
  { code: "SHABBAT", percentOff: 12, description: "12% הנחה על קולקציית שבת" },
];
