/**
 * Admin Telemetry Metrics Page
 * Performance metrics and analytics visualizations
 */

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TelemetryMetrics from '@/components/telemetry/TelemetryMetrics';

export default function TelemetryMetricsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/telemetry">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Telemetry Metrics</h1>
            <p className="text-muted-foreground">
              Performance metrics and system analytics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading metrics...</div>}>
        <TelemetryMetrics />
      </Suspense>
    </div>
  );
}