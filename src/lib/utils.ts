import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** שילוב מחלקות Tailwind בצורה בטוחה */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** עיצוב מחיר בש"ח */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);
}

/** עיצוב תאריך עברי קצר */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** יצירת פלטת גרדיאנט יוקרתית דטרמיניסטית עבור תמונות placeholder */
const palettes: [string, string, string][] = [
  ["#fbeceb", "#f6d6d4", "#d2a865"],
  ["#f6efdf", "#ecdcbc", "#e4928d"],
  ["#fdf6f5", "#eeb6b3", "#c7924a"],
  ["#f7f1e8", "#dfc28e", "#d6726c"],
  ["#fbf8f1", "#f6d6d4", "#b67a3e"],
  ["#eceae6", "#f6efdf", "#e4928d"],
];

export function gradientFor(seed: string, offset = 0): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const idx = (Math.abs(hash) + offset) % palettes.length;
  const [a, b, c] = palettes[idx];
  const angle = 120 + ((Math.abs(hash) + offset * 37) % 90);
  return `linear-gradient(${angle}deg, ${a} 0%, ${b} 55%, ${c} 100%)`;
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
