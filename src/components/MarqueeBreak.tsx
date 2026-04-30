import { motion } from "framer-motion";

const track1 = [
  "Figma", "·", "React", "·", "Next.js", "·", "TypeScript", "·",
  "Framer Motion", "·", "Supabase", "·", "Claude API", "·", "Design Systems", "·",
  "Storybook", "·", "Tailwind", "·",
];

const track2 = [
  "Product Design", "○", "UX Research", "○", "Information Architecture", "○",
  "Interaction Design", "○", "Design Engineering", "○", "System Thinking", "○",
  "Prototyping", "○", "Accessibility", "○",
];

const MarqueeBreak = () => {
  return (
    <section className="border-t border-rule overflow-hidden py-12 md:py-16">
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container-wide mb-10 md:mb-12"
      >
        <blockquote
          className="font-display text-ink"
          style={{
            fontSize: "clamp(17px, 2.2vw, 28px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            maxWidth: "820px",
            fontVariationSettings: '"opsz" 44',
          }}
        >
          "I've never handed off a design I couldn't build myself."
        </blockquote>
        <p
          className="font-mono-label text-ink-60 mt-4"
          style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Tejo Kashyap Divi
        </p>
      </motion.div>

      {/* Track 1 — tools */}
      <div className="mb-4 select-none" aria-hidden="true">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...track1, ...track1].map((item, i) => (
            <span
              key={i}
              className="font-display text-ink"
              style={{
                fontSize: "clamp(13px, 1.5vw, 18px)",
                marginRight: item === "·" ? "0.6em" : "0.9em",
                marginLeft: item === "·" ? "0.3em" : 0,
                color: item === "·" ? "hsl(var(--cobalt))" : "hsl(var(--ink))",
                fontVariationSettings: '"opsz" 24',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 — disciplines, reverse direction */}
      <div className="select-none" aria-hidden="true">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...track2, ...track2].map((item, i) => (
            <span
              key={i}
              className="font-mono-label text-ink-30"
              style={{
                fontSize: "11px",
                letterSpacing: item === "○" ? "0" : "0.14em",
                textTransform: "uppercase",
                marginRight: item === "○" ? "0.7em" : "1em",
                marginLeft: item === "○" ? "0.3em" : 0,
                color: item === "○" ? "hsl(var(--cobalt) / 0.5)" : "hsl(var(--ink-30))",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeBreak;
