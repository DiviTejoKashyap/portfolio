import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(0, { stiffness: 420, damping: 38 });
  const y = useSpring(0, { stiffness: 420, damping: 38 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer:fine)").matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
      style={{ x, y }}
    />
  );
};

export default CustomCursor;