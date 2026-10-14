import { z } from "zod";
import { quoteSchema } from "@/lib/quote-schema";

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

  const { name, phone, pest, zip, message, plan, source } = result.data;
  const quote = { name, phone, pest, zip, message, plan, source };

  // Demo: log the submission so it shows up in Vercel function logs.
  console.log("[quote] New quote request", { ...quote, receivedAt: new Date().toISOString() });

  // TODO: Deliver by email with Resend once the owner confirms the inbox.
  //   Env vars: RESEND_API_KEY, QUOTE_TO_EMAIL
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Website <quotes@mcdonaldexterminators.com>",
  //     to: process.env.QUOTE_TO_EMAIL!,
  //     subject: `Quote request: ${quote.name} (${quote.pest}, ${quote.zip})`,
  //     text: Object.entries(quote).map(([k, v]) => `${k}: ${v}`).join("\n"),
  //   });

  return Response.json({ ok: true });
}
