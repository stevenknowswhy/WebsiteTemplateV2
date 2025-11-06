import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Target,
  Globe,
  Users,
  Award,
  Eye,
  Mountain,
  Network,
  MapPin,
  Heart,
  Zap,
  Building,
  TreePine,
  User,
  Briefcase,
  Flame,
  Cloud,
  Handshake
} from "lucide-react";

export default function MissionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800" />
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                The Unshakable Foundation
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                In a World of Uncertainty,
                <span className="block text-3xl lg:text-4xl text-slate-600 dark:text-slate-400 mt-2">
                  We Build Certainty
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We are the architects of unbreakable. Our mission is to ensure that the systems which keep society safe, connected, and informed—from AI and healthcare to national security—remain online, no matter what.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                    <Heart className="h-4 w-4 mr-2" />
                    Understand Our Mission
                  </Button>
                  <Button variant="outline" size="lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Our Promise
                  </Button>
                </div>
              </div>
            </div>
            <Card className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-white/70">
                  <Mountain className="h-24 w-24 mx-auto mb-4" />
                  <p>Underground Data Center Resilience</p>
                  <p className="text-sm mt-2">(Where chaos meets calm)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Our Story: Born from Necessity */}
      <Section
        kicker="Our Beginning"
        title="What happens when the lights go out—and stay out?"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We founded DataBuildDirect not just as a company, but as a response to a growing vulnerability. We saw the digital backbone of our society—our data—becoming more critical, yet more exposed. To wildfires, to floods, to malicious attacks, to the simple fragility of an aging power grid.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We asked a simple, terrifying question: What happens to a patient on life support, a city's emergency response, or a nation's security if the data center fails?
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-slate-600">
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 italic">
                  "We refuse to accept that answer."
                </p>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So, we set out to build a different kind of infrastructure. Not just efficient, not just secure, but <strong>fundamentally resilient.</strong> We build fortresses that guard the future, ensuring that when the worst happens, the most important things keep running.
              </p>
            </div>
          </div>
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Flame className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold">The Challenge</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Growing digital dependency on fragile infrastructure",
                  "Increasing frequency of climate-related disasters",
                  "Rising cyber threats to critical systems",
                  "Aging power grids and utility networks"
                ].map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="size-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-3 pt-4 border-t">
                <Building className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-bold">Our Response</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Underground fortresses immune to surface chaos",
                  "Distributed network eliminating single points of failure",
                  "Sovereign design protecting national interests",
                  "Engineering excellence that anticipates the unthinkable"
                ].map((response, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="size-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{response}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Our Beliefs: The Bedrock of Everything We Do */}
      <Section
        kicker="Our Convictions"
        title="The bedrock of everything we build"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: "Sovereignty is Safety",
              description: "We believe nations and communities must control their own digital destiny. Our infrastructure guarantees that your data, and your future, remain in your hands."
            },
            {
              icon: <Heart className="h-8 w-8 text-red-600" />,
              title: "Resilience is a Moral Duty",
              description: "For the doctors, the first responders, the leaders—we have a duty to provide a platform that will not fail them when they need it most."
            },
            {
              icon: <Target className="h-8 w-8 text-emerald-600" />,
              title: "The Future is Built, Not Predicted",
              description: "We don't just prepare for the world as it is; we build for the world as it will be—more connected, more AI-driven, and facing greater challenges."
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Trust is Our True Currency",
              description: "We earn it through radical transparency, unbreakable security, and the relentless pursuit of excellence in every bolt, every line of code, and every promise we make."
            },
            {
              icon: <Zap className="h-8 w-8 text-amber-600" />,
              title: "Ingenuity Solves Hard Problems",
              description: "We look to the earth itself—to geology and thermodynamics—for solutions that are as elegant as they are powerful."
            },
            {
              icon: <Globe className="h-8 w-8 text-slate-600" />,
              title: "Legacy Matters",
              description: "We build not just for today, but for generations to come. What we create today should stand as a testament to human ingenuity centuries from now."
            }
          ].map((belief, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {belief.icon}
                  <CardTitle className="text-lg">{belief.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">{belief.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Promise: The Three Pillars of Continuity */}
      <Section
        kicker="Our Ecosystem"
        title="The Three Pillars of Continuity"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three interconnected pillars rising from a stable base, creating the world's most resilient digital infrastructure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Mountain className="h-12 w-12 text-blue-600" />,
              title: "The Stronghold",
              subtitle: "Underground Data Centers",
              description: "The ultimate safeguard. Our subterranean fortresses protect the world's most critical AI and civic data from the surface world's chaos, ensuring civilization has a heart that keeps beating.",
              color: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
            },
            {
              icon: <Network className="h-12 w-12 text-emerald-600" />,
              title: "The Sentinels",
              subtitle: "Micro Data Centers as a Service",
              description: "Intelligence at the edge. We deploy instant, localized compute power wherever it's needed, bringing life-saving low latency to smart cities, autonomous vehicles, and community services.",
              color: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
            },
            {
              icon: <MapPin className="h-12 w-12 text-purple-600" />,
              title: "The Guardians",
              subtitle: "Hello Safe & City Safe Nodes",
              description: "Safety at the street level. We weave a fabric of connected intelligence throughout our communities, creating safer public spaces and smarter, more responsive neighborhoods—all while fiercely protecting personal privacy.",
              color: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
            }
          ].map((pillar, index) => (
            <Card key={index} className={`p-8 ${pillar.color} border`}>
              <div className="text-center mb-6">
                {pillar.icon}
                <h3 className="text-2xl font-bold mt-4 mb-2">{pillar.title}</h3>
                <p className="text-lg font-semibold text-muted-foreground">{pillar.subtitle}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our Journey: Building the Next Century, Today */}
      <Section
        kicker="Our Roadmap"
        title="Our blueprint for an unshakable future"
      >
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A timeline that looks less like a corporate Gantt chart and more like an architect's blueprint
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              year: "2025",
              title: "The Foundation is Laid",
              items: [
                "Our first underground stronghold becomes operational, a silent guardian for critical infrastructure",
                "We empower businesses with instant, edge computing, freeing them from the cloud's latency",
                "The first sentinels of our distributed network begin connecting communities"
              ]
            },
            {
              year: "2027",
              title: "The Network Comes to Life",
              items: [
                "Our sentinels and guardians form a connected mesh, creating the first truly resilient smart cities",
                "We begin orchestrating a symphony of data between the core, the edge, and the street",
                "Emergency services gain unprecedented reliability during critical operations"
              ]
            },
            {
              year: "2030",
              title: "A New Standard for the World",
              items: [
                "Our model of resilience becomes the global standard for critical infrastructure",
                "We achieve a future where digital infrastructure is a source of unwavering confidence",
                "Nations operate with true digital sovereignty, protected by unbreakable systems"
              ]
            }
          ].map((phase, index) => (
            <Card key={index} className="p-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="size-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                    {phase.year}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{phase.title}</h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="size-1.5 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Impact We See */}
      <Section
        kicker="Human Impact"
        title="The difference we see in the world"
        className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <User className="h-8 w-8 text-red-600" />,
              title: "A paramedic",
              impact: "doesn't lose a patient's records en route to the hospital."
            },
            {
              icon: <Briefcase className="h-8 w-8 text-blue-600" />,
              title: "A small business",
              impact: "stays open during a regional blackout."
            },
            {
              icon: <Globe className="h-8 w-8 text-emerald-600" />,
              title: "A city",
              impact: "manages a disaster with real-time data, saving lives and property."
            },
            {
              icon: <Shield className="h-8 w-8 text-purple-600" />,
              title: "A nation",
              impact: "protects its sovereignty with infrastructure that cannot be coerced."
            },
            {
              icon: <TreePine className="h-8 w-8 text-green-600" />,
              title: "A community",
              impact: "grows up with smarter, safer, and more responsive local services."
            },
            {
              icon: <Heart className="h-8 w-8 text-amber-600" />,
              title: "A child",
              impact: "grows up in a world where critical systems never fail."
            }
          ].map((story, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{story.icon}</div>
              <h3 className="font-bold mb-2">{story.title}</h3>
              <p className="text-sm text-muted-foreground italic">{story.impact}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Join Us in This Mission */}
      <Section>
        <Card className="p-12 text-center bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            This is More Than a Job.
            <span className="block text-3xl text-slate-600 dark:text-slate-400 mt-2">
              It's a Calling.
            </span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-8">
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-bold flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                For Those Who Build
              </h3>
              <p className="text-lg text-muted-foreground">
                We are engineers, dreamers, and builders on a mission to create the unshakable. If you are driven by purpose and refuse to accept the fragile status quo, your work here will echo for decades.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Explore Careers with Purpose
              </Button>
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-bold flex items-center">
                <Handshake className="h-6 w-6 mr-3 text-emerald-600" />
                For Those Who Partner
              </h3>
              <p className="text-lg text-muted-foreground">
                Let's build the future, together. Whether you're safeguarding a city or future-proofing an enterprise, we are your dedicated partners in creating true resilience.
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                Start a Conversation
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}