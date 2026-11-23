import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { smsHref, TEXT_MESSAGE, textNumberE164 } from "@/lib/text-us";

describe("Text us a photo", () => {
  it("texts the business number", () => {
    expect(textNumberE164).toMatch(/^\+1\d{10}$/);
    expect(textNumberE164.slice(2)).toBe(site.textNumber.replace(/\D/g, ""));
  });

  it("opens the texting app with the message filled in, in the form iPhone and Android both read", () => {
    const href = smsHref();
    expect(href.startsWith(`sms:${textNumberE164}?&body=`)).toBe(true);
    expect(decodeURIComponent(href.split("&body=")[1])).toBe(TEXT_MESSAGE);
  });

  it("asks for the details the office needs", () => {
    for (const line of ["photo", "Name:", "ZIP code:"]) expect(TEXT_MESSAGE).toContain(line);
  });
});
