import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating = 5,
  className,
  size = "size-5",
}: {
  rating?: number;
  className?: string;
  size?: string;
}) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(size, i < full ? "fill-orange text-orange" : "fill-line text-line")}
        />
      ))}
    </span>
  );
}
