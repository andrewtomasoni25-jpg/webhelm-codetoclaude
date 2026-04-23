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
 * Note on `prefers-reduced-motion`: we intentionally do NOT honour it
 * here. The auto-drift IS the feature — skipping it leaves a static
 * gallery that most users mistake for "broken". Users who need reduced
 * motion can still scroll past the section, and the rest of the site
 * already ignores the preference (neural vortex, star field, split-
 * text reveals), so this is consistent with existing behaviour.
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

  // Duplicate the list — one full "cycle" of content = the N original
  // entries; the second N are there so that when the first N scroll
  // off-screen, the duplicates are already in place for a seamless wrap.
  const duplicated = React.useMemo(() => [...entries, ...entries], [entries]);

  const defaultTile =
    "w-[22rem] h-[13.5rem] md:w-[30rem] md:h-[18rem] lg:w-[36rem] lg:h-[21.5rem]";

  // Refs — all the animation state lives outside React so the rAF loop
  // never triggers a re-render.
  const containerRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const offsetRef = React.useRef(0);           // current translateX (px)
  const cycleWidthRef = React.useRef(0);       // px distance of one full cycle
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);
  const isDraggingRef = React.useRef(false);
  const dragStartXRef = React.useRef(0);
  const dragStartOffsetRef = React.useRef(0);
  // Gate the rAF loop: run only when the slider is on-screen AND the
  // tab is visible. On mobile this is the single biggest source of
  // Anthology scroll-in lag — without it the loop burns frames at 60fps
  // even while the user is reading Hero/Services, so the scroll frame
  // where the section first reveals is already behind on its budget.
  const isVisibleRef = React.useRef(false);
  const isPageVisibleRef = React.useRef(
    typeof document === "undefined" ? true : !document.hidden
  );

  // -1 = drift left (default), +1 = drift right (when reverse=true).
  const direction = reverse ? 1 : -1;

  // Measure the true cycle width: the distance from the start of the
  // first tile to the start of the (N+1)-th tile (i.e. the first tile
  // of the duplicate half). This is the only wrap distance that yields
  // a visually seamless loop — scrollWidth/2 is off by half-a-gap.
  React.useEffect(() => {
    if (!trackRef.current || entries.length === 0) return;
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
  }, [entries.length, duplicated.length]);

  // The animation loop: drift when idle, hold position when dragging,
  // wrap the offset whenever it crosses a cycle boundary. Only runs
  // while the slider is on-screen and the tab is visible — see
  // isVisibleRef/isPageVisibleRef setup above.
  React.useEffect(() => {
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

    const start = () => {
      if (rafRef.current != null) return;        // already running
      lastTsRef.current = null;                   // avoid a huge dt jump
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
    };

    // Single source of truth: run iff visible in viewport AND page is
    // foregrounded. Both flags are flipped by the observers below.
    const sync = () => {
      if (isVisibleRef.current && isPageVisibleRef.current) start();
      else stop();
    };

    // Watch the container — not the track — because the track has
    // `w-max` and extends far beyond the viewport; IO would consider
    // it intersecting long before the user can see the section.
    const containerEl = containerRef.current;
    let io;
    if (containerEl && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            isVisibleRef.current = e.isIntersecting;
          }
          sync();
        },
        // Give the loop a head start ~200px before the section enters
        // so the first visible frame is already drifting, not static.
        { rootMargin: "200px 0px" }
      );
      io.observe(containerEl);
    } else {
      // Fallback: assume visible (desktop without IO support is ancient).
      isVisibleRef.current = true;
    }

    const onVis = () => {
      isPageVisibleRef.current = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    sync();
    return () => {
      stop();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [speed, direction]);

  // Native touch events for iOS Safari reliability.
  //   - pointerdown/move on iOS fire through `pointer-events-none` children
  //     inconsistently, and iOS cancels pointers the moment it thinks a
  //     gesture is "vertical scroll" — even when touch-action says otherwise.
  //   - Native touch events with `{ passive: false }` give us the one thing
  //     pointer events can't: the ability to preventDefault() the page's
  //     scroll once we've committed to a horizontal drag.
  //   - We detect direction after an 8-px threshold so a vertical fling
  //     across the slider still scrolls the page naturally.
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartOffset = 0;
    let touchActive = false;
    let directionLocked = null; // 'h' | 'v' | null

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchActive = true;
      directionLocked = null;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartOffset = offsetRef.current;
    };

    const onTouchMove = (e) => {
      if (!touchActive || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;

      if (directionLocked == null) {
        // Wait until the user has moved at least 8px before committing,
        // so tiny jitter during a vertical scroll doesn't hijack the page.
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        directionLocked = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        if (directionLocked === "h") {
          isDraggingRef.current = true;
        }
      }

      if (directionLocked === "h") {
        // Kill the browser's default behaviour — this is our gesture now.
        // Must be `{ passive: false }` listener for preventDefault to work.
        e.preventDefault();
        offsetRef.current = touchStartOffset + dx;
      }
      // directionLocked === 'v' → do nothing, browser scrolls the page.
    };

    const onTouchEnd = () => {
      touchActive = false;
      directionLocked = null;
      isDraggingRef.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  // Mouse drag for desktop — native touch handler above owns all touch input.
  // We only fire this path for a real mouse so we don't double-process on
  // devices that synthesise both touch and mouse events (older Android etc).
  const onMouseDown = (e) => {
    // Ignore right/middle clicks
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;

    const onMove = (ev) => {
      if (!isDraggingRef.current) return;
      const dx = ev.clientX - dragStartXRef.current;
      offsetRef.current = dragStartOffsetRef.current + dx;
    };
    const onUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={containerRef}
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
        /* touch-action: pan-y lets the browser keep handling vertical
           page scroll; any horizontal gesture falls through to our
           native touchmove handler (which calls preventDefault).
           Applying it to every descendant is critical on iOS Safari:
           otherwise a touch that starts on a tile (not the track
           itself) inherits the default touch-action and iOS routes
           the gesture unpredictably. */
        .webhelm-track,
        .webhelm-track * {
          touch-action: pan-y;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        .webhelm-track {
          cursor: grab;
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
            onMouseDown={onMouseDown}
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
        decoding="async"
        fetchpriority="low"
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
