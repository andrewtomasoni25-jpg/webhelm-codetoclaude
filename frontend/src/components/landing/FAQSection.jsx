import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "How long does it take to build a website?",
    answer:
      "Timeline depends on the project scope. A landing page typically takes 1-2 weeks, while a full website can take 3-6 weeks. We'll provide a detailed timeline after understanding your requirements.",
  },
  {
    id: "faq-2",
    question: "What's included in the website design service?",
    answer:
      "Our website design service includes custom design mockups, responsive development, basic SEO optimization, contact form integration, and a content management system. We also provide training on how to update your site.",
  },
  {
    id: "faq-3",
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes! We offer monthly maintenance packages that include security updates, backups, performance monitoring, and minor content updates. This ensures your website stays secure and up-to-date.",
  },
  {
    id: "faq-4",
    question: "Can I update the website myself after launch?",
    answer:
      "Absolutely! All our websites come with a user-friendly content management system (CMS). We'll provide comprehensive training so you can easily update text, images, and other content.",
  },
  {
    id: "faq-5",
    question: "What do you need from me to get started?",
    answer:
      "To get started, we'll need your logo, brand guidelines (if available), content for the pages, and any images you'd like to use. During our discovery call, we'll discuss your goals and vision in detail.",
  },
  {
    id: "faq-6",
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment options. Typically, we require 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            FAQ
          </span>
          <h2
            data-testid="faq-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white"
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          data-testid="faq-accordion"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              data-testid={faq.id}
              className="border border-white/10 rounded-xl px-6 data-[state=open]:border-[#007bff]/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-white hover:no-underline py-6 text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
