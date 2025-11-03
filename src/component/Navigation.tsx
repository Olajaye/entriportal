"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import ContactModal from "./ContactModal";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-hero-background/95 backdrop-blur-md border-b border-pure-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0"
            aria-label="NeuroBytes Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-electric-blue flex items-center justify-center transition-transform hover:scale-105">
              <span className="text-pure-white font-bold text-sm sm:text-lg">
                N
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-pure-white">
              NeuroBytes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-all duration-200 relative ${
                  isActive(link.href)
                    ? "text-electric-blue"
                    : "text-pure-white/90 hover:text-electric-blue"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-electric-blue rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="hero"
              size="lg"
              onClick={() =>
                router.push("https://zfrmz.com/2cZyxiRASEK5tBWvgdJp")
              }
              className="transition-transform hover:scale-105"
            >
              Request a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-pure-white p-2 rounded-lg hover:bg-pure-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-96 py-4 border-t border-pure-white/10"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-smooth px-4 py-2 rounded-lg ${
                  isActive(link.href)
                    ? "text-electric-blue bg-electric-blue/10"
                    : "text-pure-white hover:text-electric-blue hover:bg-pure-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => {
                  // setIsContactModalOpen(true);
                  // setIsMenuOpen(false);
                  router.push("https://zfrmz.com/2cZyxiRASEK5tBWvgdJp");
                }}
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;
