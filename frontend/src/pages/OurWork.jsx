import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { StarsBackground } from "@/components/ui/stars-background";
import InteractiveNeuralVortex from "@/components/ui/interactive-neural-vortex-background";
import { SmoothScrollHero } from "@/components/ui/smooth-scroll-hero";
import Footer from "@/components/landing/Footer";
import SplitTextReveal from "@/components/SplitTextReveal";

// Full project catalogue — top + bottom combined, each with a short description.
// Kept here (rather than imported from PortfolioSection) so this page can
// drive its own layout without coupling to slider internals.
const PROJECTS = [
  // --- TOP (12) ---
  {
    src: "/portfolio/top/auramax.webp",
    brand: "AuraMax Audio",
    category: "E-Commerce",
    description:
      "Premium audio brand storefront with immersive product storytelling and a checkout tuned for high-ticket conversions.",
  },
  {
    src: "/portfolio/top/aurelius.webp",
    brand: "Aurelius",
    category: "Luxury Brand",
    description:
      "Luxury lifestyle brand site leading with heritage craftsmanship, editorial photography and understated typography.",
  },
  {
    src: "/portfolio/top/black-level.webp",
    brand: "Black Level",
    category: "Sports Drink",
    description:
      "High-performance sports drink brand with a bold, high-contrast visual language and product pages engineered for athlete conversions.",
  },
  {
    src: "/portfolio/top/blueseal.webp",
    brand: "BlueSeal",
    category: "Professional",
    description:
      "Professional consulting firm with a trust-led brand voice, clear service ladders and a simple discovery-call funnel.",
  },
  {
    src: "/portfolio/top/cally.webp",
    brand: "Cally",
    category: "Product",
    description:
      "Minimal single-product landing page engineered for focused hero-to-CTA conversion with zero visual clutter.",
  },
  {
    src: "/portfolio/top/cyphrr.webp",
    brand: "Cyphrr",
    category: "SaaS / Tech",
    description:
      "Dark-mode SaaS launch page with gradient spotlights, feature grid and a product-first narrative flow.",
  },
  {
    src: "/portfolio/top/heritage-cuts.webp",
    brand: "Heritage Cuts",
    category: "Beauty",
    description:
      "Barber shop brand with vintage textures, stylist profiles and a smooth appointment-booking experience.",
  },
  {
    src: "/portfolio/top/ix-designs.webp",
    brand: "IX Designs",
    category: "Creative Studio",
    description:
      "Creative studio portfolio with bold typographic hierarchy and scroll-driven case-study storytelling.",
  },
  {
    src: "/portfolio/top/slim.vu.webp",
    brand: "Slim.vu",
    category: "Product",
    description:
      "Compact product site that prioritises minimalism, whitespace and fast time-to-meaning over decoration.",
  },
  {
    src: "/portfolio/top/thunder-energy.webp",
    brand: "Thunder Energy",
    category: "Beverage",
    description:
      "Energy drink brand with electric colour palette, kinetic motion and flavour-forward product pages.",
  },
  {
    src: "/portfolio/top/vibram.webp",
    brand: "Vibram",
    category: "E-Commerce",
    description:
      "Performance footwear e-commerce with technical product filters, activity taxonomy and durable design.",
  },
  {
    src: "/portfolio/top/wavebit.webp",
    brand: "Wavebit",
    category: "SaaS / Tech",
    description:
      "SaaS analytics product site with dashboard previews, integration grid and value-led pricing table.",
  },
  // --- BOTTOM (11) ---
  {
    src: "/portfolio/bottom/veloretti.webp",
    brand: "Veloretti",
    category: "E-Commerce",
    description:
      "Premium e-bike brand with a custom configurator, lifestyle imagery and spec sheets that actually convert.",
  },
  {
    src: "/portfolio/bottom/bean-and-brew.webp",
    brand: "Bean & Brew",
    category: "Hospitality",
    description:
      "Specialty coffee shop site with a rich menu, venue booking flow and a warm, tactile visual system.",
  },
  {
    src: "/portfolio/bottom/flip.webp",
    brand: "Flip",
    category: "Product",
    description:
      "Modern product landing with animated feature reveals that pace the story without stealing focus.",
  },
  {
    src: "/portfolio/bottom/foxtail.webp",
    brand: "Foxtail",
    category: "Beauty",
    description:
      "Beauty brand site with soft editorial photography, ingredient-led storytelling and a refined, feminine type stack.",
  },
  {
    src: "/portfolio/bottom/furniture.webp",
    brand: "Furniture Co.",
    category: "E-Commerce",
    description:
      "Furniture retailer with a filterable catalogue, styled room presets and calm, gallery-style PDPs.",
  },
  {
    src: "/portfolio/bottom/green.webp",
    brand: "Green",
    category: "Sustainability",
    description:
      "Sustainability-first brand leading with measurable impact, transparent supply stories and soft earth palette.",
  },
  {
    src: "/portfolio/bottom/infinity.webp",
    brand: "Infinity",
    category: "Product",
    description:
      "Minimal product launch page with gradient focal moments and a cleanly paced scroll narrative.",
  },
  {
    src: "/portfolio/bottom/mdhlab.webp",
    brand: "MDH Lab",
    category: "Research / Tech",
    description:
      "Research and tech platform with a scientific aesthetic, citations-forward layout and credible tone.",
  },
  {
    src: "/portfolio/bottom/oppoenco.webp",
    brand: "OppoEnco",
    category: "Consumer Tech",
    description:
      "Consumer tech product page with feature grid, specs and a hero built around the product silhouette.",
  },
  {
    src: "/portfolio/bottom/pink-fashion.webp",
    brand: "Pink Fashion",
    category: "Fashion",
    description:
      "Fashion brand lookbook with a runway-inspired grid, seasonal drops and frictionless browsing.",
  },
  {
    src: "/portfolio/bottom/realme.webp",
    brand: "Realme",
    category: "Consumer Tech",
    description:
      "Consumer tech landing with device showcase, detailed specs and a bold, colour-driven hero treatment.",
  },
];

