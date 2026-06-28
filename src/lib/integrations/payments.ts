import type {
  CheckoutLineInput,
  PaymentProvider,
  PaymentResult,
} from "./types";

// ───────────────────────────────────────────────────────────
// שלדים לספקי סליקה. כל ספק מממש createCheckout ומחזיר
// כתובת הפניה לעמוד התשלום המאובטח של הספק.
// מלאו את משתני הסביבה הרלוונטיים ב-.env.local.
// ───────────────────────────────────────────────────────────

export const stripeProvider: PaymentProvider = {
  name: "stripe",
  async createCheckout(): Promise<PaymentResult> {
    // import Stripe from "stripe";
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({ ... });
    // return { ok: true, redirectUrl: session.url! };
    return { ok: false, error: "Stripe טרם הופעל — ראו README" };
  },
};

export const cardcomProvider: PaymentProvider = {
  name: "cardcom",
  async createCheckout(): Promise<PaymentResult> {
    // POST ל-https://secure.cardcom.solutions/api/v11/LowProfile/Create
    return { ok: false, error: "CardCom טרם הופעל — ראו README" };
  },
};

export const tranzilaProvider: PaymentProvider = {
  name: "tranzila",
  async createCheckout(): Promise<PaymentResult> {
    // POST ל-https://direct.tranzila.com/<supplier>/iframenew.php
    return { ok: false, error: "Tranzila טרם הופעל — ראו README" };
  },
};

// ספק הסליקה הפעיל (UI בלבד כרגע).
export const payments: PaymentProvider = stripeProvider;

export type { CheckoutLineInput };
