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
        md: "2rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        // New stack per brief
        display: ['"EB Garamond"', "Georgia", "serif"],
        sans:    ['"Inter"', "system-ui", "sans-serif"],
        mono:    ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },

      spacing: {
        "section-y-sm": "4rem",
        "section-y":    "6rem",
        "section-y-lg": "8rem",
        "block":        "3rem",
        "stack":        "1.5rem",
        "tight":        "0.5rem",
      },

      fontSize: {
        // Hero — extreme scale per brief
        "hero":       ["clamp(64px, 14vw, 200px)",  { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(52px, 7vw, 96px)",    { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(36px, 4.5vw, 72px)",  { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(28px, 3vw, 48px)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],

        "h1": ["2.5rem",   { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "h2": ["2rem",     { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h3": ["1.5rem",   { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "h4": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],

        "body-lg": ["1.125rem",  { lineHeight: "1.6" }],
        "body":    ["1rem",      { lineHeight: "1.6" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],

        "label":   ["0.75rem",   { lineHeight: "1.3", letterSpacing: "0.08em" }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
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

      // Sharp. No rounded corners per brief.
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
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
        /* Back-out (overshoot) for hero letter entrance */
        "letter-in": {
          "0%":   { opacity: "0", transform: "translateY(40%)" },
          "60%":  { opacity: "1", transform: "translateY(-6%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Grain pulse for hero background */
        "grain-pulse": {
          "0%, 100%": { opacity: "0.02" },
          "50%":      { opacity: "0.05" },
        },
        /* Red accent line grows on project-row hover */
        "accent-grow": {
          "0%":   { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "letter-in":      "letter-in 520ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "grain-pulse":    "grain-pulse 4s ease-in-out infinite",
        "accent-grow":    "accent-grow 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;        "caption":  ["0.8125rem", { lineHeight: "1.5" }], // 13px
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
