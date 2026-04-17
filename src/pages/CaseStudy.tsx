import React, { useEffect, useState, FC } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project, CaseStudySection } from "@/data/projects";
import NotFound from "./NotFound";

/* ════════════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
   These are the genuinely reusable bits. Each per-project layout still
   composes them differently — visual identity preserved.
   ════════════════════════════════════════════════════════════════════════ */

// ─── Lightbox ──────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", cursor: "zoom-out",
        backdropFilter: "blur(8px)",
      }}
    >
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "90vh",
          objectFit: "contain", borderRadius: "12px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
          cursor: "default",
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: "20px", right: "24px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: "40px", height: "40px",
          color: "white", fontSize: "18px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

// ─── BackLink + Footer ─────────────────────────────────────────────────────

function BackLink({ color }: { color: string }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
      style={{ color }}
    >
      ← Back to work
    </Link>
  );
}

function Footer({ accent, dark }: { accent: string; dark: boolean }) {
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(20,18,16,0.1)";
  const dimColor = dark ? "rgba(255,255,255,0.2)" : "rgba(20,18,16,0.3)";
  return (
    <footer style={{ borderTop: `1px solid ${borderColor}` }}>
      <div className="max-w-[1200px] mx-auto px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-60" style={{ color: accent }}>
          ← All Projects
        </Link>
        <div className="text-[11px] uppercase tracking-[0.1em]" style={{ color: dimColor, fontFamily: "monospace" }}>
          Tejo Kashyap Divi · Portfolio 2026
        </div>
      </div>
    </footer>
  );
}

// ─── Screenshot slot type + Img with fallback ──────────────────────────────

interface ScreenshotSlot {
  src: string | null;
  label: string;
  caption: string;
  wide?: boolean;
}

/**
 * Image with onError fallback that shows the caption (per user preference).
 * Used by all screenshot layouts so a 404 degrades to a styled placeholder
 * rather than a broken-image icon.
 */
