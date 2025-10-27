"use client";
import ContactModal from "@/src/component/ContactModal";
import Navigation from "@/src/component/Navigation";
import { Button } from "@/src/component/ui/button";
import {
  ArrowRight,
  Check,
  Shield,
  Users,
  BarChart3,
  Clock,
  CreditCard,
  UserPlus,
  Settings,
  Bell,
  Calendar,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Entri = () => {
  const route = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const features = [
    {
      icon: Shield,
      title: "Automated Security Codes",
      description:
        "Generate secure, time-limited visitor codes automatically for enhanced estate security.",
    },
    // {
    //   icon: Users,
    //   title: "User Management (50 Users)",
    //   description:
    //     "Manage up to 50 residents and security guards with comprehensive role-based access control.",
    // },
    {
      icon: CreditCard,
      title: "Recurring Payment Setup",
      description:
        "Estate admins can easily set up and manage recurring payments for estate dues and maintenance fees.",
    },
    {
      icon: BarChart3,
      title: "Security Analytics",
      description:
        "Gain insights into visitor patterns, payment status, and security metrics with detailed reporting.",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description:
        "Instant alerts for visitor arrivals, payment reminders, and security events.",
    },
    {
      icon: Calendar,
      title: "Payment Scheduling",
      description:
        "Automated monthly billing cycles with customizable due dates and reminder schedules.",
    },
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Estate Admin Setup",
      description:
        "Estate administrators create the estate profile and invite up to 50 users (residents and guards).",
      icon: Settings,
    },
    {
      step: "2",
      title: "User Onboarding",
      description:
        "Residents and guards receive invitations and set up their profiles with role-based permissions.",
      icon: UserPlus,
    },
    {
      step: "3",
      title: "Security Management",
      description:
        "Generate visitor codes, track entries, and monitor all security activities in real-time.",
      icon: Eye,
    },
    {
      step: "4",
      title: "Payment Management",
      description:
        "Set up recurring estate dues, maintenance fees, and track payment status automatically.",
      icon: CreditCard,
    },
  ];

  const pricingFeatures = [
    "Up to 50 users (residents + security guards)",
    "Unlimited visitor code generation",
    "Real-time visitor tracking & analytics",
    "Recurring payment setup & management",
    "Estate dues collection automation",
    "SMS & email notifications",
    "Security analytics & reporting",
    "24/7 customer support",
    "Mobile app access (iOS & Android)",
    "Data export & backup",
  ];

  const userTypes = [
    {
      type: "Estate Admins",
      description:
        "Full access to user management, payment setup, and all security features",
      capabilities: [
        "Manage all users",
        "Set up recurring payments",
        "View all analytics",
        "Configure estate settings",
      ],
    },
    {
      type: "Residents",
      description:
        "Generate visitor codes, view their payment status, and manage their visitors",
      capabilities: [
        "Generate visitor codes",
        "View payment history",
        "Manage personal visitors",
        "Receive notifications",
      ],
    },
    {
      type: "Security Guards",
      description:
        "Validate visitor codes, monitor entries, and access security dashboards",
      capabilities: [
        "Validate visitor codes",
        "Monitor real-time entries",
        "Access security logs",
        "Generate reports",
      ],
    },
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
                    src={"/image/entri-icon.jpg"}
                    alt="Entri module icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-electric-blue">
                    Entri
                  </h1>
                  <p className="text-xl text-gray-300">
                    Estate Security Management
                  </p>
                </div>
              </div>

              <p className="text-2xl text-gray-300 leading-relaxed">
                Complete estate security and payment management solution. Manage
                up to 50 users, automate visitor codes, and handle recurring
                estate dues - all in one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => route.push("/createTenant?plan=BASIC")}
                  variant="hero"
                  size="xl"
                  className="group"
                >
                  Start Basic Subscription
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  variant="hero-outline"
                  size="xl"
                >
                  Request Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-pure-white rounded-2xl p-8 shadow-glow">
                <div className="space-y-6">
                  <div className="text-dark-gray">
                    <div className="text-sm font-medium text-electric-blue mb-4">
                      Estate Management Dashboard
                    </div>
                    <div className="space-y-4">
                      <div className="bg-light-gray rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Active Users
                          </span>
                          <span className="text-electric-blue font-bold">
                            47/50
                          </span>
                        </div>
                      </div>
                      <div className="bg-light-gray rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Monthly Dues Collected
                          </span>
                          <span className="text-green-600 font-bold">
                            ₦2.1M
                          </span>
                        </div>
                      </div>
                      <div className="bg-light-gray rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Visitor Codes Today
                          </span>
                          <span className="text-electric-blue font-bold">
                            23
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="content-section bg-section-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">How Entri Works</h2>
            <p className="section-subtitle">
              Simple setup process for comprehensive estate management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-electric-blue text-pure-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="content-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">User Management & Roles</h2>
            <p className="section-subtitle">
              Up to 50 users with role-based access and capabilities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <div key={index} className="feature-card text-center">
                <h3 className="text-xl font-bold mb-4 text-electric-blue">
                  {userType.type}
                </h3>
                <p className="text-gray-600 mb-6">{userType.description}</p>
                <ul className="space-y-3">
                  {userType.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-electric-blue flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section bg-section-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Complete Estate Management Features
            </h2>
            <p className="section-subtitle">
              Everything you need to manage security and payments in one
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="content-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              One plan with everything you need to manage your estate
            </p>
          </div>

          <div className="flex justify-between items-center gap-3">
            <div className="max-w-lg mx-auto">
              <div className="bg-pure-white border-2 border-electric-blue rounded-2xl p-8 shadow-glow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-blue text-pure-white px-4 py-2 rounded-full text-sm font-medium">
                    Basic Plan
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Estate Management Plan
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-electric-blue">
                      ₦20,000
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">
                    For up to 50 users (residents + guards)
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => route.push("/createTenant?plan=BASIC")}
                  >
                    Start Monthly Subscription
                  </Button>
                  <Button
                    onClick={() => route.push("/contact")}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="bg-pure-white border-2 border-electric-blue rounded-2xl p-8 shadow-glow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-blue text-pure-white px-4 py-2 rounded-full text-sm font-medium">
                    Medium Plan
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Estate Management Plan
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-electric-blue">
                      ₦38,750
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">
                    For up to 100 users (residents + guards)
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => route.push("/createTenant?plan=MEDIUM")}
                  >
                    Start Monthly Subscription
                  </Button>
                  <Button
                    onClick={() => route.push("/contact")}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="bg-pure-white border-2 border-electric-blue rounded-2xl p-8 shadow-glow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-blue text-pure-white px-4 py-2 rounded-full text-sm font-medium">
                    Annual Plan
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Estate Management Plan
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-electric-blue">
                      ₦216,000
                    </span>
                    <span className="text-gray-600">/yearly</span>
                  </div>
                  <p className="text-gray-600">
                    For over 100 users (residents + guards)
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => route.push("/createTenant?plan=ANNUAL")}
                  >
                    Start Annual Subscription
                  </Button>
                  <Button
                    onClick={() => route.push("/contact")}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              * No setup fees • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Security Stats */}
      <section className="content-section bg-section-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Estate Managers
            </h2>
            <p className="text-lg text-gray-600">
              Real results from estates using Entri
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-pure-white rounded-xl p-6 text-center shadow-card">
              <div className="text-3xl font-bold text-electric-blue mb-2">
                500+
              </div>
              <div className="text-sm text-gray-600">Estates Protected</div>
            </div>
            <div className="bg-pure-white rounded-xl p-6 text-center shadow-card">
              <div className="text-3xl font-bold text-electric-blue mb-2">
                ₦50M+
              </div>
              <div className="text-sm text-gray-600">Dues Collected</div>
            </div>
            <div className="bg-pure-white rounded-xl p-6 text-center shadow-card">
              <div className="text-3xl font-bold text-electric-blue mb-2">
                99.8%
              </div>
              <div className="text-sm text-gray-600">Payment Success Rate</div>
            </div>
            <div className="bg-pure-white rounded-xl p-6 text-center shadow-card">
              <div className="text-3xl font-bold text-electric-blue mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section gradient-electric text-pure-white">
        <div className="section-container">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Estate Management?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of estate managers who have streamlined their
              security and payment processes with Entri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                className="bg-pure-white text-electric-blue hover:bg-pure-white/90"
                onClick={() => route.push("/createTenant?plan=BASIC")}
              >
                Start Your Basic Subscription
              </Button>
              <Button
                onClick={() => setIsContactModalOpen(true)}
                variant="hero-outline"
                size="xl"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="text-blue-100 text-sm">
              30-day free trial • No credit card required • Setup in minutes
            </p>
          </div>
        </div>
      </section>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Entri;
