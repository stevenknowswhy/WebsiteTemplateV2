import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wifi, Battery, TreePine, Users, DollarSign, Shield, Zap, Camera, Gauge, Cpu, Cloud, Sun } from "lucide-react";

export default function HelloSmartNodePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Hello Smart Node™"
        title="Community Infrastructure That Pays for Itself"
        description="Solar-powered smart nodes providing free Wi-Fi, environmental monitoring, and backup power while generating revenue for cities and property owners."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Calculate Revenue
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact?interest=hello-smart-node">
              <Wifi className="h-4 w-4 mr-2" />
              Request Demo
            </Link>
          </Button>
        </div>
      </Section>

      {/* Key Features */}
      <Section
        kicker="Capabilities"
        title="Everything Your Community Needs in One Compact Node"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <Wifi className="h-8 w-8 text-blue-600" />,
              title: "Free Public Wi-Fi",
              description: "High-speed internet access for everyone in the community, bridging the digital divide."
            },
            {
              icon: <Battery className="h-8 w-8 text-yellow-600" />,
              title: "Backup Power",
              description: "Battery backup provides power during outages for essential devices and communications."
            },
            {
              icon: <TreePine className="h-8 w-8 text-green-600" />,
              title: "Environmental Monitoring",
              description: "Real-time air quality, temperature, and noise data for community health insights."
            },
            {
              icon: <Camera className="h-8 w-8 text-purple-600" />,
              title: "Smart Security",
              description: "AI-enhanced monitoring for public safety while respecting privacy by design."
            },
            {
              icon: <Cloud className="h-8 w-8 text-cyan-600" />,
              title: "Edge Computing",
              description: "Local data processing for smart city applications and reduced latency."
            },
            {
              icon: <Gauge className="h-8 w-8 text-orange-600" />,
              title: "Real-time Analytics",
              description: "Community insights and usage patterns accessible through municipal dashboards."
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technical Specifications */}
      <Section
        kicker="Specifications"
        title="Built for Reliability and Performance"
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Cpu className="h-6 w-6 text-blue-600" />
              <span>Hardware Specifications</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Dimensions", value: "4' x 6' footprint, 8' height" },
                { label: "Weight", value: "350 lbs fully installed" },
                { label: "Solar Panels", value: "2kW capacity with tilt optimization" },
                { label: "Battery Storage", value: "10kWh lithium-ion backup" },
                { label: "Connectivity", value: "5G, Wi-Fi 6, LoRaWAN, Ethernet" },
                { label: "Processing", value: "Quad-core ARM processor, 8GB RAM" },
                { label: "Operating Temperature", value: "-40°F to 140°F (-40°C to 60°C)" },
                { label: "Weather Rating", value: "IP67 rated for outdoor deployment" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Sun className="h-6 w-6 text-yellow-600" />
              <span>Power & Performance</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Power Generation", value: "8-12 kWh daily (location dependent)" },
                { label: "Backup Duration", value: "48-72 hours critical loads" },
                { label: "Wi-Fi Range", value: "300-500 ft radius" },
                { label: "Concurrent Users", value: "100+ connections" },
                { label: "Data Processing", value: "Real-time local analytics" },
                { label: "Uptime", value: "99.9% availability target" },
                { label: "Maintenance", value: "Quarterly remote, annual on-site" },
                { label: "Lifespan", value: "15-20 years with proper maintenance" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Benefits for Stakeholders */}
      <Section
        kicker="Stakeholder Benefits"
        title="Value for Every Community Member"
      >
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">For Communities</h3>
            <ul className="text-left space-y-2 text-sm text-muted-foreground">
              <li>• Free internet access for residents</li>
              <li>• Digital inclusion for underserved areas</li>
              <li>• Environmental data and insights</li>
              <li>• Enhanced public safety monitoring</li>
              <li>• Community gathering spaces with connectivity</li>
            </ul>
          </Card>

          <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">For Cities</h3>
            <ul className="text-left space-y-2 text-sm text-muted-foreground">
              <li>• 25% revenue share from operations</li>
              <li>• Zero taxpayer cost for deployment</li>
              <li>• Real-time environmental monitoring</li>
              <li>• Enhanced emergency communications</li>
              <li>• Smart city IoT connectivity platform</li>
            </ul>
          </Card>

          <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">For Property Owners</h3>
            <ul className="text-left space-y-2 text-sm text-muted-foreground">
              <li>• 20-30% revenue share</li>
              <li>• Zero installation cost</li>
              <li>• Backup power for essential systems</li>
              <li>• Enhanced property value and amenities</li>
              <li>• Free 5G connectivity for property</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Installation Process */}
      <Section
        kicker="Deployment"
        title="Simple 4-Step Installation Process"
      >
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            {
              step: "1",
              title: "Site Assessment",
              description: "Our team evaluates solar exposure, structural capacity, and optimal placement for maximum community benefit.",
              duration: "1-2 days"
            },
            {
              step: "2",
              title: "Permitting & Approval",
              description: "We handle all permits, zoning, and regulatory requirements at no cost to property owners or cities.",
              duration: "2-4 weeks"
            },
            {
              step: "3",
              title: "Installation",
              description: "Professional installation takes 4-6 hours with minimal disruption to daily operations.",
              duration: "1 day"
            },
            {
              step: "4",
              title: "Commissioning",
              description: "System testing, network activation, and training on monitoring dashboard and analytics.",
              duration: "1 day"
            }
          ].map((step, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg font-bold">{step.step}</span>
              </div>
              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                {step.duration}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* ROI Calculator Preview */}
      <Section
        kicker="ROI Calculator"
        title="See Your Revenue Potential"
      >
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <div className="text-center">
            <DollarSign className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Interactive Revenue Calculator</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Calculate your potential revenue based on location, traffic patterns, and local demographics.
              See how Hello Smart Nodes can become a revenue-generating asset for your property or city.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/tools/revenue-calculator">
                <DollarSign className="h-4 w-4 mr-2" />
                Launch Revenue Calculator
              </Link>
            </Button>
          </div>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <Wifi className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join cities and property owners already generating revenue while providing essential
            services to their communities.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact?interest=hello-smart-node">
                <Wifi className="h-4 w-4 mr-2" />
                Request Hello Smart Node Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/downloads/hello-smart-node-specs.pdf">
                <Shield className="h-4 w-4 mr-2" />
                Download Technical Specs
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}