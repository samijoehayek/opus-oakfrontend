"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Truck,
  Zap,
  Star,
  ChevronDown,
  Check,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShippingInfo, ShippingMethod } from "@/types/checkout";
import type { Address } from "@/types/account";

interface ShippingStepProps {
  data: ShippingInfo;
  onChange: (data: ShippingInfo) => void;
  onNext: () => void;
  onBack: () => void;
  selectedShippingMethod: string;
  onShippingMethodChange: (methodId: string) => void;
  savedAddresses?: Address[];
  isLoggedIn: boolean;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Curbside delivery to your address",
    price: 150,
    estimatedDays: "5-7 business days",
    icon: "standard",
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Priority handling and faster shipping",
    price: 300,
    estimatedDays: "2-3 business days",
    icon: "express",
  },
  {
    id: "white_glove",
    name: "White Glove Service",
    description: "In-home delivery, assembly & packaging removal",
    price: 500,
    estimatedDays: "7-10 business days",
    icon: "white_glove",
  },
];

const countries = [
  "Lebanon",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Egypt",
];

const lebaneseRegions = [
  "Beirut",
  "Mount Lebanon",
  "North Lebanon",
  "South Lebanon",
  "Bekaa",
  "Nabatieh",
  "Akkar",
  "Baalbek-Hermel",
];

