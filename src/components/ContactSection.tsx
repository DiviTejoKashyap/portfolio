import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

/**
 * ContactSection — reference: "thank you for watching!" centered with
 * scattered contact folders. Kept the form below (per previous decision
 * to keep it as a real conversion surface).
 *
 * Structure:
 *   1. Centered "thank you for watching!" — huge Playfair italic
 *   2. Decorative scatter: 3 cobalt folder icons labeled with contact channels
 *   3. Small form below for those who want it
 *   4. Footer
 */

type ContactFolder = {
  name: string;
  label: string;
  href: string;
  color?: "cobalt" | "burgundy" | "ink";
};

const contactFolders: ContactFolder[] = [
  { name: "send_email.eml",      label: "Email",    href: "mailto:divitejokashyap@gmail.com" },
  { name: "linkedin_profile.url", label: "LinkedIn", href: "https://www.linkedin.com/in/divitejokashyap/", color: "burgundy" },
  { name: "download_cv.pdf",     label: "Resume",   href: "/resume.pdf", color: "ink" },
];

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
    padding: "14px 16px",
    background: "hsl(var(--bg-alt))",
    color: "hsl(var(--ink))",
    border: "1px solid hsl(var(--rule))",
    borderRadius: "6px",
    outline: "none",
    width: "100%",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  return (
    <section id="contact" className="w-full border-t border-rule">
      <div className="container-wide py-20 md:py-32">
        {/* TOP — centered "thank you" block with scattered folders */}
        <div className="relative text-center pb-20 md:pb-24">
          {/* Floating asterisks */}
          <span
            className="deco-asterisk absolute text-[60px] md:text-[96px] text-burgundy leading-none"
            style={{ top: "-8%", left: "8%", transform: "rotate(-8deg)" }}
            aria-hidden="true"
          >
            *
          </span>
          <span
            className="deco-asterisk absolute text-[40px] md:text-[64px] text-cobalt leading-none"
            style={{ top: "6%", right: "12%", transform: "rotate(12deg)" }}
            aria-hidden="true"
          >
            *
          </span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="italic-flourish text-burgundy text-[20px] md:text-[24px] block mb-6">
              contact me
            </span>
            <h2
              className="font-display-italic text-ink mx-auto max-w-[1200px]"
              style={{
                fontSize: "clamp(48px, 10vw, 160px)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              thank you for<br />
              watching<span className="text-cobalt">!</span>
            </h2>
          </motion.div>

          {/* Scattered contact folders */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 md:mt-20 flex items-start justify-center gap-10 md:gap-20 flex-wrap"
          >
            {contactFolders.map((f, i) => (
              <a
                key={f.name}
                href={f.href}
                target={f.href.startsWith("http") ? "_blank" : undefined}
                rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-3 group"
                style={{ transform: `rotate(${i === 1 ? 0 : (i === 0 ? -4 : 4)}deg)` }}
              >
                <div
                  className={`folder-icon transition-transform duration-300 group-hover:-translate-y-1 ${
                    f.color === "burgundy" ? "is-burgundy" :
                    f.color === "ink"      ? "is-ink"      : ""
                  }`}
                  style={{ width: "72px", height: "56px" }}
                />
                <span className="italic-flourish text-ink text-[18px] md:text-[22px]">{f.label}</span>
                <span className="filename-label">{f.name}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Availability marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 border border-cobalt px-5 py-2.5 rounded-full">
            <span
              className="w-2 h-2 rounded-full bg-cobalt inline-block"
              style={{ boxShadow: "0 0 6px hsl(var(--cobalt))" }}
              aria-hidden="true"
            />
            <span className="text-[13px] font-medium text-ink">
              available · starting Summer 2026
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-rule mb-14 md:mb-20" />

        {/* Form — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1200px] mx-auto">
          {/* Left intro */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="italic-flourish text-burgundy text-[18px] md:text-[22px]">
                or send a message
              </span>
              <span className="deco-asterisk text-[18px]" aria-hidden="true">*</span>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink-60 mb-8 max-w-[420px]">
              Full-time Product Designer or Design Engineer roles, starting
              Summer 2026. If you have a hard problem and want someone who
              won't stop at the mockup — let's talk.
            </p>

            <a
              href="mailto:divitejokashyap@gmail.com"
              className="font-display text-ink block mb-6 break-all"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500 }}
            >
              divitejokashyap@gmail.com
            </a>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="py-12">
                <p
                  className="font-display text-cobalt mb-3"
                  style={{ fontSize: "48px", lineHeight: 1, fontWeight: 500 }}
                >
                  ✓ got it.
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
                  <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
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
                  <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
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
                  className="mt-2 w-full py-4 text-[14px] font-medium transition-colors duration-200"
                  style={{
                    background: "hsl(var(--ink))",
                    color: "hsl(var(--bg))",
                    borderRadius: "6px",
                    border: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--cobalt))"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(var(--ink))"; }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 md:mt-28 border-t border-rule pt-6 flex flex-col sm:flex-row justify-between items-baseline gap-3">
          <span className="text-[13px] text-ink-60">© 2026 Tejo Kashyap Divi</span>
          <span className="italic-flourish text-ink-60 text-[15px]">
            designed with intent · built with React & Tailwind
          </span>
        </div>
      </div>
    </section>
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
      <label className="block mb-2 text-[12px] font-medium text-ink-60 tracking-wide">
        {label}
      </label>
      <input type={type} name={name} required={required} style={inputStyle} />
    </div>
  );
}

export default ContactSection;
