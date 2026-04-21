import { motion } from "framer-motion";

/**
 * Hero — "desktop file" metaphor per reference.
 *
 * Layout:
 *   • Massive Playfair Display headline (regular weight), left-aligned.
 *   • Italic "designer" flourish overlaid asymmetrically.
 *   • Year in parentheses small below.
 *   • Scattered folder icons with filename labels ("lume_sys.fig", etc.)
 *     absolutely positioned around the headline — the "desktop" feel.
 *   • Subtle decorative asterisks/flowers for balance.
 */

type ScatterFile = {
  id: string;
  name: string;
  top: string;
  left?: string;
  right?: string;
  rotate?: number;
  color?: "cobalt" | "burgundy" | "ink";
  hiddenOnMobile?: boolean;
};

// Files scattered around the hero — each a real project filename
const scatter: ScatterFile[] = [
  { id: "1", name: "lume_sys.fig",      top: "14%", left: "6%",   rotate: -6  },
  { id: "2", name: "vault_ds.fig",      top: "22%", right: "10%", rotate: 4, color: "burgundy" },
  { id: "3", name: "sync_collab.fig",   top: "58%", left: "4%",   rotate: 3 },
  { id: "4", name: "pulse.fig",         top: "66%", right: "7%",  rotate: -5 },
  { id: "5", name: "solo_leveling.fig", top: "82%", left: "16%",  rotate: 2, color: "ink", hiddenOnMobile: true },
  { id: "6", name: "resume_2026.pdf",   top: "84%", right: "18%", rotate: -3, color: "burgundy", hiddenOnMobile: true },
];

const Hero = () => {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden min-h-screen"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="relative container-wide py-16 md:py-24 lg:py-28 min-h-screen flex flex-col">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-between mb-12 md:mb-20 relative z-10"
        >
          <span className="eyebrow">Tejo Kashyap Divi</span>
          <div className="flex items-center gap-6">
            <a href="#work" className="eyebrow">Work</a>
            <a href="#about" className="eyebrow">About</a>
            <a href="#contact" className="eyebrow">Contact</a>
          </div>
        </motion.div>

        {/* Center — headline stack */}
        <div className="relative flex-1 flex flex-col justify-center items-start py-8 md:py-16">
          {/* Decorative asterisk top-right of headline zone */}
          <span
            className="deco-asterisk absolute text-[80px] md:text-[120px] leading-none"
            style={{ top: "-4%", right: "2%" }}
            aria-hidden="true"
          >
            *
          </span>

          {/* "designer portfolio" subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-6 md:mb-8 relative z-10"
          >
            <span className="italic-flourish text-[20px] md:text-[28px] text-burgundy">
              designer
            </span>
            <span className="text-ink-60 text-[15px] md:text-[17px]">portfolio</span>
          </motion.div>

          {/* Main headline — huge, left-aligned, Playfair Display */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-ink relative z-10"
            style={{
              fontSize: "clamp(64px, 13vw, 180px)",
              lineHeight: "0.92",
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Tejo Kashyap<br />
            <span className="text-ink">Divi</span>
            {/* Italic flourish inline */}
            <span
              className="font-display-italic text-burgundy ml-3 md:ml-5 align-baseline"
              style={{ fontSize: "0.42em", fontWeight: 400 }}
            >
              (2026)
            </span>
          </motion.h1>

          {/* Subhead below */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 md:mt-12 max-w-[540px] text-[16px] md:text-[18px] leading-[1.7] text-ink-60 relative z-10"
          >
            I'm a product designer embedded with engineering teams. I run user
            research, own the UI, and ship code alongside the Figma file. M.S.
            Computer Science at NYU Tandon, previously at{" "}
            <span className="text-ink">Deloitte</span> and{" "}
            <span className="text-ink">Amazon</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 md:mt-14 flex flex-wrap items-center gap-5 relative z-10"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium transition-colors duration-200"
              style={{
                background: "hsl(var(--ink))",
                color: "hsl(var(--bg))",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--cobalt))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(var(--ink))"; }}
            >
              See selected work →
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-ink-60"
            >
              Download CV ↗
            </a>
          </motion.div>
        </div>

        {/* Scattered folders with filenames — desktop metaphor */}
        {scatter.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
            className={`absolute flex flex-col items-center gap-2 pointer-events-none ${
              file.hiddenOnMobile ? "hidden md:flex" : ""
            }`}
            style={{
              top: file.top,
              left: file.left,
              right: file.right,
              transform: `rotate(${file.rotate ?? 0}deg)`,
              zIndex: 1,
            }}
            aria-hidden="true"
          >
            <div
              className={`folder-icon ${
                file.color === "burgundy" ? "is-burgundy" :
                file.color === "ink"      ? "is-ink"      : ""
              }`}
            />
            <span className="filename-label whitespace-nowrap">{file.name}</span>
          </motion.div>
        ))}

        {/* Bottom status row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-end justify-between pt-12 md:pt-16 relative z-10"
        >
          <div className="flex items-baseline gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt inline-block" aria-hidden="true" />
            <span className="italic-flourish text-[15px] md:text-[18px] text-ink">
              available for Summer 2026
            </span>
          </div>
          <span className="eyebrow hidden md:block">Scroll to explore ↓</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
