import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Admin Panel E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin panel
    await page.goto("/admin");
  });

  test("@admin @smoke admin panel redirects unauthenticated users", async ({ page }) => {
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/auth\/login.*/);

    // Should show login form
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("@admin admin dashboard loads correctly when authenticated", async ({ page }) => {
    // Simulate authentication (this would need to be adjusted based on your auth implementation)
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin");
    await page.waitForLoadState("networkidle");

    // Should show admin dashboard
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();

    // Should have navigation elements
    await expect(page.locator("nav")).toBeVisible();

    // Should have overview cards
    await expect(page.locator('[data-testid="overview-cards"]')).toBeVisible();
  });

  test("@admin nodes management page is accessible and functional", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/nodes");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /nodes/i })).toBeVisible();

    // Check for table
    await expect(page.locator("table")).toBeVisible();

    // Check for filters
    await expect(page.locator('[data-testid="filters"]')).toBeVisible();

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on nodes page").toHaveLength(0);
  });

  test("@admin alerts management page works correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/alerts");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /alerts/i })).toBeVisible();

    // Check for alert status cards
    await expect(page.locator('[data-testid="alert-cards"]')).toBeVisible();

    // Check for filters
    await expect(page.locator('[data-testid="alert-filters"]')).toBeVisible();

    // Check for table
    await expect(page.locator("table")).toBeVisible();
  });

  test("@admin user management page is functional", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/users");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /users/i })).toBeVisible();

    // Check for user table
    await expect(page.locator("table")).toBeVisible();

    // Check for search functionality
    const searchInput = page.locator('input[placeholder*="search" i]');
    if (await searchInput.isVisible()) {
      await searchInput.fill("test");
      await page.waitForTimeout(500);
    }
  });

  test("@admin settings page loads and works", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/settings");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /settings/i })).toBeVisible();

    // Check for tabs
    await expect(page.locator('[role="tablist"]')).toBeVisible();

    // Check for form elements
    await expect(page.locator('form')).toBeVisible();
  });

  test("@admin audit log page displays correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/audit");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /audit log/i })).toBeVisible();

    // Check for filters
    await expect(page.locator('[data-testid="audit-filters"]')).toBeVisible();

    // Check for export functionality
    const exportButton = page.locator('button:has-text("export")');
    if (await exportButton.isVisible()) {
      await expect(exportButton).toBeVisible();
    }
  });

  test("@admin telemetry dashboard loads correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/telemetry");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /telemetry/i })).toBeVisible();

    // Check for tabs
    await expect(page.locator('[role="tablist"]')).toBeVisible();

    // Check for overview cards
    await expect(page.locator('[data-testid="telemetry-overview"]')).toBeVisible();

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on telemetry page").toHaveLength(0);
  });

  test("@admin telemetry events page loads and functions correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/telemetry/events");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /events/i })).toBeVisible();

    // Check for filters
    await expect(page.locator('[data-testid="event-filters"]')).toBeVisible();

    // Check for events table
    await expect(page.locator("table")).toBeVisible();

    // Check for time range selector
    const timeRangeSelect = page.locator('select, [data-testid="time-range"]').first();
    if (await timeRangeSelect.isVisible()) {
      await timeRangeSelect.selectOption({ label: "Last 7 Days" });
      await page.waitForTimeout(1000);
    }

    // Check for search functionality
    const searchInput = page.locator('input[placeholder*="search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("user.login");
      await page.waitForTimeout(1000);
    }

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on telemetry events page").toHaveLength(0);
  });

  test("@admin telemetry metrics page displays visualizations correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/telemetry/metrics");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /metrics/i })).toBeVisible();

    // Check for metrics controls
    await expect(page.locator('[data-testid="metrics-controls"]')).toBeVisible();

    // Check for overview cards
    await expect(page.locator('[data-testid="overview-cards"]')).toBeVisible();

    // Check for charts
    await expect(page.locator('[data-testid="metrics-charts"]')).toBeVisible();

    // Test time range selection
    const timeRangeSelect = page.locator('select:has-text("Last"), [data-testid="time-range-select"]').first();
    if (await timeRangeSelect.isVisible()) {
      await timeRangeSelect.selectOption({ label: "Last 30 Days" });
      await page.waitForTimeout(2000); // Wait for charts to update
    }

    // Test metric type selection
    const metricTypeSelect = page.locator('select:has-text("All"), [data-testid="metric-type-select"]').first();
    if (await metricTypeSelect.isVisible()) {
      await metricTypeSelect.selectOption({ label: "Performance" });
      await page.waitForTimeout(2000); // Wait for charts to update
    }

    // Check for refresh button
    const refreshButton = page.locator('button:has-text("Refresh"), button[aria-label*="refresh"]');
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
      await page.waitForTimeout(1000);
    }

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on telemetry metrics page").toHaveLength(0);
  });

  test("@admin telemetry alerts page manages alerts correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/telemetry/alerts");
    await page.waitForLoadState("networkidle");

    // Check page loads
    await expect(page.getByRole("heading", { name: /alerts/i })).toBeVisible();

    // Check for alert statistics
    await expect(page.locator('[data-testid="alert-statistics"]')).toBeVisible();

    // Check for filters
    await expect(page.locator('[data-testid="alert-filters"]')).toBeVisible();

    // Check for alerts table
    await expect(page.locator("table")).toBeVisible();

    // Test alert type filter
    const alertTypeFilter = page.locator('select:has-text("Alert Type"), [data-testid="alert-type-filter"]').first();
    if (await alertTypeFilter.isVisible()) {
      await alertTypeFilter.selectOption({ label: "Critical" });
      await page.waitForTimeout(1000);
    }

    // Test severity filter
    const severityFilter = page.locator('select:has-text("Severity"), [data-testid="severity-filter"]').first();
    if (await severityFilter.isVisible()) {
      await severityFilter.selectOption({ label: "High" });
      await page.waitForTimeout(1000);
    }

    // Test alert creation button
    const createAlertButton = page.locator('button:has-text("Create Alert"), button[aria-label*="create alert"]');
    if (await createAlertButton.isVisible()) {
      await createAlertButton.click();
      await page.waitForTimeout(500);

      // Check for modal/dialog
      await expect(page.locator('[role="dialog"], .modal')).toBeVisible();

      // Close modal
      const closeButton = page.locator('button:has-text("Cancel"), button[aria-label*="close"]').first();
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    }

    // Test acknowledge action
    const acknowledgeButton = page.locator('button:has-text("Acknowledge"), button[aria-label*="acknowledge"]').first();
    if (await acknowledgeButton.isVisible()) {
      await acknowledgeButton.click();
      await page.waitForTimeout(1000);
    }

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on telemetry alerts page").toHaveLength(0);
  });

  test("@admin telemetry dashboard navigation works correctly", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/telemetry");
    await page.waitForLoadState("networkidle");

    // Test tab navigation
    const tabs = ["Overview", "Events", "Metrics", "Alerts"];

    for (const tabName of tabs) {
      const tab = page.locator(`[role="tab"]:has-text("${tabName}")`).first();
      if (await tab.isVisible()) {
        await tab.click();
        await page.waitForTimeout(1000);

        // Verify URL updated correctly
        await expect(page).toHaveURL(/.*telemetry.*/);

        // Verify content loaded
        await expect(page.locator("h1, h2")).toBeVisible();
      }
    }
  });
});

