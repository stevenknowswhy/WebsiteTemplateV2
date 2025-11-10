/**
 * Admin Telemetry Events Page
 * Detailed view of telemetry events with filtering and search
 */

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TelemetryEvents from '@/components/telemetry/TelemetryEvents';

export default function TelemetryEventsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Telemetry Events</h1>
            <p className="text-muted-foreground">
              View and filter detailed system events and activities
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Export Events
          </Button>
        </div>
      </div>

      <Suspense fallback={<div>Loading events...</div>}>
        <TelemetryEvents />
      </Suspense>
    </div>
  );
}