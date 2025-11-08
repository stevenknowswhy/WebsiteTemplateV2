import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, Wifi, Battery, DollarSign, Shield, ArrowRight, Calculator, Zap } from "lucide-react";

export default function ForBuildingOwnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="For Property Owners & Developers"
        title="Monetize Your Rooftop Space with Zero Installation Cost"
        description="Host Hello Smart Nodes and earn revenue share while getting backup power, 5G connectivity, and edge computing capabilities for your property."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Building2 className="h-4 w-4 mr-2" />
            Apply to Host Nodes
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/tools/revenue-calculator">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Revenue
            </Link>
          </Button>
        </div>
      </Section>

      {/* Hello Smart Node Overview */}
      <Section
        kicker="Hello Smart Node™"
        title="Revenue Share · Zero-Cost Install · 3-Year Renewable Terms"
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Wifi className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Key Benefits</h3>
            </div>
            <div className="space-y-4">
              {[
                { icon: <DollarSign className="h-5 w-5 text-green-600" />, benefit: "20-30% revenue share from node operations" },
                { icon: <Battery className="h-5 w-5 text-yellow-600" />, benefit: "Backup power during outages" },
                { icon: <Wifi className="h-5 w-5 text-purple-600" />, benefit: "Free 5G connectivity for your property" },
                { icon: <Shield className="h-5 w-5 text-blue-600" />, benefit: "Enhanced property security & monitoring" },
                { icon: <Zap className="h-5 w-5 text-orange-600" />, benefit: "Edge computing capabilities for smart buildings" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm">{item.benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Technical Specifications</h3>
            <div className="space-y-4">
              {[
                { label: "Power Source", value: "Solar panels + battery storage" },
                { label: "Connectivity", value: "5G + Wi-Fi 6 + Edge compute" },
                { label: "Installation Time", value: "4-6 hours" },
                { label: "Space Required", value: "4' x 6' rooftop area" },
                { label: "Weight", value: "350 lbs fully installed" },
                { label: "Term Length", value: "3 years, renewable" }
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

      {/* Revenue Calculator Placeholder */}
      <Section
        kicker="ROI Calculator"
        title="Estimate Your Revenue Potential"
      >
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <div className="text-center">
            <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Interactive Revenue Calculator</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {/* TODO: Replace with actual revenue calculator component */}
              <span className="text-sm">Interactive calculator will show projected revenue based on location, building size, and traffic patterns</span>
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/tools/revenue-calculator">
                <Calculator className="h-4 w-4 mr-2" />
                Launch Calculator
              </Link>
            </Button>
          </div>
        </Card>
      </Section>

      {/* Installation Process */}
      <Section
        kicker="Installation Process"
        title="Simple, Fast, Zero-Cost Installation"
      >
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            {
              step: "1",
              title: "Site Assessment",
              description: "Our team evaluates your rooftop for solar exposure, structural capacity, and optimal placement.",
              duration: "1-2 days"
            },
            {
              step: "2",
              title: "Permitting",
              description: "We handle all permits and regulatory requirements at no cost to you.",
              duration: "2-4 weeks"
            },
            {
              step: "3",
              title: "Installation",
              description: "Professional installation takes 4-6 hours with minimal disruption.",
              duration: "1 day"
            },
            {
              step: "4",
              title: "Commissioning",
              description: "System testing, activation, and training on monitoring dashboard.",
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

      {/* Property Types */}
      <Section
        kicker="Ideal Properties"
        title="Perfect for Various Building Types"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              type: "Commercial Office",
              description: "Modern office buildings with flat rooftops and high tenant demand for connectivity.",
              icon: <Building2 className="h-8 w-8 text-blue-600" />
            },
            {
              type: "Industrial Warehouses",
              description: "Large roof spaces with excellent solar exposure and minimal tenant disruption.",
              icon: <Building2 className="h-8 w-8 text-gray-600" />
            },
            {
              type: "Retail Centers",
              description: "Shopping centers and malls with high foot traffic and multiple tenants.",
              icon: <Building2 className="h-8 w-8 text-green-600" />
            },
            {
              type: "Multi-Family Housing",
              description: "Apartment complexes and condominiums seeking enhanced resident amenities.",
              icon: <Building2 className="h-8 w-8 text-purple-600" />
            },
            {
              type: "Hospitality",
              description: "Hotels and resorts requiring premium connectivity for guests.",
              icon: <Building2 className="h-8 w-8 text-orange-600" />
            },
            {
              type: "Educational",
              description: "Schools and universities expanding digital infrastructure for students.",
              icon: <Building2 className="h-8 w-8 text-red-600" />
            }
          ].map((property, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {property.icon}
                  <CardTitle className="text-lg">{property.type}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <DollarSign className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Start Earning Revenue from Your Rooftop
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join property owners already generating income while providing valuable
            services to their communities.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact?interest=host-node">
                <Building2 className="h-4 w-4 mr-2" />
                Apply to Host Nodes
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/downloads/property-owner-guide.pdf">
                <ArrowRight className="h-4 w-4 mr-2" />
                Download Property Guide
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}