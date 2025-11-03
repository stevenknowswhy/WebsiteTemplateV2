import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Rocket, Shield, Zap } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.home as any);

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={`${site.name} - Build Beautiful SaaS Applications`}
        description="Professional template website with authentication and payment processing. Start building your SaaS in minutes, not months."
        primaryCta={{
          label: "Get Started",
          href: user ? "/dashboard" : "/auth/login"
        }}
        secondaryCta={{
          label: "View Pricing",
          href: "/pricing"
        }}
      />

      {/* Features Section */}
      <Section
        title="Everything You Need to Launch"
        description="Professional-grade features built with modern web technologies"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Rocket className="h-8 w-8" />,
              title: "Fast Development",
              description: "Next.js 14 with App Router, TypeScript, and Tailwind CSS for rapid development.",
              features: ["Hot reloading", "TypeScript", "Modern React"]
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Authentication",
              description: "Secure passwordless authentication with Supabase magic links.",
              features: ["Magic links", "Server-side auth", "Protected routes"]
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "Payment Processing",
              description: "Complete Stripe integration with subscription management.",
              features: ["Recurring billing", "Webhook handling", "Customer portal"]
            }
          ].map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {feature.icon}
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technology Stack Section */}
      <Section
        title="Built with Modern Technology"
        description="Powered by the best tools in the industry"
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "Stripe",
            "shadcn/ui"
          ].map((tech, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-lg bg-background border border-border p-4">
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {tech.slice(0, 2)}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have launched their SaaS applications with our template.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={user ? "/dashboard" : "/auth/login"}>
                {user ? "Go to Dashboard" : "Start Building"}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}