import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Box, Building2, ArrowRight, Users, Globe, Zap } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.home as any);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Infrastructure Resilience Platform"
        title="Three layers. One resilient network."
        description="From sovereign underground facilities to distributed edge nodes, we deliver compute capacity where traditional data centers can't reach."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <ArrowRight className="h-4 w-4 mr-2" />
            Explore Solutions
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-4 w-4 mr-2" />
            Contact Our Team
          </Button>
        </div>
      </Section>

      {/* 3-Pillar Ecosystem Section */}
      <Section
        kicker="Our Ecosystem"
        title="Infrastructure for any challenge"
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
                <Button variant="outline" className="w-full group-hover:bg-green-700 group-hover:text-white">
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
              icon: <Shield className="h-8 w-8 text-slate-600" />,
              title: "Maximum Resilience",
              description: "Infrastructure engineered to withstand civilization-level disruptions and maintain operations under any conditions."
            },
            {
              icon: <Zap className="h-8 w-8 text-gray-600" />,
              title: "Rapid Deployment",
              description: "From contract to operational in 90 days or less, significantly faster than traditional construction methods."
            },
            {
              icon: <Globe className="h-8 w-8 text-green-600" />,
              title: "Global Coverage",
              description: "Deploy capacity anywhere from urban centers to remote locations where traditional data centers cannot reach."
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: "Expert Partnership",
              description: "End-to-end managed services with 24/7 support from infrastructure specialists with decades of experience."
            },
            {
              icon: <Box className="h-8 w-8 text-purple-600" />,
              title: "Flexible Scaling",
              description: "Service-based economics with predictable monthly costs and no upfront capital expenditure."
            },
            {
              icon: <Building2 className="h-8 w-8 text-red-600" />,
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
              <h4 className="font-semibold mb-2">{useCase.title}</h4>
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
                  <h4 className="text-lg font-bold">Underground Foundation</h4>
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
                  <h4 className="text-lg font-bold">Micro DCaaS Layer</h4>
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
                  <h4 className="text-lg font-bold">City Safe Edge</h4>
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
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
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
    </div>
  );
}