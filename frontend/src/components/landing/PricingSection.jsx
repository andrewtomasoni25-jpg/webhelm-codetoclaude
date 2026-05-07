import { Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitTextReveal from "@/components/SplitTextReveal";
import { Badge } from "@/components/ui/badge";

// What's-included summary — three category cards rendered side by
// side instead of a row-based comparison table. Each card lists pure
// outcomes (zero tech jargon) and a small scope badge so visitors
// know which tiers the items apply to. Easier to scan than a table,
// and it mirrors the side-by-side rhythm of the pricing tiers above.
const comparisonCategories = [
  {
    id: "brand",
    title: "For Your Brand",
    scope: "Every Package",
    items: [
      "A brand that ties everything together so nothing looks mismatched",
      "Polished branding that builds trust at first glance",
      "Marketing materials ready to use the day you launch",
    ],
  },
  {
    id: "website",
    title: "For Your Website",
    scope: "Business + Premium",
    items: [
      "An AI assistant answers customer questions for you",
      "Email and domain that look professional, not personal",
      "Owned outright — no platform holding you hostage",
      "Captures leads even when you're sleeping",
      "Stops customers going to a competitor instead",
    ],
  },
  {
    id: "premium",
    title: "Only With Premium",
    scope: "Premium Tier",
    items: [
      "A website that looks unlike anyone else's",
      "Built to last 5 years without needing a redesign",
      "Direct line to the founder for any change you need",
      "Looks like a £5,000 site at half the price",
      "Same-day attention when you need a change",
    ],
  },
];

// comparisonColumns retired — the new side-by-side category cards
// don't need a tier-by-tier table header. The scope of each category
// (Every Package / Business + Premium / Premium Tier) is shown as a
// small badge inside the card itself.

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

        {/* Pricing grid split into two audience sections, laid out side
            by side on desktop (2:1 ratio so the four "starting" cards
            sit beside the single "trading" card without either feeling
            squashed). Stacks vertically on mobile/tablet for legibility.
            "Starting Something New" holds the four packages for new
            businesses (Landing, Brand Build, Business, Premium).
            "Already Trading" holds the Refresh tier. */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-10">
          {/* Section 1 — for new businesses */}
          <div>
            <div className="mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#007bff] mb-2 block">
                Starting Something New
              </span>
              <p className="text-white/50 text-sm">
                For people launching a business or idea from scratch
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
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
          </div>

          {/* Section 2 — for existing businesses */}
          <div>
            <div className="mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-[#007bff] mb-2 block">
                Already Trading
              </span>
              <p className="text-white/50 text-sm">
                For tradespeople and small businesses who need an online refresh
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-5">
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
          </div>
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

          {/* Three side-by-side category cards instead of a comparison
              table. Each card lists pure outcomes (zero tech jargon) and
              a small scope badge so visitors know which tiers the items
              apply to. The middle "For Your Website" card is highlighted
              because it represents the default Business tier. Cards
              stack vertically on mobile. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {comparisonCategories.map((cat) => {
              const isMiddle = cat.id === "website";
              return (
                <div
                  key={cat.id}
                  data-testid={`included-card-${cat.id}`}
                  className={`flex flex-col p-6 rounded-2xl bg-[#121212] border transition-all duration-300 hover:-translate-y-1 ${
                    isMiddle
                      ? "border-[#007bff]/60 ring-1 ring-[#007bff]/40 shadow-[0_0_30px_rgba(0,123,255,0.15)]"
                      : "border-white/10 hover:border-[#007bff]/40"
                  }`}
                >
                  <Badge
                    className={`self-start text-[10px] px-2 py-0.5 mb-4 ${
                      isMiddle
                        ? "bg-[#007bff] text-white border-none"
                        : "bg-white/10 text-white/80 border-white/10"
                    }`}
                  >
                    {cat.scope}
                  </Badge>
                  <h4 className="text-xl font-medium text-white leading-tight mb-5">
                    {cat.title}
                  </h4>
                  <ul className="space-y-3 flex-1">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#007bff]/15 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#007bff]" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-white/85 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
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
