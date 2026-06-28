"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-warmgray-100 rounded-3xl border border-warmgray-100 bg-white px-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="px-4">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-right"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "shrink-0 rounded-full p-1 transition-all duration-300",
                  isOpen
                    ? "rotate-45 bg-champagne-500 text-white"
                    : "bg-warmgray-100 text-warmgray-600",
                )}
              >
                <Plus size={16} />
              </span>
              <span className="flex-1 font-medium text-warmgray-900">
                {item.question}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-10 text-right text-sm leading-relaxed text-warmgray-600">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
