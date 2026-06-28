"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, MessageCircle, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { siteConfig, whatsappLink } from "@/lib/config";
import { getCategory } from "@/data/categories";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const discount = discountPercent(product.price, product.compareAtPrice);
  const wished = has(product.id);

  const handleAdd = () => {
    addItem(product.id, variantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product.id, variantId, quantity, { openDrawer: false });
  };

  const category = getCategory(product.category);
  const waMessage = `שלום ${siteConfig.name}, אשמח להזמין:\n${product.name}\nגוון: ${variant.name}\nכמות: ${quantity}\nמחיר: ${formatPrice(product.price)}`;
  const waHref = whatsappLink(waMessage, category.whatsapp);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-medium text-blush-700">
          {product.tags[0]}
        </span>
        {product.isNew ? (
          <span className="rounded-full bg-warmgray-900 px-3 py-1 text-xs font-medium text-ivory">
            חדש
          </span>
        ) : null}
      </div>

      <h1 className="mt-4 font-serif text-3xl font-bold  sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={product.rating} showValue />
        <span className="text-sm text-warmgray-400">·</span>
        <span className="text-sm text-warmgray-500">
          {product.reviewsCount} ביקורות
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-serif text-3xl font-bold text-warmgray-900">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice ? (
          <>
            <span className="text-lg text-warmgray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="rounded-full bg-blush-400 px-2.5 py-0.5 text-xs font-semibold text-white">
              חיסכון {discount}%
            </span>
          </>
        ) : null}
      </div>

      <p className="mt-5 leading-relaxed text-warmgray-600">
        {product.description}
      </p>

      {/* Variants */}
      <div className="mt-7">
        <p className="mb-3 text-sm font-medium text-warmgray-800">
          גוון: <span className="text-warmgray-600">{variant.name}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((v) => (
            <button
              type="button"
              key={v.id}
              onClick={() => setVariantId(v.id)}
              disabled={!v.inStock}
              title={v.name}
              aria-label={v.name}
              className={cn(
                "relative h-10 w-10 rounded-full ring-offset-2 ring-offset-ivory transition-all",
                variantId === v.id
                  ? "ring-2 ring-warmgray-900"
                  : "ring-1 ring-warmgray-200 hover:ring-warmgray-400",
                !v.inStock && "cursor-not-allowed opacity-40",
              )}
              style={{ backgroundColor: v.swatch }}
            >
              {variantId === v.id ? (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto text-white mix-blend-difference"
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-7 flex items-center gap-4">
        <p className="text-sm font-medium text-warmgray-800">כמות</p>
        <div className="flex items-center gap-3 rounded-full border border-warmgray-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="הפחתה"
            className="p-2.5 text-warmgray-600 hover:text-warmgray-900"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-6 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="הוספה"
            className="p-2.5 text-warmgray-600 hover:text-warmgray-900"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <div className="flex gap-3">
          <button type="button" onClick={handleAdd} className="btn-primary flex-1">
            {added ? (
              <>
                <Check size={18} /> נוסף לסל
              </>
            ) : (
              <>
                <ShoppingBag size={18} /> הוספה לסל
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label="מועדפים"
            className={cn(
              "btn border px-4",
              wished
                ? "border-blush-300 bg-blush-50 text-blush-600"
                : "border-warmgray-200 text-warmgray-700 hover:border-warmgray-900",
            )}
          >
            <Heart size={18} className={cn(wished && "fill-blush-400")} />
          </button>
        </div>

        <Link href="/checkout" onClick={handleBuyNow} className="btn-gold w-full">
          קנייה מהירה
        </Link>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full bg-[#25D366] text-white hover:opacity-90"
        >
          <MessageCircle size={18} />
          הזמנה בוואטסאפ
        </a>
      </div>

      {/* Meta */}
      <dl className="mt-8 space-y-2 border-t border-warmgray-100 pt-6 text-sm">
        <div className="flex gap-2">
          <dt className="font-medium text-warmgray-800">חומר:</dt>
          <dd className="text-warmgray-600">{product.material}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-warmgray-800">מידות:</dt>
          <dd className="text-warmgray-600">{product.dimensions}</dd>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-warmgray-100 px-3 py-1 text-xs text-warmgray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </dl>
    </div>
  );
}
