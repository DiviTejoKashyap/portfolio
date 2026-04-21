import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import Spec from "./Spec";

const experience = [
  { company: "Deloitte",      role: "Analyst, Frontend & UI",  year: "2023" },
  { company: "Amazon",        role: "DART Specialist",         year: "2022" },
  { company: "NYU Tandon",    role: "M.S. Computer Science",   year: "2024 to 2026" },
  { company: "SRM Institute", role: "B.Tech EEE",              year: "2022" },
];

const aboutSpecs = [
  { n: 1, text: "years shipping: 3 · currently 2 projects in parallel" },
  { n: 2, text: "research interviews run: 40+ across 6 projects" },
  { n: 3, text: "engineering PRs reviewed: every component I've shipped" },
];

const AboutSection = () => {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5"
        >
          <Eyebrow className="mb-4">About</Eyebrow>
          <h2
            className="font-display leading-[1.0] mb-8 tracking-[-0.02em]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 500 }}
          >
            Designing the interface between{" "}
            <span className="font-display-italic text-accent-warm">AI</span>{" "}
            and human{" "}
            <span className="font-display-italic text-accent-warm">
              decision-making.
            </span>
          </h2>

          <p className="font-sans font-light text-[16px] text-ink-60 leading-[1.7] max-w-[440px] mb-10">
            I started as an EEE engineer. Moved into software at Deloitte and
            Amazon. Kept gravitating toward the layer between the system and the
            person using it. Now I'm at NYU Tandon finishing my M.S. in CS, and
            I'm building that layer on purpose.
          </p>

          <div className="space-y-3">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="flex items-baseline justify-between gap-4 border-b border-rule pb-3"
              >
                <div>
                  <p className="font-sans font-medium text-[14px] text-ink">
                    {exp.company}
                  </p>
                  <p className="font-sans font-light text-[13px] text-ink-60 mt-0.5">
                    {exp.role}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 shrink-0">
                  {exp.year}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="md:col-span-7"
        >
          <Eyebrow className="mb-4">How I work</Eyebrow>
          <h3
            className="font-display leading-[1.15] mb-8 tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 500 }}
          >
            A product designer who ships alongside the engineers building it.
          </h3>

          <div className="space-y-8 font-sans font-light text-[16px] text-ink-60 leading-[1.75] max-w-[600px]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Embedded, not thrown over the wall
              </p>
              <p>
                I work as an embedded designer inside engineering-led teams. I
                sit in standups. I review PRs. I write production CSS when it's
                faster than documenting it. On Vault, I paired with three
                engineers through the whole implementation phase and wrote the
                Tailwind tokens the team shipped with.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Figma as a thinking tool, not a delivery format
              </p>
              <p>
                My prototypes aren't demos. They're decisions, made visible. I
                use Figma variables to drive state, auto-layout to enforce the
                grid, and component properties so the file behaves like the
                product. When the prototype and the shipped build disagree, I
                fix the prototype.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Full process, two or three projects at a time
              </p>
              <p>
                I run research. I own the UI. I see the work through to
                shipped. Usually two or three projects in parallel. Right now
                Vault and Pulse are both live. Prioritization is part of the
                job, not a distraction from it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Spec items={aboutSpecs} className="mt-12 md:mt-16 border-t border-rule pt-6" />
    </Section>
  );
};

export default AboutSection;
