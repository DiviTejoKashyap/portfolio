import { cn } from "@/lib/utils";

type SpecItem = {
  /** The superscript number. Use lining numerals. */
  n: number;
  /** The spec text. Keep it short — real values, not marketing. */
  text: string;
};

type SpecProps = {
  items: SpecItem[];
  className?: string;
};

/**
 * Spec — the footnote primitive.
 *
 * Renders design decisions as textbook-style footnotes. Monospace, 10px,
 * muted, with a superscript numeral in the accent color. Looks like a
 * specimen sheet or a page margin note, not a tooltip.
 *
 * The discipline: every entry should be a real, verifiable value from the
 * design system — grid columns, type ramp, token names, timings, counts.
 * Not claims, not descriptions. Values.
 *
 * Usage:
 *   <Spec items={[
 *     { n: 1, text: "grid: 12col / gutter: 24px" },
 *     { n: 2, text: "body: 15/24 · leading 1.6" },
 *   ]} />
 */
const Spec = ({ items, className }: SpecProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn("spec-row mt-6", className)}
      aria-label="Design specifications"
      role="note"
    >
      {items.map((item) => (
        <span key={item.n} className="inline-flex items-baseline">
          <sup>{item.n.toString().padStart(2, "0")}</sup>
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default Spec;
