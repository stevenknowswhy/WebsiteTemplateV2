/**
 * Admin Telemetry Alerts Page
 * System alerts and notifications management
 */

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TelemetryAlerts from '@/components/telemetry/TelemetryAlerts';

export default function TelemetryAlertsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Telemetry Alerts</h1>
            <p className="text-muted-foreground">
              System alerts and notifications management
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Configure Rules
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading alerts...</div>}>
        <TelemetryAlerts />
      </Suspense>
    </div>
  );
}