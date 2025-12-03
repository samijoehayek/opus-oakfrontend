"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { CategoryProduct } from "@/types/product";

interface ProductCardProps {
  product: CategoryProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasSecondImage = product.images.length > 1;
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];

  // Fallback image if no images or error
  const fallbackImage =
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop";

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream-dark)]">
          {/* Primary Image */}
          <Image
            src={
              imageError ? fallbackImage : primaryImage?.src || fallbackImage
            }
            alt={primaryImage?.alt || product.name}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && hasSecondImage && !imageError
                ? "opacity-0"
                : "opacity-100"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />

          {/* Secondary Image (on hover) */}
          {hasSecondImage && !imageError && (
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 bg-[var(--color-charcoal)] text-white text-xs uppercase tracking-wide px-3 py-1.5">
              {product.badge}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
              // TODO: Integrate with wishlist API
            }}
            className={cn(
              "absolute top-4 right-4 h-10 w-10 flex items-center justify-center bg-white/90 hover:bg-white transition-all",
              "opacity-0 group-hover:opacity-100"
            )}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isWishlisted
                  ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-[var(--color-charcoal)]"
              )}
            />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.tagline && (
          <p className="text-sm text-[var(--color-muted)] line-clamp-1">
            {product.tagline}
          </p>
        )}

        <div className="flex items-center gap-3 pt-1">
          <span className="text-base font-medium text-[var(--color-charcoal)]">
            From {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-[var(--color-muted)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.fabricCount && product.fabricCount > 0 && (
          <p className="text-xs text-[var(--color-muted)] pt-1">
            Available in {product.fabricCount}+ fabrics
          </p>
        )}
      </div>
    </div>
  );
}