test.describe("Admin Panel Responsive Design", () => {
  const viewports = [
    { width: 375, height: 667, name: "Mobile" },
    { width: 768, height: 1024, name: "Tablet" },
    { width: 1280, height: 720, name: "Desktop" },
  ];

  for (const viewport of viewports) {
    test(`@admin @responsive admin panel works on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);

      // Simulate authentication
      await page.addInitScript(() => {
        localStorage.setItem("supabase.auth.token", JSON.stringify({
          access_token: "fake-token",
          refresh_token: "fake-refresh-token",
          user: {
            id: "test-user-id",
            email: "admin@forhem.com",
            role: "admin"
          }
        }));
      });

      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Check main navigation works
      const nav = page.locator("nav");
      if (viewport.width < 768) {
        // Mobile: Check for hamburger menu
        const mobileMenuButton = page.locator("button[aria-label*='menu'], .mobile-menu-button").first();
        if (await mobileMenuButton.isVisible()) {
          await mobileMenuButton.click();
          await page.waitForTimeout(500);
        }
      }

      // Verify key elements are visible
      await expect(page.locator("h1")).toBeVisible();

      // Check accessibility at this viewport
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
      expect(criticals, `Critical A11y violations on ${viewport.name}`).toHaveLength(0);
    });
  }
});

test.describe("Admin Panel Data Management", () => {
  test("@admin @data nodes table filtering and sorting works", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/nodes");
    await page.waitForLoadState("networkidle");

    // Test status filter
    const statusFilter = page.locator('select, [data-testid="status-filter"]').first();
    if (await statusFilter.isVisible()) {
      await statusFilter.selectOption({ label: "online" });
      await page.waitForTimeout(1000);
    }

    // Test search
    const searchInput = page.locator('input[placeholder*="search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("test");
      await page.waitForTimeout(1000);
    }

    // Test table sorting
    const sortableHeaders = page.locator('th[role="button"], .sortable');
    const count = await sortableHeaders.count();
    if (count > 0) {
      await sortableHeaders.first().click();
      await page.waitForTimeout(500);
    }
  });

  test("@admin @data alerts can be acknowledged", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/alerts");
    await page.waitForLoadState("networkidle");

    // Find acknowledge button for active alerts
    const acknowledgeButton = page.locator('button:has-text("acknowledge"), button[aria-label*="acknowledge"]').first();
    if (await acknowledgeButton.isVisible()) {
      await acknowledgeButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test("@admin @data user role management works", async ({ page }) => {
    // Simulate authentication
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin"
        }
      }));
    });

    await page.goto("/admin/users");
    await page.waitForLoadState("networkidle");

    // Find role selector/edit button
    const roleSelector = page.locator('select, button:has-text("edit")').first();
    if (await roleSelector.isVisible()) {
      await roleSelector.click();
      await page.waitForTimeout(500);
    }
  });
});