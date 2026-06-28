"use client";

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  attachLinkTracking,
  initPopStateTracking,
  initScrollRestoration,
  markPendingRestore,
  prepareBackNavigation,
  seedInitialPath,
  toFullPath,
  trackRouteChange,
} from "@/lib/scrollRestoration";

function NavigationHandlerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.toString();
  const currentPath = toFullPath(pathname, search);
  const isPopState = useRef(false);

  useEffect(() => {
    const cleanupScroll = initScrollRestoration();
    const cleanupLinks = attachLinkTracking();
    const cleanupPop = initPopStateTracking(() => {
      isPopState.current = true;
    });

    return () => {
      cleanupScroll();
      cleanupLinks();
      cleanupPop();
    };
  }, []);

  useLayoutEffect(() => {
    seedInitialPath(currentPath);
    trackRouteChange(currentPath, isPopState.current);
    isPopState.current = false;
  }, [currentPath]);

  const handleBack = useCallback(() => {
    const previousPath = prepareBackNavigation(currentPath);

    if (previousPath) {
      markPendingRestore(previousPath);
      router.push(previousPath, { scroll: false });
      return;
    }

    if (window.history.length > 1) {
      isPopState.current = true;
      router.back();
    }
  }, [currentPath, router]);

  if (pathname === "/") return null;

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="חזרה לעמוד הקודם"
      className={cn(
        "fixed top-[5.75rem] right-4 z-50 flex h-11 w-11 items-center justify-center",
        "rounded-full border border-warmgray-200/80 bg-ivory/90 text-warmgray-700",
        "shadow-soft backdrop-blur-md transition-all duration-200",
        "hover:border-champagne-300 hover:bg-white hover:text-champagne-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 focus-visible:ring-offset-2",
      )}
    >
      <ChevronRight size={22} strokeWidth={2.25} aria-hidden />
    </button>
  );
}

export function NavigationHandler() {
  return (
    <Suspense fallback={null}>
      <NavigationHandlerInner />
    </Suspense>
  );
}
