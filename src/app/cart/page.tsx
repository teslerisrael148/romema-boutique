import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "סל הקניות",
  description: "צפייה ועריכה של סל הקניות שלך ברוממה.",
};

export default function CartPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold ">
          סל הקניות
        </h1>
      </header>
      <CartView />
    </div>
  );
}
