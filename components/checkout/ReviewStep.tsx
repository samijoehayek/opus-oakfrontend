"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Truck,
  Edit2,
  Check,
  Loader2,
  Shield,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ContactInfo,
  ShippingInfo,
  PaymentInfo,
  CheckoutStep,
} from "@/types/checkout";
import type { CartItem } from "@/types/cart";

interface ReviewStepProps {
  contact: ContactInfo;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  shippingMethodName: string;
  shippingCost: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onEdit: (step: CheckoutStep) => void;
  onBack: () => void;
  onPlaceOrder: () => Promise<void>;
}

export function ReviewStep({
  contact,
  shipping,
  payment,
  shippingMethodName,
  shippingCost,
  items,
  subtotal,
  tax,
  total,
  onEdit,
  onBack,
  onPlaceOrder,
}: ReviewStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) return;

    setIsProcessing(true);
    try {
      await onPlaceOrder();
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentMethodDisplay = () => {
    switch (payment.method) {
      case "card":
        return `Card ending in ${payment.cardNumber?.slice(-4)}`;
      case "cash_on_delivery":
        return "Cash on Delivery";
      case "bank_transfer":
        return "Bank Transfer";
      default:
        return "Unknown";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-charcoal)] mb-6">
        Review Your Order
      </h2>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--color-charcoal)]">
              Contact Information
            </h3>
            <button
              onClick={() => onEdit("contact")}
              className="flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
          <p className="text-sm text-[var(--color-charcoal)]">
            {contact.email}
          </p>
          <p className="text-sm text-[var(--color-muted)]">{contact.phone}</p>
        </div>

        {/* Shipping Address */}
        <div className="border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--color-charcoal)] flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <button
              onClick={() => onEdit("shipping")}
              className="flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
          <p className="text-sm text-[var(--color-charcoal)]">
            {shipping.firstName} {shipping.lastName}
          </p>
          {shipping.company && (
            <p className="text-sm text-[var(--color-muted)]">
              {shipping.company}
            </p>
          )}
          <p className="text-sm text-[var(--color-muted)]">
            {shipping.addressLine1}
          </p>
          {shipping.addressLine2 && (
            <p className="text-sm text-[var(--color-muted)]">
              {shipping.addressLine2}
            </p>
          )}
          <p className="text-sm text-[var(--color-muted)]">
            {shipping.city}, {shipping.region} {shipping.postalCode}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            {shipping.country}
          </p>
        </div>

        {/* Shipping Method */}
        <div className="border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--color-charcoal)] flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping Method
            </h3>
            <button
              onClick={() => onEdit("shipping")}
              className="flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
          <p className="text-sm text-[var(--color-charcoal)]">
            {shippingMethodName}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            ${shippingCost.toLocaleString()}
          </p>
        </div>

        {/* Payment Method */}
        <div className="border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--color-charcoal)] flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h3>
            <button
              onClick={() => onEdit("payment")}
              className="flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
          <p className="text-sm text-[var(--color-charcoal)]">
            {getPaymentMethodDisplay()}
          </p>
        </div>

        {/* Order Items */}
        <div className="border border-[var(--color-border)]">
          <div className="p-5 border-b border-[var(--color-border)]">
            <h3 className="font-medium text-[var(--color-charcoal)]">
              Order Items ({items.length})
            </h3>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex gap-4">
                <div className="relative w-20 h-20 bg-[var(--color-cream-dark)] flex-shrink-0">
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
                <div className="flex-1">
                  <p className="font-medium text-[var(--color-charcoal)]">
                    {item.productName}
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {Object.entries(item.configuration).map(([key, value]) => (
                      <p
                        key={key}
                        className="text-xs text-[var(--color-muted)]"
                      >
                        {key}: {value}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="font-medium text-[var(--color-charcoal)]">
                  ${item.totalPrice.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className={cn(
                "w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors flex-shrink-0",
                agreedToTerms
                  ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                  : "border-[var(--color-border)] group-hover:border-[var(--color-charcoal)]"
              )}
            >
              {agreedToTerms && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-sm text-[var(--color-charcoal)]">
              I agree to the{" "}
              <a href="/terms" className="underline hover:no-underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:no-underline">
                Privacy Policy
              </a>
              . I understand that my order is subject to the Opus&amp;Oak return
              policy.
            </span>
          </label>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <Lock className="h-4 w-4" />
            SSL Encrypted
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <Shield className="h-4 w-4" />
            Secure Payment
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-4 border border-[var(--color-border)] text-[var(--color-charcoal)] font-medium hover:bg-[var(--color-cream-dark)] transition-colors disabled:opacity-50 order-2 sm:order-1"
        >
          Back to Payment
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={!agreedToTerms || isProcessing}
          className={cn(
            "flex-1 py-4 font-medium flex items-center justify-center gap-2 transition-colors order-1 sm:order-2",
            agreedToTerms && !isProcessing
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-[var(--color-muted)] text-white cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              Place Order — ${total.toFixed(2)}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
