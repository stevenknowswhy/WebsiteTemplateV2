/**
 * Admin Telemetry Dashboard Page
 * Comprehensive monitoring and analytics for system performance and activity
 */

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Cpu,
  Database,
  Shield,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

import TelemetryOverview from '@/components/telemetry/TelemetryOverview';
import TelemetryEvents from '@/components/telemetry/TelemetryEvents';
import TelemetryMetrics from '@/components/telemetry/TelemetryMetrics';
import TelemetryAlerts from '@/components/telemetry/TelemetryAlerts';

export default function TelemetryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telemetry</h1>
          <p className="text-muted-foreground">
            Monitor system performance, user activity, and security events
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 24h
          </Button>
          <Button size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Live
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Suspense fallback={<div>Loading overview...</div>}>
            <TelemetryOverview />
          </Suspense>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Suspense fallback={<div>Loading events...</div>}>
            <TelemetryEvents />
          </Suspense>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Suspense fallback={<div>Loading metrics...</div>}>
            <TelemetryMetrics />
          </Suspense>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Suspense fallback={<div>Loading alerts...</div>}>
            <TelemetryAlerts />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}