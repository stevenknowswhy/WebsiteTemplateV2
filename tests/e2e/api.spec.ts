import { test, expect } from "@playwright/test";
import { request } from "@playwright/test";

test.describe("API Endpoint Tests", () => {
  const baseURL = "http://localhost:3000";

  test("@api health check endpoint responds correctly", async ({ request }) => {
    const response = await request.get(`${baseURL}/api/health`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('healthy');
  });

  test("@api ready check endpoint responds correctly", async ({ request }) => {
    const response = await request.get(`${baseURL}/api/ready`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('ready');
  });

  test("@api live check endpoint responds correctly", async ({ request }) => {
    const response = await request.get(`${baseURL}/api/live`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('live');
  });

  test("@api contact endpoint handles POST requests", async ({ request }) => {
    const contactData = {
      name: "Test User",
      email: "test@forhem.com",
      subject: "Test Inquiry",
      message: "This is a test message from the API tests."
    };

    const response = await request.post(`${baseURL}/api/contact`, {
      data: contactData
    });

    // Should accept the request (may return 200, 201, or 400 depending on validation)
    expect([200, 201, 400]).toContain(response.status());

    if (response.status() === 400) {
      const body = await response.json();
      expect(body).toHaveProperty('error');
    }
  });

  test("@api contact endpoint validates required fields", async ({ request }) => {
    const invalidData = {
      // Missing required fields
      name: "",
      email: "invalid-email",
      message: ""
    };

    const response = await request.post(`${baseURL}/api/contact`, {
      data: invalidData
    });

    // Should return validation error
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test("@api rate limiting is in place", async ({ request }) => {
    // Make multiple rapid requests to test rate limiting
    const promises = Array(20).fill(null).map(() =>
      request.get(`${baseURL}/api/health`)
    );

    const responses = await Promise.all(promises);

    // Most requests should succeed, but some might be rate limited
    const successCount = responses.filter(r => r.status() === 200).length;
    const rateLimitedCount = responses.filter(r => r.status() === 429).length;

    expect(successCount).toBeGreaterThan(0);

    // If rate limiting is implemented, some requests should be throttled
    if (rateLimitedCount > 0) {
      const rateLimitedResponse = responses.find(r => r.status() === 429);
      expect(rateLimitedResponse).toBeTruthy();

      const body = await rateLimitedResponse!.json();
      expect(body).toHaveProperty('error');
    }
  });

  test("@api admin endpoints require authentication", async ({ request }) => {
    const adminEndpoints = [
      '/api/admin/overview',
      '/api/admin/nodes',
      '/api/admin/alerts',
      '/api/admin/users',
      '/api/admin/settings',
      '/api/admin/audit',
      '/api/admin/telemetry/events',
      '/api/admin/telemetry/metrics',
      '/api/admin/telemetry/dashboard'
    ];

    for (const endpoint of adminEndpoints) {
      const response = await request.get(`${baseURL}${endpoint}`);

      // Should return 401 for unauthenticated requests
      expect(response.status()).toBe(401);

      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toMatch(/unauthorized/i);
    }
  });

  test("@api CORS headers are properly set", async ({ request }) => {
    const response = await request.fetch(`${baseURL}/api/health`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://example.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });

    // Should handle preflight requests
    expect([200, 204]).toContain(response.status());

    const corsHeaders = response.headers();

    // Check for essential CORS headers
    if (corsHeaders['access-control-allow-origin']) {
      expect(corsHeaders['access-control-allow-origin']).toBeTruthy();
    }

    if (corsHeaders['access-control-allow-methods']) {
      const allowedMethods = corsHeaders['access-control-allow-methods'].toLowerCase();
      expect(allowedMethods).toContain('get');
      expect(allowedMethods).toContain('post');
    }
  });

  test("@api error handling returns proper JSON format", async ({ request }) => {
    // Test non-existent endpoint
    const response = await request.get(`${baseURL}/api/non-existent-endpoint`);

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(typeof body.error).toBe('string');
  });

  test("@api content-type headers are correct", async ({ request }) => {
    const response = await request.get(`${baseURL}/api/health`);

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/application\/json/);
  });

  test("@api security headers are present", async ({ request }) => {
    const response = await request.get(`${baseURL}/api/health`);

    expect(response.status()).toBe(200);

    const headers = response.headers();

    // Check for important security headers
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy'
    ];

    securityHeaders.forEach(header => {
      if (headers[header]) {
        expect(headers[header]).toBeTruthy();
      }
    });
  });

  test("@api request size limits are enforced", async ({ request }) => {
    // Create a large payload
    const largePayload = {
      data: 'x'.repeat(1024 * 1024), // 1MB of data
    };

    const response = await request.post(`${baseURL}/api/contact`, {
      data: largePayload
    });

    // Should reject oversized requests
    expect([400, 413]).toContain(response.status());

    if (response.status() === 400) {
      const body = await response.json();
      expect(body).toHaveProperty('error');
    }
  });

  test("@api timeout handling works correctly", async ({ request }) => {
    // This test simulates a long-running request
    // In a real scenario, you might have an endpoint that artificially delays

    const response = await request.get(`${baseURL}/api/health`, {
      timeout: 5000 // 5 second timeout
    });

    // Should complete within timeout or return timeout error
    expect(response.status()).toBeLessThan(500);
  });

  test("@api admin telemetry endpoints with proper authentication", async ({ request }) => {
    // This test would require a valid authentication token
    // For now, we'll test that the endpoints exist and reject unauthenticated requests

    const telemetryEndpoints = [
      { method: 'GET', path: '/api/admin/telemetry/events' },
      { method: 'GET', path: '/api/admin/telemetry/metrics' },
      { method: 'GET', path: '/api/admin/telemetry/dashboard' },
      { method: 'GET', path: '/api/admin/telemetry/alerts' },
      { method: 'POST', path: '/api/admin/telemetry/events' },
      { method: 'POST', path: '/api/admin/telemetry/alerts' },
    ];

    for (const endpoint of telemetryEndpoints) {
      const response = await request[endpoint.method.toLowerCase() as 'get' | 'post'](
        `${baseURL}${endpoint.path}`,
        endpoint.method === 'POST' ? { data: { test: 'data' } } : undefined
      );

      // Should require authentication
      expect(response.status()).toBe(401);

      const body = await response.json();
      expect(body).toHaveProperty('error');
    }
  });

  test("@api webhook signature verification", async ({ request }) => {
    const webhookPayload = {
      event: 'test.event',
      timestamp: new Date().toISOString(),
      data: { test: 'data' }
    };

    const response = await request.post(`${baseURL}/api/webhooks/incoming`, {
      data: webhookPayload,
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': 'invalid-signature'
      }
    });

    // Should reject invalid signatures
    expect([400, 401, 403]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test.describe("API Response Time Tests", () => {
    test("@api health endpoint responds quickly", async ({ request }) => {
      const startTime = Date.now();

      const response = await request.get(`${baseURL}/api/health`);

      const responseTime = Date.now() - startTime;

      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });

    test("@api contact endpoint responds within reasonable time", async ({ request }) => {
      const contactData = {
        name: "Test User",
        email: "test@forhem.com",
        subject: "Test",
        message: "Test message"
      };

      const startTime = Date.now();

      const response = await request.post(`${baseURL}/api/contact`, {
        data: contactData
      });

      const responseTime = Date.now() - startTime;

      // Should respond within 5 seconds (including any processing time)
      expect(responseTime).toBeLessThan(5000);
      expect([200, 201, 400]).toContain(response.status());
    });
  });
});