"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductGalleryProps {
  seed: string;
  imageCount: number;
  name: string;
}

export function ProductGallery({ seed, imageCount, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const count = Math.max(1, imageCount);

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`תמונה ${i + 1}`}
            className={cn(
              "shrink-0 overflow-hidden rounded-xl transition-all",
              active === i
                ? "ring-2 ring-champagne-400 ring-offset-2 ring-offset-ivory"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <ProductImage
              seed={seed}
              index={i}
              className="h-20 w-16"
              rounded={false}
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProductImage
              seed={seed}
              index={active}
              label={name}
              className="aspect-[3/4] w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
