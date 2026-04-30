export interface Project {
  slug: string;
  eyebrow: string;
  headline: string;
  body: string;
  tags: string[];
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
  beforeAfter: {
    before: string;
    after: string;
  };
  cursorDetail: string;
}

export interface CaseStudySection {
  type: "two-col" | "full-text" | "process-steps" | "quote";
  heading?: string;
  body?: string;
  cols?: { heading: string; body: string }[];
  steps?: { number: string; title: string; body: string }[];
  quote?: string;
  attribution?: string;
}

export const projects: Project[] = [
  {
    slug: "lume-sys",
    eyebrow: "01 — AI OBSERVABILITY",
    headline: "Lume.Sys: Monitoring layer for AI pipelines",
    body: "An AI observability dashboard designed for ML engineers. Tracks latency, token cost, and error rates across multiple model providers from a single interface.",
    tags: ["Product Design", "Design Engineering", "React", "TypeScript", "Supabase"],
    gradient: "linear-gradient(135deg, #0a0a08 0%, #1a1200 50%, #2a1800 100%)",
    banner: "/banners/lume-banner.png",
    previewFile: "/mockups/lume_portfolio_mockups.html",
    title: "Lume.Sys",
    subtitle: "AI Observability Platform",
    role: "Product Designer & Design Engineer",
    timeline: "Oct 2024 – Jan 2025",
    team: "Solo",
    status: "Personal Project",
    accentColor: "#e8a427",
    bgColor: "#0a0a08",

    obsession:
      "The P99 latency chart recalculates every 30s, not every frame — cost-aware reactivity.",
    beforeAfter: {
      before: "Charts re-rendered on every WebSocket tick — heavy browser CPU usage.",
      after: "Throttled to 30-second cadence with manual override. Stable CPU at low load.",
    },
    cursorDetail: "grid: 12col / gutter: 24px",

    overview:
      "AI teams often track model performance across multiple tools with no unified view. Lume.Sys is an observability dashboard for ML engineers managing multi-model inference pipelines — designed to surface latency, token cost, and error rates in one place.",
    problem:
      "Standard APM tools weren't built for the LLM era. They surface generic HTTP metrics and can't correlate token throughput with cost curves, or show P99 latency by model provider in a single view.",
    solution:
      "A terminal-aesthetic dashboard with real-time trace streaming, provider-level health scoring, and cost attribution. Built on Supabase Realtime and React with a custom charting layer.",
    users:
      "Designed for ML engineers managing multi-model AI pipelines — people who need to correlate token usage, latency, and cost across multiple providers without switching tools.",
    research:
      "Studied existing APM and observability tools to understand what was missing for LLM-specific workflows. Reviewed common ML engineering contexts (Datadog, custom scripts, provider dashboards) to identify what signals would be most valuable in a unified view.",
    insights: [
      "Existing APM tools surface generic HTTP metrics and don't track LLM-specific signals like token windows, model cold starts, or provider rate limits",
      "Engineers managing multi-model pipelines need to correlate latency, cost, and error rates across providers in a single view — not across separate dashboards",
      "A terminal-first aesthetic signals precision to an engineering audience and matches the mental model of ML engineers already comfortable with dense, data-heavy tools",
    ],
    ideation:
      "Explored three visual directions: a Grafana-style modular dashboard (too generic, ignored the LLM context), a log-first table view (too narrow, missed the correlation layer), and a terminal-aesthetic cockpit (dense, precise, appropriate for the engineering audience). Iterated through multiple wireframe versions before landing on the Workspace → Pipeline → Trace hierarchy.",
    wireframes:
      "Started with terminal UI references to understand the information density patterns ML engineers are already comfortable with. Wireframed the three-level hierarchy through multiple arrangements before committing to the three-panel layout — left sidebar navigation, center live trace stream, right inspector — modeled on VS Code's layout.",
    outcome:
      "Designed and built a full-stack observability dashboard with real-time trace streaming, provider-level latency breakdown, and token cost attribution. Explored UI patterns for correlating multi-provider signals in a single interface.",
    impact: [
      "Designed Workspace → Pipeline → Trace information hierarchy",
      "Built custom chart layer with throttled refresh for cost-aware reactivity",
      "Implemented real-time WebSocket stream via Supabase Realtime",
      "Shipped responsive React dashboard with terminal-aesthetic dark theme",
    ],
    sections: [
      {
        type: "full-text",
        heading: "The Problem Space",
        body: "LLM inference is fundamentally different from traditional API calls. Token counts vary wildly, model cold starts introduce unpredictable latency spikes, and rate limits create cascading failures. Standard APM tools surface generic HTTP metrics — they don't speak the language of tokens, contexts, or model routing. The design challenge was to build a surface that did.",
      },
      {
        type: "two-col",
        cols: [
          {
            heading: "Design Direction",
            body: "The terminal-first aesthetic signals precision to an engineering audience. Dense information over whitespace. Every element earns its place. The UI is designed to feel like a cockpit — everything visible at once, nothing hidden behind tabs.",
          },
          {
            heading: "Design Principles",
            body: "Cost-aware reactivity: charts refresh on a 30-second cadence, not every frame. Provider health uses a scoring system, not raw numbers. The trace stream shows context at three levels of zoom: pipeline, model call, token window.",
          },
        ],
      },
      {
        type: "process-steps",
        steps: [
          {
            number: "01",
            title: "Research & Tool Audit",
            body: "Reviewed existing observability tools and their gaps in LLM contexts. Identified core signals that ML engineers need to correlate: latency, token cost, provider health, error cascades.",
          },
          {
            number: "02",
            title: "Information Architecture",
            body: "Designed the Workspace → Pipeline → Trace hierarchy. Three levels of zoom for investigation depth — from high-level health to individual token windows.",
          },
          {
            number: "03",
            title: "Component System",
            body: "Built a custom chart library with amber CRT aesthetic. Components optimized for data density: sparklines, latency heatmaps, cost waterfall charts.",
          },
          {
            number: "04",
            title: "Real-time Layer",
            body: "Supabase Realtime for WebSocket trace streaming. 30-second refresh cycle with manual override. Live UTC clock. Cost attribution shown inline with every trace.",
          },
        ],
      },
      {
        type: "full-text",
        heading: "Reflection",
        body: "The terminal aesthetic works well for engineers but creates friction for non-technical stakeholders who need cost summaries. A follow-up direction: a management view that abstracts the density into higher-level signals — same data, different frame for a different audience.",
      },
    ],
  },
  {
    slug: "vault-ds",
    eyebrow: "02 — DESIGN SYSTEMS",
    headline: "Vault DS: Component system for scale-stage product teams",
    body: "A design system with 128 components and a three-tier token architecture. Built Figma variables, Storybook docs, and a custom sync script to keep design and code in parity.",
    tags: ["Design Systems", "Storybook", "Figma", "React", "Design Tokens"],
    gradient: "linear-gradient(135deg, #05070A 0%, #0B0E11 100%)",
    banner: "/banners/vault-banner.png",
    previewFile: "/mockups/vault_portfolio_mockups.html",
    title: "Vault DS",
    subtitle: "Production Design System",
    role: "Design Systems Lead",
    timeline: "Jun 2024 – Nov 2024",
    team: "Solo",
    status: "Design Exploration",
    accentColor: "#3b82f6",
    bgColor: "#05070A",

    obsession:
      "A Figma→CSS build script eliminates the translation step — what you see is literally what ships.",
    beforeAfter: {
      before: "Designers exported hex values; engineers re-typed them as tokens. Manual and error-prone.",
      after: "Figma Variables → JSON → CSS custom properties. Automated sync in seconds.",
    },
    cursorDetail: "token: ink-60 / opacity: 0.6",

    overview:
      "Scale-stage product teams ship fast and break consistency. Components drift, tokens diverge, and every new feature becomes a negotiation about which button to use. Vault DS is a design system with 128 components, a semantic token architecture, and a live audit stream dashboard demonstrating the system at scale.",
    problem:
      "Without a shared token system, dark mode becomes a patchwork. Without governance, component libraries diverge across products. Without a sync script, design and code drift apart every sprint.",
    solution:
      "A systematically built component library with a token-first approach: primitive → semantic → component tokens. Paired with a Figma→CSS sync script and full Storybook documentation.",
    users:
      "Designed for product designers and frontend engineers working across multiple products from a shared codebase — teams that lose velocity to component inconsistency and token drift.",
    research:
      "Audited open-source design systems (Radix, shadcn, MUI) to understand token architecture approaches. Designed the three-tier system from first principles, testing naming conventions against real component use cases before settling on the semantic model.",
    insights: [
      "Token systems fail when naming is ambiguous — semantic names (ink, ink-60) outperform role-based names (text-primary, text-secondary) for dark mode flexibility",
      "Design-code parity requires a sync mechanism, not just documentation — the Figma→CSS script eliminates the manual translation step entirely",
      "Governance and contribution guidelines matter as much as component implementation — the system is only as good as the rules for adding to it",
    ],
    ideation:
      "Prototyped three token naming conventions (semantic, role-based, and hybrid) before choosing the three-tier semantic system. Sketched the contribution flow as a state machine before writing governance docs. Built the first ten components in Figma and React simultaneously to test whether the abstractions held across mediums.",
    wireframes:
      "Started with a component inventory map rather than UI wireframes — charted component patterns against the proposed token system to identify conflicts before building. First design artifacts were token hierarchy diagrams, not screens. UI wireframes came after the token architecture was validated.",
    outcome:
      "Designed and built a 128-component library with full Storybook documentation and Figma variable bindings. Created a three-tier token architecture and a Figma→CSS sync script that eliminates manual token translation.",
    impact: [
      "Designed three-tier token architecture: primitive → semantic → component",
      "Built Figma→CSS sync script, eliminating manual token translation",
      "Documented component contribution model and governance guidelines",
      "Shipped 128 components in Figma with auto-layout and variable bindings",
    ],
    sections: [
      {
        type: "full-text",
        heading: "Token Architecture",
        body: "Most design systems fail at the token layer. Vault DS uses a three-tier system: Primitive tokens (raw values) → Semantic tokens (ink, ink-60, ink-30) → Component tokens (button-bg, button-border). Every color decision traces back to this hierarchy, making dark mode a configuration change instead of a rebuild.",
      },
      {
        type: "two-col",
        cols: [
          {
            heading: "Figma-Code Parity",
            body: "Built a sync script that exports Figma tokens directly to CSS custom properties, eliminating the translation step entirely. What you see in Figma is exactly what ships in code.",
          },
          {
            heading: "Audit Stream Application",
            body: "The Vault DS audit stream showcases the system under real load — dense data tables, severity badges, monospaced code panels, and sidebar layouts all built from the same token foundation.",
          },
        ],
      },
      {
        type: "process-steps",
        steps: [
          {
            number: "01",
            title: "Audit & Inventory",
            body: "Catalogued component patterns across design references to identify common inconsistencies and token conflicts before building anything new.",
          },
          {
            number: "02",
            title: "Token System Design",
            body: "Designed the three-tier token architecture. Tested naming conventions against real use cases. Established the semantic mapping with sign-off from both design and engineering.",
          },
          {
            number: "03",
            title: "Component Build",
            body: "Built 128 components in Figma with auto-layout and variable bindings. Simultaneously built the React library with full TypeScript types and Storybook stories.",
          },
          {
            number: "04",
            title: "Sync Script",
            body: "Built the Figma→JSON→CSS pipeline. Variables export automatically, eliminating the manual re-typing step. Dark mode becomes a token swap, not a rebuild.",
          },
        ],
      },
      {
        type: "full-text",
        heading: "Reflection",
        body: "Design systems are governance problems disguised as technical ones. The hardest part wasn't building components — it was establishing the contribution model. The governance docs should come before the first component, not after the tenth PR.",
      },
    ],
  },
  {
    slug: "sync-collab",
    eyebrow: "03 — SAAS PLATFORM",
    headline: "Sync.Collab: Collaboration platform for design teams",
    body: "A collaboration platform for design teams. Kanban boards, async review threads, real-time presence, and a command palette. Designed and built as a full-stack personal project in 8 weeks.",
    tags: ["Product Design", "Next.js 14", "Supabase", "Real-time", "Full-stack"],
    gradient: "linear-gradient(135deg, #FAFAF9 0%, #EEF4FF 100%)",
    banner: "/banners/sync-banner.png",
    previewFile: "/mockups/sync_portfolio_mockups.html",
    title: "Sync.Collab",
    subtitle: "Design Team Collaboration Platform",
    role: "Product Designer & Full-stack Engineer",
    timeline: "Jul 2024 – Sep 2024",
    team: "Solo",
    status: "Personal Project",
    accentColor: "#2F6FED",
    bgColor: "#FAFAF9",

    obsession:
      "The ⌘K palette ranks results by recency + fuzzy score — not either one alone.",
    beforeAfter: {
      before: "Fuzzy match only — older boards surfaced above today's active work.",
      after: "Hybrid score: fuzzy + recency weighting. Active work surfaces first.",
    },
    cursorDetail: "spacing: 8pt / leading: 1.6",

    overview:
      "Design teams live across Figma, Notion, Slack, and Linear — context fragmented across all four. Sync.Collab brings kanban project management, async design review, real-time team presence, and a command palette into a single focused interface.",
    problem:
      "Feedback lives in Figma comments, tasks in Linear, conversations in Slack, and no one knows what's actually blocking the project. The tool fragmentation isn't just inconvenient — it creates systematic context loss at every handoff.",
    solution:
      "A collaboration surface built for design teams — kanban boards, async review threads with annotation pins, real-time presence, and a ⌘K command palette. Built on Next.js 14 App Router and Supabase Realtime.",
    users:
      "Designed for distributed design teams who split their workflow across Figma, Notion, Slack, and Linear — the people who end each sprint saying they didn't know something was blocked.",
    research:
      "Mapped my own cross-tool workflow during a typical design sprint, noting every tool switch between Figma, Notion, Slack, and Linear. Each context switch carries a re-orientation cost: time spent rebuilding mental state rather than doing work. This became the central design problem.",
    insights: [
      "Feedback fragmentation is the core problem: context lives in Figma comments, tasks in Linear, conversations in Slack — no single surface holds the full picture",
      "A command palette unifies context without requiring navigation — it's the missing interface layer that reaches all entities from one input",
      "The review workflow needs to keep the design artifact primary, not buried in a thread sidebar — annotation pins on the canvas solve this",
    ],
    ideation:
      "Mapped three product scopes — narrow (async review only), medium (review + task management), broad (full collaboration suite) — and pressure-tested each against the core context-loss moments. The medium scope closed most gaps. Adding the command palette closed the remaining ones.",
    wireframes:
      "Lo-fi wireframes focused on information hierarchy: what does a designer need to see first when opening the tool mid-sprint? Iterated through three dashboard layouts, five review screen arrangements, and two kanban structures before finding the configuration that matched existing mental models.",
    outcome:
      "Designed and built the full platform in 8 weeks. Implemented authentication, database schema, realtime subscriptions, file storage, and a ⌘K command palette. The command palette — built late in the sprint — became the most considered feature.",
    impact: [
      "Designed and built full-stack: auth, database, realtime subscriptions, file storage",
      "Created ⌘K command palette with fuzzy + recency hybrid ranking",
      "Implemented kanban boards with real-time presence indicators",
      "Designed async design review with annotation pins on the canvas",
    ],
    sections: [
      {
        type: "full-text",
        heading: "The Collaboration Problem",
        body: "I mapped my own workflow during a design sprint and noted every tool switch. Each switch between Figma, Notion, Slack, and Linear carries a re-orientation cost — time spent rebuilding context rather than making decisions. The goal was to reduce that overhead by unifying the most common interactions in one surface.",
      },
      {
        type: "two-col",
        cols: [
          {
            heading: "Editorial, Not Sterile",
            body: "Sync uses a serif editorial headline font (Newsreader) against a clean neutral base. The combination signals craft without sacrificing clarity — closer to a well-designed magazine than enterprise software.",
          },
          {
            heading: "Review Mode",
            body: "The review screen puts the design artifact center stage with annotation pins directly on the canvas, comment threads on the right, and version history accessible without leaving context. Feedback never breaks the visual flow.",
          },
        ],
      },
      {
        type: "process-steps",
        steps: [
          {
            number: "01",
            title: "Workflow Mapping",
            body: "Mapped end-to-end design workflow from brief to handoff. Identified critical moments where context is lost between tools — these became the primary design targets.",
          },
          {
            number: "02",
            title: "Information Architecture",
            body: "Designed workspace → project → card hierarchy. Card types: design, prototype, research, handoff — each with specific metadata relevant to that phase.",
          },
          {
            number: "03",
            title: "Design & Engineering Sprint",
            body: "8-week parallel sprint: Figma design system, Next.js 14 App Router, Supabase schema, Realtime subscriptions. No separation between design and build phases.",
          },
          {
            number: "04",
            title: "Command Palette",
            body: "⌘K palette with fuzzy + recency hybrid search across all workspace entities. Built with cmdk. The hybrid ranking ensures active work surfaces above older results.",
          },
        ],
      },
      {
        type: "full-text",
        heading: "What Shipping Solo Taught Me",
        body: "The command palette was an afterthought that became the most considered feature. Sometimes the architectural decisions are the UX decisions. When you're both the designer and the engineer, you ship fewer features but the ones you ship are deeply considered.",
      },
    ],
  },
  {
    slug: "pulse",
    eyebrow: "04 — MOBILE HEALTH",
    headline: "Pulse: Wellness prototype for high-performers",
    body: "A mobile wellness prototype that turns biometric data into clear, actionable recommendations. Three screens, no nested navigation, fully interactive hi-fi.",
    tags: ["Product Design", "Mobile UX", "Prototyping", "Health Tech", "UX Research"],
    gradient: "linear-gradient(165deg, #f8fafc 0%, #e0e7ff 100%)",
    banner: "/banners/pulse-banner.png",
    previewFile: "/mockups/pulse_portfolio_mockups.html",
    title: "Pulse",
    subtitle: "Professional Wellness Prototype",
    role: "Product Designer",
    timeline: "Mar 2024 – May 2024",
    team: "Solo",
    status: "Prototype",
    accentColor: "#4f46e5",
    bgColor: "#f8fafc",

    obsession:
      "The bio-intelligence card is the only non-dismissible element — persists until acted on.",
    beforeAfter: {
      before: "All cards swipeable. Users dismissed alerts and missed the recommended action window.",
      after: "Alert card has no dismiss. Only 'schedule block' or 'snooze 2hr' resolves it.",
    },
    cursorDetail: "3 screens / 0 nested nav",

    overview:
      "High-performers track everything but understand little. Pulse takes raw biometric data — HRV, sleep stages, movement — and turns it into something actionable, surfacing the right recommendation at the moment it's relevant.",
    problem:
      "Existing wellness apps are either data-heavy (Garmin, Oura) with no actionable layer, or motivation-heavy (Streaks, Habitica) with no biometric grounding. Neither connects what your body is doing to what you should do next.",
    solution:
      "A three-screen mobile architecture: Dashboard (snapshot and contextual nudges), Analytics (trends), and Habits (recovery-informed habit stacking). Delivered as a fully interactive hi-fi prototype with wireframe toggle mode.",
    users:
      "Designed for high-performers who wear biometric trackers but struggle to translate raw data into actionable daily decisions — people who know their HRV dropped but don't know what to do about it.",
    research:
      "Competitive analysis of eight wellness apps across biometric trackers (Oura, Garmin Connect) and habit apps (Streaks, Habitica). Mapped the gap: every app optimized for one end of the data-to-action spectrum, but none bridged both. The design problem was the space between them.",
    insights: [
      "Health apps split into two categories — data trackers with no guidance, and habit apps with no biometric grounding — neither bridges both",
      "Information hierarchy on the dashboard should lead with the most actionable signal, not the most impressive number",
      "A 3-screen architecture reduces cognitive overhead by keeping content deep within fewer surfaces, rather than spreading it thin across many",
    ],
    ideation:
      "Tested three information architectures: 3-screen, 5-screen, and 7-screen. The 7-screen version felt like a fitness app; the 5-screen version felt like a dashboard; the 3-screen version felt like a tool. Committed to 3 screens after comparing comprehension across arrangements.",
    wireframes:
      "Wireframes explored card layout variations for the dashboard before landing on the movement-first hierarchy. Key decision in wireframes: the bio-intelligence alert card should not be dismissible — it's a recommendation that persists until acted on, not a notification to clear.",
    outcome:
      "Designed a fully interactive hi-fi prototype with dual hi-fi and wireframe toggle modes. The wireframe toggle became the primary stakeholder presentation format, showing information architecture without visual noise.",
    impact: [
      "Designed 3-screen architecture: Dashboard, Analytics, Habits",
      "Created recovery-informed habit stacking — habits surface based on recovery score",
      "Built non-dismissible bio-intelligence alert pattern to drive action",
      "Delivered fully interactive prototype with hi-fi and wireframe view modes",
    ],
    sections: [
      {
        type: "full-text",
        heading: "The Intelligence Gap",
        body: "Most health apps collect data they don't interpret for you. Your Oura ring knows your HRV dropped but doesn't tell you to reschedule your deep work block. Pulse's bio-intelligence layer reads your biometric context and surfaces a recommendation at the right moment — not after the fact.",
      },
      {
        type: "two-col",
        cols: [
          {
            heading: "Information Hierarchy",
            body: "The dashboard leads with movement (most motivating), follows with a bio-intelligence alert (most actionable), then closes with mental wellness signals. Each card earns its position by driving a decision, not just displaying a number.",
          },
          {
            heading: "Recovery-Informed Habits",
            body: "Unlike arbitrary streaks, Pulse's habit system reads your recovery score before surfacing recommendations. At low recovery, it surfaces a short recovery activity instead of a demanding deep work block.",
          },
        ],
      },
      {
        type: "process-steps",
        steps: [
          {
            number: "01",
            title: "Competitive Audit",
            body: "Analyzed wellness apps across biometric trackers and habit systems. Mapped the gap between data collection and behavioral guidance — the design opportunity lived in that gap.",
          },
          {
            number: "02",
            title: "Research & Ideation",
            body: "Studied how high-performers actually use biometric data. Core finding: existing tools optimize for data display; the missing layer is contextual interpretation at the moment of decision.",
          },
          {
            number: "03",
            title: "IA & Architecture",
            body: "Compared 3-screen, 5-screen, and 7-screen architectures. Settled on 3 screens — fewer surfaces, deeper content, lower navigation overhead. Bottom nav with clear categorical separation.",
          },
          {
            number: "04",
            title: "Hi-Fi Prototype",
            body: "Built a fully interactive prototype with hi-fi and wireframe modes, screen transitions, and toast notifications. Wireframe mode became the lead presentation format for showing IA without visual noise.",
          },
        ],
      },
      {
        type: "full-text",
        heading: "Reflection",
        body: "The wireframe toggle in the prototype became a key presentation tool — showing stakeholders the information architecture without visual noise. A well-scoped 3-screen architecture outperforms feature-bloated alternatives in comprehension. That dual-mode pattern is now part of every prototype I build.",
      },
    ],
  },
  {
    slug: "solo-leveling-os",
    eyebrow: "05 — PERSONAL SYSTEM",
    headline: "Solo Leveling OS: Gamified life operating system",
    body: "A personal productivity system built as an RPG. Goals become Gates, tasks become quests, progress earns XP. Built with Next.js, Supabase, and the Claude API.",
    tags: ["Product Design", "Next.js 14", "Supabase", "Claude API", "Gamification"],
    gradient: "linear-gradient(135deg, #0d1117 0%, #0a1628 50%, #061020 100%)",
    banner: "/banners/solo-banner.png",
    previewFile: "/mockups/solo_leveling_mockups.html",
    title: "Solo Leveling OS",
    subtitle: "Gamified Life Operating System",
    role: "Designer, Engineer, Product Owner",
    timeline: "Aug 2024 – Dec 2024",
    team: "Solo",
    status: "Personal Project",
    accentColor: "#06b6d4",
    bgColor: "#0d1117",

    obsession:
      "The XP curve is exponential, not linear — 50 XP for a task, 8,000 XP for an S-rank Gate.",
    beforeAfter: {
      before: "Linear XP: every task felt the same weight. Ranks felt arbitrary.",
      after: "Exponential thresholds: early levels are fast, later ones are genuinely earned.",
    },
    cursorDetail: "rank: B / XP: 68,420",

    overview:
      "Most productivity tools treat motivation as a given. They optimize the system and assume you'll bring the will. Solo Leveling OS flips this — it makes the work feel like a game worth playing, drawing on the rank-based progression system from the manga to create a deeply personal, AI-assisted productivity system.",
    problem:
      "I'd tried every productivity system: GTD, Notion databases, Obsidian vaults, bullet journaling. They all worked for a few weeks before maintenance overhead exceeded the motivation boost. The systems were too neutral. Nothing was at stake. Nothing felt earned.",
    solution:
      "An RPG-layered productivity system with XP, ranks (E through S), Gates (large goals), daily quests, a Shadow Realm thought capture layer, and an AI System Guide powered by the Claude API — backed by Next.js 14 and Supabase.",
    users:
      "Built for myself. The design assumption: a solo builder who has tried every productivity system and burned out on maintenance overhead. A system built specifically for yourself cannot be abandoned because it holds your own mythology.",
    research:
      "Five months of personal experimentation before writing a line of product code. Tested GTD, Notion databases, Obsidian vaults, bullet journaling, and habit apps. Mapped the failure mode of each: all worked for a few weeks before maintenance overhead exceeded the motivation boost. Pattern: every system was too neutral — nothing was at stake, nothing felt earned.",
    insights: [
      "Every failed productivity system shared one trait: zero stakes. Nothing meaningful happened when you skipped a day, and nothing genuinely rewarding happened when you succeeded",
      "Games solved the motivation problem decades ago using clear feedback loops, visible progress, and earned rewards — these work for productivity for the same neurological reasons",
      "Ownership is an underrated driver of sustained motivation: a system built specifically for yourself is harder to abandon than one built for a generic persona",
    ],
    ideation:
      "Prototyped from a single-file HTML app built in one weekend to test the core loop: complete quest → earn XP → level up. Moved to React + Zustand + localStorage after validating the core mechanic. Designed the XP economy with multiple curve shapes before settling on exponential thresholds — fast early levels, slower later ones.",
    wireframes:
      "Early wireframes were text-based state machine diagrams mapping the XP economy, rank structure, and gate hierarchy before any visual design. First UI wireframes focused on the command center layout — what's the most important thing a hunter needs to see when opening the app?",
    outcome:
      "Used daily as my primary productivity system. Built full-stack with Next.js 14, Supabase, and the Claude API. XP spans 47 levels with meaningful rank progression from E to B class.",
    impact: [
      "Designed and built full-stack app: Next.js 14, Supabase, Claude API",
      "Created XP economy with exponential progression curve across 47 levels",
      "Built AI System Guide with full game-state context injected per request",
      "Used daily as primary productivity system for 5+ months",
    ],
    sections: [
      {
        type: "full-text",
        heading: "Why Games Work",
        body: "Games solved the motivation problem decades ago. Clear feedback loops, visible progress, meaningful stakes, earned rewards. Productivity tools deliberately strip these out in the name of seriousness. But the neurological response is the same regardless — the question isn't whether these mechanics work, it's whether you can build a system that earns its own mythology.",
      },
      {
        type: "two-col",
        cols: [
          {
            heading: "The Rank System",
            body: "E → D → C → B → A → S class progression, each requiring exponentially more XP. Ranks unlock new capabilities: more active Gates, Shadow slots, AI query budget. Scarcity makes progression feel earned, not arbitrary.",
          },
          {
            heading: "Shadow Realm Capture",
            body: "A frictionless thought-capture layer that routes inputs automatically — tasks to Gate Queue, goals to Missions, habits to tracker. The system classifies so you don't have to. Keyboard-first, zero friction.",
          },
        ],
      },
      {
        type: "process-steps",
        steps: [
          {
            number: "01",
            title: "Prototype → Full App",
            body: "Started as a single-file HTML prototype in one weekend to validate the core XP loop. Moved to React + Zustand. Finally migrated to Next.js 14 + Supabase when persistence requirements grew.",
          },
          {
            number: "02",
            title: "Narrative Architecture",
            body: "Every element maps to a Solo Leveling concept. Gates = major projects. Shadows = personified tools and habits. Daily quests = micro-commitments. The lore makes the system feel inhabited.",
          },
          {
            number: "03",
            title: "XP Economy Design",
            body: "Designed the XP economy to avoid inflation. Easy tasks give 50–150 XP. S-rank Gates give 4,000–8,000 XP. Level thresholds follow an exponential curve so early levels feel fast, later ones feel genuinely earned.",
          },
          {
            number: "04",
            title: "AI Integration",
            body: "System Guide built on the Claude API with a persona system prompt. Includes current game state in every request: rank, active gates, recent quest history. Rate-limited by rank to create meaningful scarcity.",
          },
        ],
      },
      {
        type: "quote",
        quote: "The best UX insight from this project: the system works because I built it. Ownership is the most underrated driver of sustained motivation.",
        attribution: "Personal reflection, month 4",
      },
      {
        type: "full-text",
        heading: "What This Proved",
        body: "Personal projects are the most honest portfolio pieces because you can't fake sustained use. Five months of daily engagement means the feedback loops work, the visual hierarchy surfaces the right information, and the AI persona adds genuine value. Designing for one person with total clarity of context produces better decisions than designing for an estimated persona.",
      },
    ],
  },
];
