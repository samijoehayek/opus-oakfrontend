"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Banknote,
  Building2,
  Lock,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  PaymentInfo,
  PaymentMethod,
  ShippingInfo,
  BillingInfo,
} from "@/types/checkout";

interface PaymentStepProps {
  data: PaymentInfo;
  onChange: (data: PaymentInfo) => void;
  billingData: BillingInfo;
  onBillingChange: (data: BillingInfo) => void;
  shippingData: ShippingInfo;
  sameAsShipping: boolean;
  onSameAsShippingChange: (value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
  },
  {
    id: "cash_on_delivery",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: Building2,
  },
];

export function PaymentStep({
  data,
  onChange,
  billingData,
  onBillingChange,
  shippingData,
  sameAsShipping,
  onSameAsShippingChange,
  onNext,
  onBack,
}: PaymentStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardFocused, setCardFocused] = useState<string | null>(null);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return null;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (data.method === "card") {
      if (!data.cardNumber || data.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Valid card number is required";
      }
      if (!data.cardExpiry || data.cardExpiry.length < 5) {
        newErrors.cardExpiry = "Valid expiry date is required";
      }
      if (!data.cardCvc || data.cardCvc.length < 3) {
        newErrors.cardCvc = "Valid CVC is required";
      }
      if (!data.cardName) {
        newErrors.cardName = "Name on card is required";
      }
    }

    if (!sameAsShipping) {
      if (!billingData.firstName) newErrors.billingFirstName = "Required";
      if (!billingData.lastName) newErrors.billingLastName = "Required";
      if (!billingData.addressLine1) newErrors.billingAddress = "Required";
      if (!billingData.city) newErrors.billingCity = "Required";
      if (!billingData.region) newErrors.billingRegion = "Required";
      if (!billingData.country) newErrors.billingCountry = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
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
        Payment Method
      </h2>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-8">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onChange({ ...data, method: method.id })}
            className={cn(
              "w-full p-4 border text-left transition-all",
              data.method === method.id
                ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)]"
                : "border-[var(--color-border)] hover:border-[var(--color-charcoal)]"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  data.method === method.id
                    ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)]"
                    : "border-[var(--color-border)]"
                )}
              >
                {data.method === method.id && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "p-2 rounded",
                  data.method === method.id
                    ? "bg-[var(--color-charcoal)] text-white"
                    : "bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]"
                )}
              >
                <method.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-[var(--color-charcoal)]">
                  {method.name}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {method.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Card Details */}
      <AnimatePresence mode="wait">
        {data.method === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-[var(--color-cream-dark)] border border-[var(--color-border)] mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  Your payment information is encrypted
                </span>
              </div>

              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    Card Number *
                  </label>
                  <div
                    className={cn(
                      "relative border bg-white transition-colors",
                      cardFocused === "number"
                        ? "border-[var(--color-charcoal)]"
                        : errors.cardNumber
                        ? "border-red-400"
                        : "border-[var(--color-border)]"
                    )}
                  >
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
                    <input
                      type="text"
                      value={data.cardNumber || ""}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      onFocus={() => setCardFocused("number")}
                      onBlur={() => setCardFocused(null)}
                      maxLength={19}
                      className="w-full pl-12 pr-16 py-3.5 focus:outline-none bg-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                    {/* Card Type Icons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <div
                        className={cn(
                          "w-8 h-5 rounded bg-contain bg-center bg-no-repeat transition-opacity",
                          getCardType(data.cardNumber || "") === "visa"
                            ? "opacity-100"
                            : "opacity-30"
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 35'%3E%3Crect fill='%231a1f71' width='50' height='35' rx='4'/%3E%3Ctext x='25' y='22' text-anchor='middle' fill='white' font-size='12' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E")`,
                        }}
                      />
                      <div
                        className={cn(
                          "w-8 h-5 rounded bg-contain bg-center bg-no-repeat transition-opacity",
                          getCardType(data.cardNumber || "") === "mastercard"
                            ? "opacity-100"
                            : "opacity-30"
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 35'%3E%3Crect fill='%23000' width='50' height='35' rx='4'/%3E%3Ccircle cx='20' cy='17.5' r='10' fill='%23eb001b'/%3E%3Ccircle cx='30' cy='17.5' r='10' fill='%23f79e1b'/%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={data.cardExpiry || ""}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cardExpiry: formatExpiry(e.target.value),
                        })
                      }
                      onFocus={() => setCardFocused("expiry")}
                      onBlur={() => setCardFocused(null)}
                      maxLength={5}
                      className={cn(
                        "w-full px-4 py-3.5 border bg-white focus:outline-none transition-colors",
                        cardFocused === "expiry"
                          ? "border-[var(--color-charcoal)]"
                          : errors.cardExpiry
                          ? "border-red-400"
                          : "border-[var(--color-border)]"
                      )}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.cardExpiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                      CVC *
                      <button className="ml-1 text-[var(--color-muted)]">
                        <Info className="h-3.5 w-3.5 inline" />
                      </button>
                    </label>
                    <input
                      type="text"
                      value={data.cardCvc || ""}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          cardCvc: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      onFocus={() => setCardFocused("cvc")}
                      onBlur={() => setCardFocused(null)}
                      maxLength={4}
                      className={cn(
                        "w-full px-4 py-3.5 border bg-white focus:outline-none transition-colors",
                        cardFocused === "cvc"
                          ? "border-[var(--color-charcoal)]"
                          : errors.cardCvc
                          ? "border-red-400"
                          : "border-[var(--color-border)]"
                      )}
                      placeholder="123"
                    />
                    {errors.cardCvc && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    value={data.cardName || ""}
                    onChange={(e) =>
                      onChange({ ...data, cardName: e.target.value })
                    }
                    onFocus={() => setCardFocused("name")}
                    onBlur={() => setCardFocused(null)}
                    className={cn(
                      "w-full px-4 py-3.5 border bg-white focus:outline-none transition-colors",
                      cardFocused === "name"
                        ? "border-[var(--color-charcoal)]"
                        : errors.cardName
                        ? "border-red-400"
                        : "border-[var(--color-border)]"
                    )}
                    placeholder="John Doe"
                  />
                  {errors.cardName && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.cardName}
                    </p>
                  )}
                </div>

                {/* Save Card */}
                <label className="flex items-center gap-3 cursor-pointer group pt-2">
                  <div
                    onClick={() =>
                      onChange({ ...data, saveCard: !data.saveCard })
                    }
                    className={cn(
                      "w-5 h-5 border flex items-center justify-center transition-colors",
                      data.saveCard
                        ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                        : "border-[var(--color-border)] group-hover:border-[var(--color-charcoal)]"
                    )}
                  >
                    {data.saveCard && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-[var(--color-charcoal)]">
                    Save this card for future purchases
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {data.method === "cash_on_delivery" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-amber-50 border border-amber-200 mb-8">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Cash on Delivery Information
                  </p>
                  <ul className="mt-2 text-sm text-amber-700 space-y-1">
                    <li>• A 5% COD fee will be added to your order</li>
                    <li>• Please have exact change ready</li>
                    <li>• Our delivery team will contact you before arrival</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {data.method === "bank_transfer" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-blue-50 border border-blue-200 mb-8">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">
                    Bank Transfer Details
                  </p>
                  <p className="mt-2 text-sm text-blue-700">
                    After placing your order, you&apos;ll receive bank details
                    via email. Your order will be processed once payment is
                    confirmed.
                  </p>
                  <div className="mt-4 p-3 bg-white rounded text-sm">
                    <p className="text-[var(--color-charcoal)]">
                      <strong>Bank:</strong> Bank of Beirut
                    </p>
                    <p className="text-[var(--color-charcoal)]">
                      <strong>Account:</strong> Opus&amp;Oak SARL
                    </p>
                    <p className="text-[var(--color-muted)] text-xs mt-2">
                      Full details will be sent after order confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Billing Address */}
      <div className="mt-8">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-4">
          Billing Address
        </h3>

        <label className="flex items-center gap-3 cursor-pointer group mb-4">
          <div
            onClick={() => onSameAsShippingChange(!sameAsShipping)}
            className={cn(
              "w-5 h-5 border flex items-center justify-center transition-colors",
              sameAsShipping
                ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                : "border-[var(--color-border)] group-hover:border-[var(--color-charcoal)]"
            )}
          >
            {sameAsShipping && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="text-sm text-[var(--color-charcoal)]">
            Same as shipping address
          </span>
        </label>

        {sameAsShipping && (
          <div className="p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
            <p className="font-medium text-[var(--color-charcoal)]">
              {shippingData.firstName} {shippingData.lastName}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {shippingData.addressLine1}
              {shippingData.addressLine2 && `, ${shippingData.addressLine2}`}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {shippingData.city}, {shippingData.region}{" "}
              {shippingData.postalCode}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {shippingData.country}
            </p>
          </div>
        )}

        <AnimatePresence>
          {!sameAsShipping && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={billingData.firstName}
                    onChange={(e) =>
                      onBillingChange({
                        ...billingData,
                        firstName: e.target.value,
                      })
                    }
                    className={cn(
                      "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                      errors.billingFirstName
                        ? "border-red-400"
                        : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={billingData.lastName}
                    onChange={(e) =>
                      onBillingChange({
                        ...billingData,
                        lastName: e.target.value,
                      })
                    }
                    className={cn(
                      "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                      errors.billingLastName
                        ? "border-red-400"
                        : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={billingData.addressLine1}
                  onChange={(e) =>
                    onBillingChange({
                      ...billingData,
                      addressLine1: e.target.value,
                    })
                  }
                  className={cn(
                    "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                    errors.billingAddress
                      ? "border-red-400"
                      : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={billingData.city}
                    onChange={(e) =>
                      onBillingChange({ ...billingData, city: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                      errors.billingCity
                        ? "border-red-400"
                        : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                    Region *
                  </label>
                  <input
                    type="text"
                    value={billingData.region}
                    onChange={(e) =>
                      onBillingChange({
                        ...billingData,
                        region: e.target.value,
                      })
                    }
                    className={cn(
                      "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                      errors.billingRegion
                        ? "border-red-400"
                        : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  value={billingData.country}
                  onChange={(e) =>
                    onBillingChange({ ...billingData, country: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                    errors.billingCountry
                      ? "border-red-400"
                      : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                  )}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 border border-[var(--color-border)] text-[var(--color-charcoal)] font-medium hover:bg-[var(--color-cream-dark)] transition-colors order-2 sm:order-1"
        >
          Back to Shipping
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-4 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors order-1 sm:order-2"
        >
          Review Order
        </button>
      </div>
    </motion.div>
  );
}
