const SCROLL_PREFIX = "scroll:";
const BACK_FROM_PREFIX = "back-from:";
const RESTORE_NEXT_KEY = "restore-next";

export const SCROLL_RESTORED_EVENT = "scroll-restored";

function notifyScrollRestored(): void {
  window.dispatchEvent(new CustomEvent(SCROLL_RESTORED_EVENT));
}

let lastTrackedPath: string | null = null;
let pendingRestorePath: string | null = null;
let isRestoringScroll = false;
let restoreClearTimer: ReturnType<typeof setTimeout> | undefined;

function safeGetItem(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable in private mode or when quota is exceeded.
  }
}

function safeRemoveItem(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore storage errors.
  }
}

export function toFullPath(pathname: string, search: string): string {
  return search ? `${pathname}?${search}` : pathname;
}

export function pathFromUrl(url: URL): string {
  const search = url.search.startsWith("?") ? url.search.slice(1) : url.search;
  return toFullPath(url.pathname, search);
}

export function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return pathFromUrl(new URL(window.location.href));
}

function scrollStorageKey(fullPath: string): string {
  return `${SCROLL_PREFIX}${fullPath}`;
}

function backFromStorageKey(fullPath: string): string {
  return `${BACK_FROM_PREFIX}${fullPath}`;
}

export function saveScrollPosition(fullPath: string): void {
  if (isRestoringScroll) return;

  // window.scrollY always reflects the active page — never persist it under another path.
  if (fullPath !== getCurrentPath()) return;

  safeSetItem(scrollStorageKey(fullPath), String(window.scrollY));
}

export function getSavedScrollPosition(fullPath: string): number | null {
  const saved = safeGetItem(scrollStorageKey(fullPath));
  if (saved === null) return null;
  return Number(saved);
}

export function setBackFrom(currentPath: string, previousPath: string): void {
  if (currentPath === previousPath) return;
  safeSetItem(backFromStorageKey(currentPath), previousPath);
}

export function getPreviousPath(fullPath: string): string | null {
  return safeGetItem(backFromStorageKey(fullPath));
}

export function markRestoreNext(fullPath: string): void {
  safeSetItem(RESTORE_NEXT_KEY, fullPath);
}

function consumeRestoreNext(fullPath: string): boolean {
  const target = safeGetItem(RESTORE_NEXT_KEY);
  if (target !== fullPath) return false;
  safeRemoveItem(RESTORE_NEXT_KEY);
  return true;
}

export function restoreScrollPosition(fullPath: string): void {
  const top = getSavedScrollPosition(fullPath);
  if (top === null) return;

  isRestoringScroll = true;
  clearTimeout(restoreClearTimer);

  const apply = () => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top, left: 0, behavior: "auto" });
  };

  const applyAndNotify = () => {
    apply();
    notifyScrollRestored();
  };

  applyAndNotify();
  requestAnimationFrame(applyAndNotify);
  window.setTimeout(applyAndNotify, 50);
  window.setTimeout(applyAndNotify, 150);
  window.setTimeout(applyAndNotify, 350);
  window.setTimeout(applyAndNotify, 600);
  window.setTimeout(applyAndNotify, 1000);

  restoreClearTimer = window.setTimeout(() => {
    isRestoringScroll = false;
    notifyScrollRestored();
  }, 1200);
}

/** Called on every route change — survives component remounts */
export function trackRouteChange(currentPath: string, isPopState: boolean): void {
  if (isPopState || consumeRestoreNext(currentPath)) {
    restoreScrollPosition(currentPath);
    lastTrackedPath = currentPath;
    pendingRestorePath = null;
    return;
  }

  if (pendingRestorePath === currentPath) {
    restoreScrollPosition(currentPath);
    lastTrackedPath = currentPath;
    pendingRestorePath = null;
    return;
  }

  if (lastTrackedPath && lastTrackedPath !== currentPath) {
    // Scroll for lastTrackedPath is saved on pointerdown / debounced scroll before navigation.
    setBackFrom(currentPath, lastTrackedPath);
  }

  lastTrackedPath = currentPath;
}

export function prepareBackNavigation(currentPath: string): string | null {
  saveScrollPosition(currentPath);
  return getPreviousPath(currentPath);
}

export function markPendingRestore(path: string): void {
  pendingRestorePath = path;
  markRestoreNext(path);
}

export function recordInternalNavigation(fromPath: string, toPath: string): void {
  if (fromPath === toPath) return;
  saveScrollPosition(fromPath);
  setBackFrom(toPath, fromPath);
  lastTrackedPath = toPath;
}

export function initScrollRestoration(): () => void {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  let scrollTimer: ReturnType<typeof setTimeout> | undefined;

  const onScroll = () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      saveScrollPosition(getCurrentPath());
    }, 80);
  };

  const onPageHide = () => saveScrollPosition(getCurrentPath());

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", onPageHide);

  return () => {
    clearTimeout(scrollTimer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pagehide", onPageHide);
  };
}

export function initPopStateTracking(
  onPopState: () => void,
): () => void {
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}

export function attachLinkTracking(): () => void {
  const handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    if (anchor.target && anchor.target !== "_self") return;

    saveScrollPosition(getCurrentPath());
  };

  document.addEventListener("pointerdown", handlePointerDown, true);
  return () => document.removeEventListener("pointerdown", handlePointerDown, true);
}

/** Seed tracker on first client load */
export function seedInitialPath(path: string): void {
  if (lastTrackedPath === null) {
    lastTrackedPath = path;
  }
}
