import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import { projects } from "@/data/projects";

const WorkSection = () => {
  return (
    <Section id="work">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Eyebrow className="mb-4">01 — Selected Work</Eyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display leading-[1.05]"
            style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
          >
            {projects.length} projects. One system of thinking.
          </motion.h2>
        </div>
        <Eyebrow>© 2024–2026</Eyebrow>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, idx) => (
          <Link
            to={`/work/${project.slug}`}
            key={project.slug}
            className="group block border-t border-rule py-8 md:py-10 -mx-6 md:-mx-8 px-6 md:px-8 transition-colors duration-300 hover:bg-card-hover"
            data-cursor="VIEW"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              {/* Left — 7/12 */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx, duration: 0.4 }}
                className="md:col-span-7"
              >
                {/* Row meta: eyebrow + status on same line */}
                <div className="flex items-center gap-3 mb-4">
                  <Eyebrow>{project.eyebrow}</Eyebrow>
                  {project.status && (
                    <>
                      <span className="text-ink-30">·</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-60">
                        {project.status}
                      </span>
                    </>
                  )}
                </div>

                <h3
                  className="font-display text-ink leading-[1.1] mb-3 tracking-[-0.015em]"
                  style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                >
                  {project.headline}
                </h3>

                {/* Full description — reads from `body`, the actual field in projects.ts */}
                <p className="font-sans font-light text-[15px] text-ink-60 leading-[1.6] max-w-[560px] mb-5">
                  {project.body}
                </p>

                {/* Meta row: role · timeline · isLive flag */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] bg-tag border border-tag rounded-full px-3 py-1 text-ink-60">
                    {project.role}
                  </span>
                  <span className="font-mono text-[11px] bg-tag border border-tag rounded-full px-3 py-1 text-ink-60">
                    {project.timeline}
                  </span>
                  {project.team && (
                    <span className="font-mono text-[11px] bg-tag border border-tag rounded-full px-3 py-1 text-ink-60">
                      {project.team}
                    </span>
                  )}
                  {project.isLive && (
                    <span className="font-mono text-[11px] text-green-500 border border-green-500/25 rounded-full px-3 py-1">
                      Live ↗
                    </span>
                  )}
                  <span className="ml-auto font-sans font-medium text-[13px] text-ink opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Read case study →
                  </span>
                </div>
              </motion.div>

              {/* Right — 5/12 */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx + 0.05, duration: 0.4 }}
                className="md:col-span-5"
              >
                <div
                  className="rounded-[6px] overflow-hidden aspect-[16/10] transition-transform duration-500"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    /* Fallback gradient if banner image fails to load */
                    background: project.gradient,
                  }}
                >
                  <img
                    src={project.banner}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                    loading={idx < 2 ? "eager" : "lazy"}
                    onError={(e) => {
                      // If image 404s, hide it so the gradient background shows through
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </Link>
        ))}

        <div className="border-t border-rule" />
      </div>
    </Section>
  );
};

export default WorkSection;
