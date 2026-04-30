import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("kd-theme") as Theme) ?? "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kd-theme", theme);
  }, [theme]);

  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = theme === "light" ? "dark" : "light";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      root.classList.add("theme-transitioning");
    }

    // rAF ensures the browser paints the transition class before data-theme
    // changes, so CSS transitions are already set up when colors switch.
    requestAnimationFrame(() => {
      root.dataset.theme = next;
      localStorage.setItem("kd-theme", next);
      setTheme(next);

      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 650);
    });
  };

  return { theme, toggle };
}
