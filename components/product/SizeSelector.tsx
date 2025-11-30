"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { ProductSize } from "@/types";
import { Check, Info } from "lucide-react";

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  onSizeSelect: (size: ProductSize) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--color-charcoal)]">
          Size
        </label>
        <button className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors">
          <Info className="h-4 w-4" />
          Size guide
        </button>
      </div>
      <div className="grid gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;
          return (
            <button
              key={size.id}
              onClick={() => onSizeSelect(size)}
              disabled={!size.inStock}
              className={cn(
                "relative flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                isSelected
                  ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-taupe)]",
                !size.inStock && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)]"
                      : "border-[var(--color-taupe)]"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <div>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    {size.label}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {size.dimensions.width}W x {size.dimensions.depth}D x{" "}
                    {size.dimensions.height}H cm
                  </p>
                  {size.bedDimensions && (
                    <p className="text-sm text-[var(--color-muted)]">
                      Bed: {size.bedDimensions.width} x{" "}
                      {size.bedDimensions.length} cm
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-[var(--color-charcoal)]">
                  {formatPrice(size.price)}
                </p>
                {size.originalPrice && (
                  <p className="text-sm text-[var(--color-muted)] line-through">
                    {formatPrice(size.originalPrice)}
                  </p>
                )}
                {!size.inStock && (
                  <p className="text-sm text-[var(--color-primary)]">
                    Out of stock
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
