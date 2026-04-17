import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    // Tighter container. 1200px max, 24px gutter on mobile, 32px on desktop.
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px
        md: "2rem",        // 32px
        lg: "2rem",        // 32px — do NOT scale padding up at 2xl
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px", // cap here. No wider.
      },
    },
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
      },

      // ──────────────────────────────────────────────────────────────
      // SPACING SCALE — 4/8 system, named tokens for section rhythm
      // Use these instead of arbitrary py-20, my-32, etc.
      // ──────────────────────────────────────────────────────────────
      spacing: {
        "section-y-sm": "4rem",   // 64px  — between tightly related sections
        "section-y":    "6rem",   // 96px  — DEFAULT section rhythm (desktop)
        "section-y-lg": "8rem",   // 128px — only for hero→first section
        "block":        "3rem",   // 48px  — between blocks inside a section
        "stack":        "1.5rem", // 24px  — between content items
        "tight":        "0.5rem", // 8px   — within a component
      },

      // ──────────────────────────────────────────────────────────────
      // TYPE SCALE — locked. Use these tokens, not ad-hoc text-5xl.
      // ──────────────────────────────────────────────────────────────
      fontSize: {
        // Display (Instrument Serif italic)
        "display-xl": ["clamp(3.5rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 5vw, 4rem)",  { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 3.5vw, 2.75rem)",{ lineHeight: "1.1",  letterSpacing: "-0.02em" }],

        // Headings (DM Sans)
        "h1": ["2.5rem",   { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "h2": ["2rem",     { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h3": ["1.5rem",   { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "h4": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],

        // Body
        "body-lg":  ["1.0625rem", { lineHeight: "1.6" }], // 17px
        "body":     ["0.9375rem", { lineHeight: "1.6" }], // 15px — DEFAULT
        "body-sm":  ["0.875rem",  { lineHeight: "1.55" }],// 14px

        // Meta / monospace labels
        "label":    ["0.75rem",   { lineHeight: "1.3", letterSpacing: "0.08em" }], // 12px uppercase
        "caption":  ["0.8125rem", { lineHeight: "1.5" }], // 13px
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
      },

      // Editorial: drop to 4px max. 8px was reading SaaS.
      borderRadius: {
        lg: "0.375rem", // 6px
        md: "0.25rem",  // 4px
        sm: "0.125rem", // 2px
      },

      // Keep the existing animations you need.
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
