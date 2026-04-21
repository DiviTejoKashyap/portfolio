import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hero — full-viewport, asymmetric, bounce-in letters.
 * Per brief: 100vh, EB Garamond at 180px+, no centered container,
 * headline left (60px from edge), stats right (absolute).
 * Letters animate in individually with back-out overshoot easing.
 */

const HEADLINE = "Designing systems that think.";
const STATS = [
  { value: "2.4M", label: "Requests / day monitored" },
  { value: "128",  label: "Components shipped" },
  { value: "8",    label: "Weeks zero to production" },
  { value: "5mo+", label: "Daily-active personal build" },
];

function Letters({ text }: { text: string }) {
  // Split into words so whitespace stays natural, then individual chars.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <h1
      className="font-display text-hero tracking-tightest text-ink"
      style={{ fontWeight: 400 }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.22em" }}>
          {word.split("").map((ch, ci) => {
            const i = charIndex++;
            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  animation: ready
                    ? `letter-in 520ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 30}ms both`
                    : undefined,
                  opacity: ready ? undefined : 0,
                }}
                aria-hidden="true"
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* Pulsing grain */}
      <div className="grain-bg" />

      {/* Content — left-aligned, 60px from left edge per brief */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        {/* Top row — eyebrow, date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 0.3 }}
          className="flex items-center justify-between pt-8 md:pt-10"
          style={{ paddingLeft: "clamp(24px, 4vw, 60px)", paddingRight: "clamp(24px, 4vw, 60px)" }}
        >
          <span className="eyebrow">— Product Designer & Design Engineer</span>
          <span className="eyebrow hidden md:block">NYC · NYU Tandon · '26</span>
        </motion.div>

        {/* Middle — asymmetric split */}
        <div
          className="flex-1 flex items-center"
          style={{ paddingLeft: "clamp(24px, 4vw, 60px)", paddingRight: "clamp(24px, 4vw, 60px)" }}
        >
          <div className="grid grid-cols-12 gap-6 w-full items-end">
            {/* Headline — 8/12 (70% per brief rounded to grid) */}
            <div className="col-span-12 lg:col-span-8">
              <Letters text={HEADLINE} />

              {/* Sub-line below headline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.35 }}
                className="mt-8 md:mt-10 max-w-[520px] text-body-lg text-ink-60"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
              >
                Tejo — product designer embedded with engineering teams. Research,
                UI, shipped code alongside the Figma file. M.S. CS at NYU Tandon.
                Previously at Deloitte and Amazon.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.35 }}
                className="mt-10 flex gap-6 items-center"
              >
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-mono uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{
                    background: "hsl(var(--ink))",
                    color: "hsl(var(--bg))",
                    fontWeight: 500,
                  }}
                  data-cursor-hot
                >
                  See the work →
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-mono uppercase tracking-[0.12em] text-ink-60"
                  data-cursor-hot
                >
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* Stats — 4/12 (right column, asymmetric) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="col-span-12 lg:col-span-4 hidden lg:block"
            >
              <div className="border-t border-rule pt-6">
                <div className="eyebrow mb-6">Selected numbers</div>
                <dl className="space-y-5">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                      <dt
                        className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-60"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {s.label}
                      </dt>
                      <dd
                        className="font-display text-ink"
                        style={{ fontSize: "clamp(24px, 2vw, 32px)", fontWeight: 500 }}
                      >
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row — affiliations, scroll marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.35 }}
          className="flex items-end justify-between pb-8 md:pb-10"
          style={{ paddingLeft: "clamp(24px, 4vw, 60px)", paddingRight: "clamp(24px, 4vw, 60px)" }}
        >
          <div className="flex flex-wrap gap-x-8 gap-y-2 items-baseline">
            <span className="eyebrow">Previously</span>
            <span className="text-[14px] font-mono text-ink">Deloitte</span>
            <span className="text-[14px] font-mono text-ink">Amazon</span>
            <span className="text-[14px] font-mono text-ink-60">NYU Tandon</span>
          </div>
          <span className="eyebrow hidden md:block">Scroll ↓</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
