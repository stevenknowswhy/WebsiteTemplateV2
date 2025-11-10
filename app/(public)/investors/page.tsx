import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Network,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Award,
  Star,
  Zap,
  Globe,
  Target,
  Eye,
  Lock,
  Calculator,
  BarChart3,
  FileText,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Map,
  ArrowRight
} from "lucide-react";

export default function InvestorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section: The Grand Vision */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGRvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNjgNHYtNGgydjRoLTR2Mmg0djJoNHY0aDJ2LTRoNHY0aDJoLTR2LTR2SDB2LTZ2LTR6Wk02djd2LTRoLTJ2NGgySDR2aDJoLTR2LTJ2LTRoNHY0SDR2SDZ2LTR2SDB2NHYwSDJ2NEg2djRoLTR2SDB2LTR2aDJoLTR6TjZINHY0SDJ2NEg2djRoLTRiSDJ2NEgyNHYwSDJ2NEgyWDB2NEg0SCIkLz48L2c+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700">
              Investment Opportunity
            </Badge>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              We Are Building the
              <span className="block text-4xl lg:text-5xl text-blue-400 mt-4">
                Invisible Foundation for the Next Economy
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              The AI revolution is happening at the edge. The cloud is hitting a wall of physics, cost, and sovereignty.
              We own the physical layer that makes the next decade of innovation possible.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <FileText className="h-5 w-5 mr-2" />
                Access the Investment Memorandum
              </Button>
              <Button variant="outline" size="lg" className="border-blue-400 text-blue-200 hover:bg-blue-900/50 hover:text-blue-100">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule a Confidential Briefing
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* The Thesis: The Unavoidable Transition */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              The Centralized Cloud is Breaking.
              <span className="block text-3xl text-blue-600 dark:text-blue-400 mt-2">
                The Distributed Edge is the Multi-Trillion-Dollar Answer.
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
              <div className="text-red-600 dark:text-red-400 mb-4">
                <Building className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Data traveling hundreds of miles to a centralized data center, causing latency, cost, and security issues.
              </p>
            </Card>

            <Card className="p-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <Network className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">Our Stack</h3>
              <p className="text-muted-foreground leading-relaxed">
                The three-tiered "Compute Nervous System" – Core (UDCs), Regional (MDaaS), Edge (Hello/City Safe).
              </p>
            </Card>

            <Card className="p-8 border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20">
              <div className="text-emerald-600 dark:text-emerald-400 mb-4">
                <Globe className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">The Outcome</h3>
              <p className="text-muted-foreground leading-relaxed">
                A shimmering, intelligent city with data processed locally, instantly, and securely.
              </p>
            </Card>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg">
            <p className="text-lg text-center italic text-slate-700 dark:text-slate-300">
              "We are at the precipice of a fundamental architectural shift. DataBuildDirect is not just participating in this trend;
              we are building the essential public utility for it."
            </p>
          </div>
        </div>
      </Section>

      {/* The Moat: Defensibility by Design */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            This Isn't a Software Play.
            <span className="block text-3xl text-slate-600 dark:text-slate-400 mt-2">
              It's a Fortress Built on Hardware, Trust, and Time.
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full border-2 border-blue-200 dark:border-blue-800" />
              <div className="w-80 h-80 rounded-full border-2 border-emerald-200 dark:border-emerald-800 absolute" />
              <div className="w-64 h-64 rounded-full border-2 border-purple-200 dark:border-purple-800 absolute" />
              <div className="w-48 h-48 rounded-full border-2 border-amber-200 dark:border-amber-800 absolute" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold">Physical & Regulatory Moat</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Long-lead time assets. Sovereign-grade security certifications. Municipal franchise agreements that are exclusive and multi-decade.
                </p>
              </Card>

              <Card className="p-8 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Network className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl font-bold">Architectural Moat</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A fully integrated stack from core-to-edge. Competitors own one piece; we orchestrate the entire system, creating unparalleled efficiency.
                </p>
              </Card>

              <Card className="p-8 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-bold">Trust Moat</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Privacy-by-design is our license to operate. Our open-source, auditable data policies are what allow us to win city and enterprise contracts.
                </p>
              </Card>

              <Card className="p-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-xl font-bold">Economic Moat</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Recurring, utility-like revenue streams. 60-70% gross margins. Revenue-share models that align us with our partners for decades.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* The Traction: From Blueprint to Inevitability */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            The Future is Already Being Deployed.
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-12 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <Map className="h-8 w-8 mr-3 text-blue-600" />
                The Live Network
              </h3>
              <p className="text-muted-foreground">Real-time deployment metrics and system performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Building className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h4 className="font-bold mb-2">Underground DCs</h4>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-muted-foreground">Core Hubs</p>
              </div>

              <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <Network className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
                <h4 className="font-bold mb-2">Micro DCs</h4>
                <p className="text-2xl font-bold text-emerald-600">24</p>
                <p className="text-sm text-muted-foreground">Regional Nodes</p>
              </div>

              <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h4 className="font-bold mb-2">Edge Nodes</h4>
                <p className="text-2xl font-bold text-purple-600">156</p>
                <p className="text-sm text-muted-foreground">City & Hello Safe</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-1">99.98%</p>
                <p className="text-sm text-muted-foreground">Average Network Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">+38%</p>
                <p className="text-sm text-muted-foreground">Thermal Efficiency vs Traditional</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">&lt;5ms</p>
                <p className="text-sm text-muted-foreground">Average Edge Latency</p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Strategic Milestones
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Selected for San Francisco Market Street Smart Corridor Initiative</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">In advanced partnership discussions with Tier-1 AI lab for edge inference</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Letter of Intent from national REIT for 150 properties</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Patent-pending geothermal-adaptive cooling system</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-emerald-600" />
                Strategic Alignment
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">25%+ CAGR projected for edge computing through 2030</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">$180B in federal smart infrastructure funding available</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">First-mover advantage with deployed, operational nodes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Multi-channel revenue model: compute, data, advertising, infrastructure</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* The Financials: A Clear Path to Dominance */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            A Capital Plan to Capture a Market in Its Infancy.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {[
            {
              phase: "Phase 1",
              title: "Network Foundation",
              amount: "$25M",
              goal: "Prove the integrated model in 3 flagship cities",
              milestones: "Achieve $15M ARR, lock in 5-year municipal contracts, demonstrate network effects",
              target: "Visionary VCs and Family Offices",
              roi: "25-35% IRR"
            },
            {
              phase: "Phase 2",
              title: "Regional Scale",
              amount: "$75M",
              goal: "Dominate the West Coast corridor",
              milestones: "1,000+ nodes deployed, $100M ARR, path to profitability",
              target: "Growth Equity and Infrastructure Funds",
              roi: "20-30% IRR"
            },
            {
              phase: "Phase 3",
              title: "National Platform",
              amount: "$200M+",
              goal: "Establish the national standard",
              milestones: "IPO or Strategic Exit, 10,000+ node network",
              target: "Sovereign Wealth Funds and Large Institutional LPs",
              roi: "15-25% IRR"
            }
          ].map((phase, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="size-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{phase.phase}</h3>
                      <p className="text-lg text-muted-foreground">{phase.title}</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{phase.amount}</p>
                  <p className="text-sm text-muted-foreground">Target Raise</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Goal</h4>
                    <p className="text-muted-foreground text-sm">{phase.goal}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Key Milestones</h4>
                    <p className="text-muted-foreground text-sm">{phase.milestones}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Target Investor</p>
                      <p className="font-semibold">{phase.target}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Est. ROI</p>
                      <p className="font-bold text-emerald-600">{phase.roi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <BarChart3 className="h-5 w-5 mr-2" />
            Request the Detailed Pro Forma & Cap Table
          </Button>
        </div>
      </Section>

      {/* The Team: Builders of the Inevitable */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            We've Done This Before.
            <span className="block text-3xl text-slate-600 dark:text-slate-400 mt-2">
              At Scale.
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                role: "CEO",
                name: "Visionary Leadership",
                achievements: [
                  "Scaled infrastructure company from 0 to $500M in revenue",
                  "Led infrastructure team at Fortune 500 Company",
                  "15+ years in utility-scale technology"
                ]
              },
              {
                role: "CTO",
                name: "Technical Excellence",
                achievements: [
                  "Holds 15 patents in distributed systems",
                  "Former Principal Engineer at Major Cloud Provider",
                  "Architect of 3 billion+ user systems"
                ]
              },
              {
                role: "Head of Civic Partnerships",
                name: "Strategic Relationships",
                achievements: [
                  "Former Deputy Mayor for Major City",
                  "Negotiated $2B in public-private partnerships",
                  "Deep network in municipal government"
                ]
              }
            ].map((member, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.role}</h3>
                <p className="text-muted-foreground mb-4">{member.name}</p>
                <ul className="space-y-2 text-left">
                  {member.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card className="p-12 text-center">
            <blockquote className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 italic">
              "We aren't selling widgets. We are selling certainty in an uncertain world. We are building the digital equivalent of the interstate highway system, and we're looking for partners who think in decades, not quarters."
            </blockquote>
            <p className="text-lg text-muted-foreground">— Founder & CEO, DataBuildDirect</p>
          </Card>
        </div>
      </Section>

      {/* The Final Call to Action: An Exclusive Invitation */}
      <Section className="bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
            This is More Than an Investment.
            <span className="block text-3xl lg:text-4xl text-blue-300 mt-4">
              It's a Legacy.
            </span>
          </h2>

          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            We are selectively engaging with a small group of strategic partners who understand the profound shift happening in physical-digital infrastructure.
            If you have the patience and vision to build the next essential public utility, we invite you to begin a confidential dialogue.
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-6 text-white">Begin the Conversation</h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
              />
              <input
                type="text"
                placeholder="Your Firm"
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50 md:col-span-2"
              />
              <select className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white/50">
                <option>Investment Thesis</option>
                <option>Infrastructure</option>
                <option>AI/Deep Tech</option>
                <option>Impact/ESG</option>
                <option>Smart Cities</option>
              </select>
              <select className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white/50">
                <option>Typical Round Size</option>
                <option>$10M-$25M</option>
                <option>$25M-$75M</option>
                <option>$75M+</option>
              </select>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit Confidential Inquiry
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-blue-200 mt-4">
              Allocation for Phase 1 is oversubscribed by 1.5x. We are considering 2-3 additional lead investors.
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Recognition */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-muted-foreground mb-2">Featured In</h3>
        </div>
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="text-2xl font-bold text-slate-600">TechCrunch</div>
          <div className="text-2xl font-bold text-slate-600">Wall Street Journal</div>
          <div className="text-2xl font-bold text-slate-600">Smart Cities Dive</div>
          <div className="text-2xl font-bold text-slate-600">Forbes</div>
        </div>
      </Section>
    </div>
  );
}