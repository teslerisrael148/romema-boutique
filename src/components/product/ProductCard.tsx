"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { StarRating } from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { staggerItem } from "@/components/ui/Reveal";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const discount = discountPercent(product.price, product.compareAtPrice);
  const wished = has(product.id);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product.id, product.variants[0].id, 1);
  };

  return (
    <motion.article variants={staggerItem} className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          <ProductImage
            seed={product.slug}
            index={index}
            className="aspect-[3/4] w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {product.isNew ? (
              <span className="rounded-full bg-warmgray-900 px-3 py-1 text-[11px] font-medium text-ivory">
                חדש
              </span>
            ) : null}
            {discount ? (
              <span className="rounded-full bg-blush-400 px-3 py-1 text-[11px] font-medium text-white">
                {discount}%-
              </span>
            ) : null}
            {product.isBestSeller ? (
              <span className="rounded-full bg-champagne-500 px-3 py-1 text-[11px] font-medium text-white">
                רב מכר
              </span>
            ) : null}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label="הוספה למועדפים"
            className="absolute left-3 top-3 rounded-full bg-white/85 p-2 text-warmgray-700 backdrop-blur transition-all hover:bg-white"
          >
            <Heart
              size={17}
              className={cn(wished && "fill-blush-400 text-blush-400")}
            />
          </button>

          {/* Quick add */}
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={quickAdd}
              className="btn-primary w-full !py-2.5 text-[13px]"
            >
              <ShoppingBag size={15} />
              הוספה לסל
            </button>
          </div>
        </div>

        <div className="mt-4 text-right">
          <div className="flex items-center justify-between gap-2">
            <StarRating rating={product.rating} size={13} />
            <h3 className="line-clamp-1 font-serif text-base font-medium ">
              {product.name}
            </h3>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-warmgray-500">
            {product.shortDescription}
          </p>
          <div className="mt-2 flex items-center justify-end gap-2">
            {product.compareAtPrice ? (
              <span className="text-sm text-warmgray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
            <span className="text-lg font-semibold text-warmgray-900">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
