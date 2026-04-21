import SplitTextReveal from "@/components/SplitTextReveal";

/**
 * "Built with" — brand-coloured logo strip of the tools WebHelm uses
 * day-to-day. Honest credential-builder that sits below TestimonialsSection.
 *
 * Logos are self-hosted SVGs in /public/logos/ — no third-party CDN
 * runtime dependency. Each SVG ships with its true brand colours
 * (Figma's 5-colour mark, Gemini's gradient spark, Claude terracotta,
 * etc.) so the strip reads instantly as "real tools, real stack".
 *
 * Logos are desaturated at 70% opacity by default and lift to full
 * colour on hover, matching the restrained feel of the rest of the page.
 */
const tools = [
  { name: "Claude", note: "AI", logo: "/logos/claude.svg" },
  { name: "Gemini", note: "AI", logo: "/logos/gemini.svg" },
  { name: "Nano Banana", note: "Image AI", logo: "/logos/nano-banana.svg" },
  { name: "Veo 3", note: "Video AI", logo: "/logos/veo.svg" },
  { name: "Figma", note: "Design", logo: "/logos/figma.svg" },
  { name: "Stripe", note: "Payments", logo: "/logos/stripe.svg" },
  { name: "Resend", note: "Email delivery", logo: "/logos/resend.svg" },
  { name: "Zoho", note: "Mail hosting", logo: "/logos/zoho.svg" },
];

export default function BuiltWithStrip() {
  return (
    <section
      data-testid="built-with-strip"
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
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
          className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 md:gap-x-14 md:gap-y-10"
        >
          {tools.map((tool) => (
            <div
              key={tool.name}
              data-testid={`built-with-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative flex flex-col items-center text-center w-24 md:w-28"
            >
              {/* Logo — brand-coloured SVG, slightly dim by default then
                  lifts to full brightness + saturation on hover. */}
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-10 md:h-12 w-auto opacity-70 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-100 group-hover:-translate-y-0.5 transition-all duration-300"
              />
              <span className="mt-3 text-sm md:text-base font-medium text-white/70 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/35 mt-1 group-hover:text-white/60 transition-colors duration-300">
                {tool.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
