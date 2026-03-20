import { motion } from "framer-motion";

const experience = [
  { company: "Deloitte", role: "Analyst (Frontend & UI) · 2023" },
  { company: "Amazon", role: "DART Specialist · 2022" },
  { company: "NYU Tandon", role: "M.S. CS · 2024–Present" },
  { company: "SRM Institute", role: "B.Tech EEE · 2022" },
];

const skillGroups = [
  {
    label: "DESIGN",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems", "Information Architecture", "WCAG Accessibility"],
  },
  {
    label: "TOOLS",
    skills: ["Framer", "React", "Next.js", "TypeScript", "Storybook", "Design Tokens", "Analytics"],
  },
  {
    label: "METHODS",
    skills: ["Behavioral UX", "System Thinking", "Rapid Prototyping", "User Interviews", "A/B Testing"],
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-[120px] border-t border-rule px-6 md:px-10 max-w-[1100px] mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-20">
        {/* Left 45% */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-[45%]"
        >
          <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-4">
            — ABOUT
          </span>
          <h2
            className="font-display leading-[1.0] mb-8"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Designing the interface between{" "}
            <span className="text-accent-warm">AI</span> and human{" "}
            <span className="text-accent-warm">decision-making.</span>
          </h2>
          <p className="font-sans font-light text-[17px] text-ink-60 leading-[1.8] max-w-[400px] mb-6">
            I'm a product designer focused on simplifying complex systems.
          </p>
          <p className="font-sans font-light text-[15px] text-ink-50 leading-[1.8] max-w-[400px] mb-4">
            Currently exploring AI workflows, productivity tools, and automation products at NYU Tandon (M.S. CS).
          </p>
          <p className="font-sans font-light text-[15px] text-ink-50 leading-[1.8] max-w-[400px] mb-4">
            Previously built tools for task management, developer workflows, and financial tracking at Deloitte and Amazon.
          </p>
          <p className="font-sans font-light text-[15px] text-ink-50 leading-[1.8] max-w-[400px] mb-10">
            My approach combines behavioral UX, system thinking, and rapid prototyping.
          </p>

          {/* Experience grid */}
          <div className="grid grid-cols-2 gap-4">
            {experience.map((exp) => (
              <div key={exp.company}>
                <p className="font-sans font-semibold text-[14px] text-ink">{exp.company}</p>
                <p className="font-mono-label text-[10px] text-ink-30 mt-0.5">{exp.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right 55% — Skills */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="md:w-[55%]"
        >
          {skillGroups.map((group) => (
            <div key={group.label} className="mb-8">
              <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-3">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-sans text-[12px] bg-tag border border-tag rounded px-3 py-1.5 text-ink-60 hover:bg-ink hover:text-bg transition-all duration-[180ms] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
