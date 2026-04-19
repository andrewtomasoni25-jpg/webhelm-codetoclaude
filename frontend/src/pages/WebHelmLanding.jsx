import { lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";
import InteractiveNeuralVortex from "@/components/ui/interactive-neural-vortex-background";
import { StarsBackground } from "@/components/ui/stars-background";

// Everything below the fold is code-split — the user sees Hero + starfield
// immediately, and the heavier sections stream in as the browser idles.
const AboutSection = lazy(() => import("@/components/landing/AboutSection"));
const PortfolioSection = lazy(() =>
  import("@/components/landing/PortfolioSection")
);
const ServicesSection = lazy(() =>
  import("@/components/landing/ServicesSection")
);
const PricingSection = lazy(() =>
  import("@/components/landing/PricingSection")
);
const TestimonialsSection = lazy(() =>
  import("@/components/landing/TestimonialsSection")
);
const ProcessSection = lazy(() =>
  import("@/components/landing/ProcessSection")
);
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const ContactSection = lazy(() =>
  import("@/components/landing/ContactSection")
);
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));

// Lightweight fallback — keeps the layout calm while a chunk loads.
const SectionFallback = () => (
  <div aria-hidden="true" className="min-h-[40vh]" />
);

export default function WebHelmLanding() {
  return (
    <div data-testid="webhelm-landing" className="relative min-h-screen bg-[#0b0b0b]">
      {/* Global FIXED vortex — sized to the viewport so its shader keeps a
          ~16:9 ratio (previously the canvas wrapped About→FAQ, a 10,000+ px
          container, which squashed the shader's uv.x and made the pattern
          band into horizontal "straight lines"). Fixed-viewport keeps it
          flowy and organic across the whole body. */}
      <div className="fixed inset-0 z-0 pointer-events-none" data-testid="vortex-wrapper" aria-hidden>
        {/* Vortex canvas itself is capped at 45% opacity and blurred so the
            pattern reads as soft atmospheric haze instead of sharp motion.
            Combined with the shader's slowed time factor this removes
            almost all of the "distraction" without killing the effect. */}
        <div className="absolute inset-0" style={{ opacity: 0.45, filter: "blur(2px)" }}>
          <InteractiveNeuralVortex />
        </div>
        {/* Radial vignette — heavy darkening in the centre where copy sits,
            moderate darkening at the edges so the vortex is still present
            but never competes. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.70) 45%, rgba(11,11,11,0.45) 100%)",
          }}
        />
      </div>
      {/* Global starfield — stays above the vortex */}
      <div className="fixed inset-0 z-0 pointer-events-none" data-testid="global-stars">
        <StarsBackground count={220} className="relative w-full h-full" />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />

          {/* Body sections — transparent so the fixed vortex shows through.
              The blur feather that used to live here now sits at the TOP of
              AboutSection so it belongs to that section's shell. */}
          <div className="relative">
            <Suspense fallback={<SectionFallback />}>
              <AboutSection />
              <PortfolioSection />
              <ServicesSection />
              <PricingSection />
              <TestimonialsSection />
              <ProcessSection />
              <CTASection />
              <ContactSection />
              <FAQSection />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
