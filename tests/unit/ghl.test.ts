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

  /** A fake GHL. `existingId` is the contact already saved with the phone number, if any. */
  function fakeGhl(existingId: string | null = null) {
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url);
      if (u.includes("/contacts/search/duplicate")) return json({ contact: existingId ? { id: existingId } : null });
      if (u.endsWith("/contacts/upsert")) return json({ contact: { id: existingId ?? "c1" } });
      void init;
      return json({});
    });
    vi.stubGlobal("fetch", fetchMock);
    return () => (fetchMock.mock.calls as unknown as [string, RequestInit][]).map(([u, i]) => ({
      url: u,
      method: i?.method ?? "GET",
      body: i?.body ? JSON.parse(String(i.body)) : undefined,
      headers: i?.headers as Record<string, string>,
    }));
  }

  it("saves a new contact with their name, then adds tags and a note", async () => {
    const calls = fakeGhl(null);
    await expect(sendLeadToGhl(lead)).resolves.toBe(true);

    const all = calls();
    expect(all[0].url).toContain("/contacts/search/duplicate?locationId=loc-test&number=%2B18635550123");
    const upsert = all.find((c) => c.url.endsWith("/contacts/upsert"))!;
    expect(upsert.headers.Authorization).toBe("Bearer pit-test");
    expect(upsert.headers.Version).toBe("2021-07-28");
    expect(upsert.body).toMatchObject({
      locationId: "loc-test",
      firstName: "Jane",
      lastName: "Smith",
      phone: "+18635550123",
      postalCode: "33830",
    });
    expect(all.some((c) => c.method === "DELETE")).toBe(false);
    expect(all).toContainEqual(expect.objectContaining({ url: "https://services.leadconnectorhq.com/contacts/c1/tags", method: "POST" }));
    expect(all).toContainEqual(expect.objectContaining({ url: "https://services.leadconnectorhq.com/contacts/c1/notes", method: "POST" }));
  });

  it("keeps a returning contact's saved name and re-adds the trigger tag so workflows fire again", async () => {
    const calls = fakeGhl("old1");
    await expect(sendLeadToGhl(lead)).resolves.toBe(true);

    const all = calls();
    const upsert = all.find((c) => c.url.endsWith("/contacts/upsert"))!;
    expect(upsert.body).not.toHaveProperty("firstName");
    expect(upsert.body).not.toHaveProperty("lastName");
    const remove = all.findIndex((c) => c.method === "DELETE" && c.url.endsWith("/contacts/old1/tags"));
    const add = all.findIndex((c) => c.method === "POST" && c.url.endsWith("/contacts/old1/tags"));
    expect(remove).toBeGreaterThan(-1);
    expect(all[remove].body).toEqual({ tags: ["website lead"] });
    expect(add).toBeGreaterThan(remove);
  });

  it("still saves the lead, with the name, if the contact lookup fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL | Request) => {
        const u = String(url);
        if (u.includes("/contacts/search/duplicate")) return json({ message: "scope" }, 401);
        if (u.endsWith("/contacts/upsert")) return json({ contact: { id: "c1" } });
        return json({});
      }),
    );
    await expect(sendLeadToGhl(lead)).resolves.toBe(true);
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
        if (u.includes("/contacts/search/duplicate")) return json({ contact: null });
        if (u.endsWith("/contacts/upsert")) return json({ contact: { id: "c1" } });
        if (u.endsWith("/notes")) return json({}, 500);
        return json({});
      }),
    );
    await expect(sendLeadToGhl(lead)).resolves.toBe(true);
  });
});
