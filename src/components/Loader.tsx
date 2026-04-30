import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LoaderProps {
  onDone:    () => void;
  onReveal?: () => void; // fires when the exit slide begins, so Hero can start revealing
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const Loader = ({ onDone, onReveal }: LoaderProps) => {
  const reduce = useReducedMotion();
  const [count,   setCount]   = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Skip loader entirely for reduced-motion users
    if (reduce) { onReveal?.(); onDone(); return; }

    const totalDuration = 1100;
    const intervalMs    = 18;
    const steps         = totalDuration / intervalMs;
    let step            = 0;

    const timer = setInterval(() => {
      step++;
      const raw = step / steps;
      setCount(Math.min(100, Math.round(easeOutCubic(raw) * 100)));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onReveal?.(); // Hero can start animating as the slide begins
          setExiting(true);
        }, 80);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnimationComplete = useCallback(() => {
    if (exiting) onDone();
  }, [exiting, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex flex-col justify-end"
      style={{ background: "hsl(var(--bg))", padding: "clamp(24px, 4vw, 56px)" }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Name reveal */}
      <div style={{ overflow: "hidden", marginBottom: "clamp(20px, 3vw, 36px)" }}>
        <motion.div
          className="font-display text-ink"
          style={{
            fontSize: "clamp(36px, 7vw, 96px)",
            lineHeight: "1",
            letterSpacing: "-0.03em",
          }}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Tejo Kashyap Divi
        </motion.div>
      </div>

      {/* Role line */}
      <div style={{ overflow: "hidden", marginBottom: "clamp(12px, 2vw, 20px)" }}>
        <motion.div
          className="font-mono-label text-ink-60"
          style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Product Designer · Design Engineer
        </motion.div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        <div
          className="flex items-center justify-between mb-2"
          style={{ fontSize: "11px" }}
        >
          <span className="font-mono-label text-ink-60 tracking-wider uppercase">Loading</span>
          <span
            className="font-mono-label text-ink tabular-nums"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(count).padStart(3, "0")}
          </span>
        </div>
        <div
          className="w-full overflow-hidden"
          style={{ height: "1px", background: "hsl(var(--rule))" }}
        >
          <div
            className="h-full bg-ink"
            style={{ width: `${count}%`, transition: "width 25ms linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
