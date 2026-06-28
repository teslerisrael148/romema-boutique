"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Category } from "@/lib/types";
import { gradientFor } from "@/lib/utils";
import { staggerItem } from "@/components/ui/Reveal";

interface CategoryCardProps {
  category: Category;
  index?: number;
  large?: boolean;
}

export function CategoryCard({ category, index = 0, large }: CategoryCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative block overflow-hidden rounded-3xl"
      >
        <div
          className={large ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/5]"}
          style={{ background: gradientFor(category.slug, index + 2) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warmgray-900/70 via-warmgray-900/10 to-transparent" />

        {/* Monogram */}
        <span className="pointer-events-none absolute left-4 top-4 select-none font-serif text-7xl font-bold text-white/15">
          ר
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 text-right text-ivory sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-champagne-200">
            {category.tagline}
          </p>
          <h3 className="mt-1.5 font-serif text-xl font-semibold sm:text-2xl">
            {category.name}
          </h3>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ivory/90 transition-all group-hover:gap-3 group-hover:text-champagne-200">
            לצפייה בקולקציה
            <ArrowLeft size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
