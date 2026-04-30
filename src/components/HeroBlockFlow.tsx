import { useReducedMotion } from "framer-motion";

// All coords are [col, row], 1-indexed — placed via CSS gridColumn/gridRow.
// Lane geometry is verified non-overlapping:
//   pieces drift ONLY vertically (translateY), so fixed x lanes can never intersect.
//   Lane widths at min cell (34px, gap 2px): vert=34, O/L/J=70, T/S/Z=106.
//   Lane widths at max cell (48px, gap 2px): vert=48, O/L/J=98, T/S/Z=148.
//   Right edge of each lane clears the next lane's left edge at all viewport sizes.
interface ShapeDef { cells: Array<[number, number]>; cols: number; rows: number; }

const SHAPES: Record<string, ShapeDef> = {
  I_VERT: { cells: [[1,1],[1,2],[1,3],[1,4]], cols: 1, rows: 4 },
  O:      { cells: [[1,1],[2,1],[1,2],[2,2]], cols: 2, rows: 2 },
  L:      { cells: [[1,1],[1,2],[1,3],[2,3]], cols: 2, rows: 3 },
  T:      { cells: [[1,1],[2,1],[3,1],[2,2]], cols: 3, rows: 2 },
  S:      { cells: [[2,1],[3,1],[1,2],[2,2]], cols: 3, rows: 2 },
  Z:      { cells: [[1,1],[2,1],[2,2],[3,2]], cols: 3, rows: 2 },
  J:      { cells: [[2,1],[2,2],[1,3],[2,3]], cols: 2, rows: 3 },
};

// Each group occupies a unique horizontal lane.
// No horizontal x movement in the keyframe — purely vertical drift.
// Negative delay places the piece mid-animation on load so the panel isn't empty.
// ac = index of the accent (cobalt-tinted) cell within the shape.
const GROUPS = [
  { id:0, shape:"I_VERT", left:"2%",  yS:-120, yE:900, dur:38, del:-12, ac:0 },
  { id:1, shape:"O",      left:"10%", yS:-90,  yE:880, dur:44, del:-22, ac:1 },
  { id:2, shape:"L",      left:"23%", yS:-140, yE:920, dur:36, del:-16, ac:2 },
  { id:3, shape:"T",      left:"37%", yS:-80,  yE:870, dur:46, del:-20, ac:0 },
  { id:4, shape:"S",      left:"55%", yS:-110, yE:900, dur:32, del:-10, ac:1 },
  { id:5, shape:"Z",      left:"73%", yS:-130, yE:950, dur:42, del:-18, ac:3 },
  { id:6, shape:"J",      left:"91%", yS:-95,  yE:880, dur:34, del:-14, ac:2 },
];

export default function HeroBlockFlow() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="hero-block-flow" aria-hidden="true">
        {GROUPS.map((g) => {
          const { cells, cols, rows } = SHAPES[g.shape];
          return (
            <div
              key={g.id}
              className="hero-tile-group"
              style={{
                position: "absolute",
                left: g.left,
                top: 0,
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, var(--flow-cell-size))`,
                gridTemplateRows:    `repeat(${rows}, var(--flow-cell-size))`,
                gap: "2px",
                "--y-start": `${g.yS}px`,
                "--y-end":   `${g.yE}px`,
                "--dur":     `${g.dur}s`,
                "--del":     `${g.del}s`,
                animationPlayState: reduce ? "paused" : "running",
              } as React.CSSProperties}
            >
              {cells.map(([col, row], ci) => (
                <div
                  key={ci}
                  className={`hero-tile-cell${ci === g.ac ? " accent" : ""}`}
                  style={{ gridColumn: col, gridRow: row }}
                />
              ))}
            </div>
          );
        })}
      </div>

      <style>{`
        /* ── Container ── */
        .hero-block-flow {
          position: absolute;
          inset: 44px 0 0 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 6%, black 91%, transparent 100%);
          mask-image:         linear-gradient(to bottom, transparent 0%, black 6%, black 91%, transparent 100%);
        }

        /* Modular dot-grid reference */
        .hero-block-flow::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(hsl(var(--ink) / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--ink) / 0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.5;
          pointer-events: none;
        }

        /* ── Cell size token ── */
        :root {
          --flow-cell-size: clamp(34px, 3vw, 48px);
        }
        @media (max-width: 768px) {
          :root { --flow-cell-size: 24px; }
        }

        /* ── Opacity / color tokens ── */
        :root {
          --flow-opacity:        0.34;
          --flow-neutral-bg:     hsl(var(--ink) / 0.05);
          --flow-neutral-border: hsl(var(--ink) / 0.18);
          --flow-accent-bg:      hsl(var(--cobalt) / 0.13);
          --flow-accent-border:  hsl(var(--cobalt) / 0.44);
        }
        :root[data-theme="dark"] {
          --flow-opacity:        0.18;
          --flow-neutral-bg:     hsl(var(--ink) / 0.05);
          --flow-neutral-border: hsl(var(--ink) / 0.14);
          --flow-accent-bg:      hsl(var(--cobalt) / 0.09);
          --flow-accent-border:  hsl(var(--cobalt) / 0.34);
        }
        @media (max-width: 768px) {
          :root { --flow-opacity: 0.22; }
        }

        /* ── Group animation ── */
        .hero-tile-group {
          opacity: 0;
          animation: blockLaneDrift var(--dur, 38s) linear infinite;
          animation-delay: var(--del, 0s);
          will-change: transform, opacity;
        }

        /* Hide rightmost group on mobile — it clips at narrow widths */
        @media (max-width: 768px) {
          .hero-tile-group:nth-child(6),
          .hero-tile-group:nth-child(7) { display: none; }
        }

        /* ── Cells ── */
        .hero-tile-cell {
          width:         var(--flow-cell-size);
          height:        var(--flow-cell-size);
          background:    var(--flow-neutral-bg);
          border:        1.5px solid var(--flow-neutral-border);
          border-radius: 8px;
        }
        .hero-tile-cell.accent {
          background:   var(--flow-accent-bg);
          border-color: var(--flow-accent-border);
        }

        /* ── Keyframe: strictly vertical — prevents any horizontal intersection ── */
        @keyframes blockLaneDrift {
          0% {
            transform: translateY(var(--y-start, -120px));
            opacity: 0;
          }
          10% {
            opacity: var(--flow-opacity, 0.34);
          }
          85% {
            opacity: var(--flow-opacity, 0.34);
          }
          100% {
            transform: translateY(var(--y-end, 900px));
            opacity: 0;
          }
        }

        /* ── Reduced motion: static mid-panel, no animation ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-tile-group {
            animation: none !important;
            transform: translateY(280px) !important;
            opacity: 0.2 !important;
          }
          :root[data-theme="dark"] .hero-tile-group {
            opacity: 0.12 !important;
          }
        }
      `}</style>
    </>
  );
}
