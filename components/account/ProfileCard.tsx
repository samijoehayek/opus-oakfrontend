"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface ProfileCardProps {
  onUpdate?: (data: {
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<void>;
}

export function ProfileCard({ onUpdate }: ProfileCardProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });

  const handleSave = async () => {
    if (!onUpdate) return;
    setIsLoading(true);
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[var(--color-border)]">
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-medium text-[var(--color-charcoal)]">
          Personal Information
        </h3>
        {!isEditing && onUpdate && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
          >
            <Edit2 className="h-3 w-3" />
            Edit
          </button>
        )}
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] bg-[var(--color-cream-dark)] text-[var(--color-muted)] cursor-not-allowed"
                />
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  Contact support to change your email address
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      phone: user?.phone || "",
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-charcoal)] text-sm font-medium hover:bg-[var(--color-cream-dark)] transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="viewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-1">
                  First Name
                </p>
                <p className="text-[var(--color-charcoal)]">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-1">
                  Last Name
                </p>
                <p className="text-[var(--color-charcoal)]">{user?.lastName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-1">
                  Email
                </p>
                <p className="text-[var(--color-charcoal)]">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-1">
                  Phone
                </p>
                <p className="text-[var(--color-charcoal)]">
                  {user?.phone || "Not provided"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
