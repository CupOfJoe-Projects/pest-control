// Office hours: Monday to Friday, 8 AM to 6 PM, Florida (Eastern) time.
// Used by the quote thank you message and to flag after hours leads.

const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Day of week (0 = Sunday) and hour in Florida, whatever the visitor's own time zone. */
function floridaNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return { day, hour };
}

export function isOfficeOpen(now = new Date()) {
  const { day, hour } = floridaNow(now);
  return day >= 1 && day <= 5 && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

/** When the office next opens, as words: "this morning", "tomorrow morning", or "Monday morning". */
export function nextOpenLabel(now = new Date()) {
  const { day, hour } = floridaNow(now);
  if (day >= 1 && day <= 5 && hour < OPEN_HOUR) return "this morning";
  let next = (day + 1) % 7;
  while (next === 0 || next === 6) next = (next + 1) % 7;
  return next === (day + 1) % 7 ? "tomorrow morning" : `${DAYS[next]} morning`;
}