function Img({
  src, alt, caption, accent, dark,
  className, style, onClick,
}: {
  src: string | null;
  alt: string;
  caption?: string;
  accent: string;
  dark: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [broken, setBroken] = useState(!src);
  const phBg = dark ? "rgba(255,255,255,0.03)" : "rgba(20,18,16,0.03)";
  const phBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(20,18,16,0.08)";
  const labelColor = dark ? "rgba(255,255,255,0.35)" : "rgba(20,18,16,0.4)";
  const dimColor = dark ? "rgba(255,255,255,0.2)" : "rgba(20,18,16,0.25)";

  if (broken || !src) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: phBg,
          border: `1.5px dashed ${phBorder}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "40px 24px",
          minHeight: "240px",
        }}
      >
        <svg
          width="28" height="28" viewBox="0 0 24 24"
          fill="none" stroke={accent} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: 0.35 }}
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <span style={{
          fontFamily: "monospace", fontSize: "10px",
          color: labelColor, letterSpacing: "0.1em",
          textTransform: "uppercase", textAlign: "center",
          maxWidth: "320px", lineHeight: 1.5,
        }}>
          {caption || alt}
        </span>
        <span style={{
          fontFamily: "monospace", fontSize: "9px",
          color: dimColor, letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          Image pending export
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "auto", display: "block", cursor: onClick ? "zoom-in" : "default", ...style }}
      loading="lazy"
      onClick={onClick}
      onError={() => setBroken(true)}
    />
  );
}

// ─── Tiny shared text primitives ───────────────────────────────────────────

function SectionLabel({ label, accent, dark }: { label: string; accent: string; dark: boolean }) {
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(20,18,16,0.1)";
  const color = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.3)";
  return (
    <div className="flex items-center gap-4 mb-6">
      <span style={{
        fontFamily: "monospace", fontSize: "9px", color,
        letterSpacing: "0.2em", textTransform: "uppercase",
      }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: border }} />
    </div>
  );
}

function Caption({ text, color }: { text: string; color: string }) {
  return (
    <div style={{
      fontFamily: "monospace", fontSize: "10px", color,
      letterSpacing: "0.04em", marginTop: "8px",
      paddingLeft: "2px", lineHeight: 1.5,
    }}>
      {text}
    </div>
  );
}

/**
 * One screenshot frame — image + caption, with fallback wired in.
 * This replaces ~30 lines of duplicated JSX across the layout components.
 */
function ScreenFrame({
  slot, accent, dark, onImageClick, captionColor, borderRadius = "10px",
}: {
  slot: ScreenshotSlot;
  accent: string;
  dark: boolean;
  onImageClick: (src: string, alt: string) => void;
  captionColor: string;
  borderRadius?: string;
}) {
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(20,18,16,0.1)";
  return (
    <>
      <div style={{ border: `1px solid ${border}`, borderRadius, overflow: "hidden" }}>
        <Img
          src={slot.src}
          alt={slot.label}
          caption={slot.caption}
          accent={accent}
          dark={dark}
          onClick={() => slot.src && onImageClick(slot.src, slot.label)}
        />
      </div>
      <Caption text={slot.caption} color={captionColor} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PER-PROJECT SCREENSHOT LAYOUTS
   Each retains its own composition. The duplication is gone — they all
   compose ScreenFrame + Caption + SectionLabel — but visual variation
   stays intact.
   ════════════════════════════════════════════════════════════════════════ */

// ── LUME: hero + 2-col below
function LumeScreenshots({ slots, accent, dark, onImageClick }: {
  slots: ScreenshotSlot[]; accent: string; dark: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const cap = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.35)";
  const [s0, s1, s2] = slots;
  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label="Final Design" accent={accent} dark={dark} />
      {s0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "16px" }}>
          <ScreenFrame slot={s0} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} borderRadius="12px" />
        </motion.div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[s1, s2].map((s, i) => s && (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
            <ScreenFrame slot={s} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── VAULT: hero + 2-col grid (3 children)
function VaultScreenshots({ slots, accent, dark, onImageClick }: {
  slots: ScreenshotSlot[]; accent: string; dark: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const cap = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.35)";
  const [s0, s1, s2, s3] = slots;
  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label="Final Design" accent={accent} dark={dark} />
      {s0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "16px" }}>
          <ScreenFrame slot={s0} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} borderRadius="12px" />
        </motion.div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[s1, s2, s3].map((s, i) => s && (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
            <ScreenFrame slot={s} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── SYNC: same shape as Vault, kept distinct in case it diverges later
function SyncScreenshots({ slots, accent, dark, onImageClick }: {
  slots: ScreenshotSlot[]; accent: string; dark: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const cap = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.35)";
  const [s0, s1, s2, s3] = slots;
  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label="Final Design" accent={accent} dark={dark} />
      {s0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "16px" }}>
          <ScreenFrame slot={s0} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} borderRadius="12px" />
        </motion.div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[s1, s2, s3].map((s, i) => s && (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
            <ScreenFrame slot={s} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── PULSE: 3 phones, center elevated (the special case — kept as-is)
function PulseScreenshots({ slots, accent, dark, onImageClick }: {
  slots: ScreenshotSlot[]; accent: string; dark: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const cap = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.35)";
  const [s0, s1, s2] = slots;
  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label="App Screenshots" accent={accent} dark={dark} />
      <div style={{
        display: "flex", gap: "24px", alignItems: "flex-start",
        justifyContent: "center", padding: "0 0 24px 0",
      }}>
        {([s0, s1, s2] as (ScreenshotSlot | undefined)[]).map((s, i) => s && (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
            style={{
              flex: "0 0 30%",
              paddingTop: i === 1 ? "0px" : "52px",
              transform: i === 1 ? "scale(1)" : "scale(0.88)",
              transformOrigin: "top center",
              filter: i === 1 ? "none" : "brightness(0.7)",
            }}
          >
            <div style={{
              borderRadius: "36px", overflow: "hidden",
              boxShadow: i === 1
                ? "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(20,184,166,0.25)"
                : "0 20px 40px rgba(0,0,0,0.5)",
            }}>
              <Img
                src={s.src}
                alt={s.label}
                caption={s.caption}
                accent={accent}
                dark={dark}
                onClick={() => s.src && onImageClick(s.src, s.label)}
                style={{ verticalAlign: "bottom" }}
              />
            </div>
            <div style={{
              fontFamily: "monospace", fontSize: "10px", color: cap,
              marginTop: "12px", paddingLeft: "4px",
              letterSpacing: "0.04em", lineHeight: 1.5,
            }}>
              {s.caption}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── SOLO: hero + 2-col bottom
function SoloScreenshots({ slots, accent, dark, onImageClick }: {
  slots: ScreenshotSlot[]; accent: string; dark: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const cap = dark ? "rgba(255,255,255,0.25)" : "rgba(20,18,16,0.35)";
  const [s0, s1, s2] = slots;
  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label="Final Design" accent={accent} dark={dark} />
      {s0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "16px" }}>
          <ScreenFrame slot={s0} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} borderRadius="12px" />
        </motion.div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[s1, s2].map((s, i) => s && (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}>
            <ScreenFrame slot={s} accent={accent} dark={dark} onImageClick={onImageClick} captionColor={cap} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PROTOTYPE PREVIEW
   Renders the previewFile (HTML mockup) as a thumbnail iframe with an
   "Open full prototype" button. Lazy-loaded, sandboxed, themed via accent.
   ════════════════════════════════════════════════════════════════════════ */

function PrototypePreview({ file, accent, dark, label = "Live Prototype" }: {
  file: string;
  accent: string;
  dark: boolean;
  label?: string;
}) {
  const border = dark ? "rgba(255,255,255,0.1)" : "rgba(20,18,16,0.12)";
  const cap = dark ? "rgba(255,255,255,0.4)" : "rgba(20,18,16,0.5)";

  return (
    <div style={{ marginBottom: "80px" }}>
      <SectionLabel label={label} accent={accent} dark={dark} />

      {/* Iframe thumbnail — capped height, 16:10 aspect, lazy loaded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          border: `1px solid ${border}`,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          aspectRatio: "16 / 10",
          maxHeight: "560px",
          background: dark ? "#0a0a08" : "#ffffff",
        }}
      >
        <iframe
          src={file}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          title={`${label} preview`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: "none",
            /* Slight zoom-out so dense mockups read at thumbnail size.
               Inverse-scale the dimensions (1/0.85 ≈ 117.65%) so the
               scaled iframe still fills the container. */
            transform: "scale(0.85)",
            transformOrigin: "top left",
            width: "117.65%",
            height: "117.65%",
          }}
        />
      </motion.div>

      {/* CTA + caption row */}
      <div className="flex items-center justify-between gap-4 mt-4 flex-wrap">
        <div style={{
          fontFamily: "monospace", fontSize: "10px",
          color: cap, letterSpacing: "0.04em", lineHeight: 1.5,
        }}>
          Interactive prototype — built without backend, deployed as static HTML.
        </div>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 transition-opacity hover:opacity-80"
          style={{
            background: accent,
            color: dark ? "#0a0a08" : "#ffffff",
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "4px",
            fontWeight: 600,
          }}
        >
          Open full prototype ↗
        </a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STRUCTURED + DYNAMIC SECTION RENDERERS
   (unchanged from original — these were already clean)
   ════════════════════════════════════════════════════════════════════════ */

function SectionRenderer({ section, accent, dark, theme }: {
  section: CaseStudySection;
  accent: string;
  dark: boolean;
  theme: "lume" | "vault" | "sync" | "pulse";
}) {
  const dimText    = dark ? "rgba(200,196,176,0.6)" : "rgba(30,26,22,0.55)";
  const text       = dark ? "#c8c4b0" : "#1e1a16";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(20,18,16,0.1)";
  const surfaceBg  = dark ? "rgba(255,255,255,0.03)" : "rgba(20,18,16,0.03)";
  const hFont = { lume: "'IBM Plex Mono',monospace", vault: "'Inter',sans-serif", sync: "'Newsreader',serif", pulse: "'Inter',sans-serif" }[theme];
  const bFont = { lume: "'IBM Plex Sans',sans-serif", vault: "'Inter',sans-serif", sync: "'Plus Jakarta Sans',sans-serif", pulse: "'Inter',sans-serif" }[theme];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
      {section.type === "stat-row" && section.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-4" style={{ background: borderColor }}>
          {section.stats.map((stat, i) => (
            <div key={i} className="px-6 py-8 flex flex-col" style={{ background: dark ? "#0a0a08" : "#faf7f2" }}>
              <div className="leading-none mb-2" style={{ fontSize: "clamp(28px,4vw,48px)", color: accent, fontFamily: hFont, fontWeight: 300 }}>{stat.value}</div>
              <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: dimText, fontFamily: "monospace" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      {section.type === "full-text" && (
        <div className="py-12 border-t" style={{ borderColor }}>
          {section.heading && <h2 className="mb-6 leading-tight" style={{ fontSize: "clamp(22px,2.5vw,32px)", color: text, fontFamily: hFont, fontWeight: 700 }}>{section.heading}</h2>}
          <p className="text-[15px] leading-[1.9] max-w-[680px]" style={{ color: dimText, fontFamily: bFont, fontWeight: 300 }}>{section.body}</p>
        </div>
      )}
      {section.type === "two-col" && section.cols && (
        <div className="py-12 border-t grid md:grid-cols-2 gap-0" style={{ borderColor }}>
          {section.cols.map((col, i) => (
            <div key={i} className={i > 0 ? "pl-10 border-l" : "pr-10"} style={{ borderColor }}>
              <h3 className="text-[13px] font-semibold mb-4 uppercase tracking-[0.06em]" style={{ color: accent, fontFamily: "monospace" }}>{col.heading}</h3>
              <p className="text-[14px] leading-[1.9]" style={{ color: dimText, fontFamily: bFont, fontWeight: 300 }}>{col.body}</p>
            </div>
          ))}
        </div>
      )}
      {section.type === "process-steps" && section.steps && (
        <div className="py-12 border-t" style={{ borderColor }}>
          <div className="text-[9px] uppercase tracking-[0.2em] mb-10" style={{ color: dimText, fontFamily: "monospace" }}>Process</div>
          <div className="grid md:grid-cols-2 gap-4">
            {section.steps.map((step, i) => (
              <div key={i} className="p-6" style={{ background: surfaceBg, border: `1px solid ${borderColor}` }}>
                <div className="text-[26px] font-light mb-3" style={{ color: accent, fontFamily: hFont, opacity: 0.4 }}>{step.number}</div>
                <h4 className="text-[14px] font-semibold mb-3" style={{ color: text, fontFamily: bFont }}>{step.title}</h4>
                <p className="text-[13px] leading-[1.8]" style={{ color: dimText, fontFamily: bFont, fontWeight: 300 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {section.type === "quote" && (
        <div className="py-12 px-8 border-y my-4" style={{ borderColor, background: surfaceBg }}>
          <blockquote>
            <p className="leading-[1.6] mb-4" style={{ fontSize: "clamp(18px,2.5vw,26px)", color: text, fontFamily: hFont, fontStyle: "italic", fontWeight: 300 }}>"{section.quote}"</p>
            <cite className="text-[10px] uppercase tracking-[0.14em] not-italic" style={{ color: accent, fontFamily: "monospace" }}>— {section.attribution}</cite>
          </blockquote>
        </div>
      )}
    </motion.div>
  );
}

function StructuredSections({
  p, accent, dark, fontFamily, containerClass = "px-8 max-w-[1200px] mx-auto",
}: {
  p: Project; accent: string; dark: boolean; fontFamily: string; containerClass?: string;
}) {
  const dim = dark ? "rgba(200,196,176,0.55)" : "rgba(30,26,22,0.5)";
  const text = dark ? "#c8c4b0" : "#1e1a16";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(20,18,16,0.1)";

  const labelStyle: React.CSSProperties = {
    fontFamily: "monospace", fontSize: "9px", color: accent,
    letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px",
  };
  const bodyStyle: React.CSSProperties = {
    fontFamily, fontSize: "14px", lineHeight: 1.9, color: dim, fontWeight: 300,
  };

  const textSections: { label: string; content: string }[] = [
    { label: "USERS", content: p.users },
    { label: "RESEARCH", content: p.research },
    { label: "IDEATION", content: p.ideation },
    { label: "WIREFRAMES", content: p.wireframes },
  ];

  return (
    <div className={containerClass}>
      {textSections.slice(0, 2).map((sec, i) => (
        <motion.div
          key={sec.label}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
          className="py-10 border-t" style={{ borderColor }}
        >
          <div style={labelStyle}>{sec.label}</div>
          <p style={bodyStyle}>{sec.content}</p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
        className="py-10 border-t" style={{ borderColor }}
      >
        <div style={labelStyle}>INSIGHTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {p.insights.map((insight, j) => (
            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: accent, marginTop: "2px", flexShrink: 0 }}>0{j + 1}</span>
              <p style={{ ...bodyStyle, color: text }}>{insight}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {textSections.slice(2).map((sec, i) => (
        <motion.div
          key={sec.label}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: (i + 3) * 0.05, duration: 0.5 }}
          className="py-10 border-t" style={{ borderColor }}
        >
          <div style={labelStyle}>{sec.label}</div>
          <p style={bodyStyle}>{sec.content}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SCREENSHOT DATA
   All paths point at /public/screenshots/. If a file 404s, the Img
   component now falls back to a styled placeholder showing the caption.
   ════════════════════════════════════════════════════════════════════════ */

const lumeScreenshots: ScreenshotSlot[] = [
  { src: "/screenshots/lume-1.png", label: "Hub overview — project, capture log, literature, activity",
    caption: "01 — Project overview panel, capture log, linked literature table, activity pipeline", wide: true },
  { src: "/screenshots/lume-3.png", label: "Read mode — annotated paper with margin notes",
    caption: "02 — Document reader: outline, highlighted text, CRITICAL + LITERATURE margin notes" },
  { src: "/screenshots/lume-2.png", label: "Work Board — kanban TO DO / DOING / DONE",
    caption: "03 — Three-column board with hardware, neurology, and UX task cards" },
];

const vaultScreenshots: ScreenshotSlot[] = [
  { src: "/screenshots/vault-1.png", label: "Cockpit Hub — latency, policy violations, deployments",
    caption: "01 — Global latency 38ms healthy, 24 policy violations critical, network throughput chart, recent alerts", wide: true },
  { src: "/screenshots/vault-2.png", label: "Audit Readiness — framework compliance table",
    caption: "02 — SOC 2, HIPAA, GDPR, ISO 27001, PCI-DSS, NIST CSF compliance status with failing controls" },
  { src: "/screenshots/vault-3.png", label: "Network Edge — edge compute topology",
    caption: "03 — 7 edge nodes with CPU/RAM usage bars, status indicators, rebalance load action" },
  { src: "/screenshots/vault-4.png", label: "Incident Reports — security log table",
    caption: "04 — Req ID, timestamp, actor, action, Blocked/Warning/Success status per event" },
];

const syncScreenshots: ScreenshotSlot[] = [
  { src: "/screenshots/sync-1.png", label: "Dashboard — workspace home with active projects",
    caption: "01 — Stats row, active project progress bars, needs attention list, active now presence, recent activity", wide: true },
  { src: "/screenshots/sync-3.png", label: "Reviews — design review with comment thread",
    caption: "02 — Workspace Navigation Redesign v3, Question/Approval/Change Request comment types, resolve flow" },
  { src: "/screenshots/sync-4.png", label: "Tasks — kanban board with 4 columns",
    caption: "03 — To Do, In Progress, In Review, Done with priority tags, labels, assignee avatars" },
  { src: "/screenshots/sync-2.png", label: "Channels — async team messaging",
    caption: "04 — #product-feedback channel with research thread from Maya, Sam, Alex, and Riley" },
];

const pulseScreenshots: ScreenshotSlot[] = [
  { src: "/screenshots/pulse-1.png", label: "Daily Snapshot — recovery, sleep, stress + 14-day grid",
    caption: "01 — Recovery 92/100, sleep 8.6h, stress 51/100, last 14 days pattern grid, signals section", wide: true },
  { src: "/screenshots/pulse-2.png", label: "Deep Dive — 28-day recovery trend chart",
    caption: "02 — Recovery trend line chart with interpretation shortcuts, plan progress sidebar" },
  { src: "/screenshots/pulse-3.png", label: "Profile — user preferences and goal settings",
    caption: "03 — Name, goal selection (Better Sleep / Lower Stress / Performance / Consistency), baseline" },
];

const soloScreenshots: ScreenshotSlot[] = [
  { src: "/screenshots/solo-1.png", label: "Command Center — hunter status, gate queue, daily quests",
    caption: "01 — Shadow Realm capture, Rank B hunter 850/2000 XP, gate queue with S/A/B priority, daily quests 2/4", wide: true },
  { src: "/screenshots/solo-2.png", label: "Shadow Realm — thought capture and classification",
    caption: "02 — Keyboard-first capture input, 9 items with unprocessed/routed/converted tags and confidence bars" },
  { src: "/screenshots/solo-3.png", label: "Hunter Stats — XP history, streak calendar, rank ladder",
    caption: "03 — 14-day XP chart, streak calendar grid, lifetime by domain bars, rank ladder E→S" },
];

/* ════════════════════════════════════════════════════════════════════════
   PER-PROJECT CASE STUDY LAYOUTS
   Each project has its own bespoke composition — visual identity preserved.
   ════════════════════════════════════════════════════════════════════════ */

function LumeCaseStudy({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  return (
    <div className="min-h-screen" style={{ background: "#0a0a08", color: "#c8c4b0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');`}</style>
      <div className="fixed inset-0 pointer-events-none z-10" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)" }} />

      <nav className="fixed top-0 left-0 right-0 z-20 h-12 flex items-center justify-between px-8 border-b" style={{ background: "rgba(10,10,8,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(232,164,39,0.15)" }}>
        <BackLink color="#e8a427" />
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "10px", color: "#e8a427", letterSpacing: "0.2em" }}>LUME.SYS — CASE STUDY</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#4a9e6b", letterSpacing: "0.12em" }}>LIVE</span>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-8 max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#e8a427", letterSpacing: "0.2em", marginBottom: "24px" }}>{p.eyebrow}</div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12 pb-12 border-b" style={{ borderColor: "rgba(232,164,39,0.15)" }}>
            <div className="flex-1">
              <h1 style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 300, lineHeight: 0.85, color: "#e8a427", textShadow: "0 0 20px rgba(232,164,39,0.5)", fontSize: "clamp(72px,14vw,160px)" }}>
                LUME<br /><span style={{ fontSize: "0.45em", color: "#5a5848" }}>.SYS</span>
              </h1>
            </div>
            <div style={{ maxWidth: "400px" }}>
              <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: 1.8, color: "#8a8070" }}>{p.overview}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border" style={{ borderColor: "rgba(232,164,39,0.15)" }}>
            {[{ label: "ROLE", value: p.role }, { label: "TIMELINE", value: p.timeline }, { label: "TEAM", value: p.team }, { label: "STATUS", value: p.status }].map((m, i) => (
              <div key={i} className="px-6 py-5 border-r last:border-r-0" style={{ background: "#0f0f0c", borderColor: "rgba(232,164,39,0.15)" }}>
                <div style={{ fontFamily: "monospace", fontSize: "8px", letterSpacing: "0.2em", color: "#3a3a2a", marginBottom: "8px" }}>{m.label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px", color: "#e8a427" }}>{m.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-8 max-w-[1200px] mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-4">
          {[{ label: "// PROBLEM", content: p.problem }, { label: "// SOLUTION", content: p.solution }].map((block, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8" style={{ background: "#0f0f0c", border: "1px solid rgba(42,42,34,0.8)" }}>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#e8a427", letterSpacing: "0.15em", marginBottom: "16px" }}>{block.label}</div>
              <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 300, fontSize: "13px", lineHeight: 1.9, color: "#8a8070" }}>{block.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <StructuredSections p={p} accent="#e8a427" dark fontFamily="'IBM Plex Sans',sans-serif" />

      <div className="px-8 max-w-[1200px] mx-auto">
        <LumeScreenshots slots={lumeScreenshots} accent="#e8a427" dark onImageClick={(src, alt) => setLightbox({ src, alt })} />
        {p.previewFile && <PrototypePreview file={p.previewFile} accent="#e8a427" dark />}
        {p.sections.map((s, i) => <SectionRenderer key={i} section={s} accent="#e8a427" dark theme="lume" />)}
      </div>

      <section className="px-8 max-w-[1200px] mx-auto mt-8 mb-24">
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#3a3a2a", letterSpacing: "0.2em", marginBottom: "24px" }}>// OUTCOME</div>
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(42,42,34,0.4)" }}>
          {p.impact.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="px-8 py-6 flex items-start gap-4" style={{ background: "#0a0a08" }}>
              <span style={{ color: "#e8a427", fontFamily: "monospace", fontSize: "10px", marginTop: "1px" }}>→</span>
              <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "13px", lineHeight: 1.7, color: "#8a8070" }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer accent="#e8a427" dark />
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

function VaultCaseStudy({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  return (
    <div className="min-h-screen" style={{ background: "#05070A", color: "#E2E8F0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      <nav className="fixed top-0 left-0 right-0 z-20 h-14 flex items-center justify-between px-8 border-b" style={{ background: "rgba(5,7,10,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.07)" }}>
        <BackLink color="#3b82f6" />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>VAULT DS — SYSTEM DOCUMENTATION</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 6px #10b981" }} />
          <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#10b981", letterSpacing: "0.1em" }}>AUDIT ACTIVE</span>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-8 max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#3b82f6", letterSpacing: "0.2em", marginBottom: "16px" }}>{p.eyebrow}</div>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#F1F5F9", marginBottom: "24px" }}>
            Vault<br /><span style={{ color: "#3b82f6" }}>DS</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "16px", lineHeight: 1.8, color: "rgba(226,232,240,0.5)", maxWidth: "520px" }}>{p.overview}</p>
        </motion.div>
        <div className="flex flex-wrap gap-3 mt-10">
          {[{ label: "Role", value: p.role }, { label: "Timeline", value: p.timeline }, { label: "Team", value: p.team }, { label: "Status", value: p.status }].map((m, i) => (
            <div key={i} className="px-4 py-2 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", display: "block", marginBottom: "2px" }}>{m.label.toUpperCase()}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "#3b82f6" }}>{m.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 max-w-[1200px] mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
          {[{ label: "THE PROBLEM", content: p.problem, bl: "3px solid #ef4444" }, { label: "THE SOLUTION", content: p.solution, bl: "3px solid #3b82f6" }].map((block, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8" style={{ background: "#080B0F", borderLeft: block.bl }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", marginBottom: "12px" }}>{block.label}</div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.9, color: "rgba(226,232,240,0.5)" }}>{block.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <StructuredSections p={p} accent="#3b82f6" dark fontFamily="'Inter',sans-serif" />

      <div className="px-8 max-w-[1200px] mx-auto">
        <VaultScreenshots slots={vaultScreenshots} accent="#3b82f6" dark onImageClick={(src, alt) => setLightbox({ src, alt })} />
        {p.previewFile && <PrototypePreview file={p.previewFile} accent="#3b82f6" dark />}
        {p.sections.map((s, i) => <SectionRenderer key={i} section={s} accent="#3b82f6" dark theme="vault" />)}
      </div>

      <section className="px-8 max-w-[1200px] mx-auto mt-8 mb-24">
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#3b82f6", letterSpacing: "0.2em", marginBottom: "16px" }}>// OUTCOME</div>
        <div className="grid md:grid-cols-2 gap-3">
          {p.impact.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#3b82f6", fontSize: "14px", flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", lineHeight: 1.7, color: "rgba(226,232,240,0.5)" }}>{item}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer accent="#3b82f6" dark />
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

function SyncCaseStudy({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF9", color: "#121212" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,700;1,6..72,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');`}</style>

      <nav className="fixed top-0 left-0 right-0 z-20 h-14 flex items-center justify-between px-8" style={{ background: "rgba(250,250,249,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E7E7E4" }}>
        <BackLink color="#2F6FED" />
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#737373", letterSpacing: "0.12em" }}>{p.title}</div>
        <div />
      </nav>

      <section className="pt-28 pb-0 max-w-[900px] mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#737373", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>{p.eyebrow}</div>
          <h1 style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: "clamp(48px,7vw,88px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#121212", marginBottom: "20px" }}>{p.title}</h1>
          <p style={{ fontFamily: "'Newsreader',serif", fontWeight: 300, fontStyle: "italic", fontSize: "22px", color: "#2F6FED", marginBottom: "32px" }}>{p.subtitle}</p>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: "16px", lineHeight: 1.8, color: "#737373", maxWidth: "600px" }}>{p.overview}</p>
        </motion.div>
        <div className="flex flex-wrap gap-x-12 gap-y-5 mt-10 pt-10 border-t" style={{ borderColor: "#E7E7E4" }}>
          {[{ label: "Role", value: p.role }, { label: "Timeline", value: p.timeline }, { label: "Team", value: p.team }, { label: "Status", value: p.status }].map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#B0B0AC", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "3px" }}>{m.label}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px", fontWeight: 500 }}>{m.value}</div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 w-full mt-2">
            {p.tags.map(t => <span key={t} style={{ fontFamily: "monospace", fontSize: "10px", padding: "4px 12px", background: "#EEF4FF", color: "#2F6FED", borderRadius: "20px" }}>{t}</span>)}
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-8 py-16 border-t mt-10" style={{ borderColor: "#E7E7E4" }}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#B0B0AC", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>The Problem</div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.9, color: "#737373" }}>{p.problem}</p>
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#2F6FED", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>The Solution</div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.9, color: "#737373" }}>{p.solution}</p>
          </div>
        </div>
      </section>

      <StructuredSections p={p} accent="#2F6FED" dark={false} fontFamily="'Plus Jakarta Sans',sans-serif" containerClass="max-w-[900px] mx-auto px-8" />

      <div className="max-w-[900px] mx-auto px-8">
        <SyncScreenshots slots={syncScreenshots} accent="#2F6FED" dark={false} onImageClick={(src, alt) => setLightbox({ src, alt })} />
        {p.previewFile && <PrototypePreview file={p.previewFile} accent="#2F6FED" dark={false} />}
        {p.sections.map((s, i) => <SectionRenderer key={i} section={s} accent="#2F6FED" dark={false} theme="sync" />)}
      </div>

      <section className="max-w-[900px] mx-auto px-8 py-16 mb-8">
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#B0B0AC", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "24px" }}>Outcome</div>
        <div className="grid md:grid-cols-2 gap-3">
          {p.impact.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-5" style={{ background: i === 0 ? "#2F6FED" : "#F6F6F4", borderRadius: "10px" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "13px", lineHeight: 1.7, color: i === 0 ? "white" : "#737373" }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer accent="#2F6FED" dark={false} />
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

function PulseCaseStudy({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const A = "#14b8a6";
  const BG = "#0c0f0e";
  const SURF = "#131916";
  const SURF2 = "#1a211e";
  const BORDER = "rgba(20,184,166,0.15)";
  const DIM = "rgba(203,213,225,0.55)";
  const TEXT = "#e2e8f0";

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Chivo+Mono:wght@300;400&display=swap');
        .pulse-noise::before { content:''; position:fixed; inset:0; background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events:none; z-index:1; }
      `}</style>
      <div className="pulse-noise" />

      <nav className="fixed top-0 left-0 right-0 z-20 h-14 flex items-center justify-between px-8" style={{ background: "rgba(12,15,14,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}` }}>
        <BackLink color={A} />
        <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "10px", color: "rgba(20,184,166,0.5)", letterSpacing: "0.15em" }}>PULSE · WELLNESS PLATFORM</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: A, boxShadow: `0 0 6px ${A}` }} />
          <span style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "9px", color: A, letterSpacing: "0.1em" }}>PROTOTYPE</span>
        </div>
      </nav>

      <section className="relative z-10 pt-28 pb-0 overflow-hidden">
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div className="max-w-[1100px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col lg:flex-row gap-12 items-start">
            <div style={{ flex: "0 0 50%" }}>
              <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "9px", color: A, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "24px", height: "1px", background: A }} />
                {p.eyebrow}
              </div>
              <h1 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "clamp(56px,8vw,96px)", lineHeight: 0.88, letterSpacing: "-0.03em", color: TEXT, marginBottom: "28px" }}>
                Pulse<br />
                <span style={{ color: A }}>Analytics</span>
              </h1>
              <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "17px", lineHeight: 1.75, color: DIM, marginBottom: "32px", maxWidth: "400px" }}>
                {p.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "10px", padding: "5px 12px", background: "rgba(20,184,166,0.08)", color: A, border: `1px solid ${BORDER}`, borderRadius: "4px" }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: BORDER }}>
              {[
                { value: "92", unit: "/100", label: "Recovery Score" },
                { value: "8.6", unit: "h", label: "Sleep Tracked" },
                { value: "3", unit: " screens", label: "Total Architecture" },
                { value: "86%", unit: "", label: "Workout Cadence" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.08 }} className="p-6 flex flex-col justify-between" style={{ background: i === 0 ? SURF2 : SURF, minHeight: "120px" }}>
                  <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "8px", color: "rgba(20,184,166,0.4)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{s.label}</div>
                  <div>
                    <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "42px", lineHeight: 1, color: i === 0 ? A : TEXT }}>{s.value}</span>
                    <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: DIM, marginLeft: "4px" }}>{s.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 py-4 px-8" style={{ background: A }}>
          <div className="max-w-[1100px] mx-auto flex flex-wrap items-center gap-8">
            {[{ label: "Role", val: p.role }, { label: "Timeline", val: p.timeline }, { label: "Team", val: p.team }, { label: "Status", val: p.status }].map((m, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "8px", color: "rgba(0,0,0,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{m.label}</span>
                <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, fontSize: "13px", color: "#000" }}>{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1100px] mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row gap-0" style={{ border: `1px solid ${BORDER}` }}>
          <div className="p-10" style={{ flex: "0 0 55%", borderRight: `1px solid ${BORDER}` }}>
            <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "9px", color: "#ef4444", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>01 — Problem</div>
            <h2 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,30px)", lineHeight: 1.2, color: TEXT, marginBottom: "16px" }}>
              {p.problem.split(".")[0]}.
            </h2>
            <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.85, color: DIM }}>{p.problem}</p>
          </div>
          <div className="p-10" style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "9px", color: A, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>02 — Solution</div>
            <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.85, color: DIM, marginBottom: "24px" }}>{p.solution}</p>
            <div className="flex flex-col gap-3">
              {p.impact.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: A, flexShrink: 0, marginTop: "6px" }} />
                  <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "13px", lineHeight: 1.7, color: DIM }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StructuredSections p={p} accent={A} dark fontFamily="'Cabinet Grotesk',sans-serif" containerClass="relative z-10 max-w-[1100px] mx-auto px-8" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8">
        <PulseScreenshots slots={pulseScreenshots} accent={A} dark onImageClick={(src, alt) => setLightbox({ src, alt })} />
        {p.previewFile && <PrototypePreview file={p.previewFile} accent={A} dark />}
      </div>

      <section className="relative z-10 max-w-[1100px] mx-auto px-8 mb-20">
        <div style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "9px", color: "rgba(20,184,166,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px" }}>Process</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", background: BORDER }}>
          {(p.sections.find(s => s.type === "process-steps")?.steps ?? []).map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6" style={{ background: SURF }}>
              <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "36px", lineHeight: 1, color: A, opacity: 0.3, marginBottom: "12px" }}>{step.number}</div>
              <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, fontSize: "14px", color: TEXT, marginBottom: "8px" }}>{step.title}</div>
              <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "12px", lineHeight: 1.75, color: DIM }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {p.sections.filter(s => s.type === "quote").map((s, i) => (
        <section key={i} className="relative z-10 max-w-[1100px] mx-auto px-8 mb-20">
          <div className="px-10 py-12" style={{ background: SURF2, borderLeft: `4px solid ${A}` }}>
            <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 500, fontSize: "clamp(20px,2.5vw,28px)", lineHeight: 1.5, color: TEXT, fontStyle: "italic", marginBottom: "16px" }}>
              "{s.quote}"
            </p>
            <cite style={{ fontFamily: "'Chivo Mono',monospace", fontSize: "10px", color: A, letterSpacing: "0.1em", fontStyle: "normal" }}>— {s.attribution}</cite>
          </div>
        </section>
      ))}

      {p.sections.filter(s => s.type === "full-text").map((s, i) => (
        <section key={i} className="relative z-10 max-w-[1100px] mx-auto px-8 mb-16 border-t" style={{ borderColor: BORDER, paddingTop: "40px" }}>
          {s.heading && <h2 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.5vw,28px)", color: TEXT, marginBottom: "16px" }}>{s.heading}</h2>}
          <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.9, color: DIM, maxWidth: "680px" }}>{s.body}</p>
        </section>
      ))}

      <Footer accent={A} dark />
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

