"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/shop", label: "חנות", hasMenu: true },
  { href: "/gallery", label: "גלריה" },
  { href: "/about", label: "הסיפור שלי" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "צור קשר" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { count, setOpen } = useCart();
  const { count: wishCount } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500",
        scrolled
          ? "bg-ivory/90 shadow-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      {/* Announcement bar */}
      <div className="bg-warmgray-900 text-ivory">
        <div className="container-lux flex items-center justify-center gap-2 py-2 text-center text-[12px] tracking-wide sm:text-[13px]">
          <span className="text-champagne-300">✦</span>
          משלוח חינם בהזמנה מעל {siteConfig.shipping.freeShippingThreshold} ₪ · אריזת מתנה בכל קניה
          <span className="text-champagne-300">✦</span>
        </div>
      </div>

      <nav className="container-lux flex items-center justify-between gap-4 py-4">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-center leading-none">
          <span className="font-serif text-2xl font-bold tracking-tight heading-gold sm:text-3xl">
            {siteConfig.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-champagne-600">
            {siteConfig.nameEn}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasMenu && setShopOpen(true)}
                onMouseLeave={() => link.hasMenu && setShopOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-champagne-700"
                      : "text-warmgray-700 hover:text-champagne-700",
                  )}
                >
                  {link.label}
                  {link.hasMenu ? <ChevronDown size={14} /> : null}
                </Link>

                {link.hasMenu ? (
                  <AnimatePresence>
                    {shopOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full w-64 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-warmgray-100 bg-white p-2 shadow-lux">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/shop?category=${c.slug}`}
                              className="block rounded-xl px-4 py-2.5 text-sm text-warmgray-700 transition-colors hover:bg-blush-50 hover:text-champagne-700"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <Link
            href="/shop"
            aria-label="חיפוש"
            className="hidden rounded-full p-2.5 text-warmgray-700 transition-colors hover:bg-warmgray-100 sm:block"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="מועדפים"
            className="relative rounded-full p-2.5 text-warmgray-700 transition-colors hover:bg-warmgray-100"
          >
            <Heart size={20} />
            {wishCount > 0 ? (
              <span className="absolute -left-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blush-400 px-1 text-[10px] font-bold text-white">
                {wishCount}
              </span>
            ) : null}
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="סל הקניות"
            className="relative rounded-full p-2.5 text-warmgray-700 transition-colors hover:bg-warmgray-100"
          >
            <ShoppingBag size={20} />
            {count > 0 ? (
              <span className="absolute -left-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne-500 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="תפריט"
            className="rounded-full p-2.5 text-warmgray-700 transition-colors hover:bg-warmgray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — portaled to body so header backdrop-blur doesn't break fixed positioning */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {mobileOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-[100] bg-warmgray-900/40 backdrop-blur-sm lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileOpen(false)}
                  />
                  <motion.aside
                    className="fixed inset-y-0 right-0 z-[100] flex w-[82%] max-w-sm flex-col overflow-y-auto bg-ivory p-6 shadow-lux lg:hidden"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold heading-gold">
                        {siteConfig.name}
                      </span>
                      <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="סגירה"
                        className="rounded-full p-2 text-warmgray-700 hover:bg-warmgray-100"
                      >
                        <X size={22} />
                      </button>
                    </div>

                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-xl px-4 py-3 text-lg font-medium text-warmgray-800 transition-colors hover:bg-blush-50 hover:text-champagne-700"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-6 border-t border-warmgray-200 pt-6">
                      <p className="label-overline mb-3">קטגוריות</p>
                      <div className="flex flex-col gap-1">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/shop?category=${c.slug}`}
                            className="rounded-lg px-4 py-2 text-sm text-warmgray-600 hover:text-champagne-700"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
