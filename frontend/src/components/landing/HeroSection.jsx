import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/ui/stars-background";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import MagneticButton from "@/components/MagneticButton";
import useHeavyGraphics from "@/hooks/use-heavy-graphics";

// Self-hosted in /public — lives on the same origin as the site, so
// no preconnect / CORS overhead and no dependency on a third-party CDN.
const LOGO_URL = "/hero-logo.png";
// Hero centerpiece — a 3D-rendered ship's helm that slowly rotates.
// Replaces the old shader-lines + sparkles + static-vortex stack with
// a single ~80 KB WebP that leans on GPU-composited CSS rotation
// instead of per-frame JavaScript. Net perf win vs. the old stack.
const HELM_URL = "/hero-helm.webp";

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
      {/* Local CSS — slow helm rotation. 60s per full turn, linear
          timing, GPU-composited. Zero main-thread cost: the transform
          runs entirely on the compositor thread, so the animation
          survives jank from elsewhere on the page. */}
      <style>{`
        @keyframes wh-helm-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .wh-helm {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(120vw, 1400px);
          height: min(120vw, 1400px);
          max-width: none;
          object-fit: contain;
          transform: translate(-50%, -50%);
          animation: wh-helm-spin 60s linear infinite;
          will-change: transform;
          opacity: 0.85;
          pointer-events: none;
          user-select: none;
        }
        /* Respect reduced-motion: hold the helm static but still show it. */
        @media (prefers-reduced-motion: reduce) {
          .wh-helm { animation: none; }
        }
      `}</style>

      {/* The helm — hero centerpiece. Sits behind the content layer
          (z-20) but above the starfield. Rotates slowly via pure CSS. */}
      <img
        src={HELM_URL}
        alt=""
        aria-hidden="true"
        className="wh-helm z-[3]"
        fetchpriority="high"
        decoding="async"
        width="1497"
        height="1449"
      />

      {/* Twinkling stars layer — sparse, to read as cosmic atmosphere
          without competing with the helm. */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <StarsBackground
          count={heavyGraphics ? 50 : 35}
          className="relative w-full h-full"
        />
      </div>

      {/* Dark radial vignette over the helm — darkens the exact region
          where the headline / logo / CTAs sit so text stays crisp
          while the helm silhouette reads at the edges. */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.30) 40%, rgba(11,11,11,0) 75%)",
        }}
      />

      {/* Bottom gradient fade — blends hero into the next section. */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#0b0b0b] pointer-events-none" />

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
              Web Design Agency
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
