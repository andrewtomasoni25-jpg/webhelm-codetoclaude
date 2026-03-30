import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: "ironfit",
    title: "IronFit Gym",
    description: "Responsive fitness website with membership management",
    category: "Fitness",
    image: "https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "elitecuts",
    title: "Elite Cuts",
    description: "Modern barber shop website with online booking",
    category: "Beauty",
    image: "https://images.pexels.com/photos/19664875/pexels-photo-19664875.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "urbanbites",
    title: "Urban Bites",
    description: "Restaurant website with online ordering system",
    category: "Food & Dining",
    image: "https://images.pexels.com/photos/29106106/pexels-photo-29106106.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Our Work
          </span>
          <h2
            data-testid="portfolio-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Portfolio
          </h2>
        </div>

        {/* Portfolio Grid - Asymmetric Layout */}
        <div className="grid grid-cols-12 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              data-testid={`portfolio-item-${item.id}`}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 ? "col-span-12 lg:col-span-8" : "col-span-12 md:col-span-6 lg:col-span-4"
              }`}
            >
              <div className={`relative ${index === 0 ? "h-[400px] md:h-[500px]" : "h-[300px] md:h-[400px]"}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#007bff] mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#f5f5dc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
