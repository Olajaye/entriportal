import {
  Megaphone,
  Building2,
  Zap,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/component/ui/button";

const IndustriesSection = () => {
  const industries = [
    {
      icon: Megaphone,
      name: "Marketing",
      description:
        "Content generation, campaign optimization, and audience targeting with AI-powered insights.",
      modules: ["Spark"],
      color: "electric-blue",
    },
    {
      icon: Building2,
      name: "Real Estate & Security",
      description:
        "Property management, security automation, and visitor tracking solutions.",
      modules: ["Entri"],
      color: "dark-gray",
    },
    {
      icon: Zap,
      name: "Energy",
      description:
        "Smart grid optimization, consumption analysis, and predictive maintenance.",
      modules: ["Coming Soon"],
      color: "muted",
    },
    {
      icon: ShoppingBag,
      name: "Retail",
      description:
        "Inventory management, customer behavior analysis, and personalized recommendations.",
      modules: ["Coming Soon"],
      color: "muted",
    },
  ];

  return (
    <section className="content-section">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Industries We Serve</h2>
          <p className="section-subtitle">
            NeuroBytes modules are designed for specific industry challenges,
            delivering targeted AI solutions that understand your business
            context.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`feature-card group ${
                industry.color === "muted" ? "opacity-75" : ""
              }`}
            >
              <div className="mb-6">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    industry.color === "electric-blue"
                      ? "bg-electric-blue/10"
                      : industry.color === "dark-gray"
                      ? "bg-dark-gray/10"
                      : "bg-gray-100"
                  }`}
                >
                  <industry.icon
                    className={`w-7 h-7 ${
                      industry.color === "electric-blue"
                        ? "text-electric-blue"
                        : industry.color === "dark-gray"
                        ? "text-dark-gray"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{industry.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {industry.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Available Modules
                </div>
                {industry.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      module === "Coming Soon"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-electric-blue/10 text-electric-blue"
                    }`}
                  >
                    {module}
                  </div>
                ))}
              </div>

              {industry.color !== "muted" && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group text-electric-blue hover:text-electric-blue"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-section-background rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our module library. Contact us to
              discuss custom AI solutions for your specific industry needs.
            </p>
            <Button variant="cta" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
