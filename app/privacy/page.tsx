import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: "Privacy Policy",
  description: "TemplateAppV2 Privacy Policy - GDPR and CCPA compliant data protection practices"
};

export default function PrivacyPage() {
  const effectiveDate = new Date().toISOString().slice(0, 10);

  return (
    <main id="main-content" className="container mx-auto max-w-4xl p-6 py-8">
      <div className="space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            How TemplateAppV2 protects your data and respects your privacy
          </p>
          <p className="text-sm text-muted-foreground">
            Effective: {effectiveDate}
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Account Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email address and profile information</li>
                <li>Authentication data (encrypted passwords via Supabase)</li>
                <li>Subscription and billing information</li>
                <li>User preferences and settings</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Application usage patterns and analytics</li>
                <li>Feature interaction data</li>
                <li>Performance metrics and error logs</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
              <p>
                Payment processing is handled by Stripe. We do not store your full payment details on our servers.
                We only receive tokenized payment information necessary for subscription management.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related communications</li>
              <li>Improve and optimize our application</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Security Measures</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>All data is encrypted in transit using TLS 1.3</li>
                <li>Databases are encrypted at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for administrative access</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Data Retention</h3>
              <p>
                We retain your data only as long as necessary to provide our services and comply with legal obligations.
                You may request data deletion at any time.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Data Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">Under GDPR and CCPA, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Restrict or object to certain processing</li>
            </ul>

            <section className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">How to Exercise Your Rights</h4>
              <p>
                Contact our Data Protection Officer at: <code className="bg-background px-2 py-1 rounded">privacy@templateappv2.com</code>
                We will respond to your request within 30 days as required by law.
              </p>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our services use providers (Supabase, Stripe) that may store and process data in the United States
              and other countries. We ensure these transfers comply with GDPR and other applicable data protection
              laws through standard contractual clauses and appropriate safeguards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Authenticate your session</li>
              <li>Remember your preferences</li>
              <li>Analyze application usage and performance</li>
              <li>Provide essential functionality</li>
            </ul>
            <p>
              You can manage cookie preferences through our cookie banner or browser settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material changes
              by email or through prominent notice within our application. Changes will become effective immediately
              upon posting.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have questions or concerns about this privacy policy, please contact:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@templateappv2.com</p>
              <p><strong>Address:</strong> 123 Privacy Street, Security City, SC 12345</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Our Data Protection Officer is available to address any privacy-related questions or concerns.
            </p>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>This privacy policy is a comprehensive template and should be reviewed by legal counsel before deployment.</p>
          <p>© 2025 TemplateAppV2. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}