import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests against a real production build (`next build` must run first;
 * `npm run test:e2e` does both). Covers what a content edit could break:
 * pages render on the server for SEO, the quote forms work, the chat widget
 * loads, links resolve, and nothing scrolls sideways on a phone.
 */
const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    // Claude cloud sessions ship Chrome and set CHROME_PATH; use it instead of downloading one.
    ...(process.env.CHROME_PATH && { launchOptions: { executablePath: process.env.CHROME_PATH } }),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // Phone width with Chromium, so only one browser needs installing.
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 60_000,
    // Blank GHL keys: tests must never create contacts in the real account.
    env: { GHL_CONTACT_FORM_API_KEY: "", GHL_LOCATION_ID: "" },
  },
});
