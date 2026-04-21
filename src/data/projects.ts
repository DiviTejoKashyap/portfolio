export interface Project {
  slug: string;
  eyebrow: string;
  headline: string;
  body: string;
  tags: string[];
  isLive?: boolean;
  gradient: string;
  banner: string;
  previewFile: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  team: string;
  status: string;
  accentColor: string;
  bgColor: string;
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
  sections: CaseStudySection[];

  obsession: string;
  beforeAfter: { before: string; after: string };
  cursorDetail: string;
}

export interface CaseStudySection {
  type: "stat-row" | "two-col" | "full-text" | "process-steps" | "quote";
  heading?: string;
  body?: string;
  stats?: { value: string; label: string }[];
  cols?: { heading: string; body: string }[];
  steps?: { number: string; title: string; body: string }[];
  quote?: string;
  attribution?: string;
}

export const projects: Project[] = [
  {
    slug: "lume-sys",
    eyebrow: "01 / AI OBSERVABILITY",
    headline: "Lume.Sys: monitoring layer for production AI pipelines",
    body: "A full-stack AI observability platform. Surfaces latency, cost, and reliability signals across multi-model inference pipelines in real time.",
    tags: ["Product Design", "Design Engineering", "React", "TypeScript", "Supabase"],
    gradient: "linear-gradient(135deg, #0a0a08 0%, #1a1200 50%, #2a1800 100%)",
    banner: "/banners/lume-banner.png",
    previewFile: "/mockups/lume_portfolio_mockups.html",
    title: "Lume.Sys",
    subtitle: "AI Observability Platform",
    role: "Product Designer & Design Engineer",
    timeline: "Oct 2024 to Jan 2025",
    team: "Solo",
    status: "Live",
    accentColor: "#e8a427",
    bgColor: "#0a0a08",

    obsession:
      "The P99 latency chart recalculates every 30 seconds, not every frame. Saves 40% browser CPU during incidents.",
    beforeAfter: {
      before: "Charts re-rendered on every WebSocket tick. Brutal on CPU.",
      after: "Throttled to 30s cadence with a manual refresh. CPU dropped to 4 to 6%.",
    },
    cursorDetail: "grid: 12col / gutter: 24px",

    overview:
      "Production AI teams fly blind. Token costs spike, latency degrades, error rates climb, and there's no single surface showing it all at once. Lume.Sys is an observability dashboard for ML engineers managing multi-model inference pipelines.",
    problem:
      "Existing APM tools weren't built for the LLM era. They can't correlate token throughput with cost curves. They don't show P99 latency by model provider in a single view. Teams end up stitching together Datadog, spreadsheets, and custom scripts during live incidents.",
    solution:
      "A terminal-aesthetic dashboard with real-time trace streaming, provider-level health scoring, and cost attribution. Built on Supabase realtime + React with a custom charting layer.",
    users:
      "ML engineers and ML Ops teams at companies running multi-model inference in production. Specifically: the engineers on call during incidents who need to triage latency spikes, cost anomalies, and error cascades across model providers in under 30 minutes.",
    research:
      "Two weeks embedded with ML Ops teams at four companies. I shadowed incident response workflows end-to-end, recording every tool switch, every Slack escalation, every spreadsheet lookup. The pattern was clear: no single surface correlated token throughput, cost, and latency. Engineers built mental models across four plus tools under time pressure.",
    insights: [
      "Engineers spent 40% of incident response time correlating data across disconnected tools",
      "The mental model gap (thinking in prompts and tokens, seeing generic HTTP metrics) delayed triage by 22 minutes on average",
      "No existing APM tool spoke LLM. Token windows, model cold starts, provider rate limits, cost attribution. None of it was first-class anywhere",
    ],
    ideation:
      "I explored three directions. A Grafana-style modular dashboard felt generic and ignored the LLM context. A log-first table view was too narrow and missed the correlation layer. A terminal-aesthetic cockpit felt right: precise, dense, earned by the engineering audience. I went through 12 wireframe versions before the Workspace to Pipeline to Trace hierarchy clicked.",
    wireframes:
      "Early wireframes explored flat list views, nested tree structures, and card-grid layouts. I converged on a three-panel cockpit. Left sidebar as navigation. Center panel as the live trace stream. Right panel as inspector. Modeled on VS Code's layout because the audience already trusted it.",
    outcome:
      "Shipped as a live platform monitoring 2.4M requests/day across 4 model providers. Teams reported 68% reduction in time-to-detect latency regressions. Real-time cost attribution eliminated $18K/month in unattributed spend within the first billing cycle. Adopted by 3 internal teams without any onboarding documentation.",
    impact: [
      "2.4M requests monitored across 4 model providers",
      "68% reduction in time-to-detect latency regressions",
      "Real-time cost attribution eliminated $18K/mo in unattributed spend",
      "Adopted by 3 internal teams within first month",
    ],
    sections: [
      { type: "stat-row", stats: [{ value: "2.4M", label: "Requests / day" }, { value: "186ms", label: "Avg latency" }, { value: "4", label: "Model providers" }, { value: "68%", label: "Faster detection" }] },
      { type: "full-text", heading: "The Problem Space", body: "LLM inference is fundamentally different from traditional API calls. Token counts vary wildly. Model cold starts introduce unpredictable latency spikes. Rate limits create cascading failures. Standard APM tools surface generic HTTP metrics. They don't speak the language of tokens, contexts, or model routing. I spent two weeks shadowing ML engineers to map their war-room workflows during incidents." },
      { type: "two-col", cols: [{ heading: "Discovery Findings", body: "Engineers spent 40% of incident response time correlating data across tools. The mental model mismatch (thinking in prompts but seeing HTTP requests) created systematic blind spots that delayed triage by 22 minutes on average." }, { heading: "Design Principles", body: "Terminal-first aesthetics signal precision to an engineering audience. Dense information over whitespace. Every pixel earns its place. The UI should feel like a cockpit: everything visible at once, nothing hidden behind tabs." }] },
      { type: "process-steps", steps: [{ number: "01", title: "Research & Shadowing", body: "Two weeks embedded with ML Ops teams. Mapped incident response workflows. Identified data correlation pain points across 4 companies." }, { number: "02", title: "Information Architecture", body: "Designed the Workspace to Pipeline to Trace hierarchy. Three levels of zoom for investigation depth." }, { number: "03", title: "Component System", body: "Built a custom chart library with amber CRT aesthetic. Every component optimized for data density above all else." }, { number: "04", title: "Real-time Layer", body: "Supabase Realtime for WebSocket trace streaming. 30-second refresh cycle with manual override. Live UTC clock." }] },
      { type: "quote", quote: "This is the first tool that speaks our language. I can see a token spike and trace it to a specific pipeline in under 30 seconds.", attribution: "ML Ops Engineer, early adopter" },
      { type: "full-text", heading: "Reflection", body: "The terminal aesthetic is high-fidelity for engineers but creates friction for stakeholders who need cost summaries. Next version: a management view that abstracts the density into executive KPIs. Same data, completely different frame." },
    ],
  },
  {
    slug: "vault-ds",
    eyebrow: "02 / DESIGN SYSTEMS",
    headline: "Vault DS: component system for scale-stage product teams",
    body: "A production design system. 128 components, full token architecture, Storybook documentation. Built to close the gap between Figma and code.",
    tags: ["Design Systems", "Storybook", "Figma", "React", "Design Tokens"],
    gradient: "linear-gradient(135deg, #05070A 0%, #0B0E11 100%)",
    banner: "/banners/vault-banner.png",
    previewFile: "/mockups/vault_portfolio_mockups.html",
    title: "Vault DS",
    subtitle: "Production Design System",
    role: "Design Systems Lead",
    timeline: "Jun 2024 to Nov 2024",
    team: "Solo, then 2 engineers",
    status: "Internal",
    accentColor: "#3b82f6",
    bgColor: "#05070A",

    obsession:
      "A Figma to CSS build script cuts the translation step entirely. What you see is what ships.",
    beforeAfter: {
      before: "Designers exported hex; engineers re-typed them as tokens. 12hr lag per change.",
      after: "Figma Variables to JSON to CSS custom properties. 90 seconds end-to-end.",
    },
    cursorDetail: "token: ink-60 / opacity: 0.6",

    overview:
      "Scale-stage product teams ship fast and break consistency. Components drift. Tokens diverge. Every new feature becomes a negotiation about which version of a button to use. Vault DS is a design system with 128 components, a semantic token architecture, and a live audit stream dashboard.",
    problem:
      "The team had 4 different button implementations across 3 products. Color values were hardcoded. Dark mode was a patchwork. Every sprint started with the question 'which version of this component should I use' and no one had a good answer. Velocity was high. Coherence was eroding.",
    solution:
      "A systematically built component library with a token-first approach, paired with a live security audit stream dashboard that puts the system under real load.",
    users:
      "Product designers and frontend engineers at scale-stage companies (Series A to B) shipping multiple products from a shared codebase. The people who ask 'which button should I use' at the start of every sprint and get a different answer each time.",
    research:
      "A full component audit across 3 products before writing a single component. I found 23 unique button variants, 14 input patterns, 8 modal implementations, all solving the same problems differently. Root cause was cultural, not technical. No token system, no contribution guidelines, and a 'ship fast' culture that had optimized against consistency for two years.",
    insights: [
      "The real problem was governance, not tooling. Teams didn't know which component to use because there was no authoritative source",
      "Hardcoded color values made dark mode impossible to implement without rebuilding every component from scratch",
      "Figma and code had diverged so far that designers and engineers were making independent decisions. Each sprint produced new inconsistencies",
    ],
    ideation:
      "I prototyped 3 token naming conventions before choosing the three-tier semantic system. Sketched the contribution flow as a state machine before writing governance docs. Built the first 10 components in Figma and React at the same time to test whether the abstractions held across mediums.",
    wireframes:
      "I started with a component inventory map instead of UI wireframes. Charted every existing component against the proposed token system to find conflicts before building anything. The first design artifacts were token hierarchy diagrams. UI wireframes came after the token architecture was validated.",
    outcome:
      "128 components shipped with full Storybook documentation and Figma variable bindings. Adopted by 3 product teams within 6 weeks with zero breaking changes. New feature design time reduced by 40% in the first two sprints post-migration. Zero dark mode regressions across all products after full token migration.",
    impact: [
      "128 components shipped and documented in Storybook",
      "Reduced new feature design time by 40% within 2 sprints",
      "Zero regressions across dark/light mode after full token migration",
      "Adopted by 3 separate product teams with no breaking changes",
    ],
    sections: [
      { type: "stat-row", stats: [{ value: "128", label: "Components" }, { value: "3", label: "Product teams" }, { value: "40%", label: "Faster design" }, { value: "0", label: "Dark mode regressions" }] },
      { type: "full-text", heading: "Token Architecture", body: "Most design systems fail at the token layer. Vault DS uses a three-tier system: Primitive tokens (raw values), Semantic tokens (ink, ink-60, ink-30), Component tokens (button-bg, button-border). Every color decision traces back to this hierarchy. Dark mode becomes a configuration change instead of a rebuild." },
      { type: "two-col", cols: [{ heading: "Figma-Code Parity", body: "Built a custom build script that exports Figma tokens directly to CSS custom properties, eliminating the translation step. What you see in Figma is exactly what ships in code." }, { heading: "Live Audit Application", body: "The Vault DS audit stream puts the system under real load. Dense data tables, severity badges, monospaced code panels, and sidebar layouts, all built from the same token foundation." }] },
      { type: "process-steps", steps: [{ number: "01", title: "Audit & Inventory", body: "Catalogued every component across 3 products. Found 23 unique button variants, 14 input patterns, 8 modal implementations." }, { number: "02", title: "Token System Design", body: "Designed the three-tier token architecture. Established naming conventions and semantic mappings with sign-off from both leads." }, { number: "03", title: "Component Build", body: "Built 128 components in Figma with auto-layout and variable bindings. Simultaneously built the React library with full TypeScript types." }, { number: "04", title: "Migration Sprint", body: "Ran migration sprint with two engineers. Replaced all hardcoded values with token references. Zero regressions via Chromatic snapshot testing." }] },
      { type: "quote", quote: "I stopped thinking about which button to use. The system makes the decision obvious. That's when I knew it was working.", attribution: "Senior Product Designer, adopting team" },
      { type: "full-text", heading: "Reflection", body: "Design systems are governance problems disguised as technical ones. The hardest part wasn't building components. It was establishing the contribution model. I wish I'd written the governance docs before the first component, not after the tenth PR." },
    ],
  },
  {
    slug: "sync-collab",
    eyebrow: "03 / SAAS PLATFORM",
    headline: "Sync.Collab: where design teams actually get work done",
    body: "A full-stack SaaS collaboration platform. Kanban, async design review, real-time presence, and a command palette. Built from scratch in 8 weeks.",
    tags: ["Product Design", "Next.js 14", "Supabase", "Real-time", "Full-stack"],
    gradient: "linear-gradient(135deg, #FAFAF9 0%, #EEF4FF 100%)",
    banner: "/banners/sync-banner.png",
    previewFile: "/mockups/sync_portfolio_mockups.html",
    title: "Sync.Collab",
    subtitle: "Design Team Collaboration Platform",
    role: "Product Designer & Full-stack Engineer",
    timeline: "Jul 2024 to Sep 2024",
    team: "Solo",
    status: "Live",
    accentColor: "#2F6FED",
    bgColor: "#FAFAF9",

    obsession:
      "The ⌘K palette ranks results by recency plus fuzzy score. Not either one alone.",
    beforeAfter: {
      before: "Fuzzy match only. 'design' surfaced a 2-month-old board above today's active project.",
      after: "Hybrid: 0.6 fuzzy, 0.4 recency. Active work always surfaces first.",
    },
    cursorDetail: "spacing: 8pt / leading: 1.6",

    overview:
      "Design teams live across Figma, Notion, Slack, and Linear. Context fragments across all four. Sync.Collab pulls kanban project management, async design review, real-time team presence, and a command palette into a single focused interface.",
    problem:
      "The 'too many tools' problem isn't new, but design teams have a specific version of it. Feedback lives in Figma comments. Tasks live in Linear. Conversations live in Slack. And nobody knows what's actually blocking the project.",
    solution:
      "A collaboration surface built specifically for design teams. Kanban boards, async review threads with annotation pins, real-time presence, and a ⌘K command palette. Built on Next.js 14 App Router plus Supabase Realtime.",
    users:
      "Distributed design and product teams at early to mid stage companies (typically 4 to 12 people) who split their workflow across Figma, Notion, Slack, and Linear. The people who end each sprint saying 'I didn't know that was blocked'.",
    research:
      "I did week-in-the-life mapping across 6 companies. Shadowed designers from brief to handoff, recording every tool switch. The average was 4.2 tool switches per hour. Each switch carried a 30 to 90 second re-orientation penalty. That's 2 to 4 hours of cognitive overhead per designer per week, before accounting for the context lost in translation between tools.",
    insights: [
      "6 critical context-loss moments exist between design brief and engineering handoff. Each requires manual re-entry of status information into a new tool",
      "Feedback fragmentation is the core problem, not feature gaps. Teams don't need more tools. They need fewer containers for the same information",
      "The ⌘K command palette is the missing unifier. One input surface that reaches all entities without navigating between views",
    ],
    ideation:
      "I mapped 3 product scopes: narrow (async review only), medium (review plus task management), broad (full collaboration suite). Pressure-tested each against the 6 context-loss moments. Medium scope closed 4 of 6 gaps. The command palette closed the remaining 2. Built lo-fi flows for all 3 before committing.",
    wireframes:
      "Lo-fi wireframes focused on information hierarchy before visual design. What does a designer need to see first when opening the tool mid-sprint? I iterated through 3 dashboard layouts, 5 review screen arrangements, and 2 kanban structures before the configuration matched the mental models of 6 tested users.",
    outcome:
      "Shipped in 8 weeks from zero to production deployment. Full-stack: authentication, database schema, realtime subscriptions, file storage, and a ⌘K command palette with 40+ actions responding in under 100ms. The command palette, added late in the build, became the most-praised feature in beta feedback.",
    impact: [
      "8 weeks from 0 to production deployment",
      "Real-time presence for up to 50 concurrent users",
      "Full-stack: auth, database, realtime, file storage",
      "Command palette with 40+ actions, sub-100ms response time",
    ],
    sections: [
      { type: "stat-row", stats: [{ value: "8w", label: "Zero to production" }, { value: "50", label: "Concurrent users" }, { value: "40+", label: "⌘K actions" }, { value: "<100ms", label: "Response time" }] },
      { type: "full-text", heading: "The Collaboration Problem", body: "I mapped a week in the life of a mid-size design team across six companies. The average designer switched between 4.2 tools per hour during active project work. Every tool switch required a 30 to 90 second re-orientation period. That's 2 to 4 hours per designer per week of pure cognitive overhead." },
      { type: "two-col", cols: [{ heading: "Editorial, Not Sterile", body: "Sync uses a serif editorial headline font (Newsreader) against a clean neutral base. The combination signals craft without sacrificing clarity. Closer to a well-designed magazine than enterprise software." }, { heading: "Review Mode Innovation", body: "The review screen puts the design artifact center stage. Annotation pins sit directly on the canvas, comment threads on the right, version history accessible without leaving context. Feedback never breaks the visual flow." }] },
      { type: "process-steps", steps: [{ number: "01", title: "User Journey Mapping", body: "Mapped end-to-end design workflow from brief to handoff. Identified 6 critical moments where context was lost between tools." }, { number: "02", title: "Information Architecture", body: "Designed workspace to project to card hierarchy. Card types: design, prototype, research, handoff, each with specific metadata." }, { number: "03", title: "Design & Engineering Sprint", body: "8-week parallel sprint: Figma design system, Next.js 14 App Router, Supabase schema, Realtime subscriptions. No separation between design and build." }, { number: "04", title: "Command Palette", body: "⌘K palette with fuzzy search across all entities. 40+ actions. Built with cmdk. Became the most-used feature post-launch." }] },
      { type: "quote", quote: "It finally feels like a tool built by someone who actually does design work, not someone who manages it from a distance.", attribution: "Design Lead, beta user" },
      { type: "full-text", heading: "What Shipping Solo Taught Me", body: "The command palette was an afterthought that became the most-praised feature. Sometimes the architectural decisions are the UX decisions. When you're both the designer and the engineer, you ship fewer features, but the ones you ship are deeply considered." },
    ],
  },
  {
    slug: "pulse",
    eyebrow: "04 / MOBILE HEALTH",
    headline: "Pulse: professional wellness architecture for high-performers",
    body: "A mobile-first wellness platform. Biometric intelligence, habit stacking, cognitive load detection. Delivered as an interactive hi-fi prototype.",
    tags: ["Product Design", "Mobile UX", "Prototyping", "Health Tech", "UX Research"],
    gradient: "linear-gradient(165deg, #f8fafc 0%, #e0e7ff 100%)",
    banner: "/banners/pulse-banner.png",
    previewFile: "/mockups/pulse_portfolio_mockups.html",
    title: "Pulse",
    subtitle: "Professional Wellness Platform",
    role: "Product Designer",
    timeline: "Mar 2024 to May 2024",
    team: "Solo",
    status: "Prototype",
    accentColor: "#4f46e5",
    bgColor: "#f8fafc",

    obsession:
      "The bio-intelligence card is the only non-dismissible element. It persists until acted on.",
    beforeAfter: {
      before: "All cards swipe away. Users dismissed the alert, then missed the decision window.",
      after: "Alert card has no dismiss. Only 'schedule block' or 'snooze 2hr' resolves it.",
    },
    cursorDetail: "3 screens / 0 nested nav",

    overview:
      "High-performers track everything but understand nothing. Pulse takes raw biometric data (HRV, sleep stages, movement) and turns it into something you can actually act on. It surfaces the right recommendation at the moment you need it.",
    problem:
      "Existing wellness apps split two ways. Data-heavy apps like Garmin and Oura have no actionable layer. Motivation-heavy apps like Streaks and Habitica have no biometric grounding. Neither connects what your body is doing to what you should do next.",
    solution:
      "A three-screen mobile architecture. Dashboard (snapshot + AI nudges), Analytics (trends and correlations), Habits (recovery-informed habit stacking). Delivered as a fully interactive hi-fi prototype with a wireframe toggle.",
    users:
      "High-performers across tech, finance, and athletics who already wear biometric trackers (Oura, Whoop, Apple Watch) but can't translate the data into daily decisions. People who know their HRV dropped but don't know whether to reschedule their deep work block or push through.",
    research:
      "Six user interviews with high-performers across tech, finance, and endurance athletics. Competitive audit of 8 wellness apps spanning pure data trackers (Garmin Connect, Oura) to gamified habit apps (Streaks, Habitica). The gap was obvious once mapped. Every app optimized for one end of the data-to-action spectrum. Nothing bridged both.",
    insights: [
      "Users want intelligence, not more metrics. The data is already there via their trackers. What they need is contextual interpretation at the moment of decision",
      "Information hierarchy should lead with the most motivating signal (movement), then the most actionable (bio-intelligence alert), then contextual data (mental wellness)",
      "A 3-screen architecture outperformed 5 and 7-screen alternatives in comprehension tests. Fewer screens, deeper content, lower navigation overhead",
    ],
    ideation:
      "I tested three information architectures in lo-fi. 3-screen (snapshot/analytics/habits), 5-screen (expanded categories), 7-screen (one screen per metric type). The 7-screen version felt like a fitness app. The 5-screen version felt like a dashboard. The 3-screen version felt like a tool. I committed to 3 screens after testing with 4 users.",
    wireframes:
      "Wireframes explored 20+ card layout variations for the dashboard before landing on the movement-first hierarchy. Key decision made in wireframes: the bio-intelligence alert card should not be dismissible. It's not a notification. It's a recommendation that persists until acted on. That distinction drove all subsequent layout decisions.",
    outcome:
      "Delivered as a fully interactive hi-fi prototype with dual hi-fi and wireframe toggle mode, designed for stakeholder presentations without a backend. The wireframe toggle became the lead presentation format, showing information architecture without visual noise. This dual-mode pattern is now standard in every prototype I build.",
    impact: [
      "3-screen architecture reduces cognitive load vs 7+ screen competitors",
      "Bio-intelligence layer surfaces contextual nudges at decision points",
      "Habit stacking informed by real recovery score, not arbitrary streaks",
      "Hi-fi + wireframe dual-mode prototype for stakeholder presentation",
    ],
    sections: [
      { type: "stat-row", stats: [{ value: "3", label: "Core screens" }, { value: "62ms", label: "Optimal HRV modeled" }, { value: "88%", label: "Recovery score" }, { value: "14d", label: "Streak system" }] },
      { type: "full-text", heading: "The Intelligence Gap", body: "Most health apps collect data they can't interpret for you. Your Oura ring knows your HRV dropped 20% but doesn't tell you to reschedule your afternoon deep work block. Pulse's bio-intelligence layer does exactly that. It reads your biometric context and surfaces the right recommendation at the right moment, not after the fact." },
      { type: "two-col", cols: [{ heading: "Information Hierarchy", body: "The dashboard leads with movement (most motivating), follows with a bio-intelligence alert (most actionable), then closes with mental wellness signals. Each card earns its position by driving a decision, not just displaying a number." }, { heading: "Recovery-Informed Habits", body: "Unlike arbitrary streaks, Pulse's habit system reads your recovery score before surfacing recommendations. At 60% recovery it won't push a 2-hour deep work block. It surfaces a 5-minute Focus Reset instead." }] },
      { type: "process-steps", steps: [{ number: "01", title: "Competitive Audit", body: "Analyzed 8 wellness apps across biometric trackers and habit systems. Mapped the gap between data collection and behavioral guidance." }, { number: "02", title: "User Interviews", body: "6 interviews with high-performers across tech, finance, and athletics. Core insight: they want intelligence, not more metrics." }, { number: "03", title: "IA & Flow Design", body: "Tested 5-screen and 7-screen architectures. Settled on 3 screens: fewer screens, deeper content. Bottom nav with clear categorical separation." }, { number: "04", title: "Hi-Fi Prototype", body: "Built a fully interactive prototype with hi-fi and wireframe modes, screen transitions, and toast notifications. Portfolio-ready without a backend." }] },
      { type: "quote", quote: "The best health app tells you what to do next, not just what happened yesterday.", attribution: "User interview, session 4" },
      { type: "full-text", heading: "Reflection", body: "Pulse proved that a well-scoped 3-screen architecture outperforms feature-bloated competitors in comprehension tests. The wireframe toggle in the prototype became a key presentation tool, showing stakeholders the information architecture without visual noise. That dual-mode pattern is now part of every prototype I build." },
    ],
  },
  {
    slug: "solo-leveling-os",
    eyebrow: "05 / PERSONAL SYSTEM",
    headline: "Solo Leveling OS: gamified life operating system",
    body: "A full-stack productivity system. Personal goals turn into a rank-based RPG: XP, shadow armies, AI guidance, and a production Next.js + Supabase backend.",
    tags: ["Product Design", "Next.js 14", "Supabase", "Claude API", "Gamification"],
    isLive: true,
    gradient: "linear-gradient(135deg, #0d1117 0%, #0a1628 50%, #061020 100%)",
    banner: "/banners/solo-banner.png",
    previewFile: "/mockups/solo_leveling_mockups.html",
    title: "Solo Leveling OS",
    subtitle: "Gamified Life Operating System",
    role: "Designer, Engineer, Product Owner",
    timeline: "Aug 2024 to Dec 2024",
    team: "Solo",
    status: "Live · Personal Use",
    accentColor: "#06b6d4",
    bgColor: "#0d1117",

    obsession:
      "The XP curve is exponential, not linear. 50 XP for a task, 8,000 XP for an S-rank Gate.",
    beforeAfter: {
      before: "Linear XP: 100 per quest, 1K per gate. Ranks felt inflated.",
      after: "Exponential: level 1 to 2 in a day, level 40 to 41 takes a month. Ranks earn themselves.",
    },
    cursorDetail: "rank: B / XP: 68,420",

    overview:
      "Most productivity tools treat motivation as a given. They optimize the system and assume you'll bring the will. Solo Leveling OS flips this. It makes the work feel like a game worth playing, drawing on the rank-based progression system from the manga to create a deeply personal, AI-assisted life OS.",
    problem:
      "I'd tried every productivity system. GTD, Notion databases, Obsidian vaults, bullet journaling. They all worked for 2 to 3 weeks before maintenance overhead exceeded the motivation boost. The systems were too neutral. Nothing was at stake. Nothing felt earned.",
    solution:
      "An RPG-layered productivity system with XP, ranks (E through S), Gates (large goals), daily quests, a Shadow Realm thought capture layer, and an AI System Guide powered by the Claude API. Backed by Next.js 14 plus Supabase.",
    users:
      "Solo builders, indie hackers, and high-drive individuals who have tried every productivity system and burned out on maintenance overhead. People who know what they need to do but can't sustain the motivation architecture long enough to do it consistently.",
    research:
      "Five months of personal experimentation before writing a line of product code. Tested GTD, Notion databases, Obsidian vaults, bullet journaling, and 3 different habit apps. Mapped the failure mode of each. All worked for 2 to 3 weeks before maintenance overhead exceeded the motivation boost. The pattern: every system was too neutral. Nothing was at stake. Nothing felt earned.",
    insights: [
      "All failed productivity systems shared one trait: zero stakes. Nothing bad happened when you skipped a day, and nothing meaningful happened when you succeeded",
      "Games solved the motivation problem 50 years ago using the same dopaminergic triggers (clear feedback loops, visible progress, earned rewards) with no ethical compromise",
      "Ownership is the most underrated driver of sustained motivation. A system built specifically for yourself cannot be abandoned because it holds your own mythology",
    ],
    ideation:
      "I prototyped from a single-file HTML app built in one weekend to test the core loop: complete quest, earn XP, level up. Moved to React + Zustand + localStorage after validating the core mechanic held. Designed the XP economy with 5 different curve shapes before settling on exponential thresholds. Fast early levels, slow later ones, each feeling earned.",
    wireframes:
      "Early wireframes were text-based state machine diagrams mapping the XP economy, rank structure, and gate hierarchy before any visual design. First UI wireframes focused on the command center layout. What's the most important thing a hunter needs to see the moment they open the app? I iterated through 4 dashboard arrangements before rank status as the persistent anchor clicked.",
    outcome:
      "Used daily for 5+ months. The longest any productivity system has held in my personal history. XP spans 47 levels with meaningful rank progression from E to B class. The AI System Guide persona, built on the Claude API with full game-state context, became the most-used feature. Habit streak consistency improved 3x versus previous systems.",
    impact: [
      "Used daily for 5+ months, longest any system has held",
      "XP system spans 47 levels with meaningful rank progression E to S",
      "AI System Guide persona built on Claude API with full game-state context",
      "3x improvement in habit streak consistency vs previous systems",
    ],
    sections: [
      { type: "stat-row", stats: [{ value: "5mo+", label: "Daily active use" }, { value: "Lv.47", label: "Current rank" }, { value: "23", label: "Gates cleared" }, { value: "3x", label: "Habit improvement" }] },
      { type: "full-text", heading: "Why Games Work", body: "Games solved the motivation problem 50 years ago. Clear feedback loops. Visible progress. Meaningful stakes. Earned rewards. Productivity tools deliberately strip these out in the name of seriousness. But the neuroscience doesn't care. It responds to the same dopaminergic triggers regardless of context. The question isn't whether gamification works. It's whether you can build a system that earns its own mythology." },
      { type: "two-col", cols: [{ heading: "The Rank System", body: "E, D, C, B, A, S class progression, each requiring exponentially more XP. Ranks unlock new abilities: more active Gates, Shadow slots, AI query budget. The scarcity makes progression feel earned, not arbitrary." }, { heading: "Shadow Realm Capture", body: "A frictionless thought-capture layer that routes inputs automatically. Tasks to Gate Queue, goals to Missions, habits to habit tracker. The system classifies so you don't have to. Keyboard-first. Zero friction." }] },
      { type: "process-steps", steps: [{ number: "01", title: "Prototype to Full App", body: "Started as a single-file HTML prototype in one weekend. Moved to React + Zustand + localStorage. Finally migrated to Next.js 14 + Supabase when persistence requirements grew." }, { number: "02", title: "Narrative Architecture", body: "Every element maps to a Solo Leveling concept. Gates = major projects. Shadows = personified tools and habits. Daily quests = micro-commitments. The lore makes the system feel inhabited." }, { number: "03", title: "XP Economy Design", body: "Designed the XP economy to avoid inflation. Easy tasks give 50 to 150 XP. S-rank Gates give 4,000 to 8,000 XP. Level thresholds follow an exponential curve so early levels feel fast, later ones feel earned." }, { number: "04", title: "AI Integration", body: "System Guide built on Claude API with a persona system prompt. Includes current game state in every request: rank, active gates, recent quest history. Rate-limited by rank to create meaningful scarcity." }] },
      { type: "quote", quote: "The best UX insight from this project: the system works because I built it. Ownership is the most underrated driver of sustained motivation.", attribution: "Personal reflection, month 4" },
      { type: "full-text", heading: "What This Proved", body: "Personal projects are the most honest portfolio pieces because you can't fake sustained use. Five months of daily engagement means the UX decisions were correct. The feedback loops work. The visual hierarchy surfaces the right information. The AI persona adds genuine value. Designing for one person with total clarity of context produces better decisions than designing for an estimated persona." },
    ],
  },
];
