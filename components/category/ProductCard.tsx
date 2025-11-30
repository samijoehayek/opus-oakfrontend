"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { CategoryProduct } from "@/data/categories";

interface ProductCardProps {
  product: CategoryProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasSecondImage = product.images.length > 1;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream-dark)]">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && hasSecondImage ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasSecondImage && (
            <Image
              src={product.images[1].src}
              alt={product.images[1].alt}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {product.badge && (
            <div className="absolute top-4 left-4 bg-[var(--color-charcoal)] text-white text-xs uppercase tracking-wide px-3 py-1.5">
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
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

      <div className="mt-4 space-y-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[var(--color-muted)]">{product.tagline}</p>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-base font-medium text-[var(--color-charcoal)]">
            From {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--color-muted)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.fabricCount && (
          <p className="text-xs text-[var(--color-muted)] pt-1">
            Available in {product.fabricCount}+ fabrics
          </p>
        )}
      </div>
    </div>
  );
}
