"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Address } from "@/types/account";

interface SavedAddressesProps {
  addresses: Address[];
  onEdit?: (address: Address) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  onAdd?: () => void;
  maxDisplay?: number;
}

export function SavedAddresses({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  onAdd,
  maxDisplay = 2,
}: SavedAddressesProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const displayedAddresses = addresses.slice(0, maxDisplay);

  return (
    <div className="bg-white border border-[var(--color-border)]">
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-medium text-[var(--color-charcoal)]">
          Saved Addresses
        </h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            Add New
          </button>
        )}
      </div>

      {addresses.length === 0 ? (
        <div className="p-8 text-center">
          <MapPin className="h-12 w-12 text-[var(--color-muted)] mx-auto mb-4" />
          <h3 className="font-medium text-[var(--color-charcoal)] mb-2">
            No addresses saved
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Add an address for faster checkout.
          </p>
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Address
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-[var(--color-border)]">
          {displayedAddresses.map((address, index) => (
            <motion.div
              key={address.id}
              className="p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {address.fullName}
                    </p>
                    {address.isDefault && (
                      <span className="text-xs px-2 py-0.5 bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] font-medium">
                        Default
                      </span>
                    )}
                    {address.label && (
                      <span className="text-xs px-2 py-0.5 bg-[var(--color-sand)] text-[var(--color-warm-gray)]">
                        {address.label}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {address.city}, {address.region}{" "}
                    {address.postalCode && address.postalCode}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {address.country}
                  </p>
                  <p className="text-sm text-[var(--color-muted)] mt-1">
                    {address.phone}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {!address.isDefault && onSetDefault && (
                    <button
                      onClick={() => onSetDefault(address.id)}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)] transition-colors"
                      title="Set as default"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(address)}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <AnimatePresence>
                      {confirmDelete === address.id ? (
                        <motion.div
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <button
                            onClick={() => {
                              onDelete(address.id);
                              setConfirmDelete(null);
                            }}
                            className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 text-xs bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] hover:bg-[var(--color-sand)] transition-colors"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(address.id)}
                          className="p-2 text-[var(--color-muted)] hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {addresses.length > maxDisplay && (
            <div className="p-4 text-center">
              <a
                href="/account/addresses"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                View all {addresses.length} addresses
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
