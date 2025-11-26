"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatPrice } from "@/app/lib/utils";
import { RelatedProduct } from "@/app/types";
import { useState } from "react";

interface ProductCardProps {
  product: RelatedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-cream)] mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <button
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted
                ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[var(--color-charcoal)]"
            }`}
          />
        </button>
      </div>
      <p className="text-sm text-[var(--color-muted)] mb-1">
        {product.category}
      </p>
      <h3 className="font-medium text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
        {product.name}
      </h3>
      <p className="font-medium text-[var(--color-charcoal)]">
        From {formatPrice(product.price)}
        {product.originalPrice && (
          <span className="ml-2 text-[var(--color-muted)] line-through text-sm">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </p>
    </Link>
  );
}
