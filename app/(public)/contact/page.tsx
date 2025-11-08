"use client";

import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Users,
  FileText,
  Clock,
  Shield,
  Globe,
  Briefcase,
  Heart,
  Wifi,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sun,
  Lock
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedInterest, setSelectedInterest] = useState("");

  const faqItems = [
    {
      question: "How quickly can Hello Smart Nodes be deployed in our city?",
      answer: "Our typical deployment timeline is 90 days from initial consultation to full activation. This includes site assessment, permitting, installation, and commissioning. We handle all permitting and regulatory requirements at no cost to the city."
    },
    {
      question: "What are the costs to cities and property owners?",
      answer: "Zero cost to taxpayers and property owners. Hello Smart Nodes are installed and maintained at no cost through our revenue-sharing model. Cities receive 25% of revenue from node operations, while property owners receive 20-30% based on location and traffic."
    },
    {
      question: "How do Hello Smart Nodes generate revenue?",
      answer: "Revenue comes from service subscriptions including premium Wi-Fi services, IoT connectivity for businesses, environmental data subscriptions, and edge computing services. All revenue is shared with cities and property owners."
    },
    {
      question: "What data is collected and how is privacy protected?",
      answer: "We never collect personal data, ever. Our privacy-by-design approach means all data is anonymized at the edge with AES-256 encryption. We only collect aggregate environmental data (air quality, temperature, noise) and anonymized usage metrics. No personal identification data is collected without explicit consent. Learn more about our privacy commitment at forhem.com/privacy"
    },
    {
      question: "How are the nodes powered and maintained?",
      answer: "Hello Smart Nodes are 100% solar-powered with battery backup providing 48-72 hours of operation during grid outages. We handle all maintenance through quarterly remote checks and annual on-site servicing. Emergency maintenance is available 24/7. The solar design ensures zero grid dependency and clean energy operation."
    },
    {
      question: "What are the requirements for hosting a node?",
      answer: "Properties need approximately 4' x 6' of rooftop or ground space with good solar exposure. The installation requires about 4-6 hours with minimal disruption. Our team conducts a free site assessment to determine optimal placement."
    }
  ];

  const contactOptions = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "City Partnerships",
      description: "Deploy Hello Smart Nodes and City Safe platforms in your municipality.",
      contact: "cities@forhempbc.com",
      phone: "+1 (415) 555-0123",
      hours: "Mon-Fri, 8AM-6PM PT"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Property Owners",
      description: "Host nodes on your property and earn revenue share with zero installation cost.",
      contact: "property@forhempbc.com",
      phone: "+1 (415) 555-0145",
      hours: "Mon-Fri, 8AM-6PM PT"
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-600" />,
      title: "Investor Relations",
      description: "Learn about investment opportunities in our Public Benefit Corporation.",
      contact: "investors@forhempbc.com",
      phone: "+1 (415) 555-0167",
      hours: "Mon-Fri, 9AM-5PM PT"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Careers",
      description: "Join our mission-driven team building infrastructure that serves communities.",
      contact: "careers@forhempbc.com",
      phone: "+1 (415) 555-0189",
      hours: "Mon-Fri, 9AM-5PM PT"
    },
    {
      icon: <FileText className="h-8 w-8 text-cyan-600" />,
      title: "Media Relations",
      description: "Press inquiries, interviews, and media asset coordination.",
      contact: "media@forhempbc.com",
      phone: "+1 (415) 555-0111",
      hours: "Mon-Fri, 9AM-6PM PT"
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
      title: "Emergency Support",
      description: "24/7 support for critical infrastructure and emergency situations.",
      contact: "emergency@forhempbc.com",
      phone: "+1 (415) 555-0911",
      hours: "24/7 Emergency Support"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Get In Touch"
        title="Transform Your Community with Smart Infrastructure"
        description="Whether you're a city leader exploring smart deployments, a property owner interested in hosting nodes, or an investor passionate about public benefit, our team is ready to help you get started."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Wifi className="h-4 w-4 mr-2" />
            Deploy Hello Smart Nodes
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="h-4 w-4 mr-2" />
            Schedule City Demo
          </Button>
        </div>
      </Section>

      {/* Contact Options */}
      <Section
        kicker="How to Reach Us"
        title="Connect with the Right Team"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactOptions.map((contact, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {contact.icon}
                  <CardTitle className="text-lg">{contact.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-muted-foreground">{contact.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{contact.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{contact.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Locations */}
      <Section
        kicker="Global Presence"
        title="Where we operate"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Headquarters</h3>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-slate-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">San Francisco, California</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    55 9th Street, Suite 500<br />
                    San Francisco, CA 94103
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>+1 (415) 555-0100</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>info@databuilddirect.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <h3 className="text-2xl font-bold mt-8">Strategic Offices</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  location: "Arlington, Virginia",
                  focus: "Government Relations & Security"
                },
                {
                  location: "Denver, Colorado",
                  focus: "Operations & Engineering"
                },
                {
                  location: "Phoenix, Arizona",
                  focus: "Power Systems & Infrastructure"
                },
                {
                  location: "Seattle, Washington",
                  focus: "Technology & Innovation"
                }
              ].map((office, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold mb-1">{office.location}</h4>
                  <p className="text-xs text-muted-foreground">{office.focus}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-white/70">
                <Globe className="h-24 w-24 mx-auto mb-4" />
                <p>Global Operations Map</p>
                <p className="text-sm mt-2">(Strategic locations worldwide)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Smart Contact Form */}
      <Section
        kicker="Get Started"
        title="Smart Contact Form"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Tell us about your interests</h3>
              <p className="text-sm text-muted-foreground">
                We'll route your inquiry to the right team member and respond within 24 hours.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">I'm interested in...</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                >
                  <option value="">Select your interest</option>
                  <option value="city-demo">Scheduling a city demo</option>
                  <option value="host-node">Hosting Hello Smart Nodes</option>
                  <option value="investor">Investor information</option>
                  <option value="partnership">Partnership opportunities</option>
                  <option value="media">Press and media inquiries</option>
                  <option value="careers">Career opportunities</option>
                  <option value="technical">Technical questions</option>
                  <option value="other">Other inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  placeholder="Tell us about your community, property, or specific needs..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Response Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">City Partnerships</span>
                  <span className="text-sm font-medium text-green-600">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Property Owners</span>
                  <span className="text-sm font-medium text-green-600">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Investor Relations</span>
                  <span className="text-sm font-medium text-green-600">Within 48 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Media Requests</span>
                  <span className="text-sm font-medium text-green-600">Within 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Emergency Support</span>
                  <span className="text-sm font-medium text-red-600">Immediate response</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="size-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Smart Routing</h4>
                      <p className="text-xs text-muted-foreground">Your inquiry is automatically routed to the right team based on your interests</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="size-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Personalized Response</h4>
                      <p className="text-xs text-muted-foreground">You'll receive a tailored response with relevant information and next steps</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="size-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Dedicated Support</h4>
                      <p className="text-xs text-muted-foreground">A team member will be assigned to guide you through the entire process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

    {/* FAQ Accordion */}
      <Section
        kicker="Frequently Asked Questions"
        title="Common Questions About Hello Smart Nodes"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick Links */}
      <Section
        kicker="Resources"
        title="Quick Access"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Hello Smart Nodes",
              items: [
                { label: "Technical Specifications", href: "/solutions/hello-smart-node" },
                { label: "Revenue Calculator", href: "/tools/revenue-calculator" },
                { label: "Installation Guide", href: "/downloads/property-guide.pdf" },
                { label: "Privacy Policy", href: "/privacy" }
              ]
            },
            {
              title: "For Cities",
              items: [
                { label: "City Pilot Program", href: "/for-cities" },
                { label: "Impact Report", href: "/downloads/impact-report.pdf" },
                { label: "Case Studies", href: "/news" },
                { label: "Safety Features", href: "/solutions/city-safe" }
              ]
            },
            {
              title: "Company Information",
              items: [
                { label: "Why Forhem PBC?", href: "/why-forhem" },
                { label: "PBC Charter", href: "/pbc-charter" },
                { label: "Leadership Team", href: "/why-forhem#leadership" },
                { label: "News & Insights", href: "/news" }
              ]
            },
            {
              title: "Support & Resources",
              items: [
                { label: "Contact Support", href: "/contact" },
                { label: "Media Kit", href: "/downloads/media-kit.zip" },
                { label: "Careers", href: "/careers" },
                { label: "Investor Relations", href: "/investors" }
              ]
            }
          ].map((section, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <Heart className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join cities and property owners already deploying smart infrastructure that
            generates revenue, bridges the digital divide, and creates sustainable communities.
            Let's start building infrastructure that serves people first.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Wifi className="h-4 w-4 mr-2" />
              Start Your Smart City Journey
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4 mr-2" />
              Learn About Our PBC Mission
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}