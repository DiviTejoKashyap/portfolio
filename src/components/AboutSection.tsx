import { useState } from "react";
import { motion } from "framer-motion";

const experience = [
  { company: "Deloitte",      role: "Analyst, Frontend & UI",   year: "2023" },
  { company: "Amazon",        role: "DART Specialist",          year: "2022" },
  { company: "NYU Tandon",    role: "M.S. Computer Science",    year: "2024 to 2026" },
  { company: "SRM Institute", role: "B.Tech EEE",               year: "2022" },
];

const skills = {
  "Product Design":     ["Figma", "Interaction Design", "User-Centered Design", "Information Architecture", "Service Blueprinting", "JTBD Methods", "Wireframing", "Prototyping", "Visual Design", "Design Systems", "Design Tokens", "Responsive Layouts", "Cross-Platform Design", "WCAG 2.1", "Inclusive Design"],
  "UX Research":        ["User Research", "Usability Testing", "Qualitative Research", "Quantitative Research", "Concept Testing", "Competitive Analysis", "Research Synthesis", "Data-Informed Design"],
  "AI for Design":      ["AI-Enabled UX", "Responsible AI Principles", "Figma AI", "Lovable.dev", "Cursor", "V0", "Claude API", "Prompt Engineering", "LLM Integration"],
  "Design Engineering": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS", "Storybook", "Component Libraries", "GitHub", "Vercel"],
  "Strategy & Tools":   ["Experimentation Frameworks", "Notion", "Miro", "VS Code", "Git"],
};


const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const AboutSection = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="info" className="w-full border-t border-rule">
      <div className="container-wide py-10 md:py-14">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-3 mb-8 md:mb-12"
        >
          <span className="italic-flourish text-burgundy" style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}>
            about me
          </span>
          <span className="deco-asterisk" style={{ fontSize: "22px" }} aria-hidden="true">*</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT — portrait + greeting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            {/* Portrait tile */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                maxWidth: "390px",
                borderRadius: "22px",
                border: "1px solid hsl(var(--rule))",
                boxShadow: "var(--sh-lift)",
                background: "hsl(var(--bg-alt))",
                marginBottom: "20px",
              }}
            >
              {!imgFailed && (
                <img
                  src="/tejo_portrait.png"
                  alt="Tejo Kashyap Divi"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 38%",
                    display: "block",
                    transform: "scale(1.08)",
                    transformOrigin: "center 38%",
                  }}
                  onError={() => setImgFailed(true)}
                />
              )}
              {imgFailed && (
                <div
                  className="absolute inset-0 flex items-center justify-center font-display text-burgundy pointer-events-none"
                  style={{
                    fontSize: "clamp(48px, 7vw, 96px)",
                    fontVariationSettings: '"opsz" 120',
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                >
                  TKD
                </div>
              )}
            </div>
            {/* Big italic greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="font-display-italic text-ink mt-8"
              style={{
                fontSize: "clamp(20px, 2.6vw, 36px)",
                lineHeight: "0.97",
                letterSpacing: "-0.025em",
                fontVariationSettings: '"opsz" 52',
              }}
            >
              Hi, I'm Tejo!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-5 text-[16px] md:text-[17px] leading-[1.7] text-ink max-w-[460px]"
            >
              I started as an EEE engineer, moved into software at{" "}
              <span className="text-burgundy">Deloitte</span> and{" "}
              <span className="text-burgundy">Amazon</span>, and kept gravitating
              toward the layer between the system and the person using it. Now at
              NYU Tandon finishing my M.S. in CS, building that layer on purpose.
            </motion.p>
          </motion.div>

          {/* RIGHT — experience, skills, contacts */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-12"
          >
            {/* Experience */}
            <motion.div variants={rowVariant}>
              <p className="italic-flourish text-burgundy mb-5" style={{ fontSize: "clamp(15px, 1.8vw, 20px)" }}>
                experience
              </p>
              <ul className="space-y-0">
                {experience.map((exp) => (
                  <li
                    key={exp.company}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="text-[15px] font-medium text-ink">{exp.company}</span>
                      <span className="text-[13px] text-ink-60">{exp.role}</span>
                    </div>
                    <span className="font-mono-label text-ink-60 shrink-0" style={{ fontSize: "11px", letterSpacing: "0.04em" }}>
                      {exp.year}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Skills */}
            <motion.div variants={rowVariant}>
              <p className="italic-flourish text-burgundy mb-5" style={{ fontSize: "clamp(15px, 1.8vw, 20px)" }}>
                skills
              </p>
              <dl className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="flex flex-col sm:flex-row sm:gap-6">
                    <dt
                      className="font-mono-label text-ink-60 shrink-0 mb-1 sm:mb-0"
                      style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", minWidth: "160px" }}
                    >
                      {category}
                    </dt>
                    <dd className="text-[14px] md:text-[15px] text-ink leading-[1.7]">
                      {items.join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
