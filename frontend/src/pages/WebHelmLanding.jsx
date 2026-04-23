import { lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";
import useHeavyGraphics from "@/hooks/use-heavy-graphics";

// The WebGL vortex is the single biggest TBT contributor on mobile
// (~26s blocking on a mid-range phone). Lazy-load it so it's never
// shipped to devices that won't render it anyway, and never blocks
// the initial paint on devices that do.
const InteractiveNeuralVortex = lazy(() =>
  import("@/components/ui/interactive-neural-vortex-background")
);
// Starfield is pure CSS animation (no canvas / rAF / WebGL) — safe on
// mobile, so we import it eagerly and render it everywhere. We just
// drop the star count on phones to keep the DOM light.
import { StarsBackground } from "@/components/ui/stars-background";
// Static faux-vortex — the mobile fallback. Shared with HeroSection.
import StaticVortex from "@/components/ui/static-vortex";
// Page-wide rotating compass. Self-positioned (fixed), fades out
// whenever the Anthology (#portfolio) section is in view so it
// never competes with that section's visual rhythm.
import FloatingCompass from "@/components/ui/floating-compass";

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
// Swapped in place of TestimonialsSection. Under the UK DMCC Act 2024
// fabricated reviews are illegal, and we're a new agency with no real
// client base yet — so instead of synthesising quotes, we run the
// Founding Partner Programme in the same page slot.
const FoundingPartnerSection = lazy(() =>
  import("@/components/landing/FoundingPartnerSection")
);
const BuiltWithStrip = lazy(() =>
  import("@/components/landing/BuiltWithStrip")
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
  // On phones / low-power devices we skip the WebGL vortex and render a
  // cheap CSS gradient instead. Stars stay on everywhere (pure CSS).
  // This is the single biggest Lighthouse Mobile win (TBT 26s → <500ms).
  const heavyGraphics = useHeavyGraphics();

  return (
    <div data-testid="webhelm-landing" className="relative min-h-screen bg-[#0b0b0b]">
      {heavyGraphics ? (
        /* Desktop: WebGL vortex + vignette */
        <div className="fixed inset-0 z-0 pointer-events-none" data-testid="vortex-wrapper" aria-hidden>
          <div className="absolute inset-0" style={{ opacity: 0.45, filter: "blur(2px)" }}>
            <Suspense fallback={null}>
              <InteractiveNeuralVortex />
            </Suspense>
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
      ) : (
        /* Mobile / low-power: STATIC faux-vortex. Paints once on load
           and never again — no rAF, no WebGL, no animation frames. */
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          data-testid="static-bg-fallback"
        >
          <StaticVortex withVignette />
        </div>
      )}
      {/* Global starfield — renders on every device. Desktop gets the
          full 220, mobile gets a lighter 110 to keep the DOM cheap. */}
      <div className="fixed inset-0 z-0 pointer-events-none" data-testid="global-stars">
        <StarsBackground
          count={heavyGraphics ? 140 : 90}
          className="relative w-full h-full"
        />
      </div>
      {/* Two fixed-position nautical ornaments, both driven by the
          same FloatingCompass component in "show-when-visible" mode:
          the compass behind the Toolkit strip, the hero helm behind
          the Services grid. Both rotate at 240s clockwise so the
          nautical motifs feel like one family. The underlying
          component wires up a MutationObserver so it picks up its
          target even when the section loads lazily via Suspense. */}
      <FloatingCompass
        imageSrc="/about/compass.webp"
        targetSelector="#toolkit"
        mode="show-when-visible"
        rotationSeconds={240}
        testId="floating-compass"
      />
      <FloatingCompass
        imageSrc="/hero-helm.webp"
        targetSelector="#services"
        mode="show-when-visible"
        rotationSeconds={240}
        opacityMobile={0.09}
        opacityDesktop={0.12}
        sizeMobile="min(90vw, 700px)"
        sizeDesktop="min(65vw, 880px)"
        testId="floating-helm"
      />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />

          {/* Credibility strip sits directly under the Hero — new agency,
              no client testimonials yet, but a genuinely strong AI-forward
              stack that reads as "real tools, real stack" on first glance.
              Own Suspense boundary so it doesn't wait on the below-fold
              chunk, and won't block it either. */}
          <Suspense fallback={null}>
            <div className="wh-cv-auto">
              <BuiltWithStrip />
            </div>
          </Suspense>

          {/* Body sections — transparent so the fixed vortex shows through.
              The blur feather that used to live here now sits at the TOP of
              AboutSection so it belongs to that section's shell.

              Each section wrapped in .wh-cv-auto so the browser skips
              layout + paint for off-screen sections. Cuts first-render
              work substantially and isolates paint between sections. */}
          <div className="relative">
            <Suspense fallback={<SectionFallback />}>
              <div className="wh-cv-auto"><AboutSection /></div>
              <div className="wh-cv-auto"><PortfolioSection /></div>
              <div className="wh-cv-auto"><ServicesSection /></div>
              <div className="wh-cv-auto"><PricingSection /></div>
              <div className="wh-cv-auto"><FoundingPartnerSection /></div>
              <div className="wh-cv-auto"><ProcessSection /></div>
              <div className="wh-cv-auto"><CTASection /></div>
              <div className="wh-cv-auto"><ContactSection /></div>
              <div className="wh-cv-auto"><FAQSection /></div>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
