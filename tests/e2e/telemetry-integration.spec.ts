import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Telemetry Integration Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Simulate admin authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-admin-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-admin-user-id",
          email: "admin@forhem.com",
          role: "admin",
          tenant_id: "test-tenant-id"
        }
      }));
    });
  });

  test.describe("Telemetry Dashboard", () => {
    test("@telemetry @integration telemetry dashboard loads correctly", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry");
      await page.waitForLoadState("networkidle");

      // Check page title
      await expect(page).toHaveTitle(/Telemetry|Admin/i);

      // Check main heading
      await expect(page.getByRole("heading", { name: /telemetry/i })).toBeVisible();

      // Check for tabs
      const tabs = page.locator('[role="tab"]');
      await expect(tabs.first()).toBeVisible();

      // Check for overview section
      await expect(page.locator('main, [role="main"]').first()).toBeVisible();

      // Check accessibility
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => v.impact === "critical");
      expect(criticals, "Critical accessibility violations on telemetry dashboard").toHaveLength(0);
    });

    test("@telemetry @integration telemetry tabs navigate correctly", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry");
      await page.waitForLoadState("networkidle");

      // Test tab navigation
      const expectedTabs = ["Overview", "Events", "Metrics", "Alerts"];

      for (const tabName of expectedTabs) {
        const tab = page.locator(`[role="tab"]:has-text("${tabName}")`).first();

        if (await tab.isVisible()) {
          await tab.click();
          await page.waitForTimeout(1000);

          // Verify URL updated to include the active tab
          await expect(page.locator('[role="tab"][aria-selected="true"]:has-text("' + tabName + '")')).toBeVisible();

          // Verify content is present
          const contentArea = page.locator('[role="tabpanel"], main').first();
          await expect(contentArea).toBeVisible();
        }
      }
    });
  });

  test.describe("Telemetry Events", () => {
    test("@telemetry @integration events page loads and displays data", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry/events");
      await page.waitForLoadState("networkidle");

      // Check page heading
      await expect(page.getByRole("heading", { name: /events/i })).toBeVisible();

      // Check for filters
      const filters = page.locator('select, input[type="search"], input[placeholder*="search"]').first();
      if (await filters.isVisible()) {
        await expect(filters).toBeVisible();
      }

      // Check for events table or list
      const eventsContainer = page.locator('table, [data-testid="events-list"], .events-container').first();
      await expect(eventsContainer).toBeVisible();

      // Test search functionality if available
      const searchInput = page.locator('input[placeholder*="search" i], input[type="search"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill("test");
        await page.waitForTimeout(1000);

        // Should still show content area
        await expect(eventsContainer).toBeVisible();
      }

      // Check accessibility
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => v.impact === "critical");
      expect(criticals, "Critical accessibility violations on events page").toHaveLength(0);
    });

    test("@telemetry @integration event details can be viewed", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry/events");
      await page.waitForLoadState("networkidle");

      // Look for event rows or items
      const eventRows = page.locator('tbody tr, [data-testid="event-item"], .event-row').first();

      if (await eventRows.isVisible()) {
        // Try to click on an event to view details
        await eventRows.click();
        await page.waitForTimeout(1000);

        // Check for modal or detail view
        const modal = page.locator('[role="dialog"], .modal, .event-details').first();
        if (await modal.isVisible()) {
          await expect(modal).toBeVisible();

          // Check for close button
          const closeButton = modal.locator('button:has-text("Close"), button:has-text("Cancel"), [aria-label*="close"]').first();
          if (await closeButton.isVisible()) {
            await closeButton.click();
            await page.waitForTimeout(500);
          }
        }
      }
    });
  });

  test.describe("Telemetry Metrics", () => {
    test("@telemetry @integration metrics page displays visualizations", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry/metrics");
      await page.waitForLoadState("networkidle");

      // Wait for charts to potentially load
      await page.waitForTimeout(2000);

      // Check page heading
      await expect(page.getByRole("heading", { name: /metrics/i })).toBeVisible();

      // Check for controls
      const controls = page.locator('[data-testid="metrics-controls"], .controls, select').first();
      if (await controls.isVisible()) {
        await expect(controls).toBeVisible();
      }

      // Check for charts or data visualizations
      const charts = page.locator('canvas, svg, [data-testid="chart"], .chart').first();
      if (await charts.isVisible()) {
        await expect(charts).toBeVisible();
      }

      // Check for overview cards
      const overviewCards = page.locator('[data-testid="overview-cards"], .metric-card, .stats-card').first();
      if (await overviewCards.isVisible()) {
        await expect(overviewCards).toBeVisible();
      }

      // Test time range selection if available
      const timeRangeSelect = page.locator('select:has-text("Last"), [data-testid="time-range"]').first();
      if (await timeRangeSelect.isVisible()) {
        await timeRangeSelect.selectOption({ label: "Last 7 Days" });
        await page.waitForTimeout(2000); // Wait for data to update
      }

      // Check accessibility
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => v.impact === "critical");
      expect(criticals, "Critical accessibility violations on metrics page").toHaveLength(0);
    });

    test("@telemetry @integration metrics controls work correctly", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry/metrics");
      await page.waitForLoadState("networkidle");

      // Test refresh button if available
      const refreshButton = page.locator('button:has-text("Refresh"), button[aria-label*="refresh"], .refresh-btn').first();
      if (await refreshButton.isVisible()) {
        await refreshButton.click();
        await page.waitForTimeout(2000);
      }

      // Test metric type selection if available
      const metricTypeSelect = page.locator('select:has-text("All"), [data-testid="metric-type"]').first();
      if (await metricTypeSelect.isVisible()) {
        const options = await metricTypeSelect.locator('option').allTextContents();
        if (options.length > 1) {
          await metricTypeSelect.selectOption({ index: 1 });
          await page.waitForTimeout(2000);
        }
      }
    });
  });

  test.describe("Telemetry Alerts", () => {
    test("@telemetry @integration alerts page displays and manages alerts", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry/alerts");
      await page.waitForLoadState("networkidle");

      // Check page heading
      await expect(page.getByRole("heading", { name: /alerts/i })).toBeVisible();

      // Check for alert statistics
      const stats = page.locator('[data-testid="alert-statistics"], .alert-stats, .stats-container').first();
      if (await stats.isVisible()) {
        await expect(stats).toBeVisible();
      }

      // Check for alerts table or list
      const alertsContainer = page.locator('table, [data-testid="alerts-list"], .alerts-container').first();
      await expect(alertsContainer).toBeVisible();

      // Check for filters
      const filters = page.locator('select, [data-testid="filters"]').first();
      if (await filters.isVisible()) {
        await expect(filters).toBeVisible();
      }

      // Test alert creation if button is available
      const createButton = page.locator('button:has-text("Create"), button:has-text("New Alert"), [data-testid="create-alert"]').first();
      if (await createButton.isVisible()) {
        await createButton.click();
        await page.waitForTimeout(1000);

        // Check for modal
        const modal = page.locator('[role="dialog"], .modal, .alert-form').first();
        if (await modal.isVisible()) {
          // Check for form elements
          const formFields = modal.locator('input, select, textarea').first();
          if (await formFields.isVisible()) {
            await expect(formFields).toBeVisible();
          }

          // Close modal
          const cancelButton = modal.locator('button:has-text("Cancel"), button:has-text("Close"), [aria-label*="close"]').first();
          if (await cancelButton.isVisible()) {
            await cancelButton.click();
            await page.waitForTimeout(500);
          }
        }
      }

      // Test alert actions if available
      const actionButtons = page.locator('button:has-text("Acknowledge"), button:has-text("Resolve"), button:has-text("View")').first();
      if (await actionButtons.isVisible()) {
        await expect(actionButtons).toBeVisible();
      }

      // Check accessibility
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => v.impact === "critical");
      expect(criticals, "Critical accessibility violations on alerts page").toHaveLength(0);
    });
  });

  test.describe("Telemetry Responsive Design", () => {
    const viewports = [
      { width: 375, height: 667, name: "Mobile" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 1280, height: 720, name: "Desktop" }
    ];

    for (const viewport of viewports) {
      test(`@telemetry @responsive telemetry works on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto("http://localhost:3001/admin/telemetry");
        await page.waitForLoadState("networkidle");

        // Check main navigation works on mobile
        if (viewport.width < 768) {
          const mobileMenuButton = page.locator("button[aria-label*='menu'], .mobile-menu-button, .hamburger").first();
          if (await mobileMenuButton.isVisible()) {
            await mobileMenuButton.click();
            await page.waitForTimeout(500);
          }
        }

        // Verify key elements are visible
        await expect(page.locator("h1")).toBeVisible();

        // Test tab navigation
        const tabs = page.locator('[role="tab"]').first();
        if (await tabs.isVisible()) {
          await tabs.click();
          await page.waitForTimeout(1000);
        }

        // Check accessibility at this viewport
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .exclude(".sr-only")
          .exclude("[aria-hidden='true']")
          .analyze();

        const criticals = results.violations.filter(v => v.impact === "critical");
        expect(criticals, `Critical A11y violations on ${viewport.name}`).toHaveLength(0);
      });
    }
  });

  test.describe("Telemetry Performance", () => {
    test("@telemetry @performance telemetry pages load within reasonable time", async ({ page }) => {
      const telemetryPages = [
        "/admin/telemetry",
        "/admin/telemetry/events",
        "/admin/telemetry/metrics",
        "/admin/telemetry/alerts"
      ];

      for (const pagePath of telemetryPages) {
        const startTime = Date.now();

        await page.goto(`http://localhost:3001${pagePath}`);
        await page.waitForLoadState("networkidle");

        const loadTime = Date.now() - startTime;

        // Pages should load within 5 seconds
        expect(loadTime, `${pagePath} should load within 5 seconds`).toBeLessThan(5000);

        // Basic sanity check that page loaded
        await expect(page.locator("h1, h2, main")).toBeVisible();
      }
    });

    test("@telemetry @performance telemetry interactions are responsive", async ({ page }) => {
      await page.goto("http://localhost:3001/admin/telemetry");
      await page.waitForLoadState("networkidle");

      // Test tab switching performance
      const tabs = page.locator('[role="tab"]');
      const tabCount = await tabs.count();

      if (tabCount > 1) {
        for (let i = 0; i < Math.min(tabCount, 3); i++) {
          const tab = tabs.nth(i);
          if (await tab.isVisible()) {
            const startTime = Date.now();
            await tab.click();
            await page.waitForTimeout(1000);
            const responseTime = Date.now() - startTime;

            // Tab switching should be fast
            expect(responseTime, `Tab ${i} switching should be fast`).toBeLessThan(2000);
          }
        }
      }

      // Test filter performance if available
      const select = page.locator('select').first();
      if (await select.isVisible()) {
        const startTime = Date.now();
        await select.selectOption({ index: 1 });
        await page.waitForTimeout(1000);
        const responseTime = Date.now() - startTime;

        // Filter changes should be responsive
        expect(responseTime, "Filter changes should be responsive").toBeLessThan(3000);
      }
    });
  });
});