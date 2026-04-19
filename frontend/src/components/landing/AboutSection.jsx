import { Users, Lightbulb, Award } from "lucide-react";
import { motion } from "framer-motion";
import SplitTextReveal from "@/components/SplitTextReveal";

const stats = [
  { id: "satisfaction", value: "98%", label: "Client Satisfaction" },
  { id: "ontime", value: "100%", label: "On-Time Delivery" },
  { id: "years", value: "2", label: "Years Experience" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Crafting Digital Experiences <br />
            <span className="text-4xl md:text-[4.5rem] font-bold mt-1 leading-none bg-gradient-to-r from-[#007bff] via-[#f5f5dc] to-[#007bff] bg-clip-text text-transparent">
              That Drive Results
            </span>
          </h2>
        </motion.div>

        {/* Main art image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <img
            src="/about/webhelm-art.webp"
            alt="WebHelm — crafting websites that drive results"
            className="w-full h-auto rounded-[2rem] border border-white/10 shadow-2xl"
            draggable={false}
          />
        </motion.div>

        {/* Content block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <SplitTextReveal
            as="h3"
            data-testid="about-title"
            className="text-2xl sm:text-3xl tracking-tight font-medium text-white mb-6"
          >
            Modern Web Design, Powered by AI
          </SplitTextReveal>
          <p className="text-base leading-relaxed text-white/70 mb-6">
            At WebHelm, we combine creative design expertise with cutting-edge
            AI tools to deliver websites faster and smarter than traditional
            agencies. Our AI-enhanced workflow means better designs, quicker
            turnarounds, and results that actually move the needle for your
            business.
          </p>
          <p className="text-base leading-relaxed text-white/70 mb-10">
            Founded with a simple mission: to make professional web design
            accessible to businesses of all sizes. What sets us apart is our
            embrace of AI technology — from intelligent layout generation to
            automated performance optimisation — giving you an unfair
            advantage over competitors still doing things the old way.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#007bff]" />
              </div>
              <span className="text-white/80 text-sm font-medium">
                Client-First
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#007bff]" />
              </div>
              <span className="text-white/80 text-sm font-medium">
                Innovative
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#007bff]" />
              </div>
              <span className="text-white/80 text-sm font-medium">
                Quality-Driven
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.id} data-testid={`stat-${stat.id}`}>
                <p className="text-3xl font-light text-[#007bff]">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
