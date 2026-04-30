import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("kd-theme") as Theme) ?? "light";
    }
    return "light";
  });

  // Drives the overlay fade — true for ~520ms around the color flip
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kd-theme", theme);
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("kd-theme", next);
      setTheme(next);
      return;
    }

    // 1. Start overlay fade-in
    setSwitching(true);

    // 2. Flip colors after the overlay is half-opaque (~120ms)
    window.setTimeout(() => {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("kd-theme", next);
      setTheme(next);
    }, 120);

    // 3. Fade overlay back out
    window.setTimeout(() => {
      setSwitching(false);
    }, 520);
  };

  return { theme, toggle, switching };
}
