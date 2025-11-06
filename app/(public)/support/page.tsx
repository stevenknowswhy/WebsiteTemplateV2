import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  HelpCircle,
  MessageSquare,
  BookOpen,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section kicker="Support" title="Help & Technical Assistance">
        <p className="text-xl text-muted-foreground max-w-3xl">
          Get the help you need to deploy and manage your sovereign infrastructure.
          Our expert support team is here to assist you 24/7.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="#contact-options">Contact Support</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">View Documentation</Link>
          </Button>
        </div>
      </Section>

      {/* Support Options */}
      <Section className="bg-muted/50" title="How Can We Help?">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Documentation */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Documentation
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardTitle>
              <CardDescription>
                Comprehensive guides, API references, and technical documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>150+ Technical Articles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Step-by-Step Guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API Reference</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="/docs">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Browse Documentation
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Community Support */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Community Support
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardTitle>
              <CardDescription>
                Connect with other users and share knowledge in our community forums
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Active Community</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Expert Moderators</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Quick Responses</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="https://community.databuilddirect.com" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join Community
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Support */}
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Premium Support
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </CardTitle>
              <CardDescription>
                Dedicated support with guaranteed response times and expert assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>1-Hour Response SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 Phone Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dedicated Account Manager</span>
                </li>
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="/contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Sales
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact Options */}
      <Section id="contact-options" title="Contact Technical Support">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For general inquiries and technical questions
                      </p>
                      <p className="font-mono text-sm">support@databuilddirect.com</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Response time: 4-8 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Premium customers only - 24/7 availability
                      </p>
                      <p className="font-mono text-sm">+1 (555) 123-4567</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Emergency line: +1 (555) 999-HELP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Business Hours</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Standard support availability
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>Monday - Friday: 6:00 AM - 6:00 PM PST</li>
                        <li>Saturday: 8:00 AM - 4:00 PM PST</li>
                        <li>Sunday: Emergency support only</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold">Support Levels</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community</CardTitle>
                  <CardDescription>
                    Free support for all users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Community forums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Documentation access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Basic email support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional</CardTitle>
                  <CardDescription>
                    For professional deployments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>24-hour response time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Remote assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Enterprise</CardTitle>
                  <CardDescription>
                    For mission-critical infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>1-hour response SLA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Dedicated support team</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>On-site support available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Emergency Support */}
      <Section className="bg-muted/50" title="Emergency Support">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="mb-4 text-2xl font-semibold">Critical Infrastructure Issues?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            For urgent infrastructure issues affecting production systems,
            contact our emergency support line immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="destructive" asChild>
              <Link href="tel:+15559994357">
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Line
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="mailto:emergency@databuilddirect.com">
                <Mail className="mr-2 h-5 w-5" />
                Email Emergency Support
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Available 24/7 for enterprise customers with critical infrastructure
          </p>
        </div>
      </Section>
    </div>
  );
}