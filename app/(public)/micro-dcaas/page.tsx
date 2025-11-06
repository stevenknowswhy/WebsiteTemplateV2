import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Package,
  Wifi,
  Shield,
  Clock,
  Truck,
  Building2,
  Server,
  Cloud,
  Cpu,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  Star,
  Award,
  Target,
  CheckCircle,
  TrendingUp,
  Users,
  Download,
  MapPin,
  Layers,
  Calculator,
  Lock
} from "lucide-react";

export default function MicroDcaasPage() {
  return (
    <div className="min-h-screen">
      {/* Stage 1: The Hook - Strong Emotional Trigger */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Micro DCaaS
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Your AI is Waiting. Your Data is Stranded.
                <span className="block text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 mt-2">
                  The Cloud is Too Far Away.
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Instant Infrastructure for the AI-Powered Edge. Deploy in Days, Not Years.
                </p>
                <p className="text-lg text-muted-foreground">
                  Fully-managed, high-performance compute nodes deployed at the edge in days.
                  Slash latency, meet data laws, and unlock new revenue.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Target className="h-5 w-5 mr-2" />
                  See How It Works
                </Button>
                <Button variant="outline" size="lg" className="border-blue-300 dark:border-blue-600">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Calculate Your Latency Savings
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-center text-white/70 relative z-10">
                  <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                    <div>
                      <div className="text-red-400 text-lg font-semibold mb-2">LAG</div>
                      <div className="text-6xl animate-pulse">150ms</div>
                      <div className="text-sm">Cloud Distance</div>
                    </div>
                    <div>
                      <div className="text-green-400 text-lg font-semibold mb-2">SPEED</div>
                      <div className="text-6xl">&lt;10ms</div>
                      <div className="text-sm">Edge Processing</div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Package className="h-24 w-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                    <p className="text-lg font-semibold group-hover:text-blue-300 transition-colors">
                      Deploy Anywhere. Scale Instantly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 shadow-lg">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  "The edge isn't coming—it's here. Deploy like it."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 2: The Solution - Infrastructure, Uncomplicated */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">How It Works</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Infrastructure, Uncomplicated.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              From configuration to deployment in under 48 hours. Your edge infrastructure, delivered as a service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "You Configure",
                description: "Select your node size, power requirements, and target locations. Our AI-powered configurator recommends the optimal setup.",
                icon: <Cpu className="h-8 w-8" />,
                color: "blue"
              },
              {
                step: "02",
                title: "We Deploy",
                description: "Our modular units arrive pre-configured. Local teams handle installation, utilities, and network integration in days, not months.",
                icon: <Truck className="h-8 w-8" />,
                color: "green"
              },
              {
                step: "03",
                title: "You Scale",
                description: "Manage your entire edge fleet through our unified platform. Add capacity, deploy applications, and monitor performance from one dashboard.",
                icon: <TrendingUp className="h-8 w-8" />,
                color: "purple"
              }
            ].map((step, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center`}>
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-8 border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold mb-6 text-center">Key Benefits at a Glance</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Clock className="h-6 w-6" />, title: "Deploy in Days", desc: "From order to operational in under a week" },
                { icon: <Zap className="h-6 w-6" />, title: "<10ms Latency", desc: "Sub-millisecond performance for real-time apps" },
                { icon: <MapPin className="h-6 w-6" />, title: "Data Sovereignty", desc: "Process locally, comply globally" },
                { icon: <DollarSign className="h-6 w-6" />, title: "Zero CapEx", desc: "Predictable monthly subscription model" }
              ].map((benefit, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-blue-600 dark:text-blue-400 mb-2">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 3: The Applications - What Will You Build at the Edge? */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-4">
              <Server className="h-4 w-4" />
              <span className="text-sm font-medium">Use Cases</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              What Will You Build at the Edge?
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unlock new possibilities by placing computing power exactly where you need it.
            </p>
          </div>

          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="ai" className="text-lg">AI & Robotics</TabsTrigger>
              <TabsTrigger value="cities" className="text-lg">Smart Cities</TabsTrigger>
              <TabsTrigger value="media" className="text-lg">Immersive Media</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <Card className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-6xl">🤖</div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">AI & Robotics Inference</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Run large language and vision models locally. Enable real-time decision-making without cloud round-trips for autonomous systems.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">68%</div>
                      <div className="text-sm text-muted-foreground">Reduction in inference latency</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10">
                  <h4 className="font-bold text-lg mb-4">Key Applications</h4>
                  <ul className="space-y-3">
                    {[
                      "Autonomous vehicle perception",
                      "Industrial robotics control",
                      "Real-time quality inspection",
                      "Predictive maintenance",
                      "Computer vision systems"
                    ].map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{app}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cities" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <Card className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-6xl">🏙️</div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Smart Cities & IoT</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Process sensor data from thousands of devices to manage traffic, utilities, and public safety systems with sub-second response times.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">1M+</div>
                      <div className="text-sm text-muted-foreground">Events processed per second at source</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10">
                  <h4 className="font-bold text-lg mb-4">Key Applications</h4>
                  <ul className="space-y-3">
                    {[
                      "Traffic flow optimization",
                      "Smart grid management",
                      "Public safety monitoring",
                      "Environmental sensing",
                      "Emergency response systems"
                    ].map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{app}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <Card className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-6xl">🥽</div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Immersive Media & Gaming</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Cache content and run game servers at the edge for lag-free AR/VR experiences and instant content delivery to end-users.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">0ms</div>
                      <div className="text-sm text-muted-foreground">Buffering and jitter eliminated</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/10">
                  <h4 className="font-bold text-lg mb-4">Key Applications</h4>
                  <ul className="space-y-3">
                    {[
                      "AR/VR content delivery",
                      "Multiplayer game servers",
                      "Live streaming optimization",
                      "Real-time rendering",
                      "Interactive experiences"
                    ].map((app, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{app}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* Stage 4: The ROI & Proof - The Math Behind Instant Infrastructure */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 mb-4">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">ROI Calculator</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Math Behind Instant Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Calculate your savings and see the tangible benefits of edge computing
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl flex items-center gap-3 mb-2">
                    <Calculator className="h-7 w-7 text-orange-600" />
                    Calculate Your Edge Savings
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Customize the calculator to see your specific ROI
                  </p>
                </CardHeader>
                <CardContent className="space-y-6 px-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Number of Edge Locations: <span className="text-orange-600 font-bold">3</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        defaultValue="3"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Primary Workload: <span className="text-orange-600 font-bold">AI Inference</span>
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-slate-800">
                        <option>AI Inference</option>
                        <option>IoT Data Processing</option>
                        <option>Content Delivery</option>
                        <option>Smart City Applications</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Current Latency: <span className="text-orange-600 font-bold">150ms</span>
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        defaultValue="150"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Current Monthly CapEx: <span className="text-orange-600 font-bold">$25,000</span>
                      </label>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="1000"
                        defaultValue="25000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">&lt;10ms</div>
                      <div className="text-sm text-muted-foreground">Projected Latency</div>
                      <div className="text-xs text-green-600 mt-1">↘ 93% improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">$2.1M</div>
                      <div className="text-sm text-muted-foreground">CapEx Avoided</div>
                      <div className="text-xs text-blue-600 mt-1">↘ 100% savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">42%</div>
                      <div className="text-sm text-muted-foreground">Annual ROI</div>
                      <div className="text-xs text-purple-600 mt-1">↗ 8x industry avg</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                      <Download className="h-5 w-5 mr-2" />
                      Download Your Custom Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-lg border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Success Story: National Edge Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg italic text-muted-foreground mb-4 border-l-4 border-l-orange-500 pl-4">
                    "We went from concept to a fully operational national edge network in 90 days — something that would have taken our IT team 2 years to build."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">CTO, Fortune 500 Company</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Trusted by Industry Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {["Smart City", "Manufacturing Giant", "Media Company", "AI Startup"].map((company, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-4 py-2">
                        {company}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>SOC 2 Type II</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span>Tier III Ready</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 5: The Trust - The Edge Standard for Industry Leaders */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/10" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Industry Standard</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Edge Standard for Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Join the forward-thinking organizations already leveraging Micro DCaaS for competitive advantage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Financial Services",
                stat: "99.999%",
                desc: "Uptime for trading systems",
                icon: <BarChart3 className="h-8 w-8" />,
                color: "green"
              },
              {
                title: "Healthcare Systems",
                stat: "HIPAA Compliant",
                desc: "Secure data processing at edge",
                icon: <Shield className="h-8 w-8" />,
                color: "blue"
              },
              {
                title: "Manufacturing",
                stat: "68% Faster",
                desc: "ML inference for quality control",
                icon: <Cpu className="h-8 w-8" />,
                color: "purple"
              }
            ].map((industry, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${industry.color}-100 dark:bg-${industry.color}-900/30 flex items-center justify-center`}>
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                <div className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {industry.stat}
                </div>
                <p className="text-muted-foreground">{industry.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 border-l-4 border-l-blue-500 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <Cloud className="h-6 w-6 text-blue-600" />
                The Speed of Deployment Case Study
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-blue-600 mb-3">Challenge</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A regional healthcare provider needed to deploy AI diagnostic capabilities across 50 locations while maintaining HIPAA compliance and ensuring sub-50ms response times for critical care decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-green-600 mb-3">Solution</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deployed MDaaS nodes at each location, enabling local AI processing while maintaining centralized oversight. Achieved full deployment in 45 days with 99.99% availability.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t">
                <Button variant="outline" className="w-full group">
                  Read Full Case Study
                  <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Stage 6: The Conversion - Ready to Deploy Your First Node? */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-4">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Get Started</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Ready to Deploy Your First Node?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get a free, custom edge architecture proposal. In 30 minutes, we'll map your needs to a tailored MDaaS solution.
            </p>
          </div>

          <Card className="p-10 shadow-2xl border-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-6">In your consultation, you will receive:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Custom Node Configuration</div>
                    <div className="text-sm text-muted-foreground">
                      Tailored to your specific workload requirements
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Detailed Quote & TCO</div>
                    <div className="text-sm text-muted-foreground">
                      5-year total cost of ownership analysis
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Sample SLA Agreement</div>
                    <div className="text-sm text-muted-foreground">
                      Service level terms customized for your needs
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
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Primary Goal</label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-slate-800">
                    <option>Reduce Latency</option>
                    <option>Solve Data Sovereignty</option>
                    <option>Scale AI Infrastructure</option>
                    <option>Replace CapEx with OpEx</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Deployment Timeline</label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-slate-800">
                    <option>Exploring Options</option>
                    <option>0-3 months</option>
                    <option>3-6 months</option>
                    <option>6-12 months</option>
                  </select>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-amber-600" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    All consultations are confidential and come with a pre-signed NDA if requested.
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg py-4">
                <Star className="h-6 w-6 mr-2" />
                Book Your Private Consultation
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                No commitment required • 30-minute technical assessment • Confidential discussion
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Stage 7: Investor Flow - The Physical Layer of the Edge Computing Boom */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900 dark:to-gray-900">
        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Investor Opportunity</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              The Physical Layer of the Edge Computing Boom
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Micro Data Centers represent the next wave of critical infrastructure —
              physical, necessary, and generating recurring revenue.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Investment Highlights</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Predictable Revenue",
                      desc: "7-10 year service contracts with enterprise customers",
                      metric: "85%+ Annual Renewal Rate"
                    },
                    {
                      title: "High Margins",
                      desc: "Infrastructure-as-a-service delivers premium margins",
                      metric: "60-70% Gross Margins at Scale"
                    },
                    {
                      title: "Network Effects",
                      desc: "Each deployment increases total mesh value",
                      metric: "2-3x Value Multiplier per Node"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                      <div className="text-xl font-bold text-blue-600">{item.metric}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">ESG Alignment</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Sustainable by Design</div>
                      <div className="text-sm text-muted-foreground">
                        PUE &lt; 1.3 with solar/geothermal integration
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Carbon Reduction</div>
                      <div className="text-sm text-muted-foreground">
                        Measurable carbon footprint reduction for customers
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Digital Inclusion</div>
                      <div className="text-sm text-muted-foreground">
                        Extending connectivity to underserved communities
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-8 h-full">
                <h3 className="text-2xl font-bold mb-6">Exit Opportunity</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">3-5x</div>
                    <div className="text-lg text-muted-foreground">Revenue Multiple at Scale</div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Strategic Acquisition Targets</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Telecommunications", "Hyperscalers", "REITs", "Infrastructure Funds"].map((target, index) => (
                        <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded text-center">
                          <span className="text-sm font-medium">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h4 className="font-bold text-lg mb-4">Investor Resources</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start group">
                        <MapPin className="h-4 w-4 mr-2" />
                        View Network Growth Map
                        <ArrowUpRight className="h-4 w-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start group">
                        <Download className="h-4 w-4 mr-2" />
                        Download Investor Memorandum
                        <ArrowUpRight className="h-4 w-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start group">
                        <Users className="h-4 w-4 mr-2" />
                        Contact Head of Corporate Development
                        <ArrowUpRight className="h-4 w-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-lg text-muted-foreground mb-6">
              Join us in building the physical infrastructure layer of the edge computing revolution
            </p>
            <Button size="lg" className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white group">
              <TrendingUp className="h-6 w-6 mr-2" />
              Join Our Strategic Investment Round
              <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}