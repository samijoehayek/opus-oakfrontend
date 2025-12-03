"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { CategoryProduct } from "@/types/product";

interface ProductGridProps {
  products: CategoryProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full px-4 md:px-8 lg:px-12 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-[var(--color-cream-dark)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-[var(--color-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-[var(--color-charcoal)] text-lg font-medium mb-2">
            No products found
          </p>
          <p className="text-[var(--color-muted)]">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
