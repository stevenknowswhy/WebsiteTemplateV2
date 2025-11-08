import { Metadata } from "next";
import ProductViewer3D from "@/components/tools/ProductViewer3D";

export const metadata: Metadata = {
  title: "3D Product Viewer | Forhem PBC",
  description: "Interactive 3D models of Hello Smart Node and City Safe Platform with detailed component breakdowns and technical specifications.",
};

export default function ProductViewer3DPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Interactive 3D Product Viewer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our smart infrastructure products in stunning detail. View components,
            specifications, and features through our interactive 3D models.
          </p>
        </div>

        {/* 3D Viewer Component */}
        <ProductViewer3D />

        {/* Product Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Hello Smart Node</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The Hello Smart Node is our flagship product designed for commercial and
                public spaces, providing connectivity, environmental monitoring, and
                emergency services.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Primary Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Commercial properties and retail centers</li>
                    <li>• Public plazas and community spaces</li>
                    <li>• Transportation hubs and transit stations</li>
                    <li>• Educational campuses and institutions</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Revenue sharing for property owners</li>
                    <li>• Free public Wi-Fi connectivity</li>
                    <li>• Environmental monitoring</li>
                    <li>• Emergency alert systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">City Safe Platform</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The City Safe Platform provides hardened infrastructure for critical
                public safety and emergency response applications with enhanced
                security and reliability features.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Primary Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Emergency response coordination</li>
                    <li>• Critical infrastructure monitoring</li>
                    <li>• Public safety communications</li>
                    <li>• Disaster recovery operations</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Enhanced Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Military-grade security protocols</li>
                    <li>• Redundant power systems</li>
                    <li>• Hardened communications</li>
                    <li>• Priority network access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-600">Power System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Solar Capacity:</span>
                  <span>2kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery Storage:</span>
                  <span>10kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Backup Time:</span>
                  <span>48-72 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power Output:</span>
                  <span>120V/240V AC</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 text-green-600">Connectivity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cellular:</span>
                  <span>5G NR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wi-Fi:</span>
                  <span>Wi-Fi 6 (802.11ax)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Concurrent Users:</span>
                  <span>100+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Range:</span>
                  <span>150ft radius</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 text-purple-600">Environmental</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Air Quality:</span>
                  <span>PM2.5, PM10, NO2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weather:</span>
                  <span>Temp, Humidity, Pressure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Noise Level:</span>
                  <span>30-130 dB range</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span>IP67 Weatherproof</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-3 text-orange-600">Physical</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span>4' × 6' × 8'</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>350 lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials:</span>
                  <span>Aluminum, Steel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Foundation:</span>
                  <span>Concrete base</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Process */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-center">Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="size-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold">Site Assessment</h4>
              <p className="text-sm text-muted-foreground">
                Evaluate location suitability, sun exposure, and connectivity requirements
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="size-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold">Permitting</h4>
              <p className="text-sm text-muted-foreground">
                Handle all permits, approvals, and regulatory requirements
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="size-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold">Installation</h4>
              <p className="text-sm text-muted-foreground">
                Professional installation with minimal disruption (1-2 days)
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="size-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold">Activation</h4>
              <p className="text-sm text-muted-foreground">
                System testing, network configuration, and community launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}