import React from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal image slider.
 *
 * Props:
 *  - items: { src, brand, category }[]   list of portfolio entries
 *    (alternatively, pass `images: string[]` and omit brand/category)
 *  - speed: number       seconds per full loop (default 40)
 *  - reverse: bool       scroll right instead of left
 *  - className: string   wrapper class override
 *  - tileClassName: string  per-tile class override (sizes/aspect)
 *
 * Accessibility:
 *  - Respects `prefers-reduced-motion: reduce` — falls back to a static wrapped grid
 *  - Hover pauses the animation
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

  // Duplicate the list for a seamless -50% translate loop.
  const duplicated = React.useMemo(() => [...entries, ...entries], [entries]);
  const durationStyle = {
    animationDuration: `${speed}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  const defaultTile =
    "w-[22rem] h-[13.5rem] md:w-[30rem] md:h-[18rem] lg:w-[36rem] lg:h-[21.5rem]";

  // Reduced-motion fallback: static, wrapping grid (no scroll animation).
  if (reducedMotion) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden",
          className
        )}
      >
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
    <>
      <style>{`
        @keyframes webhelm-scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .webhelm-infinite-scroll {
          animation-name: webhelm-scroll-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
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
        .webhelm-scroll-container:hover .webhelm-infinite-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={cn(
          "relative w-full overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <div className="relative z-10 w-full flex items-center justify-center py-6">
          <div className="webhelm-scroll-container w-full">
            <div
              className="webhelm-infinite-scroll flex gap-6 w-max"
              style={durationStyle}
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
    </>
  );
};

/**
 * Individual portfolio tile with hover overlay showing brand + category.
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
        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
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
