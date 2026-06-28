import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "המועדפים שלי",
  description: "הדגמים ששמרת אצל רוממה — כל מה שאהבת במקום אחד.",
};

export default function WishlistPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-10 text-center">
        <p className="label-overline mb-3">השמורים שלי</p>
        <h1 className="font-serif text-4xl font-bold  sm:text-5xl">
          רשימת המועדפים
        </h1>
        <div className="divider-gold mt-5" />
      </header>
      <WishlistView />
    </div>
  );
}
