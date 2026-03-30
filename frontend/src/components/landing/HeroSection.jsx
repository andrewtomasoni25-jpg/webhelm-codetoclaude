import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_69c425dc-8d9f-4328-b10c-3751d17cadfd/artifacts/5z228esd_IMG_0296.png";

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
      className="relative min-h-screen overflow-hidden"
    >
      {/* Shader Animation Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b0b0b]/30 via-[#0b0b0b]/50 to-[#0b0b0b] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="opacity-0 animate-fade-in-up">
              {/* Large Logo */}
              <div className="mb-8">
                <img
                  src={LOGO_URL}
                  alt="WebHelm Logo"
                  className="h-28 md:h-36 w-auto"
                  data-testid="hero-logo"
                />
              </div>
              
              <span
                data-testid="hero-overline"
                className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-6 block"
              >
                Web Design Agency
              </span>
              
              {/* Vaporize Text Effect */}
              <div className="h-24 md:h-32 mb-6">
                <VaporizeTextCycle
                  texts={["Steering Success", "Building Brands", "Creating Impact"]}
                  font={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "48px",
                    fontWeight: 300
                  }}
                  color="rgb(255,255,255)"
                  spread={5}
                  density={5}
                  animation={{
                    vaporizeDuration: 2,
                    fadeInDuration: 1,
                    waitDuration: 1
                  }}
                  direction="left-to-right"
                  alignment="left"
                  tag={Tag.H1}
                />
              </div>
              
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Website mockup"
                  className="relative rounded-2xl shadow-2xl shadow-[#007bff]/10 border border-white/10 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
