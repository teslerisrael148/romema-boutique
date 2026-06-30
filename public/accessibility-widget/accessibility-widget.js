/**
 * Accessibility Widget — drop-in vanilla JS
 * הדבק לפני </body>:
 *   <link rel="stylesheet" href="/accessibility-widget/accessibility-widget.css">
 *   <script src="/accessibility-widget/accessibility-widget.js" defer></script>
 *
 * אופציונלי — הגדרות לפני טעינת הסקריפט:
 *   window.A11Y_WIDGET_CONFIG = { brandName: '...', phone: '...', email: '...', lastUpdated: '...' };
 */
(function () {
  "use strict";

  var STORAGE_KEY = "a11y-widget-settings";
  var FONT_LEVELS = [100, 110, 120, 130];

  var DEFAULTS = {
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

  var cfg = Object.assign(
    {
      brandName: "העסק שלי",
      phone: "050-0000000",
      phoneHref: "tel:+972500000000",
      email: "access@example.com",
      lastUpdated: "29.06.2026",
    },
    window.A11Y_WIDGET_CONFIG || {},
  );

  var SVG_ICON =
    '<svg viewBox="0 0 483.2226563 551.4306641" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M161.9882813,98.1240234c24.9628906-2.3046875,44.3574219-23.8110352,44.3574219-48.9658203C206.3457031,22.0830078,184.2626953,0,157.1875,0s-49.1572266,22.0830078-49.1572266,49.1582031c0,8.2568359,2.3037109,16.7055664,6.1445313,23.8105469l17.515625,246.4667969l180.3964844,0.0488281l73.9912109,173.3652344l97.1445313-38.0976563l-15.0429688-35.8203125l-54.3662109,19.625l-71.5908203-165.2802734l-167.7294922,1.1269531l-2.3027344-31.2128906l121.4228516,0.0483398v-46.1831055l-126.0546875-0.0493164L161.9882813,98.1240234z"/>' +
    '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M343.4199219,451.5908203c-30.4472656,60.1875-94.1748047,99.8398438-162.1503906,99.8398438C81.4296875,551.4306641,0,470.0009766,0,370.1611328c0-70.1005859,42.4853516-135.2436523,105.8818359-164.1210938l4.1025391,53.5375977c-37.4970703,23.628418-60.6123047,66.262207-60.6123047,110.9506836c0,72.4267578,59.0712891,131.4970703,131.4970703,131.4970703c66.2617188,0,122.7646484-50.8515625,130.4697266-116.0869141L343.4199219,451.5908203z"/>' +
    "</svg>";

  var state = load();
  var open = false;
  var root, panel, trigger, liveRegion, maskEl;
  var prevFocus = null;

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULTS);
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function buildFilter(s) {
    var p = [];
    if (s.highContrast) p.push("contrast(1.5)");
    if (s.grayscale) p.push("grayscale(1)");
    if (s.invertColors) p.push("invert(1)");
    return p.join(" ");
  }

  function apply() {
    var html = document.documentElement;
    var body = document.body;

    html.classList.remove("a11y-text-110", "a11y-text-120", "a11y-text-130");
    if (state.fontSizeIndex === 1) html.classList.add("a11y-text-110");
    else if (state.fontSizeIndex === 2) html.classList.add("a11y-text-120");
    else if (state.fontSizeIndex === 3) html.classList.add("a11y-text-130");

    var bodyClasses = [
      "a11y-text-spacing", "a11y-high-contrast", "a11y-invert", "a11y-grayscale",
      "a11y-highlight-links", "a11y-highlight-headings", "a11y-readable-font",
      "a11y-big-cursor", "a11y-cursor-hc", "a11y-reduce-motion",
      "a11y-reading-guide", "a11y-big-targets", "a11y-has-filter",
    ];
    body.classList.remove.apply(body.classList, bodyClasses);

    if (state.textSpacing) body.classList.add("a11y-text-spacing");
    if (state.invertColors) body.classList.add("a11y-invert");
    if (state.grayscale) body.classList.add("a11y-grayscale");
    if (state.highContrast) body.classList.add("a11y-high-contrast");
    if (state.highlightLinks) body.classList.add("a11y-highlight-links");
    if (state.highlightHeadings) body.classList.add("a11y-highlight-headings");
    if (state.readableFont) body.classList.add("a11y-readable-font");
    if (state.bigCursor) body.classList.add("a11y-big-cursor");
    if (state.cursorHighContrast) body.classList.add("a11y-cursor-hc");
    if (state.reduceMotion) body.classList.add("a11y-reduce-motion");
    if (state.readingGuide) body.classList.add("a11y-reading-guide");
    if (state.bigTouchTargets) body.classList.add("a11y-big-targets");

    var filter = buildFilter(state);
    var styleEl = document.getElementById("a11y-dynamic-filter");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "a11y-dynamic-filter";
      document.head.appendChild(styleEl);
    }
    if (filter) {
      body.classList.add("a11y-has-filter");
      styleEl.textContent =
        "body.a11y-has-filter > *:not(.a11y-widget-root){filter:" + filter + "}" +
        "body.a11y-has-filter .a11y-widget-root{filter:none}";
    } else {
      styleEl.textContent = "";
    }

    updateMask();
    syncUI();
  }

  function announce(msg) {
    if (!liveRegion) return;
    liveRegion.textContent = "";
    requestAnimationFrame(function () {
      liveRegion.textContent = msg;
    });
  }

  function toggleKey(key, label) {
    state[key] = !state[key];
    save();
    apply();
    announce(label + (state[key] ? " הופעל" : " כובה"));
  }

  function resetAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    state = Object.assign({}, DEFAULTS);
    apply();
    announce("כל הגדרות הנגישות אופסו לברירת מחדל");
  }

  function toggleRow(id, key, label) {
    return (
      '<div class="a11y-widget-row">' +
      '<label class="a11y-widget-label" for="' + id + '">' + label + "</label>" +
      '<button type="button" id="' + id + '" class="a11y-widget-toggle" role="switch" ' +
      'data-key="' + key + '" data-label="' + label + '" aria-checked="' + state[key] + '" aria-pressed="' + state[key] + '">' +
      '<span class="a11y-widget-toggle-thumb" aria-hidden="true"></span></button></div>'
    );
  }

  function buildHTML() {
    return (
      '<div class="a11y-widget-root">' +
      '<div class="a11y-widget-panel" role="dialog" aria-modal="true" aria-labelledby="a11y-widget-title" hidden>' +
      '<div class="a11y-widget-header">' +
      '<h2 id="a11y-widget-title" class="a11y-widget-title">הגדרות נגישות</h2>' +
      '<button type="button" class="a11y-widget-close" aria-label="סגירת פאנל נגישות">×</button></div>' +
      '<div class="a11y-widget-body">' +
      '<div class="a11y-widget-section"><p class="a11y-widget-section-title">טקסט</p>' +
      '<div class="a11y-widget-row"><span class="a11y-widget-label">גודל טקסט</span>' +
      '<div class="a11y-widget-stepper">' +
      '<button type="button" class="a11y-widget-stepper-btn" data-action="font-dec" aria-label="הקטנת טקסט">−</button>' +
      '<span class="a11y-widget-stepper-value" aria-live="polite">' + FONT_LEVELS[state.fontSizeIndex] + "%</span>" +
      '<button type="button" class="a11y-widget-stepper-btn" data-action="font-inc" aria-label="הגדלת טקסט">+</button></div></div>' +
      toggleRow("a11y-text-spacing", "textSpacing", "ריווח טקסט") +
      toggleRow("a11y-readable-font", "readableFont", "פונט קריא") +
      "</div>" +
      '<div class="a11y-widget-section"><p class="a11y-widget-section-title">תצוגה</p>' +
      toggleRow("a11y-high-contrast", "highContrast", "ניגודיות גבוהה") +
      toggleRow("a11y-invert", "invertColors", "היפוך צבעים") +
      toggleRow("a11y-grayscale", "grayscale", "גווני אפור") +
      toggleRow("a11y-reduce-motion", "reduceMotion", "ביטול אנימציות") +
      "</div>" +
      '<div class="a11y-widget-section"><p class="a11y-widget-section-title">הדגשות</p>' +
      toggleRow("a11y-highlight-links", "highlightLinks", "הדגשת קישורים") +
      toggleRow("a11y-highlight-headings", "highlightHeadings", "הדגשת כותרות") +
      "</div>" +
      '<div class="a11y-widget-section"><p class="a11y-widget-section-title">ניווט ושימוש</p>' +
      toggleRow("a11y-big-cursor", "bigCursor", "הגדלת סמן עכבר") +
      toggleRow("a11y-cursor-hc", "cursorHighContrast", "סמן ניגודיות גבוהה") +
      toggleRow("a11y-big-targets", "bigTouchTargets", "הגדלת אזורי לחיצה") +
      toggleRow("a11y-reading-guide", "readingGuide", "מסכת / קו קריאה") +
      "</div>" +
      '<button type="button" class="a11y-widget-reset">איפוס הגדרות</button>' +
      '<div class="a11y-widget-statement">' +
      "<h3>הצהרת נגישות</h3>" +
      "<p>אנו משקיעים מאמצים להנגיש את האתר בהתאם להנחיות WCAG 2.1 ברמה AA, במטרה לאפשר חוויית שימוש נוחה ושוויונית לכלל המשתמשים.</p>" +
      "<p>במידה ונתקלתם בקושי או בתקלה בנושא נגישות, נשמח לקבל פנייה ולטפל בה בהקדם.</p>" +
      "<p>אחראי נגישות: " + cfg.brandName + "<br>טלפון: <a href=\"" + cfg.phoneHref + "\">" + cfg.phone + "</a><br>אימייל: <a href=\"mailto:" + cfg.email + "\">" + cfg.email + "</a></p>" +
      "<p>פנייה זמינה גם בוואטסאפ וב<a href=\"/contact\">טופס יצירת קשר</a>.</p>" +
      "<p>עודכן לאחרונה: " + cfg.lastUpdated + "</p></div></div></div>" +
      '<button type="button" class="a11y-widget-trigger" aria-label="פתיחת תפריט נגישות" aria-expanded="false">' +
      SVG_ICON + "</button>" +
      '<div class="a11y-widget-sr-only" aria-live="polite" aria-atomic="true"></div></div>'
    );
  }

  function getFocusable(container) {
    var sel = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.filter.call(container.querySelectorAll(sel), function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
  }

  function setOpen(val) {
    open = val;
    panel.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-controls", panel.id || "a11y-panel");

    if (open) {
      prevFocus = document.activeElement;
      var items = getFocusable(panel);
      if (items[0]) items[0].focus();
    } else if (prevFocus && prevFocus.focus) {
      prevFocus.focus();
    }
  }

  function syncUI() {
    if (!panel) return;
    var val = panel.querySelector(".a11y-widget-stepper-value");
    if (val) val.textContent = FONT_LEVELS[state.fontSizeIndex] + "%";

    panel.querySelectorAll(".a11y-widget-toggle").forEach(function (btn) {
      var key = btn.getAttribute("data-key");
      if (!key) return;
      var on = !!state[key];
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-checked", String(on));
    });

    var dec = panel.querySelector('[data-action="font-dec"]');
    var inc = panel.querySelector('[data-action="font-inc"]');
    if (dec) dec.disabled = state.fontSizeIndex === 0;
    if (inc) inc.disabled = state.fontSizeIndex === FONT_LEVELS.length - 1;
  }

  function updateMask() {
    if (!maskEl) {
      maskEl = document.createElement("div");
      maskEl.className = "a11y-reading-mask";
      maskEl.setAttribute("aria-hidden", "true");
      maskEl.innerHTML =
        '<div class="a11y-reading-mask__top"></div>' +
        '<div class="a11y-reading-mask__line"></div>' +
        '<div class="a11y-reading-mask__bottom"></div>';
      document.body.appendChild(maskEl);
    }
    maskEl.style.display = state.readingGuide ? "block" : "none";
  }

  function onMouseMove(e) {
    if (!state.readingGuide || !maskEl) return;
    var top = maskEl.querySelector(".a11y-reading-mask__top");
    var bottom = maskEl.querySelector(".a11y-reading-mask__bottom");
    var line = maskEl.querySelector(".a11y-reading-mask__line");
    var band = 48;
    var half = band / 2;
    var y = e.clientY;
    top.style.height = Math.max(0, y - half) + "px";
    line.style.top = y - half + "px";
    bottom.style.top = y + half + "px";
    bottom.style.height = Math.max(0, window.innerHeight - y - half) + "px";
  }

  function bindEvents() {
    trigger.addEventListener("click", function () {
      setOpen(!open);
    });

    panel.querySelector(".a11y-widget-close").addEventListener("click", function () {
      setOpen(false);
    });

    panel.querySelector(".a11y-widget-reset").addEventListener("click", resetAll);

    panel.addEventListener("click", function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;

      if (t.matches("[data-action=font-dec]") && state.fontSizeIndex > 0) {
        state.fontSizeIndex--;
        save(); apply();
        announce("גודל טקסט: " + FONT_LEVELS[state.fontSizeIndex] + "%");
      }
      if (t.matches("[data-action=font-inc]") && state.fontSizeIndex < FONT_LEVELS.length - 1) {
        state.fontSizeIndex++;
        save(); apply();
        announce("גודל טקסט: " + FONT_LEVELS[state.fontSizeIndex] + "%");
      }
      if (t.matches(".a11y-widget-toggle")) {
        var key = t.getAttribute("data-key");
        var label = t.getAttribute("data-label");
        if (key) toggleKey(key, label || key);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key !== "Tab") return;
      var items = getFocusable(panel);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    document.addEventListener("mousedown", function (e) {
      if (open && root && !root.contains(e.target)) setOpen(false);
    });

    window.addEventListener("mousemove", onMouseMove, { passive: true });
  }

  function init() {
    var wrap = document.createElement("div");
    wrap.innerHTML = buildHTML();
    root = wrap.firstElementChild;
    document.body.appendChild(root);

    panel = root.querySelector(".a11y-widget-panel");
    trigger = root.querySelector(".a11y-widget-trigger");
    liveRegion = root.querySelector(".a11y-widget-sr-only");

    bindEvents();
    apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
