import SplitTextReveal from "@/components/SplitTextReveal";

/**
 * "Built with" — compact logo strip of the tools WebHelm uses day-to-day.
 * Honest credential-builder that sits below TestimonialsSection.
 *
 * Grouped loosely by category (AI, design, infra, comms) but rendered
 * as a single flowing row on desktop — wraps cleanly on mobile.
 *
 * Text wordmarks (not logos) by design: brand-neutral, no licensing
 * worries, no extra asset fetches, and reads as intentional minimalism.
 */
const tools = [
  { name: "Claude", note: "AI" },
  { name: "Gemini", note: "AI" },
  { name: "Nano Banana", note: "Image AI" },
  { name: "Veo 3", note: "Video AI" },
  { name: "Figma", note: "Design" },
  { name: "Stripe", note: "Payments" },
  { name: "Resend", note: "Email delivery" },
  { name: "Zoho", note: "Mail hosting" },
];

export default function BuiltWithStrip() {
  return (
    <section
      data-testid="built-with-strip"
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-xs tracking-[0.3em] uppercase font-bold text-[#f5f5dc]/80 block">
            Our Toolkit
          </span>
          <SplitTextReveal
            as="h3"
            data-testid="built-with-title"
            className="text-2xl sm:text-3xl mt-3 tracking-tight font-medium text-white/90"
          >
            Built with tools that ship
          </SplitTextReveal>
        </div>

        <div
          data-testid="built-with-list"
          className="flex flex-wrap items-start justify-center gap-x-8 gap-y-7 md:gap-x-14 md:gap-y-8"
        >
          {tools.map((tool) => (
            <div
              key={tool.name}
              data-testid={`built-with-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative flex flex-col items-center text-center"
            >
              <span className="text-base md:text-xl font-medium text-white/55 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/30 mt-1.5 group-hover:text-white/60 transition-colors duration-300">
                {tool.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
