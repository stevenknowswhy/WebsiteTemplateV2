import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, BookOpen, Code, Download, ExternalLink } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section kicker="Resources" title="Documentation & Technical Guides">
        <p className="text-xl text-muted-foreground max-w-3xl">
          Comprehensive documentation for DataBuildDirect's sovereign infrastructure platform.
          Access technical guides, API references, deployment manuals, and best practices.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="#getting-started">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#api-reference">API Reference</Link>
          </Button>
        </div>
      </Section>

      {/* Documentation Categories */}
      <Section className="bg-muted/50" title="Browse by Category">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Infrastructure Guides */}
          <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Infrastructure Guides</h3>
            <p className="mb-4 text-muted-foreground">
              Deploy and manage sovereign infrastructure with our comprehensive setup guides.
            </p>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <Link href="/underground" className="text-muted-foreground hover:text-foreground">
                  Underground Data Centers Setup
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <Link href="/micro-dcaas" className="text-muted-foreground hover:text-foreground">
                  Micro DCaaS Deployment Guide
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <Link href="/city-safe-nodes" className="text-muted-foreground hover:text-foreground">
                  City Safe Nodes Configuration
                </Link>
              </li>
            </ul>
            <Button variant="outline" size="sm" asChild>
              <Link href="/docs/infrastructure">View All Guides</Link>
            </Button>
          </div>

          {/* API Documentation */}
          <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">API Documentation</h3>
            <p className="mb-4 text-muted-foreground">
              Integrate with DataBuildDirect services using our RESTful APIs and SDKs.
            </p>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <Link href="/api" className="text-muted-foreground hover:text-foreground">
                  REST API Reference
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Python SDK</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">JavaScript SDK</span>
              </li>
            </ul>
            <Button variant="outline" size="sm" asChild>
              <Link href="/api">View API Docs</Link>
            </Button>
          </div>

          {/* Security & Compliance */}
          <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Security & Compliance</h3>
            <p className="mb-4 text-muted-foreground">
              Security implementation guides and compliance documentation.
            </p>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <Link href="/security" className="text-muted-foreground hover:text-foreground">
                  Security Framework Overview
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Compliance Certifications</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Audit Procedures</span>
              </li>
            </ul>
            <Button variant="outline" size="sm" asChild>
              <Link href="/docs/security">Security Docs</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Getting Started */}
      <Section id="getting-started" title="Getting Started">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Quick Start Guide</h3>
            <p className="mb-6 text-muted-foreground">
              Get up and running with DataBuildDirect in minutes. Follow our step-by-step guide
              to deploy your first sovereign infrastructure node.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Create Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Sign up for a DataBuildDirect account and verify your organization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Choose Infrastructure Type</h4>
                  <p className="text-sm text-muted-foreground">
                    Select from Underground, Micro DCaaS, or City Safe Nodes based on your needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Deploy & Configure</h4>
                  <p className="text-sm text-muted-foreground">
                    Use our deployment tools or manual setup guides to get infrastructure running.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Integrate & Scale</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect your applications and scale infrastructure as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/solutions">View Solutions</Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-semibold">Popular Resources</h3>
            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Infrastructure Deployment</h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  Complete guide to deploying DataBuildDirect infrastructure in any environment.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs/deployment">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">API Integration</h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  Learn how to integrate DataBuildDirect APIs into your existing systems.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/api">
                    <Code className="mr-2 h-4 w-4" />
                    View API
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Best Practices</h4>
                <p className="mb-3 text-sm text-muted-foreground">
                  Industry best practices for sovereign infrastructure deployment and management.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs/best-practices">
                    <FileText className="mr-2 h-4 w-4" />
                    Read Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Additional Resources */}
      <Section className="bg-muted/50" title="Additional Resources">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-primary">150+</div>
            <p className="text-sm text-muted-foreground">Documentation Articles</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-primary">50+</div>
            <p className="text-sm text-muted-foreground">API Endpoints</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
            <p className="text-sm text-muted-foreground">Support Available</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-primary">99.9%</div>
            <p className="text-sm text-muted-foreground">API Uptime SLA</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Need help? Our support team is here to assist you.
          </p>
          <Button size="lg" asChild>
            <Link href="/support">Contact Support</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}