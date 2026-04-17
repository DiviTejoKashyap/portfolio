import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";

/**
 * Copy strategy: each step now carries ONE specific skill signal as lived proof.
 * 01 Research → "embedded with eng" (collaboration signal)
 * 02 Decisions → "Figma variables" (tool proficiency, specific)
 * 03 Prototype → "code + Figma in the same week" (frontend signal)
 * 04 Ship → "paired through implementation" (handoff signal)
 *
 * None of these are claims. All are procedural descriptions of HOW Kashyap works.
 * Recruiters infer the skill; they don't read it from a list.
 */
const steps = [
  {
    number: "01",
    name: "Research",
    description:
      "Sit with engineers and users before opening Figma. Map the system constraints first — what's cheap to change, what's expensive, what's decided.",
  },
  {
    number: "02",
    name: "Decisions",
    description:
      "Explore 10 directions in Figma. Commit to one with a written rationale. Variables and tokens wired so the prototype behaves like the shipped product.",
  },
  {
    number: "03",
    name: "Prototype",
    description:
      "Build to think. High-fidelity Figma on Monday, React prototype on Thursday — whichever answers the question faster wins.",
  },
  {
    number: "04",
    name: "Ship",
    description:
      "Pair with engineers through implementation. Review PRs, tune tokens, own the final pixel. Design doesn't end at handoff.",
  },
];

const DesignProcess = () => {
  return (
    <Section inverted size="md">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Eyebrow tone="ink" className="mb-4">— How I Work</Eyebrow>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-ink leading-[1.05] mb-12 md:mb-16 max-w-[720px]"
        style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
      >
        A process built around evidence — not decks.
      </motion.h2>

      {/* 1px grid separators — the negative space IS the line */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: "hsl(36 18% 93% / 0.08)" }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * idx }}
            className="p-7 md:p-8 flex flex-col"
            style={{ background: "hsl(20 12% 4%)" }}
          >
            <div
              className="font-display text-accent-warm mb-5 leading-none"
              style={{ fontSize: "clamp(32px, 3vw, 44px)" }}
            >
              {step.number}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
              {step.name}
            </div>
            <p className="font-sans font-light text-[14px] leading-[1.65] text-ink-60">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default DesignProcess;
