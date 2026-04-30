import { motion, useReducedMotion } from "framer-motion";
import { portfolioContent } from "@/data/portfolioContent";
import HeroBlockFlow from "@/components/HeroBlockFlow";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const { person } = portfolioContent;

interface HeroProps { revealed?: boolean; }

const Hero = ({ revealed = true }: HeroProps) => {
  const reduce = useReducedMotion();

  const anim = (delay: number, yOffset = 18) => {
    const skip = Boolean(reduce) || revealed;
    return {
      initial:    skip ? (false as const) : ({ opacity: 0, y: yOffset } as const),
      animate:    revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset },
      transition: reduce ? { duration: 0 } : { duration: 0.52, delay, ease },
    };
  };

  return (
    <section id="top" className="hero-section">

      {/* ── Editorial canvas panel ── */}
      <motion.div {...anim(0.04, 24)} className="hero-panel">

        <HeroBlockFlow />

        {/* macOS-style window bar */}
        <div className="hero-window-bar hero-panel-content" aria-hidden="true">
          <div className="window-controls">
            <span className="window-dot red" />
            <span className="window-dot yellow" />
            <span className="window-dot green" />
          </div>
          <span className="hero-window-meta font-mono-label">
            {person.name} · {person.role} · {person.location}
          </span>
          <span className="hero-window-year font-mono-label">2026</span>
        </div>

        {/* Panel body */}
        <div className="hero-panel-body hero-panel-content">

          {/* Headline — Fraunces editorial serif */}
          <motion.h1 {...anim(0.12, 28)} className="hero-headline font-display">
            I design product&nbsp;systems
            {" "}that feel sharp, useful,
            {" "}and built for{" "}
            <em className="hero-hl-italic font-display-italic">real behavior</em>
            <span className="hero-dot-accent">.</span>
          </motion.h1>

          {/* Lower row: intro + CTA block */}
          <div className="hero-lower">

            <motion.p {...anim(0.24)} className="hero-intro">
              {person.intro}
            </motion.p>

            <motion.div {...anim(0.32)} className="hero-cta-block">
              <div className="hero-avail">
                <span
                  className="hero-avail-dot"
                  style={{ animation: "hero-pulse 2.2s ease-in-out infinite" }}
                />
                <span className="font-mono-label hero-avail-label">
                  {person.availability}
                </span>
              </div>
              <a href="#work" className="hero-cta-pill">
                View work →
              </a>
            </motion.div>

          </div>
        </div>


      </motion.div>

      <style>{`
        /* ── Section shell ── */
        .hero-section {
          background: hsl(var(--bg));
          padding-top: clamp(112px, 14vh, 150px);
          padding-bottom: clamp(56px, 8vh, 88px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Editorial canvas panel ── */
        .hero-panel {
          position: relative;
          width: calc(100vw - 64px);
          max-width: 1200px;
          min-height: clamp(500px, 66vh, 700px);
          border-radius: 32px;
          border: 1px solid hsl(var(--rule));
          background: hsl(var(--surface));
          box-shadow: var(--sh-panel);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          will-change: transform, opacity;
        }

        /* ── Content layer sits above block flow ── */
        .hero-panel-content {
          position: relative;
          z-index: 2;
        }

        /* ── macOS window bar ── */
        .hero-window-bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          min-height: 44px;
          padding-inline: clamp(18px, 2vw, 28px);
          border-bottom: 1px solid hsl(var(--rule));
          background: hsl(var(--bg-alt) / 0.62);
          flex-shrink: 0;
        }

        .window-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .window-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          flex-shrink: 0;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
        }

        .window-dot.red    { background: #ff5f57; }
        .window-dot.yellow { background: #ffbd2e; }
        .window-dot.green  { background: #28c840; }

        .hero-window-meta {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: hsl(var(--ink-60));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hero-window-year {
          font-size: 10px;
          letter-spacing: 0.14em;
          color: hsl(var(--ink-30));
          white-space: nowrap;
        }

        /* ── Panel body ── */
        .hero-panel-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding:
            clamp(40px, 5.5vw, 72px)
            clamp(36px, 5.5vw, 72px)
            clamp(36px, 5vw, 56px);
        }

        /* ── Headline ── */
        .hero-headline {
          font-size: clamp(2.8rem, 5.4vw, 6.2rem);
          line-height: 0.97;
          letter-spacing: -0.045em;
          color: hsl(var(--ink));
          margin: 0;
          font-style: normal;
          font-variation-settings: '"opsz" 120';
        }

        .hero-hl-italic {
          font-style: italic;
          font-size: 0.94em;
          letter-spacing: -0.02em;
          color: hsl(var(--cobalt));
          font-variation-settings: '"opsz" 144';
        }

        .hero-dot-accent {
          color: hsl(var(--cobalt));
        }

        /* ── Lower row ── */
        .hero-lower {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: clamp(32px, 4.5vw, 52px);
        }

        .hero-intro {
          font-size: clamp(14px, 1.3vw, 17px);
          line-height: 1.72;
          color: hsl(var(--ink-60));
          max-width: 480px;
          margin: 0;
        }

        .hero-cta-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-self: flex-start;
        }

        .hero-avail {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-avail-dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(var(--cobalt));
          flex-shrink: 0;
        }

        .hero-avail-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: hsl(var(--ink-60));
        }

        /* View work pill */
        .hero-cta-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 22px;
          border-radius: 999px;
          border: 1px solid hsl(var(--ink));
          background: hsl(var(--ink));
          color: hsl(var(--bg));
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
          align-self: flex-start;
        }

        .hero-cta-pill:hover {
          background: hsl(var(--cobalt));
          border-color: hsl(var(--cobalt));
          color: hsl(0 0% 100%);
        }

        /* ── Desktop: lower becomes flex row ── */
        @media (min-width: 860px) {
          .hero-lower {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 48px;
          }

          .hero-cta-block {
            align-self: flex-end;
            align-items: flex-end;
          }

          .hero-avail {
            justify-content: flex-end;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero-panel {
            width: calc(100vw - 32px);
            border-radius: 22px;
            min-height: 0;
          }
          .hero-window-bar {
            gap: 10px;
            padding-inline: 18px;
          }
          .hero-window-year {
            display: none;
          }
        }

        @keyframes hero-pulse {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