export function ShippingStep({
  data,
  onChange,
  onNext,
  onBack,
  selectedShippingMethod,
  onShippingMethodChange,
  savedAddresses = [],
  isLoggedIn,
}: ShippingStepProps) {
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [showSavedAddresses, setShowSavedAddresses] = useState(
    savedAddresses.length > 0
  );
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const validate = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!data.city) newErrors.city = "City is required";
    if (!data.region) newErrors.region = "Region is required";
    if (!data.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleSelectSavedAddress = (address: Address) => {
    setSelectedAddressId(address.id);
    onChange({
      firstName: address.fullName.split(" ")[0],
      lastName: address.fullName.split(" ").slice(1).join(" "),
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      region: address.region,
      postalCode: address.postalCode,
      country: address.country,
    });
  };

  const getShippingIcon = (icon: string) => {
    switch (icon) {
      case "express":
        return <Zap className="h-5 w-5" />;
      case "white_glove":
        return <Star className="h-5 w-5" />;
      default:
        return <Truck className="h-5 w-5" />;
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
        Shipping Address
      </h2>

      {/* Saved Addresses */}
      {isLoggedIn && savedAddresses.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowSavedAddresses(!showSavedAddresses)}
            className="flex items-center justify-between w-full p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[var(--color-charcoal)]" />
              <span className="font-medium text-[var(--color-charcoal)]">
                Use a saved address
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-[var(--color-muted)] transition-transform",
                showSavedAddresses && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {showSavedAddresses && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border border-t-0 border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                  {savedAddresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => handleSelectSavedAddress(address)}
                      className={cn(
                        "w-full p-4 text-left hover:bg-[var(--color-cream-dark)] transition-colors flex items-start gap-3",
                        selectedAddressId === address.id &&
                          "bg-[var(--color-cream-dark)]"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                          selectedAddressId === address.id
                            ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)]"
                            : "border-[var(--color-border)]"
                        )}
                      >
                        {selectedAddressId === address.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[var(--color-charcoal)]">
                            {address.fullName}
                          </p>
                          {address.label && (
                            <span className="text-xs px-2 py-0.5 bg-[var(--color-sand)] text-[var(--color-warm-gray)]">
                              {address.label}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--color-muted)]">
                          {address.addressLine1}, {address.city},{" "}
                          {address.region}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Address Form */}
      <div className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => {
                onChange({ ...data, firstName: e.target.value });
                setSelectedAddressId(null);
                if (errors.firstName)
                  setErrors({ ...errors, firstName: undefined });
              }}
              className={cn(
                "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                errors.firstName
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => {
                onChange({ ...data, lastName: e.target.value });
                setSelectedAddressId(null);
                if (errors.lastName)
                  setErrors({ ...errors, lastName: undefined });
              }}
              className={cn(
                "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                errors.lastName
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
            />
            {errors.lastName && (
              <p className="mt-1.5 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Company (Optional) */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Company{" "}
            <span className="text-[var(--color-muted)]">(Optional)</span>
          </label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
            <input
              type="text"
              value={data.company || ""}
              onChange={(e) => onChange({ ...data, company: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
              placeholder="Company name"
            />
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
            <input
              type="text"
              value={data.addressLine1}
              onChange={(e) => {
                onChange({ ...data, addressLine1: e.target.value });
                setSelectedAddressId(null);
                if (errors.addressLine1)
                  setErrors({ ...errors, addressLine1: undefined });
              }}
              className={cn(
                "w-full pl-12 pr-4 py-3.5 border focus:outline-none transition-colors",
                errors.addressLine1
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
              placeholder="Street address"
            />
          </div>
          {errors.addressLine1 && (
            <p className="mt-1.5 text-sm text-red-500">{errors.addressLine1}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Apartment, suite, etc.{" "}
            <span className="text-[var(--color-muted)]">(Optional)</span>
          </label>
          <input
            type="text"
            value={data.addressLine2 || ""}
            onChange={(e) =>
              onChange({ ...data, addressLine2: e.target.value })
            }
            className="w-full px-4 py-3.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
            placeholder="Apartment, suite, floor, etc."
          />
        </div>

        {/* City & Region */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              City *
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => {
                onChange({ ...data, city: e.target.value });
                setSelectedAddressId(null);
                if (errors.city) setErrors({ ...errors, city: undefined });
              }}
              className={cn(
                "w-full px-4 py-3.5 border focus:outline-none transition-colors",
                errors.city
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
            />
            {errors.city && (
              <p className="mt-1.5 text-sm text-red-500">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              Region *
            </label>
            <select
              value={data.region}
              onChange={(e) => {
                onChange({ ...data, region: e.target.value });
                setSelectedAddressId(null);
                if (errors.region) setErrors({ ...errors, region: undefined });
              }}
              className={cn(
                "w-full px-4 py-3.5 border focus:outline-none transition-colors appearance-none bg-white",
                errors.region
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
            >
              <option value="">Select region</option>
              {lebaneseRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="mt-1.5 text-sm text-red-500">{errors.region}</p>
            )}
          </div>
        </div>

        {/* Postal Code & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              Postal Code{" "}
              <span className="text-[var(--color-muted)]">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.postalCode || ""}
              onChange={(e) =>
                onChange({ ...data, postalCode: e.target.value })
              }
              className="w-full px-4 py-3.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
              Country *
            </label>
            <select
              value={data.country}
              onChange={(e) => {
                onChange({ ...data, country: e.target.value });
                setSelectedAddressId(null);
                if (errors.country)
                  setErrors({ ...errors, country: undefined });
              }}
              className={cn(
                "w-full px-4 py-3.5 border focus:outline-none transition-colors appearance-none bg-white",
                errors.country
                  ? "border-red-400 focus:border-red-500"
                  : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
              )}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1.5 text-sm text-red-500">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Delivery Instructions */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-2">
            Delivery Instructions{" "}
            <span className="text-[var(--color-muted)]">(Optional)</span>
          </label>
          <textarea
            value={data.deliveryInstructions || ""}
            onChange={(e) =>
              onChange({ ...data, deliveryInstructions: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-3.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors resize-none"
            placeholder="Gate code, building entrance, etc."
          />
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="mt-10">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-4">
          Shipping Method
        </h3>

        <div className="space-y-3">
          {shippingMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onShippingMethodChange(method.id)}
              className={cn(
                "w-full p-4 border text-left transition-all",
                selectedShippingMethod === method.id
                  ? "border-[var(--color-charcoal)] bg-[var(--color-cream-dark)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-charcoal)]"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                      selectedShippingMethod === method.id
                        ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)]"
                        : "border-[var(--color-border)]"
                    )}
                  >
                    {selectedShippingMethod === method.id && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "p-1.5 rounded",
                          selectedShippingMethod === method.id
                            ? "bg-[var(--color-charcoal)] text-white"
                            : "bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]"
                        )}
                      >
                        {getShippingIcon(method.icon)}
                      </span>
                      <p className="font-medium text-[var(--color-charcoal)]">
                        {method.name}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] mt-1">
                      {method.description}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {method.estimatedDays}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-[var(--color-charcoal)]">
                  ${method.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="px-6 py-4 border border-[var(--color-border)] text-[var(--color-charcoal)] font-medium hover:bg-[var(--color-cream-dark)] transition-colors order-2 sm:order-1"
        >
          Back to Contact
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-4 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors order-1 sm:order-2"
        >
          Continue to Payment
        </button>
      </div>
    </motion.div>
  );
}
