"use client";

import { useEffect, useState } from "react";

import Navigation from "@/src/component/Navigation";
import HeroSection from "@/src/component/HeroSection";
import AboutSection from "@/src/component/AboutSection";
import ModulesSection from "@/src/component/ModulesSection";
import HowItWorksSection from "@/src/component/HowItWorksSection";
import IndustriesSection from "@/src/component/IndustriesSection";
import CTASection from "@/src/component/CTASection";
import { useLazyGetUsersQuery } from "@/src/lib/features/api/userApi";

export default function page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ModulesSection />
      <HowItWorksSection />
      <IndustriesSection />
      <CTASection />
    </div>
  );
}
