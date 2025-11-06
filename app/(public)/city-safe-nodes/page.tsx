import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Wifi,
  Zap,
  Building2,
  Users,
  MapPin,
  Network,
  Sun,
  Camera,
  Monitor,
  Smartphone,
  Car,
  Building,
  User,
  Wifi as WifiIcon,
  Github,
  Star,
  Download,
  Phone,
  Mail,
  Video,
  Award,
  Eye
} from "lucide-react";

export default function CitySafeNodesPage() {
  return (
    <div className="min-h-screen">
      {/* Stage 1: The Hook - Community Aspiration */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/10" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                The Heartbeat of a Smarter, Safer, More Connected Community
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                The Safest Streets are the Smartest Ones
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  City Safe Nodes are the friendly guardians of your neighborhood. Built into bus stops and streetlights, they provide real-time safety insights, free public Wi-Fi, and essential city services—powered by clean energy and designed with absolute privacy.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    See the Impact
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Community Brief
                  </Button>
                </div>
              </div>
            </div>
            <Card className="h-96 bg-gradient-to-br from-emerald-900 to-blue-900 border-emerald-700">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-white/70">
                  <Building2 className="h-24 w-24 mx-auto mb-4" />
                  <p>City Street Visualization</p>
                  <p className="text-sm mt-2">(Day to night transformation with integrated nodes)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Stage 2: The Solution - The Invisible Guardian */}
      <Section
        kicker="How It Works"
        title="How a Bus Stop Becomes a Community Hub"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Interactive Node Diagram - Hover to explore features
            </p>
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Sun className="h-8 w-8 text-yellow-600" />,
                    title: "Solar Panel",
                    description: "100% Solar-Powered | Off-grid capable"
                  },
                  {
                    icon: <Camera className="h-8 w-8 text-green-600" />,
                    title: "Sensors",
                    description: "Anonymous Environmental Data | Air Quality, Sound, Traffic"
                  },
                  {
                    icon: <Monitor className="h-8 w-8 text-blue-600" />,
                    title: "AI Core",
                    description: "On-Device Processing | No Personal Data Ever Leaves the Node"
                  },
                  {
                    icon: <Smartphone className="h-8 w-8 text-purple-600" />,
                    title: "Digital Screen",
                    description: "Public Alerts, Transit Info, Community News"
                  },
                  {
                    icon: <WifiIcon className="h-8 w-8 text-indigo-600" />,
                    title: "Wi-Fi",
                    description: "Free Public Connectivity"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        {feature.icon}
                        <CardTitle className="text-sm">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                Privacy by Design
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our nodes process all data locally. They are programmed to ignore personal identifiers (PII)—seeing the world in terms of objects and patterns, not people.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { metric: "100%", label: "Solar Powered" },
                { metric: "0", label: "PII Collected" },
                { metric: "24/7", label: "Community Monitoring" },
                { metric: "Free", label: "Public Wi-Fi" }
              ].map((stat, index) => (
                <Card key={index} className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {stat.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 3: The Proof & Privacy - Our Unbreakable Promise */}
      <Section
        kicker="Trust & Transparency"
        title="We Built Trust into the Blueprint"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              In an era of surveillance concerns, we took a different path. Our nodes are the first in the industry with <strong>open-source, auditable privacy filters.</strong> See for yourself how we anonymize data at the source.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Github className="h-4 w-4 mr-2" />
                Review Our Open-Source Code on GitHub
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Read Our Public Privacy Manifesto
              </Button>
            </div>
          </div>
          <Card className="p-8">
            <h4 className="text-xl font-bold mb-6 text-center">Privacy in Action</h4>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-950/20">
                <h5 className="font-semibold text-red-800 dark:text-red-300 mb-2">Raw Sensor Input</h5>
                <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">Blurry, pixelated image</span>
                </div>
              </Card>
              <Card className="p-4 border-green-200 bg-green-50 dark:bg-green-950/20">
                <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">Processed Output</h5>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-xs space-y-1">
                      <div>Cars: 12</div>
                      <div>Pedestrians: ●●●●●</div>
                      <div>Air Quality: Good</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </Section>

      {/* Stage 4: The Impact - A Win for Everyone */}
      <Section
        kicker="Community Benefits"
        title="A Rising Tide for the Entire City"
      >
        <div className="mb-8">
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Click on each stakeholder to see how they benefit from City Safe Nodes
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🏛️",
              title: "City Leaders & Mayors",
              description: "Deliver tangible public safety and connectivity wins. Funded through public-private partnerships and new ad revenue, not tax hikes.",
              metric: "20% increase in perceived public safety"
            },
            {
              icon: "👨‍👩‍👧‍👦",
              title: "Transit Riders & Residents",
              description: "Feel safer at your bus stop. Get real-time transit updates and free Wi-Fi. Know your city is investing in your neighborhood.",
              metric: "Free Gigabit Wi-Fi at every node"
            },
            {
              icon: "💼",
              title: "Local Businesses",
              description: "Hyper-local advertising on digital displays. Support community safety while reaching customers where they live and work.",
              metric: "Connect with 10,000+ daily commuters per corridor"
            },
            {
              icon: "🗺️",
              title: "Urban Planners",
              description: "A granular, real-time dataset on urban flow and environment—all anonymized—to make smarter, data-driven decisions.",
              metric: "Reduce emergency response times with real-time alerting"
            }
          ].map((stakeholder, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">{stakeholder.icon}</div>
              <h3 className="font-bold mb-3">{stakeholder.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{stakeholder.description}</p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  {stakeholder.metric}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Stage 5: The Pilot - Risk-Free Pathway */}
      <Section
        kicker="Get Started"
        title="Prove It On One Street. Then Scale to the Whole City."
        className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 bg-white dark:bg-slate-800">
              <h3 className="text-2xl font-bold mb-4">Zero-Cost Pilot Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span>We'll deploy a 10-node pilot along your chosen corridor at zero upfront cost</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span>You'll receive a full public dashboard and a 90-day impact report</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="size-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                  <span>The pilot pays for itself through shared advertising and compute revenue</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Apply for Your City's Pilot
              </Button>
            </Card>
          </div>
          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-xl font-bold mb-4">Interactive Smart Corridor Map</h3>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Click nodes to see live data</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { node: "Node 3", stat: "15 GB Wi-Fi used today" },
                { node: "Node 7", stat: "Alert sent for traffic incident" },
                { node: "Node 10", stat: "$45 in ad revenue generated" }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="font-semibold text-sm">{item.node}</div>
                  <div className="text-xs text-muted-foreground">{item.stat}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Stage 6: The Social Proof - Market Street Transformation */}
      <Section
        kicker="Success Story"
        title="From Concept to Corridor: The Market Street Transformation"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Video className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold">City Official Testimonial</h3>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Star className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-muted-foreground">Video testimonial from SF city official</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Market Street Pilot Results</h3>
            <div className="grid gap-4">
              {[
                { category: "Public Safety", rating: "⭐⭐⭐⭐⭐", result: "100% of residents felt safer" },
                { category: "Connectivity", rating: "📶", result: "15 TB of free data provided to the public" },
                { category: "Revenue", rating: "💰", result: "$260K annual revenue generated for city services" },
                { category: "Efficiency", rating: "⚡", result: "45% faster emergency vehicle routing" },
                { category: "Privacy", rating: "🔒", result: "Zero privacy complaints. 100% compliance." }
              ].map((result, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{result.rating}</span>
                      <div>
                        <div className="font-semibold">{result.category}</div>
                        <div className="text-sm text-muted-foreground">{result.result}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Read the Full Market Street Case Study
            </Button>
          </div>
        </div>
      </Section>

      {/* Stage 7: The Call to Action - For All Audiences */}
      <Section
        kicker="Get Started"
        title="Ready to Build a Safer, Smarter Community?"
        className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're a city government, transit agency, community group, or investor, we have a pathway tailored for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Building className="h-8 w-8 text-blue-600" />,
              title: "City Governments",
              description: "Transform urban infrastructure with smart, safe, and sustainable solutions.",
              cta: "Schedule a Civic Tech Demo",
              color: "bg-blue-600 hover:bg-blue-700"
            },
            {
              icon: <Car className="h-8 w-8 text-green-600" />,
              title: "Transit Agencies",
              description: "Enhance rider experience and optimize operations with real-time data.",
              cta: "Download Transit Integration Guide",
              color: "bg-green-600 hover:bg-green-700"
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Community Groups",
              description: "Bring safety and connectivity to your neighborhood.",
              cta: "Get a Free Council Presentation",
              color: "bg-purple-600 hover:bg-purple-700"
            },
            {
              icon: <Award className="h-8 w-8 text-amber-600" />,
              title: "Investors",
              description: "Explore the massive opportunity in urban tech infrastructure.",
              cta: "Explore Urban Tech Opportunity",
              color: "bg-amber-600 hover:bg-amber-700"
            }
          ].map((audience, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{audience.icon}</div>
              <h3 className="font-bold mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{audience.description}</p>
              <Button className={`w-full ${audience.color} text-white`}>
                {audience.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions? We're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Schedule a Call
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}