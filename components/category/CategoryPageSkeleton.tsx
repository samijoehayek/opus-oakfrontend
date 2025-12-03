"use client";

import { motion } from "framer-motion";

export function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[20px]">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] md:h-[60vh] bg-[var(--color-cream-dark)] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="h-12 md:h-16 w-64 bg-[var(--color-sand)] rounded mx-auto mb-4" />
            <div className="h-6 w-96 max-w-full bg-[var(--color-sand)] rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* Intro Skeleton */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="max-w-3xl">
          <div className="h-8 w-48 bg-[var(--color-cream-dark)] rounded mb-4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-[var(--color-cream-dark)] rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-[var(--color-cream-dark)] rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-[var(--color-cream-dark)] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filter Skeleton */}
      <div className="border-b border-[var(--color-border)]">
        <div className="w-full px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-[var(--color-cream-dark)] rounded animate-pulse" />
            <div className="h-4 w-32 bg-[var(--color-cream-dark)] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image Skeleton */}
              <div className="aspect-[4/3] bg-[var(--color-cream-dark)] animate-pulse" />

              {/* Content Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-6 w-3/4 bg-[var(--color-cream-dark)] rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-[var(--color-cream-dark)] rounded animate-pulse" />
                <div className="h-5 w-24 bg-[var(--color-cream-dark)] rounded animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
