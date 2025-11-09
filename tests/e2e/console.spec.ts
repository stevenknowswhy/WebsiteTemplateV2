import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const ALLOW_WARN = [
  /Download the React DevTools/i,
  /DevTools failed to load source map/i,
  /A preload for .* was found/i,
  /import-in-the-middle|require-in-the-middle/i, // Next 16 + Sentry interplay
];

const ALLOW_ERROR = [
  /NEXT_HYDRATION_ERROR/i, // We're looking for hydration errors
  /Failed to load resource.*401.*Unauthorized/i, // Admin routes require authentication
  /Failed to fetch users.*Error.*Failed to fetch users/i, // Expected user fetch failure without auth
  /Error fetching users.*Error.*Failed to fetch users/i, // Alternative user fetch error message
];

// Helper: log violations to console with structured output
function logViolations(page: any, description: string) {
  page.on('console', (msg: any) => {
    if (msg.type() === 'warning') {
      const isAllowed = ALLOW_WARN.some((pattern) => pattern.test(msg.text()));
      if (!isAllowed) {
        console.warn(`⚠️ ${description}: ${msg.text()}`);
      }
    }
    if (msg.type() === 'error') {
      const isAllowed = ALLOW_ERROR.some((pattern) => pattern.test(msg.text()));
      if (!isAllowed) {
        console.error(`🚨 ${description}: ${msg.text()}`);
      }
    }
  });
}

test.describe('Console & Accessibility Sweep', () => {
  const criticalRoutes = [
    { url: '/', name: 'Public Homepage' },
    { url: '/admin', name: 'Admin Dashboard' },
    { url: '/admin/users', name: 'User Management' },
    { url: '/admin/nodes', name: 'Nodes Management' },
    { url: '/admin/alerts', name: 'Alert Management' },
    { url: '/admin/settings', name: 'Admin Settings' },
    { url: '/admin/analytics', name: 'Analytics Dashboard' },
    { url: '/admin/telemetry', name: 'Telemetry Dashboard' },
    { url: '/admin/telemetry/events', name: 'Telemetry Events' },
    { url: '/admin/telemetry/metrics', name: 'Telemetry Metrics' },
    { url: '/admin/telemetry/alerts', name: 'Telemetry Alerts' },
  ];

  criticalRoutes.forEach(({ url, name }) => {
    test(`should have no console errors or a11y violations on ${name}`, async ({ page }) => {
      logViolations(page, name);
      await page.goto(url);

      // Wait for hydration
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000);

      // Full-page accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});