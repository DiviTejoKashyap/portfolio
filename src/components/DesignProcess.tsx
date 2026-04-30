import { motion } from "framer-motion";

/**
 * DesignProcess — simplified per brief ("remove or redesign — simple list,
 * not cards"). Magazine editorial column list.
 *
 * Layout: left column = italic section header + intro. Right column =
 * numbered process list with paragraph explanations. No cards, no
 * alternating backgrounds, no stroke-dasharray borders.
 */

const steps = [
  {
    number: "01",
    name: "research",
    body: "Embedded shadowing with users and engineers. Weeks-in-the-life mapping, recorded tool switches, annotated workflow diagrams. The research artifact is always a written document with a hypothesis, not a slide deck.",
  },
  {
    number: "02",
    name: "decisions",
    body: "Figma Variables and a three-tier token system drive every layout decision. Each component ships with a written rationale in the description field. If I can't write the paragraph, the component doesn't exist yet.",
  },
  {
    number: "03",
    name: "prototype",
    body: "High-fidelity Figma on Monday, React prototype on Thursday. Whichever answers the next open question faster. When prototype and shipped build disagree, I fix the prototype. Files have to behave like the product.",
  },
  {
    number: "04",
    name: "ship",
    body: "Pair with engineers through implementation. Review PRs on my own designs. Many decisions only surface during the build phase. The final pixel is part of the design process, not outside it.",
  },
];

const DesignProcess = () => {
  return (
    <section id="process" className="relative w-full border-t border-rule">
      <div className="container-wide py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — section heading column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-20 self-start"
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="italic-flourish text-burgundy text-[22px] md:text-[28px]">
                how i work
              </span>
              <span className="deco-asterisk text-[24px]" aria-hidden="true">*</span>
            </div>
            <h2
              className="font-display text-ink mb-6"
              style={{
                fontSize: "clamp(22px, 3vw, 42px)",
                lineHeight: "0.98",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              a process built around{" "}
              <span className="font-display-italic">evidence,</span><br />
              not decks.
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink-60 max-w-[420px]">
              Four steps, each with a tool I use and an artifact that comes out
              of it. The specifics matter more than the shape: names of methods,
              paragraphs of rationale, PRs I've reviewed.
            </p>
          </motion.div>

          {/* RIGHT — numbered list */}
          <div className="lg:col-span-7">
            <ol className="space-y-6 md:space-y-10">
              {steps.map((step, i) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-6 md:gap-10 border-b border-rule pb-8 md:pb-12 last:border-b-0"
                >
                  {/* Number — large Playfair */}
                  <div
                    className="font-display text-cobalt shrink-0"
                    style={{
                      fontSize: "clamp(28px, 3.6vw, 52px)",
                      lineHeight: "1",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 pt-1 md:pt-3">
                    <h3
                      className="font-display-italic text-ink mb-3"
                      style={{
                        fontSize: "clamp(18px, 2vw, 28px)",
                        lineHeight: "1.1",
                        fontWeight: 500,
                      }}
                    >
                      {step.name}
                    </h3>
                    <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink max-w-[560px]">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
