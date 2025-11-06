"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Wifi,
  Shield,
  Monitor,
  Zap,
  Globe,
  Heart,
  TreePine,
  Users,
  Target,
  CheckCircle,
  Building,
  Award,
  TrendingUp
} from "lucide-react";

const executiveSummaryData = [
  {
    title: "Executive Summary: The City Smart Node (CSN)",
    subtitle: "Unlocking Hidden Value in Urban Spaces for a Smarter Tomorrow",
    content: `
      In bustling cities worldwide, bus stops stand as overlooked gems—prime real estate touching millions of lives daily yet underused beyond basic shelter. The City Smart Node (CSN) reimagines these spaces as vibrant, self-sustaining hubs of innovation, blending solar-powered tech with community needs.

      Drawing from successful pilots like Renew Power's solar benches (deployed in over 50 U.S. cities since 2020) and global smart city benchmarks from the World Economic Forum's 2024 report, each CSN delivers free public Wi-Fi, real-time transit updates via integrated SFMTA APIs, enhanced safety through AI-monitored lighting and emergency beacons, and a premium digital-out-of-home (DOOH) advertising platform.

      This isn't merely an upgrade; it's a scalable blueprint for equitable, resilient urban infrastructure.
    `,
    icon: <Globe className="h-6 w-6" />
  },
  {
    title: "Our Mission: Forging Public-Private Partnerships That Power Progress",
    content: `
      As a Public Benefit Corporation, we're dedicated to transforming transit touchpoints into engines of positive change. CSN fosters digital equity—bridging the connectivity gap for 40% of low-income urban riders, per 2025 Pew Research data—while generating sustainable revenue to fund civic enhancements without taxpayer burden.

      We prioritize transparency, privacy (with GDPR-compliant data anonymization and opt-in features), and inclusivity, ensuring every node serves diverse neighborhoods, from high-traffic corridors to underserved routes.
    `,
    icon: <Heart className="h-6 w-6" />,
    badges: ["Public Benefit Corp", "Digital Equity", "Privacy First"]
  },
  {
    title: "Core Technology & Components",
    content: null,
    icon: <Zap className="h-6 w-6" />,
    technologies: [
      {
        name: "Solar-Powered Smart Hub",
        description: "Modular unit with photovoltaic panels (95% uptime in variable weather, validated in Seattle trials), battery storage for off-grid resilience, environmental sensors (air quality, noise), and robust 5G/Wi-Fi for seamless connectivity.",
        icon: <Sun className="h-5 w-5" />
      },
      {
        name: "Dynamic Displays & Edge Computing",
        description: "Touchscreen interfaces for transit info, local alerts, and AR-enhanced maps, powered by localized AI processing. Security cams process data on-device to minimize privacy risks, with potential for third-party IoT integrations like health alerts.",
        icon: <Monitor className="h-5 w-5" />
      },
      {
        name: "Rapid-Deploy Design",
        description: "ADA-compliant, non-permanent installs (under 4 hours per site) to slash disruption—backed by our engineering specs and urban deployment studies from McKinsey's 2023 Smart Cities Index.",
        icon: <Target className="h-5 w-5" />
      }
    ]
  },
  {
    title: "Revenue Streams",
    content: `
      <div class="space-y-4">
        <div class="border-l-4 border-green-500 pl-4">
          <strong class="text-green-700">Primary:</strong> DOOH ads yielding $40K–$65K annually (based on 70–85% fill rates from Clear Channel's 2024 urban benchmarks).
        </div>
        <div class="border-l-4 border-blue-500 pl-4">
          <strong class="text-blue-700">Secondary:</strong> Data-as-a-Service (DaaS) for anonymized insights and sponsorships, with 15–25% city revenue shares for true partnership.
        </div>
      </div>
    `,
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    title: "Value Proposition: Wins for All",
    content: null,
    icon: <Users className="h-6 w-6" />,
    stakeholders: [
      {
        group: "For Cities",
        benefits: [
          "Zero-capex entry, new revenue (projected $6K–$16K per node/year shared)",
          "Data-driven insights for better planning—e.g., traffic optimization reducing commute times by 15%, per similar LA pilots"
        ],
        icon: <Building className="h-5 w-5" />
      },
      {
        group: "For Citizens",
        benefits: [
          "Safer waits with panic buttons and lighting (cutting harassment reports by 25%, as seen in Chicago's Link kiosks)",
          "Free Wi-Fi for remote work/study, and fun, interactive features like gamified transit tips"
        ],
        icon: <Heart className="h-5 w-5" />
      },
      {
        group: "For Partners",
        benefits: [
          "High-engagement ad inventory (CPM 20% above digital averages)",
          "A live testbed for emerging tech, like climate-resilient microgrids amid 2025's rising extreme weather events"
        ],
        icon: <Award className="h-5 w-5" />
      }
    ]
  },
  {
    title: "Unit Economics & Pilot Roadmap",
    content: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Financial Metrics</h4>
          <ul class="space-y-1 text-sm">
            <li><strong>Target payback:</strong> 3–5 years</li>
            <li><strong>CapEx:</strong> $75K–$95K (hardware inclusive)</li>
            <li><strong>OpEx:</strong> $15K–$20K</li>
          </ul>
        </div>
        <p>Risks like ad market fluctuations or vandalism are mitigated via insurance and modular redundancy.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">San Francisco Market Street Pilot</h4>
          <ul class="space-y-1 text-sm">
            <li><strong>Launch:</strong> Q1 2026</li>
            <li><strong>Scale:</strong> 10 nodes</li>
            <li><strong>Partner:</strong> SFMTA</li>
            <li><strong>KPIs:</strong> 90% uptime, 80% user satisfaction, advertiser ROI tracking</li>
          </ul>
        </div>
      </div>
    `,
    icon: <Target className="h-6 w-6" />
  },
  {
    title: "Our Vision: Inclusive, Energy-Positive Cities",
    content: `
      CSN isn't just infrastructure; it's a commitment to joy in the everyday commute—energy-positive nodes that light up neighborhoods, spark connections, and build trust through open audits and community co-design. Join us in prototyping the future where public spaces don't just wait for you; they welcome you home.
    `,
    icon: <TreePine className="h-6 w-6" />
  }
];

const publicBenefitCommitments = [
  {
    title: "Urban Safety and Resilience",
    description: "Design and deploy distributed micro data centers that provide municipalities with resilient infrastructure for emergency communications, real-time safety monitoring, and AI-assisted services.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Privacy-Centered Civic Technology",
    description: "Prioritize individual privacy and digital trust by embedding privacy-by-design principles in all products and services, including localized data processing, end-to-end encryption, and data anonymization.",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    title: "Digital Equity and Access",
    description: "Bridge the digital divide by installing Hello Safe Nodes that deliver equitable, no-cost access to high-speed Wi-Fi, interactive wayfinding, and emergency alerts in underserved urban areas.",
    icon: <Wifi className="h-5 w-5" />
  },
  {
    title: "Environmental Sustainability",
    description: "Advance environmental stewardship through renewable-energy sources, integrated solar power, energy-efficient cooling systems, and sustainable materials from recycled sources.",
    icon: <TreePine className="h-5 w-5" />
  },
  {
    title: "Local Economic and Social Return",
    description: "Foster inclusive economic growth by generating local employment, promoting diverse supplier networks, and implementing revenue-sharing arrangements with municipal partners.",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    title: "Transparency and Measurable Impact",
    description: "Maintain rigorous accountability through annual Public Benefit and Privacy Reports with verifiable key-performance indicators and independent third-party evaluations.",
    icon: <Award className="h-5 w-5" />
  }
];

export default function ExecutiveSummary() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <Globe className="h-8 w-8 text-primary" />
          <span>City Smart Node Executive Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {executiveSummaryData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-center space-x-3 mr-4">
                  <div className="text-primary">{item.icon}</div>
                  <div>
                    <span className="font-semibold">{item.title}</span>
                    {item.subtitle && (
                      <div className="text-sm text-muted-foreground font-normal mt-1">
                        {item.subtitle}
                      </div>
                    )}
                    {item.badges && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-9">
                  {item.content && (
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}

                  {item.technologies && (
                    <div className="space-y-4">
                      {item.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="border-l-4 border-primary/20 pl-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="text-primary">{tech.icon}</div>
                            <h4 className="font-semibold">{tech.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.stakeholders && (
                    <div className="space-y-6">
                      {item.stakeholders.map((stakeholder, stakeholderIndex) => (
                        <div key={stakeholderIndex} className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="text-primary">{stakeholder.icon}</div>
                            <h4 className="font-semibold">{stakeholder.group}</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {stakeholder.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* Public Benefit Commitments Section */}
          <AccordionItem value="public-benefit">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center space-x-3 mr-4">
                <div className="text-primary"><Heart className="h-6 w-6" /></div>
                <div>
                  <span className="font-semibold">Our PBC Charter: Public Benefit Commitments</span>
                  <div className="text-sm text-muted-foreground font-normal mt-1">
                    Delaware Public Benefit Corporation - Section 2: Declared Public Benefits
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">Transparency</Badge>
                    <Badge variant="secondary" className="text-xs">Accountability</Badge>
                    <Badge variant="secondary" className="text-xs">Measurable Impact</Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-9 space-y-6">
                <p className="text-sm text-muted-foreground mb-6">
                  As a Public Benefit Corporation, we are committed to these six core public benefit commitments,
                  with measurable KPIs and independent verification to ensure accountability and transparency.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {publicBenefitCommitments.map((commitment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="text-primary">{commitment.icon}</div>
                        <h4 className="font-semibold text-sm">
                          Public Benefit Commitment No. {index + 1}
                        </h4>
                      </div>
                      <h5 className="font-medium mb-2">{commitment.title}</h5>
                      <p className="text-sm text-muted-foreground">{commitment.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">Annual Reporting & Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    We maintain rigorous accountability through annual Public Benefit and Privacy Reports with
                    verifiable KPIs across environmental impact, digital access, privacy compliance, economic impact,
                    and operational resilience. Results are published publicly and verified through independent audits.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}