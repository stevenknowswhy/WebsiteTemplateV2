import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import {
  Code,
  Palette,
  Megaphone,
  Database,
  Shield,
  BarChart3,
  Users,
  Zap
} from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.services as any);

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and best practices. From simple landing pages to complex enterprise applications.",
    icon: <Code className="h-8 w-8" />,
    href: "/contact",
    features: ["Next.js 14", "TypeScript", "Tailwind CSS", "Progressive Web Apps"]
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive user interfaces that provide exceptional user experiences across all devices and platforms.",
    icon: <Palette className="h-8 w-8" />,
    href: "/contact",
    features: ["Responsive Design", "Design Systems", "Prototyping", "User Testing"]
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to help your business grow online and reach your target audience effectively.",
    icon: <Megaphone className="h-8 w-8" />,
    href: "/contact",
    features: ["SEO Optimization", "Content Strategy", "Social Media", "Analytics"]
  },
  {
    title: "Database Architecture",
    description: "Scalable database solutions designed for performance, reliability, and future growth of your application.",
    icon: <Database className="h-8 w-8" />,
    href: "/contact",
    features: ["PostgreSQL", "Database Design", "Performance", "Backup Solutions"]
  },
  {
    title: "Security Consulting",
    description: "Comprehensive security audits and implementation of best practices to protect your digital assets.",
    icon: <Shield className="h-8 w-8" />,
    href: "/contact",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Best Practices"]
  },
  {
    title: "Analytics & Insights",
    description: "Data-driven insights and analytics implementation to help you make informed business decisions.",
    icon: <BarChart3 className="h-8 w-8" />,
    href: "/contact",
    features: ["Custom Dashboards", "Data Visualization", "Performance Metrics", "KPI Tracking"]
  }
];

const additionalServices = [
  {
    title: "Team Training",
    description: "Custom training programs to upskill your development team on modern technologies and best practices.",
    icon: <Users className="h-8 w-8" />,
    href: "/contact"
  },
  {
    title: "Performance Optimization",
    description: "Speed up your applications and improve user experience with performance optimization services.",
    icon: <Zap className="h-8 w-8" />,
    href: "/contact"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section>
        <div className="text-center mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We offer comprehensive digital solutions to help your business thrive in the modern landscape.
            From concept to deployment, we've got you covered.
          </p>
        </div>
      </Section>

      {/* Main Services Grid */}
      <Section title="What We Offer" description="Professional services tailored to your needs">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </Section>

      {/* Additional Services */}
      <Section title="Additional Services" description="Specialized solutions for specific needs">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {additionalServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section
        title="Our Process"
        description="Simple, transparent, and efficient workflow to ensure project success"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Discovery",
              description: "We start by understanding your business goals, technical requirements, and target audience."
            },
            {
              step: "02",
              title: "Planning",
              description: "Detailed project planning with clear milestones, timelines, and deliverables."
            },
            {
              step: "03",
              title: "Development",
              description: "Agile development with regular updates and continuous integration."
            },
            {
              step: "04",
              title: "Deployment",
              description: "Smooth deployment with comprehensive testing and ongoing support."
            }
          ].map((phase, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{phase.step}</div>
              <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
              <p className="text-muted-foreground">{phase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business goals.
            We offer free consultations and competitive pricing.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${site.email}?subject=Project Inquiry`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Email Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Contact Form
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}