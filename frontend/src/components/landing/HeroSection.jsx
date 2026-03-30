import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function HeroSection() {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Shader Animation Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b0b0b]/40 via-[#0b0b0b]/60 to-[#0b0b0b] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="opacity-0 animate-fade-in-up">
            <span
              data-testid="hero-overline"
              className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-6 block"
            >
              Web Design Agency
            </span>
            <h1
              data-testid="hero-title"
              className="text-5xl sm:text-6xl tracking-tight font-light text-white mb-6 leading-[1.1]"
            >
              Steering your business toward{" "}
              <span className="text-[#007bff]">online success</span>
            </h1>
            <p
              data-testid="hero-description"
              className="text-base leading-relaxed text-white/70 mb-8 max-w-xl"
            >
              We design high-performance websites that guide your business to
              grow and succeed online. From landing pages to full-scale web
              solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                data-testid="hero-cta-button"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full px-8 py-6 text-base transition-all duration-300 hover:-translate-y-0.5"
              >
                Get a Quote
              </Button>
              <Button
                data-testid="hero-secondary-button"
                onClick={(e) => scrollToSection(e, "#portfolio")}
                variant="outline"
                className="bg-[#f5f5dc] hover:bg-[#e5e5cc] text-[#0b0b0b] border-0 rounded-full px-8 py-6 text-base transition-all duration-300 hover:-translate-y-0.5"
              >
                View Work
              </Button>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400 relative">
            <div className="relative transform lg:rotate-2 lg:hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-[#007bff]/20 blur-3xl rounded-full" />
              <img
                data-testid="hero-mockup-image"
                src="https://images.unsplash.com/photo-1604611714877-a8108b03132f?w=800&q=80"
                alt="Website mockup"
                className="relative rounded-2xl shadow-2xl shadow-[#007bff]/10 border border-white/10 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
