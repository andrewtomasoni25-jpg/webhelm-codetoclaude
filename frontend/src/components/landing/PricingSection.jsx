import { Check, Bot, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitTextReveal from "@/components/SplitTextReveal";
import { Badge } from "@/components/ui/badge";

// Cloudflare-style feature comparison groups. Each row lists which of the
// three website tiers (Landing / Business / Premium) includes it. Add-ons
// show as "Optional" across all tiers — they are available everywhere but
// billed separately (prices live in the Popular Upgrades section below).
const comparisonGroups = [
  {
    title: "All Websites",
    rows: [
      { label: "Modern, high-quality design tailored to your brand", tiers: [true, true, true] },
      { label: "Smooth animations & visual effects", tiers: [true, true, true] },
      { label: "Mobile-optimised across all devices", tiers: [true, true, true] },
      { label: "Secure website (HTTPS)", tiers: [true, true, true] },
      { label: "Fast loading with image optimisation", tiers: [true, true, true] },
      { label: "Basic SEO setup", tiers: [true, true, true] },
    ],
  },
  {
    title: "Business & Above",
    rows: [
      { label: "Conversion-focused layout", tiers: [false, true, true] },
      { label: "Clear call-to-actions", tiers: [false, true, true] },
      { label: "Enhanced performance & speed", tiers: [false, true, true] },
      { label: "Structured multi-page design", tiers: [false, true, true] },
    ],
  },
  {
    title: "Premium Only",
    rows: [
      { label: "Advanced animations & interactive elements", tiers: [false, false, true] },
      { label: "High-end visual design", tiers: [false, false, true] },
      { label: "Lead-focused layout strategy", tiers: [false, false, true] },
      { label: "Priority delivery & support", tiers: [false, false, true] },
    ],
  },
  {
    title: "Optional Upgrades",
    rows: [
      { label: "Booking system", tiers: ["opt", "opt", "opt"] },
      { label: "E-commerce", tiers: ["opt", "opt", "opt"] },
      { label: "Email capture", tiers: ["opt", "opt", "opt"] },
      { label: "Automated backups", tiers: ["opt", "opt", "opt"] },
      { label: "Security protection", tiers: ["opt", "opt", "opt"] },
    ],
  },
];

const comparisonColumns = [
  { title: "Landing Page", price: "£750", highlighted: false },
  { title: "Business", price: "£1,400", highlighted: true },
  { title: "Premium", price: "£2,200", highlighted: false },
];

const pricingPlans = [
  {
    id: "logo-design",
    title: "Logo Design",
    price: "£150",
    category: "Branding",
    description: "A professional logo that makes your business look credible and stand out",
    image: "",
    features: [
      "3 unique logo concepts",
      "Unlimited revisions",
      "PNG, JPG, SVG files",
      "Full ownership rights",
      "Brand guidelines",
      "AI-assisted concepts",
    ],
    highlighted: false,
  },
  {
    id: "landing-page",
    title: "Landing Page",
    price: "£750",
    category: "Starter",
    description: "Get your business online quickly with a clean, professional presence",
    image: "",
    features: [
      "1-page custom website",
      "Mobile-friendly design",
      "Contact form included",
      "Basic SEO setup",
      "Fast turnaround",
      "AI-optimised layout",
    ],
    highlighted: false,
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    price: "From £1,300",
    category: "Refresh",
    description: "Transform your current website into something that actually works",
    image: "",
    features: [
      "Complete modern redesign",
      "Content migration",
      "SEO improvements",
      "Speed & performance",
      "Conversion improvements",
      "AI-driven UX analysis",
    ],
    highlighted: false,
  },
  {
    id: "business",
    title: "Business",
    price: "£1,400",
    category: "Most Popular",
    description: "The best choice for most businesses — designed to bring in customers",
    image: "",
    features: [
      "Up to 5 custom pages",
      "Designed for your customers",
      "Fully responsive",
      "SEO setup included",
      "Clear call-to-actions",
      "AI-powered optimisation",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    title: "Premium",
    price: "£2,200",
    category: "Premium",
    description: "Maximise conversions, leads, and performance for serious growth",
    image: "",
    features: [
      "Up to 8 custom pages",
      "Conversion-focused layout",
      "Speed optimisation",
      "Advanced UX design",
      "Fully responsive",
      "Priority delivery",
    ],
    highlighted: false,
  },
];

// Ordered lowest → highest price so clients scan cheapest upgrades first
// and the bigger-ticket e-comm sits at the end as the natural upsell.
const addons = [
  { name: "Maintenance & hosting", price: "£15/month", note: "Updates, backups & uptime handled" },
  { name: "Speed optimisation", price: "£100", note: "Keep visitors on your site" },
  { name: "Extra page", price: "£150", note: "" },
  { name: "Booking system", price: "£200", note: "Let customers book instantly" },
  { name: "Advanced SEO", price: "£250", note: "Get found on Google" },
  { name: "Contact form", price: "£250", note: "Capture enquiries easily" },
  { name: "E-commerce", price: "£500–£800", note: "Sell products online" },
];

export default function PricingSection() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="py-24 md:py-32 relative overflow-hidden"
      // zoom: 0.88 keeps the cards tight against the vortex backdrop.
      style={{ zoom: 0.88 }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Investment
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="pricing-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-3"
          >
            Transparent Pricing
          </SplitTextReveal>
          <p className="text-white/50 text-sm max-w-lg mx-auto mb-1">
            No hidden fees, no surprises — pick the package that fits your business
          </p>
          <p className="text-[#007bff]/70 text-xs flex items-center justify-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            AI-enhanced workflows mean faster delivery & better results
          </p>
        </div>

        {/* Static pricing grid — 5 packages laid out flush in a single
            row on desktop so clients can scan them side-by-side without
            dragging. Collapses to 1/2/3 cols on smaller breakpoints. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              data-testid={`pricing-card-${plan.id}`}
              className={`flex flex-col p-5 rounded-2xl bg-[#121212] border transition-colors ${
                plan.highlighted
                  ? "border-[#007bff] ring-1 ring-[#007bff]"
                  : "border-white/10 hover:border-[#007bff]/40"
              }`}
            >
              <Badge
                className={`self-start text-[10px] px-2 py-0.5 mb-3 ${
                  plan.highlighted
                    ? "bg-[#007bff] text-white border-none"
                    : "bg-white/10 text-white/80 border-white/10"
                }`}
              >
                {plan.category}
              </Badge>
              <h3 className="text-lg font-medium text-white leading-tight mb-1">
                {plan.title}
              </h3>
              <p className="text-2xl font-light text-white mb-4 leading-none">
                {plan.price}
              </p>
              <ul className="space-y-2 flex-1 mb-4">
                {plan.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#007bff] mt-0.5 shrink-0" strokeWidth={2.5} />
                    <span className="text-xs text-white leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollToContact}
                className={`w-full rounded-full text-xs py-2 ${
                  plan.highlighted
                    ? "bg-[#007bff] hover:bg-[#0056b3] text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Cloudflare-style feature comparison — prices only live at column
            headers; feature rows are price-free so clients compare on value,
            not on line-item cost. Sticky header keeps tier names visible
            while scrolling on mobile. */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">
              What's Included
            </h3>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              Fast, secure, modern websites with high-end design and smooth visuals —
              built to help your business stand out and get more customers.
            </p>
          </div>

          {/* Horizontal-scroll wrapper — on mobile the 4 columns can't fit,
              so the table swipes sideways (Cloudflare/Stripe pattern). On
              md+ it's the full width and the scroll never activates. A
              min-w on the inner grid guarantees each tier stays legible. */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/90 overflow-x-auto">
            <div className="min-w-[640px] md:min-w-0 divide-y divide-white/10">
              {/* Column headers — plan name + price only live here.
                  Top-left cell shows the WebHelm logo + "Features" so it
                  doubles as a branding anchor instead of being dead space. */}
              <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] md:grid-cols-[2fr_repeat(3,1fr)] divide-x divide-white/10">
                <div className="p-4 md:p-7 flex items-center gap-2 md:gap-4">
                  <img
                    src="https://customer-assets.emergentagent.com/job_69c425dc-8d9f-4328-b10c-3751d17cadfd/artifacts/5z228esd_IMG_0296.png"
                    alt="WebHelm"
                    className="h-8 md:h-12 w-auto shrink-0"
                  />
                  <span className="text-base md:text-2xl font-medium text-white leading-none">
                    Features
                  </span>
                </div>
                {comparisonColumns.map((col) => (
                  <div
                    key={col.title}
                    className={`p-4 md:p-7 text-center ${
                      col.highlighted ? "bg-[#007bff]/10" : ""
                    }`}
                  >
                    {col.highlighted && (
                      <span className="inline-block text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-semibold text-[#007bff] mb-2">
                        Most Popular
                      </span>
                    )}
                    <h4 className="text-base md:text-2xl font-medium text-white leading-tight">
                      {col.title}
                    </h4>
                    <p className="text-xl md:text-3xl font-light text-white mt-1.5 whitespace-nowrap">
                      {col.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Grouped feature rows — wrapped so divide-y gives us clean
                  section separators without extra margin gaps */}
              {comparisonGroups.map((group) => (
                <div key={group.title} className="divide-y divide-white/10">
                  {/* Group label — full-width band, flush with rows below */}
                  <div className="bg-white/[0.04] px-4 md:px-7 py-3 md:py-4">
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-white">
                      {group.title}
                    </span>
                  </div>
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1.4fr_repeat(3,1fr)] md:grid-cols-[2fr_repeat(3,1fr)] divide-x divide-white/10"
                    >
                      <div className="px-4 md:px-7 py-3.5 md:py-4 text-sm md:text-base text-white leading-snug">
                        {row.label}
                      </div>
                      {row.tiers.map((val, ti) => (
                        <div
                          key={ti}
                          className={`py-3.5 md:py-4 flex items-center justify-center ${
                            comparisonColumns[ti].highlighted ? "bg-[#007bff]/10" : ""
                          }`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 md:w-6 md:h-6 text-[#007bff]" strokeWidth={2.5} />
                          ) : val === "opt" ? (
                            <span className="text-[11px] md:text-xs tracking-wide uppercase font-medium text-white">
                              Optional
                            </span>
                          ) : (
                            <X className="w-4 h-4 md:w-5 md:h-5 text-white/40" strokeWidth={2.5} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Subtle hint that the table scrolls horizontally on small screens */}
          <p className="md:hidden text-center text-xs text-white/40 mt-3">
            Swipe the table sideways to see all plans →
          </p>
        </div>

        {/* Popular Upgrades — roomier cards so prices are easy to scan.
            zoom: 0.88 stacks on top of the section's own 0.88 zoom so
            add-ons read noticeably tighter than the plan cards above. */}
        <div className="mt-20" style={{ zoom: 0.88 }}>
          <h3 className="text-center text-2xl md:text-3xl font-medium text-white mb-3">
            Popular Upgrades
          </h3>
          <p className="text-center text-white/55 text-base mb-10 max-w-xl mx-auto">
            Enhance your website with features that bring in more customers and improve performance.
          </p>
          {/* Compact upgrade cards — name + note on the left, price on the
              right. Padding stays tight so cards keep the smaller footprint
              even with the price back in. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-start justify-between gap-3 p-3.5 md:p-4 rounded-xl bg-[#121212] border border-white/5 hover:border-[#007bff]/30 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <Plus className="w-5 h-5 text-[#007bff] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <div className="min-w-0">
                    <span className="text-base md:text-lg text-white font-medium block">
                      {addon.name}
                    </span>
                    {addon.note && (
                      <span className="text-sm text-white/60 block mt-1">
                        {addon.note}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-base md:text-lg font-medium text-[#f5f5dc] whitespace-nowrap shrink-0">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
