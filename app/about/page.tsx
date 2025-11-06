import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  Lightbulb,
  CheckCircle,
  Star
} from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.about as any);

const team = [
  {
    name: "Executive Leadership",
    role: "Vision & Strategy",
    bio: "Experienced team with backgrounds in urban planning, renewable energy, and public-private partnership development.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">EL</div>
  },
  {
    name: "Engineering & Innovation",
    role: "Technical Excellence",
    bio: "Expertise in IoT, edge computing, solar technology, and scalable urban infrastructure deployment.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">EI</div>
  },
  {
    name: "Community Partnerships",
    role: "Stakeholder Engagement",
    bio: "Dedicated to building strong relationships with municipalities, community organizations, and local stakeholders.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">CP</div>
  },
  {
    name: "Public Benefit Oversight",
    role: "Accountability & Impact",
    bio: "Ensuring our PBC commitments are met through transparent reporting and measurable impact assessment.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">PO</div>
  }
];

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Public Benefit First",
    description: "As a PBC, we prioritize positive community impact alongside sustainable business growth."
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Urban Innovation",
    description: "Reimagining public spaces as intelligent, sustainable hubs of community connection."
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Privacy by Design",
    description: "Embedding data protection and individual privacy into every aspect of our technology."
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Equitable Access",
    description: "Ensuring digital inclusion and economic opportunity for all communities we serve."
  }
];

const stats = [
  { label: "Cities Targeted", value: "50+" },
  { label: "Pilot Nodes", value: "10" },
  { label: "Potential Daily Users", value: "1M+" },
  { label: "Annual Carbon Savings", value: "500T" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="About Forhem"
        description="Transforming urban spaces into intelligent, equitable infrastructure that serves communities and drives sustainable progress."
        primaryCta={{
          label: "Our Solutions",
          href: "/solutions"
        }}
        secondaryCta={{
          label: "Investor Relations",
          href: "/investors"
        }}
      />

      {/* Mission Statement */}
      <Section>
        <div className="text-center mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            As a Public Benefit Corporation, Forhem is dedicated to transforming urban transit spaces into engines of positive change.
            We create intelligent, privacy-centered infrastructure that enhances public safety, digital equity, and environmental sustainability
            while fostering inclusive economic growth through innovative public-private partnerships.
          </p>
        </div>
      </Section>

      {/* Executive Summary Section */}
      <Section>
        <div className="mx-auto max-w-5xl">
          <ExecutiveSummary />
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values Section */}
      <Section
        title="Our Values"
        description="The principles that guide everything we do"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section
        title="Our Core Competencies"
        description="The expertise driving our public benefit mission"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Story Section */}
      <Section
        title="Our Journey"
        description="Key milestones in developing the City Smart Node vision"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {[
            {
              year: "2020",
              title: "Urban Research Phase",
              description: "Conducted extensive research on underutilized urban spaces and identified transit hubs as high-impact opportunities for smart infrastructure deployment."
            },
            {
              year: "2023",
              title: "Pilot Development",
              description: "Developed and tested initial CSN prototypes with solar power, edge computing, and privacy-first design principles in collaboration with municipal partners."
            },
            {
              year: "2026",
              title: "Market Street Launch",
              description: "Deploying 10 pilot nodes on San Francisco's Market Street in partnership with SFMTA, validating our technology and public benefit model at scale."
            }
          ].map((milestone, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                <h3 className="text-lg font-semibold mb-3">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section
        title="Why Partner With Forhem"
        description="What makes our approach unique and impactful"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Users className="h-8 w-8" />,
              title: "Public Benefit Commitment",
              description: "As a PBC, we're legally bound to balance profit with purpose, ensuring positive community impact in everything we do."
            },
            {
              icon: <Target className="h-8 w-8" />,
              title: "Zero-Capex Municipal Model",
              description: "Cities can deploy our infrastructure without upfront costs, sharing in revenue while gaining valuable insights and services."
            },
            {
              icon: <Award className="h-8 w-8" />,
              title: "Privacy-First Technology",
              description: "All data processing happens locally with GDPR-compliant anonymization, ensuring citizen privacy while providing useful analytics."
            }
          ].map((reason, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="text-primary">{reason.icon}</div>
                  <span>{reason.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Location Section */}
      <Section
        title="Get in Touch"
        description="We'd love to hear from you"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Visit Us</h3>
              </div>
              <p className="text-muted-foreground">
                {site.address}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Email Us</h3>
              </div>
              <p className="text-muted-foreground">
                {site.email}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Heart className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Follow Us</h3>
              </div>
              <div className="flex space-x-4">
                {site.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}