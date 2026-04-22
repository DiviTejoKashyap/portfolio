import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:divitejokashyap@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/divitejokashyap" },
  { label: "GitHub", href: "https://github.com/DiviTejoKashyap" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="app-shell pt-0 pb-5">
      <div className="bento-grid">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass col-span-12 lg:col-span-8 section-pad min-h-[300px] flex flex-col justify-between"
        >
          <div>
            <div className="eyebrow">Contact</div>
            <h2 className="display-lg mt-4 max-w-[10ch]">
              Let’s build
              <br />
              something sharp.
            </h2>
            <p className="mt-5 max-w-[680px] text-lg muted">
              Hiring for product design, UX, interface systems, or design that
              doesn’t look like it was approved by five committees? Cool. Reach out.
            </p>
          </div>

          <div className="dock mt-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="cta-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          viewport={{ once: true }}
          className="glass-soft col-span-12 lg:col-span-4 section-pad min-h-[300px]"
        >
          <div className="eyebrow">Availability</div>
          <div className="mt-5 stat-xl">2026</div>
          <p className="mt-3 text-sm muted">
            Open to internships and full-time product design opportunities.
          </p>

          <div className="mini-divider my-5" />

          <div className="space-y-3">
            <div>
              <div className="kicker">Base</div>
              <div className="mt-1 text-white">Jersey City, NJ</div>
            </div>
            <div>
              <div className="kicker">Best for</div>
              <div className="mt-1 text-white">Product design, UI/UX, design systems</div>
            </div>
            <div>
              <div className="kicker">Email</div>
              <div className="mt-1 text-white break-all">divitejokashyap@gmail.com</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;