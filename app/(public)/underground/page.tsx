import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Server,
  Thermometer,
  Lock,
  Building2,
  Cable,
  Flame,
  Globe,
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  ArrowUpRight,
  Calculator,
  Play,
  Star,
  Award,
  Target,
  Cloud,
  Clock,
  TrendingUp,
  BarChart3,
  Download
} from "lucide-react";

export default function UndergroundPage() {
  return (
    <div className="min-h-screen">
      {/* Stage 1: The Hook - Stronger Emotional Hook */}
      <Section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              Underground Data Centers
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Your Data's Weakest Link is the Roof Over Its Head
            </h1>
            <p className="text-xl text-muted-foreground">
              When Every Second of Uptime Matters, The Ground Beneath You is Your Greatest Asset
            </p>
            <p className="text-lg text-muted-foreground">
              Underground Data Centers are engineered for 99.999% uptime, slashing cooling costs by 40%,
              and rendering your core infrastructure immune to surface-level disasters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                <Target className="h-5 w-5 mr-2" />
                Discover the Unbreakable Standard
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-600">
                <Calculator className="h-5 w-5 mr-2" />
                Get Your Risk Assessment
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 flex items-center justify-center">
              <div className="text-center text-white/70">
                <Building2 className="h-32 w-32 mx-auto mb-4" />
                <p className="text-lg font-semibold">Split-Screen Visualization</p>
                <p className="text-sm">Left: Surface facility under threat</p>
                <p className="text-sm">Right: Serene underground stability</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 shadow-lg">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                "From the surface to the core — data finds safety underground"
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 2: The Problem - Inevitable Risk */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Critical Infrastructure Risk</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Threats Are Real. The Costs Are Staggering.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              While your competitors chase cloud promises, you're one disaster away from catastrophic data loss.
              Traditional data centers sit exposed—vulnerable to threats that no SLA can prevent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Natural Disasters",
                description: "Floods, earthquakes, and extreme weather events that can wipe out surface infrastructure in minutes",
                icon: Cloud,
                stat: "74% increased risk in coastal regions",
                color: "blue"
              },
              {
                title: "Cyber-Physical Attacks",
                description: "Targeted strikes on critical infrastructure where digital and physical security converge",
                icon: Shield,
                stat: "300% rise in infrastructure attacks",
                color: "red"
              },
              {
                title: "Systemic Failures",
                description: "Cascading failures from power grid instability, network outages, and human error",
                icon: Zap,
                stat: "Average $900K/hour downtime cost",
                color: "yellow"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 border-l-4 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-l-red-500 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 flex items-center justify-center`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{item.stat}</div>
              </Card>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-8 border border-red-200 dark:border-red-800/30">
            <h3 className="text-2xl font-bold mb-6 text-center">The True Cost of Waiting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400">Immediate Risks</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Catastrophic data loss from natural disasters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Compliance violations from inadequate infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Reputational damage from public breaches</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400">Long-term Consequences</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Market share loss to resilient competitors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Increased insurance premiums and deductibles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Regulatory fines and legal liabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 3: The Solution & Authority */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Engineering Excellence</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Engineering Mastery, Meet Natural Advantage.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore our interactive 3D facility model to see how underground engineering creates an unbreakable foundation
              for your most critical workloads.
            </p>
          </div>

          <div className="mb-16">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-center text-white/70 relative z-10">
                <Building2 className="h-32 w-32 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-lg font-semibold mb-2">Interactive 3D Facility Model</p>
                <p className="text-sm">Hover to explore features</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button variant="secondary" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Take Virtual Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Thermometer className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Rock Walls</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Natural Geothermal Cooling
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    40% reduction in HVAC load through natural thermal stability
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                    <Zap className="h-3 w-3" />
                    <span>Energy-efficient by design</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Cable className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Access Tunnels</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Biometric Security & EMP Shielding
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tier IV physical protection with electromagnetic pulse shielding
                  </p>
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <Shield className="h-3 w-3" />
                    <span>Military-grade security</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Server className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Server Racks</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        High-Density AI/GPU Ready
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Optimized for the compute demands of tomorrow's AI workloads
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                    <Zap className="h-3 w-3" />
                    <span>Future-proof infrastructure</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Power Systems</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        N+1 Redundant Power
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    99.999%+ power availability with grid-independent operation
                  </p>
                  <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
                    <CheckCircle className="h-3 w-3" />
                    <span>Uninterruptible operations</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Security Core</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Multi-Layered Defense
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    EMP shielding, blast protection, and covert location advantages
                  </p>
                  <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                    <Lock className="h-3 w-3" />
                    <span>Maximum physical security</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <Cable className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Fiber Uplinks</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Urban Mesh Integration
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Low-latency connections to micro and street-level nodes
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                    <Globe className="h-3 w-3" />
                    <span>Seamless ecosystem connectivity</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge variant="outline" className="text-lg px-4 py-2">
                ISO 27001 Certified
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                SOC 2 Type II Ready
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Tier IV Design
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                FIPS 140-2 Compliant
              </Badge>
            </div>
            <Button size="lg" variant="outline" className="group">
              <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Download Technical & Security Dossier
            </Button>
          </div>
        </div>
      </Section>

      {/* Stage 4: The ROI - Irresistible Business Case */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 mb-4">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Financial Advantage</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Bottom Line on an Unbreakable Foundation.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Beyond security, UDCs are a superior financial asset. Translate resilience directly into your P&L
              through massive operational savings and risk reduction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Calculator className="h-7 w-7 text-green-600" />
                    Interactive ROI Calculator
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Calculate your potential savings with underground infrastructure
                  </p>
                </CardHeader>
                <CardContent className="space-y-8 px-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Number of Racks: <span className="text-green-600 font-bold">20</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="20"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1</span>
                        <span>100</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Power Density: <span className="text-green-600 font-bold">15 kW/rack</span>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        defaultValue="15"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 kW</span>
                        <span>30 kW</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">$2.1M</div>
                      <div className="text-sm text-muted-foreground">Annual Savings</div>
                      <div className="text-xs text-green-600 mt-1">↗ 40% vs traditional</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">3.2 yrs</div>
                      <div className="text-sm text-muted-foreground">Payback Period</div>
                      <div className="text-xs text-blue-600 mt-1">↘ 60% faster</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">42%</div>
                      <div className="text-sm text-muted-foreground">5-Year ROI</div>
                      <div className="text-xs text-purple-600 mt-1">↗ 3.5x industry avg</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <ArrowUpRight className="h-5 w-5 mr-2" />
                      Get Your Custom Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-lg border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    5-Year TCO Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Traditional DC</span>
                        <span className="font-bold text-red-600">$8.5M</span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full w-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Underground DC</span>
                        <span className="font-bold text-green-600">$4.9M</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full w-[58%] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="pt-2 text-center">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm px-3 py-1">
                        42% Lower Total Cost
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">40% lower cooling costs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">65% reduced insurance premiums</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">90% less downtime cost</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">25% longer hardware lifespan</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 5: The Proof - Social Validation */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Social Proof</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Trusted by the World's Most Critical Operations.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Don't just take our word for it. See how industry leaders are leveraging underground infrastructure
              to achieve unprecedented reliability and security.
            </p>
          </div>

          <div className="space-y-16">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-8 font-semibold uppercase tracking-wider">
                Powering the future for:
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  "Energy Utilities",
                  "City Governments",
                  "AI Research Labs",
                  "Cloud Providers",
                  "Financial Institutions",
                  "Healthcare Systems"
                ].map((industry) => (
                  <Badge key={industry} variant="outline" className="text-sm px-6 py-3 border-2 hover:border-purple-400 transition-colors">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden shadow-xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm group">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Sarah Chen • CTO, Regional Cloud Provider
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">"Rock-Solid Reliability"</h3>
                  <blockquote className="text-muted-foreground mb-4">
                    "Our underground hub survived two regional blackouts without a second of downtime —
                    while cutting our cooling bill by nearly half. The peace of mind knowing our infrastructure
                    is literally rock-solid is priceless."
                  </blockquote>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <Button variant="outline" size="sm">
                      Watch Full Story
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 shadow-lg bg-white dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Award className="h-6 w-6 text-orange-600" />
                    The Blackout Test: 72-Hour Survival Story
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-bold text-red-600">Challenge</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          When a severe winter storm knocked out power to the entire Pacific Northwest region
                          for 72 hours, this major cloud provider faced potential catastrophic data loss and
                          service interruption affecting millions of users.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-green-600">Solution</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Their underground data center maintained 100% uptime throughout the crisis,
                          running on backup systems while surface facilities struggled. They even provided
                          emergency compute capacity to local hospitals and emergency services.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-xs text-muted-foreground">Uptime Maintained</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">$2.3M</div>
                        <div className="text-xs text-muted-foreground">Losses Prevented</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">72h</div>
                        <div className="text-xs text-muted-foreground">Continuous Operation</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button variant="outline" className="group">
                        Read Full Case Study
                        <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Join hundreds of organizations that have made the switch to underground infrastructure
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99.999%</div>
                  <div className="text-sm text-muted-foreground">Average Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <div className="text-sm text-muted-foreground">Deployments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 6: The Conversion - Streamlined */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Get Started</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Is an Underground Data Center Right for Your Strategy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Schedule a private, no-commitment discovery call with our infrastructure specialists.
              We'll help you model the ROI, assess your requirements, and determine if UDCs
              align with your long-term roadmap.
            </p>
          </div>

          <Card className="p-10 shadow-2xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-6">In your consultation, you will receive:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Preliminary Site Suitability Report</div>
                    <div className="text-sm text-muted-foreground">
                      Assessment of your location for underground deployment
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Customized TCO Model</div>
                    <div className="text-sm text-muted-foreground">
                      5-year total cost of ownership analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Construction Playbook</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed timeline and process documentation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Company</label>
                  <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your company" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Work Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="your.email@company.com" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Primary Interest</label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option>AI/GPU Clusters</option>
                    <option>Cloud Expansion</option>
                    <option>Civic Infrastructure</option>
                    <option>High-Frequency Trading</option>
                    <option>Healthcare Systems</option>
                    <option>Government Operations</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Timeline</label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option>Exploring Options</option>
                    <option>3-6 Months</option>
                    <option>6-12 Months</option>
                    <option>12+ Months</option>
                  </select>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    This conversation is confidential. You can request an NDA before we begin.
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg py-4">
                <Star className="h-6 w-6 mr-2" />
                Book Your Private Consultation
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                No commitment required • 30-minute discovery call • Confidential assessment
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Stage 7: Footer Layer - Strategic Navigation */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900 dark:to-gray-900" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Complete Ecosystem</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Build a Layered, Future-Proof Compute Strategy
            </h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Our underground facilities form the core of a comprehensive ecosystem.
              Discover how our layered approach reshapes urban compute infrastructure.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="mb-3">
                    <Badge className="text-sm px-4 py-2 bg-blue-600 text-white">Core</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">Underground Data Centers</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Maximum security and regional backbone
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all" size="lg">
                    Explore Underground
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-sm px-4 py-2">Mid-Tier</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors">Micro DCaaS</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Edge computing and distributed services
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-green-50 group-hover:border-green-300 transition-all" size="lg" asChild>
                    <a href="/micro-dcaas">Explore Micro DCaaS</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-sm px-4 py-2">Street-Level</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-purple-600 transition-colors">Safe Nodes</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    Urban intelligence and community safety
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 transition-all" size="lg" asChild>
                    <a href="/city-safe-nodes">Explore Safe Nodes</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <p className="text-lg text-muted-foreground mb-6">
                From underground resilience to street-level intelligence
              </p>
              <Button size="lg" className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white group" asChild>
                <a href="/solutions" className="flex items-center gap-2">
                  View Complete Ecosystem
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm text-muted-foreground">
                Ready to secure your infrastructure's future? Our team is standing by to answer your questions.
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Documentation
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Technical Whitepapers
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}