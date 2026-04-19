import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children, contentClassName }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.05, 1];
  };

  const rotate = useTransform(smoothProgress, [0.1, 0.55], [20, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.55], scaleDimensions());
  const translate = useTransform(smoothProgress, [0.1, 0.55], [0, -60]);

  return (
    <div
      className="h-[50rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-20 w-full relative"
        style={{ perspective: "1200px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} contentClassName={contentClassName}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children, contentClassName }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[28rem] md:h-[38rem] w-full border-4 border-[#6C6C6C] p-1 md:p-2 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className={`h-full w-full overflow-hidden rounded-[24px] bg-[#0b0b0b] ${contentClassName || ""}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default ContainerScroll;
