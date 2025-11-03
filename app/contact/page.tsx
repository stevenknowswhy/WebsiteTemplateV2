import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Globe, Users } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.contact as any);

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email Us",
    description: site.email,
    action: `mailto:${site.email}?subject=Inquiry`,
    actionText: "Send Email"
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Call Us",
    description: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    actionText: "Call Now"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Visit Us",
    description: site.address,
    action: "https://maps.google.com",
    actionText: "Get Directions"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Business Hours",
    description: "Mon-Fri: 9AM-6PM EST",
    action: null,
    actionText: null
  }
];

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 business hours. For urgent matters, please call us directly."
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We offer a complimentary 30-minute consultation to discuss your project and see how we can help."
  },
  {
    question: "What information should I include in my message?",
    answer: "Please include details about your project, timeline, budget (if comfortable sharing), and any specific requirements or questions you have."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! We work with clients worldwide and can accommodate different time zones for meetings and communication."
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Get in Touch"
        description="Have a question or want to discuss a project? We'd love to hear from you."
        primaryCta={{
          label: "Our Services",
          href: "/services"
        }}
        secondaryCta={{
          label: "View Pricing",
          href: "/pricing"
        }}
      />

      {/* Contact Information */}
      <Section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-muted-foreground mb-4">{info.description}</p>
                {info.action && (
                  <a
                    href={info.action}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {info.actionText} →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact Form */}
      <Section
        title="Send Us a Message"
        description="Fill out the form below and we'll get back to you as soon as possible"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Why Contact Us?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Free project consultation",
                    "Custom solution design",
                    "Technical support and guidance",
                    "Partnership opportunities",
                    "General inquiries"
                  ].map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Follow Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {site.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="Frequently Asked Questions"
        description="Quick answers to common questions"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Location Map Section */}
      <Section
        title="Find Us"
        description="Our office location in San Francisco"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive map would be embedded here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {site.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Emergency Contact */}
      <Section>
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            For urgent matters or technical emergencies, please call us directly for the fastest response time.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Emergency Line: +1 (555) 123-4567
            </a>
            <a
              href="mailto:emergency@templateappv2.com"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Emergency Email
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}