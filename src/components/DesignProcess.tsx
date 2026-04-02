import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    name: "Research",
    description: "Talking to users before opening Figma. Understanding the system before designing it.",
  },
  {
    number: "02",
    name: "Ideation",
    description: "Sketching fast, deciding slow. Exploring 10 directions to commit to one.",
  },
  {
    number: "03",
    name: "Prototyping",
    description: "Building to think, not just to present. Code and Figma in the same week.",
  },
  {
    number: "04",
    name: "Validation",
    description: "Testing with real users, shipping with evidence, iterating with data.",
  },
];

const DesignProcess = () => {
  return (
    <section
      data-theme="dark"
      className="py-20 border-t border-rule"
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
          style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
        >
          A process built around evidence.
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="p-8 flex flex-col"
              style={{ background: "hsl(20 12% 4%)" }}
            >
              <div
                className="font-mono-label text-accent-warm mb-4 leading-none"
                style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300 }}
              >
                {step.number}
              </div>
              <div className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-60 mb-4">
                {step.name}
              </div>
              <p className="font-sans font-light text-[14px] leading-[1.8] text-ink-60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
