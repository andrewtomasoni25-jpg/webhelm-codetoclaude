import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cta"
      data-testid="cta-section"
      className="py-24 md:py-32 relative"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#007bff]/20 via-[#0b0b0b] to-[#0b0b0b]" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
          Let's Build Together
        </span>
        <h2
          data-testid="cta-title"
          className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-white mb-6"
        >
          Ready to steer your business in the right direction?
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">
          Let's create a website that not only looks stunning but also drives
          real results for your business. Get in touch today for a free
          consultation.
        </p>
        <Button
          data-testid="cta-button"
          onClick={scrollToContact}
          className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full px-8 py-6 text-base transition-all duration-300 hover:-translate-y-0.5 group"
        >
          Get your website today
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
