"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight CSS-only twinkling stars background.
 * Parent must be position: relative. Pointer-events disabled.
 */
export function StarsBackground({
  className,
  count = 140,
  color = "#ffffff",
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    [count]
  );

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <style>{`
        @keyframes wh-star-twinkle {
          0%, 100% { opacity: var(--wh-star-min, 0.15); }
          50%      { opacity: var(--wh-star-max, 1); }
        }
      `}</style>
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow: `0 0 ${s.size * 2}px ${color}`,
            animation: `wh-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            "--wh-star-min": `${s.opacity * 0.2}`,
            "--wh-star-max": `${s.opacity}`,
          }}
        />
      ))}
    </div>
  );
}

export default StarsBackground;
