"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { formatPrice } from "@/app/lib/utils";
import { RelatedProduct } from "@/app/types";

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You might also like",
}: RelatedProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-charcoal)]">
          {title}
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-cream-dark)] transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-cream-dark)] transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: RelatedProduct }) {
  return (
    <div className="flex-[0_0_280px] md:flex-[0_0_320px] group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-cream-dark)] mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 280px, 320px"
          />
          <button
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist
            }}
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="text-xs text-[var(--color-muted)] mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
          <p className="font-medium text-[var(--color-charcoal)]">
            From {formatPrice(product.price)}
            {product.originalPrice && (
              <span className="ml-2 text-sm text-[var(--color-muted)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
}
