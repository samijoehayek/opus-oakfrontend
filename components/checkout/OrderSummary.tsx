"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Tag,
  X,
  Loader2,
  AlertCircle,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  shippingMethodName: string;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  onApplyPromo: (code: string) => Promise<boolean>;
  onRemovePromo: () => void;
}

export function OrderSummary({
  items,
  subtotal,
  shippingCost,
  shippingMethodName,
  tax,
  discount,
  total,
  promoCode,
  onApplyPromo,
  onRemovePromo,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;

    setIsApplyingPromo(true);
    setPromoError(null);

    const success = await onApplyPromo(promoInput);

    if (!success) {
      setPromoError("Invalid or expired promo code");
    } else {
      setPromoInput("");
    }

    setIsApplyingPromo(false);
  };

  return (
    <div className="bg-white border border-[var(--color-border)] sticky top-[80px]">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full p-4 flex items-center justify-between border-b border-[var(--color-border)]"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--color-charcoal)]">
            Order Summary
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[var(--color-charcoal)]">
            ${total.toFixed(2)}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-[var(--color-muted)]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[var(--color-muted)]" />
          )}
        </div>
      </button>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 border-b border-[var(--color-border)]">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)]">
          Order Summary
        </h2>
      </div>

      <AnimatePresence>
        {(isExpanded ||
          (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:!h-auto lg:!opacity-100"
          >
            {/* Items */}
            <div className="p-6 border-b border-[var(--color-border)] max-h-[300px] overflow-y-auto">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-[var(--color-cream-dark)] flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-charcoal)] text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-medium text-sm text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors line-clamp-1"
                      >
                        {item.productName}
                      </Link>
                      <div className="mt-0.5">
                        {Object.entries(item.configuration)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <p
                              key={key}
                              className="text-xs text-[var(--color-muted)] line-clamp-1"
                            >
                              {value}
                            </p>
                          ))}
                      </div>
                    </div>
                    <p className="font-medium text-sm text-[var(--color-charcoal)]">
                      ${item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="p-6 border-b border-[var(--color-border)]">
              {promoCode ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium text-sm">{promoCode}</span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError(null);
                      }}
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none text-sm"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={!promoInput || isApplyingPromo}
                      className="px-4 py-2 bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] text-sm font-medium hover:bg-[var(--color-sand)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isApplyingPromo ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {promoError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted)]">Subtotal</span>
                <span className="text-[var(--color-charcoal)]">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted)]">
                  Shipping ({shippingMethodName})
                </span>
                <span className="text-[var(--color-charcoal)]">
                  ${shippingCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-muted)]">
                  Estimated Tax (11%)
                </span>
                <span className="text-[var(--color-charcoal)]">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                <span className="font-medium text-[var(--color-charcoal)]">
                  Total
                </span>
                <span className="text-xl font-semibold text-[var(--color-charcoal)]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-6 bg-[var(--color-cream-dark)]/50 border-t border-[var(--color-border)]">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <Truck className="h-5 w-5 text-[var(--color-charcoal)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--color-muted)]">
                    White Glove
                    <br />
                    Delivery
                  </p>
                </div>
                <div>
                  <Shield className="h-5 w-5 text-[var(--color-charcoal)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--color-muted)]">
                    Secure
                    <br />
                    Checkout
                  </p>
                </div>
                <div>
                  <RotateCcw className="h-5 w-5 text-[var(--color-charcoal)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--color-muted)]">
                    14-Day
                    <br />
                    Returns
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
