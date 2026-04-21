import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor — simplified per reference brief.
 * A small 6px ink dot with subtle spring physics. No labels, no expansion.
 * Hidden on touch devices. Does not override the native cursor —
 * it rides alongside it as a soft visual marker, not a replacement.
 */
const CustomCursor = () => {
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    document.addEventListener("mousemove", move);
    // IMPORTANT: do NOT hide the native cursor. Ride alongside.
    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="minimal-cursor"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

export default CustomCursor;
