import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioContent } from "@/data/portfolioContent";
import type { PortfolioProject } from "@/data/portfolioContent";
import NotFound from "./NotFound";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MONO: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
};

// ─── Primitives ────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "clamp(15px, 1.45vw, 17px)",
        lineHeight: "1.82",
        color: "hsl(var(--ink-60))",
        maxWidth: "720px",
      }}
    >
      {children}
    </p>
  );
}

// Two-column label + content layout used for every content section
function Block({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-3%" }}
      transition={{ duration: 0.5, ease }}
      className="cs-block"
    >
      <div className="cs-block-label">
        <span
          style={{
            ...MONO,
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "hsl(var(--ink-30))",
          }}
        >
          {label}
        </span>
      </div>
      <div className="cs-block-body">{children}</div>
    </motion.div>
  );
}

// ─── Screenshot gallery ────────────────────────────────────────────────────

const SCREENSHOT_MAP: Record<string, [string, string, string]> = {
  "lume-sys":         ["/screenshots/lume-1.png",  "/screenshots/lume-2.png",  "/screenshots/lume-3.png"],
  "vault-ds":         ["/screenshots/vault-1.png", "/screenshots/vault-2.png", "/screenshots/vault-3.png"],
  "sync-collab":      ["/screenshots/sync-1.png",  "/screenshots/sync-2.png",  "/screenshots/sync-3.png"],
  "pulse":            ["/screenshots/pulse-1.png", "/screenshots/pulse-2.png", "/screenshots/pulse-3.png"],
  "solo-leveling-os": ["/screenshots/solo-1.png",  "/screenshots/solo-2.png",  "/screenshots/solo-3.png"],
};

const MOBILE_SCREEN_PROJECTS = new Set(["pulse"]);

const tileBase: React.CSSProperties = {
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid hsl(var(--rule))",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imgContain: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
};

function ScreenshotGallery({ slug, accent }: { slug: string; accent: string }) {
  const paths = SCREENSHOT_MAP[slug];
  const [failed, setFailed] = React.useState<ReadonlySet<number>>(new Set());

  if (!paths) return null;

  const fail = (i: number) => setFailed((prev) => new Set([...prev, i]));

  const allFailed = paths.every((_, i) => failed.has(i));
  if (allFailed) return null;

  if (MOBILE_SCREEN_PROJECTS.has(slug)) {
    return (
      <Block label="Screens" accent={accent}>
        <div className="cs-phone-gallery">
          {paths.map((src, i) =>
            !failed.has(i) ? (
              <div key={i} className="cs-phone-shot">
                <img src={src} alt={`Screen ${i + 1}`} onError={() => fail(i)} />
              </div>
            ) : null
          )}
        </div>
      </Block>
    );
  }

  const show1 = !failed.has(1);
  const show2 = !failed.has(2);

  return (
    <Block label="Screens" accent={accent}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Large hero screenshot */}
        {!failed.has(0) && (
          <div style={{ ...tileBase, aspectRatio: "16 / 9", maxHeight: "520px" }}>
            <img src={paths[0]} alt="Screen 1" style={imgContain} onError={() => fail(0)} />
          </div>
        )}
        {/* Two side-by-side */}
        {(show1 || show2) && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {show1 && (
              <div style={{ ...tileBase, aspectRatio: "16 / 9", maxHeight: "360px" }}>
                <img src={paths[1]} alt="Screen 2" style={imgContain} onError={() => fail(1)} />
              </div>
            )}
            {show2 && (
              <div style={{ ...tileBase, aspectRatio: "16 / 9", maxHeight: "360px" }}>
                <img src={paths[2]} alt="Screen 3" style={imgContain} onError={() => fail(2)} />
              </div>
            )}
          </div>
        )}
      </div>
    </Block>
  );
}

// ─── Dynamic section renderer ──────────────────────────────────────────────

