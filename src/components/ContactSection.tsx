import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

/**
 * ContactSection — full-width inputs with red left border accent per brief.
 * Borders grow from 1px to 3px on focus. No bottom borders. Square corners.
 */

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = (data.get("message") as string) ?? "";
    const name = (data.get("name") as string) ?? "";
    const type = (data.get("type") as string) ?? "";
    const subject = encodeURIComponent(`Portfolio — ${type || "Inquiry"}`);
    const body = encodeURIComponent(`From: ${name}\n\n${message}`);
    window.location.href = `mailto:divitejokashyap@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontSize: "15px",
    padding: "14px 16px 14px 20px",
    background: "hsl(var(--bg-alt))",
    color: "hsl(var(--ink))",
    border: "none",
    borderLeft: "1px solid hsl(var(--ink) / 0.15)",
    borderRadius: 0,
    outline: "none",
    width: "100%",
    transition: "border-left-width 200ms ease, border-left-color 200ms ease",
  };

  return (
    <section id="contact" className="w-full border-t border-rule">
      <div
        className="pt-20 md:pt-32 pb-12"
        style={{ paddingLeft: "clamp(24px, 4vw, 60px)", paddingRight: "clamp(24px, 4vw, 60px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <span className="eyebrow mb-4">— Let's Work Together</span>

          <h2
            className="font-display text-ink tracking-tightest mt-4"
            style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.96, fontWeight: 500, maxWidth: "900px" }}
          >
            Looking for a designer who ships the{" "}
            <span className="text-accent-warm">actual product.</span>
          </h2>

          <p
            className="text-[17px] leading-[1.6] text-ink-60 mt-8 max-w-[560px]"
            style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
          >
            Full-time Product Designer or Design Engineer roles, starting Summer
            2026. If you have a hard problem and want someone who won't stop at
            the mockup — let's talk.
          </p>

          <div
            className="inline-flex items-center gap-2.5 border border-accent-warm px-4 py-2 mt-8"
            style={{ borderRadius: 0 }}
          >
            <span
              className="inline-block w-2 h-2"
              style={{ background: "hsl(var(--accent-warm))" }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.12em] text-ink"
              style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
            >
              Available · Starting Summer 2026
            </span>
          </div>
        </motion.div>

        {/* Two columns, full width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="eyebrow mb-5">— Direct</span>

            <a
              href="mailto:divitejokashyap@gmail.com"
              className="font-display text-ink block mb-6 break-all mt-3"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500 }}
              data-cursor-hot
            >
              divitejokashyap@gmail.com
            </a>

            <div className="flex flex-col gap-3 mb-10">
              <a
                href="https://www.linkedin.com/in/divitejokashyap/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[14px] text-ink-60 w-fit"
                style={{ fontFamily: '"Inter", sans-serif' }}
                data-cursor-hot
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
              className="inline-block px-6 py-3 text-[13px] uppercase tracking-[0.12em] transition-colors duration-200"
              style={{
                background: "hsl(var(--ink))",
                color: "hsl(var(--bg))",
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 500,
                borderRadius: 0,
              }}
              data-cursor-hot
            >
              Download CV →
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="eyebrow mb-5">— Send a Message</span>

            {submitted ? (
              <div className="py-12">
                <p
                  className="font-display text-accent-warm mb-3"
                  style={{ fontSize: "40px", lineHeight: 1, fontWeight: 500 }}
                >
                  ✓ Got it.
                </p>
                <p
                  className="text-[15px] text-ink-60"
                  style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300 }}
                >
                  Your email client should have opened. I'll get back within a day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Name" name="name" type="text" required />
                  <FormField label="Email" name="email" type="email" required />
                </div>

                <div>
                  <label
                    className="block mb-2 text-[11px] uppercase tracking-[0.12em] text-ink-60"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
                  >
                    What's this about
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue=""
                    className="focus:border-l-[3px] focus:border-l-accent-warm"
                    style={inputStyle}
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Product Designer Role">Full-time Product Designer</option>
                    <option value="Design Engineer Role">Design Engineer Role</option>
                    <option value="Internship">UX/UI Internship</option>
                    <option value="Hello">Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-2 text-[11px] uppercase tracking-[0.12em] text-ink-60"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="focus:border-l-[3px] focus:border-l-accent-warm resize-none"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-4 text-[13px] uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{
                    background: "hsl(var(--ink))",
                    color: "hsl(var(--bg))",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 500,
                    borderRadius: 0,
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(var(--accent-warm))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "hsl(var(--ink))";
                  }}
                  data-cursor-hot
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-20 md:mt-24 border-t border-rule pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <span
            className="text-[11px] uppercase tracking-[0.12em] text-ink-30"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            © 2026 Tejo Kashyap Divi
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.12em] text-ink-30"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Designed with intent · Built with React & Tailwind
          </span>
        </div>
      </div>
    </section>
  );
};

function FormField({
  label, name, type, required,
}: {
  label: string; name: string; type: string; required?: boolean;
}) {
  return (
    <div>
      <label
        className="block mb-2 text-[11px] uppercase tracking-[0.12em] text-ink-60"
        style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 500 }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="focus:border-l-[3px] focus:border-l-accent-warm"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "15px",
          padding: "14px 16px 14px 20px",
          background: "hsl(var(--bg-alt))",
          color: "hsl(var(--ink))",
          border: "none",
          borderLeft: "1px solid hsl(var(--ink) / 0.15)",
          borderRadius: 0,
          outline: "none",
          width: "100%",
          transition: "border-left-width 200ms ease, border-left-color 200ms ease",
        }}
      />
    </div>
  );
}

export default ContactSection;          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5"
        >
          <Eyebrow className="mb-5">— Direct</Eyebrow>

          <a
            href="mailto:divitejokashyap@gmail.com"
            className="font-display text-[22px] md:text-[24px] text-ink hover:text-accent-warm transition-colors block mb-6 break-all"
            data-cursor="OPEN"
          >
            divitejokashyap@gmail.com
          </a>

          <div className="flex flex-col gap-3 mb-10">
            <a
              href="https://www.linkedin.com/in/divitejokashyap/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-[14px] text-ink-60 hover:text-ink transition-colors group w-fit"
              data-cursor="OPEN"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn →
            </a>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-semibold text-[14px] border border-rule rounded-full px-5 py-2.5 hover:bg-ink hover:text-bg transition-colors duration-200"
            data-cursor="OPEN"
          >
            Download CV →
          </a>
        </motion.div>

        {/* Right 7/12 — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 md:border-l md:border-rule md:pl-16"
        >
          <Eyebrow className="mb-5">— Send a Message</Eyebrow>

          {submitted ? (
            <div className="py-12">
              <p className="font-display text-[40px] text-accent-warm mb-3 leading-none">
                ✓ Got it.
              </p>
              <p className="font-sans font-light text-[15px] text-ink-60">
                Your email client should have opened. I'll get back within a day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Name" name="name" type="text" required />
                <FormField label="Email" name="email" type="email" required />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 block mb-2">
                  What's this about
                </label>
                <select
                  name="type"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-0 border-b border-rule px-0 py-2.5 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors"
                >
                  <option value="" disabled>Select...</option>
                  <option value="Product Designer Role">Full-time Product Designer</option>
                  <option value="Design Engineer Role">Design Engineer Role</option>
                  <option value="Internship">UX/UI Internship</option>
                  <option value="Hello">Just saying hi</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-0 border-b border-rule px-0 py-2.5 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-ink text-bg font-sans font-semibold text-[13px] uppercase tracking-[0.1em] py-3.5 rounded-[4px] hover:bg-[hsl(var(--accent-warm))] transition-colors duration-200"
                data-cursor="SEND"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 md:mt-24 border-t border-rule pt-6 flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30">
          © 2026 Tejo Kashyap Divi
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30">
          Designed with intent · Built with React & Tailwind
        </span>
      </div>
    </Section>
  );
};

/** Tiny internal primitive for form fields — reduces the repeat in the form body. */
function FormField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30 block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-0 border-b border-rule px-0 py-2.5 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}

export default ContactSection;
