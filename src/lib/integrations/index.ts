import type { CommerceProvider } from "./types";
import { localProvider } from "./local";

// ───────────────────────────────────────────────────────────
// בחירת ספק המסחר הפעיל. בעת מעבר לחנות אמיתית — החליפו כאן
// את הספק (למשל shopifyProvider) או הזרימו לפי משתנה סביבה.
// ───────────────────────────────────────────────────────────

export const commerce: CommerceProvider = localProvider;

export type { CommerceProvider, PaymentProvider } from "./types";
