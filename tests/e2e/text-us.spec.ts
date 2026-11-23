/** "Text us a photo": phones open the texting app; computers get a QR code that does the same. */
import { site } from "@/content/site";
import { smsHref } from "@/lib/text-us";
import { expect, test } from "./fixtures";

test("every Text us button texts our number with the message filled in", async ({ page }) => {
  await page.goto("/contact");
  const links = page.locator("a[href^='sms:']");
  expect(await links.count()).toBeGreaterThan(0);
  for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(href).toBe(smsHref());
  }
  // The old texting service is gone; nothing should point to it.
  await expect(page.locator("a[href*='trustco']")).toHaveCount(0);
});

test("on a computer, Text us opens a QR code instead", async ({ page, isMobile }) => {
  test.skip(isMobile, "Phones open the texting app instead");
  await page.goto("/contact");
  await page.getByRole("link", { name: `Text ${site.textNumber}` }).click();
  const dialog = page.getByRole("dialog", { name: "Text us a photo" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img", { name: /QR code/ }).locator("svg")).toBeVisible();
  await expect(dialog.getByRole("link", { name: site.textNumber })).toHaveAttribute("href", smsHref());
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("on a phone, Text us goes straight to the texting app", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Computers get the QR code instead");
  await page.goto("/");
  const bar = page.getByRole("navigation", { name: "Quick actions" });
  const link = bar.getByRole("link", { name: "Text" });
  await expect(link).toHaveAttribute("href", smsHref());
  // Checked on window, after the site's own click handling has run. Then the test
  // stops the click, since a real phone would switch to its texting app here.
  const prevented = await link.evaluate((a) => {
    let blocked = true;
    window.addEventListener("click", (e) => { blocked = e.defaultPrevented; e.preventDefault(); }, { once: true });
    (a as HTMLAnchorElement).click();
    return blocked;
  });
  expect(prevented).toBe(false);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
