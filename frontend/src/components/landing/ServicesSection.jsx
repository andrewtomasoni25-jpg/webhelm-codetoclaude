import { Monitor, Layout, RefreshCw, Palette, Rocket, Bot, LifeBuoy } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";
import { motion } from "framer-motion";

const services = [
  {
    id: "logo-design",
    icon: Palette,
    title: "Logo Design",
    price: "£150",
    description:
      "A professional logo that makes your business look credible and stand out. AI-enhanced concept generation means more creative options, faster.",
  },
  {
    id: "landing-pages",
    icon: Layout,
    title: "Landing Page",
    price: "£750",
    description:
      "Get your business online quickly with a clean, professional single-page website. Mobile-friendly with AI-optimised layout and SEO basics.",
  },
  {
    id: "support",
    icon: LifeBuoy,
    title: "Ongoing Support",
    price: "Free",
    description:
      "Keep your website running smoothly with free monthly check-ups and updates. Available with all packages so your site stays fast and fresh.",
    highlighted: true,
  },
  {
    id: "redesign",
    icon: RefreshCw,
    title: "Website Redesign",
    price: "From £1,300",
    description:
      "Transform your outdated website into a modern, high-performing asset. AI-driven UX analysis, content migration, and conversion improvements.",
  },
  {
    id: "business",
    icon: Monitor,
    title: "Business Website",
    price: "£1,400",
    description:
      "Up to 5 custom pages designed for your target customers. AI-powered optimisation, SEO setup, and clear call-to-actions to increase enquiries.",
  },
  {
    id: "premium",
    icon: Rocket,
    title: "Premium Website",
    price: "£2,200",
    description:
      "Up to 8 pages with conversion-focused layout, speed optimisation, and advanced UX. Built for businesses serious about growth.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`group p-8 md:p-10 rounded-2xl bg-[#121212] border transition-all duration-300 hover:-translate-y-1 ${
                service.highlighted
                  ? "border-[#007bff]/40 hover:border-[#007bff]"
                  : "border-white/5 hover:border-[#007bff]/50"
              }`}
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
