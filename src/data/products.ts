import type { Product, ProductReview, ProductVariant } from "@/lib/types";

// ───────────────────────────────────────────────────────────
// 20 מוצרי דוגמה ריאליסטיים. המבנה זהה למה שיגיע בעתיד
// מ-Shopify / WooCommerce, כך שהמעבר לחנות אמיתית יהיה החלפת מקור בלבד.
// ───────────────────────────────────────────────────────────

const swatches = {
  ivory: "#f3ead9",
  blush: "#eeb6b3",
  champagne: "#d2a865",
  rose: "#d6726c",
  taupe: "#bbb2a7",
  mocha: "#8a6f5e",
  wine: "#7a2f3a",
  sky: "#aebfc9",
  olive: "#9aa17a",
  midnight: "#2f3340",
  pearl: "#e9e4db",
  gold: "#c7924a",
};

function v(id: string, name: string, swatch: string, inStock = true): ProductVariant {
  return { id, name, swatch, inStock };
}

let reviewSeed = 0;
function review(
  author: string,
  rating: number,
  title: string,
  body: string,
  daysAgo: number,
): ProductReview {
  reviewSeed += 1;
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return { id: `r${reviewSeed}`, author, rating, title, body, date };
}

export const products: Product[] = [
  // ───────────── מטפחות יומיומיות ─────────────
  {
    id: "p01",
    slug: "metpachat-yom-classic-viscose",
    name: "מטפחת יום קלאסית — ויסקוזה",
    shortDescription: "בד ויסקוזה נושם וקליל למראה יומיומי מושלם",
    description:
      "מטפחת היום שתרצי ללבוש כל בוקר מחדש. ויסקוזה איכותית בעלת נפילה רכה שמעניקה כיסוי מלא ותחושה אווררית גם בימים החמים. הגימור הנקי והגוונים העדינים הופכים אותה לבחירה בטוחה לכל מראה.",
    price: 119,
    compareAtPrice: 149,
    category: "long",
    tags: ["נושם", "קליל", "רב-תכליתי", "פולש מלא"],
    variants: [
      v("p01-ivory", "שנהב", swatches.ivory),
      v("p01-blush", "פודרה", swatches.blush),
      v("p01-taupe", "טאופ", swatches.taupe),
      v("p01-midnight", "כחול לילה", swatches.midnight),
    ],
    imageCount: 4,
    rating: 4.8,
    reviewsCount: 2,
    reviews: [
      review("מרים ל.", 5, "הנושמת ביותר שיש לי", "ללבוש כל יום, לא מרגישים אותה בכלל. הצבע פודרה מהמם.", 12),
      review("דנה ק.", 4, "איכותית מאוד", "נשמרת יפה אחרי כביסה. הייתי שמחה לעוד גוון אפור.", 30),
    ],
    inStock: true,
    isBestSeller: true,
    material: "100% ויסקוזה",
    dimensions: "70×180 ס\"מ",
  },
  {
    id: "p02",
    slug: "metpachat-yom-cotton-soft",
    name: "מטפחת כותנה רכה ליום",
    shortDescription: "כותנה טבעית 100% בתחושה ביתית ונעימה",
    description:
      "כותנה רכה במיוחד שמתאימה לעור הרגיש ולשגרת היום העמוסה. אינה מחליקה, נותנת אחיזה יציבה לאורך כל היום, ומגיעה בגוונים נייטרליים שמשתלבים עם כל לבוש.",
    price: 99,
    category: "long",
    tags: ["כותנה", "אחיזה יציבה", "היפואלרגני"],
    variants: [
      v("p02-pearl", "פנינה", swatches.pearl),
      v("p02-blush", "ורד עתיק", swatches.blush),
      v("p02-olive", "זית", swatches.olive),
    ],
    imageCount: 4,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      review("אסתי ב.", 5, "נוחות אמיתית", "סוף סוף מטפחת שלא מחליקה לי במשך היום. ממליצה!", 8),
    ],
    inStock: true,
    isBestSeller: true,
    material: "100% כותנה",
    dimensions: "65×170 ס\"מ",
  },
  {
    id: "p03",
    slug: "metpachat-yom-pre-tied",
    name: "מטפחת קשירה מהירה ליום",
    shortDescription: "תפורה מראש — מוכנה ללבישה בשניות",
    description:
      "לכל אישה עסוקה: מטפחת בקשירה מוכנה שנראית כאילו הושקעו בה דקות ארוכות, אך נלבשת בשנייה. נוחה, יציבה ומחמיאה — בדיוק מה שצריך לבקרים לחוצים.",
    price: 139,
    category: "long",
    tags: ["קשירה מוכנה", "חיסכון בזמן", "מחמיא"],
    variants: [
      v("p03-ivory", "שמנת", swatches.ivory),
      v("p03-rose", "רוז", swatches.rose),
      v("p03-taupe", "חמרה", swatches.taupe),
    ],
    imageCount: 3,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      review("שירה מ.", 5, "מושלם לבקרים", "תוך שנייה על הראש ונראה מסודר כל היום. קונה עוד אחת.", 5),
    ],
    inStock: true,
    isFeatured: true,
    material: "ויסקוזה / ספנדקס",
    dimensions: "היקף 54–60 ס\"מ",
  },
  {
    id: "p04",
    slug: "metpachat-yom-striped",
    name: "מטפחת יום בהדפס פסים עדין",
    shortDescription: "הדפס פסים דק שמוסיף חן בלי להעמיס",
    description:
      "פסים דקים ועדינים שמעניקים נופך אופנתי למראה היומיומי. בד קליל בנפילה יפה, מתאים לעבודה, ליציאה ולכל מקום שביניהם.",
    price: 109,
    category: "long",
    tags: ["הדפס", "אופנתי", "קליל"],
    variants: [
      v("p04-blush", "פסי פודרה", swatches.blush),
      v("p04-sky", "פסי תכלת", swatches.sky),
      v("p04-mocha", "פסי מוקה", swatches.mocha),
    ],
    imageCount: 3,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      review("רבקה כ.", 5, "חמוד ומיוחד", "הפסים העדינים עושים את כל ההבדל. קיבלתי מחמאות בעבודה.", 18),
    ],
    inStock: true,
    material: "ויסקוזה",
    dimensions: "70×175 ס\"מ",
  },

  // ───────────── מטפחות לשבת ─────────────
  {
    id: "p05",
    slug: "metpachat-shabbat-satin-royal",
    name: "מטפחת שבת סאטן רויאל",
    shortDescription: "סאטן מבריק עם נפילה מלכותית לכבוד שבת",
    description:
      "מטפחת שנשמרת לרגעים המיוחדים. סאטן יוקרתי עם ברק עדין ונפילה עשירה, שמעניק נוכחות מכובדת סביב שולחן השבת. גימור תפירה מוקפד בכל פרט.",
    price: 219,
    compareAtPrice: 269,
    category: "long",
    tags: ["סאטן", "מהודר", "ברק עדין", "שבת"],
    variants: [
      v("p05-champagne", "שמפניה", swatches.champagne),
      v("p05-wine", "יין", swatches.wine),
      v("p05-midnight", "כחול לילה", swatches.midnight),
      v("p05-pearl", "פנינה", swatches.pearl),
    ],
    imageCount: 5,
    rating: 4.9,
    reviewsCount: 2,
    reviews: [
      review("חני ש.", 5, "פאר אמיתי", "לובשת רק בשבת ומרגישה מלכה. הברק עדין ומכובד.", 9),
      review("תהילה ד.", 5, "נראית יקרה מאוד", "האיכות מורגשת ברגע שמחזיקים. שווה כל שקל.", 22),
    ],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    material: "סאטן פוליאסטר פרימיום",
    dimensions: "75×185 ס\"מ",
  },
  {
    id: "p06",
    slug: "metpachat-shabbat-lace-detail",
    name: "מטפחת שבת עם פרט תחרה",
    shortDescription: "שילוב תחרה עדין למראה רומנטי ומכובד",
    description:
      "פרט תחרה מעודן בשולי המטפחת מוסיף נגיעה רומנטית וקלאסית. הבד הרך מתהדר בגוונים חמים, והתוצאה היא מטפחת שבת אלגנטית שמתאימה גם לאירוע.",
    price: 239,
    category: "long",
    tags: ["תחרה", "רומנטי", "אלגנטי"],
    variants: [
      v("p06-ivory", "שנהב", swatches.ivory),
      v("p06-blush", "ורד אבק", swatches.blush),
      v("p06-champagne", "שמפניה", swatches.champagne),
    ],
    imageCount: 4,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      review("מירי ע.", 5, "עדין ומדויק", "התחרה מוסיפה בדיוק את הנגיעה הנכונה. מהמם.", 14),
    ],
    inStock: true,
    isFeatured: true,
    material: "ויסקוזה עם שזירת תחרה",
    dimensions: "72×180 ס\"מ",
  },
  {
    id: "p07",
    slug: "metpachat-shabbat-silk-touch",
    name: "מטפחת שבת מגע משי",
    shortDescription: "תחושת משי טהורה ונפילה אווררית",
    description:
      "תערובת מגע-משי שמעניקה תחושה חלקה ונעימה במיוחד, עם נפילה קלילה שמחמיאה לכל תווי פנים. בחירה מצוינת לאישה שאוהבת מראה עדין ומוקפד.",
    price: 249,
    category: "long",
    tags: ["מגע משי", "יוקרתי", "קליל"],
    variants: [
      v("p07-pearl", "פנינה", swatches.pearl),
      v("p07-rose", "רוז עתיק", swatches.rose),
      v("p07-sky", "תכלת ענן", swatches.sky),
    ],
    imageCount: 4,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      review("נעמה ל.", 5, "כמו משי אמיתי", "התחושה על הראש מפנקת. נשמרת מצוין.", 6),
    ],
    inStock: true,
    material: "תערובת מגע-משי",
    dimensions: "70×180 ס\"מ",
  },
  {
    id: "p08",
    slug: "metpachat-shabbat-pleated",
    name: "מטפחת שבת בקיפול פליסה",
    shortDescription: "קפלי פליסה עדינים לנפח ותנועה",
    description:
      "קפלי פליסה דקיקים יוצרים נפח עדין ותחושת תנועה מלכותית. מטפחת שמושכת מבטים בעדינות ומשלימה כל מראה שבת חגיגי.",
    price: 229,
    category: "long",
    tags: ["פליסה", "נפח", "מיוחד"],
    variants: [
      v("p08-champagne", "שמפניה", swatches.champagne),
      v("p08-taupe", "טאופ", swatches.taupe),
      v("p08-wine", "בורדו", swatches.wine),
    ],
    imageCount: 4,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      review("שרה ג.", 5, "נפח מושלם", "נותן גובה יפה לראש בלי להכביד. אוהבת!", 20),
    ],
    inStock: true,
    material: "פוליאסטר פליסה",
    dimensions: "68×175 ס\"מ",
  },

  // ───────────── מטפחות לחגים ─────────────
  {
    id: "p09",
    slug: "metpachat-chag-velvet-warm",
    name: "מטפחת חג קטיפה חמה",
    shortDescription: "קטיפה רכה בגוונים עשירים לעונת החגים",
    description:
      "מגע קטיפה עשיר וחמים שנברא לימי החג הקרירים. הצבעים העמוקים והטקסטורה המפנקת יוצרים מראה חגיגי ומכובד שנשאר בזיכרון.",
    price: 199,
    compareAtPrice: 239,
    category: "long",
    tags: ["קטיפה", "חורפי", "חגיגי"],
    variants: [
      v("p09-wine", "בורדו", swatches.wine),
      v("p09-midnight", "כחול עמוק", swatches.midnight),
      v("p09-mocha", "מוקה", swatches.mocha),
    ],
    imageCount: 4,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      review("יעל ר.", 5, "מושלם לחגים", "הקטיפה חמה ונעימה והצבע בורדו עשיר. אהבתי מאוד.", 11),
    ],
    inStock: true,
    isBestSeller: true,
    material: "קטיפת כותנה",
    dimensions: "70×175 ס\"מ",
  },
  {
    id: "p10",
    slug: "metpachat-chag-gold-shimmer",
    name: "מטפחת חג נצנוץ זהב",
    shortDescription: "חוטי זהב עדינים שמוסיפים ברק חגיגי",
    description:
      "חוטי לורקס זהובים שזורים בעדינות בבד ומעניקים נצנוץ מעודן בדיוק במידה. מטפחת חג שמרגישה מיוחדת בלי לצעוק, ומחמיאה לכל גוון עור.",
    price: 209,
    category: "long",
    tags: ["נצנוץ", "זהב", "חגיגי"],
    variants: [
      v("p10-champagne", "שמפניה זהב", swatches.champagne),
      v("p10-ivory", "שנהב זהב", swatches.ivory),
      v("p10-rose", "רוז גולד", swatches.rose),
    ],
    imageCount: 4,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      review("אורית פ.", 5, "ברק מדויק", "הנצנוץ עדין ולא מוגזם, בדיוק מה שחיפשתי לחג.", 16),
    ],
    inStock: true,
    isNew: true,
    material: "ויסקוזה עם חוטי לורקס",
    dimensions: "70×180 ס\"מ",
  },
  {
    id: "p11",
    slug: "metpachat-chag-floral-print",
    name: "מטפחת חג בהדפס פרחוני",
    shortDescription: "הדפס פרחים עשיר שמביא את אווירת החג",
    description:
      "הדפס פרחוני מצויר ביד שמביא חיוניות וצבע לכל מראה חג. בד נעים בנפילה רכה, עם שילוב גוונים מתוחכם שקל להתאהב בו.",
    price: 189,
    category: "long",
    tags: ["פרחוני", "צבעוני", "מצויר ביד"],
    variants: [
      v("p11-blush", "פריחת אביב", swatches.blush),
      v("p11-olive", "גן ירוק", swatches.olive),
      v("p11-wine", "פרחי יין", swatches.wine),
    ],
    imageCount: 4,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      review("ליאת ש.", 5, "צבעוני ומשמח", "ההדפס מהמם והאיכות מעולה. מתאים בול לחג.", 25),
    ],
    inStock: true,
    isNew: true,
    material: "ויסקוזה מודאל",
    dimensions: "72×178 ס\"מ",
  },

  // ───────────── מטפחות לאירועים ─────────────
  {
    id: "p12",
    slug: "metpachat-erua-crystal-luxe",
    name: "מטפחת אירוע קריסטל לוקס",
    shortDescription: "אבני קריסטל משובצות ביד למראה מנצנץ",
    description:
      "יצירת מופת לאירועים: אבני קריסטל משובצות בעבודת יד מדויקת על בד יוקרתי, ליצירת נוכחות זוהרת שלא ניתן להתעלם ממנה. הבחירה המושלמת לחתונה או לאירוע מיוחד.",
    price: 389,
    compareAtPrice: 449,
    category: "meruba",
    tags: ["קריסטל", "ערב", "עבודת יד", "יוקרה"],
    variants: [
      v("p12-pearl", "פנינה", swatches.pearl),
      v("p12-champagne", "שמפניה", swatches.champagne),
      v("p12-midnight", "כחול לילה", swatches.midnight),
    ],
    imageCount: 5,
    rating: 5,
    reviewsCount: 2,
    reviews: [
      review("חני ש.", 5, "כוכבת הערב", "לבשתי לחתונה וכולם שאלו מאיפה. פשוט מהמם.", 7),
      review("מיכל א.", 5, "יוקרה אמיתית", "השיבוץ מדויק ועדין. שווה כל שקל לאירוע.", 33),
    ],
    inStock: true,
    isFeatured: true,
    material: "סאטן עם שיבוץ קריסטל",
    dimensions: "75×185 ס\"מ",
  },
  {
    id: "p13",
    slug: "metpachat-erua-pearl-embroidery",
    name: "מטפחת אירוע רקמת פנינים",
    shortDescription: "רקמת פנינים עדינה לאלגנטיות שקטה",
    description:
      "פנינים זעירות רקומות ביד בקו עדין לאורך המטפחת, ליצירת מראה אלגנטי ומעודן. מתאימה לאישה שאוהבת יוקרה שקטה ומדויקת.",
    price: 359,
    category: "meruba",
    tags: ["פנינים", "רקמה", "אלגנטי"],
    variants: [
      v("p13-ivory", "שנהב", swatches.ivory),
      v("p13-blush", "פודרה", swatches.blush),
      v("p13-pearl", "פנינה", swatches.pearl),
    ],
    imageCount: 4,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      review("נטע ב.", 5, "עדינות מנצחת", "הפנינים עושות את ההבדל. אלגנטי בדיוק כמו שרציתי.", 13),
    ],
    inStock: true,
    isFeatured: true,
    material: "ויסקוזה עם רקמת פנינים",
    dimensions: "72×180 ס\"מ",
  },
  {
    id: "p14",
    slug: "metpachat-erua-metallic-drape",
    name: "מטפחת אירוע מטאלי דרייפ",
    shortDescription: "גימור מטאלי בנפילה דרמטית ומרשימה",
    description:
      "בד עם גימור מטאלי עשיר ונפילה דרמטית שנעה יפה בכל תנועה. מטפחת ערב שמשדרת ביטחון ונוכחות, לרגעים שבהם רוצים לבלוט.",
    price: 329,
    category: "meruba",
    tags: ["מטאלי", "ערב", "דרמטי"],
    variants: [
      v("p14-champagne", "שמפניה", swatches.champagne),
      v("p14-gold", "זהב עתיק", swatches.gold),
      v("p14-midnight", "כסף לילה", swatches.midnight),
    ],
    imageCount: 4,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      review("דפנה ק.", 5, "נוכחות מנצחת", "הנפילה מהממת והגימור יוקרתי. הרגשתי מושלמת.", 19),
    ],
    inStock: true,
    isNew: true,
    material: "פוליאסטר מטאלי",
    dimensions: "70×182 ס\"מ",
  },

  // ───────────── בובואים ─────────────
  {
    id: "p15",
    slug: "buboi-french-knot",
    name: "בובואי קשירה צרפתית",
    shortDescription: "סטייל בנדנה צרפתי לקשירה אופנתית",
    description:
      "הקסם של פריז בקשירה מהירה. בובואי בגזרה מודרנית שיוצר מראה אופנתי ומוקפד תוך שניות, מושלם ליום-יום ולחצי כיסוי.",
    price: 79,
    category: "buboim",
    tags: ["בנדנה", "צרפתי", "אופנתי", "חצי כיסוי"],
    variants: [
      v("p15-blush", "פודרה", swatches.blush),
      v("p15-mocha", "מוקה", swatches.mocha),
      v("p15-midnight", "שחור", swatches.midnight),
      v("p15-olive", "זית", swatches.olive),
    ],
    imageCount: 3,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      review("עדי מ.", 5, "אופנתי וקליל", "נראה מעולה עם ג'ינס. קשירה סופר מהירה.", 10),
    ],
    inStock: true,
    isBestSeller: true,
    material: "כותנה אלסטית",
    dimensions: "היקף 52–58 ס\"מ",
  },
  {
    id: "p16",
    slug: "buboi-twist-band",
    name: "בובואי טוויסט עם פיתול",
    shortDescription: "פיתול קדמי מעוצב לנפח ולחן",
    description:
      "פיתול קדמי מעוצב שמוסיף נפח וחן למראה. בובואי נוח עם אחיזה יציבה, שמתאים לאימון, ליום וליציאה קלילה.",
    price: 69,
    category: "buboim",
    tags: ["טוויסט", "נפח", "ספורטיבי"],
    variants: [
      v("p16-rose", "רוז", swatches.rose),
      v("p16-taupe", "טאופ", swatches.taupe),
      v("p16-sky", "תכלת", swatches.sky),
    ],
    imageCount: 3,
    rating: 4.6,
    reviewsCount: 1,
    reviews: [
      review("הדס ל.", 5, "נוח ויפה", "הפיתול נותן נפח מהמם. מתאים לכל יום.", 15),
    ],
    inStock: true,
    material: "ויסקוזה / ספנדקס",
    dimensions: "היקף 52–58 ס\"מ",
  },
  {
    id: "p17",
    slug: "buboi-wide-comfort",
    name: "בובואי רחב נוחות",
    shortDescription: "גזרה רחבה לכיסוי מלא ונוחות מרבית",
    description:
      "בובואי בגזרה רחבה שמעניק כיסוי גבוה ונוחות לאורך כל היום, בלי תחושת לחץ. בחירה אהובה לבית, למנוחה ולימים הרגועים.",
    price: 75,
    category: "buboim",
    tags: ["רחב", "כיסוי גבוה", "נוח"],
    variants: [
      v("p17-ivory", "שמנת", swatches.ivory),
      v("p17-blush", "ורד", swatches.blush),
      v("p17-mocha", "חום רך", swatches.mocha),
    ],
    imageCount: 3,
    rating: 4.7,
    reviewsCount: 1,
    reviews: [
      review("טל ש.", 5, "נוחות מנצחת", "הכי נוח שיש לבית. רחב ומכסה יפה.", 21),
    ],
    inStock: true,
    material: "כותנה במבוק",
    dimensions: "היקף 54–60 ס\"מ",
  },

  // ───────────── קולקציות חדשות ─────────────
  {
    id: "p18",
    slug: "new-aurora-signature",
    name: "מטפחת אורורה — קולקציית חתימה",
    shortDescription: "הדגם החדש שמגדיר מחדש יוקרה",
    description:
      "פתיחת קולקציית החתימה החדשה של רוממה. שילוב ייחודי של בד נדיר, גימור מושלם וגוונים שתוכננו בקפידה. דגם מהדורה מוגבלת שלא יישאר זמין לאורך זמן.",
    price: 279,
    category: "long",
    tags: ["חדש", "מהדורה מוגבלת", "חתימה", "יוקרה"],
    variants: [
      v("p18-champagne", "שמפניה", swatches.champagne),
      v("p18-blush", "ורד אבק", swatches.blush),
      v("p18-pearl", "פנינה", swatches.pearl),
    ],
    imageCount: 5,
    rating: 5,
    reviewsCount: 1,
    reviews: [
      review("רוני א.", 5, "פשוט מושלם", "הדגם החדש מרגיש יוקרתי ברמה אחרת. שמחה שתפסתי.", 4),
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    material: "תערובת מגע-משי פרימיום",
    dimensions: "73×185 ס\"מ",
  },
  {
    id: "p19",
    slug: "new-luna-modern",
    name: "מטפחת לונה — מראה מודרני",
    shortDescription: "קווים נקיים וגוונים עכשוויים",
    description:
      "מטפחת בעיצוב מודרני עם קווים נקיים וגוונים עכשוויים, לאישה שאוהבת מינימליזם מעודן. קלילה, נוחה ומחמיאה — חלק מהקולקציה החדשה.",
    price: 159,
    category: "long",
    tags: ["חדש", "מודרני", "מינימליסטי"],
    variants: [
      v("p19-taupe", "טאופ", swatches.taupe),
      v("p19-sky", "תכלת ענן", swatches.sky),
      v("p19-ivory", "שנהב", swatches.ivory),
    ],
    imageCount: 4,
    rating: 4.8,
    reviewsCount: 1,
    reviews: [
      review("שני ב.", 5, "נקי ומדויק", "בדיוק הסטייל שלי. קליל ומחמיא.", 6),
    ],
    inStock: true,
    isNew: true,
    material: "ויסקוזה מודאל",
    dimensions: "70×178 ס\"מ",
  },
  {
    id: "p20",
    slug: "new-stella-evening",
    name: "מטפחת סטלה — ערב חדשה",
    shortDescription: "ברק עדין וגזרה חגיגית בקו החדש",
    description:
      "מטפחת ערב חדשה עם ברק עדין וגזרה חגיגית, המשלבת בין יוקרה לנוחות. סוגרת את הקולקציה החדשה בנימה זוהרת ומכובדת.",
    price: 299,
    compareAtPrice: 339,
    category: "long",
    tags: ["חדש", "ערב", "ברק עדין"],
    variants: [
      v("p20-champagne", "שמפניה", swatches.champagne),
      v("p20-wine", "יין", swatches.wine),
      v("p20-midnight", "כחול לילה", swatches.midnight),
    ],
    imageCount: 4,
    rating: 4.9,
    reviewsCount: 1,
    reviews: [
      review("גילי ת.", 5, "זוהרת ומכובדת", "מושלמת לאירוע ערב. הברק בדיוק במידה.", 9),
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: "סאטן פרימיום",
    dimensions: "73×183 ס\"מ",
  },
];

// ───────────── פונקציות עזר לשליפת מוצרים ─────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBestSellers(limit = 8): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getFeatured(limit = 6): Product[] {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
