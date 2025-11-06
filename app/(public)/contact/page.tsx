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
  Briefcase
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Get In Touch"
        title="Start building sovereign infrastructure together."
        description="Whether you're exploring our solutions, seeking partnership opportunities, or ready to deploy resilient infrastructure, our team is standing by to help."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <Mail className="h-4 w-4 mr-2" />
            Contact Sales
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-4 w-4 mr-2" />
            Schedule a Tour
          </Button>
        </div>
      </Section>

      {/* Contact Options */}
      <Section
        kicker="How to Reach Us"
        title="Connect with the right team"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Building2 className="h-8 w-8 text-slate-600" />,
              title: "Sales & Solutions",
              description: "Discuss your infrastructure requirements and explore how our three-pillar ecosystem can meet your needs.",
              contact: "sales@databuilddirect.com",
              phone: "+1 (415) 555-0123",
              hours: "Mon-Fri, 8AM-6PM PT"
            },
            {
              icon: <Shield className="h-8 w-8 text-red-600" />,
              title: "Security Team",
              description: "For security assessments, compliance discussions, and technical security questions.",
              contact: "security@databuilddirect.com",
              phone: "+1 (415) 555-0145",
              hours: "24/7 Emergency Support"
            },
            {
              icon: <Briefcase className="h-8 w-8 text-green-600" />,
              title: "Investor Relations",
              description: "Investment opportunities, financial information, and partnership discussions.",
              contact: "investors@databuilddirect.com",
              phone: "+1 (415) 555-0167",
              hours: "Mon-Fri, 9AM-5PM PT"
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: "Careers",
              description: "Career opportunities, recruitment inquiries, and team culture questions.",
              contact: "careers@databuilddirect.com",
              phone: "+1 (415) 555-0189",
              hours: "Mon-Fri, 9AM-5PM PT"
            },
            {
              icon: <FileText className="h-8 w-8 text-purple-600" />,
              title: "Media Relations",
              description: "Press inquiries, interview requests, and media asset coordination.",
              contact: "media@databuilddirect.com",
              phone: "+1 (415) 555-0111",
              hours: "Mon-Fri, 9AM-6PM PT"
            },
            {
              icon: <Globe className="h-8 w-8 text-orange-600" />,
              title: "Partnerships",
              description: "Technology partnerships, alliance opportunities, and ecosystem integration.",
              contact: "partners@databuilddirect.com",
              phone: "+1 (415) 555-0133",
              hours: "Mon-Fri, 8AM-5PM PT"
            }
          ].map((contact, index) => (
            <Card key={index} className="p-6">
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

      {/* Contact Form */}
      <Section
        kicker="Quick Contact"
        title="Send us a message"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
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
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <option>Sales Inquiry</option>
                  <option>Technical Question</option>
                  <option>Partnership Opportunity</option>
                  <option>Investor Relations</option>
                  <option>Career Inquiry</option>
                  <option>Media Request</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  placeholder="Tell us about your infrastructure requirements..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800">
                Send Message
              </Button>
            </form>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Response Times</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sales Inquiries</span>
                  <span className="text-sm font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technical Support</span>
                  <span className="text-sm font-medium">Within 4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Emergencies</span>
                  <span className="text-sm font-medium">Immediate response</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Partner Inquiries</span>
                  <span className="text-sm font-medium">Within 48 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Media Requests</span>
                  <span className="text-sm font-medium">Within 2 hours</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                    For critical infrastructure emergencies
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span className="font-mono">+1 (415) 555-0911</span>
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Available 24/7 for facility emergencies
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Quick Links */}
      <Section
        kicker="Resources"
        title="Quick access"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Download Resources",
              items: [
                { label: "Product Overview", href: "#" },
                { label: "Security Brief", href: "#" },
                { label: "Investor Deck", href: "#" },
                { label: "Technical Specs", href: "#" }
              ]
            },
            {
              title: "Explore Solutions",
              items: [
                { label: "Underground Data Centers", href: "/underground" },
                { label: "Micro DCaaS", href: "/micro-dcaas" },
                { label: "City Safe Nodes", href: "/city-safe-nodes" },
                { label: "Security Overview", href: "/security" }
              ]
            },
            {
              title: "Company Information",
              items: [
                { label: "Our Mission", href: "/mission" },
                { label: "Investor Relations", href: "/investors" },
                { label: "Company Updates", href: "/updates" },
                { label: "Career Opportunities", href: "/careers" }
              ]
            },
            {
              title: "Support & Services",
              items: [
                { label: "Technical Support", href: "#" },
                { label: "Customer Portal", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Service Status", href: "#" }
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
                      className="text-sm text-muted-foreground hover:text-slate-900 dark:hover:text-white transition-colors"
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
        <Card className="p-8 text-center bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to build sovereign infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team of infrastructure specialists is ready to help you design and deploy
            the perfect solution for your specific requirements. Let's start a conversation
            about your resilience needs.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              <Mail className="h-4 w-4 mr-2" />
              Contact Sales Team
            </Button>
            <Button variant="outline" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Schedule Facility Tour
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}