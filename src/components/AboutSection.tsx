import { motion } from "framer-motion";

/**
 * AboutSection — true 50/50 viewport split per brief.
 * No container max-width. Left half = bio + experience.
 * Right half = "How I work" narrative on darker surface.
 */

const experience = [
  { company: "Deloitte",      role: "Analyst — Frontend & UI",  year: "2023" },
  { company: "Amazon",        role: "DART Specialist",          year: "2022" },
  { company: "NYU Tandon School of Engineering",    role: "M.S. Computer Science",    year: "2024 — 2026" },
  { company: "SRM Institute of Science and Technology", role: "B.Tech EEE",               year: "2018-2022" },
];

const AboutSection = () => {
  return (
    <section id="about" className="w-full border-t border-rule">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* LEFT — 50vw */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 lg:p-20"
          style={{ background: "hsl(var(--bg))" }}
        >
          <span className="eyebrow mb-4">— About</span>

          <h2
            className="font-display text-ink tracking-tightest mt-4 mb-8"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.0, fontWeight: 500 }}
          >
            Designing the interface between{" "}
            <span className="text-accent-warm">AI</span> and human{" "}
            <span className="text-accent-warm">decision-making</span>.
          </h2>

          <p
            className="text-[16px] leading-[1.7] text-ink-60 max-w-[440px] mb-10"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            I started as an EEE engineer, moved into software at Deloitte and
            Amazon, and kept gravitating toward the layer between the system and
            the person using it. Now at NYU Tandon finishing my M.S. in CS, and
            building that layer on purpose.
          </p>

          <div className="space-y-3 max-w-[520px]">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="flex items-baseline justify-between gap-4 border-b border-rule pb-3"
              >
                <div>
                  <p
                    className="text-[14px] text-ink"
                    style={{ fontFamily: '"Inter", sans-serif', fontWeight: 500 }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="text-[13px] text-ink-60 mt-0.5"
                    style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
                  >
                    {exp.role}
                  </p>
                </div>
                <span
                  className="text-[11px] uppercase tracking-[0.12em] text-ink-30 shrink-0"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  {exp.year}
                </span>
              </div>
            ))}
          </div>

          {/* Spec footnotes */}
          <div className="spec-row mt-12" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <span className="inline-flex items-baseline"><sup>01</sup>years shipping: 3</span>
            <span className="inline-flex items-baseline"><sup>02</sup>interviews run: 40+</span>
            <span className="inline-flex items-baseline"><sup>03</sup>prs reviewed: every component</span>
          </div>
        </motion.div>

        {/* RIGHT — 50vw, surface bg for tonal split */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="p-10 md:p-16 lg:p-20"
          style={{ background: "hsl(var(--bg-alt))" }}
        >
          <span className="eyebrow mb-4">— How I Work</span>

          <h3
            className="font-display text-ink tracking-tightest mt-4 mb-10"
            style={{ fontSize: "clamp(24px, 2.6vw, 40px)", lineHeight: 1.15, fontWeight: 500 }}
          >
            A product designer who ships alongside the engineers building it.
          </h3>

          <div className="space-y-10 max-w-[560px]">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-accent-warm mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
              >
                Embedded, not thrown over the wall
              </p>
              <p
                className="text-[16px] leading-[1.7] text-ink-60"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
              >
                I work as an embedded designer inside engineering-led teams —
                sitting in standups, reviewing PRs, writing production CSS when
                it's faster than documenting it. On Vault, I paired with three
                engineers through the entire implementation phase and authored
                the Tailwind tokens the team shipped with.
              </p>
            </div>

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-accent-warm mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
              >
                Figma as a thinking tool, not a delivery format
              </p>
              <p
                className="text-[16px] leading-[1.7] text-ink-60"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
              >
                My prototypes aren't demos — they're decisions made visible. I
                use Figma variables to drive state, auto-layout to enforce the
                grid, and component properties so the file behaves like the
                product. When a prototype and the shipped build disagree, I fix
                the prototype.
              </p>
            </div>

            <div>
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-accent-warm mb-3"
                style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
              >
                Full process, two or three projects at a time
              </p>
              <p
                className="text-[16px] leading-[1.7] text-ink-60"
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
              >
                I run user research, own the UI, and see the work through to
                shipped. Usually across two or three projects in parallel — right
                now, Vault and Pulse are live concurrently. Prioritization is
                part of the job, not a distraction from it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
