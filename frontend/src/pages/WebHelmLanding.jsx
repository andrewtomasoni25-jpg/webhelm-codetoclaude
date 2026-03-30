import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PricingSection from "@/components/landing/PricingSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import AboutSection from "@/components/landing/AboutSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function WebHelmLanding() {
  return (
    <div data-testid="webhelm-landing" className="min-h-screen bg-[#0b0b0b]">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ProcessSection />
        <CTASection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
