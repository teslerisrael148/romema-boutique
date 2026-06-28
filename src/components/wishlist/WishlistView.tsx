"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export function WishlistView() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-warmgray-200 py-24 text-center">
        <Heart size={56} className="text-warmgray-300" />
        <p className="mt-5 font-serif text-2xl text-warmgray-700">
          רשימת המועדפים ריקה
        </p>
        <p className="mt-2 text-warmgray-500">
          שמרי כאן את הדגמים שאהבת כדי לחזור אליהם בקלות
        </p>
        <Link href="/shop" className="btn-gold mt-7">
          לגלות מוצרים
        </Link>
      </div>
    );
  }

  return <ProductGrid products={items} />;
}
