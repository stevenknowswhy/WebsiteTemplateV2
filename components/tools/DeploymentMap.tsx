"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Wifi,
  Shield,
  Users,
  TrendingUp,
  Battery,
  TreePine,
  Activity,
  Zap,
  Eye,
  Filter
} from "lucide-react";

// TODO: Phase 2 Enhancement - Integrate with real mapping API (Mapbox, Google Maps, etc.)
// TODO: Connect to live node status data from backend systems
// TODO: Add real-time environmental data overlays
// TODO: Implement heat map visualization for network coverage
// TODO: Add historical deployment timeline view
// TODO: Integrate with 3D building visualization tools

interface NodeData {
  id: string;
  type: "hello-smart" | "city-safe";
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
  };
  status: "active" | "installing" | "planned" | "maintenance";
  metrics: {
    usersConnected: number;
    powerLevel: number;
    airQuality: number;
    uptime: number;
  };
  installDate: string;
  propertyOwner: string;
}

// TODO: Replace with real data from API
const mockNodes: NodeData[] = [
  {
    id: "HS-001",
    type: "hello-smart",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Market St",
      city: "San Francisco",
      state: "CA"
    },
    status: "active",
    metrics: {
      usersConnected: 234,
      powerLevel: 87,
      airQuality: 42,
      uptime: 99.8
    },
    installDate: "2024-09-15",
    propertyOwner: "Commercial Properties LLC"
  },
  {
    id: "CS-001",
    type: "city-safe",
    location: {
      lat: 37.7849,
      lng: -122.4094,
      address: "456 City Hall",
      city: "San Francisco",
      state: "CA"
    },
    status: "active",
    metrics: {
      usersConnected: 0,
      powerLevel: 100,
      airQuality: 38,
      uptime: 100
    },
    installDate: "2024-08-01",
    propertyOwner: "City of San Francisco"
  },
  {
    id: "HS-002",
    type: "hello-smart",
    location: {
      lat: 47.6062,
      lng: -122.3321,
      address: "789 Pike St",
      city: "Seattle",
      state: "WA"
    },
    status: "installing",
    metrics: {
      usersConnected: 0,
      powerLevel: 0,
      airQuality: 0,
      uptime: 0
    },
    installDate: "2024-11-15",
    propertyOwner: "Seattle Retail Partners"
  }
];

export default function DeploymentMap() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [filterType, setFilterType] = useState<"all" | "hello-smart" | "city-safe">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "installing" | "planned">("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // TODO: Implement actual map initialization with mapping library
  useEffect(() => {
    // This is where we would initialize Mapbox GL JS, Google Maps, or similar
    console.log("Map initialization placeholder");
  }, []);

  const filteredNodes = mockNodes.filter(node => {
    const typeMatch = filterType === "all" || node.type === filterType;
    const statusMatch = filterStatus === "all" || node.status === filterStatus;
    const cityMatch = selectedCity === "all" || node.location.city === selectedCity;
    return typeMatch && statusMatch && cityMatch;
  });

  const getNodeIcon = (type: string) => {
    return type === "hello-smart" ?
      <Wifi className="h-4 w-4 text-blue-600" /> :
      <Shield className="h-4 w-4 text-green-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "installing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "planned": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "maintenance": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Type:</span>
            <Tabs value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="hello-smart" className="text-xs">Hello Smart</TabsTrigger>
                <TabsTrigger value="city-safe" className="text-xs">City Safe</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Status:</span>
            <Tabs value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                <TabsTrigger value="installing" className="text-xs">Installing</TabsTrigger>
                <TabsTrigger value="planned" className="text-xs">Planned</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* City Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1 text-sm border rounded-md bg-background"
            >
              <option value="all">All Cities</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Seattle">Seattle</option>
              {/* TODO: Populate with actual cities from API */}
            </select>
          </div>

          {/* Stats */}
          <div className="ml-auto text-sm text-muted-foreground">
            {filteredNodes.length} nodes visible
          </div>
        </div>
      </Card>

      {/* Main Map and Info Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="relative">
            {/* TODO: Replace with actual map component */}
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Deployment Map</h3>
                <p className="text-sm mb-4">Real-time visualization of Hello Smart Nodes and City Safe Platforms</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="size-3 rounded-full bg-blue-600"></div>
                    <span>Hello Smart Nodes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="size-3 rounded-full bg-green-600"></div>
                    <span>City Safe Platforms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border">
              <h4 className="text-sm font-semibold mb-2">Legend</h4>
              <div className="space-y-1">
                {[
                  { color: "bg-green-600", label: "Active" },
                  { color: "bg-yellow-600", label: "Installing" },
                  { color: "bg-blue-600", label: "Planned" },
                  { color: "bg-red-600", label: "Maintenance" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className={`size-2 rounded-full ${item.color}`}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TODO: Add map controls (zoom, pan, layers) */}
            {/* TODO: Add real-time data refresh indicator */}
          </div>
        </Card>

        {/* Node Details Panel */}
        <div className="space-y-4">
          {selectedNode ? (
            <Card className="p-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getNodeIcon(selectedNode.type)}
                    <CardTitle className="text-lg">{selectedNode.id}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(selectedNode.status)}>
                    {selectedNode.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedNode.location.address}, {selectedNode.location.city}, {selectedNode.location.state}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedNode.type === "hello-smart" ? (
                    <>
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
                        <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-600">
                          {selectedNode.metrics.usersConnected}
                        </div>
                        <p className="text-xs text-muted-foreground">Connected Users</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                        <TreePine className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-600">
                          {selectedNode.metrics.airQuality}
                        </div>
                        <p className="text-xs text-muted-foreground">Air Quality</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                        <Battery className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-600">
                          {selectedNode.metrics.powerLevel}%
                        </div>
                        <p className="text-xs text-muted-foreground">Power Level</p>
                      </div>
                      <div className="text-center p-2 bg-purple-50 dark:bg-purple-950 rounded">
                        <Shield className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-purple-600">
                          {selectedNode.metrics.uptime}%
                        </div>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Install Date:</span>
                    <span>{new Date(selectedNode.installDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Owner:</span>
                    <span>{selectedNode.propertyOwner}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Activity className="h-3 w-3 mr-1" />
                    Live Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-4 text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click on a node to view detailed information
              </p>
            </Card>
          )}

          {/* Network Statistics */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-sm">Network Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-3 w-3 text-blue-600" />
                  <span className="text-sm">Hello Smart Nodes</span>
                </div>
                <Badge variant="secondary">
                  {mockNodes.filter(n => n.type === "hello-smart").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span className="text-sm">City Safe Platforms</span>
                </div>
                <Badge variant="secondary">
                  {mockNodes.filter(n => n.type === "city-safe").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Activity className="h-3 w-3 text-green-600" />
                  <span className="text-sm">Total Users Connected</span>
                </div>
                <Badge variant="secondary">
                  {mockNodes.reduce((sum, n) => sum + n.metrics.usersConnected, 0).toLocaleString()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Zap className="h-3 w-3 text-yellow-600" />
                  <span className="text-sm">Average Uptime</span>
                </div>
                <Badge variant="secondary">
                  {(mockNodes.reduce((sum, n) => sum + n.metrics.uptime, 0) / mockNodes.length).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* TODO: Add advanced features */}
      {/*
        - Heat map overlay for network coverage
        - Historical timeline view of deployments
        - Environmental data layers (air quality, noise levels)
        - Demographic impact analysis
        - Revenue heat map by location
        - Predictive deployment planning tool
        - Integration with city planning data
        - Real-time alert system for maintenance needs
      */}
    </div>
  );
}