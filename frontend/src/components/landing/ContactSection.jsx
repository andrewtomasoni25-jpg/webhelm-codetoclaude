import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import SplitTextReveal from "@/components/SplitTextReveal";
import MagneticButton from "@/components/MagneticButton";

// Use REACT_APP_BACKEND_URL if set (dev / self-hosted Python backend),
// otherwise fall back to a relative path — which on Vercel is served
// by the serverless function at /api/contact.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const LOGO_URL = "/hero-logo.png";

const projectTypes = [
  "Website Design",
  "Landing Page",
  "Website Redesign",
  "Logo Design",
  "Other",
];

const budgetRanges = [
  "£150 (Logo Design)",
  "£750 (Landing Page)",
  "£1,400 (Business)",
  "£2,200 (Premium)",
  "£1,300+ (Website Redesign)",
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      
      if (response.data.success) {
        toast.success("Message sent successfully!", {
          description: "We'll respond within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          businessName: "",
          projectType: "",
          budget: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#f5f5dc] mb-4 block">
            Get In Touch
          </span>
          <SplitTextReveal
            as="h2"
            data-testid="contact-title"
            className="text-3xl sm:text-4xl tracking-tight font-medium text-white mb-4"
          >
            Start Your Project
          </SplitTextReveal>
          <p className="text-base text-white/70 max-w-xl mx-auto">
            Tell us about your project and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="contact-name-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-transparent border-white/20 focus:border-[#007bff] text-white placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="contact-email-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="bg-transparent border-white/20 focus:border-[#007bff] text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-white/80">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    data-testid="contact-business-input"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Your company"
                    required
                    className="bg-transparent border-white/20 focus:border-[#007bff] text-white placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-white/80">
                    Project Type
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) =>
                      handleSelectChange("projectType", value)
                    }
                  >
                    <SelectTrigger
                      data-testid="contact-project-type-select"
                      className="bg-transparent border-white/20 focus:border-[#007bff] text-white"
                    >
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-white/10">
                      {projectTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white focus:bg-[#007bff]/20"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white/80">
                  Budget Range
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange("budget", value)}
                >
                  <SelectTrigger
                    data-testid="contact-budget-select"
                    className="bg-transparent border-white/20 focus:border-[#007bff] text-white"
                  >
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] border-white/10">
                    {budgetRanges.map((range) => (
                      <SelectItem
                        key={range}
                        value={range}
                        className="text-white focus:bg-[#007bff]/20"
                      >
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  data-testid="contact-message-input"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="bg-transparent border-white/20 focus:border-[#007bff] text-white placeholder:text-white/40 resize-none"
                />
              </div>

              <MagneticButton className="w-full block">
                <Button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={isSubmitting}
                  className="w-full bg-[#007bff] hover:bg-[#0056b3] text-white rounded-full py-6 text-base transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </MagneticButton>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-2xl bg-[#121212] border border-white/5 h-full">
              {/* Logo */}
              <div className="mb-8">
                <img
                  src={LOGO_URL}
                  alt="WebHelm Logo"
                  className="h-24 w-auto"
                />
              </div>
              
              <h3 className="text-xl font-medium text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#007bff]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Email</p>
                    <a
                      href="mailto:contact@webhelm.co"
                      className="text-white hover:text-[#007bff] transition-colors"
                    >
                      contact@webhelm.co
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#007bff]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Phone</p>
                    <a
                      href="tel:+447508997157"
                      className="text-white hover:text-[#007bff] transition-colors"
                    >
                      +44 7508997157
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#007bff]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#007bff]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Location</p>
                    <p className="text-white">Remote</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
