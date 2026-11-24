import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context, baseURL }) => {
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort(),
  );
});

test("hydrates the home, changes language and navigates through the site", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (!response.ok() && new URL(response.url()).pathname.startsWith("/assets/")) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("button", { name: "PT", exact: true })).toBeVisible();
  await page.getByRole("navigation").getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("navigation").getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main a[href^='/blog/']").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("opens the mobile menu and follows a link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle Menu" }).click();
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
