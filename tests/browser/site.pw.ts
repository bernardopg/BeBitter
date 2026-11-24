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

test("renders an article with its schema and tracks a related reading", async ({ page }) => {
  await page.goto("/blog/playwright-github-actions-testar-build-react/");
  const article = page.getByRole("article");
  await expect(page.getByRole("heading", { name: /Playwright no GitHub Actions/ })).toBeVisible();
  await expect(article.getByText("Do pull request ao artefato de produção")).toBeVisible();
  await expect(article.getByRole("link", { name: "Playwright: Trace Viewer" })).toHaveAttribute(
    "href", "https://playwright.dev/docs/trace-viewer",
  );
  await expect.poll(() => page.locator('head script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts
      .flatMap((script) => {
        const schema = JSON.parse(script.textContent || "{}");
        return schema["@graph"] ?? [schema];
      })
      .find((schema) => schema["@type"] === "BlogPosting")?.image?.length,
  )).toBe(3);

  const events: unknown[] = [];
  await page.exposeFunction("recordBlogEvent", (payload: unknown) => events.push(payload));
  await page.evaluate(() => {
    const record = (window as Window & { recordBlogEvent?: (payload: unknown) => void }).recordBlogEvent;
    window.gtag = (command, event, payload) => {
      if (command === "event" && event === "blog_reference_click") record?.(payload);
    };
  });
  await article.getByRole("link", { name: /WCAG 2\.2 na prática/ }).click();
  await expect(page).toHaveURL(/\/blog\/wcag-22-acessibilidade-checklist-produto\/$/);
  await expect.poll(() => events).toContainEqual(expect.objectContaining({
    event_label: "playwright-github-actions-testar-build-react",
    reference_kind: "related",
    reference_target: "wcag-22-acessibilidade-checklist-produto",
  }));
});
