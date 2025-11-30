"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  totalProducts: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export function CategoryFilter({
  totalProducts,
  sortBy,
  onSortChange,
}: CategoryFilterProps) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border)]">
      <div className="w-full px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            {totalProducts} {totalProducts === 1 ? "product" : "products"}
          </p>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Sort by:</span>
              <span>{sortOptions.find((o) => o.value === sortBy)?.label}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  sortOpen && "rotate-180"
                )}
              />
            </button>

            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-[var(--color-border)] shadow-lg min-w-[200px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--color-cream-dark)]",
                        sortBy === option.value
                          ? "text-[var(--color-primary)] font-medium"
                          : "text-[var(--color-charcoal)]"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
