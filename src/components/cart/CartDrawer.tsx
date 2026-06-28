"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { ProductImage } from "@/components/ui/ProductImage";

export function CartDrawer() {
  const {
    isOpen,
    setOpen,
    lines,
    subtotal,
    count,
    updateQuantity,
    removeItem,
    freeShippingEligible,
  } = useCart();

  const remaining = siteConfig.shipping.freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-warmgray-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-lux"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="flex items-center justify-between border-b border-warmgray-100 px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
                <ShoppingBag size={20} className="text-champagne-500" />
                סל הקניות ({count})
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירה"
                className="rounded-full p-2 hover:bg-warmgray-100"
              >
                <X size={20} />
              </button>
            </header>

            {/* Free shipping progress */}
            {lines.length > 0 ? (
              <div className="border-b border-warmgray-100 bg-blush-50/60 px-6 py-3">
                {freeShippingEligible ? (
                  <p className="text-sm font-medium text-champagne-700">
                    כל הכבוד! זכית במשלוח חינם 🎉
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-warmgray-600">
                      עוד {formatPrice(remaining)} ותזכי במשלוח חינם
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-warmgray-200">
                      <div
                        className="h-full rounded-full bg-gold-sheen transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (subtotal /
                              siteConfig.shipping.freeShippingThreshold) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="text-warmgray-300" />
                  <p className="mt-4 font-serif text-lg text-warmgray-700">
                    הסל שלך ריק
                  </p>
                  <p className="mt-1 text-sm text-warmgray-500">
                    בואי לגלות את הקולקציות שלנו
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="btn-gold mt-6"
                  >
                    למעבר לחנות
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li
                      key={`${line.productId}-${line.variantId}`}
                      className="flex gap-4"
                    >
                      <Link
                        href={`/product/${line.product.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        <ProductImage
                          seed={line.product.slug}
                          className="h-24 w-20 shrink-0"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium ">
                            {line.product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(line.productId, line.variantId)
                            }
                            aria-label="הסרה"
                            className="text-warmgray-400 hover:text-blush-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-warmgray-500">
                          גוון: {line.variantName}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-full border border-warmgray-200">
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
                              className="p-1.5 text-warmgray-600 hover:text-warmgray-900"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-5 text-center text-sm">
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
                              className="p-1.5 text-warmgray-600 hover:text-warmgray-900"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-warmgray-900">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 ? (
              <footer className="border-t border-warmgray-100 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-warmgray-600">סכום ביניים</span>
                  <span className="font-serif text-xl font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    למעבר לתשלום
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setOpen(false)}
                    className="btn-ghost w-full"
                  >
                    צפייה בסל המלא
                  </Link>
                </div>
              </footer>
            ) : null}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
