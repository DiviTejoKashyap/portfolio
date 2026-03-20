import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    name: "Research",
    description: "Talking to users before opening Figma. User interviews, competitive audits, and behavioral mapping to understand the real problem.",
  },
  {
    number: "02",
    name: "Wireframing",
    description: "Sketching fast, deciding slow. Lo-fi flows to explore structure before committing to visual design. 10 directions to commit to one.",
  },
  {
    number: "03",
    name: "Testing",
    description: "Prototypes in front of real users before writing a line of production code. Usability testing to validate decisions with evidence.",
  },
  {
    number: "04",
    name: "Iteration",
    description: "Design is never done at handoff. Shipping, measuring, and returning to improve based on real usage data and user feedback.",
  },
  {
    number: "05",
    name: "Impact",
    description: "Every project ends with a measured outcome. Reduced time-to-complete, fewer support tickets, higher retention — not just better aesthetics.",
  },
];

const tools = ["Figma", "Framer", "React", "User Interviews", "Usability Testing", "Analytics"];

const DesignProcess = () => {
  return (
    <section
      data-theme="dark"
      className="py-[120px] border-t border-rule"
      style={{ background: "hsl(20 12% 4%)" }}
    >
      <div className="px-6 md:px-10 max-w-[1100px] mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-3"
        >
          — HOW I WORK
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-ink leading-tight mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
        >
          Design Process
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx }}
              className="p-8 flex flex-col"
              style={{ background: "hsl(20 12% 4%)" }}
            >
              <div
                className="font-mono-label text-accent-warm mb-4 leading-none"
                style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 300 }}
              >
                {step.number}
              </div>
              <div className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-60 mb-4">
                {step.name}
              </div>
              <p className="font-sans font-light text-[13px] leading-[1.8] text-ink-60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-rule flex flex-col md:flex-row md:items-center gap-4"
        >
          <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 whitespace-nowrap">
            Tools I Use
          </span>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-mono-label text-[10px] text-ink-60 border border-rule rounded-full px-3 py-1"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignProcess;
