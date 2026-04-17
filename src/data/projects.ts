/**
 * Project data. One object in = one row in WorkSection + one route /work/:slug
 *
 * Conventions I'm enforcing:
 * - `problem`: max ~180 chars. No truncation in list. If you need more, write less.
 * - `headline`: active voice, names the shipped outcome, not the process.
 * - `company`: short context (e.g., "Fintech · 0→1", "Amazon · internal tool").
 *   This is what recruiters scan for first. Be specific; "Side project" is fine.
 * - `eyebrow`: category or role focus, 1–3 words max.
 */
export type Project = {
  slug: string;
  title: string;
  headline: string;
  problem: string;
  eyebrow: string;
  company?: string;   // NEW — context chip next to eyebrow
  role: string;
  timeline: string;
  isLive?: boolean;
  banner: string;     // image path — put optimized WebP in /public
};

export const projects: Project[] = [
  {
    slug: "vault",
    title: "Vault",
    eyebrow: "Fintech · 0→1",
    company: "Vault",
    headline: "A consumer banking app built around decisions, not dashboards.",
    problem:
      "Most banking apps surface balances and bury decisions. Vault flips the hierarchy — every screen starts with the next action the user needs to take.",
    role: "Product Designer",
    timeline: "6 months",
    isLive: true,
    banner: "/projects/vault-hero.webp",
  },
  {
    slug: "pulse",
    title: "Pulse",
    eyebrow: "Health · shipped",
    company: "Pulse",
    headline: "A daily health check-in that takes 12 seconds and earns trust.",
    problem:
      "Symptom trackers demand too much on day one and lose users by week two. Pulse ships a minimum viable check-in that grows with the user, not ahead of them.",
    role: "Product Designer + FE",
    timeline: "4 months",
    isLive: true,
    banner: "/projects/pulse-hero.webp",
  },
  {
    slug: "lume",
    title: "Lume",
    eyebrow: "Productivity · concept",
    company: "Self-directed",
    headline: "Reading software that respects the way people actually read.",
    problem:
      "E-readers optimize for books. Lume optimizes for articles, papers, and the 40-tab chaos between them — with a typography system that adapts to the content.",
    role: "Product Designer",
    timeline: "3 months",
    banner: "/projects/lume-hero.webp",
  },
  {
    slug: "sync",
    title: "Sync",
    eyebrow: "Internal tool",
    company: "Amazon · DART",
    headline: "Reducing a 40-click fulfillment workflow to 6 clicks.",
    problem:
      "The DART team was losing 12 minutes per exception to UI friction. I shadowed three associates, rebuilt the task model, and shipped a faster path in Q3.",
    role: "UX Designer",
    timeline: "3 months",
    banner: "/projects/sync-hero.webp",
  },
  {
    slug: "kindle-redesign",
    title: "Kindle · Reading Mode",
    eyebrow: "Redesign study",
    company: "Self-directed",
    headline: "A focus mode that removes everything the book doesn't need.",
    problem:
      "Kindle's reading view buries the good design under three decades of feature accretion. This is a pass at what the core reading surface could be in 2026.",
    role: "Product Designer",
    timeline: "2 months",
    banner: "/projects/kindle-hero.webp",
  },
  {
    slug: "instagram-redesign",
    title: "Instagram · Feed",
    eyebrow: "Redesign study",
    company: "Self-directed",
    headline: "Untangling the feed: separate surfaces for people, creators, ads.",
    problem:
      "Instagram merged three products into one scroll and lost the original thread. A design study on how to re-separate them without losing the dopamine.",
    role: "Product Designer",
    timeline: "1 month",
    banner: "/projects/instagram-hero.webp",
  },
];
