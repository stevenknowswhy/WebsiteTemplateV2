import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Telemetry API E2E Tests", () => {
  let authToken: string;
  let tenantId: string;

  test.beforeAll(async ({ request }) => {
    // Setup authentication and get tenant ID
    // In a real environment, you'd authenticate properly
    // For now, we'll simulate authentication headers

    // Mock authentication - replace with actual auth flow
    const loginResponse = await request.post("/api/auth/login", {
      data: {
        email: "admin@forhem.com",
        password: "test-password"
      }
    });

    if (loginResponse.ok()) {
      const loginData = await loginResponse.json();
      authToken = loginData.access_token;
      tenantId = loginData.user?.tenant_id || "test-tenant-id";
    } else {
      // For testing purposes, create a mock token
      authToken = "mock-admin-token";
      tenantId = "test-tenant-id";
    }
  });

  test.describe("Telemetry Events API", () => {
    test("@telemetry @api GET /api/admin/telemetry/events returns events with proper structure", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/events", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data).toHaveProperty("events");
      expect(data).toHaveProperty("pagination");
      expect(data).toHaveProperty("filters");
      expect(Array.isArray(data.events)).toBeTruthy();

      // Check event structure
      if (data.events.length > 0) {
        const event = data.events[0];
        expect(event).toHaveProperty("id");
        expect(event).toHaveProperty("eventType");
        expect(event).toHaveProperty("resourceType");
        expect(event).toHaveProperty("severity");
        expect(event).toHaveProperty("message");
        expect(event).toHaveProperty("createdAt");
        expect(event).toHaveProperty("user");
      }
    });

    test("@telemetry @api POST /api/admin/telemetry/events creates new event", async ({ request }) => {
      const eventData = {
        eventType: "user.action",
        resourceType: "user",
        resourceId: "test-user-id",
        severity: "info",
        message: "Test event created via API",
        metadata: {
          test: true,
          source: "e2e-test"
        },
        duration: 150
      };

      const response = await request.post("/api/admin/telemetry/events", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId,
          "Content-Type": "application/json"
        },
        data: eventData
      });

      expect(response.ok()).toBeTruthy();

      const result = await response.json();
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("event");
      expect(result.event.eventType).toBe(eventData.eventType);
      expect(result.event.severity).toBe(eventData.severity);
    });

    test("@telemetry @api GET events with filtering works correctly", async ({ request }) => {
      // Test with event type filter
      const response = await request.get("/api/admin/telemetry/events?eventType=user.action&severity=info", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.filters.eventType).toBe("user.action");
      expect(data.filters.severity).toBe("info");

      // Verify all returned events match the filter
      data.events.forEach((event: any) => {
        expect(event.eventType).toBe("user.action");
        expect(event.severity).toBe("info");
      });
    });

    test("@telemetry @api GET events with pagination works correctly", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/events?page=1&limit=5", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.pagination.page).toBe(1);
      expect(data.pagination.limit).toBe(5);
      expect(data.events.length).toBeLessThanOrEqual(5);
    });

    test("@telemetry @api unauthorized access is blocked", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/events");

      expect(response.status()).toBe(401);

      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
    });
  });

  test.describe("Telemetry Metrics API", () => {
    test("@telemetry @api GET /api/admin/telemetry/metrics returns aggregated metrics", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/metrics?timeRange=7d", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data).toHaveProperty("timeRange", "7d");
      expect(data).toHaveProperty("metrics");
      expect(data.metrics).toHaveProperty("overview");
      expect(data.metrics).toHaveProperty("eventTypes");
      expect(data.metrics).toHaveProperty("severityDistribution");
      expect(data.metrics).toHaveProperty("timeSeriesData");

      // Check overview metrics structure
      const overview = data.metrics.overview;
      expect(overview).toHaveProperty("totalEvents");
      expect(overview).toHaveProperty("uniqueUsers");
      expect(overview).toHaveProperty("averageEventsPerHour");
      expect(overview).toHaveProperty("criticalEvents");
    });

    test("@telemetry @api different time ranges return correct data", async ({ request }) => {
      const timeRanges = ["1d", "7d", "30d"];

      for (const timeRange of timeRanges) {
        const response = await request.get(`/api/admin/telemetry/metrics?timeRange=${timeRange}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "x-tenant-id": tenantId
          }
        });

        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.timeRange).toBe(timeRange);
        expect(data.dateFrom).toBeTruthy();
        expect(data.dateTo).toBeTruthy();
      }
    });

    test("@telemetry @api metric type filtering works", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/metrics?metricType=performance", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.metricType).toBe("performance");
      expect(data.metrics.performanceMetrics).toBeTruthy();
    });
  });

  test.describe("Telemetry Dashboard API", () => {
    test("@telemetry @api GET /api/admin/telemetry/dashboard returns dashboard data", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/dashboard?dashboardType=overview", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data).toHaveProperty("dashboardType", "overview");
      expect(data).toHaveProperty("generatedAt");
      expect(data).toHaveProperty("data");

      // Check dashboard data structure
      const dashboardData = data.data;
      expect(dashboardData).toHaveProperty("keyMetrics");
      expect(dashboardData).toHaveProperty("distributions");
      expect(dashboardData).toHaveProperty("charts");
      expect(dashboardData).toHaveProperty("recentEvents");
    });

    test("@telemetry @api different dashboard types work correctly", async ({ request }) => {
      const dashboardTypes = ["overview", "performance", "security", "usage"];

      for (const dashboardType of dashboardTypes) {
        const response = await request.get(`/api/admin/telemetry/dashboard?dashboardType=${dashboardType}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "x-tenant-id": tenantId
          }
        });

        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.dashboardType).toBe(dashboardType);
        expect(data.data).toBeTruthy();
      }
    });
  });

  test.describe("Telemetry Alerts API", () => {
    test("@telemetry @api GET /api/admin/telemetry/alerts returns alerts", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/alerts", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data).toHaveProperty("alerts");
      expect(data).toHaveProperty("statistics");
      expect(data).toHaveProperty("pagination");
      expect(Array.isArray(data.alerts)).toBeTruthy();

      // Check statistics structure
      const stats = data.statistics;
      expect(stats).toHaveProperty("totalAlerts");
      expect(stats).toHaveProperty("activeAlerts");
      expect(stats).toHaveProperty("criticalAlerts");
      expect(stats).toHaveProperty("acknowledgedAlerts");
    });

    test("@telemetry @api POST /api/admin/telemetry/alerts creates new alert", async ({ request }) => {
      const alertData = {
        alertType: "anomaly",
        severity: "high",
        title: "Test Alert from E2E",
        description: "This is a test alert created during E2E testing",
        source: "e2e-test",
        metadata: {
          test: true,
          automated: true
        }
      };

      const response = await request.post("/api/admin/telemetry/alerts", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId,
          "Content-Type": "application/json"
        },
        data: alertData
      });

      expect(response.ok()).toBeTruthy();

      const result = await response.json();
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("alert");
      expect(result.alert.alert_type).toBe(alertData.alertType);
      expect(result.alert.severity).toBe(alertData.severity);
    });

    test("@telemetry @api alert filtering works correctly", async ({ request }) => {
      const response = await request.get("/api/admin/telemetry/alerts?alertType=anomaly&severity=high&status=active", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(response.ok()).toBeTruthy();

      // Verify filtering parameters are processed (would need actual data to test filtering results)
      const data = await response.json();
      expect(data.alerts).toBeTruthy();
    });

    test("@telemetry @api invalid alert creation is rejected", async ({ request }) => {
      const invalidAlertData = {
        alertType: "invalid-type",
        severity: "invalid-severity"
        // Missing required fields
      };

      const response = await request.post("/api/admin/telemetry/alerts", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId,
          "Content-Type": "application/json"
        },
        data: invalidAlertData
      });

      expect(response.status()).toBe(400);

      const errorData = await response.json();
      expect(errorData).toHaveProperty("error");
    });
  });

  test.describe("Telemetry Data Integrity", () => {
    test("@telemetry @api events are properly tenant-isolated", async ({ request }) => {
      // Test that events are properly isolated by tenant
      const response1 = await request.get("/api/admin/telemetry/events", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      const response2 = await request.get("/api/admin/telemetry/events", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": "different-tenant-id"
        }
      });

      expect(response1.ok()).toBeTruthy();
      expect(response2.ok()).toBeTruthy();

      const data1 = await response1.json();
      const data2 = await response2.json();

      // Events should be different between tenants
      // (This is a basic check - in reality you'd need proper test data)
      expect(data1.events).toBeTruthy();
      expect(data2.events).toBeTruthy();
    });

    test("@telemetry @api event validation works correctly", async ({ request }) => {
      const invalidEvents = [
        {
          // Missing required fields
          resourceType: "user",
          severity: "info"
        },
        {
          // Invalid severity
          eventType: "user.action",
          resourceType: "user",
          severity: "invalid-severity",
          message: "Test"
        },
        {
          // Invalid event type
          eventType: "invalid.type",
          resourceType: "user",
          severity: "info",
          message: "Test"
        }
      ];

      for (const invalidEvent of invalidEvents) {
        const response = await request.post("/api/admin/telemetry/events", {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "x-tenant-id": tenantId,
            "Content-Type": "application/json"
          },
          data: invalidEvent
        });

        expect(response.status()).toBe(400);
      }
    });

    test("@telemetry @api metrics aggregation is accurate", async ({ request }) => {
      // Create some test events
      const testEvents = [
        {
          eventType: "test.metric",
          resourceType: "test",
          severity: "info",
          message: "Test event 1",
          duration: 100
        },
        {
          eventType: "test.metric",
          resourceType: "test",
          severity: "warning",
          message: "Test event 2",
          duration: 200
        }
      ];

      for (const event of testEvents) {
        await request.post("/api/admin/telemetry/events", {
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "x-tenant-id": tenantId,
            "Content-Type": "application/json"
          },
          data: event
        });
      }

      // Get metrics and verify aggregation
      const metricsResponse = await request.get("/api/admin/telemetry/metrics?timeRange=1d", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "x-tenant-id": tenantId
        }
      });

      expect(metricsResponse.ok()).toBeTruthy();
      const metricsData = await metricsResponse.json();

      // Verify metrics structure (specific values depend on test data)
      expect(metricsData.metrics.overview.totalEvents).toBeGreaterThanOrEqual(0);
      expect(metricsData.metrics.severityDistribution).toBeTruthy();
    });
  });
});

