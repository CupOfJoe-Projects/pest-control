import { defineConfig } from "vitest/config";

// Unit tests: plain logic and content checks, no browser. Browser tests live in
// tests/e2e and run with Playwright (npm run test:e2e).
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    // Never let a test reach the real GoHighLevel account.
    env: { GHL_CONTACT_FORM_API_KEY: "", GHL_LOCATION_ID: "" },
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
