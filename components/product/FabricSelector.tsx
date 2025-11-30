"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Fabric, FabricCategory } from "@/types";
import { Check, Truck, Plus } from "lucide-react";

interface FabricSelectorProps {
  fabrics: Fabric[];
  categories: FabricCategory[];
  selectedFabric: Fabric | null;
  onFabricSelect: (fabric: Fabric) => void;
}

export function FabricSelector({
  fabrics,
  categories,
  selectedFabric,
  onFabricSelect,
}: FabricSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || ""
  );
  const [showAll, setShowAll] = useState(false);

  const filteredFabrics = fabrics.filter(
    (fabric) => fabric.category === activeCategory
  );
  const displayedFabrics = showAll
    ? filteredFabrics
    : filteredFabrics.slice(0, 8);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--color-charcoal)]">
          Fabric{" "}
          {selectedFabric && (
            <span className="font-normal text-[var(--color-muted)]">
              – {selectedFabric.name}
            </span>
          )}
        </label>
        <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] flex items-center gap-1 transition-colors">
          <Truck className="h-4 w-4" />
          Order free samples
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setShowAll(false);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === category.id
                ? "bg-[var(--color-charcoal)] text-white"
                : "bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] hover:bg-[var(--color-sand)]"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Fabric swatches */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayedFabrics.map((fabric) => {
          const isSelected = selectedFabric?.id === fabric.id;
          return (
            <button
              key={fabric.id}
              onClick={() => onFabricSelect(fabric)}
              disabled={!fabric.inStock}
              className={cn(
                "relative group",
                !fabric.inStock && "opacity-50 cursor-not-allowed"
              )}
              title={fabric.name}
            >
              <div
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden transition-all",
                  isSelected
                    ? "ring-2 ring-[var(--color-charcoal)] ring-offset-2"
                    : "hover:ring-2 hover:ring-[var(--color-taupe)] hover:ring-offset-2"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: fabric.hexColor }}
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                      <Check className="h-4 w-4 text-[var(--color-charcoal)]" />
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-1.5 text-xs text-center text-[var(--color-muted)] truncate">
                {fabric.name}
              </p>
              {fabric.price > 0 && (
                <p className="text-xs text-center text-[var(--color-primary)]">
                  +{formatPrice(fabric.price)}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Show more button */}
      {filteredFabrics.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors"
        >
          <Plus
            className={cn(
              "h-4 w-4 transition-transform",
              showAll && "rotate-45"
            )}
          />
          {showAll
            ? "Show less"
            : `Show ${filteredFabrics.length - 8} more fabrics`}
        </button>
      )}

      {/* Selected fabric info */}
      {selectedFabric && (
        <div className="flex items-center gap-4 p-4 bg-[var(--color-cream-dark)] rounded-xl">
          <div
            className="h-16 w-16 rounded-lg flex-shrink-0"
            style={{ backgroundColor: selectedFabric.hexColor }}
          />
          <div>
            <p className="font-medium text-[var(--color-charcoal)]">
              {selectedFabric.name}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {categories.find((c) => c.id === selectedFabric.category)?.name}
            </p>
            {selectedFabric.price > 0 && (
              <p className="text-sm text-[var(--color-primary)]">
                Additional {formatPrice(selectedFabric.price)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
