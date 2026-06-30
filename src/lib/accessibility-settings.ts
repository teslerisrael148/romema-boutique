export const A11Y_STORAGE_KEY = "a11y-widget-settings";

export type AccessibilitySettings = {
  fontSizeIndex: number;
  textSpacing: boolean;
  highContrast: boolean;
  invertColors: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  cursorHighContrast: boolean;
  reduceMotion: boolean;
  readingGuide: boolean;
  bigTouchTargets: boolean;
};

export const FONT_SIZE_LEVELS = [100, 110, 120, 130] as const;

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSizeIndex: 0,
  textSpacing: false,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  bigCursor: false,
  cursorHighContrast: false,
  reduceMotion: false,
  readingGuide: false,
  bigTouchTargets: false,
};

export function loadSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* quota / private mode */
  }
}

export function clearSettings(): void {
  try {
    localStorage.removeItem(A11Y_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

const HTML_CLASSES = [
  "a11y-text-110",
  "a11y-text-120",
  "a11y-text-130",
] as const;

const BODY_CLASSES = [
  "a11y-text-spacing",
  "a11y-high-contrast",
  "a11y-invert",
  "a11y-grayscale",
  "a11y-highlight-links",
  "a11y-highlight-headings",
  "a11y-readable-font",
  "a11y-big-cursor",
  "a11y-cursor-hc",
  "a11y-reduce-motion",
  "a11y-reading-guide",
  "a11y-big-targets",
  "a11y-has-filter",
] as const;

function buildFilter(settings: AccessibilitySettings): string {
  const parts: string[] = [];
  if (settings.highContrast) parts.push("contrast(1.5)");
  if (settings.grayscale) parts.push("grayscale(1)");
  if (settings.invertColors) parts.push("invert(1)");
  return parts.join(" ");
}

export function applyAccessibilitySettings(settings: AccessibilitySettings): void {
  const html = document.documentElement;
  const body = document.body;

  html.classList.remove(...HTML_CLASSES);
  if (settings.fontSizeIndex === 1) html.classList.add("a11y-text-110");
  else if (settings.fontSizeIndex === 2) html.classList.add("a11y-text-120");
  else if (settings.fontSizeIndex === 3) html.classList.add("a11y-text-130");

  body.classList.remove(...BODY_CLASSES);

  if (settings.textSpacing) body.classList.add("a11y-text-spacing");
  if (settings.invertColors) body.classList.add("a11y-invert");
  if (settings.grayscale) body.classList.add("a11y-grayscale");
  if (settings.highContrast) body.classList.add("a11y-high-contrast");
  if (settings.highlightLinks) body.classList.add("a11y-highlight-links");
  if (settings.highlightHeadings) body.classList.add("a11y-highlight-headings");
  if (settings.readableFont) body.classList.add("a11y-readable-font");
  if (settings.bigCursor) body.classList.add("a11y-big-cursor");
  if (settings.cursorHighContrast) body.classList.add("a11y-cursor-hc");
  if (settings.reduceMotion) body.classList.add("a11y-reduce-motion");
  if (settings.readingGuide) body.classList.add("a11y-reading-guide");
  if (settings.bigTouchTargets) body.classList.add("a11y-big-targets");

  const filter = buildFilter(settings);
  let styleEl = document.getElementById("a11y-dynamic-filter") as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "a11y-dynamic-filter";
    document.head.appendChild(styleEl);
  }

  if (filter) {
    body.classList.add("a11y-has-filter");
    styleEl.textContent = `
      body.a11y-has-filter > *:not(.a11y-widget-root) {
        filter: ${filter};
      }
      body.a11y-has-filter .a11y-widget-root {
        filter: none;
      }
    `;
  } else {
    styleEl.textContent = "";
  }
}
