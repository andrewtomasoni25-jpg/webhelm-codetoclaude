import { Monitor, Mail, Globe, MapPin, CreditCard, Calendar, Palette, Bot } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

// Eight components of the launchpad — every WebHelm package includes some
// or all of these depending on tier. Displayed here as a unified system so
// visitors understand "this is what we set up", not "these are services
// you pick from". Pricing lives in PricingSection below.
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
    highlighted: true,
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
      {/* The helm used to live here as a section-scoped ornament.
          It has been promoted to a page-level <FloatingCompass />
          (helm image) in WebHelmLanding, so it now drifts in a
          fixed position and fades out cleanly as soon as you leave
          the Services section. */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
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
          <p className="text-white/50 max-w-xl mx-auto text-sm flex items-center justify-center gap-2">
            <Bot className="w-4 h-4 text-[#007bff]" />
            One launchpad. Eight components. Set up in a week. Yours forever.
          </p>
        </div>

        {/* Services Grid — eight system components in a 4-col layout on
            desktop (2 perfect rows of 4). Each tile is a piece of the
            launchpad clients receive. The full grid reads as "this is
            everything you'd otherwise have to set up alone, sorted in
            one go". */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`group p-6 md:p-7 rounded-2xl bg-[#121212] border transition-all duration-300 hover:-translate-y-1 ${
                service.highlighted
                  ? "border-[#007bff]/40 hover:border-[#007bff]"
                  : "border-white/5 hover:border-[#007bff]/50"
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Prices removed — headline pricing lives in the PricingSection
                  below; this section is now a pure "what we do" lineup. */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#007bff]/10 flex items-center justify-center group-hover:bg-[#007bff]/20 transition-colors">
                  <service.icon className="w-6 h-6 text-[#007bff]" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
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
