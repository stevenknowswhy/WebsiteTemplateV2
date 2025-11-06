import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
  });

  test("displays login form with accessible elements", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("shows validation for invalid email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show validation error
    await expect(page.locator("text=Invalid email address")).toBeVisible();
  });

  test("shows error for non-existent email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("nonexistent@forhem.com");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show error message
    await expect(page.locator("text=Invalid login credentials")).toBeVisible({ timeout: 5000 });
  });

  test("has accessible password reset flow", async ({ page }) => {
    await page.getByRole("link", { name: /forgot password/i }).click();

    // Should navigate to password reset page
    await expect(page).toHaveURL(/.*\/auth\/reset-password.*/);
    await expect(page.getByRole("heading", { name: /reset password/i })).toBeVisible();
  });

  test("supports keyboard navigation", async ({ page }) => {
    // Test tab order
    await page.keyboard.press("Tab");
    expect(await page.getByLabel(/email/i).evaluate(el => el === document.activeElement)).toBeTruthy();

    await page.keyboard.press("Tab");
    expect(await page.getByRole("button", { name: /sign in/i }).evaluate(el => el === document.activeElement)).toBeTruthy();

    await page.keyboard.press("Enter");
    // Should trigger form submission
    await expect(page.getByText(/please enter your email/i)).toBeVisible();
  });

  test("has proper ARIA attributes", async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required");
    await expect(emailInput).toHaveAttribute("autocomplete", "email");
  });

  test("shows loading state during form submission", async ({ page }) => {
    await page.route("**/auth/v1/**", async route => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });

    await page.getByLabel(/email/i).fill("test@forhem.com");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show loading state
    await expect(page.getByRole("button", { name: /loading/i })).toBeVisible();
  });

  test("handles network errors gracefully", async ({ page }) => {
    // Simulate network error
    await page.route("**/auth/v1/**", route => route.abort("failed"));

    await page.getByLabel(/email/i).fill("test@forhem.com");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should show error message
    await expect(page.locator("text=Network error")).toBeVisible({ timeout: 5000 });
  });

  test("maintains accessibility when displaying errors", async ({ page }) => {
    // Trigger validation error
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check that error messages have proper ARIA attributes
    const errorElement = page.locator("text=please enter your email/i");
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveAttribute("role", "alert");
  });

  test("redirects authenticated users", async ({ page }) => {
    // Simulate authenticated state (you might need to adjust this based on your auth implementation)
    await page.evaluate(() => {
      localStorage.setItem("supabase.auth.token", "fake-token");
    });

    await page.goto("/auth/login");

    // Should redirect to dashboard or home
    await expect(page).toHaveURL(/.*(dashboard|home).*/);
  });
});