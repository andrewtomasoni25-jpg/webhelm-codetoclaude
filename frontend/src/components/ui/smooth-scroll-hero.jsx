"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Scroll-driven cinematic hero — mirrors the original `modern-hero.tsx`
 * SpaceX prompt behaviour, adapted for WebHelm:
 *
 *  1. On page load the boat is framed cleanly in the centre (clip-path window)
 *     with the WebHelm title + CTA overlay pinned on top.
 *  2. As the user scrolls, the clip-path window opens outward while the
 *     background image zooms from 170% → 100% — creating the signature
 *     "zoom in / reveal" feel.
 *  3. Once the boat has fully expanded it fades out and the parallax rail of
 *     supporting dark images drifts past.
 *  4. After the hero consumes its scroll height, the project index grid
 *     underneath takes over.
 */

const SECTION_HEIGHT = 1500;

export function SmoothScrollHero({
  eyebrow = "Our Work",
  title = "A look behind every project we ship.",
  description = "Scroll to explore the brands, landings and systems we've crafted. Each design is AI-enhanced, hand-polished, and measured on real business outcomes.",
  centerImage,
  parallaxImages = [],
  ctaLabel = "See the index",
  ctaTargetId = "work-index",
}) {
  const scrollToIndex = () => {
    const el = document.getElementById(ctaTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-transparent">
      {/* The primary CTA inside the hero is the blue "See the full index"
          button — a second top-right jump-link would duplicate it, so it's
          been removed to keep the frame clean. */}

      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        centerImage={centerImage}
        parallaxImages={parallaxImages}
        ctaLabel={ctaLabel}
        onCta={scrollToIndex}
      />
    </div>
  );
}

function Hero({ eyebrow, title, description, centerImage, parallaxImages, ctaLabel, onCta }) {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage
        src={centerImage}
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctaLabel={ctaLabel}
        onCta={onCta}
      />
      <ParallaxImages images={parallaxImages} />
      {/* No solid-black feather here anymore — the page's fixed vortex needs
          to stay continuous across the hero→grid boundary. The blurred
          bridge lives in OurWork.jsx so the transition can blur both layers. */}
    </div>
  );
}

function CenterImage({ src, eyebrow, title, description, ctaLabel, onCta }) {
  const { scrollY } = useScroll();

  // Clip-path window opens outward as the user scrolls — the signature
  // "reveal" from the original SpaceX prompt.
  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [25, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  // Background zooms from 170% → 100% to create the "zoom in" motion while
  // the clip-path frame expands around it.
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  // After the zoom completes, fade the whole boat layer out to hand off to
  // the parallax rail + project grid.
  const imageOpacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  // Title overlay fades first so the artwork gets its solo "zoom" moment.
  const overlayOpacity = useTransform(
    scrollY,
    [0, SECTION_HEIGHT * 0.5],
    [1, 0]
  );
  const overlayY = useTransform(
    scrollY,
    [0, SECTION_HEIGHT * 0.5],
    [0, -40]
  );

  return (
    <>
      {/* Centre artwork — boat frames cleanly through the clip-path window,
          then zooms + fades as the user scrolls. */}
      <motion.div
        className="sticky top-0 h-screen w-full"
        style={{
          clipPath,
          backgroundSize,
          opacity: imageOpacity,
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Title overlay — pinned on top of the boat frame */}
      <motion.div
        className="pointer-events-none sticky top-0 -mt-[100vh] flex h-screen items-center justify-center px-6"
        style={{ opacity: overlayOpacity, y: overlayY }}
      >
        <div className="pointer-events-auto max-w-3xl text-center">
          <span className="mb-4 block text-xs uppercase tracking-[0.35em] font-bold text-[#f5f5dc]">
            {eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm md:text-base text-white/85 drop-shadow">
            {description}
          </p>
          <button
            onClick={onCta}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#007bff] px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(0,123,255,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[#0056b3]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/40">
            Scroll to zoom in
          </p>
        </div>
      </motion.div>
    </>
  );
}

function ParallaxImages({ images }) {
  // Each slot has its own start/end offsets + width/positioning to feel composed.
  const slots = [
    { start: -200, end: 200, className: "w-1/3" },
    { start: 200, end: -250, className: "mx-auto w-2/3" },
    { start: -200, end: 200, className: "ml-auto w-1/3" },
    { start: 0, end: -500, className: "ml-24 w-5/12" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {images.map((img, i) => {
        const slot = slots[i % slots.length];
        return (
          <ParallaxImg
            key={i}
            src={img.src}
            alt={img.alt || `WebHelm project ${i + 1}`}
            start={slot.start}
            end={slot.end}
            className={slot.className}
          />
        );
      })}
    </div>
  );
}

function ParallaxImg({ className, alt, src, start, end }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      className={`mb-8 rounded-xl border border-white/10 shadow-2xl ${className || ""}`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
}

export default SmoothScrollHero;
