"use client";

import { motion, useInView, type UseInViewOptions, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SCROLL_RESTORED_EVENT } from "@/lib/scrollRestoration";

type ViewportMargin = NonNullable<UseInViewOptions["margin"]>;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const variants = (y: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

function parseViewportMargin(margin: string): number {
  const match = margin.match(/-?(\d+)/);
  return match ? Number(match[1]) : 0;
}

type ViewportMargin = NonNullable<
  NonNullable<Parameters<typeof useInView>[1]>["margin"]
>;

function isInViewport(el: HTMLElement, margin: string): boolean {
  const offset = parseViewportMargin(margin);
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight + offset && rect.bottom > -offset;
}

function useRevealVisibility(margin: ViewportMargin, once: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });
  const [restoredInView, setRestoredInView] = useState(false);

  const checkVisibility = useCallback(() => {
    const el = ref.current;
    if (!el || !isInViewport(el, String(margin))) return;
    setRestoredInView(true);
  }, [margin]);

  useEffect(() => {
    checkVisibility();
    window.addEventListener(SCROLL_RESTORED_EVENT, checkVisibility);
    return () => window.removeEventListener(SCROLL_RESTORED_EVENT, checkVisibility);
  }, [checkVisibility]);

  return { ref, visible: isInView || restoredInView };
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: RevealProps) {
  const margin = "-80px" as const;
  const { ref, visible } = useRevealVisibility(margin, once);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants(y, delay)}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const margin = "-60px" as const;
  const { ref, visible } = useRevealVisibility(margin, true);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
