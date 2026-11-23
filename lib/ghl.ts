/**
 * GoHighLevel (LeadConnector) API v2, using a Private Integration token.
 * Needs the contacts.write scope. Docs: https://highlevel.stoplight.io
 *
 * Each lead is upserted as a contact (matched on phone, so a repeat request
 * updates the same person), tagged, and gets a note with everything they told
 * us. Start the GHL workflow (texts, emails, assignment) on the "website lead" tag:
 * trigger "Contact Tag Added: website lead".
 *
 * Returning contacts: their saved name is kept (the name they typed is in the
 * note), and "website lead" is removed and added again, so the workflow fires on
 * every request, not only the first. Needs contacts.readonly and contacts.write.
 */
const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

/** The tag GHL workflows start on. Re-added on every request. */
export const GHL_TRIGGER_TAG = "website lead";
export const GHL_TAGS = [GHL_TRIGGER_TAG];

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

async function ghl(path: string, body?: unknown, method: "GET" | "POST" | "DELETE" = "POST") {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_CONTACT_FORM_API_KEY}`,
      Version: VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
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

/** The id of the contact already saved with this phone number, or null. Undefined if the lookup failed. */
async function findContactId(phone: string): Promise<string | null | undefined> {
  try {
    const params = new URLSearchParams({ locationId: process.env.GHL_LOCATION_ID!, number: phone });
    const data = await ghl(`/contacts/search/duplicate?${params}`, undefined, "GET");
    return data?.contact?.id ?? null;
  } catch (error) {
    console.error("[ghl] contact lookup failed", error);
    return undefined;
  }
}

/** Returns true when the contact was saved. Tags and the note are best effort. */
export async function sendLeadToGhl(lead: GhlLead) {
  try {
    const phone = toE164(lead.phone);
    // An existing contact keeps the name the office saved (the typed name is in the note).
    // If the lookup fails, send the name anyway rather than lose details.
    const existing = await findContactId(phone);
    const data = await ghl("/contacts/upsert", {
      locationId: process.env.GHL_LOCATION_ID,
      ...(!existing && { firstName: lead.firstName || undefined, lastName: lead.lastName || undefined }),
      phone,
      postalCode: lead.zip,
      source: lead.source,
    });
    const id: string | undefined = data?.contact?.id;
    if (!id) throw new Error("GHL upsert returned no contact id");

    // "Tag Added" triggers only fire when a contact gains a tag it did not have,
    // so a returning contact loses the trigger tag first, then gets it back.
    if (existing) {
      await ghl(`/contacts/${id}/tags`, { tags: [GHL_TRIGGER_TAG] }, "DELETE").catch((error) =>
        console.error("[ghl] could not reset the trigger tag", error),
      );
    }

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
