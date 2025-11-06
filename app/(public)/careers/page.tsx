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
      title: "Sales & Business Development",
      color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20",
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      jobs: [
        {
          title: "Sales Manager – Data Infrastructure",
          location: "Hybrid (San Francisco)",
          description: "Lead enterprise and government partnerships to expand our underground and edge data network",
          slug: "sales-manager"
        },
        {
          title: "Account Executive – Partner Program",
          location: "Remote",
          description: "Drive growth through reseller, partner, and channel development",
          slug: "account-executive"
        },
        {
          title: "Sales Development Representative (SDR)",
          location: "Remote",
          description: "Generate leads and qualify prospects for our partner and enterprise pipeline",
          slug: "sdr"
        }
      ]
    },
    {
      title: "Engineering & Technical",
      description: "Design and build resilient infrastructure systems",
      color: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20",
      icon: <Cpu className="h-8 w-8 text-emerald-600" />,
      jobs: [
        {
          title: "Senior Systems Engineer – Edge Data Centers",
          location: "Hybrid (SF preferred)",
          description: "Design the resilient core of our micro and underground data centers",
          slug: "senior-systems-engineer"
        },
        {
          title: "Full Stack Software Engineer",
          location: "Remote or Hybrid",
          description: "Develop our data monitoring, partner, and operations dashboards",
          slug: "full-stack-engineer"
        },
        {
          title: "Electrical Engineer – Smart Node Hardware",
          location: "Hybrid (Bay Area lab access)",
          description: "Design solar-powered edge nodes and smart city hardware systems",
          slug: "electrical-engineer"
        }
      ]
    },
    {
      title: "Finance & Operations",
      description: "Manage financial operations and organizational logistics",
      color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20",
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      jobs: [
        {
          title: "Accounting Manager",
          location: "Hybrid",
          description: "Lead financial reporting, investor reporting, and grant management",
          slug: "accounting-manager"
        },
        {
          title: "Operations Coordinator",
          location: "Hybrid",
          description: "Coordinate deployments, vendors, and logistics for node rollouts",
          slug: "operations-coordinator"
        }
      ]
    },
    {
      title: "Administrative & Executive Support",
      description: "Support leadership and manage office operations",
      color: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20",
      icon: <User className="h-8 w-8 text-amber-600" />,
      jobs: [
        {
          title: "Executive Assistant",
          location: "Hybrid (San Francisco)",
          description: "Support leadership operations, scheduling, and investor relations",
          slug: "executive-assistant"
        },
        {
          title: "Receptionist / Office Administrator",
          location: "Hybrid",
          description: "Be the front face of our San Francisco office — organize, welcome, and support our growing team",
          slug: "receptionist"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">
                Join Our Team
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Build the Future With Us
                <span className="block text-3xl lg:text-4xl text-slate-600 dark:text-slate-400 mt-2">
                  Careers at DataBuildDirect
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join our team building resilient infrastructure for critical systems. We're looking for passionate professionals who want to make a difference in data center technology, distributed computing, and smart city solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Open Positions
                  </Button>
                  <Button variant="outline" size="lg">
                    <Building className="h-4 w-4 mr-2" />
                    Learn About Us
                  </Button>
                </div>
              </div>
            </div>
            <Card className="h-96 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950 dark:to-slate-900 border-blue-200 dark:border-blue-800">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-slate-600 dark:text-slate-400">
                  <Building className="h-24 w-24 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Building Resilient Infrastructure</p>
                  <p className="text-sm mt-2">(Join our team of innovators)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section
        kicker="What We Offer"
        title="Benefits & Perks"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer competitive benefits and perks to support our team's growth and well-being.
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
        kicker="Join Our Team"
        title="Current Openings"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're looking for talented professionals to join our growing team and help build the future of resilient infrastructure.
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