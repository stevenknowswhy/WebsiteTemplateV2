import { Shield, Eye, Lock, Mail, CheckCircle, AlertCircle, Users, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Forhem, we are committed to protecting your privacy and ensuring the security of your personal information.
            This Privacy Policy outlines how we collect, use, and protect your data when you interact with our services.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Privacy by Design
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 ml-2">
              <Lock className="w-3 h-3 mr-1" />
              PBC Committed
            </Badge>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">Your privacy is our top priority in every decision we make.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">We clearly explain what data we collect and why we need it.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">Industry-standard encryption and security protocols protect your data.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">User Control</h3>
              <p className="text-sm text-muted-foreground">You have full control over your personal information and preferences.</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Information We Collect */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We collect only the information necessary to provide our smart city infrastructure services:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Contact Information</h4>
                      <p className="text-sm text-muted-foreground">When you reach out to us for inquiries or support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Technical Data</h4>
                      <p className="text-sm text-muted-foreground">For service delivery and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Usage Analytics</h4>
                      <p className="text-sm text-muted-foreground">To improve our services and user experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground">Partnership Data</h4>
                      <p className="text-sm text-muted-foreground">For pilot programs and collaborations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Your information helps us serve you better:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Service Delivery</h4>
                      <p className="text-sm text-muted-foreground">Deliver and maintain our infrastructure services</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Support & Communication</h4>
                      <p className="text-sm text-muted-foreground">Respond to inquiries and keep you updated</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Service Improvement</h4>
                      <p className="text-sm text-muted-foreground">Enhance our infrastructure and user experience</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-purple-200 bg-purple-50">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Privacy by Design:</strong> As a Public Benefit Corporation, we prioritize privacy in every aspect of our operations.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">✓ No Data Selling</h4>
                    <p className="text-sm text-muted-foreground">We never sell your personal information to third parties.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">✓ Encryption</h4>
                    <p className="text-sm text-muted-foreground">All data is encrypted in transit and at rest.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">✓ Access Controls</h4>
                    <p className="text-sm text-muted-foreground">Strict access controls and authentication protocols.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">✓ Regular Audits</h4>
                    <p className="text-sm text-muted-foreground">Regular security audits and vulnerability assessments.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-orange-600" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">You have complete control over your personal information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Access</h4>
                      <p className="text-sm text-muted-foreground">View your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Correction</h4>
                      <p className="text-sm text-muted-foreground">Update inaccurate information</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Deletion</h4>
                      <p className="text-sm text-muted-foreground">Request removal of your data</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Portability</h4>
                      <p className="text-sm text-muted-foreground">Export your data in a usable format</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ContactForm className="mb-6" />

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-foreground">Direct Contact</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Privacy Inquiries</p>
                      <p className="text-muted-foreground">privacy@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Data Protection Officer</p>
                      <p className="text-muted-foreground">dpo@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-muted-foreground">Within 24-48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground/60 pt-8 border-t border-border">
          <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
          <p className="mt-2">This policy may be updated periodically to reflect changes in our practices or applicable law.</p>
        </div>
      </div>
    </main>
  );
}