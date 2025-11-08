import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Download,
  FileText,
  Code,
  Image,
  Video,
  Archive,
  CheckCircle,
  ExternalLink,
  File,
  BookOpen,
  Github,
  CloudDownload
} from 'lucide-react';

export default function DownloadsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section kicker="Resources" title="Downloads & Resources">
        <p className="text-xl text-muted-foreground max-w-3xl">
          Access our comprehensive library of technical resources, documentation,
          tools, and assets to help you succeed with DataBuildDirect infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="#technical-docs">Technical Docs</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#development-tools">Development Tools</Link>
          </Button>
        </div>
      </Section>

      {/* Download Categories */}
      <Section className="bg-muted/50" title="Browse by Category">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Technical Documentation */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Technical Documentation</CardTitle>
              <CardDescription>
                Comprehensive guides, whitepapers, and technical specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Architecture Guide</span>
                  <span className="text-xs text-muted-foreground">PDF</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Security Whitepaper</span>
                  <span className="text-xs text-muted-foreground">PDF</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>API Reference</span>
                  <span className="text-xs text-muted-foreground">PDF</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Deployment Manual</span>
                  <span className="text-xs text-muted-foreground">PDF</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="#technical-docs">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDFs
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Development Tools */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Development Tools</CardTitle>
              <CardDescription>
                CLI tools, SDKs, and development utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>CLI Tool</span>
                  <span className="text-xs text-muted-foreground">v2.1.0</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Terraform Provider</span>
                  <span className="text-xs text-muted-foreground">v1.5.0</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Kubernetes Operator</span>
                  <span className="text-xs text-muted-foreground">v3.2.1</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>VSCode Extension</span>
                  <span className="text-xs text-muted-foreground">v1.0.4</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="#development-tools">
                  <CloudDownload className="mr-2 h-4 w-4" />
                  Download Tools
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Media Assets */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Media Assets</CardTitle>
              <CardDescription>
                Logos, branding guidelines, and marketing materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Logo Pack</span>
                  <span className="text-xs text-muted-foreground">SVG, PNG</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Brand Guidelines</span>
                  <span className="text-xs text-muted-foreground">PDF</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Screenshots</span>
                  <span className="text-xs text-muted-foreground">PNG</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Presentation Template</span>
                  <span className="text-xs text-muted-foreground">PPTX</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="#media-assets">
                  <Download className="mr-2 h-4 w-4" />
                  Download Assets
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Technical Documents */}
      <Section id="technical-docs" title="Technical Documentation">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Architecture Guide
              </CardTitle>
              <CardDescription>
                Complete architectural overview of DataBuildDirect infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>45 pages of detailed architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Network topology diagrams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Security architecture patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Scalability considerations</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">PDF • 15.2 MB</span>
                  <Button size="sm" asChild>
                    <Link href="/downloads/architecture-guide.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Security Whitepaper
              </CardTitle>
              <CardDescription>
                In-depth security framework and compliance documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Security control framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Compliance certifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Threat modeling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Incident response procedures</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">PDF • 8.7 MB</span>
                  <Button size="sm" asChild>
                    <Link href="/downloads/security-whitepaper.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                API Reference
              </CardTitle>
              <CardDescription>
                Complete API documentation with examples and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>50+ API endpoints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Authentication examples</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Error handling guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Rate limiting information</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">PDF • 12.1 MB</span>
                  <Button size="sm" asChild>
                    <Link href="/downloads/api-reference.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Deployment Manual
              </CardTitle>
              <CardDescription>
                Step-by-step deployment guide for all infrastructure types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Underground deployment guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Micro DCaaS setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>City Safe Nodes configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Troubleshooting section</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">PDF • 18.5 MB</span>
                  <Button size="sm" asChild>
                    <Link href="/downloads/deployment-manual.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Development Tools */}
      <Section id="development-tools" title="Development Tools">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                CLI Tool
              </CardTitle>
              <CardDescription>
                Command-line interface for infrastructure management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Latest Version:</span>
                    <div className="font-semibold">v2.1.0</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Release Date:</span>
                    <div className="font-semibold">Nov 1, 2025</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">File Size:</span>
                    <div className="font-semibold">45.2 MB</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Platforms:</span>
                    <div className="font-semibold">Win, Mac, Linux</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link href="/downloads/cli/forhem-cli-v2.1.0-windows.exe">
                      <Download className="mr-2 h-4 w-4" />
                      Windows (64-bit)
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/downloads/cli/forhem-cli-v2.1.0-macos.dmg">
                      <Download className="mr-2 h-4 w-4" />
                      macOS (Intel/ARM)
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/downloads/cli/forhem-cli-v2.1.0-linux.tar.gz">
                      <Download className="mr-2 h-4 w-4" />
                      Linux (64-bit)
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                Terraform Provider
              </CardTitle>
              <CardDescription>
                Infrastructure as Code for Forhem resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Latest Version:</span>
                    <div className="font-semibold">v1.5.0</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Release Date:</span>
                    <div className="font-semibold">Oct 28, 2025</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Terraform:</span>
                    <div className="font-semibold">1.0+</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Providers:</span>
                    <div className="font-semibold">3 total</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link href="https://registry.terraform.io/providers/forhem/forhem/latest" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Terraform Registry
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/downloads/terraform/forhem-provider-v1.5.0.zip">
                      <Download className="mr-2 h-4 w-4" />
                      Download ZIP
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="https://github.com/stevenknowswhy/ForhemPBC" target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Media Assets */}
      <Section id="media-assets" title="Media Assets">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logo Pack</CardTitle>
              <CardDescription>
                Complete brand logo package in multiple formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Primary Logo (SVG)</span>
                    <span className="text-muted-foreground">Vector</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Primary Logo (PNG)</span>
                    <span className="text-muted-foreground">4K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Icon Set</span>
                    <span className="text-muted-foreground">512px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brand Guidelines</span>
                    <span className="text-muted-foreground">PDF</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/downloads/media/logo-pack.zip">
                    <Archive className="mr-2 h-4 w-4" />
                    Download Logo Pack
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Screenshots</CardTitle>
              <CardDescription>
                High-quality product screenshots for presentations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Dashboard View</span>
                    <span className="text-muted-foreground">4K PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure View</span>
                    <span className="text-muted-foreground">4K PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitoring Dashboard</span>
                    <span className="text-muted-foreground">4K PNG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile App</span>
                    <span className="text-muted-foreground">2K PNG</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/downloads/media/screenshots.zip">
                    <Archive className="mr-2 h-4 w-4" />
                    Download Screenshots
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Presentation Template</CardTitle>
              <CardDescription>
                Branded PowerPoint template for presentations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Template File</span>
                    <span className="text-muted-foreground">PPTX</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size</span>
                    <span className="text-muted-foreground">25.4 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slides Included</span>
                    <span className="text-muted-foreground">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compatibility</span>
                    <span className="text-muted-foreground">Office 365</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/downloads/media/presentation-template.pptx">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Statistics */}
      <Section className="bg-muted/50" title="Download Statistics">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="mb-2 text-3xl font-bold text-primary">50K+</div>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-primary">150+</div>
            <p className="text-sm text-muted-foreground">Available Files</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-primary">99.9%</div>
            <p className="text-sm text-muted-foreground">Uptime SLA</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
            <p className="text-sm text-muted-foreground">Download Access</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <Button size="lg" asChild>
            <Link href="/support">
              Contact Support
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}