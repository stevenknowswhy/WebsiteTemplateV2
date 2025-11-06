import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Eye, Fingerprint, CheckCircle, AlertTriangle, FileCheck, Users } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="Security Excellence"
        title="Security by design, not by default."
        description="Comprehensive security framework spanning physical infrastructure, cyber defenses, and operational protocols. Our sovereign-grade approach ensures absolute protection for your most critical assets."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
            <FileCheck className="h-4 w-4 mr-2" />
            Download Security Brief
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-4 w-4 mr-2" />
            Contact Security Team
          </Button>
        </div>
      </Section>

      {/* Security Framework */}
      <Section
        kicker="Our Approach"
        title="Comprehensive security ecosystem"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 text-red-600" />,
              title: "Physical Security",
              description: "Multi-layered physical defenses including blast protection, access controls, and surveillance systems."
            },
            {
              icon: <Lock className="h-8 w-8 text-blue-600" />,
              title: "Cyber Security",
              description: "Advanced threat detection, zero-trust architecture, and continuous monitoring."
            },
            {
              icon: <Eye className="h-8 w-8 text-green-600" />,
              title: "Operational Security",
              description: "Procedural controls, personnel security, and incident response protocols."
            },
            {
              icon: <Fingerprint className="h-8 w-8 text-purple-600" />,
              title: "Identity & Access",
              description: "Multi-factor authentication, role-based access, and privileged access management."
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-orange-600" />,
              title: "Compliance",
              description: "Regulatory compliance with international standards and certifications."
            },
            {
              icon: <AlertTriangle className="h-8 w-8 text-slate-600" />,
              title: "Risk Management",
              description: "Continuous risk assessment and mitigation strategies across all operations."
            }
          ].map((domain, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {domain.icon}
                  <CardTitle className="text-lg">{domain.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{domain.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technical Security Details */}
      <Section
        kicker="Technical Excellence"
        title="Security specifications"
      >
        <Tabs defaultValue="physical" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="cyber">Cyber</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Facility Protection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Military-grade blast resistance</li>
                  <li>• EMP and TEMPEST shielding</li>
                  <li>• Multi-layered access controls</li>
                  <li>• 24/7 armed security personnel</li>
                  <li>• Perimeter intrusion detection</li>
                  <li>• Biometric verification systems</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Environmental Security</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Seismic and weather protection</li>
                  <li>• Air and water contamination prevention</li>
                  <li>• Fire suppression systems</li>
                  <li>• Vibration and acoustic isolation</li>
                  <li>• Covert location advantages</li>
                  <li>• Redundant utility connections</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cyber" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Network Security</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Air-gapped management networks</li>
                  <li>• Zero-trust architecture</li>
                  <li>• Hardware security modules (HSMs)</li>
                  <li>• End-to-end encryption</li>
                  <li>• Network segmentation</li>
                  <li>• Micro-segmentation at rack level</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Threat Protection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AI-driven threat detection</li>
                  <li>• Behavioral analytics</li>
                  <li>• Advanced persistent threat detection</li>
                  <li>• Real-time vulnerability scanning</li>
                  <li>• Automated incident response</li>
                  <li>• Security orchestration</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Certifications</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• SOC 2 Type II compliant</li>
                  <li>• ISO 27001 certified</li>
                  <li>• PCI DSS compliant</li>
                  <li>• HIPAA ready</li>
                  <li>• FedRAMP authorized</li>
                  <li>• CMMC Level 3 capable</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Security Standards</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• NIST Cybersecurity Framework</li>
                  <li>• CIS Controls implementation</li>
                  <li>• ITAR compliance</li>
                  <li>• GDPR compliance</li>
                  <li>• CCPA ready</li>
                  <li>• Sovereign data protection</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Continuous Monitoring</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 24/7 SOC operations</li>
                  <li>• Real-time threat intelligence</li>
                  <li>• Security information management</li>
                  <li>• Log correlation and analysis</li>
                  <li>• Automated alerting</li>
                  <li>• Performance monitoring</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Incident Response</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 15-minute response SLA</li>
                  <li>• Dedicated incident response team</li>
                  <li>• Forensic analysis capabilities</li>
                  <li>• Disaster recovery protocols</li>
                  <li>• Regular security exercises</li>
                  <li>• Continuous improvement</li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Security Operations */}
      <Section
        kicker="Operations"
        title="Security in practice"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">24/7 Security Operations</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Security Operations Center (SOC)</h4>
                <p className="text-sm text-muted-foreground">
                  Our dedicated SOC operates 24/7/365 with advanced monitoring capabilities,
                  threat intelligence integration, and automated response systems. Each facility
                  has local security teams coordinated through centralized operations.
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Regular Security Audits</h4>
                <p className="text-sm text-muted-foreground">
                  Continuous security assessments including penetration testing, vulnerability scanning,
                  and compliance audits. Third-party validations ensure unbiased security
                  evaluations and continuous improvement.
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Incident Response</h4>
                <p className="text-sm text-muted-foreground">
                  Multi-tiered incident response framework with 15-minute initial response,
                  dedicated forensic teams, and comprehensive recovery procedures. Regular
                  security exercises maintain readiness.
                </p>
              </Card>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Security Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Threat Detection</span>
                  <span className="text-sm text-green-600">99.99%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Incident Response Time</span>
                  <span className="text-sm text-green-600">&lt;15 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Security Uptime</span>
                  <span className="text-sm text-green-600">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Compliance Score</span>
                  <span className="text-sm text-green-600">99.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Audit Success Rate</span>
                  <span className="text-sm text-green-600">100%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Trust & Transparency */}
      <Section
        kicker="Trust Framework"
        title="Security transparency and trust"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Regular Security Reports",
              description: "Quarterly security transparency reports and annual security audits available to qualified clients."
            },
            {
              title: "Third-Party Validation",
              description: "Independent security assessments and penetration testing by leading security firms."
            },
            {
              title: "Customer Trust Portal",
              description: "Secure portal for monitoring security status and accessing compliance documentation."
            },
            {
              title: "Bug Bounty Program",
              description: "Responsible disclosure program managed by leading security researchers."
            },
            {
              title: "Security Partnerships",
              description: "Collaborations with leading security organizations and government agencies."
            },
            {
              title: "Industry Leadership",
              description: "Active participation in security standards development and best practices."
            }
          ].map((trust, index) => (
            <Card key={index} className="p-6">
              <h4 className="font-semibold mb-2">{trust.title}</h4>
              <p className="text-sm text-muted-foreground">{trust.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section>
        <Card className="p-8 text-center bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready for sovereign-grade security?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our security team is ready to discuss your specific requirements and demonstrate
            how our sovereign infrastructure can protect your most critical assets.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              <FileCheck className="h-4 w-4 mr-2" />
              Request Security Brief
            </Button>
            <Button variant="outline" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Schedule Security Review
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}