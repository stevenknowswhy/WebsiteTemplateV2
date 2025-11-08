import { Metadata } from "next";
import InteractiveTimeline from "@/components/tools/InteractiveTimeline";

export const metadata: Metadata = {
  title: "Company Timeline | Forhem PBC",
  description: "Explore Forhem's journey from founding to future milestones with our interactive company timeline showing our growth and impact.",
};

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            The Forhem Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our path from founding to becoming a leader in public benefit smart city infrastructure.
            Explore key milestones, achievements, and our vision for the future.
          </p>
        </div>

        {/* Interactive Timeline Component */}
        <InteractiveTimeline />

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Origin Story</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Forhem was founded with a simple but powerful idea: smart city infrastructure
                should benefit everyone, not just generate profits for shareholders.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-semibold mb-2">The Problem</h4>
                  <p className="text-sm text-muted-foreground">
                    Cities face growing connectivity needs while struggling with limited budgets.
                    Property owners seek additional revenue streams, and communities deserve
                    access to modern infrastructure without burdensome costs.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Our Solution</h4>
                  <p className="text-sm text-muted-foreground">
                    We created the Hello Smart Network - a unified platform that combines
                    connectivity, environmental monitoring, and emergency services while
                    sharing revenue with cities and property owners.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">The PBC Difference</h4>
                  <p className="text-sm text-muted-foreground">
                    As a Public Benefit Corporation, we're legally committed to creating
                    positive social impact alongside sustainable business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Key Achievements</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                In just a few years, we've grown from a concept to a deployed network
                making real impact in communities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="size-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">20+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Deployed Nodes</h4>
                    <p className="text-sm text-muted-foreground">Across 2 major cities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">5K+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Active Users</h4>
                    <p className="text-sm text-muted-foreground">Connected to our network</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="size-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">850T</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">CO₂ Avoided</h4>
                    <p className="text-sm text-muted-foreground">Through clean energy generation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="size-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">$15M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Total Funding</h4>
                    <p className="text-sm text-muted-foreground">Raised to date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Journey */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Leadership & Team Growth</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="size-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h4 className="font-semibold">Founding Team</h4>
              <p className="text-sm text-muted-foreground">
                Experts in urban planning, renewable energy, and communications technology
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="size-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">25+</span>
              </div>
              <h4 className="font-semibold">Current Team</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated professionals across engineering, operations, and community engagement
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="size-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">12</span>
              </div>
              <h4 className="font-semibold">Advisors</h4>
              <p className="text-sm text-muted-foreground">
                Industry leaders and experts guiding our strategic vision and growth
              </p>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8 mt-12">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Our Future Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're just getting started. Our vision includes national deployment, advanced technology
              integration, and measurable positive impact in communities across the country.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Cities by 2026</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1,000+</div>
                <p className="text-sm text-muted-foreground">Deployed Nodes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <p className="text-sm text-muted-foreground">Users Connected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 mt-12">
          <h2 className="text-2xl font-semibold">Be Part of Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a city leader, property owner, or potential team member,
            there are many ways to contribute to our mission of democratizing smart city infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Partner With Us
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Join Our Team
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Invest in Our Vision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}