import { Check, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitTextReveal from "@/components/SplitTextReveal";
import { Badge } from "@/components/ui/badge";

// Comparison table — pure outcome language, zero tech jargon. Each row
// answers "what does this actually do for me?" rather than naming a
// feature. Brand Build is the leftmost column (branding only); Business
// and Premium add the website + everything-online on top.
const comparisonGroups = [
  {
    title: "For Your Brand",
    rows: [
      { label: "A logo that makes you look professional from day one", tiers: [true, true, true] },
      { label: "Brand colours and fonts that bring everything together", tiers: [true, true, true] },
      { label: "Ready-to-share content for your social media", tiers: [true, false, false] },
    ],
  },
  {
    title: "For Your Website",
    rows: [
      { label: "Customers find you the moment they search Google", tiers: [false, true, true] },
      { label: "Your business looks established at first glance", tiers: [false, true, true] },
      { label: "An AI assistant answers customer questions for you", tiers: [false, true, true] },
      { label: "People can contact you anytime, day or night", tiers: [false, true, true] },
    ],
  },
  {
    title: "Only With Premium",
    rows: [
      { label: "A website that looks unlike anyone else's", tiers: [false, false, true] },
      { label: "Plenty of room to tell your full story", tiers: [false, false, true] },
      { label: "Same-day attention when you need a change", tiers: [false, false, true] },
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

// Five setup tiers, split by audience. "Starting" = new businesses
// launching online (Landing, Brand Build, Business, Premium). "Trading"
// = existing businesses who need an online refresh (Website Redesign).
// AI Assistant is included free in every tier that has a website
// (Refresh, Landing, Business, Premium); Brand Build is branding-only
// so the AI Assistant doesn't apply. Booking is offered separately on
// request — it's not bundled into any tier.
const pricingPlans = [
  // ===== STARTING SOMETHING NEW =====
  {
    id: "landing-page",
    title: "Landing Page",
    price: "£750",
    category: "Starter",
    audience: "starting",
    description: "A clean, professional single-page website to get your business online fast",
    image: "",
    features: [
      "1-page custom website",
      "AI Assistant included free",
      "Email + domain set up properly",
      "Live in 48 hours",
    ],
    highlighted: false,
  },
  {
    id: "full-brand-build",
    title: "Full Brand Build",
    price: "£750",
    category: "Branding",
    audience: "starting",
    description: "Everything your brand needs in one go — logo, colours, type, ready for day one",
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
    audience: "starting",
    description: "The best choice for most small businesses — multi-page site built to bring in customers",
    image: "",
    features: [
      "Up to 5 custom pages",
      "AI Assistant included free",
      "Brand + email + Google profile",
      "Live in 72 hours",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    title: "Premium",
    price: "£1,540",
    originalPrice: "£2,200",
    category: "Premium",
    audience: "starting",
    description: "Full custom build for businesses serious about growth — everything bespoke from scratch",
    image: "",
    features: [
      "Up to 8 custom pages",
      "AI Assistant included free",
      "Full custom design from scratch",
      "Priority delivery & support",
    ],
    highlighted: false,
  },
  // ===== ALREADY TRADING =====
  {
    id: "website-redesign",
    title: "Website Refresh",
    price: "£550",
    category: "Refresh",
    audience: "trading",
    description: "For tradespeople and small businesses already running — we sort the online side properly",
    image: "",
    features: [
      "Complete modern redesign",
      "AI Assistant included free",
      "Email + Google profile sorted",
      "Live in 5 days",
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

// Add-ons section removed entirely. AI Assistant is now bundled free
// into every website tier; Booking is offered separately on request
// (not advertised as a paid add-on); Logo-only buyers can DM directly.
// Keeping the pricing section focused on the five core tiers reduces
// price-fatigue and makes the offer feel more confident.

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

        {/* Pricing grid split into two audience sections so visitors
            can self-select instead of scanning all five tiers at once.
            "Starting Something New" holds the four packages for new
            businesses (Landing, Brand Build, Business, Premium).
            "Already Trading" holds the Refresh tier for existing
            businesses. Same card design across both sections so the
            visual rhythm of the page stays consistent. */}

        {/* Section 1 — for new businesses */}
        <div className="text-center mb-8">
          <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#007bff] mb-2 block">
            Starting Something New
          </span>
          <p className="text-white/50 text-sm">
            For people launching a business or idea from scratch
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pricingPlans.filter((plan) => plan.audience === "starting").map((plan) => (
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

        {/* Section 2 — for existing businesses */}
        <div className="text-center mb-8 mt-16">
          <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#007bff] mb-2 block">
            Already Trading
          </span>
          <p className="text-white/50 text-sm">
            For tradespeople and small businesses who need an online refresh
          </p>
        </div>
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-4 md:gap-5">
          {pricingPlans.filter((plan) => plan.audience === "trading").map((plan) => (
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
                className={`self-start text-[10px] px-2 py-0.5 mb-3 bg-white/10 text-white/80 border-white/10`}
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
                </div>
              </div>
              <p className="text-xs text-white/60 mb-3 leading-relaxed">
                {plan.description}
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
                className="w-full rounded-full text-xs py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10"
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

      </div>
    </section>
  );
}