function SoloCaseStudy({ p }: { p: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const accent = "#06b6d4";
  const border = "rgba(6,182,212,0.2)";
  const surface = "rgba(6,182,212,0.04)";
  const dim = "rgba(186,230,253,0.5)";

  return (
    <div className="min-h-screen" style={{ background: "#0d1117", color: "#cdd9e5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        .solo-grid { background-image: linear-gradient(rgba(6,182,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.04) 1px,transparent 1px); background-size:48px 48px; }
      `}</style>

      <div className="solo-grid fixed inset-0 pointer-events-none z-0" />

      <nav className="fixed top-0 left-0 right-0 z-20 h-12 flex items-center justify-between px-8 border-b" style={{ background: "rgba(13,17,23,0.95)", backdropFilter: "blur(12px)", borderColor: border }}>
        <BackLink color={accent} />
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "10px", color: accent, letterSpacing: "0.18em" }}>SOLO LEVELING OS — SYSTEM LOG</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ fontFamily: "monospace", fontSize: "9px", color: accent, letterSpacing: "0.1em" }}>RANK B</span>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-16 px-8 max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: accent, letterSpacing: "0.2em", marginBottom: "16px" }}>{p.eyebrow}</div>

          <h1 style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "clamp(64px,12vw,140px)", lineHeight: 0.88, letterSpacing: "-0.01em", marginBottom: "24px" }}>
            <span style={{ color: "#f0f6fc" }}>SOLO</span><br />
            <span style={{ color: accent, textShadow: `0 0 30px ${accent}55` }}>LEVELING</span><br />
            <span style={{ WebkitTextStroke: `1px ${border}`, color: "transparent" }}>OS</span>
          </h1>

          <div className="flex items-center gap-4 mb-8 max-w-[560px]">
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "10px", color: accent, whiteSpace: "nowrap" }}>LV.47</span>
            <div className="flex-1 h-2 relative" style={{ background: "rgba(6,182,212,0.1)", border: `1px solid ${border}` }}>
              <div style={{ position: "absolute", inset: "0 32% 0 0", background: `linear-gradient(90deg, ${accent}, #818cf8)`, boxShadow: `0 0 10px ${accent}66`, animation: "xpfill 1.2s ease 0.4s both" }} />
            </div>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "rgba(6,182,212,0.4)", whiteSpace: "nowrap" }}>68,420 / 100K XP</span>
          </div>
          <style>{`@keyframes xpfill { from{width:0} to{width:68%} }`}</style>

          <p style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 400, fontSize: "17px", lineHeight: 1.7, color: dim, maxWidth: "520px" }}>{p.overview}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
          {[{ label: "CLASS", value: "Designer & Engineer" }, { label: "PERIOD", value: p.timeline }, { label: "PARTY", value: p.team }, { label: "STATUS", value: p.status }].map((m, i) => (
            <div key={i} className="px-4 py-3" style={{ background: surface, border: `1px solid ${border}` }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "8px", color: "rgba(6,182,212,0.35)", letterSpacing: "0.16em", marginBottom: "4px" }}>{m.label}</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "13px", fontWeight: 600, color: accent }}>{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-8 max-w-[1200px] mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "// THREAT ASSESSMENT", content: p.problem, left: "3px solid #ef4444", bg: "rgba(239,68,68,0.05)" },
            { label: "// TACTICAL RESPONSE", content: p.solution, left: `3px solid ${accent}`, bg: surface },
          ].map((block, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8" style={{ background: block.bg, border: `1px solid ${border}`, borderLeft: block.left }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: i === 0 ? "#ef4444" : accent, letterSpacing: "0.16em", marginBottom: "12px" }}>{block.label}</div>
              <p style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.8, color: dim }}>{block.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <StructuredSections p={p} accent={accent} dark fontFamily="'Rajdhani',sans-serif" containerClass="relative z-10 px-8 max-w-[1200px] mx-auto" />

      <div className="relative z-10 px-8 max-w-[1200px] mx-auto">
        <SoloScreenshots slots={soloScreenshots} accent={accent} dark onImageClick={(src, alt) => setLightbox({ src, alt })} />
        {p.previewFile && <PrototypePreview file={p.previewFile} accent={accent} dark />}
        {p.sections.map((s, i) => <SectionRenderer key={i} section={s} accent={accent} dark theme="lume" />)}
      </div>

      <section className="relative z-10 px-8 max-w-[1200px] mx-auto mt-8 mb-24">
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: accent, letterSpacing: "0.2em", marginBottom: "16px" }}>// OUTCOME</div>
        <div className="grid md:grid-cols-2 gap-3">
          {p.impact.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 p-5" style={{ background: surface, border: `1px solid ${border}` }}>
              <span style={{ color: accent, fontSize: "16px", flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "15px", lineHeight: 1.7, color: dim }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer accent={accent} dark />
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ROUTER — themeMap pattern
   Add a new project? Register it here. The router throws to NotFound if a
   slug arrives without a registered layout. No more cascading if-statements.
   ════════════════════════════════════════════════════════════════════════ */

const themeMap: Record<string, FC<{ p: Project }>> = {
  "lume-sys":         LumeCaseStudy,
  "vault-ds":         VaultCaseStudy,
  "sync-collab":      SyncCaseStudy,
  "pulse":            PulseCaseStudy,
  "solo-leveling-os": SoloCaseStudy,
};

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project || !slug) return <NotFound />;

  const Layout = themeMap[slug];
  if (!Layout) return <NotFound />;

  return <Layout p={project} />;
}

/* ──────────────────────────────────────────────────────────────────────────
   END OF FILE — CaseStudy.tsx
   If you see anything below this comment, delete it before saving.
   ────────────────────────────────────────────────────────────────────────── */
