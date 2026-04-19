import { motion } from "framer-motion";

/**
 * Animates a heading word-by-word on scroll into view.
 * Accessible: aria-label holds the full string so screen readers
 * read the heading once, not word-by-word.
 *
 * <SplitTextReveal as="h2" className="...">
 *   Our Services
 * </SplitTextReveal>
 */
export default function SplitTextReveal({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 0.08,
  duration = 0.7,
  delay = 0,
  once = true,
  ...rest
}) {
  const text = typeof children === "string" ? children : String(children ?? "");
  const words = text.split(" ");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      {...rest}
      aria-label={text}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em" }}
        >
          <motion.span
            variants={word}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
