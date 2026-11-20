import { beforeEach, describe, expect, it, vi } from "vitest";
import { ghlConfigured, sendLeadToGhl, type GhlLead } from "@/lib/ghl";

const lead: GhlLead = {
  firstName: "Jane",
  lastName: "Smith",
  phone: "(863) 555-0123",
  zip: "33830",
  source: "Website: quote form",
  tags: ["website lead"],
  note: "Pest: Ants",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("GoHighLevel client", () => {
  beforeEach(() => {
    vi.stubEnv("GHL_CONTACT_FORM_API_KEY", "pit-test");
    vi.stubEnv("GHL_LOCATION_ID", "loc-test");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("is only configured when both env vars are set", () => {
    expect(ghlConfigured()).toBe(true);
    vi.stubEnv("GHL_LOCATION_ID", "");
    expect(ghlConfigured()).toBe(false);
  });

  it("upserts the contact, then adds tags and a note", async () => {
    const fetchMock = vi.fn(async (url: string | URL | Request) =>
      String(url).endsWith("/contacts/upsert") ? json({ contact: { id: "c1" } }) : json({}),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendLeadToGhl(lead)).resolves.toBe(true);

    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    const [upsertUrl, upsertInit] = calls[0];
    expect(upsertUrl).toBe("https://services.leadconnectorhq.com/contacts/upsert");
    const headers = upsertInit.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer pit-test");
    expect(headers.Version).toBe("2021-07-28");
    expect(JSON.parse(String(upsertInit.body))).toMatchObject({
      locationId: "loc-test",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+18635550123",
      postalCode: "33830",
    });

    const urls = calls.map(([u]) => u);
    expect(urls).toContain("https://services.leadconnectorhq.com/contacts/c1/tags");
    expect(urls).toContain("https://services.leadconnectorhq.com/contacts/c1/notes");
  });

  it("reports failure when GHL rejects the contact", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => json({ message: "Invalid token" }, 401)));
    await expect(sendLeadToGhl(lead)).resolves.toBe(false);
  });

  it("reports failure when GHL is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("network down"))));
    await expect(sendLeadToGhl(lead)).resolves.toBe(false);
  });

  it("still counts the lead as saved if only the note fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL | Request) => {
        const u = String(url);
        if (u.endsWith("/contacts/upsert")) return json({ contact: { id: "c1" } });
        if (u.endsWith("/notes")) return json({}, 500);
        return json({});
      }),
    );
    await expect(sendLeadToGhl(lead)).resolves.toBe(true);
  });
});
