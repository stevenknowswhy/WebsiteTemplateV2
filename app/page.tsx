import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import MapDebug from "@/components/MapDebug";
import { Shield, MapPin, Building2, ArrowRight, Users, Wifi, Battery, TreePine, Box, Zap, Globe, Sun, Lock, Eye } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.home as any);

export default function Home() {
  return (
    <>
      {/* Hero Section - The Smart Router */}
      <Section
        kicker="Solar-Powered Privacy Infrastructure"
        title="Building Cities That Protect, Not Pry"
        description="100% solar-powered smart nodes with zero personal data collection. Privacy by design, transparency by law."
      >
        {/* Interactive City Map */}
        <div className="mt-8 mb-8 relative">
          <div className="bg-gradient-to-br from-slate-100 to-green-50 dark:from-slate-800 dark:to-green-950 rounded-2xl p-6 border border-border/50">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Node Deployments</h3>
              <p className="text-muted-foreground text-sm">
                Explore our solar-powered privacy infrastructure across San Francisco
              </p>
            </div>
            <GoogleMap
              address="55 9th Street, San Francisco, CA 94103"
              lat={37.7749}
              lng={-122.4194}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Wifi className="h-4 w-4 text-blue-800" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-200">Hello Smart Nodes</span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300">Community connectivity hubs</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Shield className="h-4 w-4 text-green-800" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-200">City Safe Nodes</span>
                </div>
                <p className="text-xs text-green-800 dark:text-green-300">Critical infrastructure protection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Solar Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Sun className="h-6 w-6 text-yellow-800 dark:text-yellow-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-200">100% Solar Powered</h3>
                <p className="text-sm text-green-800 dark:text-green-300">Clean energy independence</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Every Smart Node operates entirely on solar power with battery backup, ensuring 24/7 operation during grid outages while reducing carbon footprint by 500 tons annually.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800 dark:text-green-300">Zero grid dependency</span>
              <Link href="/privacy#solar-efficiency" className="text-blue-800 hover:text-blue-900 text-sm font-medium underline">
                Learn more →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200">Zero Personal Data</h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">Privacy by engineering</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              We never collect, store, or process personal information. All data is anonymized at the edge with AES-256 encryption, making privacy our foundation, not a feature.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">0 breaches in 5+ years</span>
              <Link href="/privacy" className="text-blue-800 hover:text-blue-900 text-sm font-medium underline">
                Privacy details →
              </Link>
            </div>
          </Card>
        </div>

        {/* Audience Tiles */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/for-cities" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-green-600/20 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-800 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">City Leaders</h3>
                    <p className="text-sm text-muted-foreground">Transform your urban infrastructure</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Deploy privacy-first smart nodes with zero taxpayer cost. Generate revenue while providing public safety, free Wi-Fi, and environmental monitoring—without compromising resident privacy.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-4 w-4 text-green-800" />
                  <span className="text-sm text-green-800 font-medium">Zero personal data collected</span>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-green-800 group-hover:text-white">
                  Explore City Solutions
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/for-building-owners" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-blue-600/20 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Building Owners</h3>
                    <p className="text-sm text-muted-foreground">Monetize your rooftop space</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Host solar-powered Smart Nodes with zero installation cost. Earn revenue share while getting backup power, 5G connectivity, and edge computing—all with zero personal data processing.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <Sun className="h-4 w-4 text-yellow-800" />
                  <span className="text-sm text-yellow-800 font-medium">Solar-powered with battery backup</span>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white">
                  Apply to Host Nodes
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/investors" className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:border-slate-600/20 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors flex items-center justify-center">
                    <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Investors</h3>
                    <p className="text-sm text-muted-foreground">Join the infrastructure revolution</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Invest in the future of urban infrastructure. Dual-product model with strong unit economics and rapid scalability across global markets.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-slate-600 group-hover:text-white">
                  View Investor Deck
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white">
            <ArrowRight className="h-4 w-4 mr-2" />
            Join the Pilot Program
          </Button>
          <Button variant="outline" size="lg">
            <Wifi className="h-4 w-4 mr-2" />
            Schedule City Demo
          </Button>
        </div>
      </Section>

      {/* The Forhem Network 3-Step Explainer */}
      <Section
        kicker="How It Works"
        title="The Forhem Network: Node → Data → Impact"
        description="Three simple steps transform urban spaces into intelligent, connected communities."
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="size-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-10 w-10 text-green-800 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Deploy Nodes</h3>
            <p className="text-muted-foreground">
              Smart nodes installed on rooftops and city streets provide solar power, 5G connectivity, and edge computing capabilities.
            </p>
          </div>

          <div className="text-center">
            <div className="size-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <Wifi className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Collect Data</h3>
            <p className="text-muted-foreground">
              Privacy-first data collection generates insights for traffic management, environmental monitoring, and public safety.
            </p>
          </div>

          <div className="text-center">
            <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <TreePine className="h-10 w-10 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Create Impact</h3>
            <p className="text-muted-foreground">
              Cities generate revenue, buildings earn income, and communities get better services with zero taxpayer cost.
            </p>
          </div>
        </div>
      </Section>

      {/* Trust Strip */}
      <Section
        kicker="Trusted By Leading Cities"
        title="Pilot Partners & Early Adopters"
      >
        <div className="bg-muted/50 rounded-2xl p-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {/* TODO: Replace with actual pilot partner logos */}
            {["City of San Francisco", "Seattle DOT", "Portland Smart City", "Oakland Municipal", "San Jose Innovation", "Berkeley Tech"].map((city, index) => (
              <div key={index} className="text-center">
                <div className="size-16 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-2 border border-border/50">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solutions Overview */}
      <Section
        kicker="Our Solutions"
        title="Two Connected Product Lines, One Unified Network"
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Link href="/underground" className="group">
            <Card className="h-full transition-all hover:shadow-lg border-border/50 hover:border-slate-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-slate-900 group-hover:bg-slate-700 transition-colors flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Underground Data Centers</h3>
                    <p className="text-sm text-muted-foreground mt-1">The sovereign backbone.</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Sovereign-grade infrastructure built below ground to withstand EMP, blast, and grid disruptions. Built for mission-critical workloads.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white">
                  Explore Underground Network
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/micro-dcaas" className="group">
            <Card className="h-full transition-all hover:shadow-lg border-border/50 hover:border-gray-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-gray-700 group-hover:bg-gray-500 transition-colors flex items-center justify-center">
                    <Box className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Micro DCaaS</h3>
                    <p className="text-sm text-muted-foreground mt-1">Modular power and compute, anywhere.</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Micro Data Centers as a Service — modular pods, turnkey deployment, 90-day rollout. Rapidly deployable compute units delivered as a fully managed service.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-gray-600 group-hover:text-white">
                  See Micro DCaaS in Action
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/city-safe-nodes" className="group">
            <Card className="h-full transition-all hover:shadow-lg border-border/50 hover:border-green-600/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-green-800 group-hover:bg-green-600 transition-colors flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">City Safe Nodes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Edge resilience for connected cities.</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Hardened urban edge nodes co-located within city grids for public continuity. Resilient compute capacity at street level.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-green-800 group-hover:text-white">
                  Discover City Safe Nodes
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </Section>

      {/* Key Benefits Section */}
      <Section
        kicker="Platform Advantages"
        title="Why choose DataBuildDirect?"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 text-slate-800" />,
              title: "Maximum Resilience",
              description: "Infrastructure engineered to withstand civilization-level disruptions and maintain operations under any conditions."
            },
            {
              icon: <Zap className="h-8 w-8 text-gray-800" />,
              title: "Rapid Deployment",
              description: "From contract to operational in 90 days or less, significantly faster than traditional construction methods."
            },
            {
              icon: <Globe className="h-8 w-8 text-green-800" />,
              title: "Global Coverage",
              description: "Deploy capacity anywhere from urban centers to remote locations where traditional data centers cannot reach."
            },
            {
              icon: <Users className="h-8 w-8 text-blue-800" />,
              title: "Expert Partnership",
              description: "End-to-end managed services with 24/7 support from infrastructure specialists with decades of experience."
            },
            {
              icon: <Box className="h-8 w-8 text-purple-800" />,
              title: "Flexible Scaling",
              description: "Service-based economics with predictable monthly costs and no upfront capital expenditure."
            },
            {
              icon: <Building2 className="h-8 w-8 text-red-800" />,
              title: "Future-Ready",
              description: "Infrastructure designed for tomorrow's requirements including AI/ML workloads and smart city integration."
            }
          ].map((benefit, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {benefit.icon}
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Use Cases Section */}
      <Section
        kicker="Deployment Scenarios"
        title="Built for every requirement"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Enterprise Infrastructure",
              description: "Hybrid deployments combining underground security with edge flexibility for comprehensive coverage."
            },
            {
              title: "Government & Defense",
              description: "Sovereign underground facilities with edge nodes for continuity of operations."
            },
            {
              title: "Smart Cities",
              description: "Urban resilience nodes providing edge compute for municipal services and IoT."
            },
            {
              title: "AI/ML Workloads",
              description: "Distributed training and inference across underground facilities and edge nodes."
            },
            {
              title: "Disaster Recovery",
              description: "Geographically distributed infrastructure with automated failover capabilities."
            },
            {
              title: "Edge Applications",
              description: "Low-latency processing for real-time applications and IoT deployments."
            }
          ].map((useCase, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Ecosystem Integration Section */}
      <Section
        kicker="Integration"
        title="How it fits together"
        description="From core to edge, our three-layer approach provides comprehensive coverage for any infrastructure requirement."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="size-8 rounded-full bg-slate-900 flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Underground Foundation</h3>
                  <p className="text-muted-foreground mt-1">
                    Sovereign-grade backbone providing maximum security and resilience for core infrastructure and mission-critical applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="size-8 rounded-full bg-gray-600 flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Micro DCaaS Layer</h3>
                  <p className="text-muted-foreground mt-1">
                    Modular distributed compute nodes providing rapid deployment and flexible capacity where traditional data centers can't reach.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="size-8 rounded-full bg-green-700 flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">City Safe Edge</h3>
                  <p className="text-muted-foreground mt-1">
                    Urban resilience nodes ensuring continuous operations for smart cities, municipal services, and edge computing applications.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
            <div className="text-center p-8">
              <div className="text-muted-foreground mb-4">
                <div className="inline-flex items-center justify-center space-x-4">
                  <div className="size-3 rounded-full bg-slate-900" />
                  <div className="size-16 border-t-2 border-dashed border-gray-400" />
                  <div className="size-3 rounded-full bg-gray-600" />
                  <div className="size-16 border-t-2 border-dashed border-gray-400" />
                  <div className="size-3 rounded-full bg-green-700" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Ecosystem Diagram Visualization<br />
                <span className="text-xs">(Core → Regional → Municipal)</span>
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to deploy resilient infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team of infrastructure specialists is ready to help you design and deploy
            the perfect solution for your specific requirements.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Users className="h-4 w-4 mr-2" />
              Schedule a Consultation
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/solutions">
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore All Solutions
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}