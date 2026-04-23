import { motion } from "framer-motion";
import SplitTextReveal from "@/components/SplitTextReveal";

// Four-part narrative — Problem, Gap, Solution, Result. Rewritten to
// the tightened copy brief: 1-2 sentences each, clear, business-
// focused, no abstract or poetic language. Previous version leaned
// too far into metaphor ("we set the nautical north", "hyper-
// efficient AI") — swapped for plain, confident outcomes.
const PILLARS = [
  {
    id: "problem",
    label: "The Problem",
    body:
      "Most business websites feel outdated. Slow, generic, and easy to scroll past \u2014 which in a competitive market means fewer enquiries and fewer customers.",
  },
  {
    id: "gap",
    label: "The Gap",
    body:
      "The market splits between cheap and instant, or slow and expensive. Owners are left choosing between poor quality or three-month waits, with no real middle ground.",
  },
  {
    id: "solution",
    label: "The Solution",
    body:
      "We fill that gap. Modern design paired with efficient systems means websites that are fast, clean, and built to convert \u2014 delivered in days, not months.",
  },
  {
    id: "result",
    label: "The Result",
    body:
      "A professional website that reflects your business properly, delivered faster than traditional agencies and built to actually generate enquiries.",
  },
];

// Truthful pillars replacing the fake "98% satisfaction / 2 years experience"
// stats. Each is verifiable from the public offer.
const FACTS = [
  { id: "velocity", value: "48\u201372h", label: "Production-ready build" },
  { id: "rate", value: "30% off", label: "Founding Partner rate" },
  { id: "slots", value: "4 / 15", label: "Founding slots remaining" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* The compass ornament used to live here as a section-scoped
          element. It has been promoted to a page-level <FloatingCompass />
          rendered from WebHelmLanding — it now drifts behind every
          section except the Anthology, where it fades out of the way. */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Why WebHelm
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Elite human design, <br />
            <span className="text-4xl md:text-[4.5rem] font-bold mt-1 leading-none bg-gradient-to-r from-[#007bff] via-[#f5f5dc] to-[#007bff] bg-clip-text text-transparent">
              hyper-efficient delivery
            </span>
          </h2>
        </motion.div>

        {/* Main art image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <img
            src="/about/webhelm-art.webp"
            alt="WebHelm — crafting websites that drive results"
            className="w-full h-auto rounded-[2rem] border border-white/10 shadow-2xl"
            draggable={false}
          />
        </motion.div>

        {/* Problem / Gap / Solution / Result — four-pillar narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <SplitTextReveal
            as="h3"
            data-testid="about-title"
            className="text-2xl sm:text-3xl tracking-tight font-medium text-white mb-10"
          >
            A deliberate position in the market
          </SplitTextReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left mb-12">
            {PILLARS.map((p) => (
              <div key={p.id} data-testid={`pillar-${p.id}`}>
                <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#007bff] mb-3 block">
                  {p.label}
                </span>
                <p className="text-[15px] leading-relaxed text-white/75">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          {/* Verifiable facts — no fabricated metrics. */}
          <div className="grid grid-cols-3 gap-6">
            {FACTS.map((stat) => (
              <div key={stat.id} data-testid={`stat-${stat.id}`}>
                <p className="text-3xl font-light text-[#007bff]">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
