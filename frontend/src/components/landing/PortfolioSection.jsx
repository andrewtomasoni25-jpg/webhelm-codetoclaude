import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const portfolioItems = [
  {
    id: "ironpulse",
    title: "IronPulse Fitness",
    description: "Premium fitness club with membership management",
    category: "Fitness",
    image: "https://customer-assets.emergentagent.com/job_navigate-web-1/artifacts/wycqgjfu_IMG_0303.jpeg",
  },
  {
    id: "elitecuts",
    title: "Elite Cuts",
    description: "Luxury barbershop with online booking",
    category: "Beauty",
    image: "https://customer-assets.emergentagent.com/job_navigate-web-1/artifacts/z329hpf3_IMG_0304.jpeg",
  },
  {
    id: "urbanbites",
    title: "Urban Bites",
    description: "Restaurant with reservations system",
    category: "Food & Dining",
    image: "https://customer-assets.emergentagent.com/job_navigate-web-1/artifacts/97pl27sf_IMG_0305.jpeg",
  },
  {
    id: "luxehome",
    title: "LuxeHome Interiors",
    description: "Interior design portfolio showcase",
    category: "Design",
    image: "https://customer-assets.emergentagent.com/job_navigate-web-1/artifacts/u8vf0966_IMG_0307.jpeg",
  },
  {
    id: "greenleaf",
    title: "GreenLeaf Wellness",
    description: "Wellness platform with classes",
    category: "Health",
    image: "https://customer-assets.emergentagent.com/job_navigate-web-1/artifacts/qyf4u8uv_IMG_0308.jpeg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-24 md:py-32 relative bg-[#0b0b0b]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Our Work
          </span>
          <h2
            data-testid="portfolio-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-4"
          >
            Portfolio
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore our recent projects showcasing custom designs that drive results
          </p>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              data-testid={`portfolio-item-${item.id}`}
              className={`relative group cursor-pointer ${
                index === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-[#121212] border border-white/5 hover:border-[#007bff]/30 transition-all duration-500 ${
                  index === 0 ? "h-full min-h-[400px] lg:min-h-[500px]" : "h-[280px]"
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category Badge */}
                  <span className="inline-block w-fit px-3 py-1 mb-3 text-xs tracking-wide uppercase font-semibold rounded-full bg-[#007bff]/20 text-[#007bff] border border-[#007bff]/30">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className={`font-medium text-white mb-2 ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* View Link */}
                  <div className="flex items-center gap-2 text-[#f5f5dc] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
