import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function StarRating({
  rating,
  size = 16,
  className,
  showValue = false,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-label={`דירוג ${rating} מתוך 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled ? "fill-champagne-400 text-champagne-400" : "text-warmgray-300",
              )}
            />
          );
        })}
      </div>
      {showValue ? (
        <span className="text-sm font-medium text-warmgray-600">
          {rating.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
