'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import WebhookTestInterface from '@/components/admin/WebhookTestInterface';

export default function WebhookToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Webhook Tools</h1>
        <p className="text-muted-foreground">
          Test and validate webhook endpoints for your integrations
        </p>
      </div>

      <Suspense fallback={<WebhookTestSkeleton />}>
        <WebhookTestInterface />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Best Practices</CardTitle>
            <CardDescription>
              Follow these guidelines for secure webhook implementations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Use HTTPS URLs</p>
                <p className="text-sm text-muted-foreground">
                  Always use HTTPS endpoints to ensure data is encrypted in transit
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Validate Signatures</p>
                <p className="text-sm text-muted-foreground">
                  Always verify webhook signatures to ensure requests are authentic
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Respond Quickly</p>
                <p className="text-sm text-muted-foreground">
                  Return a 2xx status code within 30 seconds to prevent timeouts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Handle Duplicates</p>
                <p className="text-sm text-muted-foreground">
                  Webhooks may be sent multiple times, ensure idempotent processing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>
              Available webhook events for your integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">node.alert</span>
              <span className="text-sm text-muted-foreground">Node alert triggered</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">node.online</span>
              <span className="text-sm text-muted-foreground">Node came online</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">node.offline</span>
              <span className="text-sm text-muted-foreground">Node went offline</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">user.invited</span>
              <span className="text-sm text-muted-foreground">User invited to tenant</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">alert.acknowledged</span>
              <span className="text-sm text-muted-foreground">Alert acknowledged</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-mono text-sm">alert.resolved</span>
              <span className="text-sm text-muted-foreground">Alert resolved</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-mono text-sm">system.maintenance</span>
              <span className="text-sm text-muted-foreground">System maintenance</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WebhookTestSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}