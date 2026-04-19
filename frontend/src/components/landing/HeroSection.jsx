import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ShaderLinesAnimation } from "@/components/ui/shader-lines";
import { StarsBackground } from "@/components/ui/stars-background";
import StaticVortex from "@/components/ui/static-vortex";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import MagneticButton from "@/components/MagneticButton";
import useHeavyGraphics from "@/hooks/use-heavy-graphics";

// Sparkles stay desktop-only — dense particles spike TBT on phones.
const SparklesCore = lazy(() =>
  import("@/components/ui/sparkles").then((m) => ({ default: m.SparklesCore }))
);

const LOGO_URL = "https://customer-assets.emergentagent.com/job_69c425dc-8d9f-4328-b10c-3751d17cadfd/artifacts/5z228esd_IMG_0296.png";

export default function HeroSection() {
  const heavyGraphics = useHeavyGraphics();

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

      {/* Shader lines — the animated three.js layer. Sits above the
          static vortex so the lines trace over the glow rather than
          against flat black. Already pauses its rAF when off-screen. */}
      <div className="absolute inset-0 z-[1]">
        <ShaderLinesAnimation />
      </div>

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
                width="512"
                height="512"
              />
            </div>

            <span
              data-testid="hero-overline"
              className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-[#f5f5dc] mb-6 block"
            >
              Web Design Agency
            </span>

            {/* Vaporize Text Effect — centered */}
            <div className="h-24 md:h-32 mb-6 w-full flex items-center justify-center">
              <VaporizeTextCycle
                texts={["Steering Success", "Building Brands", "Creating Impact"]}
                font={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "56px",
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
