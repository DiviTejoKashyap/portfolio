import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);

  const cursorX = useSpring(0, { stiffness: 150, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        setExpanded(true);
        setLabel((target as HTMLElement).dataset.cursor || "");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        setExpanded(false);
        setLabel("");
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
        className="rounded-full flex items-center justify-center"
        animate={{
          width: expanded ? 40 : 8,
          height: expanded ? 40 : 8,
          backgroundColor: expanded ? "transparent" : "hsl(var(--ink))",
          borderWidth: expanded ? 1.5 : 0,
          borderColor: "hsl(var(--ink))",
        }}
        transition={{ duration: 0.25 }}
        style={{
          mixBlendMode: "exclusion",
          borderStyle: "solid",
        }}
      >
        {expanded && label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-ink whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
