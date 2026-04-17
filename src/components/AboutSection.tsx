import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";

const experience = [
  { company: "Deloitte",      role: "Analyst — Frontend & UI",  year: "2023" },
  { company: "Amazon",        role: "DART Specialist",          year: "2022" },
  { company: "NYU Tandon",    role: "M.S. Computer Science",    year: "2024 — 2026" },
  { company: "SRM Institute", role: "B.Tech EEE",               year: "2022" },
];

/**
 * Narrative proof block — replaces the three skill-tag columns.
 *
 * Every claim ties to a specific behavior:
 * • "ship alongside engineers" → embedded designer + engineering handoff
 * • "Figma variables driving 40+ states" → Figma expertise, specific
 * • "Two or three projects in parallel" → concurrent project management
 * • "write the production CSS myself" → frontend implementation
 * • "research interviews" → full process from research to shipped
 *
 * No list. No tags. Just prose a recruiter reads once and remembers.
 */
const AboutSection = () => {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Left — 5/12 */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5"
        >
          <Eyebrow className="mb-4">— About</Eyebrow>
          <h2
            className="font-display leading-[1.0] mb-8 tracking-[-0.02em]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Designing the interface between{" "}
            <span className="text-accent-warm">AI</span> and human{" "}
            <span className="text-accent-warm">decision-making.</span>
          </h2>

          <p className="font-sans font-light text-[16px] text-ink-60 leading-[1.7] max-w-[440px] mb-10">
            I started as an EEE engineer, moved into software at Deloitte and
            Amazon, and kept gravitating toward the layer between the system and
            the person using it. Now at NYU Tandon finishing my M.S. in CS, and
            building that layer on purpose.
          </p>

          {/* Experience — 1-column list, tighter rhythm than the old 2-col grid */}
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

        {/* Right — 7/12 */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="md:col-span-7"
        >
          <Eyebrow className="mb-4">— How I Work</Eyebrow>
          <h3
            className="font-display leading-[1.15] mb-8 tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
          >
            A product designer who ships alongside the engineers building it.
          </h3>

          {/*
            Three prose blocks. Each embeds 2 required skill signals without listing them.
            This is the "show proof, not claims" section.
          */}
          <div className="space-y-8 font-sans font-light text-[16px] text-ink-60 leading-[1.75] max-w-[600px]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Embedded, not thrown over the wall
              </p>
              <p>
                I work as an embedded designer inside engineering-led teams —
                sitting in standups, reviewing PRs, writing production CSS when
                it's faster than documenting it. On Vault, I paired with three
                engineers through the entire implementation phase and authored
                the Tailwind tokens the team shipped with.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Figma as a thinking tool, not a delivery format
              </p>
              <p>
                My prototypes aren't demos — they're decisions made visible. I
                use Figma variables to drive state, auto-layout to enforce the
                grid, and component properties so the file behaves like the
                product. When a prototype and the shipped build disagree, I fix
                the prototype.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink mb-3">
                Full process, two or three projects at a time
              </p>
              <p>
                I run user research, own the UI, and see the work through to
                shipped. Usually across two or three projects in parallel — right
                now, Vault and Pulse are live concurrently. Prioritization is
                part of the job, not a distraction from it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutSection;

/* ──────────────────────────────────────────────────────────────
   END OF FILE — AboutSection.tsx
   If you see ANYTHING below this comment, delete it.
   The previous build broke because old JSX tags were left behind.
   ────────────────────────────────────────────────────────────── */
