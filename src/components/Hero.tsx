import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";

const headlineLines = [
  "Designing systems",
  "that think,",
  "and interfaces",
  "that feel.",
];

/**
 * Proof-by-affiliation row. Replaces the CountUp stats.
 * Recruiters read this in <1s. Swap logos for <img> when you have optimized SVGs.
 * For now using wordmarks in font-display to keep the editorial tone consistent.
 */
const affiliations = [
  { name: "Deloitte", context: "Analyst · 2023" },
  { name: "Amazon",   context: "DART · 2022" },
  { name: "NYU Tandon", context: "M.S. CS · '24–'26" },
];

const Hero = () => {
  return (
    <Section size="lg" divider={false} className="pt-28 md:pt-32">
      {/* Eyebrow row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center gap-4 mb-10"
      >
        <Eyebrow className="whitespace-nowrap">
          — Product Designer & Design Engineer
        </Eyebrow>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px bg-ink/[0.08] flex-1"
        />
        <Eyebrow className="whitespace-nowrap hidden md:block">
          NYC · NYU Tandon · '26
        </Eyebrow>
      </motion.div>

      {/* Headline */}
      <div className="mb-10 md:mb-12">
        {headlineLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
          >
            <h1
              className="font-display leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(56px, 8.5vw, 112px)" }}
            >
              {line === "that feel." ? (
                <span className="text-accent-warm">{line}</span>
              ) : line === "Designing systems" ? (
                <>
                  Designing{" "}
                  <span className="relative inline-block">
                    systems
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-3"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 8 C50 2, 150 2, 198 8"
                        stroke="hsl(var(--accent-warm))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </>
              ) : (
                line
              )}
            </h1>
          </motion.div>
        ))}
      </div>

      {/* Sub row — intro + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between gap-8"
      >
        {/*
          Intro copy — threads THREE required skill signals naturally:
          • "embedded with engineers" (embedded designer)
          • "ship code alongside Figma files" (frontend + handoff)
          • "full process" (research → ship)
          No bullet list. Just prose a recruiter reads in 6 seconds.
        */}
        <p className="font-sans font-light text-[17px] text-ink-60 leading-[1.7] max-w-[460px]">
          I'm Tejo — a product designer embedded with engineering teams. I run
          research, own the UI, and ship code alongside the Figma file. M.S. CS at
          NYU Tandon. Previously at Deloitte and Amazon.
        </p>
        <div className="flex flex-col gap-4 shrink-0">
          <a
            href="#work"
            className="font-sans font-semibold text-[14px] text-ink border-b-[1.5px] border-ink hover:text-accent-warm hover:border-accent-warm transition-colors w-fit"
            data-cursor="VIEW"
          >
            See the work ↓
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 hover:text-ink transition-colors w-fit"
            data-cursor="OPEN"
          >
            Download CV →
          </a>
        </div>
      </motion.div>

      {/*
        Affiliation row — replaces the CountUp stats.
        Proof by association. Recruiter sees three trusted names in 1 second.
        Horizontal rule above establishes it as a distinct zone, not hero noise.
      */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-16 border-t border-rule pt-8"
      >
        <Eyebrow className="mb-6">Previously & Currently</Eyebrow>
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {affiliations.map((a, i) => (
            <div
              key={a.name}
              className={i > 0 ? "md:border-l md:border-rule md:pl-8" : ""}
            >
              <p className="font-display text-[24px] md:text-[28px] leading-none text-ink">
                {a.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 mt-2">
                {a.context}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Hero;
