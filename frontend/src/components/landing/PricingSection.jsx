import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    id: "landing-page",
    name: "Landing Page Design",
    price: "£700–£900",
    description: "Perfect for product launches and campaigns",
    features: [
      "Custom responsive design",
      "Mobile optimization",
      "Contact form integration",
      "SEO basics included",
      "2 revision rounds",
    ],
    highlighted: false,
  },
  {
    id: "website-design",
    name: "Website Design",
    price: "£1000–£2100",
    description: "Complete website solution for your business",
    features: [
      "Up to 5 custom pages",
      "Responsive design",
      "CMS integration",
      "SEO optimization",
      "Analytics setup",
      "3 revision rounds",
    ],
    highlighted: true,
  },
  {
    id: "website-redesign",
    name: "Website Redesign",
    price: "£1000–£2400",
    description: "Transform your existing website",
    features: [
      "Full design overhaul",
      "Content migration",
      "Performance optimization",
      "Modern UI/UX",
      "SEO improvements",
      "3 revision rounds",
    ],
    highlighted: false,
  },
  {
    id: "logo-design",
    name: "Logo Design",
    price: "£50–£300",
    description: "Professional branding for your business",
    features: [
      "3 initial concepts",
      "Unlimited revisions",
      "Multiple file formats",
      "Brand guidelines",
      "Full ownership",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Investment
          </span>
          <h2
            data-testid="pricing-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Transparent Pricing
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              data-testid={`pricing-card-${plan.id}`}
              className={`p-8 md:p-10 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "bg-[#121212] border-2 border-[#007bff] shadow-lg shadow-[#007bff]/10"
                  : "bg-[#121212] border border-white/5 hover:border-white/10"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#007bff] text-white text-xs font-medium mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-medium text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-white/60 mb-4">{plan.description}</p>
              <p className="text-3xl font-light text-[#f5f5dc] mb-6">
                {plan.price}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#007bff] mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                data-testid={`pricing-cta-${plan.id}`}
                onClick={scrollToContact}
                className={`w-full rounded-full py-6 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#007bff] hover:bg-[#0056b3] text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
