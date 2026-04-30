import { projects } from "./projects";

// ── Types ──────────────────────────────────────────────────────────────────────

export type PortfolioProject = {
  slug: string;
  index: string;
  category: string;
  title: string;
  subtitle: string;
  headline: string;
  body: string;
  tags: string[];
  role: string;
  timeline: string;
  team: string;
  status: string;
  banner: string;
  previewFile: string;
  accentColor: string;
  bgColor: string;
  gradient: string;
  overview: string;
  problem: string;
  solution: string;
  users: string;
  research: string;
  insights: string[];
  ideation: string;
  wireframes: string;
  outcome: string;
  impact: string[];
  obsession: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  cursorDetail: string;
  sections: Array<{
    type: "stat-row" | "two-col" | "full-text" | "process-steps" | "quote";
    heading?: string;
    body?: string;
    stats?: Array<{ value: string; label: string }>;
    cols?: Array<{ heading: string; body: string }>;
    steps?: Array<{ number: string; title: string; body: string }>;
    quote?: string;
    attribution?: string;
  }>;
};

export type PortfolioContent = {
  person: {
    name: string;
    role: string;
    location: string;
    availability: string;
    heroLine: string;
    intro: string;
    email: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  marquee: string[];
  about: {
    eyebrow: string;
    headline: string;
    body: string;
    skills: string[];
    timeline: Array<{
      org: string;
      role: string;
      meta: string;
    }>;
    nowNext: string;
  };
  projects: PortfolioProject[];
  footer: {
    note: string;
    copyright: string;
  };
};

// ── Derived project list ───────────────────────────────────────────────────────

const portfolioProjects: PortfolioProject[] = projects.map((project, i) => {
  const { eyebrow, sections, ...rest } = project;
  return {
    ...rest,
    index: String(i + 1).padStart(2, "0"),
    category: eyebrow.split(" — ").slice(1).join(" ").trim(),
    sections: sections as PortfolioProject["sections"],
  };
});

// ── Content ────────────────────────────────────────────────────────────────────

export const portfolioContent: PortfolioContent = {
  person: {
    name: "Tejo Kashyap Divi",
    role: "Product Designer",
    location: "Brooklyn, New York City",
    availability: "Open to product design and UX roles",
    heroLine: "I design product systems that feel sharp, useful, and built for real behavior.",
    intro:
      "Product designer working across UX, interaction design, visual systems, and front end execution. I care about the messy middle where strategy, interface details, and product behavior collide.",
    email: "divitejokashyap@gmail.com",
    links: [
      { label: "Email",    href: "mailto:divitejokashyap@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/divitejokashyap/" },
      { label: "CV",       href: "/resume.pdf" },
    ],
  },

  navigation: [
    { label: "Work",    href: "#work" },
    { label: "Info",    href: "#info" },
    { label: "Contact", href: "#contact" },
  ],

  marquee: [
    "Product Design",
    "UX Systems",
    "Interaction Design",
    "Design Engineering",
    "Case Studies",
  ],

  about: {
    eyebrow: "about me",
    headline: "Hi, I'm Tejo!",
    body: "I started as an EEE engineer, moved into software at Deloitte and Amazon, and kept gravitating toward the layer between the system and the person using it. Now at NYU Tandon finishing my M.S. in CS, building that layer on purpose.",
    skills: [
      "Figma",
      "Prototyping",
      "Design Systems",
      "UX Research",
      "Information Architecture",
      "WCAG",
      "React",
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Storybook",
      "Design Tokens",
      "Java",
      "Python",
      "Spring Boot",
      "SQL",
      "Git",
    ],
    timeline: [
      { org: "Deloitte",     role: "Analyst, Frontend & UI",   meta: "2023" },
      { org: "Amazon",       role: "DART Specialist",          meta: "2022" },
      { org: "NYU Tandon",   role: "M.S. Computer Science",    meta: "2024 to 2026" },
      { org: "SRM Institute", role: "B.Tech EEE",              meta: "2022" },
    ],
    nowNext: "Finishing M.S. at NYU Tandon. Open to product design and UX roles.",
  },

  projects: portfolioProjects,

  footer: {
    note: "Built with taste, caffeine, and way too many layout passes.",
    copyright: `© ${new Date().getFullYear()} Tejo Kashyap Divi`,
  },
};
