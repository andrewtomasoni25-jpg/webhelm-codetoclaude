import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/ui/stars-background";
import StaticVortex from "@/components/ui/static-vortex";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import MagneticButton from "@/components/MagneticButton";
import useHeavyGraphics from "@/hooks/use-heavy-graphics";

// Desktop-only animations — lazy-loaded so mobile doesn't even
// download three.js or the sparkles particle system.
const ShaderLinesAnimation = lazy(() =>
  import("@/components/ui/shader-lines").then((m) => ({
    default: m.ShaderLinesAnimation,
  }))
);
const SparklesCore = lazy(() =>
  import("@/components/ui/sparkles").then((m) => ({ default: m.SparklesCore }))
);

// Self-hosted in /public — lives on the same origin as the site, so
// no preconnect / CORS overhead and no dependency on a third-party CDN.
const LOGO_URL = "/hero-logo.webp";

export default function HeroSection() {
  const heavyGraphics = useHeavyGraphics();

  // Pick a font size the vaporize canvas can fit on any viewport.
  // The text "Building Brands" at 56px needs ~430px of width — that
  // overflows any phone. Scales fluidly across breakpoints.
  const [vaporFontSize, setVaporFontSize] = useState("56px");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pick = () => {
      const w = window.innerWidth;
      if (w < 380) return "30px";
      if (w < 500) return "36px";
      if (w < 768) return "42px";
      if (w < 1024) return "48px";
      return "56px";
    };
    setVaporFontSize(pick());
    const onResize = () => setVaporFontSize(pick());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b]"
    >
      {/* Static faux-vortex — paint-once CSS/SVG layer. Renders on every
          device as the base atmosphere. Zero runtime cost so it sits
          safely behind the shader lines without affecting performance. */}
      <div className="absolute inset-0 z-0">
        <StaticVortex withVignette={false} />
      </div>

      {/* Shader lines — the animated three.js layer. DESKTOP ONLY.
          On mobile it costs ~15-19s of TBT on mid-range phones, which
          tanks the Lighthouse score. The static faux-vortex behind
          carries the mood on phones without the CPU cost. */}
      {heavyGraphics && (
        <div className="absolute inset-0 z-[1]">
          <Suspense fallback={null}>
            <ShaderLinesAnimation />
          </Suspense>
        </div>
      )}

      {/* Twinkling stars layer — pure CSS animation, sits above the
          shader lines so the starfield reads through. Count is tuned
          lighter than the global one so the hero doesn't feel busy. */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <StarsBackground
          count={heavyGraphics ? 140 : 80}
          className="relative w-full h-full"
        />
      </div>

      {/* Sparkles overlay — desktop only. On phones a particle field
          this dense fights the vaporize text and spikes TBT. */}
      {heavyGraphics && (
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <Suspense fallback={null}>
            <SparklesCore
              id="hero-sparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={45}
              particleColor="#ffffff"
              speed={1}
              className="w-full h-full"
            />
          </Suspense>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b0b0b]/20 via-[#0b0b0b]/40 to-[#0b0b0b] pointer-events-none" />

      {/* Content — single centered column */}
      <div className="relative z-20 min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
          <div className="flex flex-col items-center text-center opacity-0 animate-fade-in-up">
            {/* Large centered logo with glow */}
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-[#007bff]/30 blur-3xl rounded-full scale-150 pointer-events-none" />
              <img
                src={LOGO_URL}
                alt="WebHelm Logo"
                className="relative h-44 md:h-56 lg:h-64 w-auto drop-shadow-[0_0_40px_rgba(0,123,255,0.5)]"
                data-testid="hero-logo"
                fetchpriority="high"
                decoding="async"
                width="1132"
                height="788"
              />
            </div>

            <span
              data-testid="hero-overline"
              className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-[#f5f5dc] mb-6 block"
            >
              Web Agency
            </span>

            {/* Vaporize Text Effect — centered. Height scales with the
                fluid font size so short phones don't leave a big gap. */}
            <div className="h-16 sm:h-20 md:h-32 mb-6 w-full flex items-center justify-center">
              <VaporizeTextCycle
                key={vaporFontSize /* force re-mount so canvas re-measures at the new size */}
                texts={["Steering Success", "Building Brands", "Creating Impact"]}
                font={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: vaporFontSize,
                  fontWeight: 300,
                }}
                color="rgb(255,255,255)"
                spread={5}
                density={5}
                animation={{
                  vaporizeDuration: 2,
                  fadeInDuration: 1,
                  waitDuration: 1,
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
              />
            </div>

            <p
              data-testid="hero-description"
              className="text-base md:text-lg leading-relaxed text-white/70 mb-10 max-w-2xl mx-auto"
            >
              We design high-performance websites that guide your business to
              grow and succeed online. From landing pages to full-scale web
              solutions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton>
                <Button
                  data-testid="hero-cta-button"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full px-10 py-6 text-base transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,123,255,0.4)]"
                >
                  Get a Quote
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  data-testid="hero-secondary-button"
                  onClick={(e) => scrollToSection(e, "#portfolio")}
                  variant="outline"
                  className="bg-[#f5f5dc] hover:bg-[#e5e5cc] text-[#0b0b0b] border-0 rounded-full px-10 py-6 text-base transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Work
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
