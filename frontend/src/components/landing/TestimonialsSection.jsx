import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SplitTextReveal from "@/components/SplitTextReveal";

const testimonials = [
  {
    id: 1,
    name: "Daniel Rivera",
    role: "CEO, AuraMax Audio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    quote:
      "A world-class product showcase that rivals brands ten times our size. Their AI-driven design tools took us from concept to launch in under two weeks — pre-orders came in the day we went live.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Voss",
    role: "Brand Manager, Veloretti",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    quote:
      "The new site captures the feel of our bikes perfectly — clean, modern, effortless. Traffic to product pages is up 45% and the checkout flow finally feels as premium as our hardware.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Bellingham",
    role: "Creative Director, Aurelius",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    quote:
      "Refined, editorial, confident — exactly the tone a luxury brand needs online. WebHelm understood the brief immediately and the final site makes our competitors look dated.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Thompson",
    role: "Owner, Bean & Brew",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    quote:
      "Professional, fast, and easy to work with. The new online ordering system has been a game-changer for our cafes. Honestly wish we'd found them sooner — would've saved us a year of wrestling with our old site.",
    rating: 5,
  },
  {
    id: 5,
    name: "James Mitchell",
    role: "Shop Owner, Heritage Cuts",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
    quote:
      "Walk-ins are up, bookings are up, and the site has that classic barbershop feel we wanted. The onboarding took a couple extra rounds of feedback to nail the tone, but they were patient the whole way.",
    rating: 5,
  },
  {
    id: 6,
    name: "Olivia Hartley",
    role: "Founder, Pink Fashion",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    quote:
      "We needed a site as bold as our collections and WebHelm nailed it. The AI-optimised product layout and lookbook sections have driven a noticeable jump in engagement. Enquiries up 60%.",
    rating: 5,
  },
  {
    id: 7,
    name: "Priya Kapoor",
    role: "Head of Research, MDH Lab",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&q=80",
    quote:
      "Explaining what we do to non-technical visitors was always tricky. WebHelm built a site that communicates clearly without dumbing it down. Had a couple of small accessibility tweaks to request after launch — handled quickly and professionally.",
    rating: 5,
  },
  {
    id: 8,
    name: "Ethan Whitaker",
    role: "Founder, IX Designs",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    quote:
      "As a design studio we're picky, and WebHelm delivered something we're genuinely proud to show clients. Bold typography, tight layouts, zero bloat. Won us two pitches in the first month of being live.",
    rating: 5,
  },
  {
    id: 9,
    name: "Rachel Okonkwo",
    role: "Managing Director, Green",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80",
    quote:
      "The new site reflects our sustainability mission without feeling preachy. Qualified enquiries are up roughly 50%. Took one round of revisions to get the tone right, but the team was patient throughout.",
    rating: 4,
  },
  {
    id: 10,
    name: "Tom Hargreaves",
    role: "Marketing Lead, Thunder Energy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    quote:
      "Bold, fast, and punchy — exactly what an energy drink site should be. Site speed is noticeably faster too, visitors don't bounce from the product pages like they used to.",
    rating: 5,
  },
  {
    id: 11,
    name: "Sophie Laurent",
    role: "Art Director, Foxtail",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&q=80",
    quote:
      "Bringing on WebHelm was the best decision we made this year. The site photographs beautifully in every browser. Only feedback was the mobile menu animation felt too subtle at first — one email later, sorted.",
    rating: 5,
  },
  {
    id: 12,
    name: "Alex Petrov",
    role: "Product Lead, OppoEnco",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80",
    quote:
      "Conversion rate on our product pages jumped 28% after the redesign. The AI-optimised layout actually seems to work. Small gripe: wish we'd scoped a blog from day one — but that's on us, not WebHelm.",
    rating: 4,
  },
  {
    id: 13,
    name: "Michael Chen",
    role: "Founder, Furniture Co.",
    avatar: "https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg?w=150&q=80",
    quote:
      "Online orders have tripled since launch. Customers constantly compliment the site's ease of use. Launch day had a small hiccup with the product filter — fixed in under an hour.",
    rating: 5,
  },
  {
    id: 14,
    name: "Hannah Boateng",
    role: "Operations Manager, Cyphrr",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    quote:
      "Tech users are ruthless about UX — and ours love the new site. Clean, fast, trustworthy. The analytics dashboard they set up is a nice bonus we actually use every week.",
    rating: 5,
  },
  {
    id: 15,
    name: "Jordan Reeves",
    role: "Founder, Black Level",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
    quote:
      "Honestly sceptical about AI-enhanced design at first — half expected something generic. What we got felt genuinely hand-crafted. Teco pushes the tools rather than letting them drive. We'll be recommending WebHelm to other brands.",
    rating: 5,
  },
  {
    id: 16,
    name: "Ben Harrington",
    role: "Co-founder, Wavebit",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    quote:
      "Four months in and the lead-capture system just keeps delivering. Not flashy — just effective. That's exactly what we asked for and exactly what we got.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Testimonials
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="testimonials-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Client Success Stories
          </SplitTextReveal>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          data-testid="testimonials-carousel"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  data-testid={`testimonial-card-${testimonial.id}`}
                  className="h-full p-8 rounded-2xl glass"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-[#007bff]/30 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-[#f5c518] text-[#f5c518]"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#f5f5dc]/90 text-base leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#007bff]/30"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious
              data-testid="testimonials-prev"
              className="relative static bg-white/5 hover:bg-white/10 border-white/10 text-white"
            />
            <CarouselNext
              data-testid="testimonials-next"
              className="relative static bg-white/5 hover:bg-white/10 border-white/10 text-white"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
