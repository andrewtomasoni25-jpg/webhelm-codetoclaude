import { Check, Bot, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitTextReveal from "@/components/SplitTextReveal";
import { Badge } from "@/components/ui/badge";

// Comparison table — written in plain English customers actually
// understand. Brand Build sits as the leftmost column for people who
// only need branding; Business and Premium add the website + system on
// top. Rows are intentionally short so the table reads at a glance.
const comparisonGroups = [
  {
    title: "What You Get",
    rows: [
      { label: "A logo and brand built around your business", tiers: [true, true, true] },
      { label: "Brand colours and typography that match", tiers: [true, true, true] },
      { label: "Brand guidelines PDF + 10 social templates", tiers: [true, false, false] },
      { label: "30 days of free changes after launch", tiers: [true, true, true] },
      { label: "You own everything — no rented platforms", tiers: [true, true, true] },
    ],
  },
  {
    title: "Your Website",
    rows: [
      { label: "A custom website that looks great on every device", tiers: [false, true, true] },
      { label: "Easy for customers to find you on Google", tiers: [false, true, true] },
      { label: "Email and domain set up properly", tiers: [false, true, true] },
      { label: "AI assistant that answers customers 24/7", tiers: [false, true, true] },
      { label: "Online booking so customers schedule themselves", tiers: [false, true, true] },
      { label: "Multiple pages, not just one", tiers: [false, true, true] },
    ],
  },
  {
    title: "Premium Extras",
    rows: [
      { label: "Designed completely from scratch — no templates", tiers: [false, false, true] },
      { label: "Up to 8 custom pages", tiers: [false, false, true] },
      { label: "First in line if you need urgent changes", tiers: [false, false, true] },
    ],
  },
];

// Three-column comparison — Full Brand Build as the brand-only entry,
// Business as the default website (highlighted), Premium as the top
// tier. Brand Build sits beside the website tiers because customers
// often choose between "just brand me" and "full website + brand".
const comparisonColumns = [
  { title: "Full Brand Build", price: "£750", highlighted: false },
  {
    title: "Business",
    price: "£980",
    originalPrice: "£1,400",
    highlighted: true,
  },
  {
    title: "Premium",
    price: "£1,540",
    originalPrice: "£2,200",
    highlighted: false,
  },
];

// Five setup tiers — prices reverted to the original structure, but the
// included items now reflect the launchpad system (AI Assistant, Booking
// Integration, Google profile etc. baked into the higher tiers). Order
// is kept ascending so customers scan from cheapest entry upward.
const pricingPlans = [
  {
    id: "website-redesign",
    title: "Website Redesign",
    price: "£550",
    category: "Refresh",
    description: "Modernise your current website without starting from scratch — cleaner, faster, mobile-ready",
    image: "",
    features: [
      "Complete modern redesign",
      "Content migrated across",
      "Email + domain checked & sorted",
      "Live in 5 days",
    ],
    highlighted: false,
  },
  {
    id: "landing-page",
    title: "Landing Page",
    price: "£750",
    category: "Starter",
    description: "A clean, professional single-page website that gets you online fast",
    image: "",
    features: [
      "1-page custom website",
      "Domain + business email set up",
      "Mobile responsive · fast loading",
      "Live in 48 hours",
    ],
    highlighted: false,
  },
  {
    id: "full-brand-build",
    title: "Full Brand Build",
    price: "£750",
    category: "Branding",
    description: "Everything your brand needs in one go — logo system, colours, type, and brand guidelines",
    image: "",
    features: [
      "Logo system + 3 concepts",
      "Colour palette + type system",
      "10 social media templates",
      "Brand guidelines PDF",
    ],
    highlighted: false,
  },
  {
    id: "business",
    title: "Business",
    price: "£980",
    originalPrice: "£1,400",
    category: "Most Popular",
    description: "The best choice for most small businesses — multi-page site built to bring in customers",
    image: "",
    features: [
      "Up to 5 custom pages",
      "AI Assistant included free",
      "Booking Integration included free",
      "Domain + email + Google profile",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    title: "Premium",
    price: "£1,540",
    originalPrice: "£2,200",
    category: "Premium",
    description: "Full custom build for businesses serious about growth — everything bespoke from scratch",
    image: "",
    features: [
      "Up to 8 custom pages",
      "AI Assistant + Booking included free",
      "Full custom design from scratch",
      "Priority delivery & support",
    ],
    highlighted: false,
  },
];

// Three monthly retainer tiers. Helm is the safety net (£29). Studio is
// the active-management default that 90% of clients pick (£79). Captain
// is the full part-time-digital-assistant tier (£149). Cancel any time,
// no contract — clients keep the site whether they retain or not.
const carePlans = [
  {
    id: "helm",
    title: "Helm",
    price: "£29/mo",
    category: "Safety Net",
    description: "Site monitored, edits when you need them, someone to call when things go wrong",
    features: [
      "24/7 site uptime monitoring",
      "Unlimited small text edits",
      "Direct line · 48hr response",
      "Quarterly mini check-up",
    ],
    highlighted: false,
  },
  {
    id: "studio",
    title: "Studio",
    price: "£79/mo",
    category: "Most Popular",
    description: "Active management — your reviews climb, your Google profile stays sharp, your numbers grow",
    features: [
      "Everything in Helm",
      "Monthly Google review campaign",
      "Google Business Profile managed",
      "Monthly performance report + quarterly call",
    ],
    highlighted: true,
  },
  {
    id: "captain",
    title: "Captain",
    price: "£149/mo",
    category: "Full Service",
    description: "Like having a part-time digital assistant — social posts, local SEO, full back-office",
    features: [
      "Everything in Studio",
      "10 branded social posts per month",
      "Local SEO push + customer auto-replies",
      "Annual rebuild + monthly strategy session",
    ],
    highlighted: false,
  },
];

// Four add-ons that sit outside the website tiers. Booking Integration
// and AI Assistant are both bundled free into Business + Premium; they
// only carry a price when added to Landing Page or Website Redesign.
// Business Setup is the universal "get me online properly" add-on, and
// Logo Only handles people who just want branding without a website.
const addons = [
  { name: "Booking Integration", price: "£250", note: "Free with Business or Premium" },
  { name: "Business Setup", price: "£200", note: "Domain + business email + DNS configured" },
  { name: "AI Assistant Setup", price: "£250", note: "Free with Business or Premium" },
  { name: "Logo only (no website)", price: "£250", note: "If you just need branding sorted" },
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
              <div className="mb-4 leading-none">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-light text-white">
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-sm text-white/40 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                {plan.originalPrice && (
                  <span className="inline-block mt-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold text-[#007bff]">
                    Founding Partner · 30% off
                  </span>
                )}
              </div>
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

        {/* Comparison table — friendly plain-English breakdown of what's
            included in each package. Prices live on the cards above so
            this section stays focused on value (what you get), not cost.
            Sticky header keeps tier names visible while scrolling on
            mobile. */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">
              What's Included
            </h3>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              No jargon, no surprises — here's exactly what each package gets you.
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
                    src="/hero-logo.webp"
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

        {/* Monthly Care plans — three retainer tiers under the setup
            packages above. Same card layout as pricingPlans so the
            visual rhythm of the page stays consistent. Studio is the
            highlighted middle tier — that's the one most clients pick. */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-3 block">
              Optional · Cancel any time
            </span>
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">
              Monthly Care
            </h3>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              Keep your launchpad sharp, secure and growing — your reviews climbing,
              your Google profile fresh, and someone real to call when things change.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {carePlans.map((plan) => (
              <div
                key={plan.id}
                data-testid={`care-card-${plan.id}`}
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
                <div className="mb-4 leading-none">
                  <span className="text-2xl font-light text-white">
                    {plan.price}
                  </span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {plan.description}
                </p>
                <ul className="space-y-2 flex-1 mb-4">
                  {plan.features.map((f, i) => (
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
        </div>

        {/* Add-ons — small extras that sit outside the main launchpad
            packages. Kept tight (3 items) so the page stays scannable.
            zoom: 0.88 makes them visually lighter than the plan cards. */}
        <div className="mt-20" style={{ zoom: 0.88 }}>
          <h3 className="text-center text-2xl md:text-3xl font-medium text-white mb-3">
            Add-Ons
          </h3>
          <p className="text-center text-white/55 text-base mb-10 max-w-xl mx-auto">
            Small extras you can bolt onto any launchpad package.
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
