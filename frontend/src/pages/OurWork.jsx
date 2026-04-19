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
          eyebrow="Our Work"
          title="Every project, up close."
          description="A curated index of recent builds — landing pages, full websites and brand systems. Every project shipped to a real client, measured on real outcomes."
          centerImage={HERO_CENTER}
          parallaxImages={HERO_PARALLAX}
          ctaLabel="See the full index"
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
                Project Index
              </span>
              <SplitTextReveal
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-white mb-4"
              >
                Every Project, In One Place
              </SplitTextReveal>
              <p className="text-white/60 max-w-2xl mx-auto mb-3">
                {PROJECTS.length} recent builds — each one crafted custom, enhanced with AI tooling, and polished by hand.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#007bff] text-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">AI-Enhanced Design & Development</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.src} project={p} index={i} />
              ))}
            </div>
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
        <p className="text-white/65 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
