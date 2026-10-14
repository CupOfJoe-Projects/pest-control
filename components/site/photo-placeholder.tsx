import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO(owner): Replace every PhotoPlaceholder with a real photo via next/image.
// Keep the same aspect ratio so the layout does not shift.
export function PhotoPlaceholder({
  label,
  className,
  tone = "green",
}: {
  /** Describes the photo that belongs here. Also used as the accessible label. */
  label: string;
  className?: string;
  tone?: "green" | "cream";
}) {
  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${label}`}
      className={cn(
        "relative flex items-end overflow-hidden rounded-lg p-5",
        tone === "green" ? "bg-green text-cream" : "bg-cream-dark text-green",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative flex items-center gap-2 text-sm font-medium">
        <Camera aria-hidden="true" className="size-4 shrink-0 opacity-80" />
        <span>Photo coming soon: {label}</span>
      </div>
    </div>
  );
}
