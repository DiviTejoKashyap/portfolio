import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const dotX  = useSpring(0, { stiffness: 800, damping: 36 });
  const dotY  = useSpring(0, { stiffness: 800, damping: 36 });
  const ringX = useSpring(0, { stiffness: 130, damping: 24 });
  const ringY = useSpring(0, { stiffness: 130, damping: 24 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role=button], [data-cursor]"));
    };

    const onDown = () => setPressing(true);
    const onUp   = () => setPressing(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
    };
  }, [dotX, dotY, ringX, ringY, visible]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          width: pressing ? 5 : hovering ? 10 : 8,
          height: pressing ? 5 : hovering ? 10 : 8,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "width 0.18s cubic-bezier(0.22,1,0.36,1), height 0.18s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          width: hovering ? 44 : pressing ? 28 : 34,
          height: hovering ? 44 : pressing ? 28 : 34,
          border: "1.5px solid #ffffff",
          mixBlendMode: "difference",
          opacity: hovering ? 0.8 : 0.5,
          willChange: "transform",
          transition:
            "width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.18s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
