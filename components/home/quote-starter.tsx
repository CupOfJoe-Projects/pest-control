"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CircleCheck, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { planLabels, type PlanId } from "@/content/plans";
import { PLAN_EVENT } from "./plan-button";

const CHIPS = ["Roaches", "Ants", "Rodents", "Mosquitoes", "Spiders", "Bed bugs", "Not sure"];

type Errors = Partial<Record<"pest" | "zip" | "phone" | "form", string>>;

/**
 * Quote starter bar under the hero: pest chips, ZIP, phone, button. One row on
 * desktop, stacked on phones. Plan cards preselect a plan through PLAN_EVENT.
 * Posts to the same /api/quote handler as the full form.
 */
export function QuoteStarter({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const [pest, setPest] = useState("");
  const [plan, setPlan] = useState<PlanId | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const onPlan = (e: Event) => setPlan((e as CustomEvent<PlanId>).detail);
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, []);

  const clear = (field: keyof Errors) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      pest,
      zip: String(fd.get("zip") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
      source: "hero",
      ...(plan && { plan }),
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
      <div role="status" className="flex flex-col items-center gap-3 py-4 text-center md:flex-row md:text-left">
        <CircleCheck aria-hidden="true" className="size-10 shrink-0 text-green" />
        <p className="text-ink">
          <span className="block font-heading text-xl font-extrabold">Got it. We will call you soon.</span>
          <span className="text-muted-ink">
            A real person from our Bartow office will reach out. Need us now?{" "}
            <a href={phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
              Call {phone}
            </a>
          </span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="starter-title">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="starter-title" className="font-heading text-xl font-extrabold text-ink md:text-2xl">
          Get a free quote in 30 seconds
        </h2>
        {plan && (
          <p className="flex items-center gap-1.5 rounded-full bg-green-soft py-1 pr-1.5 pl-3 text-sm font-semibold text-green">
            Plan: {planLabels[plan]}
            <button
              type="button"
              onClick={() => setPlan("")}
              aria-label="Clear plan"
              className="flex size-6 items-center justify-center rounded-full hover:bg-green/10"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          </p>
        )}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6">
        <fieldset aria-describedby={errors.pest ? "starter-pest-error" : undefined}>
          <legend className="text-sm font-semibold text-muted-ink">What are you dealing with?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
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

        <fieldset className="grid gap-3 sm:grid-cols-[8rem_1fr_auto] lg:grid-cols-[7.5rem_11rem_auto]">
          <legend className="sr-only">Where should we call you?</legend>
          <div>
            <label htmlFor="starter-zip" className="text-sm font-semibold text-muted-ink">
              ZIP
            </label>
            <Input
              id="starter-zip"
              name="zip"
              data-field="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              aria-invalid={Boolean(errors.zip)}
              aria-describedby={errors.zip ? "starter-zip-error" : undefined}
              onChange={() => clear("zip")}
              className="mt-2 h-12 bg-white px-3.5 text-base tabular-nums md:text-base"
            />
            {errors.zip && (
              <p id="starter-zip-error" className="mt-1.5 text-sm font-medium text-destructive">
                {errors.zip}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="starter-phone" className="text-sm font-semibold text-muted-ink">
              Phone
            </label>
            <Input
              id="starter-phone"
              name="phone"
              data-field="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "starter-phone-error" : undefined}
              onChange={() => clear("phone")}
              className="mt-2 h-12 bg-white px-3.5 text-base tabular-nums md:text-base"
            />
            {errors.phone && (
              <p id="starter-phone-error" className="mt-1.5 text-sm font-medium text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              variant="cta"
              size="2xl"
              disabled={status === "submitting"}
              className="w-full md:h-12 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" /> Sending
                </>
              ) : (
                "Get my free quote"
              )}
            </Button>
          </div>
        </fieldset>
      </div>

      {/* Honeypot for bots. Visually hidden, skipped by keyboard and screen readers. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {errors.form && (
        <p role="alert" className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {errors.form}
        </p>
      )}
      <p className="mt-3 text-sm text-muted-ink">A real person calls you back. No call center.</p>
    </form>
  );
}
