import { Users, Lightbulb, Award } from "lucide-react";

const stats = [
  { id: "projects", value: "50+", label: "Projects Delivered" },
  { id: "clients", value: "40+", label: "Happy Clients" },
  { id: "years", value: "5+", label: "Years Experience" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#007bff]/10 blur-3xl rounded-full" />
            <img
              data-testid="about-image"
              src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="WebHelm team workspace"
              className="relative rounded-2xl shadow-2xl border border-white/10 w-full"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
              About Us
            </span>
            <h2
              data-testid="about-title"
              className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-6"
            >
              Crafting Digital Experiences That Drive Results
            </h2>
            <p className="text-base leading-relaxed text-white/70 mb-6">
              At WebHelm, we're passionate about helping businesses navigate the
              digital landscape. Our team of designers and developers work
              together to create websites that don't just look stunning – they
              perform exceptionally.
            </p>
            <p className="text-base leading-relaxed text-white/70 mb-8">
              Founded with a simple mission: to make professional web design
              accessible to businesses of all sizes. We believe every company
              deserves a website that truly represents their brand and helps
              them grow.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#007bff]" />
                </div>
                <span className="text-white/80 text-sm font-medium">
                  Client-First
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#007bff]" />
                </div>
                <span className="text-white/80 text-sm font-medium">
                  Innovative
                </span>
              </div>
              <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
