import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, TrendingUp, Award, MapPin, Users, FileText, Zap } from "lucide-react";

export default function UpdatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Latest News"
        title="Building the future of sovereign infrastructure."
        description="Stay updated with our latest developments, partnerships, and milestones as we expand the world's most resilient digital infrastructure ecosystem."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <FileText className="h-4 w-4 mr-2" />
            Subscribe to Updates
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-4 w-4 mr-2" />
            Follow on LinkedIn
          </Button>
        </div>
      </Section>

      {/* Featured Updates */}
      <Section
        kicker="Featured News"
        title="Recent milestones"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-700"></div>
            <CardHeader>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span>November 1, 2025</span>
                <span>•</span>
                <span className="text-slate-600">Major Announcement</span>
              </div>
              <CardTitle className="text-2xl">DataBuildDirect Launches Three-Pillar Sovereign Infrastructure Ecosystem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Revolutionary approach combines underground data centers, micro DCaaS, and urban edge nodes to create world's most resilient digital infrastructure network.
              </p>
              <Button variant="outline">
                Read Full Announcement
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-green-900 to-green-700"></div>
            <CardHeader>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4" />
                <span>October 28, 2025</span>
                <span>•</span>
                <span className="text-green-600">Partnership</span>
              </div>
              <CardTitle className="text-2xl">Strategic Partnership with Major Metropolitan Area for City Safe Nodes Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Landmark agreement to deploy 50 City Safe Nodes across downtown core, creating most resilient urban infrastructure network in North America.
              </p>
              <Button variant="outline">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Recent Updates Grid */}
      <Section
        kicker="All Updates"
        title="Latest developments"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              date: "October 25, 2025",
              type: "Financial",
              icon: <TrendingUp className="h-5 w-5 text-green-600" />,
              title: "Series B Funding Round Oversubscribed at $850M",
              description: "Strategic investment from sovereign wealth funds and infrastructure funds values company at $8.5B pre-money."
            },
            {
              date: "October 20, 2025",
              type: "Technical",
              icon: <Building2 className="h-5 w-5 text-slate-600" />,
              title: "First Underground Facility Reaches Full Operational Capacity",
              description: "Sovereign-grade facility now supporting critical government workloads with 99.999% uptime certification."
            },
            {
              date: "October 15, 2025",
              type: "Partnership",
              icon: <Users className="h-5 w-5 text-blue-600" />,
              title: "Alliance with Global Cloud Provider for Hybrid Sovereign Solutions",
              description: "Joint offering combines sovereign infrastructure with cloud scalability for enterprise customers."
            },
            {
              date: "October 10, 2025",
              type: "Product",
              icon: <Zap className="h-5 w-5 text-orange-600" />,
              title: "Micro DCaaS Service Wins Two Major Industry Awards",
              description: "Recognized for innovation and excellence in modular infrastructure deployment and service delivery."
            },
            {
              date: "October 5, 2025",
              type: "Expansion",
              icon: <MapPin className="h-5 w-5 text-red-600" />,
              title: "Three New Underground Sites Announced for 2026 Deployment",
              description: "Strategic expansion increases sovereign coverage by 300% with facilities in key geographic locations."
            },
            {
              date: "September 30, 2025",
              type: "Recognition",
              icon: <Award className="h-5 w-5 text-purple-600" />,
              title: "CEO Named to Fortune's 40 Under 40 in Infrastructure",
              description: "Leadership recognized for vision in building sovereign digital infrastructure ecosystem."
            }
          ].map((update, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2 mb-3">
                {update.icon}
                <span className="text-xs font-medium text-gray-500 uppercase">{update.type}</span>
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">{update.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{update.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{update.date}</span>
                <Button variant="ghost" size="sm">
                  Read More →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Press Kit Section */}
      <Section
        kicker="Media Resources"
        title="Press kit & media assets"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Company Overview",
              description: "One-page company summary and value proposition",
              download: "databuilddirect-overview.pdf"
            },
            {
              title: "Leadership Bios",
              description: "Executive team profiles and headshots",
              download: "databuilddirect-leadership.pdf"
            },
            {
              title: "Fact Sheet",
              description: "Key facts, figures, and company milestones",
              download: "databuilddirect-factsheet.pdf"
            },
            {
              title: "Logo & Brand",
              description: "Official logos and brand guidelines",
              download: "databuilddirect-brand.zip"
            },
            {
              title: "Technical Specs",
              description: "Detailed infrastructure specifications",
              download: "databuilddirect-technical.pdf"
            },
            {
              title: "Image Gallery",
              description: "High-resolution facility images and renders",
              download: "databuilddirect-images.zip"
            },
            {
              title: "Investor Deck",
              description: "Investment opportunity presentation",
              download: "databuilddirect-investors.pdf"
            },
            {
              title: "Security Overview",
              description: "Security framework and certifications",
              download: "databuilddirect-security.pdf"
            }
          ].map((resource, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">{resource.title}</h4>
              <p className="text-xs text-muted-foreground mb-4">{resource.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                Download
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Media Coverage */}
      <Section
        kicker="In The News"
        title="Recent media coverage"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              source: "Wall Street Journal",
              headline: "Sovereign Data Centers: The New Frontier in National Security",
              excerpt: "DataBuildDirect's underground facilities represent the gold standard in critical infrastructure protection...",
              date: "October 28, 2025",
              url: "#"
            },
            {
              source: "TechCrunch",
              headline: "How DataBuildDirect is Building the Pentagon's Dream Infrastructure",
              excerpt: "The three-pillar approach combines unprecedented resilience with scalability...",
              date: "October 25, 2025",
              url: "#"
            },
            {
              source: "Forbes",
              headline: "Meet the $8.5B Unicorn Securing Nations' Digital Infrastructure",
              excerpt: "DataBuildDirect's recent funding round highlights investor confidence in sovereign infrastructure...",
              date: "October 22, 2025",
              url: "#"
            },
            {
              source: "Reuters",
              headline: "Major City Deploys Revolutionary Data Center Network for Emergency Response",
              excerpt: "City Safe Nodes will ensure critical services remain operational during any disruption...",
              date: "October 20, 2025",
              url: "#"
            }
          ].map((article, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm font-semibold text-slate-900 mb-2">{article.source}</div>
              <h4 className="font-semibold mb-2 line-clamp-2">{article.headline}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{article.date}</span>
                <Button variant="ghost" size="sm">
                  Read Article →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Stay connected with sovereign infrastructure developments
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get exclusive insights into our progress, industry analysis, and early access to
            major announcements. Join our community of infrastructure leaders and innovators.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
            />
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </Card>
      </Section>
    </div>
  );
}