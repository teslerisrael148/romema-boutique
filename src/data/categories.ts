import type { Category, CategorySlug } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "long",
    name: "לונג",
    tagline: "גזרה אלגנטית וארוכה",
    description: "כיסויי ראש בגזרת לונג — אלגנטיות ונוחות לכל יום.",
  },
  {
    slug: "meruba",
    name: "מרובע",
    tagline: "קלאסיקה מודרנית",
    description: "כיסויי ראש בגזרה מרובעת — סגנון נקי ומדויק.",
  },
  {
    slug: "buboim",
    name: "בובואים",
    tagline: "סטייל קליל ונוח",
    description: "בובואים וכיסויי ראש בגזרה מודרנית — קשירה מהירה, נוחות ואופנה לכל יום.",
    phone: "053-345-4205",
    phoneHref: "tel:+972533454205",
    whatsapp: "972533454205",
  },
];

export const categoryMap: Record<CategorySlug, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

export function getCategory(slug: CategorySlug): Category {
  return categoryMap[slug];
}

/** קטגוריות לתצוגה בעמוד הבית */
export const featuredCategories: Category[] = [
  {
    slug: "long",
    name: "לונגים",
    tagline: "גזרה אלגנטית וארוכה",
    description: "כיסויי ראש בגזרת לונג — אלגנטיות ונוחות לכל יום.",
  },
  {
    slug: "meruba",
    name: "מרובע",
    tagline: "קלאסיקה מודרנית",
    description: "כיסויי ראש בגזרה מרובעת — סגנון נקי ומדויק.",
  },
  {
    slug: "buboim",
    name: "בובואים",
    tagline: "סטייל קליל ונוח",
    description: "בובואים וכיסויי ראש בגזרה מודרנית — קשירה מהירה, נוחות ואופנה לכל יום.",
    phone: "053-345-4205",
    phoneHref: "tel:+972533454205",
    whatsapp: "972533454205",
  },
];
