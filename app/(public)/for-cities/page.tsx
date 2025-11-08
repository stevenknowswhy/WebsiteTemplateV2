import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Wifi, Users, TrendingUp, TreePine, Award, ArrowRight, MapPin } from "lucide-react";

export default function ForCitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="For Municipal Leaders"
        title="Transform Your City with Zero-Taxpayer Infrastructure"
        description="Deploy smart nodes city-wide that generate revenue, enhance public safety, and bridge the digital divide—all at zero cost to taxpayers."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <MapPin className="h-4 w-4 mr-2" />
            Schedule City Demo
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact?interest=pilot">
              <ArrowRight className="h-4 w-4 mr-2" />
              Join Pilot Program
            </Link>
          </Button>
        </div>
      </Section>

      {/* City Benefits Grid */}
      <Section
        kicker="City Benefits"
        title="Revenue, Safety, and Digital Equity Without Taxpayer Burden"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <TrendingUp className="h-8 w-8 text-green-600" />,
              title: "Revenue Generation",
              description: "Cities earn revenue share from node deployments while reducing infrastructure costs."
            },
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: "Public Safety",
              description: "AI-monitored lighting, emergency beacons, and real-time surveillance for safer streets."
            },
            {
              icon: <Wifi className="h-8 w-8 text-purple-600" />,
              title: "Digital Equity",
              description: "Free public Wi-Fi bridges the connectivity gap for underserved communities."
            },
            {
              icon: <TreePine className="h-8 w-8 text-green-500" />,
              title: "Environmental Data",
              description: "Air quality and noise monitoring help cities meet climate and sustainability goals."
            }
          ].map((benefit, index) => (
            <Card key={index} className="p-6 text-center">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{benefit.icon}</div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Deployment Process */}
      <Section
        kicker="Implementation"
        title="90-Day City Pilot Program"
        description="From planning to deployment in under 3 months with comprehensive support."
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <div className="space-y-6">
              {[
                { step: "1", title: "Site Assessment", description: "Identify optimal locations for smart node deployment based on traffic, connectivity needs, and community impact." },
                { step: "2", title: "Permitting & Approval", description: "Handle all permitting, zoning, and regulatory requirements with our experienced municipal liaison team." },
                { step: "3", title: "Installation", description: "Deploy nodes with minimal disruption to city operations. Most installations complete in under 4 hours per location." },
                { step: "4", title: "Commissioning", description: "Test all systems, train city staff, and launch services with comprehensive support and monitoring." }
              ].map((phase, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="size-8 rounded-full bg-green-600 flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">{phase.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold">{phase.title}</h4>
                    <p className="text-muted-foreground mt-1">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4">Pilot Program Metrics</h3>
            <div className="space-y-4">
              {[
                { metric: "10-25", label: "Nodes per pilot city" },
                { metric: "90 Days", label: "Average deployment time" },
                { metric: "$0", label: "Taxpayer cost" },
                { metric: "15-25%", label: "City revenue share" },
                { metric: "24/7", label: "Monitoring & support" },
                { metric: "3 Years", label: "Standard pilot duration" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-bold text-lg text-green-600">{item.metric}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Success Stories */}
      <Section
        kicker="Case Studies"
        title="Cities Leading the Way"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              city: "San Francisco, CA",
              title: "Mission District Smart Corridor",
              description: "15 nodes generating $45K annual revenue while providing free Wi-Fi to 12,000 residents monthly.",
              metrics: ["15 Nodes", "$45K Revenue", "12K Users"]
            },
            {
              city: "Seattle, WA",
              title: "Transit Hub Enhancement",
              description: "20 nodes at major bus stops improving passenger safety and reducing transit times by 18%.",
              metrics: ["20 Nodes", "18% Faster Transit", "Zero Cost"]
            }
          ].map((study, index) => (
            <Card key={index} className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">{study.city}</CardTitle>
                <h4 className="text-lg font-semibold text-green-600">{study.title}</h4>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <div className="flex gap-3">
                  {study.metrics.map((metric, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your City?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the growing network of cities deploying next-generation infrastructure
            with zero taxpayer cost and immediate benefits.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/contact?interest=city-demo">
                <Users className="h-4 w-4 mr-2" />
                Schedule City Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/downloads/city-pilot-guide.pdf">
                <ArrowRight className="h-4 w-4 mr-2" />
                Download Pilot Guide
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}