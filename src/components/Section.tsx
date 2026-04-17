import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Visual rhythm. default = py-16 md:py-24 (96px desktop). */
  size?: "sm" | "md" | "lg";
  /** Top hairline divider. Default true on md+, matches editorial rhythm. */
  divider?: boolean;
  /** Dark-theme inversion (used by DesignProcess) */
  inverted?: boolean;
  /** Opt out of container (full-bleed backgrounds that manage their own inner container) */
  bleed?: boolean;
  className?: string;
  "data-theme"?: string;
};

/**
 * The only section primitive. Every top-level section on the site goes through this.
 * Enforces container width (1200px max), consistent horizontal padding,
 * and a 3-step vertical rhythm scale.
 */
const Section = ({
  id,
  children,
  size = "md",
  divider = true,
  inverted = false,
  bleed = false,
  className,
  ...rest
}: SectionProps) => {
  const pad = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  }[size];

  return (
    <section
      id={id}
      data-theme={inverted ? "dark" : rest["data-theme"]}
      className={cn(
        pad,
        divider && "border-t border-rule",
        inverted && "bg-page-alt",
        className
      )}
      style={inverted ? { background: "hsl(20 12% 4%)" } : undefined}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8">
          {children}
        </div>
      )}
    </section>
  );
};

export default Section;
