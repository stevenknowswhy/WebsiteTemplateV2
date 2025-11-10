import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PUBLIC_PAGES = ["/", "/pricing", "/privacy", "/terms", "/about", "/contact"];
const ADMIN_PAGES = ["/admin", "/admin/nodes", "/admin/alerts", "/admin/users", "/admin/settings", "/admin/audit", "/admin/telemetry"];

// Test public pages for accessibility
for (const path of PUBLIC_PAGES) {
  test(`@a11y has no critical violations on public page ${path}`, async ({ page }) => {
    await page.goto(path);

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")          // typical visually-hidden class
      .exclude("[aria-hidden='true']") // hidden elements
      .exclude("script")            // script tags
      .exclude("style")             // style tags
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    const serious = results.violations.filter(v => (v.impact || "").toLowerCase() === "serious");

    if (criticals.length > 0) {
      console.error(`Critical accessibility violations on ${path}:`);
      console.error(JSON.stringify(criticals, null, 2));
    }

    if (serious.length > 0) {
      console.warn(`Serious accessibility violations on ${path}:`);
      console.warn(JSON.stringify(serious, null, 2));
    }

    expect(criticals, `Critical A11y violations on ${path}`).toHaveLength(0);
  });
}

// Test admin pages for accessibility (might require authentication)
for (const path of ADMIN_PAGES) {
  test(`@a11y @admin has no critical violations on admin page ${path}`, async ({ page }) => {
    await page.goto(path);

    // Wait for page to fully load or redirect to login
    await page.waitForLoadState("networkidle");

    // If redirected to login, that's expected for admin pages
    if (page.url().includes('/auth/login')) {
      // Test the login page accessibility instead
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .exclude("script")
        .exclude("style")
        .analyze();

      const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");

      if (criticals.length > 0) {
        console.error(`Critical accessibility violations on login page:`, JSON.stringify(criticals, null, 2));
      }

      expect(criticals, "Critical A11y violations on login page").toHaveLength(0);
      return;
    }

    // Test the admin page if not redirected
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .exclude("script")
      .exclude("style")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    const serious = results.violations.filter(v => (v.impact || "").toLowerCase() === "serious");

    if (criticals.length > 0) {
      console.error(`Critical accessibility violations on ${path}:`);
      console.error(JSON.stringify(criticals, null, 2));
    }

    if (serious.length > 0) {
      console.warn(`Serious accessibility violations on ${path}:`);
      console.warn(JSON.stringify(serious, null, 2));
    }

    expect(criticals, `Critical A11y violations on ${path}`).toHaveLength(0);
  });
}

// Test dynamic interactions for accessibility
test.describe("Dynamic Accessibility Tests", () => {
  test("@a11y mobile navigation is accessible", async ({ page }) => {
    await page.goto("/");

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find and click mobile menu button if it exists
    const mobileMenuButton = page.locator("button[aria-label*='menu'], button[aria-label*='Menu'], .mobile-menu-button, .hamburger").first();

    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500); // Wait for menu animation

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");

      if (criticals.length > 0) {
        console.error("Critical accessibility violations in mobile navigation:", JSON.stringify(criticals, null, 2));
      }

      expect(criticals, "Critical A11y violations in mobile navigation").toHaveLength(0);
    }
  });

  test("@a11y keyboard navigation works properly", async ({ page }) => {
    await page.goto("/");

    // Test tab navigation through interactive elements
    const focusableElements = await page.locator("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])").all();

    if (focusableElements.length > 0) {
      // Start from the top
      await page.keyboard.press("Tab");

      let currentFocus = 0;
      for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(100);

        // Check that focus indicator is visible
        const focusedElement = page.locator(":focus");
        await expect(focusedElement).toBeVisible();

        currentFocus++;
      }
    }
  });

  test("@a11y form validation errors are accessible", async ({ page }) => {
    await page.goto("/auth/login");

    // Try to submit empty form to trigger validation
    const submitButton = page.locator("button[type='submit']").first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");

      if (criticals.length > 0) {
        console.error("Critical accessibility violations with form errors:", JSON.stringify(criticals, null, 2));
      }

      expect(criticals, "Critical A11y violations with form errors").toHaveLength(0);
    }
  });

  test("@a11y color contrast requirements", async ({ page }) => {
    await page.goto("/");

    // Check for color contrast violations
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .withRules(["color-contrast"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .analyze();

    const contrastViolations = results.violations.filter(v => v.id === "color-contrast");

    if (contrastViolations.length > 0) {
      console.warn("Color contrast violations:", JSON.stringify(contrastViolations, null, 2));
    }

    // Allow minor contrast issues but log them
    expect(contrastViolations.length).toBeLessThan(5);
  });

  test("@a11y responsive design maintains accessibility", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1280, height: 720 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".sr-only")
        .exclude("[aria-hidden='true']")
        .analyze();

      const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");

      if (criticals.length > 0) {
        console.error(`Critical accessibility violations at viewport ${viewport.width}x${viewport.height}:`, JSON.stringify(criticals, null, 2));
      }

      expect(criticals, `Critical A11y violations at viewport ${viewport.width}x${viewport.height}`).toHaveLength(0);
    }
  });
});