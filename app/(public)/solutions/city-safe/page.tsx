import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Zap, AlertTriangle, Radio, Database, Lock, Users, MapPin, Cpu, Battery, Eye, Cloud, CheckCircle } from "lucide-react";

export default function CitySafePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="City Safe Platform"
        title="Critical Infrastructure That Never Fails"
        description="Hardened, sovereign-grade infrastructure ensuring continuous operations for emergency services, municipal systems, and critical public infrastructure during any scenario."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Shield className="h-4 w-4 mr-2" />
            Schedule Critical Infrastructure Demo
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact?interest=city-safe">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Contact Emergency Response Team
            </Link>
          </Button>
        </div>
      </Section>

      {/* Critical Capabilities */}
      <Section
        kicker="Capabilities"
        title="Uninterrupted Operations When It Matters Most"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <Shield className="h-8 w-8 text-green-600" />,
              title: "Emergency Response Systems",
              description: "Powered emergency beacons, communication systems, and response coordination platforms."
            },
            {
              icon: <Radio className="h-8 w-8 text-blue-600" />,
              title: "Uninterrupted Communications",
              description: "Redundant communication networks ensuring first responders stay connected during disasters."
            },
            {
              icon: <Database className="h-8 w-8 text-purple-600" />,
              title: "Sovereign Data Protection",
              description: "Air-gapped systems and encrypted data storage protecting critical municipal information."
            },
            {
              icon: <Zap className="h-8 w-8 text-yellow-600" />,
              title: "Continuous Power Supply",
              description: "Extended battery backup and redundant power systems for uninterrupted operations."
            },
            {
              icon: <Eye className="h-8 w-8 text-orange-600" />,
              title: "Strategic Monitoring",
              description: "Advanced surveillance and monitoring systems for critical infrastructure protection."
            },
            {
              icon: <Lock className="h-8 w-8 text-red-600" />,
              title: "Hardened Security",
              description: "Physical and cyber security measures protecting against sophisticated threats."
            }
          ].map((capability, index) => (
            <Card key={index} className="p-6 text-center">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{capability.icon}</div>
                <CardTitle className="text-lg">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Infrastructure Resilience */}
      <Section
        kicker="Resilience Features"
        title="Built to Withstand Any Scenario"
      >
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <span>Physical Protection</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: "EMP Protection", value: "Hardened against electromagnetic pulses" },
                { label: "Blast Resistance", value: "Structural protection against explosions" },
                { label: "Weather Proofing", value: "Category 5 hurricane resistance" },
                { label: "Flood Protection", value: "Waterproof up to 10 feet submersion" },
                { label: "Seismic Rating", value: "Zone 4 earthquake protection" },
                { label: "Fire Suppression", value: "Automatic fire detection and suppression" },
                { label: "Temperature Control", value: "Active cooling from -40°F to 140°F" },
                { label: "Physical Access", value: "Biometric and multi-factor authentication" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-3">
              <Battery className="h-6 w-6 text-yellow-600" />
              <span>Power Independence</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Primary Power", value: "Grid connection with automatic transfer" },
                { label: "Solar Backup", value: "5kW solar array with battery storage" },
                { label: "Battery Capacity", value: "50kWh lithium-ion storage system" },
                { label: "Backup Duration", value: "7-14 days full operational capability" },
                { label: "Fuel Cell Option", value: "Hydrogen fuel cell for extended outages" },
                { label: "Power Management", value: "Intelligent load balancing and prioritization" },
                { label: "Monitoring", value: "Real-time power system health monitoring" },
                { label: "Maintenance", value: "Quarterly testing and annual servicing" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Use Cases by Sector */}
      <Section
        kicker="Critical Applications"
        title="Essential Services Across All Sectors"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
              title: "Emergency Services",
              description: "Police, fire, and medical response coordination with uninterrupted communications and power."
            },
            {
              icon: <Radio className="h-8 w-8 text-blue-600" />,
              title: "Public Communications",
              description: "Emergency broadcast systems, public alert networks, and critical information dissemination."
            },
            {
              icon: <Users className="h-8 w-8 text-green-600" />,
              title: "Government Operations",
              description: "Continuity of government services, critical data storage, and secure communications."
            },
            {
              icon: <MapPin className="h-8 w-8 text-purple-600" />,
              title: "Critical Infrastructure",
              description: "Power grid monitoring, water systems control, and transportation network management."
            },
            {
              icon: <Database className="h-8 w-8 text-orange-600" />,
              title: "Data Sovereignty",
              description: "Secure data storage and processing for critical municipal and government information."
            },
            {
              icon: <Cloud className="h-8 w-8 text-cyan-600" />,
              title: "Command & Control",
              description: "Emergency operations centers and disaster response coordination platforms."
            }
          ].map((useCase, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {useCase.icon}
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Deployment Strategy */}
      <Section
        kicker="Strategic Deployment"
        title="Optimized Placement for Maximum Resilience"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Priority Locations</h3>
            <div className="space-y-4">
              {[
                {
                  priority: "Critical Infrastructure",
                  locations: "Power substations, water treatment plants, communication hubs",
                  reason: "Essential services backbone"
                },
                {
                  priority: "Emergency Services",
                  locations: "Fire stations, police departments, hospitals, emergency operations centers",
                  reason: "First responder coordination"
                },
                {
                  priority: "Government Buildings",
                  locations: "City halls, courts, essential administrative facilities",
                  reason: "Continuity of government"
                },
                {
                  priority: "Transportation Hubs",
                  locations: "Airports, train stations, major transit centers",
                  reason: "Mobility and logistics"
                }
              ].map((location, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-4 py-2">
                  <h4 className="font-semibold mb-1">{location.priority}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{location.locations}</p>
                  <p className="text-sm font-medium text-green-600">{location.reason}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Implementation Phases</h3>
            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1",
                  duration: "0-90 days",
                  focus: "Critical infrastructure and emergency services deployment"
                },
                {
                  phase: "Phase 2",
                  duration: "90-180 days",
                  focus: "Government buildings and essential services coverage"
                },
                {
                  phase: "Phase 3",
                  duration: "180-365 days",
                  focus: "Transportation hubs and strategic public spaces"
                },
                {
                  phase: "Phase 4",
                  duration: "365+ days",
                  focus: "Network expansion and redundancy improvements"
                }
              ].map((phase, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="size-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{phase.phase}: {phase.duration}</h4>
                    <p className="text-sm text-muted-foreground">{phase.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Security Features */}
      <Section
        kicker="Security Architecture"
        title="Multi-Layered Protection for Critical Systems"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Physical Security",
              features: ["Hardened enclosures", "Biometric access", "24/7 monitoring", "Tamper detection"]
            },
            {
              title: "Cyber Security",
              features: ["Air-gapped networks", "End-to-end encryption", "Zero-trust architecture", "Regular penetration testing"]
            },
            {
              title: "Operational Security",
              features: ["Redundant systems", "Automatic failover", "Disaster recovery", "Regular drills"]
            },
            {
              title: "Data Security",
              features: ["Sovereign data storage", "Encrypted backups", "Access controls", "Audit trails"]
            }
          ].map((category, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ensure Your City's Critical Resilience
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Partner with us to deploy hardened infrastructure that keeps your city operational
            during any emergency or disruption scenario.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/contact?interest=city-safe">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Schedule Critical Infrastructure Assessment
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/downloads/city-safe-technical-guide.pdf">
                <Shield className="h-4 w-4 mr-2" />
                Download Technical Specifications
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}