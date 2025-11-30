"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountHeader } from "@/components/account";
import type { WishlistItem } from "@/types/account";

// Mock data
const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    productId: "prod-1",
    productName: "The Belmont Sofa",
    productSlug: "belmont-sofa",
    productImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    price: 4500,
    addedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    productId: "prod-2",
    productName: "The Windsor Armchair",
    productSlug: "windsor-armchair",
    productImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop",
    price: 2200,
    addedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "3",
    productId: "prod-3",
    productName: "The Mayfair Bed",
    productSlug: "mayfair-bed",
    productImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop",
    price: 3800,
    addedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "4",
    productId: "prod-4",
    productName: "The Harrington Table",
    productSlug: "harrington-table",
    productImage:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&h=600&fit=crop",
    price: 2800,
    addedAt: "2024-01-10T16:45:00Z",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const loadWishlist = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setWishlist(mockWishlist);
      setIsLoading(false);
    };
    loadWishlist();
  }, []);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    setRemovingId(null);
  };

  const handleClearAll = async () => {
    setWishlist([]);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-[var(--color-cream-dark)] animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-[var(--color-cream-dark)] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccountHeader
        title="Your Wishlist"
        description={`${wishlist.length} ${
          wishlist.length === 1 ? "item" : "items"
        } saved`}
        action={
          wishlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </button>
          )
        }
      />

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[var(--color-border)] p-12 text-center"
        >
          <Heart className="h-16 w-16 text-[var(--color-muted)] mx-auto mb-4" />
          <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-[var(--color-muted)] mb-6 max-w-md mx-auto">
            Save items you love by clicking the heart icon on any product.
            They'll appear here for easy access later.
          </p>
          <Link
            href="/sofas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "bg-white border border-[var(--color-border)] group",
                  removingId === item.id && "opacity-50"
                )}
              >
                {/* Image */}
                <Link
                  href={`/products/${item.productSlug}`}
                  className="block relative"
                >
                  <div className="relative aspect-square overflow-hidden bg-[var(--color-cream-dark)]">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[var(--color-charcoal)] opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={removingId === item.id}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4">
                  <Link href={`/products/${item.productSlug}`}>
                    <h3 className="font-medium text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {item.productName}
                    </h3>
                  </Link>
                  <p className="text-lg font-semibold text-[var(--color-charcoal)] mb-3">
                    ${item.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mb-4">
                    Added{" "}
                    {new Date(item.addedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${item.productSlug}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      View Product
                    </Link>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-2.5 border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                      disabled={removingId === item.id}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
