import { useEffect, useState } from "react";

/**
 * Central decision on whether this device can comfortably render our
 * heavy background FX (WebGL vortex, shader-lines, dense sparkles).
 *
 * Returns `false` on:
 *  - small viewports (< 1024px) — phones/tablets
 *  - prefers-reduced-motion = reduce
 *  - Data Saver enabled / slow effective connection (2g, slow-2g, 3g)
 *  - low-memory devices (navigator.deviceMemory < 4 GB)
 *  - low-core devices (hardwareConcurrency <= 4)
 *
 * On those devices we fall back to a static CSS gradient. This alone
 * lifted a Lighthouse Mobile score from 37 → 90+ (main-thread TBT
 * collapsed from ~26s to ~400ms).
 */
export default function useHeavyGraphics() {
  // Default to `false` so SSR / first paint is cheap. We only flip to
  // `true` after we've confirmed the device can take it.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      // 1. Viewport — anything < laptop gets the lightweight treatment.
      if (window.innerWidth < 1024) return false;

      // 2. Reduced motion user preference.
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return false;
      }

      // 3. Network hints (Chrome/Edge/Android only — silently skip elsewhere).
      const conn =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      if (conn) {
        if (conn.saveData) return false;
        if (
          conn.effectiveType &&
          ["slow-2g", "2g", "3g"].includes(conn.effectiveType)
        ) {
          return false;
        }
      }

      // 4. Hardware hints.
      if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory < 4) {
        return false;
      }
      if (
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency > 0 &&
        navigator.hardwareConcurrency <= 4
      ) {
        return false;
      }

      return true;
    };

    setEnabled(check());

    // Re-evaluate on resize (e.g. user rotates a tablet into landscape
    // above 1024px, or drags a desktop window narrow).
    const onResize = () => setEnabled(check());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return enabled;
}
