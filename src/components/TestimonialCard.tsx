"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";
import { staggerItem } from "@/components/ui/Reveal";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.figure
      variants={staggerItem}
      className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-card card-hover"
    >
      <Quote className="mb-4 text-champagne-300" size={32} />
      <StarRating rating={testimonial.rating} className="mb-4" />
      <blockquote className="flex-1 text-[15px] leading-relaxed text-warmgray-700">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-warmgray-100 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-100 font-serif text-lg font-bold text-blush-700">
          {testimonial.author.charAt(0)}
        </span>
        <div>
          <p className="font-medium text-warmgray-900">{testimonial.author}</p>
          <p className="text-xs text-warmgray-500">{testimonial.location}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
