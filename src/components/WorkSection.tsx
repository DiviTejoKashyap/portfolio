import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

/**
 * WorkSection — magazine-style per-project layout.
 *
 * Per-project structure from reference:
 *   Left column (40%): project title, "About the project:", "Result:"
 *   Right column (60%): grid of 3–4 images with varied aspect ratios,
 *     filename labels below each image
 *   Bottom-right of each project: italic "project 1", "project 2" marker
 *
 * Only the main `banner` image is guaranteed per-project. We render the
 * banner as the hero image in the grid and populate the other 2-3 tiles
 * as varied-aspect decorative echoes (gradient + label) so the layout
 * reads correctly even without additional asset files.
 */

type TileSpec = {
  src?: string;
  gradient: string;
  label: string;
  aspect: string; // tailwind aspect ratio
  span?: string;  // tailwind col/row span
};

/** Build a tile set for a given project. Banner first, then echoes. */
function buildTiles(project: (typeof projects)[number]): TileSpec[] {
  const slug = project.slug;
  return [
    {
      src: project.banner,
      gradient: project.gradient,
      label: `${slug}_hero.png`,
      aspect: "aspect-[4/3]",
      span: "col-span-2 row-span-2",
    },
    {
      gradient: project.gradient,
      label: `${slug}_02.jpeg`,
      aspect: "aspect-square",
    },
    {
      gradient: project.gradient,
      label: `${slug}_flow.jpeg`,
      aspect: "aspect-[3/4]",
    },
    {
      gradient: project.gradient,
      label: `${slug}_detail.png`,
      aspect: "aspect-square",
    },
  ];
}

const WorkSection = () => {
  return (
    <section id="work" className="relative w-full border-t border-rule">
      {/* Section heading */}
      <div className="container-wide pt-20 md:pt-28 pb-10 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-8 flex-wrap"
        >
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="italic-flourish text-burgundy text-[22px] md:text-[28px]">
                selected
              </span>
              <span className="eyebrow">work</span>
              <span className="deco-asterisk text-[24px] ml-2" aria-hidden="true">*</span>
            </div>
            <h2
              className="font-display text-ink"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              projects <span className="font-display-italic text-burgundy">(2024—26)</span>
            </h2>
          </div>
          <p className="italic-flourish text-ink-60 text-[15px] md:text-[17px] max-w-[320px]">
            a collection of shipped work — design systems, full-stack SaaS, and
            personal products built end-to-end.
          </p>
        </motion.div>
      </div>

      {/* Each project — 2-column magazine layout */}
      <div>
        {projects.map((project, idx) => {
          const tiles = buildTiles(project);
          const projectNum = String(idx + 1).padStart(2, "0");

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-t border-rule"
            >
              <div className="container-wide py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                  {/* LEFT — text column ~40% (5/12) */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="eyebrow text-cobalt">{project.eyebrow.replace(/^\d+\s*—\s*/, "")}</span>
                      {project.isLive && (
                        <span className="italic-flourish text-burgundy text-[15px]">live ↗</span>
                      )}
                    </div>

                    {/* Project title — large Playfair */}
                    <h3
                      className="font-display text-ink mb-6"
                      style={{
                        fontSize: "clamp(36px, 4.5vw, 64px)",
                        lineHeight: "0.98",
                        letterSpacing: "-0.02em",
                        fontWeight: 500,
                      }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink-60 mb-10 max-w-[480px]">
                      {project.body}
                    </p>

                    {/* About the project */}
                    <div className="mb-8 max-w-[480px]">
                      <div className="italic-flourish text-burgundy text-[15px] md:text-[17px] mb-3">
                        about the project:
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink">
                        {project.problem}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="mb-10 max-w-[480px]">
                      <div className="italic-flourish text-burgundy text-[15px] md:text-[17px] mb-3">
                        result:
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink">
                        {project.beforeAfter?.after ?? project.outcome.split(".")[0] + "."}
                      </p>
                    </div>

                    {/* Badge row — "More Like This", "Save", "Permalink" style */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                      <span className="px-3 py-1 border border-tag text-[12px] rounded">
                        {project.role}
                      </span>
                      <span className="px-3 py-1 border border-tag text-[12px] rounded">
                        {project.timeline}
                      </span>
                      <span className="px-3 py-1 border border-tag text-[12px] rounded">
                        {project.team}
                      </span>
                    </div>

                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-ink group w-fit"
                    >
                      <span className="underline underline-offset-4 decoration-1">open full case study</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>

                  {/* RIGHT — image grid ~60% (7/12), varied aspect ratios */}
                  <div className="lg:col-span-7 relative">
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {tiles.map((tile, tIdx) => (
                        <figure
                          key={tIdx}
                          className={`${tile.span ?? ""} flex flex-col gap-2`}
                        >
                          <div
                            className={`${tile.aspect} overflow-hidden rounded-[4px] transition-transform duration-400 hover:scale-[1.02] hover:shadow-sm`}
                            style={{
                              background: tile.gradient,
                              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                            }}
                          >
                            {tile.src && (
                              <img
                                src={tile.src}
                                alt={tile.label}
                                className="w-full h-full object-cover"
                                loading={idx < 2 && tIdx === 0 ? "eager" : "lazy"}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = "none";
                                }}
                              />
                            )}
                          </div>
                          <figcaption className="filename-label">{tile.label}</figcaption>
                        </figure>
                      ))}
                    </div>

                    {/* "project N" italic label — bottom-right of image grid */}
                    <div className="flex items-baseline gap-2 justify-end mt-6">
                      <span className="deco-asterisk text-[18px]" aria-hidden="true">*</span>
                      <span className="italic-flourish text-burgundy text-[18px] md:text-[22px]">
                        project {projectNum}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default WorkSection;
