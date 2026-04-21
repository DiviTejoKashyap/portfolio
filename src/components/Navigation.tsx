import { useEffect, useState } from "react";

type Theme = "light" | "dark";

type NavigationProps = {
  theme?: Theme;
  onToggleTheme?: () => void;
};

/**
 * Navigation — minimal fixed top bar.
 *
 * Left: name/monogram link to home.
 * Right: work / about / contact anchors + sun/moon theme toggle.
 *
 * The toggle reads optional props from the parent useTheme hook. If not
 * provided, it manages its own data-theme attribute on <html> so the
 * component works standalone too.
 */
const Navigation = ({ theme: propTheme, onToggleTheme }: NavigationProps) => {
  const [localTheme, setLocalTheme] = useState<Theme>("light");

  // If parent isn't passing theme, we self-manage and reflect OS preference
  // on first mount.
  useEffect(() => {
    if (propTheme !== undefined) return;
    const stored = typeof window !== "undefined"
      ? (localStorage.getItem("theme") as Theme | null)
      : null;
    const prefersDark = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setLocalTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, [propTheme]);

  const activeTheme: Theme = propTheme ?? localTheme;

  const toggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
      return;
    }
    const next: Theme = activeTheme === "dark" ? "light" : "dark";
    setLocalTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  const isDark = activeTheme === "dark";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 bg-page/80 backdrop-blur-sm border-b border-rule"
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink hover:text-accent-warm transition-colors"
        >
          Tejo K. Divi
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#work"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-60 hover:text-ink transition-colors hidden sm:inline"
          >
            Work
          </a>
          <a
            href="#about"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-60 hover:text-ink transition-colors hidden sm:inline"
          >
            About
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-60 hover:text-ink transition-colors hidden sm:inline"
          >
            Contact
          </a>

          {/* Sun/moon toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center text-ink-60 hover:text-ink transition-colors"
          >
            {isDark ? (
              /* Sun icon — shown when we're currently dark, click to go light */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              /* Moon icon — shown when we're currently light, click to go dark */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
