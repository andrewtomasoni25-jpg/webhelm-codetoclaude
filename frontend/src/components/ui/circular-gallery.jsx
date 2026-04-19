import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

const CircularGallery = React.forwardRef(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      renderItem,
      cardClassName,
      ...props
    },
    ref
  ) => {
    const [rotation, setRotation] = useState(0);
    const animationFrameRef = useRef(null);
    const isDragging = useRef(false);
    const lastX = useRef(0);
    const containerRef = useRef(null);

    // Auto-rotate
    useEffect(() => {
      const autoRotate = () => {
        if (!isDragging.current) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    // Drag-to-rotate
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const onPointerDown = (e) => {
        isDragging.current = true;
        lastX.current = e.clientX;
      };
      const onPointerMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastX.current;
        setRotation((prev) => prev + dx * 0.3);
        lastX.current = e.clientX;
      };
      const onPointerUp = () => {
        isDragging.current = false;
      };

      el.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);

      return () => {
        el.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }, []);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none",
          className
        )}
        style={{ perspective: "2000px", height: "720px" }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.id}
                role="group"
                aria-label={item.title}
                // Cards sized generously so pricing content (badge, title,
                // price, 4 features, CTA) all fits with breathing room at the
                // 0.88 zoom applied by PricingSection. Negative margins are
                // half the card dimensions at each breakpoint so the card
                // stays perfectly centred on its 3D ring pivot.
                className="absolute w-[360px] h-[300px] md:w-[460px] md:h-[360px] -ml-[180px] md:-ml-[230px] -mt-[150px] md:-mt-[180px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div
                  // Solid card fill at 90% opacity — reads as a proper tile,
                  // not glass. backdrop-blur removed because the blur is what
                  // was letting the vortex bleed through visually.
                  className={cn("relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/10 bg-[#121212]", cardClassName)}
                  style={{ opacity: 0.9 }}
                >
                  {renderItem ? (
                    renderItem(item, i)
                  ) : (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-full p-5">
                        <span className="inline-block w-fit px-3 py-1 mb-2 text-[10px] tracking-wide uppercase font-semibold rounded-full bg-[#007bff]/20 text-[#007bff] border border-[#007bff]/30">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-medium text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-xs line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
export default CircularGallery;
