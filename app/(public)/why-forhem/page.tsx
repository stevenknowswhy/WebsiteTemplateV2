import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Shield, Users, Globe, Award, TreePine, Target, CheckCircle, Sun, Lock } from "lucide-react";

export default function WhyForhemPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Privacy-Powered Purpose"
        title="Building Infrastructure That Respects People and Planet"
        description="As a Public Benefit Corporation, we're redefining urban infrastructure with solar-powered privacy protection—creating value while putting fundamental rights first."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Heart className="h-4 w-4 mr-2" />
            Learn About Our Mission
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pbc-charter">
              <Shield className="h-4 w-4 mr-2" />
              Read PBC Charter
            </Link>
          </Button>
        </div>
      </Section>

      {/* PBC Mission Statement */}
      <Section
        kicker="Public Benefit Corporation"
        title="Profit with Purpose"
        description="We're legally committed to creating public benefit alongside shareholder value."
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-bold">Our Mission</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To transform urban infrastructure into a public utility that generates revenue for cities,
              income for property owners, and essential services for communities—all while advancing
              digital equity and environmental sustainability.
            </p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-bold">Our Vision</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A world where every city block has access to clean power, high-speed connectivity,
              and smart infrastructure—creating more resilient, equitable, and sustainable communities
              for future generations.
            </p>
          </Card>
        </div>
      </Section>

      {/* Public Benefit Commitments */}
      <Section
        kicker="Our Commitments"
        title="Public Benefit Commitments"
        description="Legally binding commitments that guide everything we do."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: <Globe className="h-8 w-8 text-green-600" />,
              title: "Digital Equity",
              description: "Bridge the digital divide with free public Wi-Fi in underserved communities."
            },
            {
              icon: <Lock className="h-8 w-8 text-purple-600" />,
              title: "Zero Personal Data",
              description: "We never collect personal data. Privacy by engineering, not policy."
            },
            {
              icon: <Sun className="h-8 w-8 text-yellow-600" />,
              title: "100% Solar Powered",
              description: "Clean energy independence with battery backup for resilient infrastructure."
            },
            {
              icon: <TreePine className="h-8 w-8 text-green-500" />,
              title: "Environmental Impact",
              description: "Solar-powered nodes reduce carbon footprint and monitor environmental quality."
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Community Benefit",
              description: "Revenue sharing ensures communities benefit from infrastructure deployment."
            }
          ].map((commitment, index) => (
            <Card key={index} className="p-6 text-center">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{commitment.icon}</div>
                <CardTitle className="text-lg">{commitment.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{commitment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Ethics & Privacy Framework */}
      <Section
        kicker="Ethical Foundation"
        title="Privacy & Ethics Framework"
        description="Our approach to data privacy and ethical AI deployment."
      >
        <div className="bg-muted/50 rounded-2xl p-8 mt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Data Collection",
                items: [
                  "Anonymous by default",
                  "Opt-in only",
                  "Minimal data necessary",
                  "Transparent purpose"
                ]
              },
              {
                title: "Data Usage",
                items: [
                  "Privacy-preserving analytics",
                  "No personal identification",
                  "Community benefit focus",
                  "Regular audits"
                ]
              },
              {
                title: "User Rights",
                items: [
                  "Right to access data",
                  "Right to delete",
                  "Right to opt-out",
                  "Transparent reporting"
                ]
              }
            ].map((framework, index) => (
              <div key={index} className="text-center">
                <h4 className="text-lg font-bold mb-4">{framework.title}</h4>
                <ul className="space-y-2">
                  {framework.items.map((item, i) => (
                    <li key={i} className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Impact Metrics */}
      <Section
        kicker="Measurable Impact"
        title="Real Metrics, Real Impact"
        description="Track our progress toward creating public benefit."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { metric: "0", label: "Taxpayer Cost", suffix: "" },
            { metric: "25%", label: "Revenue to Cities", suffix: "" },
            { metric: "10K+", label: "People Connected", suffix: "" },
            { metric: "500T", label: "CO₂ Saved Annually", suffix: "" },
            { metric: "24/7", label: "Free Wi-Fi Access", suffix: "" },
            { metric: "15+", label: "City Partnerships", suffix: "" },
            { metric: "100%", label: "Solar Powered", suffix: "" },
            { metric: "0", label: "Data Breaches", suffix: "" }
          ].map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.metric}{stat.suffix}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership & Governance */}
      <Section
        kicker="Leadership"
        title="Experienced Team, Public Mission"
        description="Leadership team with decades of infrastructure, technology, and public policy experience."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Chen",
              role: "CEO & Co-Founder",
              background: "Former VP of Infrastructure at Google, 15+ years in urban tech"
            },
            {
              name: "Marcus Rodriguez",
              role: "CFO & Co-Founder",
              background: "Ex-Morgan Stanley infrastructure finance, public-private partnership expert"
            },
            {
              name: "Dr. Aisha Patel",
              role: "Chief Privacy Officer",
              background: "Former FTC privacy counsel, AI ethics researcher at Stanford"
            },
            {
              name: "James Mitchell",
              role: "VP Operations",
              background: "Former city CTO, smart city deployment expert"
            },
            {
              name: "Elena Rodriguez",
              role: "VP Policy",
              background: "Former congressional staffer, urban policy specialist"
            },
            {
              name: "David Kim",
              role: "CTO",
              background: "Ex-AWS edge computing, distributed systems architect"
            }
          ].map((leader, index) => (
            <Card key={index} className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">{leader.name}</CardTitle>
                <p className="text-sm font-medium text-green-600">{leader.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{leader.background}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section
        kicker="Our Journey"
        title="Timeline of Impact"
        description="Key milestones in our mission to transform urban infrastructure."
      >
        <div className="space-y-8 mt-12">
          {[
            {
              year: "2023",
              title: "Forhem PBC Founded",
              description: "Founded with Public Benefit Corporation charter and mission to transform urban infrastructure."
            },
            {
              year: "2024",
              title: "First Pilot Deployed",
              description: "Launched first smart node pilot in San Francisco Mission District with 15 nodes."
            },
            {
              year: "2025",
              title: "Series A Funding",
              description: "Raised $25M to expand to 10 cities and scale manufacturing operations."
            },
            {
              year: "2026",
              title: "1000 Node Milestone",
              description: "Target deployment of 1000+ nodes across 25+ cities nationwide."
            }
          ].map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="size-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{milestone.year}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold">{milestone.title}</h4>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Partner with us to build infrastructure that serves communities and creates
            shared prosperity for all stakeholders.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/contact">
                <Users className="h-4 w-4 mr-2" />
                Partner With Us
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/careers">
                <Heart className="h-4 w-4 mr-2" />
                Join Our Team
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}