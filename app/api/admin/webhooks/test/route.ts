/**
 * API Route for Webhook Testing
 * POST: Test webhook endpoint with validation
 */

import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { testWebhookEndpoint, validateWebhookSecurity, runWebhookTestSuite, generateTestPayload } from '@/lib/webhooks/receiver';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { url, secret, testType, eventType, testData, customPayload } = body;

    if (!url || !secret) {
      return NextResponse.json(
        { error: 'URL and secret are required' },
        { status: 400 }
      );
    }

    // Validate test type
    const validTestTypes = ['basic', 'security', 'comprehensive', 'custom'];
    if (testType && !validTestTypes.includes(testType)) {
      return NextResponse.json(
        { error: `Invalid test type: ${testType}` },
        { status: 400 }
      );
    }

    // Validate event type if provided
    const validEventTypes = [
      'node.alert', 'node.offline', 'node.online', 'user.invited',
      'alert.acknowledged', 'alert.resolved', 'system.maintenance', 'webhook.test'
    ];
    if (eventType && !validEventTypes.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid event type: ${eventType}` },
        { status: 400 }
      );
    }

    let result;

    switch (testType) {
      case 'basic':
        // Basic connectivity test
        const payload = testData || generateTestPayload(eventType || 'webhook.test');
        result = await testWebhookEndpoint(url, secret, eventType || 'webhook.test', payload);
        break;

      case 'security':
        // Security validation
        result = await validateWebhookSecurity(url, secret);
        break;

      case 'comprehensive':
        // Full test suite
        const testEventTypes = eventType ? [eventType] : ['webhook.test', 'node.alert', 'node.online'];
        result = await runWebhookTestSuite(url, secret, testEventTypes);
        break;

      case 'custom':
        // Custom payload test
        if (!customPayload) {
          return NextResponse.json(
            { error: 'Custom payload is required for custom test type' },
            { status: 400 }
          );
        }
        result = await testWebhookEndpoint(url, secret, eventType || 'webhook.test', customPayload);
        break;

      default:
        // Default to basic test
        const defaultPayload = testData || generateTestPayload(eventType || 'webhook.test');
        result = await testWebhookEndpoint(url, secret, eventType || 'webhook.test', defaultPayload);
    }

    return NextResponse.json({
      success: true,
      testType: testType || 'basic',
      result,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in webhook test API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}