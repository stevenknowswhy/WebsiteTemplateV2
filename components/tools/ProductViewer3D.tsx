"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Maximize2,
  Wifi,
  Battery,
  TreePine,
  Shield,
  Cpu,
  Sun,
  Eye,
  Layers,
  Box,
  Settings
} from "lucide-react";

// TODO: Phase 2 Enhancement - Integrate with Three.js or similar 3D library
// TODO: Add actual 3D models of Hello Smart Node and City Safe Platform
// TODO: Implement interactive controls for rotation, zoom, and pan
// TODO: Add component breakdown views (exploded views)
// TODO: Integrate with augmented reality (AR) viewing capabilities
// TODO: Add real-time data visualization on 3D models
// TODO: Implement different viewing modes (day/night, thermal, network coverage)

interface ComponentData {
  id: string;
  name: string;
  description: string;
  specs: string[];
  status: "active" | "standby" | "maintenance";
}

const helloSmartNodeComponents: ComponentData[] = [
  {
    id: "solar-panels",
    name: "Solar Panels",
    description: "High-efficiency photovoltaic panels with maximum power point tracking",
    specs: ["2kW capacity", "25-year warranty", "Automatic tilt adjustment"],
    status: "active"
  },
  {
    id: "battery-system",
    name: "Battery Storage",
    description: "Lithium-ion battery backup system for uninterrupted operation",
    specs: ["10kWh capacity", "48-72 hours backup", "Smart BMS"],
    status: "active"
  },
  {
    id: "connectivity",
    name: "Connectivity Hub",
    description: "Multi-band wireless connectivity with edge computing capabilities",
    specs: ["5G + Wi-Fi 6", "100+ concurrent users", "Edge AI processing"],
    status: "active"
  },
  {
    id: "sensors",
    name: "Environmental Sensors",
    description: "Comprehensive environmental monitoring and data collection",
    specs: ["Air quality monitoring", "Temperature & humidity", "Noise level detection"],
    status: "active"
  },
  {
    id: "controller",
    name: "System Controller",
    description: "Central management system with remote monitoring capabilities",
    specs: ["Quad-core processor", "8GB RAM", "Secure boot"],
    status: "active"
  }
];

export default function ProductViewer3D() {
  const [selectedProduct, setSelectedProduct] = useState<"hello-smart" | "city-safe">("hello-smart");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"exterior" | "interior" | "exploded">("exterior");
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const canvasRef = useRef<HTMLDivElement>(null);

  // TODO: Initialize 3D scene with Three.js or similar
  useEffect(() => {
    if (canvasRef.current) {
      // Initialize 3D rendering context
      console.log("3D viewer initialization placeholder");
    }
  }, [selectedProduct]);

  // TODO: Implement actual 3D controls
  const handleRotate = () => {
    setIsRotating(!isRotating);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 20, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 20, 50));
  };

  const handleResetView = () => {
    setZoomLevel(100);
    setIsRotating(false);
    setViewMode("exterior");
    setSelectedComponent(null);
  };

  return (
    <div className="space-y-6">
      {/* Product Selector */}
      <Card className="p-4">
        <Tabs value={selectedProduct} onValueChange={(value: any) => setSelectedProduct(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hello-smart" className="flex items-center space-x-2">
              <Wifi className="h-4 w-4" />
              <span>Hello Smart Node</span>
            </TabsTrigger>
            <TabsTrigger value="city-safe" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>City Safe Platform</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Main 3D Viewer */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Canvas */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="relative">
            {/* TODO: Replace with actual 3D canvas */}
            <div
              ref={canvasRef}
              className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <div className="text-center text-muted-foreground">
                <Box className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">3D Product Viewer</h3>
                <p className="text-sm mb-4">
                  Interactive 3D model of {selectedProduct === "hello-smart" ? "Hello Smart Node" : "City Safe Platform"}
                </p>
                <div className="flex justify-center space-x-2">
                  {isRotating && <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>}
                  <span className="text-xs">View Mode: {viewMode}</span>
                </div>
              </div>
            </div>

            {/* 3D Controls */}
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 border space-y-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleRotate}
                className="w-full"
              >
                <RotateCw className="h-3 w-3 mr-1" />
                {isRotating ? "Stop" : "Rotate"}
              </Button>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomIn}
                  className="flex-1"
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomOut}
                  className="flex-1"
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleResetView}
                className="w-full"
              >
                <Move className="h-3 w-3 mr-1" />
                Reset View
              </Button>
            </div>

            {/* View Mode Selector */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 border">
              <div className="text-xs font-semibold mb-2">View Mode</div>
              <div className="space-y-1">
                {["exterior", "interior", "exploded"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`block w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                      viewMode === mode
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "hover:bg-muted"
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                  </button>
                ))}
              </div>
            </div>

            {/* TODO: Add loading indicator */}
            {/* TODO: Add AR mode toggle */}
            {/* TODO: Add fullscreen mode */}
          </div>
        </Card>

        {/* Component Info Panel */}
        <div className="space-y-4">
          {/* Component List */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span>Components</span>
            </h3>
            <div className="space-y-2">
              {helloSmartNodeComponents.map((component) => (
                <button
                  key={component.id}
                  onClick={() => setSelectedComponent(
                    selectedComponent === component.id ? null : component.id
                  )}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedComponent === component.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {component.id === "solar-panels" && <Sun className="h-4 w-4 text-yellow-600" />}
                      {component.id === "battery-system" && <Battery className="h-4 w-4 text-green-600" />}
                      {component.id === "connectivity" && <Wifi className="h-4 w-4 text-blue-600" />}
                      {component.id === "sensors" && <TreePine className="h-4 w-4 text-green-500" />}
                      {component.id === "controller" && <Cpu className="h-4 w-4 text-purple-600" />}
                      <span className="text-sm font-medium">{component.name}</span>
                    </div>
                    <Badge
                      variant={component.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {component.status}
                    </Badge>
                  </div>
                  {selectedComponent === component.id && (
                    <div className="mt-2 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {component.description}
                      </p>
                      <div className="space-y-1">
                        {component.specs.map((spec, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            • {spec}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Quick Specs */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Quick Specs</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span>4' x 6' x 8'</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight:</span>
                <span>350 lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power:</span>
                <span>2kW Solar + 10kWh Battery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connectivity:</span>
                <span>5G + Wi-Fi 6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                <span>IP67 Weatherproof</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-4">
            <div className="space-y-2">
              <Button size="sm" className="w-full">
                <Eye className="h-3 w-3 mr-2" />
                Schedule Live Demo
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Maximize2 className="h-3 w-3 mr-2" />
                Enter AR Mode
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* TODO: Add advanced features */}
      {/*
        - Real-time data overlay on 3D models
        - AR/VR viewing capabilities
        - Customization options (colors, branding)
        - Comparison mode (side-by-side products)
        - Integration with technical documentation
        - Interactive tutorial mode
        - Export to CAD formats
        - Thermal view simulation
        - Network coverage visualization
        - Environmental impact analysis
      */}
    </div>
  );
}