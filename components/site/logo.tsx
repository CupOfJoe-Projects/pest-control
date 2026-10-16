import Image from "next/image";
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

/**
 * Their real logo: the ant, grass, and mouse tiles with the name set beside
 * them, one line per tile. The tiles were traced to SVG from the logo on the
 * old site (the only copy we have). The name is live text in Arial Bold, like
 * the original, so it stays sharp at any size.
 * TODO(owner): Swap in the original logo files if they have them.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2 rounded-md", tone === "dark" ? "text-ink" : "text-cream", className)}
    >
      <Image src="/images/logo-mark.svg" alt="" width={80} height={138} unoptimized priority className="h-12 w-auto sm:h-[3.25rem] lg:h-[3.625rem]" />
      {/* The visible name is the link name. Line height matches the tile pitch (48/138 of the mark). */}
      <span className="flex flex-col font-[Arial,Helvetica,sans-serif] text-[0.95rem] leading-[1.045rem] font-bold tracking-[-0.01em] sm:text-[1.03rem] sm:leading-[1.13rem] lg:text-[1.15rem] lg:leading-[1.26rem]">
        <span>McDonald</span>
        <span>Exterminators</span>
        <span>Inc.</span>
      </span>
    </Link>
  );
}
