import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo.png";
import { cn } from "@/lib/utils";

/**
 * Their logo: the round red and black "Est. 1959" seal (supplied by the owner,
 * November 2026), with the name set beside it so it stays readable at header
 * size. A black and white version is in /public/brand for one color uses.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5 rounded-md", tone === "dark" ? "text-ink" : "text-cream", className)}
    >
      <Image src={logo} alt="" sizes="64px" priority className="size-12 sm:size-[3.25rem] lg:size-[3.625rem]" />
      {/* The visible name is the link name. */}
      <span className="flex flex-col font-heading text-[1.05rem] leading-[1.1] font-extrabold tracking-[-0.01em] sm:text-[1.15rem] lg:text-[1.25rem]">
        <span>McDonald</span>
        <span>Exterminators</span>
      </span>
    </Link>
  );
}
