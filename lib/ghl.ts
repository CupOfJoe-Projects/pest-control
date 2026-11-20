/**
 * GoHighLevel (LeadConnector) API v2, using a Private Integration token.
 * Needs the contacts.write scope. Docs: https://highlevel.stoplight.io
 *
 * Each lead is upserted as a contact (matched on phone, so a repeat request
 * updates the same person), tagged, and gets a note with everything they told
 * us. Start the GHL workflow (texts, emails, assignment) on the "website lead" tag.
 */
const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

export const GHL_TAGS = ["website lead"];

export type GhlLead = {
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
  source: string;
  tags: string[];
  note: string;
};

export function ghlConfigured() {
  return Boolean(process.env.GHL_CONTACT_FORM_API_KEY && process.env.GHL_LOCATION_ID);
}

async function ghl(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_CONTACT_FORM_API_KEY}`,
      Version: VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    // GHL error bodies say which field or scope is wrong; never contains the token.
    throw new Error(`GHL ${path} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return res.json();
}

/** "(863) 533-1294" -> "+18635331294" */
function toE164(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return `+1${digits}`;
}

/** Returns true when the contact was saved. Tags and the note are best effort. */
export async function sendLeadToGhl(lead: GhlLead) {
  try {
    const data = await ghl("/contacts/upsert", {
      locationId: process.env.GHL_LOCATION_ID,
      firstName: lead.firstName || undefined,
      lastName: lead.lastName || undefined,
      phone: toE164(lead.phone),
      postalCode: lead.zip,
      source: lead.source,
    });
    const id: string | undefined = data?.contact?.id;
    if (!id) throw new Error("GHL upsert returned no contact id");

    // Added separately: tags on the upsert would replace the contact's existing tags.
    const extras = await Promise.allSettled([
      ghl(`/contacts/${id}/tags`, { tags: lead.tags }),
      ghl(`/contacts/${id}/notes`, { body: lead.note }),
    ]);
    for (const r of extras) if (r.status === "rejected") console.error("[ghl]", r.reason);
    return true;
  } catch (error) {
    console.error("[ghl] lead not saved", error);
    return false;
  }
}
