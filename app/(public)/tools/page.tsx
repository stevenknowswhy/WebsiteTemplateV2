import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Calculator,
  Map,
  Box,
  BarChart3,
  Mail,
  Clock,
  Search,
  Filter,
  Download,
  ExternalLink,
  Star,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Tools & Calculators | Forhem PBC",
  description: "Explore our suite of interactive tools for revenue projections, deployment planning, and smart city analytics.",
};

interface ToolCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "business" | "technical" | "analytics" | "planning";
  status: "available" | "coming-soon";
  href?: string;
  badge?: string;
  features: string[];
}

const tools: ToolCard[] = [
  {
    title: "Revenue Calculator",
    description: "Calculate potential revenue from Hello Smart Node deployment on your property with real-time projections.",
    icon: <Calculator className="h-6 w-6 text-green-600" />,
    category: "business",
    status: "available",
    href: "/tools/revenue-calculator",
    badge: "Popular",
    features: [
      "Property type analysis",
      "Traffic-based projections",
      "Multi-node calculations",
      "Revenue breakdown visualization"
    ]
  },
  {
    title: "Deployment Map",
    description: "Interactive map showing current and planned Hello Smart Node deployments with real-time status.",
    icon: <Map className="h-6 w-6 text-blue-600" />,
    category: "planning",
    status: "available",
    href: "/tools/deployment-map",
    badge: "Live Data",
    features: [
      "Real-time node status",
      "City-wide deployment view",
      "Network coverage analysis",
      "Installation progress tracking"
    ]
  },
  {
    title: "3D Product Viewer",
    description: "Explore Hello Smart Node and City Safe Platform with interactive 3D models and component breakdowns.",
    icon: <Box className="h-6 w-6 text-purple-600" />,
    category: "technical",
    status: "available",
    href: "/tools/3d-viewer",
    features: [
      "Interactive 3D models",
      "Component breakdown views",
      "Technical specifications",
      "AR mode preview"
    ]
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard showing network performance, user engagement, and environmental impact.",
    icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
    category: "analytics",
    status: "available",
    href: "/tools/analytics",
    features: [
      "Real-time metrics",
      "Network performance data",
      "Environmental impact tracking",
      "Custom reporting"
    ]
  },
  {
    title: "Newsletter Signup",
    description: "Subscribe to receive updates on smart city innovation, deployment news, and PBC impact reports.",
    icon: <Mail className="h-6 w-6 text-indigo-600" />,
    category: "business",
    status: "available",
    href: "/tools/newsletter",
    features: [
      "Customizable content preferences",
      "Role-based updates",
      "Industry-specific insights",
      "Monthly impact reports"
    ]
  },
  {
    title: "Interactive Timeline",
    description: "Explore Forhem's journey from founding to future milestones with our interactive company timeline.",
    icon: <Clock className="h-6 w-6 text-teal-600" />,
    category: "planning",
    status: "available",
    href: "/tools/timeline",
    features: [
      "Company milestones",
      "Product development history",
      "Partnership achievements",
      "Future roadmap preview"
    ]
  },
  {
    title: "ROI Analysis Tool",
    description: "Comprehensive ROI calculator including installation costs, maintenance, and long-term benefits analysis.",
    icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
    category: "business",
    status: "coming-soon",
    features: [
      "Total cost analysis",
      "5-year projections",
      "Comparison with alternatives",
      "Risk assessment"
    ]
  },
  {
    title: "Advanced Search",
    description: "Search through our knowledge base, documentation, and case studies with AI-powered results.",
    icon: <Search className="h-6 w-6 text-cyan-600" />,
    category: "technical",
    status: "coming-soon",
    features: [
      "AI-powered search",
      "Document filtering",
      "Case study finder",
      "Technical resource access"
    ]
  },
  {
    title: "Impact Calculator",
    description: "Calculate environmental and social impact metrics for your proposed deployment area.",
    icon: <Star className="h-6 w-6 text-yellow-600" />,
    category: "analytics",
    status: "coming-soon",
    features: [
      "CO2 reduction estimates",
      "Community impact metrics",
      "Air quality improvements",
      "Social benefit analysis"
    ]
  }
];

const categories = [
  { value: "all", label: "All Tools", count: tools.length },
  { value: "business", label: "Business Tools", count: tools.filter(t => t.category === "business").length },
  { value: "technical", label: "Technical Tools", count: tools.filter(t => t.category === "technical").length },
  { value: "analytics", label: "Analytics Tools", count: tools.filter(t => t.category === "analytics").length },
  { value: "planning", label: "Planning Tools", count: tools.filter(t => t.category === "planning").length }
];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Interactive Tools & Resources
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive suite of tools designed to help cities, property owners, and partners
          make informed decisions about smart infrastructure deployment.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{tools.filter(t => t.status === "available").length}</div>
          <p className="text-sm text-muted-foreground">Available Tools</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{tools.filter(t => t.category === "business").length}</div>
          <p className="text-sm text-muted-foreground">Business Tools</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{tools.filter(t => t.category === "technical").length}</div>
          <p className="text-sm text-muted-foreground">Technical Tools</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{tools.filter(t => t.status === "coming-soon").length}</div>
          <p className="text-sm text-muted-foreground">Coming Soon</p>
        </Card>
      </div>

      {/* Tools Grid */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-center">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value} className="relative">
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter(tool => category.value === "all" || tool.category === category.value)
                .map((tool) => (
                  <Card key={tool.title} className="p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {tool.icon}
                          <div>
                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                            {tool.badge && (
                              <Badge variant="default" className="text-xs mt-1">
                                {tool.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={tool.status === "available" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {tool.status === "available" ? "Available" : "Coming Soon"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Features:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                              <span className="text-green-600">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      {tool.status === "available" && tool.href ? (
                        <Link href={tool.href}>
                          <Button className="w-full">
                            {tool.category === "business" ? (
                              <>
                                <Calculator className="h-4 w-4 mr-2" />
                                Try Tool
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Explore Tool
                              </>
                            )}
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          <Download className="h-4 w-4 mr-2" />
                          Coming Soon
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Information Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <span>Tool Development Roadmap</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We're continuously developing new tools to support our partners and stakeholders.
              Our development roadmap includes advanced analytics, planning tools, and
              community engagement platforms.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="size-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Q1 2025: ROI Analysis Tool & Impact Calculator</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="size-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Q2 2025: Advanced Search & Resource Library</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="size-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm">Q3 2025: Community Planning Tools</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span>Tool Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Business Tools</h4>
                <p className="text-xs text-muted-foreground">
                  Revenue calculators, ROI analysis, and financial planning tools for property owners and investors.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Technical Tools</h4>
                <p className="text-xs text-muted-foreground">
                  3D viewers, specifications, and technical documentation for engineers and technical teams.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Analytics Tools</h4>
                <p className="text-xs text-muted-foreground">
                  Real-time dashboards, impact metrics, and performance tracking for stakeholders.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Planning Tools</h4>
                <p className="text-xs text-muted-foreground">
                  Deployment maps, timelines, and planning resources for cities and partners.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Need a Custom Tool?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with cities, property owners, and partners to develop custom tools and analytics
            tailored to specific needs and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                Request Custom Tool
              </Button>
            </Link>
            <Link href="/for-cities">
              <Button variant="outline" size="lg">
                City Partnerships
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}