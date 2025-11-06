import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  DollarSign,
  Shield,
  Wifi,
  Camera,
  Zap,
  TrendingUp,
  Leaf,
  Users,
  Calculator,
  CheckCircle,
  ExternalLink,
  BarChart3,
  Download,
  Phone,
  Mail,
  Award,
  Server,
  Target,
  Briefcase,
  Home,
  Store,
  Truck,
  GraduationCap,
  Handshake
} from 'lucide-react';

export default function HelloSafeNodesPage() {
  return (
    <div className="min-h-screen">
      {/* Stage 1: The Hook - Awareness (The "Aha!" Moment) */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/10" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                The Smartest Square Foot You'll Ever Lease
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Your Property is Sitting on a Goldmine
                <span className="block text-3xl lg:text-4xl text-emerald-600 dark:text-emerald-400 mt-2">
                  It's Time to Dig
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Hello Safe Nodes turn underutilized property space—rooftops, parking garages, building perimeters—into a powerful source of new revenue, enhanced safety, and valuable data insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Your Potential Revenue
                  </Button>
                  <Button variant="outline" size="lg">
                    <Server className="h-4 w-4 mr-2" />
                    See Unit Specs
                  </Button>
                </div>
              </div>
            </div>
            <Card className="h-96 bg-gradient-to-br from-emerald-900 to-blue-900 border-emerald-700">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-white/70">
                  <Building2 className="h-24 w-24 mx-auto mb-4" />
                  <p>Building Transformation Animation</p>
                  <p className="text-sm mt-2">(Static building → Revenue-generating asset)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Stage 2: The Solution - Consideration (The "How It Works") */}
      <Section
        kicker="Commercial Infrastructure"
        title="A New Class of Tenant for Your Property. One That Pays You."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Interactive Building Diagram - Hover to explore features
            </p>
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Server className="h-8 w-8 text-emerald-600" />,
                    title: "Node",
                    description: "Plug-and-Play Installation | Minimal Disruption"
                  },
                  {
                    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                    title: "Data Streams",
                    description: "Privacy-First AI Analytics | Anonymized insights"
                  },
                  {
                    icon: <DollarSign className="h-8 w-8 text-green-600" />,
                    title: "Revenue Streams",
                    description: "Compute Leasing, Data Insights, Ad Partnerships"
                  },
                  {
                    icon: <Building2 className="h-8 w-8 text-purple-600" />,
                    title: "Building Systems",
                    description: "HVAC, Lighting, Security Integration"
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
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                Zero Capex, Instant Opex
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose our revenue-share model and we handle installation and maintenance. You provide the space; we provide the profit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { metric: "$0", label: "Upfront Cost" },
                { metric: "60%+", label: "Gross Margin" },
                { metric: "24/7", label: "Revenue Monitoring" },
                { metric: "7-10", label: "Year Contracts" }
              ].map((stat, index) => (
                <Card key={index} className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    {stat.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stage 3: The Proof - Evaluation (The "Show Me the Money") */}
      <Section
        kicker="Financial Returns"
        title="The Numbers Don't Lie"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">ROI Calculator</h3>
            <p className="text-lg text-muted-foreground">
              Calculate your potential returns in real-time
            </p>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Office Tower", "Retail Mall", "Industrial Park", "Campus"].map((type) => (
                      <Button key={type} variant="outline" size="sm" className="w-full">
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Property Size (Sq Ft)</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">50K</Button>
                    <Button variant="outline" size="sm">100K</Button>
                    <Button variant="outline" size="sm">250K</Button>
                    <Button variant="outline" size="sm">500K+</Button>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Your Estimated Returns:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded">
                      <div className="text-sm text-emerald-700 dark:text-emerald-300">Annual Revenue</div>
                      <div className="text-lg font-bold">$15K - $45K</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                      <div className="text-sm text-blue-700 dark:text-blue-300">Security Savings</div>
                      <div className="text-lg font-bold">Up to 20%</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded">
                      <div className="text-sm text-purple-700 dark:text-purple-300">Asset Value Increase</div>
                      <div className="text-lg font-bold">3-5%</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                      <div className="text-sm text-green-700 dark:text-green-300">Carbon Offset</div>
                      <div className="text-lg font-bold">X tons CO₂</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-bold">Success Story: Downtown Office Tower</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Challenge</h4>
                  <p className="text-sm text-muted-foreground">
                    Needed to enhance security and find new revenue streams without major capital expenditure.
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground">
                    Installed 4 Hello Safe Nodes on rooftop and parking garage.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { metric: "$28K", label: "Annual Revenue Generated" },
                    { metric: "15%", label: "Security Cost Reduction" },
                    { metric: "4.5%", label: "Property Value Increase" }
                  ].map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <span className="font-semibold">{result.metric}</span>
                      <span className="text-sm text-muted-foreground">{result.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Stage 4: The Action - Conversion (The "Make It Easy") */}
      <Section
        kicker="Get Started"
        title="Let's Build Your Custom Proposal"
        className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground text-center mb-8">
            Choose the path that works best for your property
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "Revenue Share Model",
                subtitle: "No Capex",
                description: "Ideal for owners who want immediate, risk-free income",
                features: [
                  "Zero upfront investment",
                  "We handle all installation & maintenance",
                  "Start earning from day one",
                  "7-10 year revenue-sharing agreement"
                ],
                color: "bg-emerald-600 hover:bg-emerald-700"
              },
              {
                title: "Lease-to-Own Model",
                subtitle: "3-Year Term",
                description: "Ideal for owners who want to own the asset long-term",
                features: [
                  "Own the equipment after 3 years",
                  "Capture 100% of revenue long-term",
                  "Financing options available",
                  "Higher returns after payoff"
                ],
                color: "bg-blue-600 hover:bg-blue-700"
              }
            ].map((model, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-slate-800">
                <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{model.subtitle} • {model.description}</p>
                <ul className="space-y-2 mb-6">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${model.color} text-white`}>
                  Request Your Free Site Assessment
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-xl font-bold mb-4 text-center">What You'll Receive:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Target className="h-8 w-8 text-emerald-600" />,
                  title: "3D Property Rendering",
                  description: "Visualize nodes on your specific property"
                },
                {
                  icon: <Calculator className="h-8 w-8 text-blue-600" />,
                  title: "Custom ROI Model",
                  description: "Property-specific financial projections"
                },
                {
                  icon: <Handshake className="h-8 w-8 text-purple-600" />,
                  title: "Draft Partnership Agreement",
                  description: "Ready for legal review"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Stage 5: The Partnership - Loyalty (The "Welcome to the Network") */}
      <Section
        kicker="Partnership"
        title="You're Not Just a Client. You're a Network Partner."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Your Partner Dashboard</h3>
              <div className="space-y-4">
                {[
                  { metric: "$2,847", label: "This Month's Revenue", trend: "+12%" },
                  { metric: "99.8%", label: "Network Uptime", trend: "Stable" },
                  { metric: "47", label: "Safety Events Detected", trend: "-5%" },
                  { metric: "12.5", label: "Carbon Tons Offset", trend: "+8%" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <div className="font-semibold">{stat.metric}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                    <div className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-600' : stat.trend.startsWith('-') ? 'text-red-600' : 'text-blue-600'}`}>
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Partnership Perks</h3>
            <div className="space-y-4">
              {[
                {
                  icon: <Award className="h-6 w-6 text-emerald-600" />,
                  title: "Hello Safe Partner Program",
                  description: "Access to aggregated, anonymized urban data trends"
                },
                {
                  icon: <Users className="h-6 w-6 text-blue-600" />,
                  title: "Referral Bonus",
                  description: "$5,000 credit for every property owner you refer"
                },
                {
                  icon: <Leaf className="h-6 w-6 text-green-600" />,
                  title: "Sustainability Credits",
                  description: "Verified reports for your ESG filings"
                },
                {
                  icon: <Wifi className="h-6 w-6 text-purple-600" />,
                  title: "Network Priority",
                  description: "Priority access to new features and expansions"
                }
              ].map((perk, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    {perk.icon}
                    <div>
                      <h4 className="font-semibold">{perk.title}</h4>
                      <p className="text-sm text-muted-foreground">{perk.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Access Your Partner Portal
            </Button>
          </div>
        </div>
      </Section>

      {/* Property Type Showcase */}
      <Section
        kicker="Ideal Properties"
        title="Transform Your Commercial Space"
        className="bg-muted/50"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: <Building2 className="h-8 w-8 text-emerald-600" />,
              title: "Office Towers",
              description: "Rooftops and parking garages"
            },
            {
              icon: <Store className="h-8 w-8 text-blue-600" />,
              title: "Retail Centers",
              description: "Malls and shopping centers"
            },
            {
              icon: <Truck className="h-8 w-8 text-green-600" />,
              title: "Industrial Parks",
              description: "Warehouses and logistics centers"
            },
            {
              icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
              title: "Campuses",
              description: "Universities and corporate campuses"
            },
            {
              icon: <Home className="h-8 w-8 text-amber-600" />,
              title: "Mixed-Use",
              description: "Commercial-residential complexes"
            }
          ].map((property, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{property.icon}</div>
              <h3 className="font-bold mb-2">{property.title}</h3>
              <p className="text-sm text-muted-foreground">{property.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Investor/Partner Footer Section */}
      <Section
        kicker="Investment Opportunity"
        title="The Physical Layer of Data-Driven City is Real Estate"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              Hello Safe Nodes are creating a new asset class: <strong>Data-Generating Property.</strong>
              We're building a distributed network with predictable, recurring revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">Key Metrics for Investors</h3>
              <div className="space-y-3">
                {[
                  { metric: ">60%", label: "Gross Margin per Node" },
                  { metric: "7-10 years", label: "Recurring Revenue Contracts" },
                  { metric: "Network Effect", label: "Each Node Increases Overall Value" },
                  { metric: "Millions", label: "Global Deployment Sites" }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <span className="font-semibold">{metric.metric}</span>
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Why Invest Now</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "First-Mover Advantage",
                    description: "Establishing the standard for commercial edge infrastructure"
                  },
                  {
                    title: "Scalable Model",
                    description: "Proven deployment process with replicable unit economics"
                  },
                  {
                    title: "Urban Demand",
                    description: "Cities worldwide require smart infrastructure investment"
                  },
                  {
                    title: "ESG Alignment",
                    description: "Strong environmental and social governance credentials"
                  }
                ].map((reason, index) => (
                  <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">{reason.title}</h4>
                    <p className="text-xs text-muted-foreground">{reason.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Hello Safe Network Economics Report
            </Button>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your Property?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Turn your underutilized space into a revenue-generating smart asset.
            Let us show you exactly what's possible for your property.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Phone className="h-4 w-4 mr-2" />
              Schedule a Consultation
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-4 w-4 mr-2" />
              Email Our Team
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}