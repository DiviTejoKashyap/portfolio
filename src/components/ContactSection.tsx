import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { portfolioContent } from "@/data/portfolioContent";

const inputStyle: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontSize: "15px",
  padding: "14px 16px",
  background: "hsl(var(--bg-alt))",
  color: "hsl(var(--ink))",
  border: "1px solid hsl(var(--rule))",
  borderRadius: "6px",
  outline: "none",
  width: "100%",
  transition: "border-color 200ms ease",
};

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const { person, footer } = portfolioContent;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name    = (data.get("name") as string) ?? "";
    const type    = (data.get("type") as string) ?? "";
    const message = (data.get("message") as string) ?? "";
    const subject = encodeURIComponent(`Portfolio — ${type || "Inquiry"}`);
    const body    = encodeURIComponent(`From: ${name}\n\n${message}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full border-t border-rule">
      {/* ── Full-screen header block ── */}
      <div
        className="relative overflow-hidden flex flex-col justify-center"
        style={{ minHeight: "auto" }}
      >
        <div className="container-wide py-10 md:py-14">
          {/* Decorative asterisks */}
          <span
            className="deco-asterisk absolute pointer-events-none select-none"
            style={{
              fontSize: "clamp(80px, 12vw, 180px)",
              top: "8%",
              right: "6%",
              transform: "rotate(15deg)",
              opacity: 0.18,
            }}
            aria-hidden="true"
          >
            *
          </span>
          <span
            className="deco-asterisk absolute pointer-events-none select-none"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              bottom: "12%",
              left: "2%",
              transform: "rotate(-10deg)",
              opacity: 0.12,
            }}
            aria-hidden="true"
          >
            *
          </span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono-label text-ink-60 mb-6"
              style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Get in touch
            </p>

            <h2
              className="font-display text-ink"
              style={{
                fontSize: "clamp(26px, 4.6vw, 68px)",
                lineHeight: "0.9",
                letterSpacing: "-0.04em",
                fontVariationSettings: '"opsz" 96',
              }}
            >
              Let's work<br />
              <span className="font-display-italic" style={{ fontVariationSettings: '"opsz" 144' }}>
                together
              </span>
              <span style={{ color: "hsl(var(--cobalt))" }}>.</span>
            </h2>
          </motion.div>

          {/* Email + quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-8 flex-wrap"
          >
            <a
              href="mailto:divitejokashyap@gmail.com"
              className="font-display text-ink hover:text-cobalt transition-colors duration-200"
              style={{
                fontSize: "clamp(17px, 2.2vw, 26px)",
                letterSpacing: "-0.01em",
                fontVariationSettings: '"opsz" 26',
              }}
            >
              divitejokashyap@gmail.com ↗
            </a>

            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/divitejokashyap/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label text-ink-60 hover:text-cobalt transition-colors duration-200"
                style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label text-ink-60 hover:text-cobalt transition-colors duration-200"
                style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                CV ↗
              </a>
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="mt-6 md:mt-8 inline-flex items-center gap-3 border border-cobalt rounded-full px-5 py-2.5"
          >
            <span
              className="w-2 h-2 rounded-full bg-cobalt"
              style={{ boxShadow: "0 0 6px hsl(var(--cobalt))", animation: "pulse 2.2s ease-in-out infinite" }}
            />
            <span className="text-[13px] font-medium text-ink">
              Available · starting Summer 2026
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Contact form ── */}
      <div className="border-t border-rule">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1100px]">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <p
                className="font-display-italic text-burgundy mb-5"
                style={{ fontSize: "clamp(16px, 2vw, 22px)" }}
              >
                or send a message
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-ink-60 max-w-[400px]">
                Full-time Product Designer or Design Engineer roles, starting Summer
                2026. If you have a hard problem and want someone who won't stop at
                the mockup, let's talk.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-7"
            >
              {submitted ? (
                <div className="py-10">
                  <p
                    className="font-display text-cobalt mb-3"
                    style={{ fontSize: "48px", lineHeight: 1, fontVariationSettings: '"opsz" 48' }}
                  >
                    ✓ got it.
                  </p>
                  <p className="text-[15px] text-ink-60">
                    Your email client should have opened. I'll reply within a day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Name"  name="name"  type="text"  required />
                    <FormField label="Email" name="email" type="email" required />
                  </div>

                  <div>
                    <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
                      What's this about
                    </label>
                    <select name="type" required defaultValue="" style={inputStyle}>
                      <option value="" disabled>Select…</option>
                      <option value="Product Designer Role">Full-time Product Designer</option>
                      <option value="Design Engineer Role">Design Engineer</option>
                      <option value="Internship">Internship</option>
                      <option value="Hello">Just saying hi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
                      Message
                    </label>
                    <textarea name="message" rows={5} required className="resize-none" style={inputStyle} />
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full py-3 text-[14px] font-medium transition-colors duration-200"
                    style={{ background: "hsl(var(--ink))", color: "hsl(var(--bg))", border: "none", borderRadius: "14px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--cobalt))"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--ink))"; }}
                  >
                    Send message →
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <footer
        className="border-t border-rule"
        style={{ background: "hsl(var(--bg-alt))", padding: "clamp(20px, 3vw, 32px) 0" }}
      >
        <div className="container-wide flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-4">
            <span
              className="font-display text-[18px] font-semibold"
              style={{ color: "hsl(var(--ink))", letterSpacing: "-0.02em" }}
            >
              TKD<span style={{ color: "hsl(var(--cobalt))", fontSize: "0.45em", marginLeft: "2px", verticalAlign: "top", lineHeight: "1.8" }} aria-hidden="true">•</span>
            </span>
            <span
              className="font-mono-label"
              style={{ fontSize: "11px", color: "hsl(var(--ink-30))", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {footer.copyright}
            </span>
          </div>
          <span
            className="font-mono-label"
            style={{ fontSize: "11px", color: "hsl(var(--ink-30))", letterSpacing: "0.06em" }}
          >
            {footer.note}
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
};

function FormField({
  label, name, type, required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
        {label}
      </label>
      <input type={type} name={name} required={required} style={inputStyle} />
    </div>
  );
}

export default ContactSection;
