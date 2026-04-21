import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import Section from "./Section";
import Eyebrow from "./Eyebrow";


const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = (data.get("message") as string) ?? "";
    const name = (data.get("name") as string) ?? "";
    const type = (data.get("type") as string) ?? "";
    const subject = encodeURIComponent(`Portfolio, ${type || "Inquiry"}`);
    const body = encodeURIComponent(`From: ${name}\n\n${message}`);
    window.location.href = `mailto:divitejokashyap@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontSize: "15px",
    padding: "14px 16px",
    background: "hsl(var(--bg-alt))",
    color: "hsl(var(--ink))",
    border: "1px solid hsl(var(--rule))",
    borderRadius: "4px",
    outline: "none",
    width: "100%",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 md:mb-20"
      >
        <Eyebrow className="mb-4">Let's talk</Eyebrow>

        <h2
          className="font-display leading-[1.0] tracking-[-0.02em] max-w-[900px]"
          style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 500 }}
        >
          Looking for a designer who{" "}
          <span className="font-display-italic text-accent-warm">
            ships the actual product.
          </span>
        </h2>

        <p className="font-sans font-light text-[17px] text-ink-60 leading-[1.65] mt-8 max-w-[560px]">
          Full-time Product Designer or Design Engineer roles, starting Summer
          2026. If you have a hard problem and you want someone who doesn't
          stop at the mockup, we should talk.
        </p>

        <div
          className="inline-flex items-center gap-2.5 border border-accent-warm/40 px-4 py-2 mt-8 rounded-full bg-accent-warm/5"
        >
          <span
            className="inline-block w-2 h-2 rounded-full bg-accent-warm"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
            Available · starting Summer 2026
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <Eyebrow className="mb-5">Direct</Eyebrow>

          <a
            href="mailto:divitejokashyap@gmail.com"
            className="font-display text-ink block mb-6 break-all hover:text-accent-warm transition-colors"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500 }}
          >
            divitejokashyap@gmail.com
          </a>

          <div className="flex flex-col gap-3 mb-10">
            <a
              href="https://www.linkedin.com/in/divitejokashyap/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[14px] text-ink-60 hover:text-ink transition-colors w-fit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn →
            </a>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-[13px] uppercase tracking-[0.12em] transition-colors duration-200 rounded-[4px]"
            style={{
              background: "hsl(var(--ink))",
              color: "hsl(var(--bg))",
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 500,
            }}
          >
            Download CV →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <Eyebrow className="mb-5">Send a message</Eyebrow>

          {submitted ? (
            <div className="py-12">
              <p
                className="font-display text-accent-warm mb-3"
                style={{ fontSize: "40px", lineHeight: 1, fontWeight: 500 }}
              >
                ✓ Got it.
              </p>
              <p className="text-[15px] text-ink-60">
                Your email client should have opened. I'll get back within a day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Name" name="name" type="text" required inputStyle={inputStyle} />
                <FormField label="Email" name="email" type="email" required inputStyle={inputStyle} />
              </div>

              <div>
                <label className="block mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-60">
                  What's this about
                </label>
                <select name="type" required defaultValue="" style={inputStyle}>
                  <option value="" disabled>Select...</option>
                  <option value="Product Designer Role">Full-time Product Designer</option>
                  <option value="Design Engineer Role">Design Engineer Role</option>
                  <option value="Internship">UX/UI Internship</option>
                  <option value="Hello">Just saying hi</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-60">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="resize-none"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-4 font-mono text-[13px] uppercase tracking-[0.12em] transition-colors duration-200 rounded-[4px]"
                style={{
                  background: "hsl(var(--ink))",
                  color: "hsl(var(--bg))",
                  fontWeight: 500,
                  border: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--accent-warm))"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(var(--ink))"; }}
              >
                Send message
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <div className="mt-20 md:mt-24 border-t border-rule pt-6 flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-30">
          © 2026 Tejo Kashyap Divi
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-30">
          Designed with intent. Built with React and Tailwind.
        </span>
      </div>
    </Section>
  );
};

function FormField({
  label, name, type, required, inputStyle,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  inputStyle: React.CSSProperties;
}) {
  return (
    <div>
      <label className="block mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-60">
        {label}
      </label>
      <input type={type} name={name} required={required} style={inputStyle} />
    </div>
  );
}

export default ContactSection;
