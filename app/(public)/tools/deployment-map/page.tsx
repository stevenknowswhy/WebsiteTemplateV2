import { Metadata } from "next";
import DeploymentMap from "@/components/tools/DeploymentMap";

export const metadata: Metadata = {
  title: "Deployment Map | Forhem PBC",
  description: "Interactive map showing Hello Smart Node and City Safe Platform deployments with real-time status and network statistics.",
};

export default function DeploymentMapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Hello Smart Network Deployment Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our growing network of Hello Smart Nodes and City Safe Platforms.
            See real-time deployment status, network coverage, and community impact.
          </p>
        </div>

        {/* Map Component */}
        <DeploymentMap />

        {/* Additional Information */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Network Expansion Strategy</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our strategic deployment approach focuses on maximizing community impact
                while ensuring sustainable network growth.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Urban Centers First</h4>
                    <p className="text-sm text-muted-foreground">
                      Priority deployment in high-density urban areas with maximum community impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Public-Private Partnerships</h4>
                    <p className="text-sm text-muted-foreground">
                      Collaboration with cities and property owners for mutually beneficial deployments
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="size-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phased Rollout</h4>
                    <p className="text-sm text-muted-foreground">
                      Strategic expansion based on community needs and infrastructure readiness
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Deployment Impact Metrics</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Each deployment creates measurable benefits for the community, environment,
                and local economy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold text-blue-600">Connectivity</h4>
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-sm text-muted-foreground">Concurrent users per node</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold text-green-600">Environment</h4>
                  <p className="text-2xl font-bold">2kW</p>
                  <p className="text-sm text-muted-foreground">Clean energy per node</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-semibold text-purple-600">Economic</h4>
                  <p className="text-2xl font-bold">$500</p>
                  <p className="text-sm text-muted-foreground">Monthly revenue per node</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-semibold text-orange-600">Safety</h4>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Emergency response readiness</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cities Section */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Active Cities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">San Francisco, CA</h3>
              <p className="text-sm text-muted-foreground mb-4">Launch City - Bay Area</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Nodes:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Users Connected:</span>
                  <span className="font-semibold">3,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployed:</span>
                  <span className="font-semibold">Sept 2024</span>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">Seattle, WA</h3>
              <p className="text-sm text-muted-foreground mb-4">Pacific Northwest Expansion</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Nodes:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Users Connected:</span>
                  <span className="font-semibold">1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployed:</span>
                  <span className="font-semibold">May 2024</span>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">Portland, OR</h3>
              <p className="text-sm text-muted-foreground mb-4">Coming Soon</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Planned Nodes:</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Users:</span>
                  <span className="font-semibold">2,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected:</span>
                  <span className="font-semibold">Q1 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}