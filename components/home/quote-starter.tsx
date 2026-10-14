"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CHIPS = ["Roaches", "Ants", "Rodents", "Mosquitoes", "Spiders", "Bed bugs", "Not sure"];

type Errors = Partial<Record<"pest" | "zip" | "phone" | "form", string>>;

/** Two step quote starter in the hero. Posts to the same /api/quote handler. */
export function QuoteStarter({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const [pest, setPest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      pest,
      zip: String(fd.get("zip") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
      source: "hero",
    };

    const next: Errors = {};
    if (!pest) next.pest = "Pick what you are seeing, or Not sure.";
    if (!/^\d{5}$/.test(data.zip)) next.zip = "Enter a 5 digit ZIP.";
    if (data.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length !== 10) next.phone = "Enter a 10 digit phone.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      event.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error();
      setStatus("success");
    } catch {
      setErrors({ form: `Something went wrong. Please call ${phone}.` });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-72 flex-col items-center justify-center text-center">
        <CircleCheck aria-hidden="true" className="size-14 text-green" />
        <p className="mt-4 font-heading text-2xl font-extrabold text-ink">Got it. We will call you soon.</p>
        <p className="mt-2 text-muted-ink">
          A real person from our Bartow office will reach out about your {pest === "Not sure" ? "pest problem" : pest.toLowerCase()}.
          Need us now?{" "}
          <a href={phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
            Call {phone}
          </a>
        </p>
      </div>
    );
  }

  const clear = (field: keyof Errors) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="starter-title">
      <h2 id="starter-title" className="font-heading text-xl font-extrabold text-ink sm:text-2xl">
        Get a free quote in 30 seconds
      </h2>

      <fieldset className="mt-4" aria-describedby={errors.pest ? "starter-pest-error" : undefined}>
        <legend className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
          <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-green text-xs text-cream">
            1
          </span>
          What are you dealing with?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip, i) => (
            <label key={chip} className="cursor-pointer">
              <input
                type="radio"
                name="pest"
                value={chip}
                checked={pest === chip}
                onChange={() => {
                  setPest(chip);
                  clear("pest");
                }}
                data-field={i === 0 ? "pest" : undefined}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-11 items-center rounded-full border px-4 text-[0.95rem] font-semibold transition select-none",
                  "border-line bg-cream text-ink hover:border-green/50",
                  "peer-checked:border-green peer-checked:bg-green peer-checked:text-cream",
                  "peer-focus-visible:ring-3 peer-focus-visible:ring-orange/60",
                )}
              >
                {chip}
              </span>
            </label>
          ))}
        </div>
        {errors.pest && (
          <p id="starter-pest-error" className="mt-2 text-sm font-medium text-destructive">
            {errors.pest}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-5">
        <legend className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
          <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-green text-xs text-cream">
            2
          </span>
          Where should we call you?
        </legend>
        <div className="mt-3 grid grid-cols-[0.8fr_1.2fr] gap-3">
          <div>
            <label htmlFor="starter-zip" className="sr-only">
              ZIP code
            </label>
            <Input
              id="starter-zip"
              name="zip"
              data-field="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="ZIP"
              aria-invalid={Boolean(errors.zip)}
              aria-describedby={errors.zip ? "starter-zip-error" : undefined}
              onChange={() => clear("zip")}
              className="h-12 bg-white px-3.5 text-base md:text-base"
            />
          </div>
          <div>
            <label htmlFor="starter-phone" className="sr-only">
              Phone number
            </label>
            <Input
              id="starter-phone"
              name="phone"
              data-field="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "starter-phone-error" : undefined}
              onChange={() => clear("phone")}
              className="h-12 bg-white px-3.5 text-base md:text-base"
            />
          </div>
        </div>
        {(errors.zip || errors.phone) && (
          <div className="mt-2 grid grid-cols-[0.8fr_1.2fr] gap-3 text-sm font-medium text-destructive">
            <p id="starter-zip-error">{errors.zip}</p>
            <p id="starter-phone-error">{errors.phone}</p>
          </div>
        )}
      </fieldset>

      {/* Honeypot for bots. Visually hidden, skipped by keyboard and screen readers. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {errors.form && (
        <p role="alert" className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {errors.form}
        </p>
      )}

      <Button type="submit" variant="cta" size="2xl" disabled={status === "submitting"} className="mt-5 w-full">
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" /> Sending
          </>
        ) : (
          "Get my free quote"
        )}
      </Button>
      <p className="mt-3 text-center text-sm text-muted-ink">A real person calls you back. No call center.</p>
    </form>
  );
}
