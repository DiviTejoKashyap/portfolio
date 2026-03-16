import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          scrolled ? "bg-page/80 backdrop-blur-xl border-b border-rule" : ""
        }`}
      >
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-1.5" data-cursor="OPEN">
          <span className="font-sans font-bold text-[15px] text-ink">TKD</span>
          <span className="text-accent-warm text-xs align-super">°</span>
          <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 hidden sm:inline">
            · PORTFOLIO
          </span>
        </Link>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="relative font-sans text-[13px] text-ink-60 hover:text-ink transition-colors group"
              data-cursor="VIEW"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-ink group-hover:w-full transition-all duration-200" />
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Available pill */}
          <div className="hidden sm:flex items-center gap-2 border border-green-500/30 rounded-full px-3 py-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono-label text-[10px] text-ink-60">Available for work</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-ink-60 p-1"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-page flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-6 text-ink"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="font-display text-4xl text-ink hover:text-accent-warm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
