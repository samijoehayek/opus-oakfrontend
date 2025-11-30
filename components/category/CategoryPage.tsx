"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { CategoryHero } from "./CategoryHero";
import { CategoryIntro } from "./CategoryIntro";
import { CategoryFilter } from "./CategoryFilter";
import { ProductGrid } from "./ProductGrid";
import {
  getCategoryConfig,
  getProductsByCategory,
  CategoryProduct,
} from "@/data/categories";

interface CategoryPageProps {
  categorySlug: string;
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("featured");

  const config = getCategoryConfig(categorySlug);
  const categoryProducts = getProductsByCategory(categorySlug);

  if (!config) {
    notFound();
  }

  const sortedProducts = useMemo(() => {
    const products = [...categoryProducts];

    switch (sortBy) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "newest":
        return products.reverse();
      default:
        return products;
    }
  }, [categoryProducts, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[20px]">
      <CategoryHero
        title={config.title}
        description={config.description}
        heroImage={config.heroImage}
      />
      <CategoryIntro title={config.introTitle} text={config.introText} />
      <CategoryFilter
        totalProducts={sortedProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={sortedProducts} />
    </div>
  );
}
