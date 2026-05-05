import { Monitor, Layout, RefreshCw, Palette, Rocket, Bot } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

// Five services in scan order — Refresh as the cheapest entry point, then
// Landing, then the brand offering, then the two main website tiers. Prices
// shown here are the standing rates; full Founding Partner discounts live
// in the PricingSection below.
const services = [
  {
    id: "landing-pages",
    icon: Layout,
    title: "Landing Page",
    price: "£750",
    description:
      "A single-page website that gets your business online fast. Clean design, mobile-ready, contact form built in.",
  },
  {
    id: "redesign",
    icon: RefreshCw,
    title: "Website Redesign",
    price: "£550",
    description:
      "Modernise your existing website without starting from scratch. Cleaner design, faster pages, ready for mobile.",
  },
  {
    id: "full-brand-build",
    icon: Palette,
    title: "Full Brand Build",
    price: "£750",
    description:
      "Everything your brand needs in one go — logo system, colour palette, type pairing, and a brand guidelines PDF.",
  },
  {
    id: "business",
    icon: Monitor,
    title: "Business Website",
    price: "£980",
    description:
      "Up to 5 custom pages built to bring in customers. AI Assistant included free, conversion-focused layout.",
    highlighted: true,
  },
  {
    id: "premium",
    icon: Rocket,
    title: "Premium Website",
    price: "£1,540",
    description:
      "Full custom design from scratch, built for serious growth. AI Assistant included, priority delivery and support.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* The helm used to live here as a section-scoped ornament.
          It has been promoted to a page-level <FloatingCompass />
          (helm image) in WebHelmLanding, so it now drifts in a
          fixed position and fades out cleanly as soon as you leave
          the Services section. */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            What We Do
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="services-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-4"
          >
            Our Services
          </SplitTextReveal>
          <p className="text-white/50 max-w-xl mx-auto text-sm flex items-center justify-center gap-2">
            <Bot className="w-4 h-4 text-[#007bff]" />
            Supercharged with AI tools — so you get better results, faster
          </p>
        </div>

        {/* Services Grid — five cards in a 3-col layout. Row 1 holds the
            three entry products (Landing / Redesign / Brand Build). Row 2
            holds Business in column 1 with Premium pushed into column 3,
            leaving the middle cell empty so Premium reads as the
            standalone top tier rather than just "the next card along". */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`group p-8 md:p-10 rounded-2xl bg-[#121212] border transition-all duration-300 hover:-translate-y-1 ${
                service.highlighted
                  ? "border-[#007bff]/40 hover:border-[#007bff]"
                  : "border-white/5 hover:border-[#007bff]/50"
              } ${service.id === "premium" ? "lg:col-start-3" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Prices removed — headline pricing lives in the PricingSection
                  below; this section is now a pure "what we do" lineup. */}
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#007bff]/10 flex items-center justify-center group-hover:bg-[#007bff]/20 transition-colors">
                  <service.icon className="w-7 h-7 text-[#007bff]" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
