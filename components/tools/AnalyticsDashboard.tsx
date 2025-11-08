"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Users,
  Wifi,
  Battery,
  TreePine,
  TrendingUp,
  TrendingDown,
  Zap,
  Eye,
  Download,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

// TODO: Phase 2 Enhancement - Connect to real-time analytics API
// TODO: Implement WebSocket connections for live data updates
// TODO: Add data visualization with Chart.js or D3.js
// TODO: Implement custom date range selection
// TODO: Add export functionality for reports
// TODO: Integrate with alerting system for anomalies
// TODO: Add predictive analytics and forecasting

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  unit: string;
  icon: React.ReactNode;
  status: "up" | "down" | "stable";
}

interface NodeAlert {
  id: string;
  nodeId: string;
  type: "warning" | "error" | "maintenance";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// TODO: Replace with real API data
const mockMetrics: MetricCard[] = [
  {
    title: "Active Users",
    value: 12453,
    change: 12.5,
    unit: "users",
    icon: <Users className="h-4 w-4 text-blue-600" />,
    status: "up"
  },
  {
    title: "Network Uptime",
    value: 99.8,
    change: 0.2,
    unit: "%",
    icon: <Activity className="h-4 w-4 text-green-600" />,
    status: "up"
  },
  {
    title: "Energy Generated",
    value: 45678,
    change: 8.3,
    unit: "kWh",
    icon: <Zap className="h-4 w-4 text-yellow-600" />,
    status: "up"
  },
  {
    title: "CO₂ Saved",
    value: 23456,
    change: 15.7,
    unit: "kg",
    icon: <TreePine className="h-4 w-4 text-green-500" />,
    status: "up"
  }
];

const mockAlerts: NodeAlert[] = [
  {
    id: "ALT-001",
    nodeId: "HS-001",
    type: "warning",
    message: "Reduced power output due to weather conditions",
    timestamp: "2024-11-07T14:30:00Z",
    acknowledged: false
  },
  {
    id: "ALT-002",
    nodeId: "CS-001",
    type: "maintenance",
    message: "Scheduled maintenance in 24 hours",
    timestamp: "2024-11-07T12:15:00Z",
    acknowledged: true
  },
  {
    id: "ALT-003",
    nodeId: "HS-003",
    type: "error",
    message: "Connectivity issues detected",
    timestamp: "2024-11-07T10:45:00Z",
    acknowledged: false
  }
];

export default function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("24h");
  const [selectedMetric, setSelectedMetric] = useState<string>("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // TODO: Implement WebSocket connection for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Fetch fresh data from API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setLastUpdate(new Date());
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Real-Time Analytics</h2>
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {/* Time Range Selector */}
            <Tabs value={selectedTimeRange} onValueChange={(value: any) => setSelectedTimeRange(value)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="24h" className="text-xs">24H</TabsTrigger>
                <TabsTrigger value="7d" className="text-xs">7D</TabsTrigger>
                <TabsTrigger value="30d" className="text-xs">30D</TabsTrigger>
                <TabsTrigger value="90d" className="text-xs">90D</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                metric.status === "up" ? "text-green-600" :
                metric.status === "down" ? "text-red-600" : "text-gray-600"
              }`}>
                {metric.status === "up" && <TrendingUp className="h-3 w-3" />}
                {metric.status === "down" && <TrendingDown className="h-3 w-3" />}
                <span>{metric.change > 0 ? "+" : ""}{metric.change}%</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {typeof metric.value === "number" ? metric.value.toLocaleString() : metric.value}
              </div>
              <p className="text-xs text-muted-foreground">{metric.unit}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Usage Chart */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Network Usage Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual chart component */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Usage Trends Chart</p>
                  <p className="text-xs">Real-time network usage visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with actual performance charts */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-8 w-8 mx-auto mb-1" />
                    <p className="text-xs">Node Distribution</p>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-8 w-8 mx-auto mb-1" />
                    <p className="text-xs">Energy Production</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card className="p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span>Active Alerts</span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {mockAlerts.filter(a => !a.acknowledged).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{alert.nodeId}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <Button size="sm" variant="outline" className="text-xs">
                      Acknowledge
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Top Nodes */}
          <Card className="p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span>Top Performing Nodes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "HS-002", users: 456, uptime: 100, location: "Seattle" },
                { id: "HS-001", users: 234, uptime: 99.8, location: "San Francisco" },
                { id: "CS-001", users: 0, uptime: 100, location: "San Francisco" }
              ].map((node, index) => (
                <div key={node.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{node.id}</p>
                      <p className="text-xs text-muted-foreground">{node.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{node.users} users</p>
                    <p className="text-xs text-muted-foreground">{node.uptime}% uptime</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button size="sm" variant="outline" className="w-full justify-start">
                <MapPin className="h-3 w-3 mr-2" />
                View Deployment Map
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Calendar className="h-3 w-3 mr-2" />
                Schedule Maintenance
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start">
                <Download className="h-3 w-3 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TODO: Add advanced features */}
      {/*
        - Real-time WebSocket data streaming
        - Custom date range picker
        - Interactive charts with drill-down capabilities
        - Predictive analytics and forecasting
        - Anomaly detection and alerting
        - Custom dashboard creation
        - Data export in multiple formats
        - Integration with external monitoring tools
        - Mobile-responsive dashboard views
        - Automated report generation and scheduling
      */}
    </div>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3m-7 9v-6m0 0l-3 3m3-3l3 3m-7-3h6" />
    </svg>
  );
}