/**
 * Static, zero-cost faux-vortex background.
 *
 * Visually approximates the WebGL InteractiveNeuralVortex using only
 * CSS radial gradients + a single inlined SVG turbulence texture.
 * Paints once on page load and never re-renders. No rAF, no WebGL, no
 * animation frames. Safe to render on any device, including phones.
 *
 * Used as the mobile fallback for both the global page background and
 * the hero section, so mobile gets the same atmospheric look as
 * desktop at a fraction of the cost.
 *
 * Props:
 *  - withVignette: render a centre vignette so body copy stays legible
 *    (set true for the global layer under all sections, false for the
 *    hero where we want the glow fully visible behind the logo).
 */
export default function StaticVortex({ withVignette = true, className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      {/* Layer 1 — primary blue glow bloom, top-centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(0,123,255,0.28) 0%, rgba(0,60,140,0.12) 35%, rgba(11,11,11,0) 70%)",
        }}
      />
      {/* Layer 2 — secondary violet glow, lower-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 75%, rgba(80,40,200,0.18) 0%, rgba(11,11,11,0) 60%)",
        }}
      />
      {/* Layer 3 — warm tungsten accent, upper-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 80% 20%, rgba(255,160,60,0.08) 0%, rgba(11,11,11,0) 55%)",
        }}
      />
      {/* Layer 4 — SVG turbulence noise inlined as a data URI, blended
          at low opacity. This is what sells the "organic grain" look
          that plain gradients miss. */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.03  0 0 0 0 0.48  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "360px 360px",
        }}
      />
      {withVignette && (
        /* Centre vignette so body copy stays readable */
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.30) 50%, rgba(11,11,11,0.10) 100%)",
          }}
        />
      )}
    </div>
  );
}
