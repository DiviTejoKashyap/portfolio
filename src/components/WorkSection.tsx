import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioContent } from "@/data/portfolioContent";
import type { PortfolioProject } from "@/data/portfolioContent";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 12-column bento — two balanced rows
// Row 1: Lume.Sys (6) | Vault DS (6)
// Row 2: Sync.Collab (4) | Pulse (4) | Solo Leveling OS (4)
const SPANS: Array<{ col: string; row: string }> = [
  { col: "1 / 7",  row: "1 / 2" },
  { col: "7 / 13", row: "1 / 2" },
  { col: "1 / 5",  row: "2 / 3" },
  { col: "5 / 9",  row: "2 / 3" },
  { col: "9 / 13", row: "2 / 3" },
];

const WorkSection = () => {
  const { projects } = portfolioContent;
  const reduce = useReducedMotion();

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const previewX = useSpring(0, { stiffness: 160, damping: 24 });
  const previewY = useSpring(0, { stiffness: 160, damping: 24 });
  const lastProject = useRef<PortfolioProject | null>(null);
  const activeProject = projects.find((p) => p.slug === activeSlug) ?? null;
  if (activeProject) lastProject.current = activeProject;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      previewX.set(e.clientX + 28);
      previewY.set(e.clientY - 28);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [previewX, previewY, reduce]);

  return (
    <section
      id="work"
      className="w-full border-t border-rule"
      style={{ paddingBottom: "clamp(72px, 7vw, 96px)" }}
    >
      {/* ── Section header ── */}
      <motion.div
        className="container-wide"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        style={{
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(20px, 2.5vw, 32px)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <p
          className="font-mono-label text-ink-60"
          style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Selected work
        </p>
        <span
          className="font-mono-label text-ink-30"
          style={{ fontSize: "10px", letterSpacing: "0.1em" }}
          aria-hidden="true"
        >
          2024 to 2026
        </span>
      </motion.div>

      {/* ── Bento grid ── */}
      <div className="container-wide work-bento-grid">
        {projects.map((project, idx) => (
          <BentoCard
            key={project.slug}
            project={project}
            index={idx}
            span={SPANS[idx] ?? { col: "auto", row: "auto" }}
            lineClamp={idx < 2 ? 4 : 3}
            onEnter={() => setActiveSlug(project.slug)}
            onLeave={() => setActiveSlug(null)}
          />
        ))}
      </div>

      {/* ── Cursor-following preview (desktop / pointer:fine only) ── */}
      <motion.div
        className="work-preview-float"
        style={{ x: previewX, y: previewY }}
        animate={{ opacity: activeSlug ? 1 : 0, scale: activeSlug ? 1 : 0.94 }}
        transition={{ opacity: { duration: 0.14 }, scale: { duration: 0.2, ease } }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "clamp(260px, 24vw, 380px)",
            aspectRatio: "16 / 10",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid hsl(var(--rule))",
            boxShadow: "var(--sh-card)",
            background: lastProject.current?.gradient ?? "hsl(var(--bg-alt))",
          }}
        >
          {lastProject.current && (
            <img
              src={lastProject.current.banner}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

function BentoCard({
  project,
  index,
  span,
  lineClamp,
  onEnter,
  onLeave,
}: {
  project: PortfolioProject;
  index: number;
  span: { col: string; row: string };
  lineClamp: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="work-bento-card"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      whileHover={reduce ? {} : { y: -3 }}
      style={{ gridColumn: span.col, gridRow: span.row }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        to={`/work/${project.slug}`}
        aria-label={`${project.title} — ${project.subtitle}`}
        style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
      >
        <div className="work-bento-content">

          {/* Top row: category + index */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span
              className="font-mono-label"
              style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: project.accentColor }}
            >
              {project.category}
            </span>
            <span
              className="font-mono-label text-ink-30"
              style={{ fontSize: "10px", letterSpacing: "0.1em" }}
            >
              {project.index}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display text-ink"
            style={{
              fontSize: "clamp(1.5rem, 2.2vw, 2.35rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              fontVariationSettings: '"opsz" 96',
              marginBottom: "8px",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="font-mono-label"
            style={{ fontSize: "12px", letterSpacing: "0.02em", color: "hsl(var(--ink-60))", marginBottom: "10px" }}
          >
            {project.subtitle}
          </p>

          {/* Context — project.body, clamped by line count */}
          <p
            className="text-ink-60"
            style={{
              fontSize: "clamp(13px, 1.15vw, 15px)",
              lineHeight: "1.65",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: lineClamp,
              marginBottom: "0",
            }}
          >
            {project.body}
          </p>

          {/* Footer — pushed to bottom */}
          <div style={{ marginTop: "auto" }}>
          {/* Divider */}
          <div style={{ height: "1px", background: "hsl(var(--rule))", margin: "20px 0 16px" }} />

          {/* Bottom meta row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span
                className="font-mono-label text-ink-60"
                style={{ fontSize: "11px", letterSpacing: "0.02em" }}
              >
                {project.role}
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <span className="font-mono-label text-ink-30" style={{ fontSize: "10px", letterSpacing: "0.04em" }}>
                  {project.timeline}
                </span>
                <span
                  className="font-mono-label"
                  style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--ink-30))" }}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <span
              className="work-bento-arrow font-mono-label"
              style={{ fontSize: "16px", color: project.accentColor }}
            >
              →
            </span>
          </div>
          </div>{/* /footer */}

        </div>
      </Link>
    </motion.div>
  );
}

export default WorkSection;
