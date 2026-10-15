import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[75rem] px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className,
  tone = "dark",
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", tone === "dark" ? "text-green" : "text-cream/85")}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          // H2 scale: 36px phones, 56px desktop.
          "text-[2.25rem] leading-[1] font-extrabold md:text-[3.5rem] md:leading-[0.95]",
          tone === "dark" ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-5 text-lg md:text-xl", tone === "dark" ? "text-muted-ink" : "text-cream/85")}>{intro}</p>
      )}
    </div>
  );
}