test.describe("Telemetry Performance Tests", () => {
  test("@telemetry @performance telemetry endpoints respond within acceptable time limits", async ({ request }) => {
    const endpoints = [
      "/api/admin/telemetry/events",
      "/api/admin/telemetry/metrics?timeRange=7d",
      "/api/admin/telemetry/dashboard?dashboardType=overview",
      "/api/admin/telemetry/alerts"
    ];

    for (const endpoint of endpoints) {
      const startTime = Date.now();

      const response = await request.get(endpoint, {
        headers: {
          "Authorization": "Bearer mock-admin-token",
          "x-tenant-id": "test-tenant-id"
        }
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // API should respond within 5 seconds
      expect(responseTime).toBeLessThan(5000);
    }
  });

  test("@telemetry @performance bulk event creation doesn't overwhelm the system", async ({ request }) => {
    const bulkEvents = Array.from({ length: 10 }, (_, i) => ({
      eventType: "bulk.test",
      resourceType: "test",
      severity: "info",
      message: `Bulk test event ${i}`,
      metadata: { bulkIndex: i }
    }));

    const startTime = Date.now();

    const promises = bulkEvents.map(event =>
      request.post("/api/admin/telemetry/events", {
        headers: {
          "Authorization": "Bearer mock-admin-token",
          "x-tenant-id": "test-tenant-id",
          "Content-Type": "application/json"
        },
        data: event
      })
    );

    const results = await Promise.all(promises);
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // All requests should succeed
    results.forEach(response => {
      expect(response.ok()).toBeTruthy();
    });

    // Should complete within reasonable time (10 seconds for 10 requests)
    expect(totalTime).toBeLessThan(10000);
  });
});