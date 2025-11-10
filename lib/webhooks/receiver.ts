/**
 * Webhook Receiver Utilities
 * Helps test and validate webhook endpoints
 */

import { parseIncomingWebhook, verifyWebhookSignature, generateWebhookSignature } from './signer';

/**
 * Test webhook endpoint response
 */
export interface WebhookTestResult {
  success: boolean;
  statusCode: number;
  statusText: string;
  responseHeaders: Record<string, string>;
  responseBody: string;
  responseTime: number;
  error?: string;
}

/**
 * Test webhook endpoint with a test payload
 */
export async function testWebhookEndpoint(
  url: string,
  secret: string,
  testEventType: string = 'webhook.test',
  testData: any = { message: 'Test webhook from Forhem Admin Panel' },
  timeout: number = 10000
): Promise<WebhookTestResult> {
  const startTime = Date.now();

  try {
    const payload = {
      event: testEventType,
      timestamp: new Date().toISOString(),
      data: testData,
    };

    const payloadString = JSON.stringify(payload);
    const signature = generateWebhookSignature(payloadString, secret);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Forhem-Webhook/1.0',
        'X-Forhem-Event': testEventType,
        'X-Forhem-Signature': signature,
        'X-Forhem-Timestamp': payload.timestamp,
      },
      body: payloadString,
      signal: AbortSignal.timeout(timeout),
    });

    const responseTime = Date.now() - startTime;
    const responseBody = await response.text();
    const responseHeaders: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      success: response.ok,
      statusCode: response.status,
      statusText: response.statusText,
      responseHeaders,
      responseBody: responseBody.substring(0, 1000), // Limit response size
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      success: false,
      statusCode: 0,
      statusText: 'Request Failed',
      responseHeaders: {},
      responseBody: '',
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Validate webhook endpoint security
 */
export interface WebhookSecurityValidation {
  acceptsPost: boolean;
  validatesSignature: boolean;
  returnsCorrectStatus: boolean;
  usesHttps: boolean;
  hasReasonableTimeout: boolean;
  issues: string[];
  score: number; // 0-100
}

/**
 * Validate webhook endpoint security best practices
 */
export async function validateWebhookSecurity(
  url: string,
  secret: string
): Promise<WebhookSecurityValidation> {
  const issues: string[] = [];
  let score = 100;

  // Check HTTPS
  if (!url.startsWith('https://')) {
    issues.push('Endpoint should use HTTPS for security');
    score -= 20;
  }

  // Test basic connectivity
  const connectivityTest = await testWebhookEndpoint(url, secret, 'webhook.test', { test: 'connectivity' });

  if (!connectivityTest.success && connectivityTest.statusCode === 0) {
    issues.push('Endpoint is not reachable');
    score -= 30;
  } else {
    // Check if it accepts POST requests
    if (connectivityTest.statusCode === 405 || connectivityTest.statusCode === 404) {
      issues.push('Endpoint should accept POST requests');
      score -= 15;
    }

    // Check response time
    if (connectivityTest.responseTime > 30000) {
      issues.push('Response time is too slow (>30s)');
      score -= 10;
    }

    // Test signature validation
    const invalidSignatureTest = await testWebhookEndpoint(
      url,
      secret,
      'webhook.test',
      { test: 'invalid-signature' }
    );

    // Send with invalid signature
    try {
      const payload = {
        event: 'webhook.test',
        timestamp: new Date().toISOString(),
        data: { test: 'invalid-signature' },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Forhem-Webhook/1.0',
          'X-Forhem-Event': 'webhook.test',
          'X-Forhem-Signature': 'sha256=invalid_signature',
          'X-Forhem-Timestamp': payload.timestamp,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });

      if (response.ok) {
        issues.push('Endpoint should validate webhook signatures');
        score -= 25;
      }
    } catch (error) {
      // Network errors are okay for this test
    }
  }

  return {
    acceptsPost: connectivityTest.statusCode !== 405 && connectivityTest.statusCode !== 404,
    validatesSignature: !issues.some(issue => issue.includes('signature')),
    returnsCorrectStatus: connectivityTest.statusCode >= 200 && connectivityTest.statusCode < 300,
    usesHttps: url.startsWith('https://'),
    hasReasonableTimeout: connectivityTest.responseTime <= 30000,
    issues,
    score: Math.max(0, score),
  };
}

/**
 * Generate test payloads for different event types
 */
export function generateTestPayload(eventType: string): any {
  switch (eventType) {
    case 'node.alert':
      return {
        nodeId: 'test-node-123',
        alertType: 'offline',
        severity: 'high',
        message: 'Test node went offline',
        timestamp: new Date().toISOString(),
      };

    case 'node.online':
      return {
        nodeId: 'test-node-123',
        status: 'online',
        lastSeen: new Date().toISOString(),
        location: 'Test Location',
      };

    case 'user.invited':
      return {
        userId: 'test-user-456',
        email: 'test@example.com',
        role: 'admin',
        invitedBy: 'admin@example.com',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

    case 'alert.acknowledged':
      return {
        alertId: 'test-alert-789',
        nodeId: 'test-node-123',
        acknowledgedBy: 'admin@example.com',
        acknowledgedAt: new Date().toISOString(),
      };

    case 'alert.resolved':
      return {
        alertId: 'test-alert-789',
        nodeId: 'test-node-123',
        resolvedBy: 'admin@example.com',
        resolvedAt: new Date().toISOString(),
        resolution: 'Node came back online',
      };

    case 'system.maintenance':
      return {
        maintenanceId: 'test-maintenance-001',
        type: 'scheduled',
        startTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        description: 'Scheduled system maintenance',
      };

    default:
      return {
        message: 'Test webhook from Forhem Admin Panel',
        timestamp: new Date().toISOString(),
        test: true,
      };
  }
}

/**
 * Comprehensive webhook test suite
 */
export interface WebhookTestSuite {
  endpointUrl: string;
  securityValidation: WebhookSecurityValidation;
  deliveryTests: Array<{
    eventType: string;
    result: WebhookTestResult;
  }>;
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    overallScore: number;
  };
}

/**
 * Run comprehensive webhook test suite
 */
export async function runWebhookTestSuite(
  url: string,
  secret: string,
  eventTypes: string[] = ['webhook.test', 'node.alert', 'node.online']
): Promise<WebhookTestSuite> {
  const securityValidation = await validateWebhookSecurity(url, secret);
  const deliveryTests = [];

  for (const eventType of eventTypes) {
    const testData = generateTestPayload(eventType);
    const result = await testWebhookEndpoint(url, secret, eventType, testData);
    deliveryTests.push({ eventType, result });
  }

  const totalTests = deliveryTests.length + 1; // +1 for security validation
  const passedTests = deliveryTests.filter(test => test.result.success).length + (securityValidation.score > 50 ? 1 : 0);
  const failedTests = totalTests - passedTests;
  const overallScore = Math.round((securityValidation.score + (passedTests - 1) * 100) / totalTests);

  return {
    endpointUrl: url,
    securityValidation,
    deliveryTests,
    summary: {
      totalTests,
      passedTests,
      failedTests,
      overallScore,
    },
  };
}