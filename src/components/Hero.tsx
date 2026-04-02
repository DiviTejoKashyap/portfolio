import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const headlineLines = [
  "Designing systems",
  "that think,",
  "and interfaces",
  "that feel.",
];

function CountUp({ end, suffix = "" }: { end: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericEnd = parseInt(end.replace(/[^0-9]/g, ""));
          if (isNaN(numericEnd)) {
            setValue(end);
            return;
          }
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * numericEnd).toString());
            if (progress < 1) requestAnimationFrame(animate);
            else setValue(end);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="font-mono text-[32px] font-medium text-ink">
      {value}{suffix}
    </span>
  );
}

const stats = [
  { value: "2", suffix: "+", label: "YEARS SHIPPED" },
  { value: "5", suffix: "", label: "CASE STUDIES" },
  { value: "2", suffix: "", label: "COMPANIES" },
  { value: "NYU", suffix: "", label: "M.S. CS" },
];

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-10 max-w-[1100px] mx-auto">
      {/* Eyebrow row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 whitespace-nowrap">
          — PRODUCT DESIGNER & DESIGN ENGINEER
        </span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px bg-ink/[0.08] flex-1"
        />
        <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 whitespace-nowrap hidden md:block">
          NYC · NYU TANDON · 2026
        </span>
      </motion.div>

      {/* Headline */}
      <div className="mb-12">
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

      {/* Sub row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between gap-8 mt-10"
      >
        <p className="font-sans font-light text-[17px] text-ink-60 leading-[1.7] max-w-[420px]">
          I'm Tejo — I design the product and write the code that ships it. M.S. CS
          at NYU Tandon. Previously at Deloitte and Amazon. I care about the gap
          between how something looks and how it actually works.
        </p>
        <div className="flex flex-col gap-4">
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
            className="font-mono-label text-[11px] text-ink-30 hover:text-ink transition-colors w-fit"
            data-cursor="OPEN"
          >
            Download CV →
          </a>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-16 border-t border-rule pt-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <div key={i} className={`${i > 0 ? "md:border-l md:border-rule md:pl-8" : ""}`}>
            {stat.value === "NYU" ? (
              <span className="font-mono text-[32px] font-medium text-ink">{stat.value}</span>
            ) : (
              <CountUp end={stat.value} suffix={stat.suffix} />
            )}
            <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
