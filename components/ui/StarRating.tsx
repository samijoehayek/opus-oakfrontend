import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  totalReviews?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  totalReviews,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(
              sizeClasses[size],
              "fill-[var(--color-mustard)] text-[var(--color-mustard)]"
            )}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={cn(
              sizeClasses[size],
              "fill-[var(--color-mustard)] text-[var(--color-mustard)]"
            )}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-[var(--color-sand)]")}
          />
        ))}
      </div>
      {showValue && (
        <span
          className={cn(
            textSizeClasses[size],
            "font-medium text-[var(--color-charcoal)]"
          )}
        >
          {rating.toFixed(1)}
        </span>
      )}
      {totalReviews !== undefined && (
        <span
          className={cn(textSizeClasses[size], "text-[var(--color-muted)]")}
        >
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
}
