import { describe, expect, it } from "vitest";
import { isOfficeOpen, nextOpenLabel } from "@/lib/office-hours";
import { isPolkZip } from "@/lib/polk-zips";

// Times are UTC. Florida is UTC-5 in November.
const at = (iso: string) => new Date(iso);

describe("office hours (Florida time)", () => {
  it("is open on a weekday at 10 AM", () => {
    expect(isOfficeOpen(at("2026-11-18T15:00:00Z"))).toBe(true); // Wed 10 AM
  });

  it("is open until 6 PM, closed before 8 AM, after 6 PM, and on weekends", () => {
    expect(isOfficeOpen(at("2026-11-18T22:30:00Z"))).toBe(true); // Wed 5:30 PM
    expect(isOfficeOpen(at("2026-11-18T12:30:00Z"))).toBe(false); // Wed 7:30 AM
    expect(isOfficeOpen(at("2026-11-18T23:00:00Z"))).toBe(false); // Wed 6 PM
    expect(isOfficeOpen(at("2026-11-21T15:00:00Z"))).toBe(false); // Sat 10 AM
  });

  it("says when the office opens next", () => {
    expect(nextOpenLabel(at("2026-11-18T11:00:00Z"))).toBe("this morning"); // Wed 6 AM
    expect(nextOpenLabel(at("2026-11-18T23:00:00Z"))).toBe("tomorrow morning"); // Wed 6 PM
    expect(nextOpenLabel(at("2026-11-20T23:00:00Z"))).toBe("Monday morning"); // Fri 6 PM
  });
});

describe("Polk County ZIPs", () => {
  it("knows local ZIPs", () => {
    expect(isPolkZip("33830")).toBe(true); // Bartow
    expect(isPolkZip(" 33801 ")).toBe(true); // Lakeland
  });
  it("flags ZIPs outside the county", () => {
    expect(isPolkZip("32801")).toBe(false); // Orlando
  });
});
