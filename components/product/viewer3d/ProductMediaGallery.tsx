"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Play,
  Maximize2,
  Minimize2,
  Box,
  Image as ImageIcon,
  RotateCcw,
  Move3D,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage, ProductModel } from "@/types/product";

// Dynamically import the 3D viewer to avoid SSR issues
const ModelViewer = dynamic(
  () => import("./ModelLoader").then((mod) => mod.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[var(--color-cream-dark)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-muted)]">
            Initializing 3D viewer...
          </p>
        </div>
      </div>
    ),
  }
);

// ============================================
// TYPES
// ============================================

type MediaType = "3d" | "image" | "video";

interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  alt: string;
  thumbnailUrl?: string;
}

interface ProductMediaGalleryProps {
  images: ProductImage[];
  model?: ProductModel;
  productName: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ProductMediaGallery({
  images,
  model,
  productName,
}: ProductMediaGalleryProps) {
  const [activeMediaType, setActiveMediaType] = useState<MediaType>(
    model ? "3d" : "image"
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Embla carousel for thumbnails
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Build media items list
  const mediaItems: MediaItem[] = [];

  // Add 3D model as first item if available
  if (model && model.isActive) {
    mediaItems.push({
      id: "3d-model",
      type: "3d",
      url: model.lowPolyUrl,
      alt: `${productName} 3D Model`,
      thumbnailUrl: model.posterUrl || images[0]?.url,
    });
  }

  // Add images
  images.forEach((img) => {
    mediaItems.push({
      id: img.id,
      type: img.type === "VIDEO_THUMBNAIL" ? "video" : "image",
      url: img.url,
      alt: img.altText || productName,
      thumbnailUrl: img.url,
    });
  });

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen();
      }
      if (e.key === "ArrowLeft" && activeMediaType === "image") {
        setSelectedImageIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        );
      }
      if (e.key === "ArrowRight" && activeMediaType === "image") {
        setSelectedImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, activeMediaType, images.length]);

  const scrollToThumbnail = useCallback(
    (index: number) => {
      thumbApi?.scrollTo(index);
    },
    [thumbApi]
  );

  const handleThumbnailClick = (item: MediaItem, index: number) => {
    if (item.type === "3d") {
      setActiveMediaType("3d");
    } else {
      setActiveMediaType("image");
      // Find the index within images only (excluding 3D)
      const imageIndex = model ? index - 1 : index;
      setSelectedImageIndex(Math.max(0, imageIndex));
    }
    scrollToThumbnail(index);
  };

  const handlePrevious = () => {
    if (activeMediaType === "image") {
      const newIndex =
        selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
      setSelectedImageIndex(newIndex);
      scrollToThumbnail(model ? newIndex + 1 : newIndex);
    }
  };

  const handleNext = () => {
    if (activeMediaType === "image") {
      const newIndex =
        selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
      setSelectedImageIndex(newIndex);
      scrollToThumbnail(model ? newIndex + 1 : newIndex);
    }
  };

  // Get current thumbnail index for highlight
  const currentThumbnailIndex =
    activeMediaType === "3d"
      ? 0
      : model
      ? selectedImageIndex + 1
      : selectedImageIndex;

  return (
    <div
      ref={containerRef}
      className={cn(
        "space-y-3",
        isFullscreen && "fixed inset-0 z-50 bg-black p-4 flex flex-col"
      )}
    >
      {/* Main viewer area */}
      <div
        className={cn(
          "relative group",
          isFullscreen ? "flex-1" : "aspect-[4/3]"
        )}
      >
        <div className="w-full h-full bg-[var(--color-cream-dark)] overflow-hidden">
          {/* 3D Model Viewer */}
          {activeMediaType === "3d" && model && (
            <ModelViewer
              model={model}
              isFullscreen={isFullscreen}
              onLoadComplete={() => setIs3DLoaded(true)}
            />
          )}

          {/* Image Viewer */}
          {activeMediaType === "image" && images[selectedImageIndex] && (
            <div className="relative w-full h-full">
              <Image
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].altText || productName}
                fill
                className="object-cover"
                priority
                sizes={
                  isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 60vw"
                }
              />
            </div>
          )}

          {/* Video thumbnail (placeholder - you can add video player) */}
          {activeMediaType === "video" && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImageIndex]?.url || ""}
                alt={productName}
                fill
                className="object-cover"
              />
              <button className="absolute h-20 w-20 bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                <Play className="h-8 w-8 text-[var(--color-charcoal)] ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation arrows (only for images) */}
        {activeMediaType === "image" && images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Top controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Media type toggle */}
          {model && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex overflow-hidden">
              <button
                onClick={() => setActiveMediaType("3d")}
                className={cn(
                  "px-3 py-2 flex items-center gap-2 text-sm font-medium transition-colors",
                  activeMediaType === "3d"
                    ? "bg-[var(--color-charcoal)] text-white"
                    : "text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)]"
                )}
              >
                <Box className="h-4 w-4" />
                3D
              </button>
              <button
                onClick={() => setActiveMediaType("image")}
                className={cn(
                  "px-3 py-2 flex items-center gap-2 text-sm font-medium transition-colors",
                  activeMediaType === "image"
                    ? "bg-[var(--color-charcoal)] text-white"
                    : "text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)]"
                )}
              >
                <ImageIcon className="h-4 w-4" />
                Photos
              </button>
            </div>
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 3D Controls hint (only when 3D is active) */}
        {activeMediaType === "3d" && is3DLoaded && !isFullscreen && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-4 text-white text-xs">
            <div className="flex items-center gap-1.5">
              <Move3D className="h-4 w-4" />
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ZoomIn className="h-4 w-4" />
              <span>Scroll to zoom</span>
            </div>
          </div>
        )}

        {/* Counter (for images) */}
        {activeMediaType === "image" && images.length > 1 && (
          <div className="absolute left-4 bottom-4 bg-white/90 px-4 py-2 text-sm font-medium shadow-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div
        className={cn(
          "hidden md:block overflow-hidden",
          isFullscreen && "bg-black/50 p-2 rounded-lg"
        )}
        ref={thumbRef}
      >
        <div className="flex gap-3">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleThumbnailClick(item, index)}
              className={cn(
                "relative flex-[0_0_calc(25%-9px)] aspect-[4/3] overflow-hidden transition-all",
                currentThumbnailIndex === index
                  ? "ring-2 ring-[var(--color-charcoal)]"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              {/* Thumbnail image */}
              <Image
                src={item.thumbnailUrl || item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="15vw"
              />

              {/* 3D badge */}
              {item.type === "3d" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-white/90 rounded-full p-2">
                    <Box className="h-5 w-5 text-[var(--color-charcoal)]" />
                  </div>
                </div>
              )}

              {/* Video badge */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-6 w-6 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div
        className={cn(
          "flex md:hidden justify-center gap-2",
          isFullscreen && "pb-4"
        )}
      >
        {mediaItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleThumbnailClick(item, index)}
            className={cn(
              "h-2 transition-all",
              currentThumbnailIndex === index
                ? "w-8 bg-[var(--color-charcoal)]"
                : item.type === "3d"
                ? "w-4 bg-[var(--color-primary)]"
                : "w-2 bg-[var(--color-sand)]"
            )}
            aria-label={item.type === "3d" ? "3D Model" : `Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
