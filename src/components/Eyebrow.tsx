import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Muted (default) or ink (higher contrast for dark sections) */
  tone?: "muted" | "ink";
};

/**
 * Section label. Replaces 12+ duplicated <span className="font-mono-label..."> blocks.
 * Standardizes letter-spacing, color, and margin across the entire site.
 */
const Eyebrow = ({ children, className, tone = "muted" }: EyebrowProps) => (
  <span
    className={cn(
      "block font-mono text-[11px] uppercase tracking-[0.14em]",
      tone === "muted" ? "text-ink-30" : "text-ink-60",
      className
    )}
  >
    {children}
  </span>
);

export default Eyebrow;
