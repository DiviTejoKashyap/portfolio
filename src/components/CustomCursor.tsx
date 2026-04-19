import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Cursor-as-design-lens.
 *
 * Reads the closest ancestor with a `data-detail` attribute and surfaces
 * the actual design specification on hover — grid columns, baseline rhythm,
 * type ramp, token names, spacing scale — instead of generic verbs.
 *
 * The proof is the pudding: the cursor only works because the site actually
 * IS on an 8pt baseline with a 12-col grid. It's pointing at the system,
 * not inventing it.
 *
 * Backward compatible: `data-cursor` still works for elements not yet migrated.
 */
const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState("");
  const [expanded, setExpanded] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 24 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 24 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-detail], [data-cursor]");
      if (target) {
        const t = target as HTMLElement;
        const value = t.dataset.detail ?? t.dataset.cursor ?? "";
        setDetail(value);
        setExpanded(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-detail], [data-cursor]");
      if (target) {
        setExpanded(false);
        setDetail("");
      }
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
      <motion.div
        className="flex items-center"
        animate={{
          /* 6px dot collapsed. Pill sized to the detail string when expanded. */
          height: expanded ? 26 : 6,
          paddingLeft: expanded ? 10 : 0,
          paddingRight: expanded ? 10 : 0,
          borderRadius: expanded ? 4 : 999,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          mixBlendMode: "difference",
          backgroundColor: "hsl(var(--ink))",
          minWidth: expanded ? "auto" : 6,
          minHeight: expanded ? 26 : 6,
        }}
      >
        {expanded && detail && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.15 }}
            className="font-mono text-[10px] leading-none whitespace-nowrap"
            style={{ color: "hsl(var(--bg))", letterSpacing: "0.04em" }}
          >
            {detail}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
