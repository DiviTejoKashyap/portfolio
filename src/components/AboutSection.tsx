import { motion } from "framer-motion";

/**
 * AboutSection — portrait left, italic greeting right per reference.
 *
 * Layout:
 *   Left (5/12): square portrait placeholder (or real image at /avatar.jpg
 *                if present, with graceful fallback to a monogram tile)
 *   Right (7/12): italic "Hi, I'm Tejo!" → intro → Experience / Skills /
 *                 Contacts in simple list format with italic section headers
 *
 * No decorative scatter here — reference keeps About calm so the Work grids
 * can be busy.
 */

const experience = [
  { company: "Deloitte",      role: "Analyst — Frontend & UI",  year: "2023" },
  { company: "Amazon",        role: "DART Specialist",          year: "2022" },
  { company: "NYU Tandon",    role: "M.S. Computer Science",    year: "2024 — 2026" },
  { company: "SRM Institute", role: "B.Tech EEE",               year: "2022" },
];

const skills = {
  design: ["Figma", "Prototyping", "Design Systems", "UX Research", "Information Architecture", "WCAG Accessibility"],
  code:   ["React", "Next.js", "TypeScript", "Framer Motion", "Storybook", "Design Tokens", "HTML/CSS"],
  stack:  ["Java", "Python", "Spring Boot", "SQL", "Git"],
};

const contacts = [
  { label: "Email",    value: "divitejokashyap@gmail.com", href: "mailto:divitejokashyap@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/divitejokashyap", href: "https://www.linkedin.com/in/divitejokashyap/" },
  { label: "CV",       value: "resume_2026.pdf",           href: "/resume.pdf" },
];

const AboutSection = () => {
  return (
    <section id="about" className="w-full border-t border-rule">
      <div className="container-wide py-20 md:py-28">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20 flex items-baseline gap-4"
        >
          <span className="italic-flourish text-burgundy text-[22px] md:text-[28px]">
            about me
          </span>
          <span className="deco-asterisk text-[24px]" aria-hidden="true">*</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-square max-w-[460px] overflow-hidden rounded-[6px] bg-page-alt">
              <img
                src="/avatar.jpg"
                alt="Tejo Kashyap Divi"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Hide the broken img, let the tile fallback (with monogram) show
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Monogram fallback — renders behind the img */}
              <div
                className="absolute inset-0 flex items-center justify-center font-display text-burgundy pointer-events-none"
                style={{ fontSize: "clamp(72px, 10vw, 140px)", fontWeight: 500 }}
                aria-hidden="true"
              >
                TKD
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="filename-label">tejo_portrait.jpg</span>
              <span className="filename-label">2026</span>
            </div>
          </motion.div>

          {/* RIGHT — greeting + lists */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Italic greeting */}
            <h2
              className="font-display-italic text-ink mb-8"
              style={{
                fontSize: "clamp(40px, 6vw, 88px)",
                lineHeight: "0.98",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Hi, I'm Tejo!
            </h2>

            <p className="text-[17px] md:text-[18px] leading-[1.7] text-ink max-w-[580px] mb-10">
              I started as an EEE engineer, moved into software at{" "}
              <span className="text-burgundy">Deloitte</span> and{" "}
              <span className="text-burgundy">Amazon</span>, and kept
              gravitating toward the layer between the system and the person
              using it. Now at NYU Tandon finishing my M.S. in CS, and building
              that layer on purpose.
            </p>

            {/* Experience */}
            <div className="mb-12">
              <div className="italic-flourish text-burgundy text-[17px] md:text-[20px] mb-5">
                experience
              </div>
              <ul className="space-y-3">
                {experience.map((exp) => (
                  <li
                    key={exp.company}
                    className="flex items-baseline justify-between gap-4 border-b border-rule pb-3"
                  >
                    <div>
                      <span className="text-[15px] md:text-[16px] font-medium text-ink">
                        {exp.company}
                      </span>
                      <span className="text-[14px] text-ink-60 ml-3">
                        {exp.role}
                      </span>
                    </div>
                    <span className="text-[13px] text-ink-60 shrink-0">{exp.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-12">
              <div className="italic-flourish text-burgundy text-[17px] md:text-[20px] mb-5">
                skills
              </div>
              <dl className="space-y-4">
                <div className="flex flex-col md:flex-row md:gap-6">
                  <dt className="text-[13px] text-ink-60 md:w-[140px] shrink-0 mb-1 md:mb-0">
                    Product Design
                  </dt>
                  <dd className="text-[15px] text-ink leading-[1.7]">
                    {skills.design.join(", ")}
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:gap-6">
                  <dt className="text-[13px] text-ink-60 md:w-[140px] shrink-0 mb-1 md:mb-0">
                    Design Engineering
                  </dt>
                  <dd className="text-[15px] text-ink leading-[1.7]">
                    {skills.code.join(", ")}
                  </dd>
                </div>
                <div className="flex flex-col md:flex-row md:gap-6">
                  <dt className="text-[13px] text-ink-60 md:w-[140px] shrink-0 mb-1 md:mb-0">
                    Core Engineering
                  </dt>
                  <dd className="text-[15px] text-ink leading-[1.7]">
                    {skills.stack.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Contacts */}
            <div>
              <div className="italic-flourish text-burgundy text-[17px] md:text-[20px] mb-5">
                contacts
              </div>
              <ul className="space-y-3">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                    <span className="text-[13px] text-ink-60 shrink-0 w-[80px]">{c.label}</span>
                    <a
                      href={c.href}
                      className="text-[15px] text-ink flex-1 text-left hover:text-cobalt"
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
