import { motion } from "framer-motion";

const track1 = ["Figma", "React", "Next.js", "TypeScript", "Framer Motion", "Supabase", "Claude API", "Design Systems", "Storybook", "Tailwind"];
const track2 = ["Product Design", "UX Research", "Information Architecture", "Interaction Design", "Design Engineering", "System Thinking", "Prototyping", "Accessibility"];

const MarqueeBreak = () => {
  return (
    <section className="border-t border-rule py-20 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-center text-ink px-6 mb-16"
        style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
      >
        "I've never handed off a design I couldn't build myself."
      </motion.p>

      {/* Track 1 */}
      <div className="group mb-6">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...track1, ...track1].map((item, i) => (
            <span key={i} className="font-display text-[18px] text-ink mx-4">
              {item} <span className="text-accent-warm">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 */}
      <div className="group">
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...track2, ...track2].map((item, i) => (
            <span key={i} className="font-mono-label text-[12px] uppercase tracking-[0.15em] text-ink-30 mx-4">
              {item} <span>○</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeBreak;
