import { Button } from "@/src/component/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section className="content-section gradient-electric text-pure-white">
      <div className="section-container">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-balance">
              Join industry leaders who are already leveraging NeuroBytes
              modules to drive innovation and efficiency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero-outline" size="xl" className="group">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              size="xl"
              className="bg-pure-white text-electric-blue hover:bg-pure-white/90"
            >
              Start Free Trial
            </Button>
          </div>

          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pure-white rounded-full"></div>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pure-white rounded-full"></div>
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pure-white rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
