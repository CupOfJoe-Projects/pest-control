import Link from "next/link";
import { cn } from "@/lib/utils";

/** The 1959 seal, simplified so it reads at 32px. */
export function SealMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const fg = tone === "dark" ? "var(--brand-green)" : "var(--brand-cream)";
  const bg = tone === "dark" ? "var(--brand-cream)" : "var(--brand-green-dark)";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <circle cx="32" cy="32" r="31" fill={fg} />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke={bg} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="22" fill="none" stroke={bg} strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <text
        x="32"
        y="25"
        textAnchor="middle"
        fill={bg}
        fontSize="7"
        fontWeight="700"
        letterSpacing="1.4"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        EST
      </text>
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fill="var(--brand-orange)"
        fontSize="16"
        fontWeight="800"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        1959
      </text>
    </svg>
  );
}

// TODO(owner): Demo wordmark. Replace with the real vector logo files.
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5 rounded-md", tone === "dark" ? "text-ink" : "text-cream", className)}
    >
      <SealMark tone={tone} className="size-9 sm:size-10" />
      {/* The visible wordmark is the link name, so it matches what people see. */}
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.35rem] font-bold tracking-[-0.03em] sm:text-[1.5rem]">McDonald</span>
        <span
          className={cn(
            "mt-1 font-sans text-[0.625rem] font-semibold tracking-[0.2em]",
            tone === "dark" ? "text-green" : "text-cream/80",
          )}
        >
          EXTERMINATORS
        </span>
      </span>
    </Link>
  );
}
