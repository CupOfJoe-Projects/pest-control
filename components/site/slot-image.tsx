import Image from "next/image";
import { Camera } from "lucide-react";
import type { ImageSlot } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Renders an image slot: the real image when its file exists, otherwise a
 * styled placeholder at the same aspect ratio so the layout never shifts.
 */
export function SlotImage({
  slot,
  sizes,
  className,
  priority = false,
  fill = false,
  tone = "green",
  compact = false,
}: {
  slot: ImageSlot;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent (parent must be positioned) instead of using intrinsic size. */
  fill?: boolean;
  tone?: "green" | "cream";
  /** Hide the placeholder label below the sm breakpoint, for thumbnails. */
  compact?: boolean;
}) {
  if (slot.src) {
    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        {...(fill ? { fill: true } : { width: slot.width, height: slot.height })}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={slot.alt}
      // A className aspect ratio (like aspect-square) wins over the image ratio.
      style={fill || /\baspect-/.test(className ?? "") ? undefined : { aspectRatio: `${slot.width} / ${slot.height}` }}
      className={cn(
        "relative flex items-end overflow-hidden",
        fill && "absolute inset-0",
        tone === "green" ? "bg-green text-cream" : "bg-cream-dark text-green",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)" }}
      />
      <span
        aria-hidden="true"
        className={cn("relative m-4 items-center gap-2 text-xs font-medium opacity-80", compact ? "hidden sm:flex" : "flex")}
      >
        <Camera className="size-4 shrink-0" />
        Image coming soon: {slot.label}
      </span>
    </div>
  );
}
