"use client";

import { ProductCard } from "./ProductCard";
import { CategoryProduct } from "@/app/data/categories";

interface ProductGridProps {
  products: CategoryProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-12 py-20 text-center">
        <p className="text-[var(--color-muted)] text-lg">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
