"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Decorative lamp effect — renders glowing cones from the top of the parent.
 * Parent must be position: relative + overflow-hidden.
 * Place INSIDE a section, before its content. Pointer events disabled.
 */
export function LampEffect({ className, bgColor = "#0b0b0b", primary = "#007bff" }) {
  return (
    <div
      className={cn(
        "absolute top-0 inset-x-0 isolate z-0 flex w-full items-start justify-center pointer-events-none",
        className
      )}
    >
      <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

      {/* Main glow */}
      <div
        className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full opacity-80 blur-3xl"
        style={{ backgroundColor: `${primary}99` }}
      />

      {/* Lamp orb */}
      <motion.div
        initial={{ width: "8rem" }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
        whileInView={{ width: "16rem" }}
        className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full blur-2xl"
        style={{ backgroundColor: `${primary}99` }}
      />

      {/* Top line */}
      <motion.div
        initial={{ width: "15rem" }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
        whileInView={{ width: "30rem" }}
        className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%]"
        style={{ backgroundColor: `${primary}99` }}
      />

      {/* Left cone */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          backgroundImage: `conic-gradient(from 70deg at center top, ${primary}99, transparent, transparent)`,
        }}
        className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
      >
        <div
          className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
          style={{ backgroundColor: bgColor }}
        />
        <div
          className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
          style={{ backgroundColor: bgColor }}
        />
      </motion.div>

      {/* Right cone */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${primary}99)`,
        }}
        className="absolute inset-auto left-1/2 h-56 w-[30rem]"
      >
        <div
          className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
          style={{ backgroundColor: bgColor }}
        />
        <div
          className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
          style={{ backgroundColor: bgColor }}
        />
      </motion.div>
    </div>
  );
}

export default LampEffect;
