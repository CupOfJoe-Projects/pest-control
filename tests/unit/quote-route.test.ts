import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/quote/route";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

const valid = {
  name: "Jane Smith",
  phone: "8635550123",
  pest: "Ants",
  zip: "33830",
  source: "form",
  service: "Rat Control",
  page: "/pests/rats",
};

describe("POST /api/quote", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock = vi.fn(async (url: string | URL | Request) =>
      Response.json(
        String(url).includes("/contacts/search/duplicate")
          ? { contact: null }
          : String(url).endsWith("/contacts/upsert") ? { contact: { id: "c1" } } : {},
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
  });

  it("rejects bad JSON", async () => {
    expect((await post("not json")).status).toBe(400);
  });

  it("returns field errors for an incomplete form", async () => {
    const res = await post({ phone: "12", pest: "", zip: "x", source: "form" });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(Object.keys(body.fieldErrors)).toEqual(expect.arrayContaining(["phone", "pest", "zip", "name"]));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("quietly accepts bots that fill the honeypot, without sending them to GHL", async () => {
    vi.stubEnv("GHL_CONTACT_FORM_API_KEY", "pit-test");
    vi.stubEnv("GHL_LOCATION_ID", "loc-test");
    const res = await post({ ...valid, company: "Spam Inc" });
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("only logs the lead when GHL keys are not set", async () => {
    const res = await post(valid);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the lead to GHL with tags and a note", async () => {
    vi.stubEnv("GHL_CONTACT_FORM_API_KEY", "pit-test");
    vi.stubEnv("GHL_LOCATION_ID", "loc-test");
    const res = await post(valid);
    expect(res.status).toBe(200);

    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    const bodyFor = (suffix: string) => JSON.parse(String(calls.find(([u]) => u.endsWith(suffix))![1].body));
    expect(bodyFor("/tags").tags).toEqual(
      expect.arrayContaining(["website lead", "website: quote form", "coupon: rat control"]),
    );
    const note: string = bodyFor("/notes").body;
    expect(note).toMatch(/^Name: \S+/m); // Kept in the note, since a returning contact's saved name is not changed.
    expect(note).toContain("Pest: Ants");
    expect(note).toContain("Coupon: Rat Control");
    expect(note).toContain("Page: /pests/rats");
  });

  it("tags leads from outside Polk County", async () => {
    vi.stubEnv("GHL_CONTACT_FORM_API_KEY", "pit-test");
    vi.stubEnv("GHL_LOCATION_ID", "loc-test");
    await post({ ...valid, zip: "32801" });
    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][];
    const tags = JSON.parse(String(calls.find(([u]) => u.endsWith("/tags"))![1].body)).tags;
    expect(tags).toContain("outside polk county");
  });

  it("returns 502 so the visitor is asked to call when GHL fails", async () => {
    vi.stubEnv("GHL_CONTACT_FORM_API_KEY", "pit-test");
    vi.stubEnv("GHL_LOCATION_ID", "loc-test");
    fetchMock.mockImplementation(async () => new Response("nope", { status: 500 }));
    expect((await post(valid)).status).toBe(502);
  });
});
