import { FileText, Shield, AlertTriangle, CheckCircle, Users, Globe, Gavel, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These terms govern your use of Forhem's smart city infrastructure services and platform.
            By using our services, you agree to these terms and conditions.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              <Gavel className="w-3 h-3 mr-1" />
              Legally Binding
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 ml-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Last Updated: {new Date().toISOString().slice(0,10)}
            </Badge>
          </div>
        </div>

        {/* Key Terms Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">User Rights</h3>
              <p className="text-sm text-muted-foreground">Clear rights and responsibilities for all users</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Service Use</h3>
              <p className="text-sm text-muted-foreground">Guidelines for appropriate service usage</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privacy</h3>
              <p className="text-sm text-muted-foreground">How we handle your data and information</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Limitations</h3>
              <p className="text-sm text-muted-foreground">Service limitations and disclaimers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="agreement" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="agreement">Agreement</TabsTrigger>
                <TabsTrigger value="use">Service Use</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="legal">Legal</TabsTrigger>
              </TabsList>

              <TabsContent value="agreement" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Service Agreement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                      <p className="text-muted-foreground">
                        By accessing or using Forhem's services, you agree to be bound by these Terms of Service
                        and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">2. Service Description</h3>
                      <p className="text-muted-foreground">
                        Forhem provides privacy-first smart city infrastructure including Hello Smart Nodes™,
                        City Safe Solutions, and edge computing services. We reserve the right to modify,
                        suspend, or discontinue services at any time.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">3. User Accounts</h3>
                      <p className="text-muted-foreground">
                        To access certain features, you may need to create an account. You are responsible for
                        maintaining the confidentiality of your account credentials and for all activities under your account.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">4. Service Availability</h3>
                      <p className="text-muted-foreground">
                        While we strive for high availability (99.9% uptime), we cannot guarantee uninterrupted service.
                        Services may be temporarily unavailable for maintenance, updates, or other technical reasons.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="use" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Acceptable Use Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="mb-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">
                      <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-800 dark:text-blue-200">
                        <strong>Important:</strong> Violation of these terms may result in immediate account suspension.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Permitted Uses</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Accessing public Wi-Fi services provided by our nodes</li>
                        <li>Using our infrastructure for legitimate business and personal purposes</li>
                        <li>Participating in pilot programs and partnerships</li>
                        <li>Providing feedback to improve our services</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Prohibited Activities</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Illegal activities including fraud, hacking, or malware distribution</li>
                        <li>Spam, phishing, or unsolicited communications</li>
                        <li>Attempting to compromise service security or infrastructure</li>
                        <li>Exceeding bandwidth limits or fair usage policies</li>
                        <li>Interfering with other users' service experience</li>
                        <li>Reverse engineering or attempting to extract source code</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Content Guidelines</h3>
                      <p className="text-muted-foreground">
                        Users must not transmit or store content that is illegal, harmful, threatening, abusive,
                        defamatory, or otherwise objectionable. We reserve the right to remove such content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Privacy & Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Data Collection</h3>
                      <p className="text-muted-foreground">
                        We collect only necessary data to provide and improve our services. This includes technical
                        data for service delivery and usage analytics. Please refer to our Privacy Policy for detailed information.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Data Usage</h3>
                      <p className="text-muted-foreground">
                        Your data is used solely for service delivery, improvement, and communication. We never sell
                        personal information to third parties and implement privacy-by-design principles.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
                      <p className="text-muted-foreground">
                        We implement industry-standard encryption and security measures to protect your data.
                        However, no internet transmission is completely secure, so we cannot guarantee absolute security.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">User Rights</h3>
                      <p className="text-muted-foreground">
                        You have the right to access, correct, and delete your personal information. Contact our
                        Data Protection Officer at dpo@forhem.com for privacy-related inquiries.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="legal" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gavel className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Legal Terms & Disclaimers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Limitation of Liability</h3>
                      <p className="text-muted-foreground">
                        To the maximum extent permitted by law, Forhem shall not be liable for any indirect, incidental,
                        special, or consequential damages arising from your use of our services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Service Warranty</h3>
                      <p className="text-muted-foreground">
                        Our services are provided "as is" without warranties of any kind. We do not guarantee that
                        services will be uninterrupted, error-free, or meet your specific requirements.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Indemnification</h3>
                      <p className="text-muted-foreground">
                        You agree to indemnify and hold Forhem harmless from any claims, damages, or expenses
                        arising from your violation of these terms or use of our services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Termination</h3>
                      <p className="text-muted-foreground">
                        We may suspend or terminate your access to services at any time, with or without cause,
                        and with or without notice. Upon termination, all rights to use the services cease.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Governing Law</h3>
                      <p className="text-muted-foreground">
                        These terms are governed by the laws of California, United States, without regard to
                        conflict of law principles. Any disputes will be resolved in San Francisco, CA courts.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ContactForm />

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Legal Contact</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Legal Inquiries</p>
                      <p className="text-muted-foreground">legal@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Data Protection Officer</p>
                      <p className="text-muted-foreground">dpo@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Abuse Reports</p>
                      <p className="text-muted-foreground">abuse@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-muted-foreground">Within 48-72 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/privacy-policy" className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      → Privacy Policy
                    </a>
                    <a href="/transparency-report" className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      → Transparency Report
                    </a>
                    <a href="/pbc-charter" className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      → PBC Charter
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center text-sm text-muted-foreground/60 pt-8 border-t border-border">
          <p className="mb-2">
            <strong>Notice:</strong> These terms are effective as of {new Date().toISOString().slice(0,10)} and may be updated periodically.
          </p>
          <p>
            Continued use of our services constitutes acceptance of any modified terms. Please review this page regularly for updates.
          </p>
        </div>
      </div>
    </main>
  );
}