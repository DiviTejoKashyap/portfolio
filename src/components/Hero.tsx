import { motion } from "framer-motion";
import Section from "./Section";
import Eyebrow from "./Eyebrow";
import Spec from "./Spec";


const heroSpecs = [
  { n: 1, text: "question asked: reframed weekly" },
  { n: 2, text: "current answer: see projects 01 to 05" },
  { n: 3, text: "next check-in: next release" },
];

const Hero = () => {
  return (
    <Section size="lg" divider={false} className="pt-24 md:pt-28">
      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center gap-4 mb-14 md:mb-20"
      >
        <Eyebrow className="whitespace-nowrap">
          Portfolio / Tejo Kashyap Divi
        </Eyebrow>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px bg-ink/[0.08] flex-1"
        />
        <Eyebrow className="whitespace-nowrap hidden md:block">
          Last updated April 2026
        </Eyebrow>
      </motion.div>

      {/* The question */}
      <div className="mb-14 md:mb-20 max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-6"
        >
          <Eyebrow>The question I'm working on</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display leading-[1.03] tracking-[-0.02em] text-ink"
          style={{
            fontSize: "clamp(44px, 6.5vw, 96px)",
            fontWeight: 400,
          }}
        >
          When does a prototype stop being a demo{" "}
          <span className="font-display-italic text-accent-warm">
            and start being the product?
          </span>
        </motion.h1>
      </div>

      {/* Sub-paragraph. Written like a person, not a press release. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between gap-10 md:gap-16"
      >
        <div className="max-w-[540px] space-y-4">
          <p className="text-[17px] text-ink leading-[1.7]">
            I'm Tejo. I design products and write the code that ships them.
            Mostly for engineering-led teams who don't have time to wait on
            handoffs.
          </p>
          <p className="text-[17px] text-ink-60 leading-[1.7]">
            Right now I'm finishing an M.S. in Computer Science at NYU Tandon.
            Before that, I was an analyst at Deloitte and a DART specialist at
            Amazon. I think about the gap between what a system can do and what
            the person using it actually needs to get done. That gap is the
            whole job.
          </p>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <a
            href="#work"
            className="font-sans font-medium text-[14px] text-ink border-b-[1.5px] border-ink hover:text-accent-warm hover:border-accent-warm transition-colors w-fit"
          >
            The work, five projects ↓
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 hover:text-ink transition-colors w-fit"
          >
            Resume (PDF)
          </a>
        </div>
      </motion.div>

      {/* Bottom rule: affiliation and availability inline, no bold affiliation row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-16 md:mt-20 border-t border-rule pt-6 flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4"
      >
        <p className="text-[13px] text-ink-60">
          Previously at{" "}
          <span className="text-ink">Deloitte</span> and{" "}
          <span className="text-ink">Amazon</span>. Currently at{" "}
          <span className="text-ink">NYU Tandon</span>.
        </p>
        <p className="text-[13px] text-ink-60 flex items-center gap-2">
          <span
            className="inline-block w-[7px] h-[7px] rounded-full bg-accent-warm"
            aria-hidden="true"
          />
          Available for roles starting Summer 2026
        </p>
      </motion.div>

      <Spec items={heroSpecs} className="mt-10" />
    </Section>
  );
};

export default Hero;
