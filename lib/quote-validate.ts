// Friendly field checks shared by both quote forms. They run when a field loses
// focus and again on submit. The server checks the same rules in quote-schema.

export function phoneError(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (!digits) return "Please enter your phone number so we can call you.";
  if (digits.length !== 10) return "That number looks short. Please enter all 10 digits, like 863-555-0123.";
  return undefined;
}

export function zipError(value: string) {
  const zip = value.trim();
  if (!zip) return "Please enter your ZIP code.";
  if (!/^\d{5}$/.test(zip)) return "Please enter a 5 digit ZIP code, like 33830.";
  return undefined;
}

/** Keeps a ZIP field to digits only, so a stray space or letter never blocks a lead. */
export function digitsOnly(value: string, max: number) {
  return value.replace(/\D/g, "").slice(0, max);
}
