import { Button } from "@/src/component/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-ai-modules.jpg";

const HeroSection = () => {
  return (
    <section className="hero-section mt-14">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 px-3 lg:px-0">
            <div className="space-y-6">
              <h1 className="hero-title text-balance">
                AI-Powered Intelligence,{" "}
                <span className="text-electric-blue">Modular by Design</span>
              </h1>
              <p className="hero-subtitle text-balance">
                NeuroBytes is a modular AI platform that delivers ready-to-use,
                industry-specific applications; helping you deploy AI in
                minutes, not months.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="mr-2 h-5 w-5" />
                Explore Modules
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-electric-blue">50+</div>
                <div className="text-sm text-gray-300">Enterprise Clients</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-electric-blue">2</div>
                <div className="text-sm text-gray-300">AI Modules Live</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-electric-blue">
                  99.9%
                </div>
                <div className="text-sm text-gray-300">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img
                src={"/image/hero-ai-modules.jpg"}
                alt="AI Modular Platform Visualization"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-electric-blue/20 mix-blend-overlay"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-electric-blue rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-electric-blue rounded-full blur-2xl opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
