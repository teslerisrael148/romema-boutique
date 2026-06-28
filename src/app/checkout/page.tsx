import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "תשלום",
  description: "השלמת ההזמנה ותשלום מאובטח ברוממה.",
};

export default function CheckoutPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold ">
          השלמת הזמנה
        </h1>
        <p className="mt-2 text-warmgray-600">
          עוד כמה פרטים ואנחנו על הדרך אלייך ✨
        </p>
      </header>
      <CheckoutView />
    </div>
  );
}
