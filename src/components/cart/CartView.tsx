"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { lines, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-warmgray-200 py-24 text-center">
        <ShoppingBag size={56} className="text-warmgray-300" />
        <p className="mt-5 font-serif text-2xl text-warmgray-700">הסל שלך ריק</p>
        <p className="mt-2 text-warmgray-500">
          בואי לגלות את הקולקציות היפות שלנו
        </p>
        <Link href="/shop" className="btn-gold mt-7">
          למעבר לחנות
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ul className="space-y-5">
          {lines.map((line) => (
            <li
              key={`${line.productId}-${line.variantId}`}
              className="flex gap-5 rounded-2xl border border-warmgray-100 bg-white p-4"
            >
              <Link
                href={`/product/${line.product.slug}`}
                className="shrink-0"
              >
                <ProductImage seed={line.product.slug} className="h-32 w-24" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${line.product.slug}`}
                      className="font-serif text-lg font-medium heading-gold hover:text-champagne-700"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-warmgray-500">
                      גוון: {line.variantName}
                    </p>
                    <p className="mt-1 text-sm text-warmgray-500">
                      {formatPrice(line.product.price)} ליחידה
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId, line.variantId)}
                    aria-label="הסרה"
                    className="rounded-full p-2 text-warmgray-400 hover:bg-blush-50 hover:text-blush-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3 rounded-full border border-warmgray-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity - 1,
                        )
                      }
                      aria-label="הפחתה"
                      className="p-2 text-warmgray-600 hover:text-warmgray-900"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="min-w-6 text-center font-medium">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity + 1,
                        )
                      }
                      aria-label="הוספה"
                      className="p-2 text-warmgray-600 hover:text-warmgray-900"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <span className="font-serif text-lg font-semibold text-warmgray-900">
                    {formatPrice(line.lineTotal)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="mt-6 inline-flex items-center text-sm font-medium text-champagne-700 hover:text-champagne-800"
        >
          ← המשך בקנייה
        </Link>
      </div>

      <div className="lg:col-span-1">
        <OrderSummary>
          <Link href="/checkout" className="btn-primary w-full">
            למעבר לתשלום
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
