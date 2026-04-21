import React from "react";
import { cn } from "@/lib/utils";

/**
 * Portfolio slider with drag-to-swipe + continuous auto-scroll.
 *
 * Behaviour:
 *  - Idle: track drifts slowly to the left (or right, if `reverse`).
 *  - User drags (mouse or touch): auto-scroll pauses, track follows finger.
 *  - Release: auto-scroll resumes from wherever the user left it.
 *  - Infinite loop: content is duplicated; offset wraps seamlessly.
 *
 * Props:
 *  - items: { src, brand, category }[]   list of portfolio entries
 *    (alternatively, pass `images: string[]` and omit brand/category)
 *  - speed: number       seconds per full loop (default 40)
 *  - reverse: bool       drift right instead of left
 *  - className: string   wrapper class override
 *  - tileClassName: string  per-tile class override (sizes/aspect)
 *
 * Accessibility:
 *  - Respects `prefers-reduced-motion: reduce` — falls back to a
 *    static wrapped grid (no animation, no drag).
 */
export const ImageAutoSlider = ({
  items,
  images,
  speed = 40,
  reverse = false,
  className,
  tileClassName,
}) => {
  // Normalise: accept either `items` (objects) or `images` (plain strings).
  const entries = React.useMemo(() => {
    if (Array.isArray(items) && items.length) return items;
    if (Array.isArray(images) && images.length) {
      return images.map((src) => ({ src, brand: "", category: "" }));
    }
    return [];
  }, [items, images]);

  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Duplicate the list — one full "cycle" of content = the N original
  // entries; the second N are there so that when the first N scroll
  // off-screen, the duplicates are already in place for a seamless wrap.
  const duplicated = React.useMemo(() => [...entries, ...entries], [entries]);

  const defaultTile =
    "w-[22rem] h-[13.5rem] md:w-[30rem] md:h-[18rem] lg:w-[36rem] lg:h-[21.5rem]";

  // Refs — all the animation state lives outside React so the rAF loop
  // never triggers a re-render.
  const trackRef = React.useRef(null);
  const offsetRef = React.useRef(0);           // current translateX (px)
  const cycleWidthRef = React.useRef(0);       // px distance of one full cycle
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);
  const isDraggingRef = React.useRef(false);
  const dragStartXRef = React.useRef(0);
  const dragStartOffsetRef = React.useRef(0);

  // -1 = drift left (default), +1 = drift right (when reverse=true).
  const direction = reverse ? 1 : -1;

  // Measure the true cycle width: the distance from the start of the
  // first tile to the start of the (N+1)-th tile (i.e. the first tile
  // of the duplicate half). This is the only wrap distance that yields
  // a visually seamless loop — scrollWidth/2 is off by half-a-gap.
  React.useEffect(() => {
    if (!trackRef.current || reducedMotion || entries.length === 0) return;
    const el = trackRef.current;

    const measure = () => {
      if (el.children.length < entries.length + 1) return;
      const a = el.children[0].getBoundingClientRect();
      const b = el.children[entries.length].getBoundingClientRect();
      cycleWidthRef.current = b.left - a.left;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [reducedMotion, entries.length, duplicated.length]);

  // The animation loop: drift when idle, hold position when dragging,
  // wrap the offset whenever it crosses a cycle boundary.
  React.useEffect(() => {
    if (reducedMotion) return;

    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const cycle = cycleWidthRef.current;

      if (!isDraggingRef.current && cycle > 0) {
        const pxPerSec = cycle / speed;
        offsetRef.current += direction * pxPerSec * dt;
      }

      // Wrap — handle both directions and any overshoot from a
      // fast drag-and-release.
      if (cycle > 0) {
        while (offsetRef.current <= -cycle) offsetRef.current += cycle;
        while (offsetRef.current > 0) offsetRef.current -= cycle;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [reducedMotion, speed, direction]);

  // Pointer handlers — one unified path for mouse, touch, and pen.
  // `touch-action: pan-y` on the track means the browser still handles
  // vertical page scroll; only horizontal gestures come to us.
  const onPointerDown = (e) => {
    if (reducedMotion) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      /* older browsers */
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + dx;
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      /* already released */
    }
  };

  // Reduced-motion fallback: static, wrapping grid (no animation, no drag).
  if (reducedMotion) {
    return (
      <div className={cn("relative w-full overflow-hidden", className)}>
        <div className="flex flex-wrap justify-center gap-4 px-6 py-6">
          {entries.map((entry, index) => (
            <PortfolioTile
              key={index}
              entry={entry}
              tileClassName={tileClassName || defaultTile}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center",
        className
      )}
    >
      <style>{`
        .webhelm-scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
        .webhelm-track {
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
        }
        .webhelm-track:active {
          cursor: grabbing;
        }
      `}</style>

      <div className="relative z-10 w-full flex items-center justify-center py-6">
        <div className="webhelm-scroll-container w-full">
          <div
            ref={trackRef}
            className="webhelm-track flex gap-6 w-max will-change-transform"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            {duplicated.map((entry, index) => (
              <PortfolioTile
                key={index}
                entry={entry}
                tileClassName={tileClassName || defaultTile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Individual portfolio tile with hover overlay showing brand + category.
 * `draggable={false}` on the image stops the native image-drag ghost
 * from hijacking the pointer during a swipe.
 */
const PortfolioTile = ({ entry, tileClassName }) => {
  const { src, brand, category } = entry;
  const altText = brand
    ? `${brand}${category ? ` — ${category}` : ""}`
    : "WebHelm project";

  return (
    <div
      className={cn(
        "group relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212]",
        "transition-transform duration-300 hover:scale-[1.03]",
        tileClassName
      )}
    >
      <img
        src={src}
        alt={altText}
        draggable={false}
        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 pointer-events-none select-none"
        loading="lazy"
      />
      {brand && (
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {category && (
            <span className="inline-block w-fit px-2.5 py-0.5 mb-2 text-[9px] md:text-[10px] tracking-wide uppercase font-semibold rounded-full bg-[#007bff]/25 text-[#007bff] border border-[#007bff]/40">
              {category}
            </span>
          )}
          <h3 className="text-white text-base md:text-lg font-medium leading-tight">
            {brand}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ImageAutoSlider;
