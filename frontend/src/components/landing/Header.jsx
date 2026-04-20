import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "/hero-logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="header"
      className="fixed top-0 left-0 right-0 z-50 glass h-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero")}
          className="flex items-center gap-3"
          data-testid="logo-link"
        >
          <img
            src={LOGO_URL}
            alt="WebHelm Logo"
            className="h-14 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            data-testid="header-cta-button"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full px-6"
          >
            Get a Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-testid="mobile-menu-button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-menu"
          className="md:hidden absolute top-20 left-0 right-0 glass border-t border-white/10"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-base font-medium text-white/80 hover:text-white transition-colors duration-200 py-2"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={(e) => scrollToSection(e, "#contact")}
              className="bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full mt-2"
            >
              Get a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
