import Navigation from "@/src/component/Navigation";
import Footer from "@/src/component/layout/Footer";
import { Button } from "@/src/component/ui/button";
import {
  ArrowRight,
  Check,
  MessageSquare,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const Spark = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI Content Generation",
      description:
        "Generate engaging social media posts, captions, and campaign ideas in seconds.",
    },
    {
      icon: Target,
      title: "Campaign Optimization",
      description:
        "AI-powered insights to optimize your campaigns for maximum engagement.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform Support",
      description:
        "Create content optimized for Instagram, Twitter, LinkedIn, and Facebook.",
    },
    {
      icon: Zap,
      title: "Brand Voice Consistency",
      description:
        "Maintain your unique brand voice across all generated content.",
    },
  ];

  const useCases = [
    "Social media marketing agencies",
    "E-commerce brands",
    "Content creators and influencers",
    "Marketing teams at enterprises",
    "Small business owners",
  ];

  const benefits = [
    "Reduce content creation time by 90%",
    "Increase engagement rates with AI-optimized content",
    "Scale content production without hiring",
    "Maintain consistent brand messaging",
    "Generate campaign ideas instantly",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section pt-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={"/image/spark-icon.jpg"}
                    alt="Spark module icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-electric-blue">
                    Spark
                  </h1>
                  <p className="text-xl text-gray-300">
                    Social Media Intelligence
                  </p>
                </div>
              </div>

              <p className="text-2xl text-gray-300 leading-relaxed">
                AI-powered social media idea and content generator that creates
                engaging campaigns in seconds, not hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://spark.techlytics.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="xl" className="group">
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a
                  href="https://spark.techlytics.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero-outline" size="xl">
                    Start Free Trial
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-pure-white rounded-2xl p-8 shadow-glow">
                <div className="space-y-4">
                  <div className="text-dark-gray">
                    <div className="text-sm font-medium text-electric-blue mb-2">
                      AI Generated Content:
                    </div>
                    <div className="bg-light-gray rounded-lg p-4 text-sm">
                      "🚀 Exciting news! Our latest product launch is here and
                      it's going to revolutionize how you think about
                      [industry]. What are your thoughts on AI-powered
                      solutions? #Innovation #AI"
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Generated in 0.8 seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section bg-section-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Core Features</h2>
            <p className="section-subtitle">
              Everything you need to create compelling social media content and
              campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="content-section">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Perfect for</h2>
              <ul className="space-y-4">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-electric-blue/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-electric-blue" />
                    </div>
                    <span className="text-lg">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-electric-blue/10 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-electric-blue" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section gradient-electric text-pure-white">
        <div className="section-container">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to 10x Your Content Creation?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of marketers who are already using Spark to create
              viral content at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://spark.techlytics.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero-outline" size="xl">
                  Request Demo
                </Button>
              </a>
              <a
                href="https://spark.techlytics.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-pure-white text-electric-blue hover:bg-pure-white/90"
                >
                  Start Free Trial
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Spark;
