"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight, X, ShoppingBag } from "lucide-react";
import type { WishlistItem } from "@/types/account";

interface WishlistPreviewProps {
  items: WishlistItem[];
  onRemove?: (productId: string) => void;
  maxDisplay?: number;
}

export function WishlistPreview({
  items,
  onRemove,
  maxDisplay = 4,
}: WishlistPreviewProps) {
  const displayedItems = items.slice(0, maxDisplay);

  return (
    <div className="bg-white border border-[var(--color-border)]">
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-medium text-[var(--color-charcoal)]">
          Your Wishlist
        </h3>
        <Link
          href="/account/wishlist"
          className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          View All ({items.length})
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center">
          <Heart className="h-12 w-12 text-[var(--color-muted)] mx-auto mb-4" />
          <h3 className="font-medium text-[var(--color-charcoal)] mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Save items you love for later.
          </p>
          <Link
            href="/sofas"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/products/${item.productSlug}`}>
                <div className="relative aspect-square bg-[var(--color-cream-dark)] overflow-hidden mb-2">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {onRemove && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onRemove(item.productId);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-[var(--color-charcoal)] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <p className="text-sm font-medium text-[var(--color-charcoal)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {item.productName}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  ${item.price.toLocaleString()}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
