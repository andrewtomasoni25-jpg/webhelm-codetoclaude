import { MessageSquare, Pencil, Code, Rocket } from "lucide-react";
import SplitTextReveal from "@/components/SplitTextReveal";

const processSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "The Brief",
    description:
      "Tell me what you do, who you serve, and what you'd like it called. 30 minutes on a call — that's the only homework you've got.",
  },
  {
    id: 2,
    icon: Pencil,
    title: "The Build",
    description:
      "Logo, website, email, Google profile, payments, AI assistant — all set up in parallel while you carry on with your day.",
  },
  {
    id: 3,
    icon: Code,
    title: "The Launch",
    description:
      "You go live. Fully ready to take customers. Site is yours, code is yours, domain is yours — no platform lock-in.",
  },
  {
    id: 4,
    icon: Rocket,
    title: "The Run",
    description:
      "Optional Studio retainer keeps everything growing — reviews climbing, profile fresh, edits handled. Cancel any time.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            How We Work
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="process-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Our Process
          </SplitTextReveal>
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