// Series assignment for the Anthology view. Three columns of
// positioning: Artisan (craft, heritage, hospitality, fashion),
// Professional (premium commerce, research, consulting), Tech (SaaS,
// consumer-tech, product launches). Keyed by brand so the mapping
// stays next to the labelling rather than inside each project entry.
const SERIES_MAP = {
  // Artisan
  "Aurelius": "artisan",
  "Heritage Cuts": "artisan",
  "Bean & Brew": "artisan",
  "Foxtail": "artisan",
  "IX Designs": "artisan",
  "Pink Fashion": "artisan",
  "Furniture Co.": "artisan",
  "Green": "artisan",
  // Professional
  "BlueSeal": "professional",
  "AuraMax Audio": "professional",
  "Vibram": "professional",
  "Veloretti": "professional",
  "MDH Lab": "professional",
  "Thunder Energy": "professional",
  "Black Level": "professional",
  "Infinity": "professional",
  // Tech
  "Cyphrr": "tech",
  "Wavebit": "tech",
  "Cally": "tech",
  "Slim.vu": "tech",
  "Flip": "tech",
  "OppoEnco": "tech",
  "Realme": "tech",
};

// AI + tooling stack per project, shown on each card. Kept short and
// keyed by brand so the array above stays tidy.
const SPECS_MAP = {
  "Aurelius": "Claude · Midjourney · Figma · Next.js",
  "Heritage Cuts": "Claude · Midjourney · Figma · Framer · Cal.com",
  "Bean & Brew": "Claude · Midjourney · Figma · Astro",
  "Foxtail": "Claude · Midjourney · Figma · Shopify",
  "IX Designs": "Claude · Midjourney · Figma · Next.js · Sanity",
  "Pink Fashion": "Claude · Midjourney · Figma · Shopify",
  "Furniture Co.": "Claude · Midjourney · Figma · Next.js · Shopify",
  "Green": "Claude · Midjourney · Figma · Next.js",
  "BlueSeal": "Claude · Figma · Next.js · HubSpot",
  "AuraMax Audio": "Claude · Midjourney · Figma · Next.js · Stripe",
  "Vibram": "Claude · Midjourney · Figma · Shopify · Algolia",
  "Veloretti": "Claude · Midjourney · Figma · Next.js · Stripe",
  "MDH Lab": "Claude · Figma · Astro · Sanity",
  "Thunder Energy": "Claude · Midjourney · Figma · Shopify",
  "Black Level": "Claude · Midjourney · Figma · Shopify",
  "Infinity": "Claude · Midjourney · Figma · Framer",
  "Cyphrr": "Claude · Figma · Next.js · Cursor · Vercel",
  "Wavebit": "Claude · Figma · Next.js · Cursor · Mintlify",
  "Cally": "Claude · Figma · Framer",
  "Slim.vu": "Claude · Figma · Next.js",
  "Flip": "Claude · Figma · Framer",
  "OppoEnco": "Claude · Figma · Next.js · Cursor",
  "Realme": "Claude · Figma · Next.js · Cursor",
};

// Display order and labelling for each series block.
const SERIES = [
  {
    id: "artisan",
    label: "Artisan Series",
    subtitle:
      "Craft, heritage, hospitality and fashion — brands whose value is authored in the making.",
  },
  {
    id: "professional",
    label: "Professional Series",
    subtitle:
      "Premium commerce, consulting and research — brands that trade on precision and authority.",
  },
  {
    id: "tech",
    label: "Tech Series",
    subtitle:
      "SaaS, consumer-tech and product launches — brands operating at developer-grade velocity.",
  },
];

const HERO_CENTER = "/work/hero-boat.webp";

