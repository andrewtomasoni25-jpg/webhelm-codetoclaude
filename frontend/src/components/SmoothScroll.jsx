import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in a Lenis smooth-scroll instance.
 * One global instance — do not nest.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — snappier, natural
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.3,
      touchMultiplier: 1.5,
    });

    // Expose for debugging / section scrolls
    window.__lenis = lenis;

    // Patch anchor clicks so href="#foo" uses Lenis
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
