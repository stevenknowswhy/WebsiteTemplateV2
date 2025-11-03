import type { Metadata } from "next";
import { generatePageMetadata, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/siteConfig";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  Lightbulb,
  CheckCircle,
  Star
} from "lucide-react";

export const metadata: Metadata = generatePageMetadata(pageMetadata.about as any);

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "With over 15 years in tech, Sarah leads our vision of creating accessible digital solutions.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">SJ</div>
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Michael brings cutting-edge technical expertise and innovation to our platform.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">MC</div>
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Emily ensures our products are not just functional, but beautiful and intuitive.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">ER</div>
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "David's expertise in modern web technologies drives our technical excellence.",
    image: <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">DK</div>
  }
];

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Customer First",
    description: "We put our customers at the center of every decision we make."
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovation",
    description: "Constantly pushing boundaries and exploring new possibilities."
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Quality",
    description: "Committed to delivering excellence in every product we create."
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Integrity",
    description: "Building trust through transparency and ethical practices."
  }
];

const stats = [
  { label: "Happy Clients", value: "1000+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Team Members", value: "15" },
  { label: "Years Experience", value: "10+" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="About {site.name}"
        description="We're passionate about building exceptional digital experiences that help businesses thrive in the modern world."
        primaryCta={{
          label: "Our Services",
          href: "/services"
        }}
        secondaryCta={{
          label: "Contact Us",
          href: "/contact"
        }}
      />

      {/* Mission Statement */}
      <Section>
        <div className="text-center mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            At {site.name}, we believe in the power of technology to transform businesses and improve lives.
            Our mission is to provide cutting-edge solutions that are accessible, reliable, and scalable.
            We're committed to helping our clients succeed by delivering innovative products and exceptional service.
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Values Section */}
      <Section
        title="Our Values"
        description="The principles that guide everything we do"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section
        title="Meet Our Team"
        description="The talented people behind {site.name}"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Story Section */}
      <Section
        title="Our Story"
        description="How {site.name} came to be"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {[
            {
              year: "2015",
              title: "The Beginning",
              description: "Started as a small consultancy with a big vision to make quality software accessible to everyone."
            },
            {
              year: "2018",
              title: "Growth & Innovation",
              description: "Expanded our team and launched our first SaaS product, serving over 100 clients worldwide."
            },
            {
              year: "2024",
              title: "The Present",
              description: "Now a full-service digital agency with a global reach, helping businesses transform and thrive."
            }
          ].map((milestone, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                <h3 className="text-lg font-semibold mb-3">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section
        title="Why Choose Us"
        description="What sets {site.name} apart"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Users className="h-8 w-8" />,
              title: "Expert Team",
              description: "Our team consists of experienced professionals who are passionate about their craft."
            },
            {
              icon: <Target className="h-8 w-8" />,
              title: "Client-Focused",
              description: "We take the time to understand your unique needs and deliver tailored solutions."
            },
            {
              icon: <Award className="h-8 w-8" />,
              title: "Proven Track Record",
              description: "Hundreds of successful projects and satisfied clients speak to our expertise."
            }
          ].map((reason, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="text-primary">{reason.icon}</div>
                  <span>{reason.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Location Section */}
      <Section
        title="Get in Touch"
        description="We'd love to hear from you"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Visit Us</h3>
              </div>
              <p className="text-muted-foreground">
                {site.address}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Email Us</h3>
              </div>
              <p className="text-muted-foreground">
                {site.email}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-3">
                <Heart className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Follow Us</h3>
              </div>
              <div className="flex space-x-4">
                {site.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}