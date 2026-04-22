import { motion } from "framer-motion";

const blocks = [
  {
    title: "Discover",
    body: "Clarify the problem, users, and system constraints before pushing pixels.",
  },
  {
    title: "Structure",
    body: "Map flows, information hierarchy, and interaction logic that can actually scale.",
  },
  {
    title: "Visualize",
    body: "Create interfaces with strong rhythm, premium detail, and clean decision-making.",
  },
  {
    title: "Ship",
    body: "Stay close to implementation so the final thing still feels intentional.",
  },
];

const DesignProcess = () => {
  return (
    <section className="app-shell pt-0">
      <div className="bento-grid">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass col-span-12 lg:col-span-4 section-pad min-h-[360px]"
        >
          <div className="eyebrow">Process</div>
          <h2 className="display-lg mt-4 max-w-[8ch]">
            Clear systems.
            <br />
            No fluff.
          </h2>
          <p className="mt-5 text-base muted">
            My process is less “design theater,” more “make the product smarter,
            cleaner, and easier to ship.”
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          viewport={{ once: true }}
          className="glass-soft col-span-12 lg:col-span-8 section-pad"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {blocks.map((block, index) => (
              <div key={block.title} className="glass-soft p-5 hover-lift">
                <div className="pill w-fit">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-white text-xl font-semibold tracking-[-0.04em]">
                  {block.title}
                </div>
                <p className="mt-3 text-sm muted">{block.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignProcess;