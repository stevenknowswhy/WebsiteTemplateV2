import { Metadata } from "next";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics Dashboard | Forhem PBC",
  description: "Real-time analytics dashboard showing network performance, user engagement, and environmental impact metrics.",
};

export default function AnalyticsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Hello Smart Network Analytics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor real-time network performance, user engagement, and environmental impact.
            Our comprehensive dashboard provides insights into every aspect of our smart infrastructure.
          </p>
        </div>

        {/* Analytics Dashboard Component */}
        <AnalyticsDashboard />

        {/* Key Metrics Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Network Performance Metrics</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our network performance is continuously monitored to ensure optimal service delivery
                and user experience across all deployed nodes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold text-blue-600">Network Uptime</h4>
                  <p className="text-3xl font-bold">99.8%</p>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold text-green-600">Response Time</h4>
                  <p className="text-3xl font-bold">&lt;50ms</p>
                  <p className="text-sm text-muted-foreground">Average latency</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-semibold text-purple-600">Data Throughput</h4>
                  <p className="text-3xl font-bold">1Gbps</p>
                  <p className="text-sm text-muted-foreground">Peak capacity</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-semibold text-orange-600">Coverage Area</h4>
                  <p className="text-3xl font-bold">15mi²</p>
                  <p className="text-sm text-muted-foreground">Total network area</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Environmental Impact</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Track the positive environmental impact of our solar-powered network and
                contribution to sustainable urban infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold text-green-600">Clean Energy</h4>
                  <p className="text-3xl font-bold">1.2M</p>
                  <p className="text-sm text-muted-foreground">kWh generated</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                  <h4 className="font-semibold text-emerald-600">CO₂ Avoided</h4>
                  <p className="text-3xl font-bold">850</p>
                  <p className="text-sm text-muted-foreground">Tons of CO₂</p>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                  <h4 className="font-semibold text-teal-600">Air Quality</h4>
                  <p className="text-3xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Monitoring points</p>
                </div>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                  <h4 className="font-semibold text-cyan-600">Tree Equivalent</h4>
                  <p className="text-3xl font-bold">38K</p>
                  <p className="text-sm text-muted-foreground">Trees planted equivalent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Methodology */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Data Collection & Methodology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Real-Time Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Continuous data collection from all network nodes with 5-minute update intervals.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Network performance metrics</li>
                <li>• User connection data</li>
                <li>• Power generation levels</li>
                <li>• Environmental sensor readings</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Data Processing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced analytics pipeline processes raw data into actionable insights and trends.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automated data validation</li>
                <li>• Anomaly detection</li>
                <li>• Trend analysis</li>
                <li>• Predictive modeling</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All data collection follows strict privacy protocols and security standards.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Anonymized user data</li>
                <li>• End-to-end encryption</li>
                <li>• GDPR compliance</li>
                <li>• Regular security audits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Access */}
        <div className="space-y-6 mt-12">
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Developer API Access</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Access our network analytics and environmental data through our developer API.
              Build custom applications and integrate real-time data into your systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                API Documentation
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Developer Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}