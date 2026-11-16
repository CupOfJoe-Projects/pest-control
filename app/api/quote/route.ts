import { z } from "zod";
import { quoteSchema } from "@/lib/quote-schema";
import { isPolkZip } from "@/lib/polk-zips";
import { isOfficeOpen } from "@/lib/office-hours";
import { OFFER, SHOW_OFFER } from "@/content/site";

/**
 * Sends the lead to GoHighLevel through an inbound webhook. GHL then texts and
 * emails the sales team and texts the customer a confirmation (set up inside
 * GHL). Without GHL_WEBHOOK_URL the lead is only logged.
 */
async function sendToGhl(lead: Record<string, unknown>) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) return true;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[quote] GHL webhook failed", res.status);
    return res.ok;
  } catch (error) {
    console.error("[quote] GHL webhook error", error);
    return false;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = quoteSchema.safeParse(body);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    // A filled honeypot means a bot. Pretend it worked so it moves on.
    if (fieldErrors.company) return Response.json({ ok: true });
    return Response.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const { name, phone, pest, zip, message, plan, source, page } = result.data;
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lead = {
    name,
    firstName: firstName ?? "",
    lastName: rest.join(" "),
    phone,
    pest,
    zip,
    message,
    plan: plan ?? "",
    source: source === "hero" ? "Website: homepage quote bar" : "Website: quote form",
    page,
    offer: SHOW_OFFER ? OFFER.headline : "",
    // Flags for the office. Out of area leads are still accepted.
    outsidePolkCounty: !isPolkZip(zip),
    afterHours: !isOfficeOpen(),
    receivedAt: new Date().toISOString(),
  };

  // Shows up in the Vercel function logs either way.
  console.log("[quote] New quote request", lead);

  const delivered = await sendToGhl(lead);
  if (!delivered) {
    // Never lose a lead silently: ask them to call instead.
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
