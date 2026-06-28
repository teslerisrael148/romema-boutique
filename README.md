# רוממה · Romema Boutique

אתר סחר אלקטרוני יוקרתי בעברית (RTL מלא) למותג מטפחות וכיסויי ראש לאישה היהודייה.
נבנה כארכיטקטורה אמיתית וניתנת להרחבה — מוכן להפוך לאתר חי על ידי החלפת תוכן ה-placeholder
בתוכן אמיתי וחיבור לספקי מסחר וסליקה.

> A premium, production-ready Hebrew RTL e-commerce site built with Next.js 15, TypeScript,
> Tailwind CSS and Framer Motion.

---

## ✨ תכונות עיקריות

- **7 עמודים מלאים**: בית, חנות, מוצר, אודות, גלריה, צור קשר, שאלות נפוצות.
- **עמודי מסחר נוספים**: סל קניות, רשימת מועדפים, ותהליך תשלום (Checkout) מלא.
- **20 מוצרי דוגמה** עם תיאורים בעברית, תמחור ריאלי, וריאציות צבע, תגיות וביקורות.
- **6 קטגוריות מוצרים** עם סינון, חיפוש ומיון.
- **סל קניות + מועדפים** עם שמירה ב-`localStorage` (Context API).
- **קופונים, אפשרויות משלוח, איסוף עצמי וסיכום הזמנה**.
- **כפתור וואטסאפ צף**, אינטגרציית אינסטגרם, ביקורות לקוחות והרשמה לניוזלטר.
- **אנימציות יוקרתיות** עם Framer Motion (גלילה, hover, מעברים).
- **SEO**: Metadata דינמי, `sitemap.xml`, `robots.txt`, Open Graph.
- **RTL מלא** עם גופנים עבריים (Heebo + Frank Ruhl Libre).

## 🛠️ סטאק טכנולוגי

| תחום | טכנולוגיה |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| שפה | TypeScript |
| עיצוב | Tailwind CSS 3 |
| אנימציות | Framer Motion |
| אייקונים | lucide-react |

## 🚀 התקנה והרצה

```bash
npm install
npm run dev      # סביבת פיתוח ב-http://localhost:3000
npm run build    # בניית גרסת ייצור
npm run start    # הרצת גרסת הייצור
npm run lint     # בדיקת קוד
```

> **דרישה:** Node.js 18.18+ (נבדק על Node 20).

## 📁 מבנה הפרויקט

```
src/
├── app/                      # עמודים (App Router)
│   ├── layout.tsx            # פריסת בסיס, RTL, גופנים, SEO
│   ├── page.tsx              # עמוד הבית
│   ├── shop/                 # חנות (סינון/חיפוש/מיון)
│   ├── product/[slug]/       # עמוד מוצר דינמי (SSG)
│   ├── about, gallery,       # עמודי תוכן
│   │   contact, faq/
│   ├── cart, wishlist,       # עמודי מסחר
│   │   checkout/
│   ├── sitemap.ts, robots.ts # SEO
│   └── globals.css
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # סקשנים של עמוד הבית (Hero, BrandStory...)
│   ├── product/              # ProductCard, ProductGallery, BuyBox, Reviews
│   ├── cart/                 # CartDrawer, CartView, OrderSummary
│   ├── ui/                   # רכיבי בסיס (ProductImage, Reveal, StarRating)
│   └── ...                   # CategoryCard, TestimonialCard, InstagramFeed
├── context/                  # CartContext, WishlistContext
├── data/                     # products, categories, testimonials, faq
└── lib/
    ├── types.ts              # טיפוסים מרכזיים
    ├── config.ts             # קונפיגורציית מותג, משלוחים, קופונים
    ├── utils.ts              # פונקציות עזר
    └── integrations/         # שלדים ל-Shopify/Woo/Supabase/Stripe/CardCom/Tranzila
```

## 🎨 פלטת הצבעים

מוגדרת ב-`tailwind.config.ts`:

- **Blush** — ורוד עדין (פודרה)
- **Champagne** — זהב שמפניה
- **Ivory / Cream** — שנהב ולבן חם
- **Warm Gray** — אפור חם לטקסט ולמבנה

## 🔌 חיבור לסביבת ייצור

הפרויקט תוכנן עם שכבת הפשטה (`src/lib/integrations`) כדי שהמעבר לחנות אמיתית
יהיה פשוט. העתיקו את `.env.example` ל-`.env.local` ומלאו ערכים.

### החלפת מקור המוצרים

ברירת המחדל היא `localProvider` (נתונים סטטיים מ-`src/data/products.ts`).
כדי לעבור ל-Shopify / WooCommerce / Supabase:

1. מלאו את משתני הסביבה הרלוונטיים.
2. השלימו את המימוש בקובץ הספק (למשל `src/lib/integrations/shopify.ts`).
3. החליפו את הייצוא ב-`src/lib/integrations/index.ts`:
   ```ts
   export const commerce = shopifyProvider; // במקום localProvider
   ```

### סליקת תשלומים

ממשק התשלום בעמוד ה-Checkout מוכן ל-UI. החיבור הסופי מתבצע דרך
`src/lib/integrations/payments.ts` (Stripe / CardCom / Tranzila) — יש להשלים את
`createCheckout` ולחבר ל-API route מאובטח בצד השרת.

### נקודות חיבור נוספות (מסומנות ב-`TODO` בקוד)

- **ניוזלטר** — `src/components/Newsletter.tsx`
- **טופס צור קשר** — `src/components/contact/ContactForm.tsx`
- **אינסטגרם** — `src/components/InstagramFeed.tsx`
- **תמונות** — להחליף את `ProductImage` (placeholder גנרטיבי) ב-`next/image` עם תמונות אמיתיות.

## 🖼️ תמונות

כרגע התמונות הן placeholder גנרטיבי יוקרתי (גרדיאנטים דטרמיניסטיים) כדי שהאתר
יעבוד במלואו ללא תלות בקבצים חיצוניים. בעת העלייה לאוויר, החליפו את הרכיב
`src/components/ui/ProductImage.tsx` בקריאות ל-`next/image` עם צילומי האופנה האמיתיים.

## 📝 הערה לגבי אבטחה

הפרויקט מקובץ ל-Next.js 15.5.4 (הגרסה היציבה האחרונה ב-15.x) לפי דרישת הסטאק.
חלק מההתראות האבטחתיות של Next רלוונטיות בעיקר ל-Middleware / Edge ואינן חלות על
אתר תוכן/קטלוג כמו זה. לקראת ייצור מומלץ לשקול שדרוג לגרסה היציבה האחרונה.

---

© רוממה. נבנה באהבה 💕
