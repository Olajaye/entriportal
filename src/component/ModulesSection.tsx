import { Button } from "@/src/component/ui/button";
import { ArrowRight, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";

const ModulesSection = () => {
  const modules = [
    {
      name: "Spark",
      tagline: "Social Media Intelligence",
      description:
        "AI-powered social media idea and content generator for campaigns in seconds.",
      icon: "/image/spark-icon.jpg",
      color: "electric-blue",
      features: [
        "Instant content generation",
        "Campaign idea brainstorming",
        "Multi-platform optimization",
        "Brand voice consistency",
      ],
      link: "https://spark.techlytics.ai",
    },
    {
      name: "Entri",
      tagline: "Estate Security Management",
      description:
        "Smart estate security management app for visitor code generation and tracking.",
      icon: "/image/entri-icon.jpg",
      color: "dark-gray",
      features: [
        "Automated visitor codes",
        "Real-time tracking",
        "Security analytics",
        "Access control integration",
      ],
      link: "/modules/entri",
    },
  ];

  return (
    <section className="content-section">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Featured Modules</h2>
          <p className="section-subtitle">
            Discover our specialized AI modules designed for specific industry
            needs. Each module is production-ready and can be deployed within
            minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {modules.map((module, index) => (
            <div
              key={module.name}
              className={`module-card group ${
                module.color === "electric-blue"
                  ? "bg-electric-blue text-pure-white"
                  : "bg-pure-white border-2 border-card-border"
              }`}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={"/image/entri-icon.jpg"}
                    alt={`${module.name} module icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{module.name}</h3>
                  <p
                    className={`text-sm font-medium ${
                      module.color === "electric-blue"
                        ? "text-blue-100"
                        : "text-electric-blue"
                    }`}
                  >
                    {module.tagline}
                  </p>
                </div>
              </div>

              <p
                className={`text-lg mb-6 ${
                  module.color === "electric-blue"
                    ? "text-blue-50"
                    : "text-gray-600"
                }`}
              >
                {module.description}
              </p>

              <div className="space-y-3 mb-8">
                {module.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        module.color === "electric-blue"
                          ? "bg-white/20"
                          : "bg-electric-blue/10"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          module.color === "electric-blue"
                            ? "bg-white"
                            : "bg-electric-blue"
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-sm ${
                        module.color === "electric-blue"
                          ? "text-blue-50"
                          : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {module.name === "Entri" ? (
                <Link href={module.link}>
                  <Button
                    variant={
                      module.color === "electric-blue" ? "hero-outline" : "hero"
                    }
                    size="lg"
                    className="w-full group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <a href={module.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant={
                      module.color === "electric-blue" ? "hero-outline" : "hero"
                    }
                    size="lg"
                    className="w-full group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            More modules coming soon. Join our waitlist to be notified.
          </p>
          <Button variant="cta-outline" size="lg">
            View All Modules
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
