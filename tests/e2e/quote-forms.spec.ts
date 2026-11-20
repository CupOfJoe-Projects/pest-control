/**
 * The two quote forms: the full form on /contact (and area pages) and the
 * short quote bar on the homepage. The browser's request to /api/quote is
 * captured here, so no lead is ever sent anywhere.
 */
import type { Page, Request } from "@playwright/test";
import { expect, test } from "./fixtures";

async function captureQuote(page: Page, reply: { status: number; body: object } = { status: 200, body: { ok: true } }) {
  const sent: Record<string, unknown>[] = [];
  await page.route("**/api/quote", async (route) => {
    sent.push(JSON.parse((route.request() as Request).postData() ?? "{}"));
    await route.fulfill({ status: reply.status, json: reply.body });
  });
  return sent;
}

test.describe("contact page form", () => {
  test("sends a complete request and thanks the visitor", async ({ page }) => {
    const sent = await captureQuote(page);
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Smith");
    await page.getByLabel(/phone/i).first().fill("863-555-0123");
    await page.getByLabel(/zip/i).first().fill("33830");
    await page.getByLabel("What pest are you seeing?").selectOption("Ants");
    await page.getByRole("button", { name: "Claim my free quote" }).last().click();

    await expect(page.getByRole("status")).toContainText("Thanks, Jane!");
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ name: "Jane Smith", zip: "33830", pest: "Ants", source: "form", page: "/contact" });
  });

  test("shows errors and sends nothing when fields are missing", async ({ page }) => {
    const sent = await captureQuote(page);
    await page.goto("/contact");
    await page.getByRole("button", { name: "Claim my free quote" }).last().click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    expect(sent).toHaveLength(0);
  });

  test("asks the visitor to call if the lead cannot be saved", async ({ page }) => {
    await captureQuote(page, { status: 502, body: { ok: false } });
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Smith");
    await page.getByLabel(/phone/i).first().fill("863-555-0123");
    await page.getByLabel(/zip/i).first().fill("33830");
    await page.getByLabel("What pest are you seeing?").selectOption("Ants");
    await page.getByRole("button", { name: "Claim my free quote" }).last().click();
    // Scoped to the form: Next.js also has an (empty) role="alert" route announcer.
    await expect(page.locator("#quote form").getByRole("alert")).toContainText("call us");
  });
});

test.describe("homepage quote bar", () => {
  test("sends pest, ZIP, and phone", async ({ page }) => {
    const sent = await captureQuote(page);
    await page.goto("/");
    const form = page.locator("form", { has: page.locator("#starter-title") });
    await form.getByText("Roaches", { exact: true }).click();
    await form.locator("#starter-zip").fill("33801");
    await form.locator("#starter-phone").fill("8635550123");
    await form.getByRole("button", { name: "Claim my free quote" }).click();

    await expect(page.getByRole("status")).toBeVisible();
    expect(sent[0]).toMatchObject({ pest: "Roaches", zip: "33801", source: "hero" });
  });

  test("a coupon's Claim button tags the request with that service", async ({ page }) => {
    const sent = await captureQuote(page);
    await page.goto("/");
    await page.getByRole("tab", { name: "Rodents" }).click();
    const panel = page.getByRole("tabpanel", { name: "Rodents" });
    await panel.getByRole("article", { name: "Rat Control", exact: true }).getByRole("link", { name: /Claim This Coupon/ }).click();

    const form = page.locator("form", { has: page.locator("#starter-title") });
    await expect(form.getByText("Coupon: Rat Control")).toBeVisible();
    await form.getByText("Rodents", { exact: true }).click();
    await form.locator("#starter-zip").fill("33830");
    await form.locator("#starter-phone").fill("8635550123");
    await form.getByRole("button", { name: "Claim my free quote" }).click();
    await expect(page.getByRole("status")).toBeVisible();
    expect(sent[0]).toMatchObject({ service: "Rat Control", source: "hero" });
  });
});

test("the quote API rejects bad input (real server, nothing sent to GHL)", async ({ request }) => {
  const res = await request.post("/api/quote", { data: { phone: "12", pest: "", zip: "x" } });
  expect(res.status()).toBe(400);
  expect((await res.json()).fieldErrors).toHaveProperty("phone");
});
