import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Shield,
  Sun,
  Eye,
  Lock,
  Users,
  TreePine,
  Github,
  FileText,
  Download,
  Zap,
  Heart,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Globe,
  Wifi,
  Battery
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Privacy by Design"
        title="We Are Transparent So You Can Have Privacy"
        description="Built for cities that protect, not pry. Our solar-powered smart nodes deliver public benefit with zero personal data collection."
      >
        <div className="max-w-4xl mx-auto mt-12">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-blue-950 dark:via-green-950 dark:to-purple-950 p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 dark:bg-yellow-800 rounded-full filter blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Sun className="h-6 w-6 text-yellow-600" />
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Powering 5+ pilots with zero breaches and full audit transparency
                </span>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                At Forhem PBC, privacy isn't a feature — it's our foundation. As a Public Benefit Corporation,
                we are legally bound to prioritize people over profit. Our Smart Nodes make cities safer, cleaner,
                and more connected — never at the expense of your dignity or privacy.
              </p>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-4">
                Technology serves us. Full stop.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Foundation */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="h-8 w-8 text-red-500" />
                <h2 className="text-3xl font-bold">Trust: Our Bedrock Promise</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Every Forhem Node operates on privacy-first principles, powered by clean solar energy.
                We believe that smart city infrastructure should enhance communities without compromising
                individual rights or environmental values.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: "Zero personal data collection, ever" },
                  { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: "100% solar-powered operation" },
                  { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: "Open-source privacy algorithms" },
                  { icon: <CheckCircle className="h-5 w-5 text-green-600" />, text: "Independent security audits" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    <span>Privacy by Design Architecture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">End-to-End Encryption</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All data encrypted with AES-256, keys managed locally
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Source Anonymization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Data scrubbed before it ever leaves the node
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Battery className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Solar-Powered Security</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Clean energy with battery backup ensures 24/7 privacy protection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Transparency Section */}
      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Transparency: Policy, Not PR</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We reject hidden trackers in favor of open, auditable systems — because transparency isn't a slogan, it's a structure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Github className="h-8 w-8 text-gray-800 dark:text-gray-200" />,
                title: "Open-Source Code",
                description: "Privacy-scrubbing algorithms on GitHub — audit, fork, improve",
                action: "View Code"
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Node Specs",
                description: "Every component listed for independent inspection",
                action: "Download Specs"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-green-600" />,
                title: "Revenue Dashboards",
                description: "Real-time public views of shared value for cities",
                action: "View Dashboard"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-600" />,
                title: "Partner Logs",
                description: "Transparent records of collaborators and data flows",
                action: "View Partners"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {item.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Smart Cities Privacy First */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Smarter Cities, Privacy-First</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Every Forhem Node delivers public benefit with built-in safeguards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="h-6 w-6 text-green-600" />,
                title: "Anonymous Safety Data",
                description: "Reduces accidents by 20%, sharpens emergency response — no personal identifiers ever stored",
                metric: "20% fewer accidents"
              },
              {
                icon: <Zap className="h-6 w-6 text-yellow-600" />,
                title: "Decentralized IoT",
                description: "Powers smart lights, EV chargers, and sensors through local edge compute",
                metric: "Local processing only"
              },
              {
                icon: <Wifi className="h-6 w-6 text-blue-600" />,
                title: "Free Wi-Fi",
                description: "Universal access, anonymized at the edge — because connectivity is a right, not a luxury",
                metric: "Zero data tracking"
              },
              {
                icon: <Sun className="h-6 w-6 text-green-500" />,
                title: "Solar Efficiency",
                description: "Clean power that cuts emissions and operating costs, tracked in real time",
                metric: "100% renewable"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {item.icon}
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium text-center">
                  {item.metric}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Privacy Engineering */}
      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Lock className="h-8 w-8 text-blue-600" />
                <span>Privacy by Design: Engineered In</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Behind every public benefit lies invisible engineering — designed for privacy, not profit.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Source Anonymization",
                    description: "Data scrubbed before it ever leaves the node",
                    icon: <Eye className="h-5 w-5 text-purple-600" />
                  },
                  {
                    title: "Edge Compute",
                    description: "Sensitive processing stays local — no risky cloud transfers",
                    icon: <Zap className="h-5 w-5 text-yellow-600" />
                  },
                  {
                    title: "Minimal Retention",
                    description: "Essentials only, automatically deleted after 30 days",
                    icon: <AlertCircle className="h-5 w-5 text-orange-600" />
                  },
                  {
                    title: "Independent Audits",
                    description: "Quarterly third-party reviews — results made public",
                    icon: <Shield className="h-5 w-5 text-green-600" />
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Opt out anytime</strong> — one click, no hassle.
                </p>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span>Live Transparency Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Real-time transparency into energy use, performance, and civic impact.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Solar Energy Generated</span>
                    <span className="font-semibold text-green-600">1.2M kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Points Processed</span>
                    <span className="font-semibold text-blue-600">0 Personal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Privacy Incidents</span>
                    <span className="font-semibold text-green-600">Zero</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Audit Score</span>
                    <span className="font-semibold text-purple-600">A+</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Live Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* User Control */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Your Control: Privacy in Your Hands</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You decide how and when to share. Privacy isn't granted — it's guaranteed.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Instant Opt-Outs",
                description: "Pause data streams effortlessly"
              },
              {
                title: "Clear Consent",
                description: "Plain language prompts, never hidden toggles"
              },
              {
                title: "Data Access",
                description: "Download your anonymized insights anytime"
              },
              {
                title: "Community Voice",
                description: "Shape our PBC impact reports directly"
              }
            ].map((item, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </Card>
            ))}
          </div>

          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-8">
            You're the partner here — always.
          </p>
        </div>
      </Section>

      {/* PBC Impact */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Public Benefit: Shared, Measurable Good</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              As a Delaware Public Benefit Corporation, we balance profit with purpose and report annually
              on our social, environmental, and community impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                metric: "25%",
                label: "Revenue Share with Cities",
                description: "Transparent partnership model"
              },
              {
                metric: "100%",
                label: "Solar Powered",
                description: "Clean energy infrastructure"
              },
              {
                metric: "45K+",
                label: "Users Connected",
                description: "Free Wi-Fi access provided"
              },
              {
                metric: "500T",
                label: "CO₂ Avoided",
                description: "Annual environmental impact"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{item.metric}</div>
                <h3 className="font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our success is measured in thriving neighborhoods — not spreadsheets.
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              Trust is our innovation.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Privacy-First Movement</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Forhem PBC — Civic infrastructure built on openness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact?interest=pilot">
                Join the Pilot
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/downloads/pbc-charter.pdf">
                <Download className="h-4 w-4 mr-2" />
                Download PBC Charter
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/investors">
                View Impact Report
              </Link>
            </Button>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Curious? <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Let's talk confidentially.</Link>
          </p>
        </div>
      </Section>
    </div>
  );
}