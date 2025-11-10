import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  Network,
  Heart,
  Users,
  Handshake,
  Shield,
  Building,
  Zap,
  Globe,
  Target,
  Award,
  Star,
  MapPin,
  Download,
  Calendar,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Lightbulb,
  Leaf,
  Eye,
  FileText,
  Mail,
  Phone,
  Briefcase,
  Wrench,
  HardHat,
  Cpu,
  Wifi,
  Smartphone,
  Building2
} from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-100 dark:from-emerald-950/20 dark:via-blue-950/20 dark:to-slate-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGRvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNjgNHYtNGgydjRoLTR2Mmg0djJoNHY0aDJ2LTRoNHY0aDJoLTR2LTR2SDB2LTZ2LTR6Wk02djd2LTRoLTJ2NGgySDR2aDJoLTR2LTJ2LTRoNHY0SDR2SDZ2LTR2SDB2NHYwSDJ2NEg2djRoLTR2SDB2LTR2aDJoLTR6TjZINHY0SDJ2NEg2djRoLTRiSDJ2NEgyNHYwSDJ2NEgyWDB2NEg0SCIkLz48L2c+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
        <div className="relative">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700">
              Partnership Opportunities
            </Badge>
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Build the Unshakable Foundation of Tomorrow.
              <span className="block text-4xl lg:text-5xl text-emerald-700 dark:text-emerald-400 mt-4">
                Together.
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              This isn't just about infrastructure. It's about legacy. Join a curated ecosystem of visionaries
              building the resilient, intelligent systems that will keep our cities safe, connected, and powered for generations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Find Your Partnership Path
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                Our Partnership Philosophy
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* More Than a Vendor. A Force Multiplier. */}
      <Section className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              We Don't Just Subcontract Work.
              <span className="block text-3xl text-emerald-600 dark:text-emerald-400 mt-2">
                We Invest in Your Success.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The challenges we facefrom climate resilience to AI integrationare too complex for any one company to solve.
              We seek true partners: builders, innovators, and stewards who share our conviction that infrastructure
              must be both unbreakable and equitable. In return, we offer more than contracts; we offer
              a shared destiny and the resources to achieve it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Shared Success",
                description: "Your growth is our growth. Our revenue models are designed for your long-term profitability.",
                icon: <TrendingUp className="h-8 w-8 text-emerald-600" />
              },
              {
                title: "Uncompromising Quality",
                description: "We never cut corners. Together, we build to a standard that will last for decades.",
                icon: <Star className="h-8 w-8 text-amber-600" />
              },
              {
                title: "Stewardship",
                description: "We leave every community better than we found it, both digitally and environmentally.",
                icon: <Leaf className="h-8 w-8 text-green-600" />
              },
              {
                title: "Relentless Innovation",
                description: "We learn from each other, pushing the boundaries of what's possible in resilient infrastructure.",
                icon: <Lightbulb className="h-8 w-8 text-blue-600" />
              },
              {
                title: "Trust & Transparency",
                description: "Our partnerships are built on radical transparency and shared commitment to excellence.",
                icon: <Eye className="h-8 w-8 text-purple-600" />
              },
              {
                title: "Legacy Building",
                description: "Together, we're creating infrastructure that will serve and protect for generations to come.",
                icon: <Building className="h-8 w-8 text-slate-600" />
              }
            ].map((principle, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Already Building the Future With:
            </p>
            <div className="flex justify-center items-center space-x-8 mt-4 opacity-60">
              <div className="text-lg font-semibold text-slate-600">Fortune 500 Engineering Firms</div>
              <div className="text-lg font-semibold text-slate-600">Smart City Leaders</div>
              <div className="text-lg font-semibold text-slate-600">Innovation Partners</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Choose Your Mission */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Where Will You Make Your Mark?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your expertise and passion align with specific opportunities to shape the future of infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* The Fortress Builders */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center">
              <Mountain className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600 mb-4">
                The Fortress Builders
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-3">Engineer the Unbreakable</h3>
              <p className="text-slate-300 mb-6">
                For those who don't just build, but fortify. Join us in creating sovereign-grade foundations
                that will protect our most critical data from any threat.
              </p>
              <Button className="bg-slate-700 hover:bg-slate-600 text-white w-full">
                Become a Fortress Builder
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-slate-600" />
                For: Master Builders
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Civil engineering firms with sovereign-scale experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Security-cleared infrastructure contractors</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Specialists in underground construction</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* The Edge Pioneers */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center">
              <Network className="h-16 w-16 mx-auto mb-4 text-blue-200" />
              <Badge variant="secondary" className="bg-blue-700 text-blue-200 border-blue-600 mb-4">
                The Edge Pioneers
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-3">Bring Intelligence to Life</h3>
              <p className="text-blue-200 mb-6">
                For the agile and forward-thinking. Deploy the modular, smart infrastructure that powers AI
                at the edge, turning entire regions into hubs of innovation.
              </p>
              <Button className="bg-blue-700 hover:bg-blue-600 text-white w-full">
                Join the Edge Pioneers
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                For: Innovation Leaders
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Network integrators and edge computing specialists</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Managed service providers and MSPs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Sustainability and green tech vendors</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* The Community Guardians */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-emerald-200" />
              <Badge variant="secondary" className="bg-emerald-700 text-emerald-200 border-emerald-600 mb-4">
                The Community Guardians
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-3">Weave Safety into Urban Fabric</h3>
              <p className="text-emerald-200 mb-6">
                For those who believe technology should serve people. Help us embed intelligence into every street
                corner, creating communities that are safer, more responsive, and more connected.
              </p>
              <Button className="bg-emerald-700 hover:bg-emerald-600 text-white w-full">
                Become a Community Guardian
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-emerald-600" />
                For: Local Champions
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Smart city integrators and IoT specialists</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Local electrical contractors and installers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Community-focused technology providers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* The Partner Covenant */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              A Partnership Built on Shared Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our collaboration is guided by a mutual commitment to building infrastructure that serves humanity
              while standing the test of time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Handshake className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Shared Success</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your growth is our growth. Our revenue models are designed for your long-term profitability,
                creating partnerships where both sides thrive together.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="size-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">Uncompromising Quality</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We never cut corners. Together, we build to a standard that will last for decades,
                ensuring our infrastructure becomes a legacy we're all proud of.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Stewardship</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We leave every community better than we found it, both digitally and environmentally.
                Our partnerships create positive, lasting local impact.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Relentless Innovation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We learn from each other, pushing the boundaries of what's possible in resilient infrastructure.
                Together, we're redefining what's possible.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Choose Your Partnership Path
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </Section>

      {/* The Fortress Builders - Detailed Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Fortress Builders Program
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mt-4 mb-6">
              Your Legacy is What You Build to Last
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join an elite cadre of engineers and builders tasked with a singular mission: to construct data
              fortresses that will anchor our digital civilization through any storm.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">This is the Project of a Lifetime</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is not another commercial build. This is critical infrastructure on a sovereign scale.
                The work you do here will safeguard national security, ensure the continuity of healthcare
                and finance, and create a resilient core for the AI age. If your firm is driven by
                purpose and capable of perfection, this is your calling.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Technical Prospectus
                </Button>
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                  Apply to Fortress Builder Program
                </Button>
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <div className="text-center mb-6">
                <HardHat className="h-16 w-16 mx-auto text-slate-600 dark:text-slate-400" />
                <h4 className="text-lg font-semibold mt-4">We Seek the Few</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mountain className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold">You See Engineering as a Discipline of Permanence</h5>
                    <p className="text-sm text-muted-foreground">
                      Your work doesn't just meet specificationsit creates foundations that will endure for generations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold">You Have a History of Mission-Critical Success</h5>
                    <p className="text-sm text-muted-foreground">
                      Your portfolio includes projects where failure was never an option and excellence was the standard.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold">You Understand True Resilience</h5>
                    <p className="text-sm text-muted-foreground">
                      You know that real security and resilience are built from the ground up, not added as features.
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-amber-600" />
                Projects That Define Careers
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Multi-million dollar infrastructure projects with government alignment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Work that will be studied and referenced for decades</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Opportunity to shape national security infrastructure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Legacy projects that demonstrate engineering excellence</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                We Provide the Vision, You Provide the Excellence
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Access to our full engineering and R&D team</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your expertise shapes our designs from day one</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Unwavering support and project backing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>A shared legacy in building the future</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-12 text-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 mt-12">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Lay the Cornerstone of the Future?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              This is more than a business opportunityit's a chance to build infrastructure that will
              protect and serve generations to come.
            </p>
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              Begin Your Application
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Card>
        </div>
      </Section>

      {/* The Edge Pioneers - Detailed Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
              Edge Pioneers Program
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mt-4 mb-6">
              Be the First to Plant the Flag of the New Internet
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The cloud is collapsing inward to the edge. Join the vanguard of partners deploying the intelligent,
              modular infrastructure that will power everything from autonomous cars to smart hospitals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <Card className="p-8">
              <div className="text-center mb-6">
                <Wifi className="h-16 w-16 mx-auto text-blue-600" />
                <h4 className="text-lg font-semibold mt-4">The Frontier Awaits</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every city, every campus, every factory is now a potential edge location. We have the blueprint
                and the platform. You have the local presence and the deployment expertise. Together, we can
                blanket the region with the compute power of tomorrow.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
                <h5 className="font-semibold mb-3">The Pioneer Profile</h5>
                <p className="text-sm text-muted-foreground">
                  You're agile, tech-savvy, and obsessed with the future. You might be an MSP ready to offer
                  physical infrastructure, an integrator tired of legacy solutions, or an electrician who sees
                  the bigger picture. You're a builder, not just an installer.
                </p>
              </div>
            </Card>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">The Pioneer's Advantage</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "First to Market",
                    description: "Capture the edge wave before it becomes a commodity. Establish your brand as the local leader in next-gen infrastructure."
                  },
                  {
                    title: "Recurring Revenue Engine",
                    description: "Build a business on monthly compute and service revenue, not just one-time projects. Create predictable, growing income streams."
                  },
                  {
                    title: "Territorial Rights",
                    description: "Plant your flag in a region and grow with it. We offer exclusivity to certified partners in high-growth areas."
                  },
                  {
                    title: "Turnkey Technology",
                    description: "We handle the complex software and platform; you own the client relationship and handle the physical deployment."
                  }
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{advantage.title}</h4>
                      <p className="text-sm text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="p-12 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900">
            <h3 className="text-3xl font-bold mb-4">
              The Map is Being Drawn Now. Claim Your Territory.
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              The edge computing revolution is happening, and territories are being claimed. Don't miss
              this historic opportunity to establish your firm as a leader in the infrastructure of tomorrow.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="lg">
                <MapPin className="h-4 w-4 mr-2" />
                View Deployment Map
              </Button>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply to Be a Pioneer
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* The Community Guardians - Detailed Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
              Community Guardians Program
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight mt-4 mb-6">
              Put a Guardian on Every Corner
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your work from a job into a service. Help us deploy the subtle, smart nodes that make
              streets safer, air cleaner, and communities more connectedall while fiercely protecting
              the privacy of every citizen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">This is Infrastructure with a Heartbeat</h3>
              <p className="text-muted-foreground leading-relaxed">
                This isn't about installing hardware. It's about weaving a layer of safety and intelligence
                into the very fabric of our neighborhoods. It's about giving parents peace of mind,
                giving cities real-time insights, and giving every resident access to the future.
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-lg">
                <h5 className="font-semibold mb-3">The Guardian's Code</h5>
                <p className="text-sm text-muted-foreground">
                  You're not just a contractor; you're a local champion. You understand that public trust
                  is the most valuable currency. You take pride in the aesthetic integration of technology
                  and are committed to the ethical handling of data.
                </p>
              </div>
            </div>
            <Card className="p-8">
              <div className="text-center mb-6">
                <Heart className="h-16 w-16 mx-auto text-emerald-600" />
                <h4 className="text-lg font-semibold mt-4">The Ripple Effect</h4>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <Shield className="h-5 w-5 text-emerald-600" />,
                    title: "Direct Impact",
                    description: "See the exact streets and parks you've made safer through your work."
                  },
                  {
                    icon: <Users className="h-5 w-5 text-emerald-600" />,
                    title: "Community Gratitude",
                    description: "Become the go-to firm for positive urban technology that enhances quality of life."
                  },
                  {
                    icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
                    title: "Dual Revenue Streams",
                    description: "Earn from both public service contracts and private advertising/compute sharing."
                  },
                  {
                    icon: <Leaf className="h-5 w-5 text-emerald-600" />,
                    title: "Lasting Mark",
                    description: "Your work becomes a permanent, beneficial part of the city's landscape."
                  }
                ].map((impact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {impact.icon}
                    <div>
                      <h4 className="font-semibold">{impact.title}</h4>
                      <p className="text-sm text-muted-foreground">{impact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-12 text-center bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Be a Hero in Your Hometown?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              This is your chance to build technology that brings communities together while growing your
              business. Join us in creating safer, smarter, and more connected neighborhoods.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                View Community Impact Report
              </Button>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Your Guardian Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Questions About Partnership?
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about becoming a DataBuildDirect partner
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What makes a qualified partner?",
                answer: "We look for proven expertise in your field, a commitment to quality, and alignment with our values. Specific requirements vary by program but generally include relevant certifications, insurance, and a track record of successful projects."
              },
              {
                question: "How are partners compensated?",
                answer: "Compensation models vary by program but typically include project fees, recurring revenue shares, and performance incentives. All models are designed for long-term profitability and growth."
              },
              {
                question: "What territories are available?",
                answer: "We have opportunities across North America with prioritized regions for immediate deployment. Contact our partnerships team to discuss availability in your specific area of interest."
              },
              {
                question: "How long does the application process take?",
                answer: "Initial applications are typically reviewed within 2-3 weeks. Qualified candidates then enter a more detailed due diligence and onboarding process that takes 4-6 weeks."
              },
              {
                question: "What kind of support do partners receive?",
                answer: "Partners receive comprehensive training, technical documentation, access to our engineering team, marketing support, and dedicated partnership managers to ensure success."
              },
              {
                question: "Can we work with multiple programs?",
                answer: "Yes! Many partners work across multiple programs based on their capabilities. We encourage partners to explore all opportunities that align with their strengths."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h4 className="text-lg font-semibold mb-3">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section>
        <Card className="p-16 text-center bg-gradient-to-r from-slate-900 to-blue-900">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
            The Future is a Partnership.
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto">
            We are building a coalition of the willing, the able, and the visionary.
            The question is not if this future will be built, but who will build it. Let it be us.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Apply Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-blue-300 text-blue-200 hover:bg-blue-900/50 hover:text-blue-100">
              Contact Our Partnership Council
              <Mail className="h-5 w-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-blue-300 mt-8">
            Current response time: 2-3 business days
          </p>
        </Card>
      </Section>
    </div>
  );
}