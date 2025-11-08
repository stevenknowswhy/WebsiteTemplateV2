"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Building2, Users, Wifi, Battery, TreePine, Sun, Shield } from "lucide-react";

// TODO: Phase 2 Enhancement - Implement actual revenue calculation logic
// TODO: Connect to real-time data sources for accurate projections
// TODO: Add advanced scenarios (multi-year projections, expansion planning)
// TODO: Integrate with GIS data for location-based analytics
// TODO: Add export functionality (PDF reports, CSV data)

export default function RevenueCalculator() {
  const [propertyType, setPropertyType] = useState("");
  const [squareFootage, setSquareFootage] = useState([5000]);
  const [trafficScore, setTrafficScore] = useState([50]);
  const [nodeCount, setNodeCount] = useState([1]);
  const [location, setLocation] = useState("");

  // TODO: Replace with actual revenue calculation algorithm
  const calculateMonthlyRevenue = () => {
    const baseRevenue = {
      "commercial-office": 250,
      "retail-center": 350,
      "industrial-warehouse": 200,
      "multi-family": 180,
      "hospitality": 400,
      "educational": 150
    };

    const base = baseRevenue[propertyType as keyof typeof baseRevenue] || 200;
    const trafficMultiplier = trafficScore[0] / 50;
    const sizeMultiplier = Math.min(squareFootage[0] / 5000, 2);

    return Math.round(base * trafficMultiplier * sizeMultiplier * nodeCount[0]);
  };

  const monthlyRevenue = calculateMonthlyRevenue();
  const annualRevenue = monthlyRevenue * 12;
  const propertyOwnerShare = Math.round(annualRevenue * 0.25); // 25% average
  const cityShare = Math.round(annualRevenue * 0.25); // 25% for cities

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Revenue Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial-office">Commercial Office</SelectItem>
                  <SelectItem value="retail-center">Retail Center</SelectItem>
                  <SelectItem value="industrial-warehouse">Industrial Warehouse</SelectItem>
                  <SelectItem value="multi-family">Multi-Family Housing</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Square Footage */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Square Footage: {squareFootage[0].toLocaleString()} sq ft
              </label>
              {/* TODO: Replace with actual Slider component */}
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={squareFootage[0]}
                onChange={(e) => setSquareFootage([parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1,000 sq ft</span>
                <span>50,000 sq ft</span>
              </div>
            </div>

            {/* Traffic Score */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Traffic Score: {trafficScore[0]}/100
              </label>
              {/* TODO: Replace with actual Slider component */}
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={trafficScore[0]}
                onChange={(e) => setTrafficScore([parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low Traffic</span>
                <span>High Traffic</span>
              </div>
            </div>

            {/* Number of Nodes */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Nodes: {nodeCount[0]}
              </label>
              {/* TODO: Replace with actual Slider component */}
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={nodeCount[0]}
                onChange={(e) => setNodeCount([parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">City/Region</label>
              <Input
                placeholder="Enter city or region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {/* TODO: Add autocomplete with city suggestions */}
              {/* TODO: Integrate with geographic data for location-based revenue factors */}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projections */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Revenue Projections</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Monthly Revenue */}
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                ${monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Estimated Monthly Revenue</p>
            </div>

            {/* Annual Revenue */}
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${annualRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Estimated Annual Revenue</p>
            </div>

            {/* Revenue Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Property Owner Share (25%)</span>
                </div>
                <Badge variant="secondary">${propertyOwnerShare.toLocaleString()}/year</Badge>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">City Share (25%)</span>
                </div>
                <Badge variant="secondary">${cityShare.toLocaleString()}/year</Badge>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Forhem Operations (50%)</span>
                </div>
                <Badge variant="secondary">${(annualRevenue * 0.5).toLocaleString()}/year</Badge>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 text-sm">Additional Benefits (Value: $5,000+ annually)</h4>
              <div className="space-y-2">
                {[
                  { icon: <Sun className="h-3 w-3" />, benefit: "100% solar-powered operation" },
                  { icon: <Shield className="h-3 w-3" />, benefit: "Zero personal data collection" },
                  { icon: <Battery className="h-3 w-3" />, benefit: "Backup power capabilities" },
                  { icon: <TreePine className="h-3 w-3" />, benefit: "Environmental monitoring data" },
                  { icon: <Wifi className="h-3 w-3" />, benefit: "Free property connectivity" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="text-green-600">{item.icon}</span>
                    <span>{item.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Get Detailed Projection Report
          </Button>
          <Button variant="outline" size="lg">
            <Building2 className="h-4 w-4 mr-2" />
            Schedule Property Assessment
          </Button>
        </div>
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground mb-2">
            *Revenue estimates based on current market data and typical deployment patterns.
            Actual revenue may vary based on specific location, deployment conditions, and market factors.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Privacy-first infrastructure</span>
            <span className="text-xs text-muted-foreground">•</span>
            <Link href="/privacy" className="text-xs text-blue-600 hover:text-blue-700 underline">
              Learn about our privacy commitment
            </Link>
          </div>
        </div>
      </Card>

      {/* TODO: Add advanced features section */}
      {/*
        - Multi-year projection calculator
        - Expansion planning tool
        - Comparison with other revenue sources
        - ROI analysis with installation costs (currently $0)
        - Tax benefits and incentives calculator
      */}
    </div>
  );
}