import { Monitor, Mail, Globe, MapPin, CreditCard, Calendar, Palette, Bot } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

// Eight components of the launchpad — rendered as a numbered editorial
// list (icon + number + title + description) instead of card tiles.
// Each item sits on its own row, separated by a thin divider. Reads
// like a magazine feature, not a SaaS pitch deck. Dramatically lighter
// visually than 8 tiled cards.
const services = [
  {
    id: "brand",
    icon: Palette,
    title: "Logo & Brand",
    description:
      "Professional logo, colour palette and type system — built around your business so everything looks like it belongs together.",
  },
  {
    id: "website",
    icon: Monitor,
    title: "Custom Website",
    description:
      "Mobile-ready, fast-loading, designed around your customers. The kind of site that makes a stranger trust you in 5 seconds.",
  },
  {
    id: "email",
    icon: Mail,
    title: "Business Email",
    description:
      "yourname@yourbiz.co.uk — Google Workspace set up properly, so you stop sending invoices from a Hotmail address.",
  },
  {
    id: "domain",
    icon: Globe,
    title: "Domain & Hosting",
    description:
      "Domain registered to you, hosting handled, SSL secured. You own everything outright — no platform lock-in, no rented space.",
  },
  {
    id: "google",
    icon: MapPin,
    title: "Google Business Profile",
    description:
      "Set up, verified and optimised — so when someone searches for what you do, you actually appear in the local results.",
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Payment Setup",
    description:
      "Stripe or PayPal connected so you can take card payments from day one. Deposits, invoices, the lot — sorted.",
  },
  {
    id: "booking",
    icon: Calendar,
    title: "Booking System",
    description:
      "Calendly integration so customers can book themselves without ringing you. Saves hours every week, looks professional.",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Assistant",
    description:
      "A chat widget that answers customer questions 24/7 — opening hours, pricing, areas covered — while you do the work.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            The Launchpad
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="services-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-4"
          >
            Everything you need, in one launchpad
          </SplitTextReveal>
          <p className="text-white/75 max-w-xl mx-auto text-sm flex items-center justify-center gap-2">
            <Bot className="w-4 h-4 text-[#007bff]" />
            One launchpad. Eight components. Set up in a week. Yours forever.
          </p>
        </div>

        {/* Editorial numbered list — each component as a single row with
            an icon-rail on the left, number on the far left, title and
            description in the body. Hairline divider between rows.
            Massively lighter than 8 tiled cards. */}
        <div className="divide-y divide-white/10">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-row-${service.id}`}
              className="group grid grid-cols-[auto_auto_1fr] gap-6 md:gap-8 items-start py-7 md:py-8 transition-colors hover:bg-white/[0.015]"
            >
              {/* Number — small, monospace-feel, faded */}
              <span className="text-xs md:text-sm font-medium text-white/30 tabular-nums pt-1 w-8">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon — small blue square, sits in its own column */}
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#007bff]/10 flex items-center justify-center group-hover:bg-[#007bff]/20 transition-colors shrink-0">
                <service.icon className="w-5 h-5 md:w-5 md:h-5 text-[#007bff]" />
              </div>

              {/* Title + body — flex column so they stack tight */}
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">
                  {service.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-white/65 max-w-2xl">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
