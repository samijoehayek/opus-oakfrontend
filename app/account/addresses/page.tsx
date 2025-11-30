"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  Home,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountHeader } from "@/components/account";
import type { Address } from "@/types/account";

// Mock data
const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    fullName: "John Doe",
    phone: "+961 70 123 456",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "Beirut",
    region: "Beirut",
    postalCode: "1100",
    country: "Lebanon",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    fullName: "John Doe",
    phone: "+961 71 987 654",
    addressLine1: "456 Business Tower",
    addressLine2: "Floor 12",
    city: "Beirut",
    region: "Beirut",
    postalCode: "1200",
    country: "Lebanon",
    isDefault: false,
  },
];

const emptyAddress: Omit<Address, "id"> = {
  label: "",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "Lebanon",
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>(emptyAddress);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const loadAddresses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAddresses(mockAddresses);
      setIsLoading(false);
    };
    loadAddresses();
  }, []);

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData(emptyAddress);
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label || "",
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      region: address.region,
      postalCode: address.postalCode || "",
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setFormData(emptyAddress);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...formData } : addr
        )
      );
    } else {
      const newAddress: Address = {
        ...formData,
        id: `addr-${Date.now()}`,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }

    setIsSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setDeleteConfirm(null);
  };

  const handleSetDefault = async (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-[var(--color-cream-dark)] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-[var(--color-cream-dark)] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccountHeader
        title="Saved Addresses"
        description="Manage your delivery addresses"
        action={
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        }
      />

      {addresses.length === 0 ? (
        <div className="bg-white border border-[var(--color-border)] p-12 text-center">
          <MapPin className="h-16 w-16 text-[var(--color-muted)] mx-auto mb-4" />
          <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-2">
            No addresses saved
          </h3>
          <p className="text-[var(--color-muted)] mb-6">
            Add your first address for faster checkout.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "bg-white border p-6 relative",
                address.isDefault
                  ? "border-[var(--color-charcoal)]"
                  : "border-[var(--color-border)]"
              )}
            >
              {/* Labels */}
              <div className="flex items-center gap-2 mb-4">
                {address.label && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-[var(--color-cream-dark)] text-[var(--color-charcoal)]">
                    {address.label === "Home" ? (
                      <Home className="h-3 w-3" />
                    ) : address.label === "Office" ? (
                      <Building className="h-3 w-3" />
                    ) : null}
                    {address.label}
                  </span>
                )}
                {address.isDefault && (
                  <span className="text-xs font-medium px-2.5 py-1 bg-[var(--color-charcoal)] text-white">
                    Default
                  </span>
                )}
              </div>

              {/* Address details */}
              <div className="space-y-1 mb-6">
                <p className="font-medium text-[var(--color-charcoal)]">
                  {address.fullName}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {address.addressLine1}
                </p>
                {address.addressLine2 && (
                  <p className="text-sm text-[var(--color-muted)]">
                    {address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-[var(--color-muted)]">
                  {address.city}, {address.region} {address.postalCode}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {address.country}
                </p>
                <p className="text-sm text-[var(--color-muted)] pt-2">
                  {address.phone}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-charcoal)] border border-[var(--color-border)] hover:bg-[var(--color-cream-dark)] transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => openEditModal(address)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-charcoal)] border border-[var(--color-border)] hover:bg-[var(--color-cream-dark)] transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  Edit
                </button>
                <AnimatePresence>
                  {deleteConfirm === address.id ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-1"
                    >
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 text-xs font-medium border border-[var(--color-border)] hover:bg-[var(--color-cream-dark)] transition-colors"
                      >
                        Cancel
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(address.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Add new address card */}
          <motion.button
            onClick={openAddModal}
            className="border-2 border-dashed border-[var(--color-border)] p-6 flex flex-col items-center justify-center gap-3 hover:border-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)]/50 transition-colors min-h-[200px]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center">
              <Plus className="h-6 w-6 text-[var(--color-charcoal)]" />
            </div>
            <span className="font-medium text-[var(--color-charcoal)]">
              Add New Address
            </span>
          </motion.button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)]">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-[var(--color-cream-dark)] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Label */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Label (Optional)
                  </label>
                  <div className="flex gap-2">
                    {["Home", "Office", "Other"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setFormData({ ...formData, label })}
                        className={cn(
                          "px-4 py-2 text-sm font-medium border transition-colors",
                          formData.label === label
                            ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-white"
                            : "border-[var(--color-border)] hover:border-[var(--color-charcoal)]"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) =>
                      setFormData({ ...formData, addressLine1: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                    placeholder="Street address"
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) =>
                      setFormData({ ...formData, addressLine2: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                    placeholder="Apartment, suite, floor, etc."
                  />
                </div>

                {/* City & Region */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Region *
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Postal Code & Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Set as default */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        isDefault: !formData.isDefault,
                      })
                    }
                    className={cn(
                      "w-5 h-5 border flex items-center justify-center transition-colors",
                      formData.isDefault
                        ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                        : "border-[var(--color-border)]"
                    )}
                  >
                    {formData.isDefault && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </button>
                  <span className="text-sm text-[var(--color-charcoal)]">
                    Set as default address
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[var(--color-border)] flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-cream-dark)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={
                    isSaving ||
                    !formData.fullName ||
                    !formData.phone ||
                    !formData.addressLine1 ||
                    !formData.city ||
                    !formData.region
                  }
                  className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
