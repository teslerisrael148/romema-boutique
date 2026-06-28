"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CategorySlug, Product } from "@/lib/types";
import { categories, categoryMap } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getCurrentPath,
  recordInternalNavigation,
  saveScrollPosition,
  toFullPath,
} from "@/lib/scrollRestoration";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

function isCategorySlug(value: string | null): value is CategorySlug {
  return value !== null && value in categoryMap;
}

function parseCategory(value: string | null): CategorySlug | "all" {
  return isCategorySlug(value) ? value : "all";
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "מומלצים" },
  { value: "newest", label: "החדשים ביותר" },
  { value: "price-asc", label: "מחיר: מהנמוך לגבוה" },
  { value: "price-desc", label: "מחיר: מהגבוה לנמוך" },
  { value: "rating", label: "הדירוג הגבוה ביותר" },
];

export function ShopClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");

  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    () => parseCategory(categoryParam),
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [onlyBestsellers, setOnlyBestsellers] = useState(
    sortParam === "bestsellers",
  );

  useEffect(() => {
    setActiveCategory(parseCategory(categoryParam));
  }, [categoryParam]);

  useEffect(() => {
    setOnlyBestsellers(sortParam === "bestsellers");
  }, [sortParam]);

  const changeCategory = (category: CategorySlug | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const search = params.toString();
    const nextPath = toFullPath(pathname, search);
    const currentPath = getCurrentPath();

    setActiveCategory(category);

    if (currentPath === nextPath) return;

    saveScrollPosition(currentPath);
    recordInternalNavigation(currentPath, nextPath);
    router.replace(nextPath, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (onlyBestsellers) {
      list = list.filter((p) => p.isBestSeller);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      default:
        list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    }
    return list;
  }, [products, activeCategory, query, sort, onlyBestsellers]);

  return (
    <div>
      {/* Search + sort bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש מטפחת, צבע או סגנון..."
            className="w-full rounded-full border border-warmgray-200 bg-white py-3 pr-11 pl-10 text-sm outline-none transition-colors focus:border-champagne-400"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="ניקוי חיפוש"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray-400 hover:text-warmgray-700"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-warmgray-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-full border border-warmgray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-champagne-400"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => changeCategory("all")}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all",
            activeCategory === "all"
              ? "bg-warmgray-900 text-ivory"
              : "border border-warmgray-200 bg-white text-warmgray-700 hover:border-warmgray-900",
          )}
        >
          הכל
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => changeCategory(c.slug)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              activeCategory === c.slug
                ? "bg-warmgray-900 text-ivory"
                : "border border-warmgray-200 bg-white text-warmgray-700 hover:border-warmgray-900",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-warmgray-500">
        {filtered.length} מוצרים
      </p>

      <ProductGrid products={filtered} className="mt-6" />
    </div>
  );
}
