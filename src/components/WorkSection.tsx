import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const WorkSection = () => {
  return (
    <section id="work" className="py-20 px-6 md:px-10 max-w-[1100px] mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-3"
          >
            01 — SELECTED WORK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display leading-tight"
            style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
          >
            {projects.length} projects. One system of thinking.
          </motion.h2>
        </div>
        <span className="font-mono-label text-[10px] text-ink-30 uppercase tracking-[0.18em]">
          © 2022–2025
        </span>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, idx) => (
          <Link
            to={`/work/${project.slug}`}
            key={project.slug}
            className="block border-t border-rule py-12 hover:bg-card-hover transition-colors duration-250 -mx-6 px-6 md:-mx-10 md:px-10"
            data-cursor="VIEW"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Left 55% */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="md:w-[55%] flex flex-col justify-center"
              >
                <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 mb-3">
                  {project.eyebrow}
                </span>
                <h3
                  className="font-display text-ink leading-[1.1] mb-4"
                  style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
                >
                  {project.headline}
                </h3>
                <p className="font-sans font-light text-[14px] text-ink-60 leading-[1.7] max-w-[400px] mb-5 line-clamp-2">
                  {project.problem}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="font-mono-label text-[10px] bg-tag border border-tag rounded-full px-3 py-1 text-ink-60">
                    {project.role}
                  </span>
                  <span className="font-mono-label text-[10px] bg-tag border border-tag rounded-full px-3 py-1 text-ink-60">
                    {project.timeline}
                  </span>
                  {project.isLive && (
                    <span className="font-mono-label text-[10px] text-green-500 border border-green-500/25 rounded-full px-3 py-1">
                      LIVE ↗
                    </span>
                  )}
                </div>
                <span className="font-sans font-medium text-[13px] text-ink hover:underline">
                  Read case study →
                </span>
              </motion.div>

              {/* Right 45% */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx + 0.1, duration: 0.5 }}
                className="md:w-[45%]"
              >
                <div
                  className="rounded-2xl overflow-hidden aspect-[16/10] hover:scale-[1.02] transition-transform duration-400"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
                >
                  <img
                    src={project.banner}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
