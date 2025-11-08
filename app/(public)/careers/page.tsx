import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Heart,
  Users,
  Building,
  Shield,
  Zap,
  Globe,
  Target,
  Award,
  Star,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Lightbulb,
  Leaf,
  Eye,
  FileText,
  Mail,
  Phone,
  Wrench,
  HardHat,
  Cpu,
  Wifi,
  Smartphone,
  Building2,
  User,
  Calendar,
  ChevronRight,
  Mountain,
  Network,
  Flame,
  TreePine,
  Handshake,
  Crown,
  Rocket,
  Compass,
  Anchor,
  Sparkles
} from "lucide-react";

export default function CareersPage() {

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-red-600" />,
      title: "100% Paid Health Care",
      description: "Full medical, dental, and vision coverage"
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "3 Weeks Paid Vacation",
      description: "Plus 14 paid sick days annually"
    },
    {
      icon: <Star className="h-6 w-6 text-emerald-600" />,
      title: "Paid Holidays",
      description: "All City of San Francisco & Federal holidays"
    },
    {
      icon: <User className="h-6 w-6 text-purple-600" />,
      title: "Paid Parental Leave",
      description: "Generous maternity & paternity leave"
    },
    {
      icon: <Globe className="h-6 w-6 text-slate-600" />,
      title: "Flexible Work Options",
      description: "Hybrid and remote roles available"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-600" />,
      title: "Professional Development",
      description: "Ongoing learning stipends & certifications"
    },
    {
      icon: <Target className="h-6 w-6 text-indigo-600" />,
      title: "Mission-Driven Culture",
      description: "Build sustainable, privacy-first data infrastructure"
    }
  ];

  const jobCategories = [
    {
      title: "Smart City Partnerships",
      description: "Build relationships with cities and communities",
      color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      jobs: [
        {
          title: "City Partnerships Manager",
          location: "Hybrid (San Francisco)",
          description: "Lead partnerships with municipal governments to deploy Hello Smart Nodes and City Safe platforms",
          slug: "city-partnerships-manager"
        },
        {
          title: "Community Engagement Specialist",
          location: "Remote with travel",
          description: "Work with communities to ensure deployments meet local needs and benefit residents",
          slug: "community-engagement-specialist"
        },
        {
          title: "Policy & Government Relations",
          location: "Hybrid (Washington DC preferred)",
          description: "Navigate policy landscape and advocate for smart infrastructure at federal and state levels",
          slug: "policy-relations"
        }
      ]
    },
    {
      title: "Engineering & Innovation",
      description: "Design and build next-generation smart infrastructure",
      color: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20",
      icon: <Cpu className="h-8 w-8 text-emerald-600" />,
      jobs: [
        {
          title: "Hardware Engineer – Hello Smart Nodes",
          location: "Hybrid (Bay Area lab access)",
          description: "Design solar-powered smart nodes with Wi-Fi, environmental monitoring, and backup power systems",
          slug: "hardware-engineer-smart-nodes"
        },
        {
          title: "Full Stack Engineer – Civic Tech",
          location: "Remote or Hybrid",
          description: "Build dashboards for cities, communities, and partners to monitor infrastructure and impact",
          slug: "fullstack-civic-tech"
        },
        {
          title: "IoT & Embedded Systems Engineer",
          location: "Hybrid (SF preferred)",
          description: "Develop embedded software for environmental sensors, connectivity, and edge computing",
          slug: "iot-embedded-engineer"
        }
      ]
    },
    {
      title: "Impact & Sustainability",
      description: "Measure and maximize our public benefit impact",
      color: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20",
      icon: <TreePine className="h-8 w-8 text-green-600" />,
      jobs: [
        {
          title: "Impact Measurement Analyst",
          location: "Remote or Hybrid",
          description: "Track and report on digital equity, environmental benefits, and community impact metrics",
          slug: "impact-analyst"
        },
        {
          title: "Environmental Sustainability Manager",
          location: "Hybrid",
          description: "Lead environmental monitoring programs and sustainability initiatives across our network",
          slug: "sustainability-manager"
        },
        {
          title: "Privacy & Ethics Officer",
          location: "Hybrid (San Francisco)",
          description: "Ensure privacy-by-design principles and ethical AI in all our data collection and systems",
          slug: "privacy-ethics-officer"
        }
      ]
    },
    {
      title: "Operations & Finance",
      description: "Scale our operations and financial systems",
      color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20",
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      jobs: [
        {
          title: "Deployment Operations Manager",
          location: "Hybrid with field work",
          description: "Coordinate smart node installations, maintenance, and network expansion across multiple cities",
          slug: "deployment-operations-manager"
        },
        {
          title: "Finance Manager – PBC Reporting",
          location: "Hybrid",
          description: "Manage financial reporting for our Public Benefit Corporation structure and impact metrics",
          slug: "finance-pbc-manager"
        },
        {
          title: "Supply Chain & Procurement",
          location: "Hybrid",
          description: "Source and manage suppliers for solar panels, batteries, and smart infrastructure components",
          slug: "supply-chain-manager"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 dark:from-green-950 dark:via-blue-950 dark:to-slate-800" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                Work with Purpose
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Build Infrastructure That Serves Communities
                <span className="block text-3xl lg:text-4xl text-green-600 dark:text-green-400 mt-2">
                  Careers at Forhem PBC
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join our Public Benefit Corporation on a mission to transform urban infrastructure.
                  We're building smart city solutions that bridge the digital divide, generate revenue for cities,
                  and create sustainable communities.
                </p>
                <p className="text-lg text-muted-foreground">
                  As a PBC, we're legally committed to creating public benefit alongside shareholder value.
                  Your work here directly impacts communities, environmental sustainability, and digital equity.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Heart className="h-4 w-4 mr-2" />
                    View Open Positions
                  </Button>
                  <Button variant="outline" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Learn About Our Mission
                  </Button>
                </div>
              </div>
            </div>
            <Card className="h-96 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-green-600 dark:text-green-400">
                  <Heart className="h-24 w-24 mx-auto mb-4 text-green-600 dark:text-green-400" />
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">Public Benefit Corporation</p>
                  <p className="text-sm mt-2">Building infrastructure that serves people first</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* PBC Mission Section */}
      <Section
        kicker="Our Purpose"
        title="Why Work at a Public Benefit Corporation?"
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Heart className="h-6 w-6 text-green-600" />
              <span>Mission-Driven Impact</span>
            </h3>
            <div className="space-y-4">
              {[
                "Legally committed to creating public benefit alongside profit",
                "Bridge the digital divide with free community Wi-Fi",
                "Generate revenue for cities with zero taxpayer cost",
                "Advance environmental sustainability with solar-powered infrastructure",
                "Create economic opportunities for underserved communities"
              ].map((impact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="size-5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">{impact}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>Our Commitments</span>
            </h3>
            <div className="space-y-4">
              {[
                "25% revenue share with cities where we deploy",
                "20-30% revenue share with property owners",
                "Privacy-by-design in all data collection",
                "Environmental monitoring and public reporting",
                "Community-first approach to infrastructure decisions"
              ].map((commitment, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="size-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">{commitment}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section
        kicker="What We Offer"
        title="Benefits & Perks with Purpose"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer competitive benefits that support your well-being while enabling you to make a meaningful impact.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="flex items-start space-x-3">
                {benefit.icon}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Job Categories */}
      <Section
        id="open-positions"
        kicker="Join Our Mission"
        title="Current Openings"
        className="bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-slate-800"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join our team of mission-driven professionals building smart infrastructure that creates
            real public benefit. Every role here contributes to bridging the digital divide,
            advancing environmental sustainability, and creating more equitable communities.
          </p>
        </div>
        <div className="space-y-12">
          {jobCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">
                    {category.jobs.length} {category.jobs.length === 1 ? 'Position' : 'Positions'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-4">
                  {category.jobs.map((job, jobIndex) => (
                    <Link
                      key={jobIndex}
                      href={`/careers/${job.slug}`}
                      className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {job.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {job.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">
                            {job.location}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}