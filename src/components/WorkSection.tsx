import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const WorkSection = () => {
  return (
    <section id="work" className="app-shell pt-0">
      <div className="glass section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Selected work</div>
            <h2 className="display-lg mt-3">Case studies & product explorations</h2>
          </div>
          <div className="pill">Dense, clean, premium</div>
        </div>

        <div className="mt-8 space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass-soft section-pad hover-lift"
            >
              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pill">0{index + 1}</span>
                    <span className="pill">{project.eyebrow}</span>
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="display-md mt-5 max-w-[16ch]">{project.title}</h3>
                  <p className="mt-3 text-base muted max-w-[70ch]">
                    {project.subtitle}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div className="glass-soft p-4">
                      <div className="eyebrow">Problem</div>
                      <p className="mt-3 text-sm muted">{project.problem}</p>
                    </div>
                    <div className="glass-soft p-4">
                      <div className="eyebrow">Outcome</div>
                      <p className="mt-3 text-sm muted">{project.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={`/case-study/${project.slug}`} className="cta">
                      Open case study
                    </Link>
                    {project.isLive && (
                      <a
                        href={project.previewFile}
                        target="_blank"
                        rel="noreferrer"
                        className="cta-secondary"
                      >
                        Live preview
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="project-thumb hover-lift p-4 flex items-end">
                    <div>
                      <div className="kicker">Preview</div>
                      <div className="mt-1 text-white font-medium">
                        Interface system
                      </div>
                    </div>
                  </div>
                  <div className="project-thumb tall hover-lift p-4 flex items-end">
                    <div>
                      <div className="kicker">Flow</div>
                      <div className="mt-1 text-white font-medium">
                        UX architecture
                      </div>
                    </div>
                  </div>
                  <div className="project-thumb wide hover-lift col-span-2 p-4 flex items-end">
                    <div>
                      <div className="kicker">Impact</div>
                      <div className="mt-1 text-white font-medium">
                        Product narrative + polished execution
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;