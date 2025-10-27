"use client";
import { useState } from "react";
import { Button } from "@/src/component/ui/button";
import { Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Modules", href: "/modules" },
    { name: "Industries", href: "/industries" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero-background/95 backdrop-blur-md border-b border-pure-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-electric-blue flex items-center justify-center">
              <span className="text-pure-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold text-pure-white">
              NeuroBytes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-smooth ${
                  isActive(link.href)
                    ? "text-electric-blue"
                    : "text-pure-white hover:text-electric-blue"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="hero"
              size="lg"
              onClick={() => setIsContactModalOpen(true)}
            >
              Request a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-pure-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-pure-white/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-smooth ${
                    isActive(link.href)
                      ? "text-electric-blue"
                      : "text-pure-white hover:text-electric-blue"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;
