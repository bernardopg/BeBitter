import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  testMatch: "*.pw.ts",
  workers: 1,
  use: { baseURL: "http://127.0.0.1:4180", trace: "retain-on-failure" },
  webServer: {
    command: "pnpm preview --host 127.0.0.1 --port 4180 --strictPort",
    url: "http://127.0.0.1:4180",
  },
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
});
