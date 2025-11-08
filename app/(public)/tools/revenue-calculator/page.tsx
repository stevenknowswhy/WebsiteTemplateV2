import { Metadata } from "next";
import RevenueCalculator from "@/components/tools/RevenueCalculator";

export const metadata: Metadata = {
  title: "Revenue Calculator | Forhem PBC",
  description: "Calculate potential revenue from Hello Smart Node deployment with our interactive revenue calculator.",
};

export default function RevenueCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Hello Smart Node Revenue Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the revenue potential of deploying Hello Smart Nodes on your property.
            Get instant projections based on property type, location, and traffic patterns.
          </p>
        </div>

        {/* Calculator Component */}
        <RevenueCalculator />

        {/* Additional Information */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">How Revenue Sharing Works</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our innovative revenue sharing model ensures all stakeholders benefit from the
                Hello Smart Network deployment.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">25%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Property Owner</h4>
                    <p className="text-sm text-muted-foreground">
                      You receive 25% of all revenue generated from nodes on your property
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">25%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">City Revenue</h4>
                    <p className="text-sm text-muted-foreground">
                      Cities receive 25% to support public services and initiatives
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">50%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Forhem Operations</h4>
                    <p className="text-sm text-muted-foreground">
                      Covers installation, maintenance, operations, and network infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Revenue Factors</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Several key factors influence your potential revenue from Hello Smart Node deployment:
              </p>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Property Type</h4>
                  <p className="text-sm text-muted-foreground">
                    Different property types generate varying levels of user engagement and revenue potential.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Traffic & Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Higher foot traffic and visible locations typically generate more user connections.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Location & Demographics</h4>
                  <p className="text-sm text-muted-foreground">
                    Urban density and local demographics impact network usage patterns.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Number of Nodes</h4>
                  <p className="text-sm text-muted-foreground">
                    Multiple node installations scale revenue potential proportionally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">How accurate are the revenue estimates?</h4>
                <p className="text-sm text-muted-foreground">
                  Our calculator uses historical data from similar deployments and current market rates.
                  Actual revenue may vary based on specific conditions and market factors.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Are there any costs to property owners?</h4>
                <p className="text-sm text-muted-foreground">
                  No. Forhem covers all installation, maintenance, and operational costs.
                  Property owners receive passive income without any investment.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">How often are payments made?</h4>
                <p className="text-sm text-muted-foreground">
                  Revenue sharing payments are made monthly via direct deposit with detailed
                  performance reports.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Can I track performance in real-time?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes. Property owners receive access to a dashboard showing real-time performance,
                  user connections, and revenue metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}