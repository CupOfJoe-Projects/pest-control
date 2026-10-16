"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, CircleCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmsConsent } from "@/components/site/sms-consent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { planLabels, type PlanId } from "@/content/plans";
import { PLAN_EVENT } from "@/components/home/plan-button";

type Option = { value: string; label: string };
type Errors = Partial<Record<"name" | "phone" | "pest" | "zip" | "message" | "form", string>>;
type Status = "idle" | "submitting" | "success";

const fieldClass = "h-12 bg-white px-3.5 text-base md:text-base";

function validate(data: Record<string, string>): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = data.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) errors.phone = "Please enter a 10 digit phone number.";
  if (!data.pest) errors.pest = "Please pick a pest, or choose Not sure.";
  if (!/^\d{5}$/.test(data.zip.trim())) errors.zip = "Please enter a 5 digit ZIP code.";
  return errors;
}

export function QuoteFormClient({
  pestOptions,
  defaultPest = "",
  phone,
  phoneHref,
  textUrl,
  showPlan = false,
}: {
  pestOptions: Option[];
  defaultPest?: string;
  phone: string;
  phoneHref: string;
  textUrl: string;
  /** Show the plan picker. Plan cards preselect it through PLAN_EVENT. */
  showPlan?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState<PlanId | "">("");

  useEffect(() => {
    if (!showPlan) return;
    const onPlan = (e: Event) => setPlan((e as CustomEvent<PlanId>).detail);
    window.addEventListener(PLAN_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_EVENT, onPlan);
  }, [showPlan]);
  const [errors, setErrors] = useState<Errors>({});
  const [pest, setPest] = useState<string>(defaultPest);
  const [firstName, setFirstName] = useState("");

  // Clear a field's error as soon as the person edits it.
  function clearError(field: string) {
    setErrors((prev) => {
      if (!(field in prev) && !prev.form) return prev;
      const next = { ...prev };
      delete next[field as keyof Errors];
      delete next.form;
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      pest,
      zip: String(fd.get("zip") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
      ...(plan && { plan }),
      source: "form",
    };

    const clientErrors = validate(data);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      const first = Object.keys(clientErrors)[0];
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
      if (!res.ok || !json.ok) {
        const fe = (json.fieldErrors ?? {}) as Record<string, string[]>;
        const serverErrors: Errors = Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v[0]]));
        if (!Object.keys(serverErrors).length) serverErrors.form = "Something went wrong. Please call us instead.";
        setErrors(serverErrors);
        setStatus("idle");
        return;
      }
      setFirstName(data.name.trim().split(/\s+/)[0]);
      setStatus("success");
    } catch {
      setErrors({ form: "We could not send that. Please check your connection or call us." });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-80 flex-col items-center justify-center py-8 text-center">
        <CircleCheck aria-hidden="true" className="size-14 text-green" />
        <h3 className="mt-4 text-2xl font-extrabold text-ink">Thanks, {firstName}! We got it.</h3>
        <p className="mt-2 max-w-sm text-lg text-muted-ink">
          We will call you soon to talk about your free quote. Need us sooner? Call{" "}
          <a href={phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const describedBy = (field: keyof Errors) => (errors[field] ? `${field}-error` : undefined);
  const errorText = (field: keyof Errors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="text-sm font-medium text-destructive">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      onChange={(e) => {
        const target: EventTarget = e.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        )
          clearError(target.name);
      }}
      noValidate
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="quote-name" className="text-base font-semibold">
            Name
          </Label>
          <Input
            id="quote-name"
            name="name"
            data-field="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
          {errorText("name")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quote-phone" className="text-base font-semibold">
            Phone
          </Label>
          <Input
            id="quote-phone"
            name="phone"
            data-field="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
          {errorText("phone")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quote-zip" className="text-base font-semibold">
            ZIP code
          </Label>
          <Input
            id="quote-zip"
            name="zip"
            data-field="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            required
            aria-invalid={Boolean(errors.zip)}
            aria-describedby={describedBy("zip")}
            className={fieldClass}
          />
          {errorText("zip")}
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="quote-pest" className="text-base font-semibold">
            What pest are you seeing?
          </Label>
          {/* Native select on purpose: phones open their own picker, and it ships no extra JS. */}
          <div className="relative">
            <select
              id="quote-pest"
              name="pest"
              data-field="pest"
              value={pest}
              onChange={(e) => setPest(e.target.value)}
              aria-invalid={Boolean(errors.pest)}
              aria-describedby={describedBy("pest")}
              className={cn(
                fieldClass,
                "w-full appearance-none rounded-lg border border-input pr-10 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                !pest && "text-muted-foreground",
              )}
            >
              <option value="" disabled>
                Choose one
              </option>
              {pestOptions.map((o) => (
                <option key={o.value} value={o.value} className="text-ink">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted-ink"
            />
          </div>
          {errorText("pest")}
        </div>
        {showPlan && (
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="quote-plan" className="text-base font-semibold">
              Plan <span className="font-normal text-muted-ink">(optional)</span>
            </Label>
            <div className="relative">
              <select
                id="quote-plan"
                name="plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value as PlanId | "")}
                className={cn(
                  fieldClass,
                  "w-full appearance-none rounded-lg border border-input pr-10 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  !plan && "text-muted-foreground",
                )}
              >
                <option value="">Not sure yet</option>
                {(Object.keys(planLabels) as PlanId[]).map((id) => (
                  <option key={id} value={id} className="text-ink">
                    {planLabels[id]}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted-ink"
              />
            </div>
          </div>
        )}
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="quote-message" className="text-base font-semibold">
            Anything else? <span className="font-normal text-muted-ink">(optional)</span>
          </Label>
          <Textarea id="quote-message" name="message" rows={3} className="bg-white px-3.5 py-3 text-base md:text-base" />
        </div>
        {/* Honeypot for bots. Visually hidden, skipped by keyboard and screen readers. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      {errors.form && (
        <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 font-medium text-destructive">
          {errors.form}
        </p>
      )}

      <Button type="submit" variant="cta" size="2xl" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" /> Sending
          </>
        ) : (
          "Get My Free Quote"
        )}
      </Button>
      <SmsConsent className="-mt-2 text-center" />
      <p className="text-center text-muted-ink">
        Rather talk? Call{" "}
        <a href={phoneHref} className="font-semibold whitespace-nowrap text-green underline underline-offset-4">
          {phone}
        </a>{" "}
        or{" "}
        <a href={textUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-green underline underline-offset-4">
          text us
        </a>
        .
      </p>
    </form>
  );
}
