"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    // Scroll thumbnails to keep selected in view
    const thumbsPerView = 4;
    const thumbScrollIndex = Math.floor(index / thumbsPerView) * thumbsPerView;
    thumbApi.scrollTo(
      Math.min(thumbScrollIndex, images.length - thumbsPerView)
    );
  }, [emblaApi, thumbApi, images.length]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-3">
      {/* Main image carousel */}
      <div className="relative group">
        <div
          className="overflow-hidden bg-[var(--color-cream-dark)]"
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
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {image.type === "video-thumbnail" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="h-16 w-16 bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Zoom button */}
        <button
          className="absolute right-4 bottom-4 h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Zoom image"
        >
          <ZoomIn className="h-5 w-5" />
        </button>

        {/* Image counter */}
        <div className="absolute left-4 bottom-4 bg-white/90 px-4 py-2 text-sm font-medium shadow-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip - single row, 4 visible at a time */}
      <div className="hidden md:block overflow-hidden" ref={thumbRef}>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollTo(index)}
              className={cn(
                "relative flex-[0_0_calc(25%-9px)] aspect-[4/3] overflow-hidden transition-all bg-[var(--color-cream-dark)]",
                selectedIndex === index
                  ? "ring-2 ring-[var(--color-charcoal)]"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="15vw"
              />
              {image.type === "video-thumbnail" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-5 w-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div className="flex md:hidden justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 transition-all",
              selectedIndex === index
                ? "w-8 bg-[var(--color-charcoal)]"
                : "w-2 bg-[var(--color-sand)]"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
