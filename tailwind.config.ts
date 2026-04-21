import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans:    ['"Inter"', "system-ui", "sans-serif"],
        mono:    ['"Inter"', "system-ui", "sans-serif"], // brief doesn't call for mono; keep Inter
      },

      fontSize: {
        "hero":       ["clamp(72px, 13vw, 180px)",  { lineHeight: "0.9",  letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(56px, 8vw, 120px)",   { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(40px, 6vw, 96px)",    { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "display-md": ["clamp(32px, 4vw, 64px)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],

        "h1": ["2.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "h2": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h3": ["1.625rem",{ lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "h4": ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],

        "body-lg": ["1.125rem",  { lineHeight: "1.6" }],
        "body":    ["1rem",      { lineHeight: "1.6" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],

        "meta":    ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        "label":   ["0.75rem",   { lineHeight: "1.3", letterSpacing: "0.06em" }],
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-color))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Reference-specific semantic tokens */
        cobalt:   "hsl(var(--cobalt))",     /* primary accent — interactive */
        burgundy: "hsl(var(--burgundy))",   /* secondary accent — decorative */
      },

      // Small corner radius per reference — soft but not pill
      borderRadius: {
        lg: "0.375rem",  /* 6px */
        md: "0.25rem",   /* 4px */
        sm: "0.125rem",  /* 2px */
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-slide-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-slide-up":  "fade-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
