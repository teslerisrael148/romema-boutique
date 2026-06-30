"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  applyAccessibilitySettings,
  clearSettings,
  DEFAULT_SETTINGS,
  FONT_SIZE_LEVELS,
  loadSettings,
  saveSettings,
  type AccessibilitySettings,
} from "@/lib/accessibility-settings";
import { siteConfig } from "@/lib/config";
import "./accessibility-widget.css";

const LAST_UPDATED = "29.06.2026";

function WheelchairIcon() {
  return (
    <svg
      viewBox="0 0 483.2226563 551.4306641"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M161.9882813,98.1240234c24.9628906-2.3046875,44.3574219-23.8110352,44.3574219-48.9658203C206.3457031,22.0830078,184.2626953,0,157.1875,0s-49.1572266,22.0830078-49.1572266,49.1582031c0,8.2568359,2.3037109,16.7055664,6.1445313,23.8105469l17.515625,246.4667969l180.3964844,0.0488281l73.9912109,173.3652344l97.1445313-38.0976563l-15.0429688-35.8203125l-54.3662109,19.625l-71.5908203-165.2802734l-167.7294922,1.1269531l-2.3027344-31.2128906l121.4228516,0.0483398v-46.1831055l-126.0546875-0.0493164L161.9882813,98.1240234z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M343.4199219,451.5908203c-30.4472656,60.1875-94.1748047,99.8398438-162.1503906,99.8398438C81.4296875,551.4306641,0,470.0009766,0,370.1611328c0-70.1005859,42.4853516-135.2436523,105.8818359-164.1210938l4.1025391,53.5375977c-37.4970703,23.628418-60.6123047,66.262207-60.6123047,110.9506836c0,72.4267578,59.0712891,131.4970703,131.4970703,131.4970703c66.2617188,0,122.7646484-50.8515625,130.4697266-116.0869141L343.4199219,451.5908203z"
      />
    </svg>
  );
}

type ToggleProps = {
  id: string;
  label: string;
  pressed: boolean;
  onToggle: () => void;
};

