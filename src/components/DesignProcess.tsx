import { motion } from "framer-motion";

/**
 * DesignProcess — 4-column full-bleed grid.
 * • Alternating light/dark per step (light, dark, light, dark per brief).
 * • On hover: SVG border animates in via stroke-dasharray (.process-card
 *   styles in index.css).
 * • Text color shifts to accent red on hover.
 */

type Step = {
  number: string;
  name: string;
  tool: string;
  method: string;
  artifact: string;
  detail: string;
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
  },
  {
    number: "02",
    name: "Decisions",
    tool: "Figma Variables + Tokens Studio",
    method: "Three-tier token architecture",
    artifact: "Written rationale per component",
    detail:
      "Every component has a one-paragraph Figma description explaining why it exists. If I can't write it, the component doesn't exist yet.",
  },
  {
    number: "03",
    name: "Prototype",
    tool: "Figma high-fi → React on CodeSandbox",
    method: "Figma on Monday, React on Thursday",
    artifact: "Interactive flow + token parity file",
    detail:
      "When the prototype and the React build disagree, I fix the prototype. The file has to behave like the product or it's a decoration.",
  },
  {
    number: "04",
    name: "Ship",
    tool: "GitHub PR review, Linear, Slack",
    method: "Paired through implementation",
    artifact: "Shipped pixels + a post-mortem",
    detail:
      "I review the engineering PRs on my own designs. 40% of my design changes happen during the implementation phase, not before it.",
  },
];

const DesignProcess = () => {
  return (
    <section className="relative w-full border-t border-rule">
      {/* Header */}
      <div
        className="pt-20 md:pt-32 pb-12 md:pb-16"
        style={{ paddingLeft: "clamp(24px, 4vw, 60px)", paddingRight: "clamp(24px, 4vw, 60px)" }}
      >
        <span className="eyebrow mb-4">— How I Work</span>
        <h2
          className="font-display text-ink tracking-tightest mt-3 max-w-[760px]"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 1.0, fontWeight: 500 }}
        >
          A process built around evidence — not decks.
        </h2>
        <p
          className="mt-6 max-w-[520px] text-body text-ink-60"
          style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
        >
          Each step names the tool, the method, and the artifact. Hover any step to see the specific
          thing I've learned doing it.
        </p>
      </div>

      {/* 4-column grid — full-bleed, alternating backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        {steps.map((step, idx) => {
          // Alternating: light/dark/light/dark per brief
          const isDark = idx % 2 === 1;
          const bg = isDark ? "hsl(var(--ink))" : "hsl(var(--bg))";
          const fg = isDark ? "hsl(var(--bg))" : "hsl(var(--ink))";
          const dim = isDark ? "hsl(0 0% 100% / 0.5)" : "hsl(var(--ink-60))";
          const faint = isDark ? "hsl(0 0% 100% / 0.25)" : "hsl(var(--ink-30))";

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx, duration: 0.4 }}
              className="process-card group relative flex flex-col min-h-[420px] p-8 md:p-10"
              style={{ background: bg, color: fg }}
              data-cursor-hot
            >
              {/* SVG border overlay — animates in on hover */}
              <svg
                className="border-svg pointer-events-none absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 1 1 L 99.9% 1 L 99.9% 99.9% L 1 99.9% Z"
                  fill="none"
                  stroke="hsl(var(--accent-warm))"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10 flex flex-col h-full">
                {/* Step number — EB Garamond large */}
                <div
                  className="font-display leading-none mb-6 group-hover:text-accent-warm transition-colors duration-300"
                  style={{ fontSize: "clamp(40px, 3.5vw, 56px)", fontWeight: 500, color: fg }}
                >
                  {step.number}
                </div>

                <div
                  className="uppercase tracking-[0.14em] mb-8 text-[12px] group-hover:text-accent-warm transition-colors duration-300"
                  style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500, color: fg }}
                >
                  {step.name}
                </div>

                {/* Spec list — labels go bolder on hover per brief */}
                <dl className="space-y-4 mb-8">
                  <div>
                    <dt
                      className="text-[10px] uppercase tracking-[0.14em] mb-1 transition-all duration-200 group-hover:font-semibold"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: faint }}
                    >
                      Tool
                    </dt>
                    <dd className="text-[13px]" style={{ fontFamily: '"Inter", sans-serif', color: dim }}>
                      {step.tool}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="text-[10px] uppercase tracking-[0.14em] mb-1 transition-all duration-200 group-hover:font-semibold"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: faint }}
                    >
                      Method
                    </dt>
                    <dd className="text-[13px]" style={{ fontFamily: '"Inter", sans-serif', color: dim }}>
                      {step.method}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="text-[10px] uppercase tracking-[0.14em] mb-1 transition-all duration-200 group-hover:font-semibold"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: faint }}
                    >
                      Artifact
                    </dt>
                    <dd className="text-[13px]" style={{ fontFamily: '"Inter", sans-serif', color: dim }}>
                      {step.artifact}
                    </dd>
                  </div>
                </dl>

                {/* Hover reveal */}
                <div className="mt-auto overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-0 opacity-0 group-hover:max-h-[160px] group-hover:opacity-100 group-focus-within:max-h-[160px] group-focus-within:opacity-100">
                  <div className="pt-4" style={{ borderTop: `1px solid ${faint}` }}>
                    <p
                      className="text-[12px] leading-[1.6] italic"
                      style={{ fontFamily: '"Inter", sans-serif', color: dim, fontWeight: 300 }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DesignProcess;
