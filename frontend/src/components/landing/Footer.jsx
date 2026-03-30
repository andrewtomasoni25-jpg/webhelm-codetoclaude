const LOGO_URL = "https://customer-assets.emergentagent.com/job_69c425dc-8d9f-4328-b10c-3751d17cadfd/artifacts/5z228esd_IMG_0296.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "Website Design", href: "#services" },
      { label: "Landing Pages", href: "#services" },
      { label: "Website Redesign", href: "#services" },
      { label: "Logo Design", href: "#services" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      data-testid="footer"
      className="py-16 border-t border-white/10 bg-[#0b0b0b]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={LOGO_URL}
              alt="WebHelm Logo"
              className="h-20 w-auto mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
              Steering your business toward online success. We design
              high-performance websites that help businesses grow and thrive in
              the digital landscape.
            </p>
            <div className="text-sm text-white/60">
              <p className="mb-1">
                <a href="mailto:content@webhelm.co" className="hover:text-white transition-colors">
                  content@webhelm.co
                </a>
              </p>
              <p className="mb-1">
                <a href="tel:+447508997157" className="hover:text-white transition-colors">
                  +44 7508997157
                </a>
              </p>
              <p>Remote</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} WebHelm. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
