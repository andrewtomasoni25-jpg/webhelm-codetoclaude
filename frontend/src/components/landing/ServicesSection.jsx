import { Monitor, Layout, RefreshCw, Palette } from "lucide-react";

const services = [
  {
    id: "web-design",
    icon: Monitor,
    title: "Website Design & Development",
    description:
      "Custom websites built from scratch to match your brand and business goals. Responsive, fast, and optimized for conversions.",
  },
  {
    id: "landing-pages",
    icon: Layout,
    title: "Landing Pages",
    description:
      "High-converting landing pages designed to capture leads and drive action. Perfect for campaigns and product launches.",
  },
  {
    id: "redesign",
    icon: RefreshCw,
    title: "Website Redesign",
    description:
      "Transform your outdated website into a modern, user-friendly experience that reflects your current brand identity.",
  },
  {
    id: "logo-design",
    icon: Palette,
    title: "Logo Design",
    description:
      "Professional logo design that captures your brand essence and makes a lasting impression on your audience.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            What We Do
          </span>
          <h2
            data-testid="services-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className="group p-8 md:p-10 rounded-2xl bg-[#121212] border border-white/5 hover:border-[#007bff]/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#007bff]/10 flex items-center justify-center mb-6 group-hover:bg-[#007bff]/20 transition-colors">
                <service.icon className="w-7 h-7 text-[#007bff]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
