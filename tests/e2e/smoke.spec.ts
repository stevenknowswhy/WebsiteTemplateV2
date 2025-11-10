import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Smoke Tests", () => {
  test("@smoke homepage loads and is accessible", async ({ page }) => {
    await page.goto("/");

    // Check basic page elements
    await expect(page).toHaveTitle(/Forhem|Home/i);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();

    // Check accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude(".sr-only")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on homepage").toHaveLength(0);
  });

  test("@smoke privacy page loads correctly", async ({ page }) => {
    await page.goto("/privacy");

    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("@smoke terms page loads correctly", async ({ page }) => {
    await page.goto("/terms");

    await expect(page.getByRole("heading", { name: "Terms" })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("@smoke pricing page loads correctly", async ({ page }) => {
    await page.goto("/pricing");

    await expect(page.getByRole("heading", { name: /pricing/i })).toBeVisible();
  });

  test("@smoke about page loads correctly", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  });

  test("@smoke contact page loads and form is accessible", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();

    // Check contact form elements
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]');
    if (await nameInput.isVisible()) {
      await expect(nameInput).toBeVisible();
    }

    const emailInput = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i]');
    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeVisible();
    }

    const messageTextarea = page.locator('textarea[name="message"], textarea[placeholder*="message" i]');
    if (await messageTextarea.isVisible()) {
      await expect(messageTextarea).toBeVisible();
    }

    // Check form accessibility
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude(".sr-only")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on contact page").toHaveLength(0);
  });

  test("@smoke navigation works correctly", async ({ page }) => {
    await page.goto("/");

    // Test navigation links
    const navLinks = page.locator("nav a");
    const linkCount = await navLinks.count();

    if (linkCount > 0) {
      // Test first few navigation links
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute("href");

        if (href && href.startsWith("/")) {
          await link.click();
          await page.waitForLoadState("networkidle");

          // Should navigate successfully
          expect(page.url()).toContain(href);
        }
      }
    }
  });

  test("@smoke authentication pages load", async ({ page }) => {
    // Test login page
    await page.goto("/auth/login");

    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Test accessibility of login form
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude(".sr-only")
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    expect(criticals, "Critical A11y violations on login page").toHaveLength(0);
  });

  test("@smoke responsive design works on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.locator("h1")).toBeVisible();

    // Check mobile navigation
    const mobileMenuButton = page.locator("button[aria-label*='menu'], .mobile-menu-button").first();
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      const mobileMenu = page.locator('[role="navigation"], .mobile-menu');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test("@smoke admin panel redirects unauthenticated users", async ({ page }) => {
    await page.goto("/admin");

    // Should redirect to login
    await expect(page).toHaveURL(/.*\/auth\/login.*/);
  });

  test("@smoke error pages work correctly", async ({ page }) => {
    // Test 404 page
    const response = await page.goto("/non-existent-page");

    // Should show 404 page or redirect
    if (response && response.status() === 404) {
      await expect(page.locator("h1, h2")).toBeVisible();
    }
  });

  test("@smoke core functionality is fast", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test("@smoke no JavaScript errors on page load", async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Should not have JavaScript errors
    expect(errors).toHaveLength(0);
  });

  test("@smoke images load correctly", async ({ page }) => {
    await page.goto("/");

    // Wait for all images to load
    const images = page.locator("img");
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        await expect(image).toHaveAttribute("src");

        // Check if image loads (this is approximate)
        const naturalWidth = await image.evaluate(img => (img as HTMLImageElement).naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });

  test("@smoke external links work correctly", async ({ page }) => {
    await page.goto("/");

    // Find external links
    const externalLinks = page.locator("a[href^='http']").first();

    if (await externalLinks.isVisible()) {
      const href = await externalLinks.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});