"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/components/ui/Reveal";

interface GalleryItemProps {
  caption: string;
  gradient: string;
  tall?: boolean;
}

export function GalleryItem({ caption, gradient, tall }: GalleryItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="group relative block break-inside-avoid overflow-hidden rounded-2xl"
    >
      <div
        className={cn("w-full", tall ? "aspect-[3/4]" : "aspect-square")}
        style={{ background: gradient }}
      >
        <span className="flex h-full items-center justify-center font-serif text-7xl font-bold text-white/20">
          ר
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-warmgray-900/0 text-ivory opacity-0 transition-all duration-300 group-hover:bg-warmgray-900/50 group-hover:opacity-100">
        <Heart size={22} />
        <span className="px-4 text-center text-sm font-medium">{caption}</span>
      </div>
    </motion.div>
  );
}