// Dark, moody picks from the existing top/bottom portfolio sets — reused here
// as the scroll-parallax "reveal" rail underneath the boat. Order is
// deliberately random-feeling rather than alphabetical.
const HERO_PARALLAX = [
  { src: "/portfolio/top/black-level.webp", alt: "Black Level — sports drink brand" },
  { src: "/portfolio/top/cyphrr.webp", alt: "Cyphrr — dark SaaS product" },
  { src: "/portfolio/bottom/mdhlab.webp", alt: "MDH Lab — research platform" },
  { src: "/portfolio/top/thunder-energy.webp", alt: "Thunder Energy — beverage brand" },
];

export default function OurWork() {
  return (
    <div className="relative min-h-screen bg-[#0b0b0b]">
      {/* Global backgrounds — FIXED to the viewport so they stay flowy and
          keep a ~16:9 aspect ratio across the whole page (hero + grid).
          Previously the vortex canvas wrapped a very tall section, which
          squashed its shader aspect into horizontal bands ("straight lines").
          Fixed-viewport keeps the pattern organic. */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        {/* Vortex dimmed to 40% and softened — on this page the boat image
            carries the visual weight so the vortex needs to recede further
            than on the landing. */}
        <div className="absolute inset-0" style={{ opacity: 0.4, filter: "blur(2px)" }}>
          <InteractiveNeuralVortex />
        </div>
        {/* Radial vignette tuned heavier than the landing — boat + title
            need a calm, near-black centre to read cleanly over. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,11,11,0.88) 0%, rgba(11,11,11,0.75) 45%, rgba(11,11,11,0.50) 100%)",
          }}
        />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none" data-testid="work-stars">
        <StarsBackground count={220} className="relative w-full h-full" />
      </div>

      {/* Back to home — floats top-left over the hero */}
      <Link
        to="/"
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-widest text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" />
        Back
      </Link>

      <div className="relative z-10">
        {/* Cinematic scroll-driven hero */}
        <SmoothScrollHero
          eyebrow="The Anthology"
          title="The work, on the record."
          description="A curated archive of the builds — custom, hand-designed and AI-accelerated. Grouped into three series: Artisan, Professional, Tech. Every piece production-ready in 48 to 72 hours."
          centerImage={HERO_CENTER}
          parallaxImages={HERO_PARALLAX}
          ctaLabel="Open the Anthology"
          ctaTargetId="work-index"
        />

        {/* Blurred feather — invisible seam between the cinematic hero and the
            project index. Pulled up over the hero's tail so the backdrop-blur
            softens both the fading parallax artwork above and the vortex
            showing through below. */}
        <div
          aria-hidden
          className="relative h-40 -mt-40 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,11,11,0) 0%, rgba(11,11,11,0.4) 55%, rgba(11,11,11,0) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 40%, black 70%, transparent 100%)",
          }}
        />

        {/* Grid section — transparent so the fixed vortex + stars show through */}
        <div className="relative">
          <section
            id="work-index"
            className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32"
          >
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#f5f5dc] mb-4 block">
                The Anthology
              </span>
              <SplitTextReveal
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-white mb-4"
              >
                {PROJECTS.length} pieces, three series.
              </SplitTextReveal>
              <p className="text-white/60 max-w-2xl mx-auto mb-3">
                Each piece is a custom build — hand-designed, AI-accelerated, production-ready in 48 to 72 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#007bff] text-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Elite human design · Hyper-efficient AI delivery</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Grouped into three series. Each series has its own header
                row + grid, so the narrative reads top-to-bottom rather
                than as one flat dump of 23 tiles. */}
            {SERIES.map((series) => {
              const items = PROJECTS.filter(
                (p) => SERIES_MAP[p.brand] === series.id
              );
              if (items.length === 0) return null;
              return (
                <div
                  key={series.id}
                  data-testid={`series-${series.id}`}
                  className="mb-20 last:mb-0"
                >
                  <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#007bff] mb-2 block">
                        {series.label}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-medium text-white">
                        {items.length} pieces
                      </h3>
                    </div>
                    <p className="text-sm md:text-[15px] text-white/55 max-w-md md:text-right">
                      {series.subtitle}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {items.map((p, i) => (
                      <ProjectCard key={p.src} project={p} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: "easeOut" }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-[#121212]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#007bff]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_rgba(0,123,255,0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0b]">
        <img
          src={project.src}
          alt={`${project.brand} — ${project.category}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-[#007bff]/25 text-[#007bff] border border-[#007bff]/40 px-2.5 py-0.5 text-[10px] tracking-wide uppercase font-semibold">
          {project.category}
        </span>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-white text-lg md:text-xl font-medium mb-2 leading-tight">
          {project.brand}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        {/* Specs row — AI + tooling stack used on the build. */}
        {SPECS_MAP[project.brand] && (
          <div className="pt-4 border-t border-white/10">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 mb-1.5 block">
              Specs
            </span>
            <p className="text-[12px] leading-snug text-white/55 mb-2">
              {SPECS_MAP[project.brand]}
            </p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#007bff]">
              Velocity · 48–72h to production
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
