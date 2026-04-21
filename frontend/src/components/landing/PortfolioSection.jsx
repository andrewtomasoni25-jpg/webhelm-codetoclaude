import { Link } from "react-router-dom";
import SplitTextReveal from "@/components/SplitTextReveal";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight, Sparkles } from "lucide-react";

// Top-row projects (12) — full-size tiles, scrolls left. Single-row treatment;
// the deeper catalogue (all 23 projects with descriptions) lives on /work.
const TOP_ROW = [
  { src: "/portfolio/top/auramax.webp", brand: "AuraMax Audio", category: "E-Commerce" },
  { src: "/portfolio/top/aurelius.webp", brand: "Aurelius", category: "Luxury Brand" },
  { src: "/portfolio/top/black-level.webp", brand: "Black Level", category: "Sports Drink" },
  { src: "/portfolio/top/blueseal.webp", brand: "BlueSeal", category: "Professional" },
  { src: "/portfolio/top/cally.webp", brand: "Cally", category: "Product" },
  { src: "/portfolio/top/cyphrr.webp", brand: "Cyphrr", category: "SaaS / Tech" },
  { src: "/portfolio/top/heritage-cuts.webp", brand: "Heritage Cuts", category: "Beauty" },
  { src: "/portfolio/top/ix-designs.webp", brand: "IX Designs", category: "Creative Studio" },
  { src: "/portfolio/top/slim.vu.webp", brand: "Slim.vu", category: "Product" },
  { src: "/portfolio/top/thunder-energy.webp", brand: "Thunder Energy", category: "Beverage" },
  { src: "/portfolio/top/vibram.webp", brand: "Vibram", category: "E-Commerce" },
  { src: "/portfolio/top/wavebit.webp", brand: "Wavebit", category: "SaaS / Tech" },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Our Work
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="portfolio-title"
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-white mb-4"
          >
            Portfolio
          </SplitTextReveal>
          <p className="text-white/60 max-w-2xl mx-auto mb-3">
            A continuous showcase of our recent projects — custom designs powered by cutting-edge AI tools that drive real results
          </p>
          <div className="flex items-center justify-center gap-2 text-[#007bff] text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI-Enhanced Design & Development</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Soft glow behind the slider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[40vh] opacity-30"
        style={{
          background:
            "linear-gradient(to right, #007bff, transparent 40%, transparent 60%, #007bff)",
          filter: "blur(120px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Single full-size slider — scrolls left */}
      <ImageAutoSlider items={TOP_ROW} speed={80} />

      {/* Glass CTA → deep-dive /work page */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center">
        <Link
          to="/work"
          aria-label="Open the full WebHelm project archive"
          data-testid="portfolio-view-all"
        >
          <LiquidButton size="xl" className="text-white text-base font-medium">
            <span className="flex items-center gap-2">
              Explore all projects
              <ArrowRight className="w-4 h-4" />
            </span>
          </LiquidButton>
        </Link>
        <p className="text-center text-white/30 text-xs mt-6 tracking-wide">
          Swipe to explore · {TOP_ROW.length}+ projects — full index with descriptions on the Our Work page
        </p>
      </div>
    </section>
  );
}
