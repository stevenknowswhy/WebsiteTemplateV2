import { Metadata } from "next";
import NewsletterSignup from "@/components/tools/NewsletterSignup";

export const metadata: Metadata = {
  title: "Newsletter Signup | Forhem PBC",
  description: "Subscribe to receive updates on smart city innovation, deployment news, and PBC impact reports from Forhem.",
};

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Stay Connected with Smart City Innovation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the latest insights on public benefit technology, revenue sharing models,
            and community impact. Join our network of city leaders, property owners, and
            smart city enthusiasts.
          </p>
        </div>

        {/* Newsletter Signup Component */}
        <NewsletterSignup />

        {/* Content Preview */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What You'll Receive</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our newsletter delivers valuable content tailored to your interests and role
                in the smart city ecosystem.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-lg">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Industry Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Analysis of smart city trends, policy developments, and market opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-lg">🚀</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Deployment Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      News about network expansions, city partnerships, and installation milestones
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-lg">🌱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Impact Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Environmental metrics, community benefits, and PBC impact measurements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 text-lg">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Technology Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Product announcements, feature releases, and technical innovations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Content Categories</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Customize your subscription to receive content that matters most to you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-600">City Leaders</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Municipal case studies</li>
                    <li>• Policy updates</li>
                    <li>• Funding opportunities</li>
                    <li>• Implementation guides</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-600">Property Owners</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Revenue insights</li>
                    <li>• Property case studies</li>
                    <li>• ROI analysis</li>
                    <li>• Installation updates</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-purple-600">Investors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Financial performance</li>
                    <li>• Market analysis</li>
                    <li>• Growth metrics</li>
                    <li>• Investment updates</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-orange-600">Partners</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Technology updates</li>
                    <li>• Partnership news</li>
                    <li>• Integration guides</li>
                    <li>• Co-marketing opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">What Our Subscribers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "The Forhem newsletter keeps me informed about smart city developments and helps me identify opportunities for our community."
              </p>
              <div>
                <p className="font-semibold text-sm">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">City Planning Director</p>
              </div>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="flex items-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "As a property owner, I appreciate the regular updates on revenue performance and new deployment opportunities in our area."
              </p>
              <div>
                <p className="font-semibold text-sm">Michael Rodriguez</p>
                <p className="text-xs text-muted-foreground">Commercial Property Owner</p>
              </div>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="flex items-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                "The insights on public benefit technology and impact metrics help us make informed decisions about sustainable infrastructure."
              </p>
              <div>
                <p className="font-semibold text-sm">Emily Watson</p>
                <p className="text-xs text-muted-foreground">Sustainability Officer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Frequency */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mt-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Privacy Commitment</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We respect your privacy and are committed to protecting your personal information.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• We never sell or share your email with third parties</li>
                <li>• You can unsubscribe at any time with one click</li>
                <li>• Your data is encrypted and securely stored</li>
                <li>• We comply with GDPR and privacy regulations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Email Frequency</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how often you want to hear from us based on your preferences.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input type="radio" name="frequency" className="text-blue-600" />
                  <label className="text-sm">Daily - For real-time updates and breaking news</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="frequency" className="text-blue-600" defaultChecked />
                  <label className="text-sm">Weekly - Most popular choice</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="frequency" className="text-blue-600" />
                  <label className="text-sm">Monthly - For major updates and summaries</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}