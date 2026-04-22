import { motion } from "framer-motion";

const chips = [
  "Product Design",
  "UI Systems",
  "Design Engineering",
  "Framer / React",
];

const metrics = [
  { value: "4+", label: "years across product, ops, and frontend-adjacent work" },
  { value: "10+", label: "shipped case studies, concepts, and portfolio builds" },
  { value: "2026", label: "target full-time product design opportunities" },
];

const Hero = () => {
  return (
    <section className="app-shell pt-2">
      <div className="bento-grid min-h-[calc(100svh-18px)] auto-rows-[minmax(120px,auto)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="glass col-span-12 lg:col-span-8 row-span-3 section-pad flex flex-col justify-between"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="eyebrow">Tejo Kashyap Divi / Product Designer</span>
            <span className="pill">Open to full-time roles</span>
          </div>

          <div className="py-6 md:py-10">
            <h1 className="display-xl max-w-[10ch]">
              Dark, polished,
              <br />
              high-intent
              <br />
              product design.
            </h1>
            <p className="mt-6 max-w-[720px] text-lg muted">
              I build interfaces that feel premium, structured, and alive —
              where product thinking, visual systems, and front-end execution
              stop acting like separate departments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#work" className="cta">
              View work
            </a>
            <a href="#about" className="cta-secondary">
              About me
            </a>
            <a href="#contact" className="cta-secondary">
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="glass-soft col-span-12 lg:col-span-4 row-span-2 section-pad hover-lift"
        >
          <div className="eyebrow">Live status</div>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.7)]" />
            <span className="text-sm text-white">Available for 2026 roles</span>
          </div>

          <div className="mini-divider my-5" />

          <div className="space-y-4">
            <div>
              <div className="kicker">Current focus</div>
              <div className="mt-1 text-white">Product design × portfolio systems × interaction craft</div>
            </div>
            <div>
              <div className="kicker">Location</div>
              <div className="mt-1 text-white">Jersey City / New York</div>
            </div>
            <div>
              <div className="kicker">Education</div>
              <div className="mt-1 text-white">M.S. Computer Science, NYU Tandon</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="glass-soft col-span-12 lg:col-span-4 row-span-1 section-pad hover-lift"
        >
          <div className="eyebrow">Tool stack</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="pill">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.55 }}
          className="glass-soft col-span-12 lg:col-span-8 row-span-1 section-pad hover-lift"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label}>
                <div className="stat-xl">{item.value}</div>
                <p className="mt-2 text-sm muted">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;