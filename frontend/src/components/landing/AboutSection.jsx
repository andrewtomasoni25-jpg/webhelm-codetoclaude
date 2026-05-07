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
      "Most people with an idea \u2014 or an existing small business \u2014 get stuck. Logo, website, email, payments, Google profile: five different platforms, five hidden fees, and weeks of wasted time figuring it out alone.",
  },
  {
    id: "gap",
    label: "The Gap",
    body:
      "There's no real option for someone who just wants their whole online setup done properly, in one go, by one person — without paying agency rates or being locked into subscriptions they can't escape.",
  },
  {
    id: "solution",
    label: "The Solution",
    body:
      "WebHelm is a launchpad. Logo, website, email, payments, Google \u2014 all set up properly in 7 days, for one flat fee. Yours to own outright. Optional monthly upkeep with no contract, cancel any time.",
  },
  {
    id: "result",
    label: "The Result",
    body:
      "From idea to in-business in a week — or from messy to professional, if you're already trading. Either way, you're fully ready to take customers, and you focus only on the work.",
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