function ToggleSwitch({ id, label, pressed, onToggle }: ToggleProps) {
  return (
    <div className="a11y-widget-row">
      <label className="a11y-widget-label" htmlFor={id}>
        {label}
      </label>
      <button
        type="button"
        id={id}
        className="a11y-widget-toggle"
        role="switch"
        aria-checked={pressed}
        aria-label={`${label} — ${pressed ? "פעיל" : "כבוי"}`}
        onClick={onToggle}
      >
        <span className="a11y-widget-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

export function AccessibilityWidget() {
  const panelId = useId();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [announcement, setAnnouncement] = useState("");
  const [mounted, setMounted] = useState(false);

  const announce = useCallback((msg: string) => {
    setAnnouncement("");
    requestAnimationFrame(() => setAnnouncement(msg));
  }, []);

  const updateSettings = useCallback(
    (patch: Partial<AccessibilitySettings>, msg?: string) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        saveSettings(next);
        applyAccessibilitySettings(next);
        return next;
      });
      if (msg) announce(msg);
    },
    [announce],
  );

  const toggle = useCallback(
    (key: keyof AccessibilitySettings, label: string) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        saveSettings(next);
        applyAccessibilitySettings(next);
        announce(`${label} ${next[key] ? "הופעל" : "כובה"}`);
        return next;
      });
    },
    [announce],
  );

  const resetAll = useCallback(() => {
    clearSettings();
    setSettings({ ...DEFAULT_SETTINGS });
    applyAccessibilitySettings({ ...DEFAULT_SETTINGS });
    announce("כל הגדרות הנגישות אופסו לברירת מחדל");
  }, [announce]);

  useEffect(() => {
    const saved = loadSettings();
    setSettings(saved);
    applyAccessibilitySettings(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!settings.readingGuide) return;

    const mask = maskRef.current;
    if (!mask) return;

    const top = mask.querySelector<HTMLElement>(".a11y-reading-mask__top");
    const bottom = mask.querySelector<HTMLElement>(".a11y-reading-mask__bottom");
    const line = mask.querySelector<HTMLElement>(".a11y-reading-mask__line");
    if (!top || !bottom || !line) return;

    const bandHeight = 48;

    const onMove = (e: MouseEvent) => {
      const y = e.clientY;
      const half = bandHeight / 2;
      top.style.height = `${Math.max(0, y - half)}px`;
      line.style.top = `${y - half}px`;
      bottom.style.top = `${y + half}px`;
      bottom.style.height = `${Math.max(0, window.innerHeight - y - half)}px`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [settings.readingGuide]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = getFocusableElements(panel);
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const items = getFocusableElements(panel);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  const onPanelKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      const target = e.target as HTMLElement;
      if (target.classList.contains("a11y-widget-toggle")) {
        e.preventDefault();
        target.click();
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      {settings.readingGuide && (
        <div
          ref={maskRef}
          className="a11y-reading-mask"
          aria-hidden="true"
        >
          <div className="a11y-reading-mask__top" />
          <div className="a11y-reading-mask__line" />
          <div className="a11y-reading-mask__bottom" />
        </div>
      )}

      <div ref={rootRef} className="a11y-widget-root">
        <div
          ref={panelRef}
          id={panelId}
          className="a11y-widget-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          hidden={!open}
          onKeyDown={onPanelKeyDown}
        >
          <div className="a11y-widget-header">
            <h2 id={titleId} className="a11y-widget-title">
              הגדרות נגישות
            </h2>
            <button
              type="button"
              className="a11y-widget-close"
              aria-label="סגירת פאנל נגישות"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="a11y-widget-body">
            <div className="a11y-widget-section">
              <p className="a11y-widget-section-title">טקסט</p>

              <div className="a11y-widget-row">
                <span className="a11y-widget-label">גודל טקסט</span>
                <div className="a11y-widget-stepper">
                  <button
                    type="button"
                    className="a11y-widget-stepper-btn"
                    aria-label="הקטנת טקסט"
                    disabled={settings.fontSizeIndex === 0}
                    onClick={() =>
                      updateSettings(
                        { fontSizeIndex: settings.fontSizeIndex - 1 },
                        `גודל טקסט: ${FONT_SIZE_LEVELS[settings.fontSizeIndex - 1]}%`,
                      )
                    }
                  >
                    −
                  </button>
                  <span className="a11y-widget-stepper-value" aria-live="polite">
                    {FONT_SIZE_LEVELS[settings.fontSizeIndex]}%
                  </span>
                  <button
                    type="button"
                    className="a11y-widget-stepper-btn"
                    aria-label="הגדלת טקסט"
                    disabled={settings.fontSizeIndex === FONT_SIZE_LEVELS.length - 1}
                    onClick={() =>
                      updateSettings(
                        { fontSizeIndex: settings.fontSizeIndex + 1 },
                        `גודל טקסט: ${FONT_SIZE_LEVELS[settings.fontSizeIndex + 1]}%`,
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <ToggleSwitch
                id="a11y-text-spacing"
                label="ריווח טקסט"
                pressed={settings.textSpacing}
                onToggle={() => toggle("textSpacing", "ריווח טקסט")}
              />
              <ToggleSwitch
                id="a11y-readable-font"
                label="פונט קריא"
                pressed={settings.readableFont}
                onToggle={() => toggle("readableFont", "פונט קריא")}
              />
            </div>

            <div className="a11y-widget-section">
              <p className="a11y-widget-section-title">תצוגה</p>
              <ToggleSwitch
                id="a11y-high-contrast"
                label="ניגודיות גבוהה"
                pressed={settings.highContrast}
                onToggle={() => toggle("highContrast", "ניגודיות גבוהה")}
              />
              <ToggleSwitch
                id="a11y-invert"
                label="היפוך צבעים"
                pressed={settings.invertColors}
                onToggle={() => toggle("invertColors", "היפוך צבעים")}
              />
              <ToggleSwitch
                id="a11y-grayscale"
                label="גווני אפור"
                pressed={settings.grayscale}
                onToggle={() => toggle("grayscale", "גווני אפור")}
              />
              <ToggleSwitch
                id="a11y-reduce-motion"
                label="ביטול אנימציות"
                pressed={settings.reduceMotion}
                onToggle={() => toggle("reduceMotion", "ביטול אנימציות")}
              />
            </div>

            <div className="a11y-widget-section">
              <p className="a11y-widget-section-title">הדגשות</p>
              <ToggleSwitch
                id="a11y-highlight-links"
                label="הדגשת קישורים"
                pressed={settings.highlightLinks}
                onToggle={() => toggle("highlightLinks", "הדגשת קישורים")}
              />
              <ToggleSwitch
                id="a11y-highlight-headings"
                label="הדגשת כותרות"
                pressed={settings.highlightHeadings}
                onToggle={() => toggle("highlightHeadings", "הדגשת כותרות")}
              />
            </div>

            <div className="a11y-widget-section">
              <p className="a11y-widget-section-title">ניווט ושימוש</p>
              <ToggleSwitch
                id="a11y-big-cursor"
                label="הגדלת סמן עכבר"
                pressed={settings.bigCursor}
                onToggle={() => toggle("bigCursor", "הגדלת סמן עכבר")}
              />
              <ToggleSwitch
                id="a11y-cursor-hc"
                label="סמן ניגודיות גבוהה"
                pressed={settings.cursorHighContrast}
                onToggle={() => toggle("cursorHighContrast", "סמן ניגודיות גבוהה")}
              />
              <ToggleSwitch
                id="a11y-big-targets"
                label="הגדלת אזורי לחיצה"
                pressed={settings.bigTouchTargets}
                onToggle={() => toggle("bigTouchTargets", "הגדלת אזורי לחיצה")}
              />
              <ToggleSwitch
                id="a11y-reading-guide"
                label="מסכת / קו קריאה"
                pressed={settings.readingGuide}
                onToggle={() => toggle("readingGuide", "מסכת קריאה")}
              />
            </div>

            <button type="button" className="a11y-widget-reset" onClick={resetAll}>
              איפוס הגדרות
            </button>

            <div className="a11y-widget-statement">
              <h3>הצהרת נגישות</h3>
              <p>
                אנו משקיעים מאמצים להנגיש את האתר בהתאם להנחיות WCAG 2.1 ברמה AA,
                במטרה לאפשר חוויית שימוש נוחה ושוויונית לכלל המשתמשים.
              </p>
              <p>
                במידה ונתקלתם בקושי או בתקלה בנושא נגישות, נשמח לקבל פנייה ולטפל בה
                בהקדם.
              </p>
              <p>
                אחראי נגישות: {siteConfig.name}
                <br />
                טלפון:{" "}
                <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
                <br />
                אימייל:{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                פנייה זמינה גם בוואטסאפ וב
                <a href="/contact">טופס יצירת קשר</a>.
              </p>
              <p>עודכן לאחרונה: {LAST_UPDATED}</p>
            </div>
          </div>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="a11y-widget-trigger"
          aria-label="פתיחת תפריט נגישות"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <WheelchairIcon />
        </button>

        <div className="a11y-widget-sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </>
  );
}
