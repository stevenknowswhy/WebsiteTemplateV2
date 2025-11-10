import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Admin Panel Accessibility Tests", () => {
  // Helper function to check accessibility with detailed reporting
  async function checkAccessibility(page: any, testName: string) {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")
      .exclude("[aria-hidden='true']")
      .exclude('[role="presentation"]')
      .analyze();

    // Group violations by impact
    const criticalViolations = results.violations.filter(v => v.impact === "critical");
    const seriousViolations = results.violations.filter(v => v.impact === "serious");
    const moderateViolations = results.violations.filter(v => v.impact === "moderate");
    const minorViolations = results.violations.filter(v => v.impact === "minor");

    // Log violations for debugging
    if (results.violations.length > 0) {
      console.log(`\n🔍 Accessibility violations found in ${testName}:`);
      results.violations.forEach(violation => {
        console.log(`  ❌ ${violation.impact?.toUpperCase()}: ${violation.description}`);
        console.log(`     Rule: ${violation.id}`);
        console.log(`     Help: ${violation.helpUrl}`);
        if (violation.nodes.length > 0) {
          console.log(`     Affected elements: ${violation.nodes.length}`);
          violation.nodes.slice(0, 3).forEach((node, index) => {
            console.log(`       ${index + 1}. ${node.html}`);
          });
        }
        console.log("");
      });
    }

    // Assert no critical or serious violations
    expect(criticalViolations, `Critical accessibility violations in ${testName}`).toHaveLength(0);
    expect(seriousViolations, `Serious accessibility violations in ${testName}`).toHaveLength(0);

    // Allow moderate violations but log them
    if (moderateViolations.length > 0) {
      console.log(`⚠️  ${moderateViolations.length} moderate accessibility violations in ${testName}`);
    }

    return results;
  }

  test.beforeEach(async ({ page }) => {
    // Simulate authentication for accessibility tests
    await page.addInitScript(() => {
      localStorage.setItem("supabase.auth.token", JSON.stringify({
        access_token: "fake-token",
        refresh_token: "fake-refresh-token",
        user: {
          id: "test-user-id",
          email: "admin@forhem.com",
          role: "admin",
          tenant_id: "test-tenant-id"
        }
      }));
    });
  });

  test.describe("Navigation and Layout", () => {
    test("@a11y @admin main navigation is accessible", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Check keyboard navigation
      await page.keyboard.press("Tab");
      await expect(page.locator(":focus")).toBeVisible();

      // Test navigation menu
      const nav = page.locator("nav").first();
      if (await nav.isVisible()) {
        await nav.focus();

        // Check for skip links
        const skipLinks = page.locator('a[href^="#"]').filter({ hasText: /skip/i });
        if (await skipLinks.count() > 0) {
          await expect(skipLinks.first()).toBeVisible();
        }
      }

      await checkAccessibility(page, "Main Navigation");
    });

    test("@a11y @admin responsive design maintains accessibility", async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: "Mobile" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 1280, height: 720, name: "Desktop" }
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto("/admin");
        await page.waitForLoadState("networkidle");

        // Check mobile menu accessibility
        if (viewport.width < 768) {
          const mobileMenuButton = page.locator("button[aria-label*='menu'], .mobile-menu-button").first();
          if (await mobileMenuButton.isVisible()) {
            await mobileMenuButton.click();
            await page.waitForTimeout(500);
          }
        }

        await checkAccessibility(page, `${viewport.name} Viewport`);
      }
    });
  });

  test.describe("Dashboard Accessibility", () => {
    test("@a11y @admin overview dashboard is accessible", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Test overview cards
      const overviewCards = page.locator('[data-testid="overview-cards"]').first();
      if (await overviewCards.isVisible()) {
        await overviewCards.focus();
      }

      // Test interactive elements
      const buttons = page.locator("button");
      const count = await buttons.count();
      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          await button.focus();
          await expect(button).toBeVisible();
        }
      }

      await checkAccessibility(page, "Overview Dashboard");
    });

    test("@a11y @admin charts and data visualizations are accessible", async ({ page }) => {
      await page.goto("/admin/telemetry/metrics");
      await page.waitForLoadState("networkidle");

      // Wait for charts to load
      await page.waitForTimeout(2000);

      // Check for chart accessibility features
      const charts = page.locator('[data-testid="metrics-charts"], canvas, svg');
      const chartCount = await charts.count();

      for (let i = 0; i < chartCount; i++) {
        const chart = charts.nth(i);
        if (await chart.isVisible()) {
          // Check for alternative text or data tables
          const chartContainer = chart.locator("..");
          const hasDataDescription = await chartContainer.locator('[aria-label], .sr-only, .visually-hidden').count() > 0;

          if (!hasDataDescription) {
            console.log(`⚠️  Chart ${i + 1} may lack accessibility description`);
          }
        }
      }

      await checkAccessibility(page, "Charts and Data Visualizations");
    });
  });

  test.describe("Tables and Data Management", () => {
    test("@a11y @admin data tables are accessible", async ({ page }) => {
      await page.goto("/admin/nodes");
      await page.waitForLoadState("networkidle");

      // Check table structure
      const tables = page.locator("table");
      const tableCount = await tables.count();

      for (let i = 0; i < tableCount; i++) {
        const table = tables.nth(i);
        if (await table.isVisible()) {
          // Check for proper table headers
          const headers = table.locator("th");
          const headerCount = await headers.count();
          expect(headerCount, `Table ${i + 1} should have headers`).toBeGreaterThan(0);

          // Check for scope attributes
          const scopeHeaders = table.locator("th[scope]");
          const scopeCount = await scopeHeaders.count();

          if (scopeCount === 0) {
            console.log(`⚠️  Table ${i + 1} headers may lack scope attributes`);
          }

          // Test keyboard navigation in table
          const firstRow = table.locator("tbody tr").first();
          if (await firstRow.isVisible()) {
            await firstRow.focus();
            await page.keyboard.press("ArrowDown");
            await page.waitForTimeout(100);
          }
        }
      }

      await checkAccessibility(page, "Data Tables");
    });

    test("@a11y @admin filters and search are accessible", async ({ page }) => {
      await page.goto("/admin/alerts");
      await page.waitForLoadState("networkidle");

      // Test filter controls
      const filters = page.locator('select, input[type="text"], input[type="search"]');
      const filterCount = await filters.count();

      for (let i = 0; i < Math.min(filterCount, 5); i++) {
        const filter = filters.nth(i);
        if (await filter.isVisible()) {
          // Check for labels
          const label = page.locator(`label[for="${await filter.getAttribute('id')}"]`);
          const hasLabel = await label.count() > 0 || await filter.getAttribute('aria-label') !== null;

          if (!hasLabel) {
            console.log(`⚠️  Filter ${i + 1} may lack proper labeling`);
          }

          // Test keyboard navigation
          await filter.focus();
          await expect(filter).toBeFocused();
        }
      }

      await checkAccessibility(page, "Filters and Search");
    });

    test("@a11y @admin pagination is accessible", async ({ page }) => {
      await page.goto("/admin/users");
      await page.waitForLoadState("networkidle");

      // Test pagination controls
      const pagination = page.locator('nav[aria-label*="pagination"], .pagination');
      if (await pagination.isVisible()) {
        const pageButtons = pagination.locator('button, a[href*="page"]');
        const buttonCount = await pageButtons.count();

        for (let i = 0; i < Math.min(buttonCount, 5); i++) {
          const button = pageButtons.nth(i);
          if (await button.isVisible()) {
            await button.focus();

            // Check for ARIA attributes
            const ariaLabel = await button.getAttribute('aria-label');
            const ariaCurrent = await button.getAttribute('aria-current');

            if (!ariaLabel && !ariaCurrent) {
              console.log(`⚠️  Pagination button ${i + 1} may lack ARIA labeling`);
            }
          }
        }
      }

      await checkAccessibility(page, "Pagination");
    });
  });

  test.describe("Forms and Input Controls", () => {
    test("@a11y @admin user management forms are accessible", async ({ page }) => {
      await page.goto("/admin/users");
      await page.waitForLoadState("networkidle");

      // Test user creation/editing forms
      const createButton = page.locator('button:has-text("Add User"), button:has-text("Create")').first();
      if (await createButton.isVisible()) {
        await createButton.click();
        await page.waitForTimeout(500);

        // Check form fields
        const form = page.locator('form').first();
        if (await form.isVisible()) {
          const inputs = form.locator('input, select, textarea');
          const inputCount = await inputs.count();

          for (let i = 0; i < inputCount; i++) {
            const input = inputs.nth(i);
            if (await input.isVisible()) {
              // Check for labels or aria-labels
              const id = await input.getAttribute('id');
              const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
              const hasAriaLabel = await input.getAttribute('aria-label') !== null;
              const hasAriaLabelledBy = await input.getAttribute('aria-labelledby') !== null;

              expect(hasLabel || hasAriaLabel || hasAriaLabelledBy,
                `Form field ${i + 1} should have proper labeling`).toBeTruthy();

              // Test required field indicators
              const isRequired = await input.getAttribute('required') !== null;
              if (isRequired) {
                const hasRequiredIndicator = await page.locator(`label[for="${id}"] .required, [aria-required="true"]`).count() > 0;
                if (!hasRequiredIndicator) {
                  console.log(`⚠️  Required field ${i + 1} may not be clearly indicated`);
                }
              }
            }
          }
        }
      }

      await checkAccessibility(page, "User Management Forms");
    });

    test("@a11y @admin settings forms are accessible", async ({ page }) => {
      await page.goto("/admin/settings");
      await page.waitForLoadState("networkidle");

      // Test tab navigation
      const tabs = page.locator('[role="tab"]');
      const tabCount = await tabs.count();

      for (let i = 0; i < Math.min(tabCount, 3); i++) {
        const tab = tabs.nth(i);
        if (await tab.isVisible()) {
          await tab.click();
          await page.waitForTimeout(500);

          // Check tab panel association
          const tabPanelId = await tab.getAttribute('aria-controls');
          if (tabPanelId) {
            const tabPanel = page.locator(`[role="tabpanel"][id="${tabPanelId}"]`);
            expect(await tabPanel.isVisible()).toBeTruthy();
          }
        }
      }

      await checkAccessibility(page, "Settings Forms");
    });
  });

  test.describe("Modal and Dialog Accessibility", () => {
    test("@a11y @admin modal dialogs are accessible", async ({ page }) => {
      await page.goto("/admin/alerts");
      await page.waitForLoadState("networkidle");

      // Find and open a modal
      const modalTrigger = page.locator('button:has-text("Create"), button:has-text("Edit")').first();
      if (await modalTrigger.isVisible()) {
        await modalTrigger.click();
        await page.waitForTimeout(500);

        // Check modal accessibility
        const modal = page.locator('[role="dialog"], .modal').first();
        if (await modal.isVisible()) {
          // Check for focus management
          await expect(modal.locator('button, input, select, textarea').first()).toBeFocused();

          // Check for close button
          const closeButton = modal.locator('button:has-text("Close"), button:has-text("Cancel"), [aria-label*="close"]').first();
          expect(await closeButton.isVisible()).toBeTruthy();

          // Check for overlay interaction prevention
          const overlay = page.locator('.modal-overlay, [role="dialog"] ~ div');
          if (await overlay.count() > 0) {
            // Try to interact with background (should not work)
            await overlay.click({ force: true });
            await expect(modal).toBeVisible();
          }

          // Test escape key
          await page.keyboard.press("Escape");
          await page.waitForTimeout(300);
        }
      }

      await checkAccessibility(page, "Modal Dialogs");
    });

    test("@a11y @admin confirmation dialogs are accessible", async ({ page }) => {
      await page.goto("/admin/alerts");
      await page.waitForLoadState("networkidle");

      // Find delete/resolve action
      const actionButton = page.locator('button:has-text("Delete"), button:has-text("Resolve")').first();
      if (await actionButton.isVisible()) {
        await actionButton.click();
        await page.waitForTimeout(500);

        // Check confirmation dialog
        const dialog = page.locator('[role="dialog"], .confirm-dialog').first();
        if (await dialog.isVisible()) {
          // Check for clear action description
          const hasDescriptiveText = await dialog.locator('h1, h2, p:has-text("Are you sure"), [aria-describedby]').count() > 0;
          expect(hasDescriptiveText, "Confirmation dialog should have descriptive text").toBeTruthy();

          // Check for clear action buttons
          const confirmButton = dialog.locator('button:has-text("Confirm"), button:has-text("Delete"), button[variant="destructive"]').first();
          const cancelButton = dialog.locator('button:has-text("Cancel"), button[variant="outline"]').first();

          expect(await confirmButton.isVisible()).toBeTruthy();
          expect(await cancelButton.isVisible()).toBeTruthy();

          // Test keyboard navigation
          await cancelButton.focus();
          await expect(cancelButton).toBeFocused();

          await page.keyboard.press("Escape");
          await page.waitForTimeout(300);
        }
      }

      await checkAccessibility(page, "Confirmation Dialogs");
    });
  });

  test.describe("Status Messages and Notifications", () => {
    test("@a11y @admin success and error messages are accessible", async ({ page }) => {
      await page.goto("/admin/settings");
      await page.waitForLoadState("networkidle");

      // Try to trigger a notification (this would need actual form submission)
      const saveButton = page.locator('button:has-text("Save"), button[type="submit"]').first();
      if (await saveButton.isVisible()) {
        // In a real test, you'd fill out the form properly
        await saveButton.click();
        await page.waitForTimeout(1000);

        // Check for notifications
        const notifications = page.locator('[role="alert"], .notification, .toast');
        const notificationCount = await notifications.count();

        for (let i = 0; i < notificationCount; i++) {
          const notification = notifications.nth(i);
          if (await notification.isVisible()) {
            // Check for proper ARIA role
            const role = await notification.getAttribute('role');
            const hasAriaLive = await notification.getAttribute('aria-live') !== null;

            expect(role === 'alert' || role === 'status' || hasAriaLive,
              "Notifications should have proper ARIA roles").toBeTruthy();

            // Check for auto-dismissal notification
            const autoClose = await notification.getAttribute('data-auto-close');
            if (autoClose) {
              console.log(`ℹ️  Notification ${i + 1} will auto-close after ${autoClose}ms`);
            }
          }
        }
      }

      await checkAccessibility(page, "Status Messages");
    });
  });

  test.describe("Color Contrast and Visual Accessibility", () => {
    test("@a11y @admin color contrast meets WCAG standards", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // This is a basic check - comprehensive color contrast testing
      // would require additional tools or manual verification

      // Check for high contrast mode support
      const prefersHighContrast = await page.evaluate(() => {
        const button = document.querySelector('button');
        if (button) {
          const styles = window.getComputedStyle(button);
          return {
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            fontSize: styles.fontSize
          };
        }
        return null;
      });

      if (prefersHighContrast) {
        console.log("🎨 Button styles for contrast checking:", prefersHighContrast);
      }

      // Check for text alternatives to color
      const elementsWithColorOnly = await page.locator('[style*="color"]:not([aria-label]):not([title])').count();
      if (elementsWithColorOnly > 0) {
        console.log(`⚠️  ${elementsWithColorOnly} elements may rely on color alone for information`);
      }

      await checkAccessibility(page, "Color Contrast");
    });

    test("@a11y @admin focus indicators are visible", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Test focus visibility
      const focusableElements = page.locator('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const elementCount = await focusableElements.count();

      for (let i = 0; i < Math.min(elementCount, 10); i++) {
        const element = focusableElements.nth(i);
        if (await element.isVisible()) {
          await element.focus();

          // Check for focus styles
          const focusStyles = await element.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              outline: styles.outline,
              outlineOffset: styles.outlineOffset,
              boxShadow: styles.boxShadow
            };
          });

          const hasVisibleFocus = focusStyles.outline !== 'none' ||
                                 focusStyles.boxShadow !== 'none' ||
                                 focusStyles.outlineOffset !== '0px';

          if (!hasVisibleFocus) {
            console.log(`⚠️  Element ${i + 1} may lack visible focus indicator`);
          }
        }
      }

      await checkAccessibility(page, "Focus Indicators");
    });
  });

  test.describe("Screen Reader Compatibility", () => {
    test("@a11y @admin content is properly structured for screen readers", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Check for proper heading structure
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();

      let previousLevel = 0;
      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        const level = parseInt(await heading.getAttribute('aria-level') ||
                              await heading.evaluate(el => el.tagName.charAt(1)));

        if (level > previousLevel + 1) {
          console.log(`⚠️  Heading level jump from ${previousLevel} to ${level} may be confusing`);
        }
        previousLevel = level;
      }

      // Check for landmark regions
      const landmarks = page.locator('main, nav, aside, section[aria-label], header, footer');
      const landmarkCount = await landmarks.count();

      if (landmarkCount === 0) {
        console.log("⚠️  Page may lack landmark regions for navigation");
      }

      // Check for skip links
      const skipLinks = page.locator('a[href^="#"]:has-text("skip"), .skip-link');
      const skipLinkCount = await skipLinks.count();

      if (skipLinkCount === 0) {
        console.log("⚠️  Page may lack skip links for keyboard navigation");
      }

      await checkAccessibility(page, "Screen Reader Structure");
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("@a11y @admin full keyboard navigation is possible", async ({ page }) => {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      // Test Tab navigation through the page
      let tabCount = 0;
      let maxTabs = 50; // Prevent infinite loops

      while (tabCount < maxTabs) {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(100);

        const focusedElement = page.locator(":focus");
        const isVisible = await focusedElement.isVisible();

        if (!isVisible) {
          console.log(`⚠️  Tab ${tabCount + 1}: Focused element is not visible`);
        }

        // Check if we've looped back to the start
        const firstFocusable = page.locator('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])').first();
        if (await focusedElement.getAttribute('id') === await firstFocusable.getAttribute('id') && tabCount > 0) {
          break;
        }

        tabCount++;
      }

      if (tabCount >= maxTabs) {
        console.log("⚠️  Tab navigation may be stuck in a loop or too many focusable elements");
      }

      // Test arrow key navigation in menus
      const menu = page.locator('[role="menu"], nav ul').first();
      if (await menu.isVisible()) {
        await menu.focus();

        // Try arrow key navigation
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(100);

        const focusedMenuItem = page.locator(":focus");
        expect(await focusedMenuItem.isVisible()).toBeTruthy();
      }

      await checkAccessibility(page, "Keyboard Navigation");
    });
  });
});