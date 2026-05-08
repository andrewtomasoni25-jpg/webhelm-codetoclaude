import { Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitTextReveal from "@/components/SplitTextReveal";
import { Badge } from "@/components/ui/badge";

// What's Included comparison table. Rows grouped by outcome category,
// columns showing tier-by-tier coverage. Labels styled to match the
// "Starting Something New / Already Trading" blue uppercase headers
// from the pricing section above so the page reads as one rhythm.
const comparisonGroups = [
  {
    title: "For Your Brand",
    rows: [
      { label: "A brand that ties everything together so nothing looks mismatched", tiers: [true, true, true] },
      { label: "Polished branding that builds trust at first glance", tiers: [true, true, true] },
      { label: "Marketing materials ready to use the day you launch", tiers: [true, true, true] },
      { label: "A visual identity built around your business — not a template", tiers: [true, true, true] },
      { label: "The kind of branding that makes customers think you're more established than you are", tiers: [true, true, true] },
      { label: "Email signatures and invoice headers that look properly branded", tiers: [true, true, true] },
    ],
  },
  {
    title: "For Your Website",
    rows: [
      { label: "An AI assistant answers customer questions for you", tiers: [false, true, true] },
      { label: "Email and domain that look professional, not personal", tiers: [false, true, true] },
      { label: "Owned outright — no platform holding you hostage", tiers: [false, true, true] },
      { label: "Captures leads even when you're sleeping", tiers: [false, true, true] },
      { label: "Stops customers going to a competitor instead", tiers: [false, true, true] },
    ],
  },
  {
    title: "Only With Premium",
    rows: [
      { label: "A website that looks unlike anyone else's", tiers: [false, false, true] },
      { label: "Built to last 5 years without needing a redesign", tiers: [false, false, true] },
      { label: "Direct line to the founder for any change you need", tiers: [false, false, true] },
      { label: "Looks like a £5,000 site at half the price", tiers: [false, false, true] },
      { label: "Same-day attention when you need a change", tiers: [false, false, true] },
    ],
  },
];

// Three-column comparison header — Full Brand Build (branding entry),
// Business (the highlighted default), Premium (top tier). The Website
// Refresh tier sits in its own section above ("Already Trading") and
// doesn't need to appear in the comparison since most of its checks
// would mirror Business anyway.
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
    description: "We watch your site 24/7 and step in the moment something breaks. Need a phone number changed or a price updated? Text us and it's done within 48 hours.",
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
    description: "Everything in Helm, plus active growth. Each month we run a Google review campaign so your stars climb, keep your Business Profile fresh, and send you a clear performance report.",
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
    description: "Everything in Studio, plus a part-time digital assistant on retainer. Ten branded social posts a month, local SEO pushed across UK directories, and a full annual rebuild so your site never goes stale.",
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
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-1">
            Whether you're starting out or already trading — pick the package that fits. No hidden fees, no surprises.
          </p>
          <p className="text-[#007bff]/70 text-xs flex items-center justify-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            AI-enhanced workflows mean faster delivery & better results
          </p>
        </div>

        {/* All five tiers in a single side-by-side row, like the
            original pricing layout. Each card carries a tiny audience
            tag at the top ("Starting Something New" / "Already
            Trading") so customers know at a glance who the package is
            for. The existing category badges (Starter / Most Popular /
            etc.) sit beneath the audience tag. */}
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

        {/* Note for existing-business owners — the Starting Something
            New tiers aren't exclusive to new businesses. Anyone already
            running a business can pick them too; Refresh is just the
            most popular jumping-off point for existing setups. Small
            tinted bar so it doesn't crowd the cards but stays visible. */}
        <div className="mt-6 max-w-2xl mx-auto px-4 py-3 rounded-full bg-[#007bff]/[0.06] border border-[#007bff]/15 text-center">
          <p className="text-xs md:text-sm text-white/70" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="text-[#007bff] font-semibold">Already up &amp; running?</span>{" "}
            Any tier works for you — Website Refresh is just our most popular starting point for existing businesses.
          </p>
        </div>

        {/* Comparison table — friendly plain-English breakdown of what's
            included in each package. Prices live on the cards above so
            this section stays focused on value (what you get), not cost.
            Sticky header keeps tier names visible while scrolling on
            mobile. */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h3 className="font-stencil text-2xl md:text-3xl font-medium text-white mb-3">
              What's Included
            </h3>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              No jargon, no surprises — here's exactly what each package gets you.
            </p>
          </div>

          {/* Comparison table — three tiers across the top, outcome
              rows grouped by category below. Group labels styled with
              the same blue uppercase letterspaced look as the pricing
              section's "Starting Something New" / "Already Trading"
              headers, so the whole page reads with one rhythm. */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]/90 overflow-x-auto">
            <div className="min-w-[640px] md:min-w-0 divide-y divide-white/10">
              {/* Column headers — tier names only, no prices. Prices
                  live on the cards above so the table stays focused
                  on what's included, not what it costs. */}
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

              {/* Grouped feature rows — group labels styled to match
                  the blue uppercase letterspaced headers from the
                  pricing section above (Starting Something New / etc). */}
              {comparisonGroups.map((group) => (
                <div key={group.title} className="divide-y divide-white/10">
                  <div className="bg-[#007bff]/[0.06] px-4 md:px-7 py-3.5 md:py-4 border-y border-[#007bff]/15">
                    <span className="text-xs md:text-sm tracking-[0.25em] uppercase font-bold text-[#007bff]">
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
                          ) : (
                            <span className="text-white/30 text-lg md:text-xl">·</span>
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

        {/* Monthly Care — compact editorial table format. Three rows
            in a slim panel with a hairline divider, no card boxes. The
            Studio tier (middle) gets a faint blue tint as the default
            recommendation. Drops the section's visual weight by ~70%
            compared to the previous three tiled cards. */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-3 block">
              Optional · Cancel any time
            </span>
            <h3 className="font-stencil text-2xl md:text-3xl font-medium text-white mb-3">
              Monthly Care
            </h3>
            <p className="text-white/55 text-base max-w-2xl mx-auto">
              Keep your launchpad sharp, secure and growing — your reviews climbing,
              your Google profile fresh, and someone real to call when things change.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
            {carePlans.map((plan) => (
              <div
                key={plan.id}
                data-testid={`care-row-${plan.id}`}
                className={`grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto_auto] items-center gap-4 md:gap-6 p-5 md:p-6 transition-colors ${
                  plan.highlighted
                    ? "bg-[#007bff]/[0.06]"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Tier name + price (mobile: combined) */}
                <div className="flex items-baseline gap-3 md:contents">
                  <h4 className="text-base md:text-lg font-medium text-white whitespace-nowrap md:w-32">
                    {plan.title}
                  </h4>
                  <span className="md:hidden text-sm text-white/60">
                    · {plan.price}
                  </span>
                </div>

                {/* Description (md+ only — mobile shows it on the next row) */}
                <p className="hidden md:block text-sm text-white/65 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price (md+ only) */}
                <span className="hidden md:block text-base font-medium text-white whitespace-nowrap">
                  {plan.price}
                </span>

                {/* CTA button — small, compact */}
                <Button
                  onClick={scrollToContact}
                  className={`rounded-full text-xs px-4 py-1.5 h-auto whitespace-nowrap shrink-0 ${
                    plan.highlighted
                      ? "bg-[#007bff] hover:bg-[#0056b3] text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  Choose
                </Button>

                {/* Mobile description — full-width row beneath title/price */}
                <p className="md:hidden col-span-2 text-sm text-white/65 leading-relaxed -mt-2">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
