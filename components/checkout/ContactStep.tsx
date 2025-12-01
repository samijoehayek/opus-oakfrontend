"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactInfo } from "@/types/checkout";

interface ContactStepProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  onNext: () => void;
  isLoggedIn: boolean;
  userEmail?: string;
}

export function ContactStep({
  data,
  onChange,
  onNext,
  isLoggedIn,
  userEmail,
}: ContactStepProps) {
  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactInfo> = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
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
        Contact Information
      </h2>

      {isLoggedIn && userEmail && (
        <div className="mb-6 p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-muted)]">Logged in as</p>
          <p className="font-medium text-[var(--color-charcoal)]">
            {userEmail}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => {
                onChange({ ...data, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 border focus:outline-none transition-colors",
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => {
                onChange({ ...data, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 border focus:outline-none transition-colors",
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
              placeholder="+961 70 123 456"
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
          )}
          <p className="mt-1.5 text-xs text-[var(--color-muted)]">
            For delivery updates and coordination
          </p>
        </div>

        {/* Marketing Consent */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() =>
                onChange({ ...data, marketingConsent: !data.marketingConsent })
              }
              className={cn(
                "w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors flex-shrink-0",
                data.marketingConsent
                  ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                  : "border-[var(--color-border)] group-hover:border-[var(--color-charcoal)]"
              )}
            >
              {data.marketingConsent && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="text-sm text-[var(--color-muted)]">
              Keep me updated on exclusive offers, new arrivals, and design
              inspiration
            </span>
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
        >
          Continue to Shipping
        </button>
      </div>
    </motion.div>
  );
}
