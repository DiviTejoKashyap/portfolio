import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor — crosshair variant per brief.
 *
 * • Thin plus-sign crosshair by default (12px).
 * • Expands to a 3-line spec block when hovering [data-detail] elements:
 *     line 1: the detail text (split on first ':' or '/')
 *     line 2: secondary value
 *     line 3: token/label
 * • Red accent when hovering interactive elements ([data-cursor-hot] or <a>, <button>).
 * • Spring physics: stiffness 300, damping 25 per brief.
 */
type ParsedDetail = {
  line1: string;
  line2?: string;
  line3?: string;
};

function parseDetail(detail: string): ParsedDetail {
  // Try ':' split first, then '/', then return as single line.
  if (detail.includes(" / ")) {
    const [a, b, c] = detail.split(" / ");
    return { line1: a, line2: b, line3: c };
  }
  if (detail.includes(":")) {
    const [a, b] = detail.split(":").map(s => s.trim());
    return { line1: a, line2: b };
  }
  return { line1: detail };
}

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<string>("");
  const [hot, setHot] = useState(false);     // red state for interactive
  const [expanded, setExpanded] = useState(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const detailTarget = el.closest("[data-detail], [data-cursor]") as HTMLElement | null;
      const interactive = el.closest("a, button, [role='button'], [data-cursor-hot]");

      if (detailTarget) {
        setDetail(detailTarget.dataset.detail ?? detailTarget.dataset.cursor ?? "");
        setExpanded(true);
      }
      if (interactive) setHot(true);
    };

    const handleOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const detailTarget = el.closest("[data-detail], [data-cursor]");
      const interactive = el.closest("a, button, [role='button'], [data-cursor-hot]");
      if (detailTarget) {
        setExpanded(false);
        setDetail("");
      }
      if (interactive) setHot(false);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.documentElement.style.cursor = "";
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  const parsed = expanded && detail ? parseDetail(detail) : null;
  const color = hot ? "hsl(var(--accent-warm))" : "hsl(var(--ink))";

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Crosshair (collapsed state) */}
      {!expanded && (
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.12 }}
          style={{ display: "block" }}
        >
          <line x1="8" y1="1" x2="8" y2="6"  stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <line x1="8" y1="10" x2="8" y2="15" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <line x1="1" y1="8" x2="6" y2="8"  stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <line x1="10" y1="8" x2="15" y2="8" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Spec block (expanded state) */}
      {expanded && parsed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            minWidth: "160px",
            padding: "8px 10px",
            background: "hsl(var(--ink))",
            color: "hsl(var(--bg))",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            lineHeight: "1.5",
            letterSpacing: "0.02em",
            borderLeft: `2px solid hsl(var(--accent-warm))`,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontWeight: 500 }}>{parsed.line1}</div>
          {parsed.line2 && (
            <div style={{ opacity: 0.7, marginTop: 2 }}>{parsed.line2}</div>
          )}
          {parsed.line3 && (
            <div style={{ opacity: 0.5, marginTop: 2 }}>{parsed.line3}</div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomCursor;
