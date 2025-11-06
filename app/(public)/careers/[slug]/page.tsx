import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Mail, Briefcase, DollarSign, Award, Building2, Target, Star, ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

const jobPostings: Record<string, {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  overview: string[];
  responsibilities: string[];
  qualifications: string[];
  preferred?: string[];
  benefits?: string[];
  salary?: string;
}> = {
  "sales-manager": {
    title: "Sales Manager – Data Infrastructure",
    location: "Hybrid (San Francisco)",
    type: "Full-Time",
    department: "Sales",
    description: "Lead enterprise and government partnerships to expand our underground and edge data network.",
    overview: [
      "Develop and manage strategic partnerships",
      "Lead sales team in enterprise and government sectors",
      "Collaborate with technical teams on solutions",
      "Drive revenue growth across target markets"
    ],
    responsibilities: [
      "Build and maintain relationships with key enterprise decision-makers",
      "Lead complex sales negotiations from prospecting through closure",
      "Develop and execute strategic account plans for target territories",
      "Partner with technical teams to create compelling solutions",
      "Forecast sales accurately and maintain pipeline integrity",
      "Represent DataBuildDirect at industry conferences and events"
    ],
    qualifications: [
      "5+ years enterprise sales experience (infrastructure preferred)",
      "Experience in government or large-scale infrastructure sales",
      "Strong negotiation and relationship management skills",
      "Excellent presentation and documentation skills",
      "Bachelor's degree in Business, Engineering, or related field"
    ],
    preferred: [
      "Experience in technology infrastructure or SaaS sales",
      "Familiarity with data center, cloud, or IT services markets",
      "Existing network in relevant enterprise sectors"
    ],
    benefits: [
      "Competitive salary with commission structure",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development budget",
      "Flexible work arrangements"
    ]
  },
  "account-executive": {
    title: "Account Executive – Partner Program",
    location: "Remote",
    type: "Full-Time",
    department: "Sales",
    description: "Drive growth through reseller, partner, and channel development.",
    overview: [
      "Develop and manage partner relationships",
      "Drive revenue through channel partnerships",
      "Create joint go-to-market strategies",
      "Support partner enablement and training"
    ],
    responsibilities: [
      "Identify and recruit new reseller and technology partners",
      "Develop and execute partner business plans",
      "Manage partner relationships and ensure mutual success",
      "Collaborate with marketing on partner programs",
      "Track and report on partner performance metrics"
    ],
    qualifications: [
      "3+ years channel sales or partner management experience",
      "Experience building and managing partner programs",
      "Strong relationship building and communication skills",
      "Ability to work independently and manage multiple partners",
      "Bachelor's degree in Business or related field"
    ],
    preferred: [
      "Experience in technology infrastructure partnerships",
      "Familiarity with data center or cloud services",
      "Existing partner network in relevant sectors"
    ],
    benefits: [
      "Competitive salary with commission structure",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Remote work flexibility"
    ]
  },
  "sdr": {
    title: "Sales Development Representative (SDR)",
    location: "Remote",
    department: "Sales",
    type: "Full-Time",
    description: "As the first contact many customers will have with DataBuildDirect, you'll identify prospects, qualify leads, and schedule discovery calls that drive our growth pipeline.",
    overview: [
      "Research and target potential clients in key verticals",
      "Conduct outreach via email, LinkedIn, and calls",
      "Qualify inbound leads and schedule meetings",
      "Maintain accurate CRM data and handoffs to Account Executives",
      "Contribute to pipeline and feedback loops with marketing"
    ],
    responsibilities: [
      "Research and identify ideal customer profiles within target markets",
      "Execute multi-channel outreach campaigns (email, phone, social)",
      "Qualify inbound leads and assess fit for our solutions",
      "Maintain detailed and accurate CRM records",
      "Collaborate with Account Executives on lead handoff and strategy"
    ],
    qualifications: [
      "1-2 years of sales development or lead generation experience",
      "Experience with CRM systems (HubSpot, Salesforce, or similar)",
      "Excellent written and verbal communication skills",
      "Strong organizational and time management abilities",
      "Self-motivated with ability to work independently"
    ],
    preferred: [
      "Experience in technology infrastructure or SaaS sales",
      "Familiarity with data center or cloud services markets",
      "Experience using sales engagement platforms"
    ],
    benefits: [
      "Competitive base salary plus commission",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development and training programs",
      "Remote work flexibility"
    ]
  },
  "senior-systems-engineer": {
    title: "Senior Systems Engineer – Edge Data Centers",
    location: "Hybrid (SF preferred)",
    type: "Full-Time",
    department: "Engineering",
    description: "Design the resilient core of our micro and underground data centers.",
    overview: [
      "Design and implement edge data center infrastructure",
      "Ensure high availability and disaster recovery capabilities",
      "Optimize systems for performance and efficiency",
      "Collaborate with cross-functional engineering teams"
    ],
    responsibilities: [
      "Design and deploy edge computing infrastructure",
      "Implement monitoring and alerting systems",
      "Optimize network performance and security",
      "Troubleshoot complex technical issues",
      "Document systems and procedures"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of systems engineering experience",
      "Experience with data center infrastructure",
      "Knowledge of networking protocols and security",
      "Strong problem-solving and analytical skills"
    ],
    preferred: [
      "Experience with edge computing or micro data centers",
      "Knowledge of underground data center design",
      "Experience with renewable energy systems"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development budget",
      "Flexible work arrangements"
    ]
  },
  "full-stack-engineer": {
    title: "Full Stack Software Engineer",
    location: "Remote or Hybrid",
    type: "Full-Time",
    department: "Engineering",
    description: "Develop our data monitoring, partner, and operations dashboards.",
    overview: [
      "Build and maintain web applications",
      "Collaborate with product and design teams",
      "Implement new features and improvements",
      "Ensure code quality and best practices"
    ],
    responsibilities: [
      "Develop responsive web applications using React and Next.js",
      "Build RESTful APIs and database schemas",
      "Implement user authentication and authorization",
      "Optimize application performance and scalability",
      "Participate in code reviews and testing"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or equivalent experience",
      "3+ years of full-stack development experience",
      "Proficiency in JavaScript/TypeScript, React, and Node.js",
      "Experience with relational databases",
      "Strong understanding of web technologies"
    ],
    preferred: [
      "Experience with Next.js and modern frontend frameworks",
      "Knowledge of cloud platforms (AWS, Azure, GCP)",
      "Experience with monitoring and logging systems"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development budget",
      "Flexible work arrangements"
    ]
  },
  "electrical-engineer": {
    title: "Electrical Engineer – Smart Node Hardware",
    location: "Hybrid (Bay Area lab access)",
    type: "Full-Time",
    department: "Engineering",
    description: "Design solar-powered edge nodes and smart city hardware systems.",
    overview: [
      "Design electrical systems for edge computing nodes",
      "Develop solar power and energy storage solutions",
      "Ensure reliability and safety of hardware systems",
      "Collaborate with mechanical and software teams"
    ],
    responsibilities: [
      "Design circuit boards and power systems",
      "Develop power management and energy storage solutions",
      "Test and validate hardware designs",
      "Create technical documentation and specifications",
      "Work with manufacturers on production"
    ],
    qualifications: [
      "Bachelor's degree in Electrical Engineering",
      "3+ years of hardware design experience",
      "Experience with power systems and renewable energy",
      "Knowledge of PCB design and manufacturing",
      "Strong problem-solving skills"
    ],
    preferred: [
      "Experience with IoT or edge computing hardware",
      "Knowledge of smart city technologies",
      "Experience with battery systems and energy storage"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development budget",
      "Hybrid work with lab access"
    ]
  },
  "accounting-manager": {
    title: "Accounting Manager",
    location: "Hybrid",
    type: "Full-Time",
    department: "Finance",
    description: "Lead financial reporting, investor reporting, and grant management.",
    overview: [
      "Manage accounting operations and financial reporting",
      "Oversee budgeting and forecasting processes",
      "Ensure compliance with financial regulations",
      "Lead investor and stakeholder communications"
    ],
    responsibilities: [
      "Oversee day-to-day accounting operations",
      "Prepare financial statements and reports",
      "Manage budgeting and forecasting processes",
      "Ensure compliance with GAAP and other regulations",
      "Lead investor reporting and communications"
    ],
    qualifications: [
      "Bachelor's degree in Accounting or Finance",
      "CPA certification required",
      "5+ years of accounting experience",
      "2+ years in a management role",
      "Experience with financial reporting"
    ],
    preferred: [
      "Experience in technology or infrastructure companies",
      "Knowledge of investor reporting requirements",
      "Experience with grant management"
    ],
    benefits: [
      "Competitive salary and bonus structure",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Hybrid work arrangement"
    ]
  },
  "operations-coordinator": {
    title: "Operations Coordinator",
    location: "Hybrid",
    type: "Full-Time",
    department: "Operations",
    description: "Coordinate deployments, vendors, and logistics for node rollouts.",
    overview: [
      "Coordinate field deployment operations",
      "Manage vendor relationships and contracts",
      "Ensure smooth logistics and supply chain",
      "Support project management and planning"
    ],
    responsibilities: [
      "Coordinate field deployment schedules and activities",
      "Manage vendor relationships and performance",
      "Track inventory and supply chain logistics",
      "Support project documentation and reporting",
      "Liaise between field teams and internal stakeholders"
    ],
    qualifications: [
      "Bachelor's degree in Business or related field",
      "2+ years of operations or project coordination experience",
      "Strong organizational and multitasking abilities",
      "Excellent communication and interpersonal skills",
      "Proficiency with project management tools"
    ],
    preferred: [
      "Experience in construction or field operations",
      "Knowledge of logistics and supply chain management",
      "Experience in technology infrastructure projects"
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Hybrid work arrangement"
    ]
  },
  "executive-assistant": {
    title: "Executive Assistant",
    location: "Hybrid (San Francisco)",
    type: "Full-Time",
    department: "Administration",
    description: "Support leadership operations, scheduling, and investor relations.",
    overview: [
      "Provide comprehensive administrative support",
      "Manage executive calendars and communications",
      "Coordinate meetings and events",
      "Support investor relations activities"
    ],
    responsibilities: [
      "Manage executive calendars and scheduling",
      "Coordinate travel and meeting arrangements",
      "Prepare reports and presentations",
      "Handle confidential and sensitive information",
      "Support investor communications and events"
    ],
    qualifications: [
      "Bachelor's degree or equivalent experience",
      "3+ years of executive assistant experience",
      "Exceptional organizational and time management skills",
      "Advanced proficiency in Microsoft Office suite",
      "Strong written and verbal communication skills"
    ],
    preferred: [
      "Experience in technology or startup environments",
      "Familiarity with investor relations",
      "Experience with board meeting coordination"
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Hybrid work arrangement"
    ]
  },
  "receptionist": {
    title: "Receptionist / Office Administrator",
    location: "Hybrid",
    type: "Full-Time",
    department: "Administration",
    description: "Be the front face of our San Francisco office — organize, welcome, and support our growing team.",
    overview: [
      "Manage front desk operations",
      "Provide administrative support",
      "Assist with office organization",
      "Support team coordination and communication"
    ],
    responsibilities: [
      "Greet and welcome visitors and employees",
      "Manage incoming calls and correspondence",
      "Maintain office supplies and equipment",
      "Schedule meetings and coordinate conference rooms",
      "Provide general administrative support"
    ],
    qualifications: [
      "High school diploma or equivalent",
      "1-2 years of reception or office administration experience",
      "Strong interpersonal and communication skills",
      "Professional demeanor and appearance",
      "Proficiency with office software and equipment"
    ],
    preferred: [
      "Experience in technology companies",
      "Knowledge of office management systems",
      "Multilingual abilities"
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company matching",
      "Professional development opportunities",
      "Hybrid work arrangement"
    ]
  }
};

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = jobPostings[slug];

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The position you're looking for is no longer available.
          </p>
          <Link href="/careers">
            <Button>
              <ChevronLeft className="h-4 w-4 mr-2" />
              View All Positions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800" />
        <div className="relative">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="w-fit mx-auto bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300">
              {job.department}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center items-center text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Job Overview */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Position Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {job.description}
              </p>
              <div>
                <h3 className="font-semibold mb-3">What You'll Do</h3>
                <ul className="space-y-2">
                  {job.overview.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="size-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Key Responsibilities */}
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {job.responsibilities.map((responsibility, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{responsibility}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Qualifications */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Qualifications</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Required</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {job.preferred && job.preferred.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Preferred</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.preferred.map((preference, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Award className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{preference}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {job.benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Call to Action */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-blue-50 to-slate-100 dark:from-blue-950 dark:to-slate-800">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our team building resilient infrastructure for critical systems.
              Send your resume and cover letter to our careers team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <a href={`mailto:careers@databuilddirect.com?subject=Application: ${encodeURIComponent(job.title)}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Apply Now
                </a>
              </Button>
              <Link href="/careers">
                <Button variant="outline" size="lg">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Careers
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}