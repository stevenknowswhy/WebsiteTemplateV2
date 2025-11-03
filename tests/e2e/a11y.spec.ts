import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/pricing", "/privacy", "/terms"];

for (const path of PAGES) {
  test(`@a11y has no critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .exclude(".sr-only")          // typical visually-hidden class
      .analyze();

    const criticals = results.violations.filter(v => (v.impact || "").toLowerCase() === "critical");
    if (criticals.length) {
      console.log(JSON.stringify(criticals, null, 2));
    }
    expect(criticals, `Critical A11y violations on ${path}`).toHaveLength(0);
  });
}