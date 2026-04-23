import React from "react";
import { cn } from "@/lib/utils";

/**
 * Portfolio slider with drag-to-swipe + continuous auto-scroll.
 *
 * Behaviour:
 *  - Idle: track drifts slowly via a CSS @keyframes animation running
 *    on the compositor thread — stays buttery even while the main
 *    thread is busy (scroll, paint, etc).
 *  - User drags (mouse or touch): animation pauses, track follows
 *    finger via inline transform.
 *  - Release: animation resumes from wherever the user left it by
 *    computing the equivalent `animation-delay` (negative delay =
 *    "start the animation already X seconds in").
 *  - Infinite loop: content is duplicated and the keyframe endpoint
 *    is exactly one cycle width (measured in JS, fed into CSS via a
 *    custom property), so the duplicate slides into the seam seamlessly.
 *
 * ## Why CSS animation + JS drag, not rAF
 *
 * Previously the drift ran on a JS rAF loop that wrote `transform`
 * every frame. That approach can keep 60fps in isolation, but on
 * mobile the main thread is continually busy during the user's
 * scroll (scroll handling, paint for the vortex/starfield, layout
 * for sibling sections via content-visibility). The rAF callback
 * competes with all of that and you see the result as marquee jank
 * during scroll-in.
 *
 * A CSS @keyframes animation is handled by the browser's compositor
 * thread — completely independent of main-thread work. The marquee
 * keeps drifting at device-refresh rate even when JS is backed up.
 * This is the single biggest smoothness win for this section.
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

  const containerRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const cycleWidthRef = React.useRef(0);
  const isDraggingRef = React.useRef(false);

  // Unique animation name per instance so two sliders on a page never
  // stomp each other's @keyframes.
  const uidRef = React.useRef(
    `wh-marq-${Math.random().toString(36).slice(2, 8)}`
  );
  const uid = uidRef.current;

  const animDirection = reverse ? 1 : -1;

  // Measure cycle width — distance from the start of the first tile
  // to the start of the (N+1)-th (first duplicate). This is the only
  // value that produces a visually seamless wrap: scrollWidth/2 is
  // off by half a gap.
  //
  // We feed the measured value into the stylesheet as a CSS custom
  // property (`--cycle-width`), which the @keyframes rule references
  // via calc() — so the animation's wrap distance is always exact,
  // even as the viewport resizes.
  React.useEffect(() => {
    if (!trackRef.current || entries.length === 0) return;
    const el = trackRef.current;

    const measure = () => {
      if (el.children.length < entries.length + 1) return;
      const a = el.children[0].getBoundingClientRect();
      const b = el.children[entries.length].getBoundingClientRect();
      const width = b.left - a.left;
      if (width > 0) {
        cycleWidthRef.current = width;
        el.style.setProperty("--cycle-width", `${width}px`);
      }
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

  // Pause the CSS animation on leave / tab hide. Because the animation
  // lives on the compositor, this is essentially free — there's no
  // ticking rAF loop to stop. But it's still polite on battery and
  // matches the old rAF gate semantics exactly.
  React.useEffect(() => {
    const el = trackRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    let inView = false;
    let pageVisible =
      typeof document === "undefined" ? true : !document.hidden;

    const apply = () => {
      if (isDraggingRef.current) return; // drag owns play-state during swipe
      el.style.animationPlayState =
        inView && pageVisible ? "running" : "paused";
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) inView = e.isIntersecting;
              apply();
            },
            { rootMargin: "200px 0px" }
          )
        : null;
    if (io) io.observe(container);
    else inView = true;

    const onVis = () => {
      pageVisible = !document.hidden;
      apply();
    };
    document.addEventListener("visibilitychange", onVis);

    apply();
    return () => {
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Parse the current computed translateX off the track. Used at drag
  // start to snapshot where the compositor animation has drifted to,
  // and at drag end to compute the resume position.
  const readTranslateX = (el) => {
    const t = window.getComputedStyle(el).transform;
    if (!t || t === "none") return 0;
    const match = t.match(/matrix\(([^)]+)\)/);
    if (!match) {
      const match3d = t.match(/matrix3d\(([^)]+)\)/);
      if (!match3d) return 0;
      const parts3d = match3d[1].split(",").map((s) => parseFloat(s));
      return parts3d[12] || 0;
    }
    const parts = match[1].split(",").map((s) => parseFloat(s));
    return parts[4] || 0;
  };

  // Swap the track into "user-driven" mode: pause the CSS animation,
  // freeze visually at the current translateX via inline transform,
  // return that translateX so the caller can accumulate drag deltas.
  const beginDrag = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const tx = readTranslateX(el);
    isDraggingRef.current = true;
    el.style.animationPlayState = "paused";
    el.style.transform = `translate3d(${tx}px, 0, 0)`;
    return tx;
  };

  const updateDrag = (tx) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${tx}px, 0, 0)`;
  };

  // Swap the track back into "compositor-driven" mode by computing
  // where the animation would already be at this visual position,
  // setting that as a negative animation-delay, and un-pausing.
  //
  // The animation-name flush (`none` + forced reflow + restore) is
  // necessary because browsers don't re-evaluate animation-delay on
  // an already-running animation — you have to restart it.
  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = false;

    const cycle = cycleWidthRef.current;
    if (cycle <= 0) {
      el.style.transform = "";
      el.style.animationPlayState = "running";
      return;
    }

    let finalTx = readTranslateX(el);
    // Normalise into [-cycle, 0] so the progress value is always in
    // [0, 1] regardless of how far the user dragged.
    while (finalTx <= -cycle) finalTx += cycle;
    while (finalTx > 0) finalTx -= cycle;

    // Progress = how far through one loop we are visually.
    // For a leftward (direction = -1) animation, translateX goes
    // 0 → -cycle over `speed` seconds, so progress = -finalTx / cycle.
    // For a rightward (direction = +1) animation, it's the inverse.
    const progressLeftward = -finalTx / cycle;
    const progress =
      animDirection === -1 ? progressLeftward : 1 - progressLeftward;
    const delay = -(progress * speed);

    el.style.transform = "";
    el.style.animationName = "none";
    // Force a reflow so the "animation: none" actually lands before we
    // re-assign the real name — otherwise the delay change is ignored.
    // eslint-disable-next-line no-unused-expressions
    el.offsetWidth;
    el.style.animationName = `${uid}-scroll`;
    el.style.animationDelay = `${delay}s`;
    el.style.animationPlayState = "running";
  };

  // --- Touch (iOS Safari) ---
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startOffset = 0;
    let touchActive = false;
    let directionLocked = null; // 'h' | 'v' | null

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchActive = true;
      directionLocked = null;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      // Snapshot the visual offset so drag deltas accumulate correctly.
      startOffset = beginDrag();
    };

    const onTouchMove = (e) => {
      if (!touchActive || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (directionLocked == null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        directionLocked = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        if (directionLocked === "v") {
          // User wants to scroll the page vertically — hand control
          // back to the browser and resume the marquee.
          endDrag();
        }
      }

      if (directionLocked === "h") {
        e.preventDefault();
        updateDrag(startOffset + dx);
      }
    };

    const onTouchEnd = () => {
      if (!touchActive) return;
      touchActive = false;
      if (directionLocked === "h") endDrag();
      directionLocked = null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, animDirection]);

  // --- Mouse drag (desktop) ---
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startOffset = beginDrag();

    const onMove = (ev) => {
      updateDrag(startOffset + (ev.clientX - startX));
    };
    const onUp = () => {
      endDrag();
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
        /* Per-instance @keyframes so multiple sliders on one page
           can't clash. Endpoint is read from the --cycle-width custom
           property that JS sets after measuring. */
        @keyframes ${uid}-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(calc(${animDirection} * var(--cycle-width, 0px)), 0, 0); }
        }
        .${uid}-track {
          animation: ${uid}-scroll ${speed}s linear infinite;
          /* contain: layout paint isolates the big track from the rest
             of the page's paint work — when the track's frame updates,
             the browser doesn't need to re-examine the section around
             it. Meaningful on mobile where paint is the bottleneck. */
          contain: layout paint;
          will-change: transform;
          backface-visibility: hidden;
        }
        /* Mask gradient forces a full raster layer on mobile Safari
           and repaints it on every scroll frame — one of the biggest
           contributors to reveal lag here. On desktop the mask gives
           a cleaner edge fade, so we keep it; on mobile we drop it
           entirely (the overflow crop is enough). */
        @media (min-width: 768px) {
          .${uid}-mask {
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
        }
        /* touch-action: pan-y lets the browser keep handling vertical
           page scroll; any horizontal gesture falls through to our
           native touchmove handler (which calls preventDefault).
           Applying it to every descendant is critical on iOS Safari:
           otherwise a touch that starts on a tile (not the track
           itself) inherits the default touch-action and iOS routes
           the gesture unpredictably. */
        .${uid}-track,
        .${uid}-track * {
          touch-action: pan-y;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
        .${uid}-track { cursor: grab; }
        .${uid}-track:active { cursor: grabbing; }
      `}</style>

      <div className="relative z-10 w-full flex items-center justify-center py-6">
        <div className={`${uid}-mask w-full`}>
          <div
            ref={trackRef}
            className={`${uid}-track flex gap-6 w-max`}
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
        // Mobile: no shadow-2xl (heavy paint), no hover scale (unreachable
        // on touch, but the transition-transform still primes a compositor
        // layer per tile — 24 layers adds up on a phone GPU).
        // Desktop keeps the original look.
        "group relative flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-[#121212]",
        "md:shadow-2xl md:transition-transform md:duration-300 md:hover:scale-[1.03]",
        tileClassName
      )}
    >
      <img
        src={src}
        alt={altText}
        draggable={false}
        className="w-full h-full object-cover md:transition-all md:duration-500 md:group-hover:brightness-110 pointer-events-none select-none"
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
