"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductSize, Fabric } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { ProductGallery } from "./ProductGallery";
import { SizeSelector } from "./SizeSelector";
import { FabricSelector } from "./FabricSelector";
import { ProductFeatures } from "./ProductFeatures";
import { ProductReviews } from "./ProductReviews";
import { RelatedProducts } from "./RelatedProducts";

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  // Get default size and fabric
  const defaultSize =
    product.sizes.find((s) => s.isDefault) || product.sizes[0];
  const defaultFabric =
    product.fabrics.find((f) => f.isDefault) || product.fabrics[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    defaultSize || null
  );
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(
    defaultFabric || null
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  const totalPrice = useMemo(() => {
    const sizePrice = selectedSize?.price || product.basePrice;
    const fabricPrice = selectedFabric?.price || 0;
    return sizePrice + fabricPrice;
  }, [selectedSize, selectedFabric, product.basePrice]);

  const originalTotalPrice = useMemo(() => {
    if (!selectedSize?.originalPrice) return null;
    const fabricPrice = selectedFabric?.price || 0;
    return selectedSize.originalPrice + fabricPrice;
  }, [selectedSize, selectedFabric]);

  // Map images for gallery
  const galleryImages = product.images.map((img) => ({
    id: img.id,
    src: img.url,
    alt: img.altText || product.name,
    type: img.type === "VIDEO_THUMBNAIL" ? "video-thumbnail" : "image",
  }));

  // Get category slug for breadcrumb
  const categorySlug = product.category.toLowerCase();
  const categoryName =
    product.category.charAt(0) + product.category.slice(1).toLowerCase();

  const whyWeLove = [
    {
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
      title: "Timeless Design",
      description:
        "Crafted with clean lines and elegant proportions that complement any interior style.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=600&fit=crop",
      title: "Premium Materials",
      description:
        "Only the finest fabrics and sustainably sourced hardwoods make it into our pieces.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop",
      title: "Built to Last",
      description:
        "Handcrafted by master artisans with techniques passed down through generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[100px]">
      {/* Breadcrumbs */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Link
            href="/"
            className="hover:text-[var(--color-charcoal)] transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/${categorySlug}`}
            className="hover:text-[var(--color-charcoal)] transition-colors"
          >
            {categoryName}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/${categorySlug}/${product.subcategory
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-[var(--color-charcoal)] transition-colors"
              >
                {product.subcategory}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-[var(--color-charcoal)]">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="w-full px-4 md:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery - Takes 7 columns */}
          <div className="lg:col-span-7 lg:sticky lg:top-[120px] lg:self-start">
            <ProductGallery images={galleryImages} productName={product.name} />
          </div>

          {/* Product info - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)] mb-3">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-lg text-[var(--color-warm-gray)] mb-4">
                  {product.tagline}
                </p>
              )}
              <div className="flex items-center gap-4">
                <StarRating
                  rating={product.averageRating}
                  showValue
                  totalReviews={product.totalReviews}
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-[var(--color-charcoal)]">
                {formatPrice(totalPrice)}
              </span>
              {originalTotalPrice && (
                <span className="text-lg text-[var(--color-muted)] line-through">
                  {formatPrice(originalTotalPrice)}
                </span>
              )}
            </div>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />
            )}

            {/* Fabric selector */}
            {product.fabrics.length > 0 && (
              <FabricSelector
                fabrics={product.fabrics}
                categories={product.fabricCategories}
                selectedFabric={selectedFabric}
                onFabricSelect={setSelectedFabric}
              />
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button size="xl" fullWidth>
                  Add to basket
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "h-16 w-16 flex-shrink-0 border-2 flex items-center justify-center transition-colors",
                    isWishlisted
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] hover:border-[var(--color-charcoal)]"
                  )}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className={cn("h-6 w-6", isWishlisted && "fill-current")}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <button className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <p className="text-[var(--color-muted)]">
                  Lead time:{" "}
                  <span className="text-[var(--color-charcoal)] font-medium">
                    {selectedSize?.leadTime || `${product.leadTimeDays} days`}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-[var(--color-cream-dark)]">
                <Truck className="h-5 w-5 text-[var(--color-charcoal)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-charcoal)] text-sm">
                    {product.deliveryInfo.price === 0
                      ? "Free Delivery"
                      : `${formatPrice(product.deliveryInfo.price)} Delivery`}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Expert 2-person team
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[var(--color-cream-dark)]">
                <RotateCcw className="h-5 w-5 text-[var(--color-charcoal)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-charcoal)] text-sm">
                    {product.returns.days} Day Trial
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Free returns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[var(--color-cream-dark)]">
                <Shield className="h-5 w-5 text-[var(--color-charcoal)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-charcoal)] text-sm">
                    {product.warranty.years} Year Guarantee
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Frame warranty
                  </p>
                </div>
              </div>
              <Link
                href="/showrooms"
                className="flex items-start gap-3 p-4 bg-[var(--color-cream-dark)] hover:bg-[var(--color-sand)] transition-colors"
              >
                <MapPin className="h-5 w-5 text-[var(--color-charcoal)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-charcoal)] text-sm">
                    Visit a Showroom
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    Try before you buy
                  </p>
                </div>
              </Link>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-[var(--color-warm-gray)] leading-relaxed whitespace-pre-line">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <ProductFeatures features={product.features} />
            )}

            {/* Accordions */}
            <Accordion allowMultiple defaultOpen={["specs"]}>
              {product.specifications.length > 0 && (
                <AccordionItem id="specs">
                  <AccordionTrigger id="specs">
                    <span className="text-lg font-medium">Specifications</span>
                  </AccordionTrigger>
                  <AccordionContent id="specs">
                    <div className="space-y-3">
                      {product.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2 border-b border-[var(--color-border)] last:border-0"
                        >
                          <span className="text-[var(--color-muted)]">
                            {spec.label}
                          </span>
                          <span className="text-[var(--color-charcoal)] text-right max-w-[60%]">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {selectedSize && (
                <AccordionItem id="dimensions">
                  <AccordionTrigger id="dimensions">
                    <span className="text-lg font-medium">Dimensions</span>
                  </AccordionTrigger>
                  <AccordionContent id="dimensions">
                    <div className="space-y-4">
                      <h4 className="font-medium text-[var(--color-charcoal)]">
                        {selectedSize.label}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                          <span className="text-[var(--color-muted)]">
                            Width
                          </span>
                          <span className="font-medium">
                            {selectedSize.dimensions.width}cm
                          </span>
                        </div>
                        <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                          <span className="text-[var(--color-muted)]">
                            Depth
                          </span>
                          <span className="font-medium">
                            {selectedSize.dimensions.depth}cm
                          </span>
                        </div>
                        <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                          <span className="text-[var(--color-muted)]">
                            Height
                          </span>
                          <span className="font-medium">
                            {selectedSize.dimensions.height}cm
                          </span>
                        </div>
                        {selectedSize.dimensions.seatHeight && (
                          <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                            <span className="text-[var(--color-muted)]">
                              Seat Height
                            </span>
                            <span className="font-medium">
                              {selectedSize.dimensions.seatHeight}cm
                            </span>
                          </div>
                        )}
                      </div>
                      {selectedSize.bedDimensions && (
                        <div>
                          <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                            Bed Dimensions
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                              <span className="text-[var(--color-muted)]">
                                Width
                              </span>
                              <span className="font-medium">
                                {selectedSize.bedDimensions.width}cm
                              </span>
                            </div>
                            <div className="flex justify-between p-3 bg-[var(--color-cream-dark)]">
                              <span className="text-[var(--color-muted)]">
                                Length
                              </span>
                              <span className="font-medium">
                                {selectedSize.bedDimensions.length}cm
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem id="delivery">
                <AccordionTrigger id="delivery">
                  <span className="text-lg font-medium">
                    Delivery &amp; Returns
                  </span>
                </AccordionTrigger>
                <AccordionContent id="delivery">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                        Delivery
                      </h4>
                      <p className="text-[var(--color-warm-gray)]">
                        {product.deliveryInfo.description ||
                          `White glove delivery by our expert 2-person team. ${
                            product.deliveryInfo.price === 0
                              ? "Free delivery."
                              : `Delivery cost: ${formatPrice(
                                  product.deliveryInfo.price
                                )}.`
                          }`}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                        Returns
                      </h4>
                      <p className="text-[var(--color-warm-gray)]">
                        {product.returns.description ||
                          `${product.returns.days}-day trial. If you're not completely satisfied, we'll arrange a free return.`}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {product.careInstructions.length > 0 && (
                <AccordionItem id="care">
                  <AccordionTrigger id="care">
                    <span className="text-lg font-medium">
                      Care Instructions
                    </span>
                  </AccordionTrigger>
                  <AccordionContent id="care">
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-[var(--color-warm-gray)]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-taupe)] mt-2 flex-shrink-0" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Why We Love Section */}
      <div className="bg-[var(--color-cream-dark)] py-20 md:py-28">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)] text-center mb-16">
            Why We Love the {product.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {whyWeLove.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative aspect-square mb-6 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-charcoal)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--color-warm-gray)] text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      {product.totalReviews > 0 && (
        <div className="bg-white py-16">
          <div className="w-full px-4 md:px-8 lg:px-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-charcoal)] mb-8">
              Customer Reviews
            </h2>
            <ProductReviews
              reviews={product.reviews}
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
            />
          </div>
        </div>
      )}

      {/* Related products */}
      {product.relatedProducts.length > 0 && (
        <div className="w-full px-4 md:px-8 lg:px-12 py-16">
          <RelatedProducts products={product.relatedProducts} />
        </div>
      )}

      {/* Made in section */}
      {product.madeIn && (
        <div className="bg-[var(--color-cream-dark)] py-16">
          <div className="w-full px-4 md:px-8 lg:px-12 text-center">
            <p className="text-sm text-[var(--color-muted)] mb-2">
              Handcrafted in
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-charcoal)]">
              {product.madeIn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
