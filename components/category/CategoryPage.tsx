"use client";

import { useState, useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import { CategoryHero } from "./CategoryHero";
import { CategoryIntro } from "./CategoryIntro";
import { CategoryFilter } from "./CategoryFilter";
import { ProductGrid } from "./ProductGrid";
import { CategoryPageSkeleton } from "./CategoryPageSkeleton";
import { productsService } from "@/services/product.service";
import type {
  ProductListItem, // Changed from Product
  CategoryMetadata,
  ProductSortBy,
  CategoryProduct,
} from "@/types/product";

interface CategoryPageProps {
  categorySlug: string;
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<ProductSortBy>("featured");
  const [products, setProducts] = useState<ProductListItem[]>([]); // Changed from Product[]
  const [categoryMetadata, setCategoryMetadata] =
    useState<CategoryMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch category metadata and products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch both in parallel
        const [metadata, productList] = await Promise.all([
          productsService.getCategoryMetadata(categorySlug),
          productsService.getProductsByCategory(categorySlug, sortBy),
        ]);

        setCategoryMetadata(metadata);
        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, sortBy]);

  // Map products to CategoryProduct format for ProductCard
  const categoryProducts: CategoryProduct[] = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline || product.description.slice(0, 100),
      price: product.basePrice,
      originalPrice: product.originalPrice,
      images: product.images.map((img) => ({
        src: img.url,
        alt: img.altText || product.name,
      })),
      badge: product.badge,
      fabricCount: product.optionCount > 0 ? product.optionCount : undefined,
    }));
  }, [products]);

  // Show loading skeleton
  if (isLoading) {
    return <CategoryPageSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-[88px] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-[var(--color-charcoal)] text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show 404 if no metadata found
  if (!categoryMetadata) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[20px]">
      <CategoryHero
        title={categoryMetadata.title}
        description={categoryMetadata.description}
        heroImage={categoryMetadata.heroImage}
      />
      <CategoryIntro
        title={categoryMetadata.introTitle}
        text={categoryMetadata.introText}
      />
      <CategoryFilter
        totalProducts={categoryProducts.length}
        sortBy={sortBy}
        onSortChange={(value) => setSortBy(value as ProductSortBy)}
      />
      <ProductGrid products={categoryProducts} />
    </div>
  );
}
