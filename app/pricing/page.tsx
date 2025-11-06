"use client";

import { useState } from 'react';
import React from 'react';
import { site } from "@/lib/siteConfig";
import Section from "@/components/Section";
import PricingCard from "@/components/PricingCard";
import PricingToggle from "@/components/PricingToggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans, getFeatureComparison } from "@/lib/plans";
import { Check, X, Shield, Zap, Headphones, Database } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with global CDN",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Premium support for paid plans",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Unlimited Storage",
      description: "No limits on Pro and Enterprise plans",
    },
  ];

  const featureComparison = getFeatureComparison();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section>
        <div className="text-center mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Choose the perfect plan for your needs. All plans include core features
            with scalable options as you grow.
          </p>
        </div>
      </Section>

      {/* Pricing Cards */}
      <Section>
        <div className="text-center mb-8">
          <PricingToggle
            isYearly={isYearly}
            onToggle={setIsYearly}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isYearly={isYearly}
            />
          ))}
        </div>
      </Section>

      {/* Feature Comparison */}
      <Section
        title="Feature Comparison"
        description="Compare features across all plans"
      >
        <div className="overflow-x-auto">
          <Card>
            <CardHeader>
              <CardTitle>Features at a Glance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-medium">Feature</div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center font-medium">
                    {plan.name}
                  </div>
                ))}

                {Object.entries(featureComparison).map(([feature, values]) => (
                  <React.Fragment key={feature}>
                    <div className="py-2">{feature}</div>
                    {values.map((value, index) => (
                      <div key={`${feature}-${index}`} className="text-center py-2">
                        {value === "✅" ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : value === "❌" ? (
                          <X className="h-4 w-4 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">{value}</span>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Key Features */}
      <Section
        title="Everything You Need"
        description="Powerful features included in every plan"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        title="Frequently Asked Questions"
        description="Everything you need to know about our pricing"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              question: "Can I change plans anytime?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards including Visa, MasterCard, and American Express."
            },
            {
              question: "Is there a free trial?",
              answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start."
            },
            {
              question: "Do you offer refunds?",
              answer: "We offer a 30-day money-back guarantee for all new subscriptions."
            },
            {
              question: "Can I cancel anytime?",
              answer: "Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period."
            },
            {
              question: "Do you offer custom plans?",
              answer: "Yes, we can create custom plans for enterprise customers with specific needs."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team is here to help you choose the right plan for your needs.
            Get in touch and we'll be happy to assist you.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${site.email}?subject=Pricing Inquiry`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Email Sales
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
