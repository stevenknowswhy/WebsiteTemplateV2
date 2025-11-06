import { test, expect } from "@playwright/test";

test("@smoke loads home and privacy", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Home/i);
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
});