import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: "ironfit",
    title: "IronFit Gym",
    description: "Responsive fitness website with membership management and class scheduling",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "elitecuts",
    title: "Elite Cuts",
    description: "Modern barber shop website with online booking system",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "urbanbites",
    title: "Urban Bites",
    description: "Restaurant website with online ordering and menu management",
    category: "Food & Dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "techflow",
    title: "TechFlow Agency",
    description: "SaaS landing page with interactive features and lead generation",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "luxehome",
    title: "LuxeHome Interiors",
    description: "Interior design portfolio with gallery showcase",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "greenleaf",
    title: "GreenLeaf Wellness",
    description: "Health & wellness e-commerce with appointment booking",
    category: "Health",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
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

        {/* Portfolio Grid - Bento Style Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Featured Item */}
          <div
            data-testid={`portfolio-item-${portfolioItems[0].id}`}
            className="col-span-12 lg:col-span-8 relative group overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={portfolioItems[0].image}
                alt={portfolioItems[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#007bff] mb-2">
                  {portfolioItems[0].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
                  {portfolioItems[0].title}
                </h3>
                <p className="text-white/70 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {portfolioItems[0].description}
                </p>
                <div className="flex items-center gap-2 text-[#f5f5dc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Side Stack */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 grid gap-4 md:gap-6">
            {portfolioItems.slice(1, 3).map((item) => (
              <div
                key={item.id}
                data-testid={`portfolio-item-${item.id}`}
                className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px] md:h-[242px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#007bff] mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          {portfolioItems.slice(3).map((item) => (
            <div
              key={item.id}
              data-testid={`portfolio-item-${item.id}`}
              className="col-span-12 md:col-span-6 lg:col-span-4 relative group overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="relative h-[280px] md:h-[320px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#007bff] mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
