import { motion } from "framer-motion";
import { Check, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import SplitTextReveal from "@/components/SplitTextReveal";

// Public, real numbers — easy to update from one place as the programme fills.
const TOTAL_SLOTS = 15;
const SLOTS_TAKEN = 11;
const SLOTS_LEFT = TOTAL_SLOTS - SLOTS_TAKEN;
// Aligned with the Premium tier in PricingSection — Founding Partners
// receive the full Premium build, so the rates match exactly: 30% off
// £2,200 → £1,540. Keeping the two sections in sync means a visitor
// comparing them sees one consistent offer rather than two competing
// numbers.
const STANDING_FEE = "\u00A32,200";
const FOUNDING_RATE = "\u00A31,540";
const DISCOUNT_PCT = "30%";

// What a Founding Partner actually receives. Each line is a deliverable
// that's contractually verifiable — no vague benefits.
const INCLUDES = [
  "A complete, custom website \u2014 design, build, copy, and launch",
  "Delivered in 48 to 72 hours from brief sign-off",
  "Full ownership of the code, the copy, and the domain",
  "Production-grade hosting setup, no lock-in",
  "Thirty days of post-launch refinement at no extra cost",
  "A permanent entry in the WebHelm Anthology",
  "Direct access to the founder for the duration of the engagement",
];

export default function FoundingPartnerSection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="founding-partners"
      data-testid="founding-partners-section"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            The Founding Partner Programme
          </span>
          <SplitTextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-white mb-6"
          >
            A public record, authored by the first fifteen.
          </SplitTextReveal>
          <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-3xl mx-auto">
            Fifteen sites. Fifteen partners. One permanent archive of the work we built first.
          </p>
        </motion.div>

        {/* The offer card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm"
        >
          {/* Top row — honest framing, tightened per the copy brief:
              clear, premium, lightly confident, business-focused. */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-[15px] md:text-base leading-relaxed text-white/75">
              We&rsquo;ve just launched, so instead of showing past results,
              we&rsquo;re building them. Fifteen UK businesses get a complete
              WebHelm website at a reduced founding rate, in exchange for a
              verified review and a place in our portfolio.
            </p>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl mx-auto mb-12">
            {INCLUDES.map((line, i) => (
              <div
                key={i}
                data-testid={`founding-include-${i}`}
                className="flex items-start gap-3"
              >
                <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-[#007bff]/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#007bff]" />
                </span>
                <span className="text-[15px] leading-relaxed text-white/80">
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Rate + scarcity row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <div
              data-testid="founding-rate"
              className="p-6 rounded-2xl border border-white/10 bg-black/30"
            >
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#007bff] mb-3 block">
                The Rate
              </span>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl md:text-5xl font-light text-white">
                  {FOUNDING_RATE}
                </span>
                <span className="text-lg text-white/40 line-through">
                  {STANDING_FEE}
                </span>
              </div>
              <p className="text-sm text-white/60">
                {DISCOUNT_PCT} below our standing fee. Offered once, to the
                Founding Fifteen.
              </p>
            </div>

            <div
              data-testid="founding-scarcity"
              className="p-6 rounded-2xl border border-white/10 bg-black/30"
            >
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#007bff] mb-3 block">
                Availability
              </span>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl md:text-5xl font-light text-white">
                  {SLOTS_LEFT}
                </span>
                <span className="text-sm text-white/50">
                  of {TOTAL_SLOTS} remain
                </span>
              </div>
              <p className="text-sm text-white/60">
                {SLOTS_TAKEN} places taken. When the final slot is placed, the
                programme closes and the rate returns to {STANDING_FEE}.
              </p>
              {/* Progress bar — honest visual of remaining slots. */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#007bff]"
                  style={{ width: `${(SLOTS_TAKEN / TOTAL_SLOTS) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <MagneticButton>
              <Button
                data-testid="founding-cta"
                onClick={scrollToContact}
                className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full px-10 py-6 text-base transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,123,255,0.4)]"
              >
                Apply for one of the remaining {SLOTS_LEFT} places
              </Button>
            </MagneticButton>
            <p className="text-xs text-white/40 tracking-wide">
              Applications reviewed in the order received.
            </p>
          </div>
        </motion.div>

        {/* Terms of the Programme — editorial block, not a footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 max-w-3xl mx-auto"
          data-testid="founding-terms"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Anchor className="w-4 h-4 text-[#f5f5dc]" />
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#f5f5dc]">
              Terms of the Programme
            </span>
            <Anchor className="w-4 h-4 text-[#f5f5dc]" />
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-white/70 text-center md:text-left">
            <p>
              The rate exists to build a public, truthful record of our early
              work &mdash; authored by the people who commissioned it.
            </p>
            <p>
              In return, a partner contributes a short video account of the
              engagement and a verified Google review. Both belong to them.
              We don&rsquo;t script either. Under UK law, and by our own
              standard, they must reflect the partner&rsquo;s honest
              experience &mdash; if it isn&rsquo;t worth the review, the
              review isn&rsquo;t written.
            </p>
            <p className="text-white/55 italic">
              Fifteen places. {SLOTS_TAKEN} taken. {SLOTS_LEFT} remain. When
              they are filled, the programme closes and the rate returns to
              {" "}{STANDING_FEE}. The archive stays permanent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
