import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wifi, Shield, Zap, ArrowRight, MapPin, Users, Building2, TreePine, Cpu, Battery, Sun, Lock } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Privacy-Powered Infrastructure"
        title="Solar-Powered Solutions That Protect Privacy"
        description="Hello Smart Nodes and City Safe work together to create resilient urban infrastructure that runs on clean energy and protects personal privacy by design."
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Link href="/solutions/hello-smart-node" className="group">
            <Card className="h-full transition-all hover:shadow-lg border-border/50 hover:border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <Wifi className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Hello Smart Nodes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Community connectivity hubs</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Solar-powered smart infrastructure providing free public Wi-Fi, environmental monitoring,
                  and backup power—all with zero personal data collection while generating revenue for cities and property owners.
                </p>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Privacy-First Design</span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Zero personal data collected, ever</p>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: <Wifi className="h-4 w-4" />, feature: "Free public Wi-Fi" },
                    { icon: <Sun className="h-4 w-4" />, feature: "100% solar powered" },
                    { icon: <TreePine className="h-4 w-4" />, feature: "Environmental monitoring" },
                    { icon: <Lock className="h-4 w-4" />, feature: "Privacy by design" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="text-blue-600">{item.icon}</div>
                      <span>{item.feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white">
                  Explore Hello Smart Nodes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/solutions/city-safe" className="group">
            <Card className="h-full transition-all hover:shadow-lg border-border/50 hover:border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="size-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">City Safe Platform</h3>
                    <p className="text-sm text-muted-foreground mt-1">Municipal resilience network</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Hardened infrastructure for emergency response, public safety, and critical services
                  with sovereign-grade security and uninterrupted operations.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: <Shield className="h-4 w-4" />, feature: "Emergency response systems" },
                    { icon: <Zap className="h-4 w-4" />, feature: "Uninterrupted operations" },
                    { icon: <Cpu className="h-4 w-4" />, feature: "Sovereign-grade security" },
                    { icon: <MapPin className="h-4 w-4" />, feature: "Strategic placement" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="text-green-600">{item.icon}</div>
                      <span>{item.feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white">
                  Discover City Safe Platform
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </Section>

      {/* Unified Network Benefits */}
      <Section
        kicker="Network Effect"
        title="Better Together: The Power of Integration"
        description="When Hello Smart Nodes and City Safe work together, cities get comprehensive coverage from community connectivity to critical infrastructure protection."
      >
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <Card className="p-8 text-center">
            <div className="size-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Revenue Generation</h3>
            <p className="text-muted-foreground mb-4">
              Both product lines generate revenue through service subscriptions, reducing costs
              to zero while creating income streams for cities and property owners.
            </p>
            <div className="text-2xl font-bold text-green-600">25%</div>
            <p className="text-sm text-muted-foreground">City revenue share</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="size-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Complete Coverage</h3>
            <p className="text-muted-foreground mb-4">
              From neighborhood connectivity to critical infrastructure, the unified network
              provides comprehensive coverage for all municipal needs.
            </p>
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <p className="text-sm text-muted-foreground">City-wide service area</p>
          </Card>

          <Card className="p-8 text-center">
            <div className="size-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Resilience & Safety</h3>
            <p className="text-muted-foreground mb-4">
              Integrated emergency response and backup systems ensure cities remain operational
              during grid outages and natural disasters.
            </p>
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <p className="text-sm text-muted-foreground">Continuous operations</p>
          </Card>
        </div>
      </Section>

      {/* Deployment Architecture */}
      <Section
        kicker="Architecture"
        title="How the Network Works Together"
        description="Strategic placement and integration ensure maximum coverage and resilience for urban communities."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Strategic Placement</h3>
            <div className="space-y-4">
              {[
                {
                  type: "Hello Smart Nodes",
                  locations: "Commercial rooftops, retail centers, public spaces",
                  density: "1 node per 2-4 city blocks",
                  focus: "Community connectivity and environmental monitoring"
                },
                {
                  type: "City Safe Nodes",
                  locations: "Critical infrastructure, government buildings, emergency hubs",
                  density: "Strategic high-value locations",
                  focus: "Emergency services and critical operations"
                }
              ].map((deployment, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                  <h4 className="font-semibold mb-1">{deployment.type}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{deployment.locations}</p>
                  <p className="text-sm font-medium">{deployment.focus}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Network Integration</h3>
            <div className="space-y-4">
              {[
                {
                  capability: "Shared Infrastructure",
                  description: "Common power systems, connectivity backbone, and management platform"
                },
                {
                  capability: "Data Synchronization",
                  description: "Real-time sharing between environmental monitoring and emergency response"
                },
                {
                  capability: "Load Balancing",
                  description: "Dynamic resource allocation based on community needs and emergencies"
                },
                {
                  capability: "Unified Management",
                  description: "Single dashboard for monitoring, maintenance, and analytics"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="size-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.capability}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Use Cases Section */}
      <Section
        kicker="Applications"
        title="Transforming Urban Infrastructure"
        description="Real-world applications showing how the unified network creates value for communities."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Wifi className="h-8 w-8 text-blue-600" />,
              title: "Digital Equity",
              description: "Bridging the digital divide with free public Wi-Fi in underserved communities"
            },
            {
              icon: <Shield className="h-8 w-8 text-green-600" />,
              title: "Emergency Response",
              description: "Powered emergency beacons and communication systems during disasters"
            },
            {
              icon: <TreePine className="h-8 w-8 text-green-500" />,
              title: "Environmental Monitoring",
              description: "Real-time air quality, noise, and environmental data for city planning"
            },
            {
              icon: <Battery className="h-8 w-8 text-yellow-600" />,
              title: "Grid Resilience",
              description: "Backup power and critical services during power outages and emergencies"
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Smart City Services",
              description: "IoT connectivity for traffic management, waste, and urban services"
            },
            {
              icon: <Building2 className="h-8 w-8 text-gray-600" />,
              title: "Economic Development",
              description: "Revenue generation and cost reduction for municipal budgets"
            }
          ].map((useCase, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                {useCase.icon}
              </div>
              <h4 className="font-semibold mb-2">{useCase.title}</h4>
              <p className="text-sm text-muted-foreground">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}