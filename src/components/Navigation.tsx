import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioContent } from "@/data/portfolioContent";
import { useTheme } from "@/hooks/useTheme";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const stiffEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const Navigation = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState("");
  const location = useLocation();
  const isHome   = location.pathname === "/";
  const { navigation, person } = portfolioContent;
  const { theme, toggle } = useTheme();

  // ── Active section tracking ──────────────────────────────────────
  useEffect(() => {
    const ids = ["work", "info", "contact"];
    const onScroll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 140 && bottom > 100) { setActive(id); return; }
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // ── Escape key + body lock ────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace(/^#/, "");
    setMenuOpen(false);
    if (isHome) {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      window.location.href = `/${href}`;
    }
  };

  const linkedinHref = person.links.find((l) => l.label === "LinkedIn")?.href ?? "#";
  const cvHref       = person.links.find((l) => l.label === "CV")?.href ?? "/resume.pdf";
  const railLinks    = navigation.filter((l) => l.href === "#work" || l.href === "#info");

  return (
    <>
      {/* ── Fixed chip nav ── */}
      <header className="site-nav" role="banner">
        <div className="site-nav-inner">

          {/* Brand chip */}
          <Link
            to="/"
            className="brand-chip"
            onClick={() => setMenuOpen(false)}
            aria-label="Home — Tejo Kashyap Divi"
          >
            <span className="brand-name">
              TKD<span className="brand-dot" aria-hidden="true">•</span>
            </span>
          </Link>

          {/* Center nav rail — desktop only */}
          <nav className="nav-rail" aria-label="Main navigation">
            {railLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`nav-rail-btn${activeSection === id ? " is-active" : ""}`}
                >
                  {link.label}
                </button>
              );
            })}
            {/* Contact also in rail since it's useful on desktop */}
            <button
              onClick={() => scrollTo("#contact")}
              className={`nav-rail-btn${activeSection === "contact" ? " is-active" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Right actions */}
          <div className="nav-actions">
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="action-chip"
            >
              LinkedIn&nbsp;↗
            </a>
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="action-chip"
            >
              Resume&nbsp;↗
            </a>

            <button
              className="theme-switch"
              role="switch"
              aria-checked={theme === "dark"}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              onClick={toggle}
            >
              <span className="theme-switch-icon theme-switch-sun" aria-hidden="true">☀</span>
              <span className="theme-switch-icon theme-switch-moon" aria-hidden="true">☾</span>
              <span className="theme-switch-thumb" />
            </button>

            {/* Mobile menu button — chip style */}
            <button
              className="nav-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="nav-menu-btn-lines" aria-hidden="true">
                <span
                  style={{
                    transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  style={{
                    transform:  menuOpen ? "translateY(-3px) rotate(-45deg)" : "none",
                    width:      menuOpen ? "16px" : "10px",
                  }}
                />
              </span>
              <span className="nav-menu-btn-label">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile paper sheet ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-label="Navigation menu"
            className="nav-sheet"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0 0 28px 28px)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 28px 28px)" }}
            transition={{ duration: 0.54, ease: stiffEase }}
          >
            {/* Nav links */}
            <nav
              className="nav-sheet-links"
              aria-label="Mobile navigation"
              style={{ paddingTop: "clamp(88px, 14vh, 110px)" }}
            >
              {navigation.map((link, i) => (
                <div key={link.label} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="nav-sheet-link"
                    >
                      <span className="nav-sheet-num font-mono-label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="nav-sheet-label font-display">
                        {link.label}
                      </span>
                    </button>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Sheet footer */}
            <motion.div
              className="nav-sheet-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.38, duration: 0.3 }}
            >
              {person.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="nav-sheet-ext font-mono-label"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
