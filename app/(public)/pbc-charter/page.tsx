import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleMap from "@/components/GoogleMap";
import {
  Shield,
  Sun,
  Heart,
  Eye,
  Lock,
  Users,
  TreePine,
  FileText,
  Github,
  BarChart3,
  Award,
  Globe,
  CheckCircle,
  AlertCircle,
  Download,
  Mail,
  Zap
} from "lucide-react";

export default function PBCCharterPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Legal Foundation"
        title="Forhem Public Benefit Charter — Your City's Future, On Your Terms"
        description="Our Legal Backbone: Public Benefit Corporation structure that puts communities first, always."
      >
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-4 mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Profit with Purpose
              </h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Forhem PBC is a Public Benefit Corporation: profit with purpose. Our directors must weigh
              shareholders, communities, and the planet equally in every choice. No trade-offs on what's right.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our North Star Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're crafting privacy-first smart infrastructure to make cities safer, tougher against storms,
              and fairer for all—without selling out your data or eroding trust.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <CardHeader>
              <CardTitle className="text-xl font-center mb-6">
                We design, deploy, and run intelligent urban nodes that:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Lock className="h-6 w-6 text-purple-600" />,
                    title: "Guard Your Privacy",
                    description: "On-the-spot, anonymized edge processing—no cloud snooping."
                  },
                  {
                    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
                    title: "Unlock Real-Time Smarts",
                    description: "Safety alerts, climate tracking, and smoother commutes."
                  },
                  {
                    icon: <Users className="h-6 w-6 text-green-600" />,
                    title: "Give Back Economically",
                    description: "Sharing value directly with neighborhoods we light up."
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Public Benefit Promises */}
      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Ironclad Public Benefit Promises</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Legally binding commitments that guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="h-8 w-8 text-purple-600" />,
                title: "Privacy as Your Human Right",
                subtitle: "🌟 Fundamental Protection",
                description: "We protect your dignity first. Every sensor, every data flow? Audited rigorously for privacy, transparency, and equity. You stay in control.",
                features: ["Zero personal data collection", "Edge-only processing", "Independent audits"]
              },
              {
                icon: <Eye className="h-8 w-8 text-blue-600" />,
                title: "Open Tech, Real Talk Governance",
                subtitle: "🔍 Complete Transparency",
                description: "Our code, node blueprints, and partner logs? All public. Transparency isn't marketing—it's our DNA.",
                features: ["Open-source algorithms", "Public node specs", "Partner transparency"]
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: "Power to the People Locally",
                subtitle: "🏘️ Community First",
                description: "Every rollout funnels value back home: revenue shares, job training, and local manufacturing where it counts.",
                features: ["Local job creation", "Revenue sharing", "Community training"]
              },
              {
                icon: <TreePine className="h-8 w-8 text-green-500" />,
                title: "Planet-Positive from Day One",
                subtitle: "🌞 Sustainable Operations",
                description: "Solar-hybrid hardware, fully circular design. We pledge carbon-neutral ops for every Forhem node—building resilience, not regret.",
                features: ["100% solar powered", "Circular design", "Carbon neutral"]
              },
              {
                icon: <Heart className="h-8 w-8 text-red-500" />,
                title: "Prosperity for Everyone",
                subtitle: "💰 Shared Success",
                description: "A fixed slice of profits? Straight to public good: bridging digital divides, skilling up green-tech talent, and fueling city climate defenses.",
                features: ["Digital equity", "Green tech training", "Climate resilience"]
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  {item.icon}
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span className="text-xs text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Privacy First Transparency Framework */}
      <Section className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Eye className="h-12 w-12 text-blue-600" />
              <Lock className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Privacy First. Transparency Always.</h2>
            <div className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4">How Forhem Builds Trust You Can Verify</div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              We don't ask you to trust us. We design our systems so you can verify everything —
              from the code that runs our nodes to the dollars that flow back into your city.
            </p>
          </div>

          {/* 1. Transparent Technology */}
          <Card className="p-8 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Github className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">1. Transparent Technology: Open Code, Open Logic</CardTitle>
                  <p className="text-lg text-blue-600 dark:text-blue-400 mt-2">Our privacy promise starts at the source code.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Github className="h-5 w-5 text-gray-600" />,
                    title: "Open-Source Core",
                    description: "Every privacy-critical component — from edge anonymization modules to sensor firmware — is available on GitHub. You can audit, fork, or improve it."
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-green-600" />,
                    title: "PII Never Leaves the Node",
                    description: "Data is processed and scrubbed at the edge. Faces, license plates, and identifying signals are stripped locally — nothing personal ever touches the cloud."
                  },
                  {
                    icon: <Award className="h-5 w-5 text-purple-600" />,
                    title: "Independent Code Audits",
                    description: "Third-party security researchers review our algorithms annually. Findings are published publicly, with patches documented in changelogs."
                  },
                  {
                    icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
                    title: "AI Transparency Logs",
                    description: "Every AI model we deploy has a clear 'model card' describing what it does, what it doesn't do, and how bias is mitigated."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
                <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  🧠 Transparency means sunlight at the code level.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. Transparent Equipment */}
          <Card className="p-8 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">2. Transparent Equipment: Know What's in the Box</CardTitle>
                  <p className="text-lg text-green-600 dark:text-green-400 mt-2">Our hardware isn't a mystery — it's a promise you can inspect.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FileText className="h-5 w-5 text-gray-600" />,
                    title: "Full Hardware Specs Online",
                    description: "Sensors, compute units, networking gear, and power systems are published in our Node Spec Library."
                  },
                  {
                    icon: <Eye className="h-5 w-5 text-blue-600" />,
                    title: "No Hidden Eyes or Ears",
                    description: "Every physical data collection component is listed and labeled — no concealed mics, no unlisted cameras, no 'phantom telemetry.'"
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-green-600" />,
                    title: "Tamper-Seal Verification",
                    description: "Each node has a visible security seal and a QR code linking to its certification record."
                  },
                  {
                    icon: <Users className="h-5 w-5 text-purple-600" />,
                    title: "Community Inspection Program",
                    description: "Cities and independent watchdogs can request on-site inspection at any time."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
                <p className="text-lg font-medium text-green-700 dark:text-green-300">
                  🛠️ If it can see the public, the public can see inside it.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. Transparent Revenue */}
          <Card className="p-8 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">3. Transparent Revenue: Shared Value, Visible Flow</CardTitle>
                  <p className="text-lg text-yellow-600 dark:text-yellow-400 mt-2">Smart city infrastructure shouldn't be a black box of profit extraction.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <BarChart3 className="h-5 w-5 text-gray-600" />,
                    title: "Public Revenue Dashboard",
                    description: "Node-level income (advertising, compute rental, data analytics) is displayed openly — along with the percentage shared with the city or host community."
                  },
                  {
                    icon: <FileText className="h-5 w-5 text-blue-600" />,
                    title: "Revenue-Share Smart Contracts",
                    description: "Payments are automated through transparent smart contracts; every distribution event is logged and timestamped."
                  },
                  {
                    icon: <Heart className="h-5 w-5 text-red-600" />,
                    title: "Local Reinvestment Ledger",
                    description: "A fixed slice of annual profits goes to community benefit funds — traceable via open ledgers on our transparency portal."
                  },
                  {
                    icon: <Lock className="h-5 w-5 text-green-600" />,
                    title: "No Data-for-Dollars Schemes",
                    description: "We never sell personal or behavioral data. Our revenues come from infrastructure value — not surveillance."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-center">
                <p className="text-lg font-medium text-yellow-700 dark:text-yellow-300">
                  💡 You can literally see where the money goes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Transparent Operations */}
          <Card className="p-8 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">4. Transparent Operations: Open Governance and Oversight</CardTitle>
                  <p className="text-lg text-purple-600 dark:text-purple-400 mt-2">We hold ourselves accountable through governance by design.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FileText className="h-5 w-5 text-gray-600" />,
                    title: "Annual Public Benefit Report",
                    description: "Independently verified and published online, tracking performance across privacy, environmental, and social metrics."
                  },
                  {
                    icon: <Users className="h-5 w-5 text-blue-600" />,
                    title: "Stakeholder Review Periods",
                    description: "Residents, building owners, and city officials can review and comment on new deployments before activation."
                  },
                  {
                    icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
                    title: "Incident Transparency",
                    description: "Any data incident or hardware fault triggers a 48-hour public disclosure requirement."
                  },
                  {
                    icon: <Award className="h-5 w-5 text-purple-600" />,
                    title: "Independent Ethics Board",
                    description: "Comprised of civic, academic, and privacy experts, reviewing policy compliance and community impact quarterly."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900 rounded-lg text-center">
                <p className="text-lg font-medium text-purple-700 dark:text-purple-300">
                  🕊️ Accountability isn't reactive — it's operational.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Privacy by Design */}
          <Card className="p-8">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">5. Privacy by Design — From Silicon to City Block</CardTitle>
                  <p className="text-lg text-green-600 dark:text-green-400 mt-2">Our privacy posture isn't a retrofit — it's our architecture.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-yellow-600" />,
                    title: "Edge-Only Intelligence",
                    description: "Nodes process data locally; only anonymized summaries are transmitted."
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-green-600" />,
                    title: "Zero-Knowledge Telemetry",
                    description: "Aggregated data is encrypted and verified without exposing raw content."
                  },
                  {
                    icon: <Users className="h-5 w-5 text-blue-600" />,
                    title: "Community Consent Layers",
                    description: "Each node's deployment includes public notice, opt-out mechanisms for private property data capture, and data retention limits."
                  },
                  {
                    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
                    title: "Deletion & Control",
                    description: "Cities and hosts can set automatic data deletion windows, typically ≤ 24 hours."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
                <p className="text-lg font-medium text-green-700 dark:text-green-300">
                  🔐 The safest data is the data we never store.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* The Transparency Loop */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">The Transparency Loop</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We call it the Forhem Transparency Loop — a continuous cycle of publish → verify → improve.
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="size-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Publish</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every system spec, policy, and metric
                </p>
              </div>
              <div>
                <div className="size-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Verify</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Through dashboards, audits, or independent inspection
                </p>
              </div>
              <div>
                <div className="size-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Improve</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on findings and public input
                </p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                That's how we turn transparency from a buzzword into infrastructure.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Original Accountability Playbook */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <AlertCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Keeping It Real: Our Accountability Playbook</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              How we ensure we walk the talk, every single day.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: <FileText className="h-6 w-6 text-blue-600" />,
                title: "Annual Impact Report",
                description: "A no-BS yearly deep dive on our goals, verified by independent auditors.",
                status: "Coming soon to a dashboard near you",
                action: "Get Notified"
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-green-600" />,
                title: "Live Transparency Hub",
                description: "Check node stats, uptime, solar output, and community payouts in real time—right here on our site.",
                status: "Live and updating",
                action: "View Dashboard"
              },
              {
                icon: <Users className="h-6 w-6 text-purple-600" />,
                title: "Your Voice Matters",
                description: "Neighbors, owners, cities—you get to review and weigh in on deployments before they go live.",
                status: "Community-driven",
                action: "Join Discussion"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {item.status}
                      </span>
                      <Button variant="outline" size="sm">
                        {item.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Headquarters Location Section */}
      <Section
        kicker="Visit Our Headquarters"
        title="Find Us in San Francisco"
        description="Our transparent operations start with our physical location. Come visit us at our headquarters."
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Forhem PBC Headquarters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      55 9th Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">contact@forhem.io</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Public Benefit Corporation</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transparency in Location</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      As a Public Benefit Corporation, we believe in transparency in everything we do -
                      including where we work. Our headquarters is open to partners, community members,
                      and anyone who wants to learn more about our mission.
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <Link href="/contact">
                        <Users className="h-4 w-4 mr-2" />
                        Schedule a Visit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <GoogleMap
                address="55 9th Street, San Francisco, CA 94103"
                lat={37.7749}
                lng={-122.4194}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom Line Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">The Bottom Line (Because You Deserve Straight Talk)</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            We're not in the data-harvesting game. We're here to show privacy, openness, and thriving communities
            can thrive together. Smart cities? They should feel like home—yours to shape.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-xl mb-4">Ready to join the build?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="mailto:contact@forhem.io">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@forhem.io
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/forhem" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Explore Open-Source Nodes
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Let's make your city unbreakable.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Public Benefit Corporation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Privacy by Law</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Community-Owned</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Download Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Official Documents</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PBC Charter PDF",
                description: "Complete legal documentation",
                icon: <Download className="h-5 w-5" />
              },
              {
                title: "Impact Report",
                description: "Annual performance metrics",
                icon: <FileText className="h-5 w-5" />
              },
              {
                title: "Transparency Dashboard",
                description: "Real-time operations data",
                icon: <BarChart3 className="h-5 w-5" />
              }
            ].map((doc, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4 text-blue-600">
                  {doc.icon}
                </div>
                <h3 className="font-semibold mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{doc.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {index === 0 ? "Download PDF" : index === 1 ? "View Report" : "Open Dashboard"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}