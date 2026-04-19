import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";

/**
 * DesignProcess — earned-minimalism revision.
 *
 * The old copy said "Research: talking to users before opening Figma."
 * That's true of 90% of designers and proves nothing.
 *
 * New shape: each step names THREE things a recruiter can verify —
 *   tool     (what I use — searchable, concrete)
 *   method   (what I do — a named technique, not a verb)
 *   artifact (what I ship — not a deliverable, an output)
 *
 * And a hover reveal: one specific insight from how I actually work.
 *
 * The cursor reads `data-detail` on each step, surfacing the step's
 * spec — so hovering "Research" shows "avg: 6 interviews / 2wk embed".
 */

type Step = {
  number: string;
  name: string;
  tool: string;
  method: string;
  artifact: string;
  detail: string;   // hover reveal — specific insight
  cursor: string;   // cursor x-ray
};

const steps: Step[] = [
  {
    number: "01",
    name: "Research",
    tool: "Dovetail, Otter, Notion",
    method: "Week-in-the-life shadowing",
    artifact: "Annotated tool-switch map",
    detail:
      "I record every tool switch during a workflow session. The count is always higher than the team's estimate — usually 3×.",
    cursor: "avg: 6 interviews / 2wk",
  },
  {
    number: "02",
    name: "Decisions",
    tool: "Figma Variables + Tokens Studio",
    method: "Three-tier token architecture",
    artifact: "Written rationale per component",
    detail:
      "Every component has a one-paragraph Figma description explaining why it exists. If I can't write it, the component doesn't exist yet.",
    cursor: "3 tiers: primitive / semantic / component",
  },
  {
    number: "03",
    name: "Prototype",
    tool: "Figma high-fi → React on CodeSandbox",
    method: "Figma on Monday, React on Thursday",
    artifact: "Interactive flow + token parity file",
    detail:
      "When the prototype and the React build disagree, I fix the prototype. The file has to behave like the product or it's a decoration.",
    cursor: "parity: Figma ↔ React 100%",
  },
  {
    number: "04",
    name: "Ship",
    tool: "GitHub PR review, Linear, Slack",
    method: "Paired through implementation",
    artifact: "Shipped pixels + a post-mortem",
    detail:
      "I review the engineering PRs on my own designs. 40% of my design changes happen during the implementation phase, not before it.",
    cursor: "PRs reviewed: 100% / design-side",
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
        className="font-display text-ink leading-[1.02] tracking-[-0.02em] mb-4 max-w-[760px]"
        style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
      >
        A process built around evidence — not decks.
      </motion.h2>

      <p className="font-sans font-light text-[15px] text-ink-60 leading-[1.6] max-w-[520px] mb-12 md:mb-16">
        Each step names the tool, the method, and the artifact. Hover any step to see the specific
        thing I've learned doing it.
      </p>

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
            data-detail={step.cursor}
            className="group relative p-7 md:p-8 flex flex-col min-h-[320px] transition-colors duration-300 hover:bg-[hsl(20,12%,6%)]"
            style={{ background: "hsl(20 12% 4%)" }}
          >
            {/* Step number — editorial restraint, no glow */}
            <div
              className="font-display text-accent-warm mb-5 leading-none"
              style={{ fontSize: "clamp(32px, 3vw, 44px)" }}
            >
              {step.number}
            </div>

            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-6">
              {step.name}
            </div>

            {/*
              Tool / Method / Artifact rows — the spec sheet.
              Each row is a labeled value, reading like an equipment list.
            */}
            <dl className="space-y-3 mb-6">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-30 mb-0.5">
                  Tool
                </dt>
                <dd className="font-sans text-[12px] text-ink-60 leading-[1.5]">
                  {step.tool}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-30 mb-0.5">
                  Method
                </dt>
                <dd className="font-sans text-[12px] text-ink-60 leading-[1.5]">
                  {step.method}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-30 mb-0.5">
                  Artifact
                </dt>
                <dd className="font-sans text-[12px] text-ink-60 leading-[1.5]">
                  {step.artifact}
                </dd>
              </div>
            </dl>

            {/*
              Hover reveal — one specific insight.
              Same pattern as WorkSection diffs: max-height + opacity,
              keyboard-accessible via focus-within.
            */}
            <div
              className="mt-auto overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-0 opacity-0 group-hover:max-h-[160px] group-hover:opacity-100 group-focus-within:max-h-[160px] group-focus-within:opacity-100"
            >
              <div className="pt-4 border-t border-[hsl(36,18%,93%,0.08)]">
                <p className="font-sans font-light text-[12px] leading-[1.65] text-ink-60 italic">
                  {step.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default DesignProcess;

/* ──────────────────────────────────────────────────────────────
   END OF FILE — DesignProcess.tsx
   ────────────────────────────────────────────────────────────── */
