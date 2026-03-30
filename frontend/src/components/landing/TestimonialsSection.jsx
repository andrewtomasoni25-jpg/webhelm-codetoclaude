import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "James Mitchell",
    role: "Owner, IronFit Gym",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
    quote:
      "WebHelm completely transformed our online presence. Our new website has increased membership sign-ups by 40% in just three months. The design perfectly captures our gym's energy and motivation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Marketing Director, Elite Cuts",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    quote:
      "Professional, fast, and easy to work with. The WebHelm team understood our vision immediately and delivered a stunning website that our clients love. The booking integration has been a game-changer.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, Urban Bites",
    avatar: "https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg?w=150&q=80",
    quote:
      "The final website exceeded all expectations. Our online orders have tripled since launch, and customers constantly compliment our site's design and ease of use. Highly recommend WebHelm!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Testimonials
          </span>
          <h2
            data-testid="testimonials-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Client Success Stories
          </h2>
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
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#f5c518] text-[#f5c518]"
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
