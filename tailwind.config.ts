import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury feminine palette
        blush: {
          50: "#fdf6f5",
          100: "#fbeceb",
          200: "#f6d6d4",
          300: "#eeb6b3",
          400: "#e4928d",
          500: "#d6726c",
          600: "#c0564f",
          700: "#a1453f",
          800: "#853c37",
          900: "#6f3733",
        },
        champagne: {
          50: "#fbf8f1",
          100: "#f6efdf",
          200: "#ecdcbc",
          300: "#dfc28e",
          400: "#d2a865",
          500: "#c7924a",
          600: "#b67a3e",
          700: "#985f35",
          800: "#7c4d31",
          900: "#66402b",
        },
        ivory: "#fdfbf6",
        cream: "#f7f1e8",
        "rose-antique": "#d4a0a0",
        warmgray: {
          50: "#f7f6f4",
          100: "#eceae6",
          200: "#d8d3cc",
          300: "#bbb2a7",
          400: "#9a8f81",
          500: "#80766a",
          600: "#675f56",
          700: "#544d47",
          800: "#46413c",
          900: "#3d3935",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        serif: ["var(--font-frank)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(111, 55, 51, 0.18)",
        lux: "0 24px 70px -28px rgba(150, 95, 53, 0.35)",
        card: "0 8px 30px -14px rgba(61, 57, 53, 0.22)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg, #985f35 0%, #b67a3e 35%, #7c4d31 70%, #985f35 100%)",
        "gold-sparkle":
          "linear-gradient(90deg, #7c4d31 0%, #985f35 20%, #dfc28e 45%, #c7924a 60%, #f6efdf 75%, #985f35 100%)",
        "blush-fade":
          "linear-gradient(160deg, #fdf6f5 0%, #fbeceb 50%, #f6d6d4 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        sparkle: {
          "0%, 100%": { backgroundPosition: "200% center", filter: "brightness(1)" },
          "50%": { backgroundPosition: "0% center", filter: "brightness(1.15)" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 3s linear infinite",
        sparkle: "sparkle 4s ease-in-out infinite",
        "marquee-rtl": "marquee-rtl 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