function SectionBlock({
  section,
  accent,
}: {
  section: PortfolioProject["sections"][number];
  accent: string;
}) {
  if (section.type === "full-text" && section.body) {
    return (
      <Block label={section.heading ?? "Note"} accent={accent}>
        <Body>{section.body}</Body>
      </Block>
    );
  }

  if (section.type === "two-col" && section.cols) {
    return (
      <Block label={section.heading ?? "Detail"} accent={accent}>
        <div className="cs-two-col">
          {section.cols.map((col, i) => (
            <div key={i}>
              <span
                style={{
                  ...MONO,
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: accent,
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                {col.heading}
              </span>
              <Body>{col.body}</Body>
            </div>
          ))}
        </div>
      </Block>
    );
  }

  if (section.type === "process-steps" && section.steps) {
    return (
      <Block label="Process" accent={accent}>
        <ol className="cs-steps">
          {section.steps.map((step, i) => (
            <li key={i} className="cs-step">
              <span className="cs-step-num" style={{ color: accent }}>
                {step.number}
              </span>
              <div>
                <h4
                  className="font-display text-ink"
                  style={{
                    fontSize: "clamp(16px, 1.6vw, 20px)",
                    lineHeight: "1.15",
                    letterSpacing: "-0.015em",
                    marginBottom: "8px",
                    fontVariationSettings: '"opsz" 20',
                  }}
                >
                  {step.title}
                </h4>
                <Body>{step.body}</Body>
              </div>
            </li>
          ))}
        </ol>
      </Block>
    );
  }

  if (section.type === "quote" && section.quote) {
    return (
      <Reveal>
        <div
          style={{
            padding: "clamp(24px, 3.5vw, 40px)",
            borderLeft: `3px solid ${accent}`,
            background: "hsl(var(--bg-alt))",
            margin: "clamp(24px, 4vw, 40px) 0",
          }}
        >
          <blockquote
            className="font-display text-ink"
            style={{
              fontSize: "clamp(18px, 2.2vw, 26px)",
              lineHeight: "1.4",
              letterSpacing: "-0.015em",
              fontVariationSettings: '"opsz" 26',
              marginBottom: "14px",
            }}
          >
            "{section.quote}"
          </blockquote>
          {section.attribution && (
            <cite
              style={{
                ...MONO,
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: accent,
                fontStyle: "normal",
              }}
            >
              {section.attribution}
            </cite>
          )}
        </div>
      </Reveal>
    );
  }

  return null;
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = portfolioContent;
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return <NotFound />;

  const project   = projects[idx];
  const prev      = idx > 0 ? projects[idx - 1] : null;
  const next      = idx < projects.length - 1 ? projects[idx + 1] : null;
  const accent    = project.accentColor;

  const metaItems = [
    { label: "Role",     value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Team",     value: project.team },
    { label: "Status",   value: project.status },
  ];

  return (
    <div style={{ background: "hsl(var(--bg))", color: "hsl(var(--ink))", minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header style={{ borderBottom: "1px solid hsl(var(--rule))" }}>
        <div
          className="container-wide"
          style={{
            paddingTop: "clamp(88px, 10vw, 112px)",
            paddingBottom: "clamp(36px, 4.5vw, 52px)",
          }}
        >
          {/* Back link */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ marginBottom: "clamp(24px, 3.5vw, 36px)" }}
          >
            <Link
              to="/"
              className="font-mono-label text-ink-60 hover:text-cobalt transition-colors duration-200"
              style={{ ...MONO, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              ← Back to Work
            </Link>
          </motion.div>

          {/* Two-column: text left, ambient preview right */}
          <div className="cs-hero-layout">

            {/* Left: title + meta */}
            <div className="cs-hero-text">
              {/* Index + category */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease }}
                style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "clamp(14px, 1.8vw, 20px)" }}
              >
                <span
                  className="font-mono-label text-ink-30"
                  style={{ ...MONO, fontSize: "11px", letterSpacing: "0.12em" }}
                >
                  {project.index}
                </span>
                <span
                  className="font-mono-label"
                  style={{ ...MONO, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}
                >
                  {project.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease }}
                className="font-display text-ink cs-hero-title"
                style={{
                  lineHeight: "0.93",
                  letterSpacing: "-0.04em",
                  fontVariationSettings: '"opsz" 120',
                  marginBottom: "clamp(10px, 1.5vw, 16px)",
                }}
              >
                {project.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
                className="font-display-italic"
                style={{
                  fontSize: "clamp(15px, 1.7vw, 22px)",
                  lineHeight: "1.25",
                  letterSpacing: "-0.01em",
                  color: "hsl(var(--ink-60))",
                  fontVariationSettings: '"opsz" 24',
                  marginBottom: "clamp(24px, 3.5vw, 40px)",
                }}
              >
                {project.subtitle}
              </motion.p>

              {/* Metadata row */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease }}
                className="cs-meta-row"
              >
                {metaItems.map((m) => (
                  <div key={m.label}>
                    <span
                      style={{
                        ...MONO,
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "hsl(var(--ink-30))",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {m.label}
                    </span>
                    <span
                      style={{
                        ...MONO,
                        fontSize: "12px",
                        letterSpacing: "0.02em",
                        color: "hsl(var(--ink))",
                      }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: ambient project preview — desktop only */}
            <div className="cs-hero-float">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 0.52, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
                whileHover={reduce ? {} : { opacity: 0.76, scale: 1.02 }}
                style={{
                  rotate: -1.5,
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid hsl(var(--rule))",
                  boxShadow: "var(--sh-card)",
                  background: project.gradient,
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <img
                  src={project.banner}
                  alt=""
                  aria-hidden="true"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main
        className="container-wide"
        style={{
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(80px, 10vw, 128px)",
        }}
      >
        <Block label="Overview" accent={accent}>
          <Body>{project.overview}</Body>
        </Block>

        <Block label="Problem" accent={accent}>
          <Body>{project.problem}</Body>
        </Block>

        <Block label="Solution" accent={accent}>
          <Body>{project.solution}</Body>
        </Block>

        <Block label="Users" accent={accent}>
          <Body>{project.users}</Body>
        </Block>

        <Block label="Research" accent={accent}>
          <Body>{project.research}</Body>
        </Block>

        <Block label="Insights" accent={accent}>
          <ol className="cs-insights">
            {project.insights.map((insight, i) => (
              <li key={i} className="cs-insight-item">
                <span className="cs-insight-num" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Body>{insight}</Body>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Ideation" accent={accent}>
          <Body>{project.ideation}</Body>
        </Block>

        <Block label="Wireframes" accent={accent}>
          <Body>{project.wireframes}</Body>
        </Block>

        <ScreenshotGallery slug={project.slug} accent={accent} />

        {project.sections.map((section, i) => (
          <SectionBlock key={i} section={section} accent={accent} />
        ))}

        <Block label="Outcome" accent={accent}>
          <Body>{project.outcome}</Body>
        </Block>

        <Block label="Impact" accent={accent}>
          <ul className="cs-impact">
            {project.impact.map((item, i) => (
              <li key={i} className="cs-impact-item">
                <span style={{ color: accent, flexShrink: 0, fontSize: "14px" }}>→</span>
                <Body>{item}</Body>
              </li>
            ))}
          </ul>
        </Block>

        {/* Obsession + Before / After */}
        <Block label="Detail" accent={accent}>
          <div>
            <p
              className="font-display-italic text-ink"
              style={{
                fontSize: "clamp(16px, 1.8vw, 22px)",
                lineHeight: "1.4",
                letterSpacing: "-0.01em",
                fontVariationSettings: '"opsz" 22',
                marginBottom: "clamp(20px, 3vw, 28px)",
              }}
            >
              {project.obsession}
            </p>
            <div className="cs-before-after">
              <div>
                <span
                  style={{
                    ...MONO,
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "hsl(var(--ink-30))",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Before
                </span>
                <p style={{ ...MONO, fontSize: "13px", lineHeight: "1.65", color: "hsl(var(--ink-60))" }}>
                  {project.beforeAfter.before}
                </p>
              </div>
              <div>
                <span
                  style={{
                    ...MONO,
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: accent,
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  After
                </span>
                <p style={{ ...MONO, fontSize: "13px", lineHeight: "1.65", color: "hsl(var(--ink))" }}>
                  {project.beforeAfter.after}
                </p>
              </div>
            </div>
          </div>
        </Block>
      </main>

      {/* ── Prev / Next navigation ─────────────────────────────────────── */}
      <nav aria-label="Project navigation" style={{ borderTop: "1px solid hsl(var(--rule))" }}>
        <div className="container-wide cs-project-nav">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="cs-nav-pill">
              <span className="cs-nav-pill-arrow cs-nav-pill-arrow-left">←</span>
              <span className="cs-nav-pill-inner">
                <span className="cs-nav-pill-dir">Previous</span>
                <span className="cs-nav-pill-title font-display">{prev.title}</span>
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/work/${next.slug}`} className="cs-nav-pill cs-nav-pill-right">
              <span className="cs-nav-pill-inner cs-nav-pill-inner-right">
                <span className="cs-nav-pill-dir">Next</span>
                <span className="cs-nav-pill-title font-display">{next.title}</span>
              </span>
              <span className="cs-nav-pill-arrow cs-nav-pill-arrow-right">→</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

    </div>
  );
}
