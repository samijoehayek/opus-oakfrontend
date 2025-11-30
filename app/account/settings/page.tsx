"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountHeader } from "@/components/account";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("profile");

  // Profile form
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productAlerts: true,
  });

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSavingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleChangePassword = async () => {
    setPasswordError(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsSavingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSavingPassword(false);
    setPasswordSuccess(true);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") return;
    // Handle account deletion
    console.log("Deleting account...");
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <AccountHeader
        title="Account Settings"
        description="Manage your account preferences and security"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white border border-[var(--color-border)]">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                  activeSection === section.id
                    ? "bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] font-medium"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-cream-dark)]/50"
                )}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-[var(--color-border)] p-6"
              >
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-6">
                  Profile Information
                </h2>

                <div className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-cream-dark)] text-[var(--color-muted)] cursor-not-allowed"
                    />
                    <p className="text-xs text-[var(--color-muted)] mt-1">
                      Contact support to change your email
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      placeholder="+961 70 123 456"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] disabled:opacity-50 transition-colors"
                    >
                      {isSavingProfile ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : profileSaved ? (
                        <Check className="h-4 w-4" />
                      ) : null}
                      {profileSaved ? "Saved!" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Password Section */}
            {activeSection === "password" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-[var(--color-border)] p-6"
              >
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-6">
                  Change Password
                </h2>

                <div className="space-y-4 max-w-md">
                  {passwordError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Password changed successfully
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            current: !showPasswords.current,
                          })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleChangePassword}
                      disabled={
                        isSavingPassword ||
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword
                      }
                      className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-charcoal)] text-white text-sm font-medium hover:bg-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSavingPassword && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      Update Password
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-[var(--color-border)] p-6"
              >
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-6">
                  Email Notifications
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "orderUpdates",
                      label: "Order Updates",
                      description:
                        "Get notified about your order status changes",
                    },
                    {
                      key: "promotions",
                      label: "Promotions & Offers",
                      description: "Receive exclusive deals and discounts",
                    },
                    {
                      key: "newsletter",
                      label: "Newsletter",
                      description:
                        "Monthly design inspiration and new arrivals",
                    },
                    {
                      key: "productAlerts",
                      label: "Product Alerts",
                      description:
                        "Get notified when wishlist items go on sale",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-4 border-b border-[var(--color-border)] last:border-0"
                    >
                      <div>
                        <p className="font-medium text-[var(--color-charcoal)]">
                          {item.label}
                        </p>
                        <p className="text-sm text-[var(--color-muted)]">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            [item.key]:
                              !notifications[
                                item.key as keyof typeof notifications
                              ],
                          })
                        }
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors",
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-[var(--color-charcoal)]"
                            : "bg-[var(--color-sand)]"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                            notifications[
                              item.key as keyof typeof notifications
                            ]
                              ? "translate-x-7"
                              : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Privacy Section */}
            {activeSection === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Data & Privacy */}
                <div className="bg-white border border-[var(--color-border)] p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-4">
                    Data & Privacy
                  </h2>
                  <p className="text-[var(--color-muted)] mb-4">
                    You can request a copy of your personal data or delete your
                    account entirely.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-cream-dark)] transition-colors">
                      Download My Data
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-white border border-red-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-[family-name:var(--font-display)] text-xl text-red-600 mb-2">
                        Delete Account
                      </h2>
                      <p className="text-[var(--color-muted)] mb-4">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>

                      {!showDeleteConfirm ? (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Account
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4"
                        >
                          <p className="text-sm text-red-600 font-medium">
                            Type "DELETE" to confirm account deletion:
                          </p>
                          <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) =>
                              setDeleteConfirmText(e.target.value)
                            }
                            className="w-full max-w-xs px-4 py-2 border border-red-300 focus:border-red-500 focus:outline-none"
                            placeholder="DELETE"
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={handleDeleteAccount}
                              disabled={deleteConfirmText !== "DELETE"}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Confirm Delete
                            </button>
                            <button
                              onClick={() => {
                                setShowDeleteConfirm(false);
                                setDeleteConfirmText("");
                              }}
                              className="px-4 py-2 border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-cream-dark)] transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
