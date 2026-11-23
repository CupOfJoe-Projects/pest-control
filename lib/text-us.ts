import { site } from "@/content/site";

/**
 * The message a "Text us" button fills in. The customer adds a photo and taps
 * send. The labeled lines give the office (and the GoHighLevel photo workflow)
 * the details it needs without a back and forth.
 */
export const TEXT_MESSAGE = [
  "Hi McDonald Exterminators! Here is a photo of what I am seeing.",
  "Name:",
  "ZIP code:",
  "Where I see them:",
].join("\n");

/** "863-457-2734" -> "+18634572734" */
export const textNumberE164 = `+1${site.textNumber.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")}`;

/**
 * Opens the phone's texting app to our number with the message filled in.
 * `?&body=` is the form both iPhone and Android read.
 */
export function smsHref(message: string = TEXT_MESSAGE) {
  return `sms:${textNumberE164}?&body=${encodeURIComponent(message)}`;
}
