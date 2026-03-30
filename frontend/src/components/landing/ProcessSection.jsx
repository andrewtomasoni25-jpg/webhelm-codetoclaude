import { MessageSquare, Pencil, Code, Rocket } from "lucide-react";

const processSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and target audience to create a tailored strategy.",
  },
  {
    id: 2,
    icon: Pencil,
    title: "Design",
    description:
      "Our designers create stunning mockups that align with your brand and user expectations.",
  },
  {
    id: 3,
    icon: Code,
    title: "Development",
    description:
      "We build your website using modern technologies for optimal performance and scalability.",
  },
  {
    id: 4,
    icon: Rocket,
    title: "Launch",
    description:
      "After thorough testing, we launch your site and provide ongoing support to ensure success.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            How We Work
          </span>
          <h2
            data-testid="process-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Our Process
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#007bff]/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                data-testid={`process-step-${step.id}`}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative inline-flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#121212] border-2 border-[#007bff] flex items-center justify-center mb-6 relative z-10">
                    <step.icon className="w-8 h-8 text-[#007bff]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#007bff] text-white text-sm font-bold flex items-center justify-center z-20">
                    {step.id}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-white/60 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
