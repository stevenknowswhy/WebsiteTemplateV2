import { test, expect } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("@performance homepage loads within performance budget", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Check performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };
    });

    // Performance budgets
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(2000); // 2s
    expect(performanceMetrics.domContentLoaded).toBeLessThan(1500); // 1.5s
    expect(performanceMetrics.loadComplete).toBeLessThan(3000); // 3s
  });

  test("@performance admin dashboard loads efficiently", async ({ page }) => {
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

    const startTime = Date.now();

    await page.goto("/admin");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Admin dashboard should load within 4 seconds (may have more data)
    expect(loadTime).toBeLessThan(4000);

    // Check that main content is visible quickly
    await expect(page.locator("h1")).toBeVisible({ timeout: 3000 });
  });

  test("@performance telemetry dashboard loads charts efficiently", async ({ page }) => {
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

    // Wait for charts to load
    await page.waitForSelector('[data-testid="telemetry-overview"], .recharts-wrapper', { timeout: 5000 });

    // Check that charts render within reasonable time
    const chartLoadTime = await page.evaluate(() => {
      return new Promise((resolve) => {
        const startTime = Date.now();
        const checkChart = () => {
          const charts = document.querySelectorAll('.recharts-wrapper, [data-testid="telemetry-overview"]');
          if (charts.length > 0) {
            resolve(Date.now() - startTime);
          } else {
            setTimeout(checkChart, 100);
          }
        };
        checkChart();
      });
    });

    // Charts should load within 3 seconds
    expect(chartLoadTime).toBeLessThan(3000);
  });

  test("@performance mobile performance is acceptable", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Mobile should load within 4 seconds (slower due to network conditions)
    expect(loadTime).toBeLessThan(4000);

    // Check mobile-specific elements
    const mobileMenuButton = page.locator("button[aria-label*='menu'], .mobile-menu-button").first();
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      // Mobile menu should be responsive
      const mobileMenu = page.locator('[role="navigation"], .mobile-menu');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test("@performance large data tables handle pagination efficiently", async ({ page }) => {
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

    // Test pagination performance
    const paginationButtons = page.locator('button[aria-label*="page"], .pagination button');
    const count = await paginationButtons.count();

    if (count > 1) {
      // Click on next page
      const startTime = Date.now();
      await paginationButtons.nth(1).click();
      await page.waitForLoadState("networkidle");

      const paginationTime = Date.now() - startTime;

      // Pagination should be fast (under 2 seconds)
      expect(paginationTime).toBeLessThan(2000);
    }
  });

  test("@performance search functionality is responsive", async ({ page }) => {
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

    // Test search performance
    const searchInput = page.locator('input[placeholder*="search" i]').first();

    if (await searchInput.isVisible()) {
      const startTime = Date.now();

      await searchInput.fill("test");
      await page.waitForTimeout(1000); // Wait for debounce

      const searchTime = Date.now() - startTime;

      // Search should be responsive (under 1.5 seconds)
      expect(searchTime).toBeLessThan(1500);
    }
  });

  test("@performance filter operations are efficient", async ({ page }) => {
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

    // Test filter performance
    const filterSelect = page.locator('select').first();

    if (await filterSelect.isVisible()) {
      const startTime = Date.now();

      await filterSelect.selectOption({ label: "critical" });
      await page.waitForTimeout(1000);

      const filterTime = Date.now() - startTime;

      // Filtering should be fast (under 2 seconds)
      expect(filterTime).toBeLessThan(2000);
    }
  });

  test("@performance memory usage stays reasonable", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check memory usage
    const memoryUsage = await page.evaluate(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        };
      }
      return null;
    });

    if (memoryUsage) {
      // Memory usage should be reasonable (under 100MB for initial load)
      expect(memoryUsage.used).toBeLessThan(100);

      // Should not exceed 10% of available memory
      const memoryPercentage = (memoryUsage.used / memoryUsage.limit) * 100;
      expect(memoryPercentage).toBeLessThan(10);
    }
  });

  test("@performance network requests are optimized", async ({ page }) => {
    const requests: Array<{ url: string; method: string; status: number }> = [];

    page.on('response', response => {
      requests.push({
        url: response.url(),
        method: response.request().method(),
        status: response.status(),
      });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Analyze requests
    const totalRequests = requests.length;
    const successfulRequests = requests.filter(r => r.status >= 200 && r.status < 400).length;
    const cacheableRequests = requests.filter(r =>
      r.url.includes('.js') || r.url.includes('.css') || r.url.includes('.png') || r.url.includes('.jpg')
    ).length;

    // Should not make too many requests
    expect(totalRequests).toBeLessThan(50);

    // Most requests should be successful
    const successRate = (successfulRequests / totalRequests) * 100;
    expect(successRate).toBeGreaterThan(90);

    // Should have proper caching headers for static assets
    // Note: This would require checking response headers which varies by environment
  });

  test("@performance Core Web Vitals are within thresholds", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Wait for page to fully render
    await page.waitForTimeout(2000);

    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Create a simple observer for performance metrics
        const vitals: any = {};

        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.startTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID) - approximate measurement
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
              vitals.fid = (entries[0] as any).processingStart - entries[0].startTime;
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            vitals.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Give some time for metrics to be collected
        setTimeout(() => resolve(vitals), 3000);
      });
    });

    // Check Core Web Vitals thresholds
    if ((webVitals as any).lcp) {
      expect((webVitals as any).lcp).toBeLessThan(2500); // LCP should be under 2.5s
    }

    if ((webVitals as any).fid) {
      expect((webVitals as any).fid).toBeLessThan(100); // FID should be under 100ms
    }

    if ((webVitals as any).cls) {
      expect((webVitals as any).cls).toBeLessThan(0.1); // CLS should be under 0.1
    }
  });
});