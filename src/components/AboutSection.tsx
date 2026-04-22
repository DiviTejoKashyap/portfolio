import { motion } from "framer-motion";

const tools = [
  "Figma",
  "Framer",
  "React",
  "Tailwind",
  "Prototyping",
  "Wireframing",
  "Systems thinking",
  "Usability",
];

const timeline = [
  {
    title: "NYU Tandon",
    meta: "M.S. Computer Science / 2024—2026",
  },
  {
    title: "Deloitte",
    meta: "Analyst / frontend + UX-adjacent problem solving",
  },
  {
    title: "Amazon",
    meta: "Ops + systems exposure / speed, clarity, scale",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="app-shell pt-0">
      <div className="bento-grid">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass col-span-12 lg:col-span-5 section-pad hover-lift min-h-[520px]"
        >
          <div className="eyebrow">About</div>
          <div className="mt-5">
            <h2 className="display-lg max-w-[8ch]">
              Product designer with an engineer brain.
            </h2>
            <p className="mt-5 text-lg muted">
              I care about clean interaction logic, sharp visual hierarchy, and
              interfaces that don’t collapse the second real complexity shows up.
            </p>
          </div>

          <div className="mt-8 glass-soft p-4">
            <div className="kicker">Quick read</div>
            <p className="mt-3 text-sm muted">
              I move between UX thinking, visual systems, and implementation.
              Basically: not just pretty screens. Actual product behavior.
            </p>
          </div>

          <div className="mt-8">
            <div className="eyebrow mb-3">Core strengths</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="pill">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          viewport={{ once: true }}
          className="glass-soft col-span-12 lg:col-span-3 section-pad hover-lift min-h-[520px]"
        >
          <div className="eyebrow">Profile</div>
          <div className="mt-5 project-thumb tall flex items-end p-5">
            <div>
              <div className="kicker">Portrait</div>
              <div className="mt-1 text-white text-2xl font-semibold tracking-[-0.04em]">
                TD
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="kicker">Based in</div>
              <div className="mt-1 text-white">Jersey City</div>
            </div>
            <div>
              <div className="kicker">Looking for</div>
              <div className="mt-1 text-white">Product Design / UI UX / Design Systems</div>
            </div>
            <div>
              <div className="kicker">Edge</div>
              <div className="mt-1 text-white">Design + implementation literacy</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          viewport={{ once: true }}
          className="glass-soft col-span-12 lg:col-span-4 section-pad hover-lift min-h-[520px]"
        >
          <div className="eyebrow">Timeline</div>
          <div className="mt-5 space-y-4">
            {timeline.map((item, index) => (
              <div key={item.title} className="glass-soft p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="mt-1 text-sm muted">{item.meta}</div>
                  </div>
                  <div className="pill">{String(index + 1).padStart(2, "0")}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mini-divider my-5" />

          <div>
            <div className="eyebrow">Now / Next</div>
            <p className="mt-3 text-sm muted">
              Building stronger case studies, refining execution quality, and
              positioning for recruiters who want product taste plus systems rigor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;