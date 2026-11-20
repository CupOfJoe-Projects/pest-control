import { z } from "zod";
import { quoteSchema } from "@/lib/quote-schema";
import { isPolkZip } from "@/lib/polk-zips";
import { isOfficeOpen } from "@/lib/office-hours";
import { OFFER, SHOW_OFFER } from "@/content/site";
import { GHL_TAGS, ghlConfigured, sendLeadToGhl } from "@/lib/ghl";

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

  const { name, phone, pest, zip, message, plan, service, source, page } = result.data;
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
    service,
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

  // Without GHL_CONTACT_FORM_API_KEY and GHL_LOCATION_ID (local dev) the lead is only logged.
  if (!ghlConfigured()) return Response.json({ ok: true });

  const note = [
    `Website quote request (${lead.source})`,
    `Pest: ${pest}`,
    service && `Coupon: ${service}`,
    plan && `Plan: ${plan}`,
    `ZIP: ${zip}${lead.outsidePolkCounty ? " (outside Polk County)" : ""}`,
    message && `Message: ${message}`,
    lead.offer && `Offer shown: ${lead.offer}`,
    page && `Page: ${page}`,
    lead.afterHours ? "Came in after hours." : "",
  ]
    .filter(Boolean)
    .join("\n");

  const tags = [
    ...GHL_TAGS,
    source === "hero" ? "website: homepage bar" : "website: quote form",
    ...(service ? [`coupon: ${service.toLowerCase()}`] : []),
    ...(lead.outsidePolkCounty ? ["outside polk county"] : []),
  ];

  const delivered = await sendLeadToGhl({
    firstName: lead.firstName,
    lastName: lead.lastName,
    phone,
    zip,
    source: lead.source,
    tags,
    note,
  });
  if (!delivered) {
    // Never lose a lead silently: ask them to call instead.
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
