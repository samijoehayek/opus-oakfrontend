"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { StarRating } from "@/app/components/ui/StarRating";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/Accordion";
import { SizeSelector } from "./SizeSelector";
import { FabricSelector } from "./FabricSelector";
import { ProductFeatures } from "./ProductFeatures";
import { formatPrice } from "@/app/lib/utils";
import { Product, ProductSize, Fabric } from "@/app/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[1] || product.sizes[0]
  );
  const [selectedFabric, setSelectedFabric] = useState<Fabric>(
    product.fabrics[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const totalPrice = useMemo(() => {
    const basePrice = selectedSize?.price || 0;
    const fabricPrice = selectedFabric?.price || 0;
    return (basePrice + fabricPrice) * quantity;
  }, [selectedSize, selectedFabric, quantity]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // Add to cart logic here
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link
          href="/"
          className="hover:text-[var(--color-charcoal)] transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/sofas"
          className="hover:text-[var(--color-charcoal)] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/sofas/sofa-beds"
          className="hover:text-[var(--color-charcoal)] transition-colors"
        >
          {product.subcategory}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[var(--color-charcoal)]">{product.name}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-start gap-3 mb-3">
          {product.badges.map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)] mb-2">
          {product.name}
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-3">
          {product.tagline}
        </p>
        <div className="flex items-center gap-4">
          <StarRating
            rating={product.averageRating}
            showValue
            totalReviews={product.totalReviews}
          />
        </div>
      </div>

      {/* Price */}
      <div className="pb-6 border-b border-[var(--color-border)]">
        <p className="text-3xl font-medium text-[var(--color-charcoal)]">
          {formatPrice(totalPrice)}
        </p>
        {selectedFabric?.price > 0 && (
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Includes {formatPrice(selectedFabric.price)} for{" "}
            {selectedFabric.name} fabric
          </p>
        )}
        <p className="text-sm text-[var(--color-muted)] mt-2">
          Or from {formatPrice(Math.round(totalPrice / 24))}/month with 0%
          finance
        </p>
      </div>

      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />

      {/* Fabric Selection */}
      <FabricSelector
        fabrics={product.fabrics}
        categories={product.fabricCategories}
        selectedFabric={selectedFabric}
        onFabricSelect={setSelectedFabric}
      />

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-[var(--color-charcoal)]">
          Quantity
        </label>
        <div className="flex items-center border border-[var(--color-border)] rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 flex items-center justify-center hover:bg-[var(--color-cream-dark)] transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 flex items-center justify-center hover:bg-[var(--color-cream-dark)] transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <Button
          size="xl"
          fullWidth
          onClick={handleAddToCart}
          isLoading={isAddingToCart}
        >
          Add to basket – {formatPrice(totalPrice)}
        </Button>
        <Button variant="secondary" size="lg" fullWidth>
          <Heart className="h-5 w-5" />
          Add to wishlist
        </Button>
      </div>

      {/* Delivery info highlights */}
      <div className="grid grid-cols-3 gap-4 py-6 border-y border-[var(--color-border)]">
        <div className="text-center">
          <Truck className="h-6 w-6 mx-auto mb-2 text-[var(--color-charcoal)]" />
          <p className="text-sm font-medium text-[var(--color-charcoal)]">
            {selectedSize?.leadTime}
          </p>
          <p className="text-xs text-[var(--color-muted)]">Delivery</p>
        </div>
        <div className="text-center">
          <RotateCcw className="h-6 w-6 mx-auto mb-2 text-[var(--color-charcoal)]" />
          <p className="text-sm font-medium text-[var(--color-charcoal)]">
            {product.returns.days} days
          </p>
          <p className="text-xs text-[var(--color-muted)]">Home trial</p>
        </div>
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto mb-2 text-[var(--color-charcoal)]" />
          <p className="text-sm font-medium text-[var(--color-charcoal)]">
            {product.warranty.years} years
          </p>
          <p className="text-xs text-[var(--color-muted)]">Frame guarantee</p>
        </div>
      </div>

      {/* Product features */}
      <ProductFeatures features={product.features} />

      {/* Accordion sections */}
      <Accordion defaultOpen={["description"]} allowMultiple>
        <AccordionItem id="description">
          <AccordionTrigger id="description">
            <span className="text-lg font-medium">Description</span>
          </AccordionTrigger>
          <AccordionContent id="description">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line">{product.longDescription}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="specifications">
          <AccordionTrigger id="specifications">
            <span className="text-lg font-medium">Specifications</span>
          </AccordionTrigger>
          <AccordionContent id="specifications">
            <dl className="space-y-3">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex gap-4">
                  <dt className="w-32 flex-shrink-0 font-medium text-[var(--color-charcoal)]">
                    {spec.label}
                  </dt>
                  <dd className="text-[var(--color-muted)]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="dimensions">
          <AccordionTrigger id="dimensions">
            <span className="text-lg font-medium">Dimensions</span>
          </AccordionTrigger>
          <AccordionContent id="dimensions">
            {selectedSize && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                    <p className="text-sm text-[var(--color-muted)] mb-1">
                      Width
                    </p>
                    <p className="text-lg font-medium">
                      {selectedSize.dimensions.width} cm
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                    <p className="text-sm text-[var(--color-muted)] mb-1">
                      Depth
                    </p>
                    <p className="text-lg font-medium">
                      {selectedSize.dimensions.depth} cm
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                    <p className="text-sm text-[var(--color-muted)] mb-1">
                      Height
                    </p>
                    <p className="text-lg font-medium">
                      {selectedSize.dimensions.height} cm
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                    <p className="text-sm text-[var(--color-muted)] mb-1">
                      Seat Height
                    </p>
                    <p className="text-lg font-medium">
                      {selectedSize.dimensions.seatHeight} cm
                    </p>
                  </div>
                </div>
                {selectedSize.bedDimensions && (
                  <div>
                    <p className="font-medium mb-2">Bed Dimensions</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                        <p className="text-sm text-[var(--color-muted)] mb-1">
                          Bed Width
                        </p>
                        <p className="text-lg font-medium">
                          {selectedSize.bedDimensions.width} cm
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-cream-dark)] rounded-lg">
                        <p className="text-sm text-[var(--color-muted)] mb-1">
                          Bed Length
                        </p>
                        <p className="text-lg font-medium">
                          {selectedSize.bedDimensions.length} cm
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="delivery">
          <AccordionTrigger id="delivery">
            <span className="text-lg font-medium">Delivery & Returns</span>
          </AccordionTrigger>
          <AccordionContent id="delivery">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                  Delivery
                </h4>
                <p>{product.deliveryInfo.description}</p>
                <p className="mt-2">
                  Delivery cost:{" "}
                  <strong>{formatPrice(product.deliveryInfo.price)}</strong>
                </p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                  Returns
                </h4>
                <p>{product.returns.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--color-charcoal)] mb-2">
                  Assembly
                </h4>
                <p>{product.assembly}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="care">
          <AccordionTrigger id="care">
            <span className="text-lg font-medium">Care Instructions</span>
          </AccordionTrigger>
          <AccordionContent id="care">
            <ul className="space-y-2">
              {product.careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)] mt-1">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Made in */}
      <div className="p-6 bg-[var(--color-cream-dark)] rounded-xl text-center">
        <p className="text-sm text-[var(--color-muted)] mb-1">Handcrafted in</p>
        <p className="font-medium text-[var(--color-charcoal)]">
          {product.madeIn}
        </p>
      </div>
    </div>
  );
}
