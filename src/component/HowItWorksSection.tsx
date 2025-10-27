import { Layers, Plug, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Layers,
      title: "Choose Module",
      description:
        "Browse our library of specialized AI modules designed for your industry needs.",
      color: "electric-blue",
    },
    {
      icon: Plug,
      title: "Integrate",
      description:
        "Seamlessly integrate with your existing systems using our APIs and SDKs.",
      color: "electric-blue",
    },
    {
      icon: TrendingUp,
      title: "Scale",
      description:
        "Monitor performance, gather insights, and scale your AI capabilities as you grow.",
      color: "electric-blue",
    },
  ];

  return (
    <section className="content-section bg-section-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started with AI in three simple steps. No complex setup, no
            months of development, just immediate value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-electric-blue text-pure-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className="w-20 h-20 mx-auto bg-pure-white rounded-2xl shadow-card flex items-center justify-center group-hover:shadow-hover transition-smooth">
                  <step.icon className="w-10 h-10 text-electric-blue" />
                </div>
                
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-1/2 w-full h-px bg-gradient-to-r from-electric-blue/50 to-transparent"></div>
                )}
              </div>

              <h3 className="text-xl font-bold text-electric-blue mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-pure-white rounded-2xl p-8 shadow-card inline-block">
            <p className="text-lg font-semibold text-dark-gray mb-2">
              Ready to get started?
            </p>
            <p className="text-gray-600">
              Schedule a demo and see how NeuroBytes can transform your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;