"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ProductImage } from "@/app/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [emblaApi]
  );

  return (
    <div className="space-y-4">
      {/* Main image carousel */}
      <div className="relative group">
        <div
          className="overflow-hidden rounded-xl bg-[var(--color-cream-dark)]"
          ref={emblaRef}
        >
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative flex-[0_0_100%] min-w-0 aspect-[4/3]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {image.type === "video-thumbnail" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                      <Play className="h-6 w-6 text-[var(--color-charcoal)] ml-1" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Zoom button */}
        <button
          className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Zoom image"
        >
          <ZoomIn className="h-5 w-5" />
        </button>

        {/* Image counter */}
        <div className="absolute left-4 bottom-4 bg-white/90 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => scrollTo(index)}
            className={cn(
              "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all",
              selectedIndex === index
                ? "ring-2 ring-[var(--color-charcoal)] ring-offset-2"
                : "opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
            {image.type === "video-thumbnail" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="flex md:hidden justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              selectedIndex === index
                ? "w-6 bg-[var(--color-charcoal)]"
                : "w-2 bg-[var(--color-sand)]"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
