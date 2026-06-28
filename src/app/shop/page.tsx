import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "החנות",
  description:
    "כל קולקציות המטפחות וכיסויי הראש של רוממה — מטפחות יומיומיות, לשבת, לחגים, לאירועים ובובואים.",
};

export default function ShopPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-10 text-center">
        <p className="label-overline mb-3">קולקציית רוממה</p>
        <h1 className="font-serif text-4xl font-bold  sm:text-5xl">
          כל המוצרים
        </h1>
        <div className="divider-gold mt-5" />
        <p className="mx-auto mt-5 max-w-xl text-warmgray-600">
          מבחר עשיר של מטפחות וכיסויי ראש בעבודת יד. סנני לפי קטגוריה, חפשי את
          הסגנון המושלם ומצאי את הדגם שמתאים בדיוק לך.
        </p>
      </header>

      <Suspense fallback={<div className="py-20 text-center text-warmgray-400">טוען...</div>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
