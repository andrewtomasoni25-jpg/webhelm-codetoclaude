import { useEffect, useRef, useState } from "react";

/**
 * Floating ornament — page-wide, fixed-position background image.
 *
 * Sits fixed to the viewport behind all content, rotating slowly
 * clockwise. Originally built for the compass; now parametrised so
 * the same component can drive any nautical mark (hero helm, compass,
 * etc.) tied to any set of sections.
 *
 * Behaviour depends on `mode`:
 *   - "hide-when-visible" (default): ornament shows everywhere EXCEPT
 *     when any target is in view. Use this to suppress the ornament
 *     over sections that carry their own visual rhythm.
 *   - "show-when-visible": ornament is hidden by default and ONLY
 *     appears when a target is in view. Use this to restrict the
 *     ornament to one or more showcase sections.
 *
 * `targetSelector` accepts a standard CSS selector list
 * (e.g. "#a, #b, #c"). Any selector valid in querySelectorAll works.
 *
 * ## Lazy-loaded targets
 *
 * Many of the sections this component targets (Services, Toolkit,
 * etc.) are React.lazy-loaded behind Suspense boundaries, so on first
 * mount their DOM nodes simply do not exist yet. Querying for them
 * at useEffect time finds nothing and the IntersectionObserver has
 * nothing to attach to — the ornament's visibility never updates
 * until a re-render forces a retry. Left unfixed this produces the
 * exact bug we saw: compass only appeared after scrolling down to
 * the Anthology and back, because that round trip forced the lazy
 * chunk to mount and a later observer hook happened to catch it.
 *
 * Fix: pair the IntersectionObserver with a MutationObserver that
 * watches the document for subtree changes and re-runs the selector
 * whenever the DOM expands. New matches are handed to the IO and
 * tracked in `observedRef` so we never double-observe.
 *
 * GPU-composited (transform + opacity only) → zero main-thread cost.
 * Pure CSS animation → survives page jank.
 */
export default function FloatingCompass({
  imageSrc = "/about/compass.webp",
  targetSelector = "#portfolio",
  rotationSeconds = 240,
  mode = "hide-when-visible",
  // Default opacity tuning — overridable per instance. Mobile uses
  // the smaller value so the ornament sits quieter on phones.
  opacityMobile = 0.07,
  opacityDesktop = 0.09,
  sizeMobile = "min(85vw, 640px)",
  sizeDesktop = "min(55vw, 760px)",
  testId = "floating-compass",
}) {
  // In show-when-visible mode the ornament starts hidden and only
  // appears once a target intersects.
  const [hidden, setHidden] = useState(mode === "show-when-visible");
  const ioRef = useRef(null);
  const moRef = useRef(null);
  const activeTargetsRef = useRef(new Set());
  const observedRef = useRef(new Set());
  // Unique class/animation names so two instances (compass + helm)
  // don't stomp each other's CSS.
  const uidRef = useRef(
    `wh-fo-${Math.random().toString(36).slice(2, 8)}`
  );
  const uid = uidRef.current;

  useEffect(() => {
    if (typeof window === "undefined") return;

    activeTargetsRef.current = new Set();
    observedRef.current = new Set();

    ioRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeTargetsRef.current.add(entry.target);
          } else {
            activeTargetsRef.current.delete(entry.target);
          }
        }
        const anyVisible = activeTargetsRef.current.size > 0;
        setHidden(mode === "show-when-visible" ? !anyVisible : anyVisible);
      },
      { threshold: 0 }
    );

    // Attach the IO to every matching element we haven't seen before.
    // Called both on mount and again whenever the DOM changes so
    // lazy-loaded sections get picked up as soon as they render.
    const attachNewMatches = () => {
      const targets = document.querySelectorAll(targetSelector);
      for (const t of targets) {
        if (!observedRef.current.has(t)) {
          ioRef.current.observe(t);
          observedRef.current.add(t);
        }
      }
    };

    attachNewMatches();

    // Watch the whole document for additions. Suspense boundaries
    // resolve asynchronously — this catches the resulting DOM
    // mutations and wires them in. `childList + subtree` is
    // enough; we don't care about attribute or text changes.
    moRef.current = new MutationObserver(() => attachNewMatches());
    moRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (ioRef.current) ioRef.current.disconnect();
      if (moRef.current) moRef.current.disconnect();
      activeTargetsRef.current.clear();
      observedRef.current.clear();
    };
  }, [targetSelector, mode]);

  return (
    <>
      <style>{`
        @keyframes ${uid}-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .${uid} {
          position: absolute;
          left: 50%;
          top: 50%;
          width: ${sizeMobile};
          height: ${sizeMobile};
          max-width: none;
          object-fit: contain;
          transform: translate(-50%, -50%);
          animation: ${uid}-spin ${rotationSeconds}s linear infinite;
          will-change: transform, opacity;
          opacity: ${opacityMobile};
          pointer-events: none;
          user-select: none;
          transition: opacity 600ms ease;
        }
        @media (min-width: 768px) {
          .${uid} {
            width: ${sizeDesktop};
            height: ${sizeDesktop};
            opacity: ${opacityDesktop};
          }
        }
        .${uid}.is-hidden { opacity: 0; }
        @media (prefers-reduced-motion: reduce) {
          .${uid} { animation: none; }
        }
      `}</style>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        data-testid={testId}
      >
        <img
          src={imageSrc}
          alt=""
          className={`${uid} ${hidden ? "is-hidden" : ""}`}
          decoding="async"
          loading="lazy"
          width="1000"
          height="1000"
        />
      </div>
    </>
  );
}
