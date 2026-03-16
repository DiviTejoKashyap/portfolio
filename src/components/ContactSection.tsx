import { motion } from "framer-motion";
import { useState, FormEvent } from "react";



const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    window.location.href = `mailto:divitejokashyap@gmail.com?subject=Portfolio%20Contact&body=${params.get("message") ?? ""}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="border-t border-rule pt-[120px] pb-20 px-6 md:px-10 max-w-[1100px] mx-auto">
      {/* Top copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16">
        
        <span className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-4">
          — LET'S WORK TOGETHER
        </span>
        <h2
          className="font-display leading-[1.0] mb-6"
          style={{ fontSize: "clamp(42px, 6vw, 80px)" }}>
          
          Looking for a designer
          <br />
          who ships the
          <br />
          <span className="text-accent-warm">actual product.</span>
        </h2>
        <p className="font-sans font-light text-[17px] text-ink-60 max-w-[500px] mx-auto mb-6">
          I'm looking for full-time Product Designer or Design Engineer roles
          starting Summer 2026. If you have a hard problem and want someone who
          won't stop at the mockup — let's talk.
        </p>
        <div className="inline-flex items-center gap-2 border border-green-500/30 rounded-full px-4 py-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono-label text-[11px] text-ink-60">
            Available · Starting Summer 2026
          </span>
        </div>
      </motion.div>

      {/* Two columns */}
      <div className="flex flex-col md:flex-row gap-20 mt-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2">
          
          <a
            href="mailto:divitejokashyap@gmail.com"
            className="font-display text-[22px] text-ink hover:text-accent-warm transition-colors block mb-6"
            data-cursor="OPEN">
            
            divitejokashyap@gmail.com
          </a>
          <div className="flex gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/divitejokashyap/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono-label text-[12px] text-ink-60 hover:text-ink transition-all group"
              data-cursor="OPEN"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-semibold text-[14px] border border-rule rounded-full px-6 py-2.5 hover:bg-ink hover:text-bg transition-all duration-200"
            data-cursor="OPEN">
            
            Download CV →
          </a>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/2">
          
          {submitted ?
          <div className="text-center py-16">
              <p className="font-display text-[32px] text-accent-warm mb-2">✓ Got it.</p>
              <p className="font-sans font-light text-[15px] text-ink-60">
                I'll get back to you within a day.
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-2">
                  Name
                </label>
                <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent border-0 border-b border-rule px-0 py-3 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors" />
              
              </div>
              <div>
                <label className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-2">
                  Email
                </label>
                <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-0 border-b border-rule px-0 py-3 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors" />
              
              </div>
              <div>
                <label className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-2">
                  What's this about
                </label>
                <select
                name="type"
                required
                className="w-full bg-transparent border-0 border-b border-rule px-0 py-3 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors">
                
                  <option value="">Select...</option>
                  <option value="product-designer">Full-time Product Designer</option>
                  <option value="design-engineer">Design Engineer Role</option>
                  <option value="internship">UX/UI Internship</option>
                  <option value="hello">Just saying hi</option>
                </select>
              </div>
              <div>
                <label className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-30 block mb-2">
                  Message
                </label>
                <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-transparent border-0 border-b border-rule px-0 py-3 text-ink font-sans text-[15px] focus:outline-none focus:border-ink transition-colors resize-none" />
              
              </div>
              <button
              type="submit"
              className="w-full bg-ink text-bg font-sans font-semibold text-[14px] uppercase tracking-[0.08em] py-4 rounded-md hover:bg-[hsl(var(--accent-warm))] transition-colors duration-200"
              data-cursor="SEND">

                Send Message
              </button>
            </form>
          }
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-rule pt-6 flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-mono-label text-[10px] text-ink-30">© 2026 Tejo Kashyap Divi</span>
        <span className="font-mono-label text-[10px] text-ink-30">
          Built with React · Tailwind · Framer Motion
        </span>
      </div>
    </section>);

};

export default ContactSection;