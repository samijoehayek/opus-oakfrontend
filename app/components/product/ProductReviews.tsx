"use client";

import { useState } from "react";
import { ThumbsUp, ChevronDown, Check } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ProductReview } from "@/app/types";
import { StarRating } from "@/app/components/ui/StarRating";
import { Button } from "@/app/components/ui/Button";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.floor(r.rating) === rating).length,
    percentage:
      (reviews.filter((r) => Math.floor(r.rating) === rating).length /
        reviews.length) *
      100,
  }));

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Average rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-[family-name:var(--font-display)] font-semibold text-[var(--color-charcoal)] mb-2">
            {averageRating.toFixed(1)}
          </div>
          <StarRating
            rating={averageRating}
            size="lg"
            className="justify-center md:justify-start mb-2"
          />
          <p className="text-sm text-[var(--color-muted)]">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating distribution */}
        <div className="flex-1 space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-muted)] w-8">
                {rating}★
              </span>
              <div className="flex-1 h-2 bg-[var(--color-cream-dark)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-mustard)] rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-[var(--color-muted)] w-8">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show more */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : `Show all ${reviews.length} reviews`}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                showAll && "rotate-180"
              )}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  return (
    <div className="pb-6 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={review.rating} size="sm" />
            {review.verified && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-sage)]">
                <Check className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
          <h4 className="font-medium text-[var(--color-charcoal)]">
            {review.title}
          </h4>
        </div>
        <time className="text-sm text-[var(--color-muted)] flex-shrink-0">
          {new Date(review.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      <p className="text-[var(--color-warm-gray)] mb-4 leading-relaxed">
        {review.content}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-muted)]">{review.author}</p>
        <button
          onClick={handleHelpful}
          disabled={helpful}
          className={cn(
            "flex items-center gap-2 text-sm transition-colors",
            helpful
              ? "text-[var(--color-sage)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
          )}
        >
          <ThumbsUp className={cn("h-4 w-4", helpful && "fill-current")} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </div>
  );
}
