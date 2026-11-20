import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/quote-schema";

const full = { name: "Jane Smith", phone: "(863) 555-0123", pest: "Ants", zip: "33830", source: "form" };

describe("quote form validation", () => {
  it("accepts a complete contact form", () => {
    expect(quoteSchema.safeParse(full).success).toBe(true);
  });

  it("accepts the homepage quote bar without a name", () => {
    const r = quoteSchema.safeParse({ phone: "8635550123", pest: "Roaches", zip: "33801", source: "hero" });
    expect(r.success).toBe(true);
  });

  it("requires a name on the contact form", () => {
    const r = quoteSchema.safeParse({ ...full, name: "" });
    expect(r.success).toBe(false);
  });

  it.each(["8635550123", "(863) 555-0123", "863.555.0123", "+1 863 555 0123", "18635550123"])(
    "accepts phone %s",
    (phone) => expect(quoteSchema.safeParse({ ...full, phone }).success).toBe(true),
  );

  it.each(["555-0123", "86355501234", "", "phone"])("rejects phone %j", (phone) => {
    expect(quoteSchema.safeParse({ ...full, phone }).success).toBe(false);
  });

  it.each(["3383", "338300", "ABCDE", ""])("rejects ZIP %j", (zip) => {
    expect(quoteSchema.safeParse({ ...full, zip }).success).toBe(false);
  });

  it("requires a pest", () => {
    expect(quoteSchema.safeParse({ ...full, pest: "" }).success).toBe(false);
  });

  it("rejects a filled honeypot (bots)", () => {
    expect(quoteSchema.safeParse({ ...full, company: "Spam Inc" }).success).toBe(false);
  });
});
