"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { cn } from "@/app/lib/utils";

type AuthMode = "login" | "register";

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Handle actual auth logic here
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[120px]">
      <div className="min-h-[calc(100vh-88px)] flex">
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=1600&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
          </motion.div>

          {/* Overlay content */}
          <div className="relative h-full flex flex-col justify-between p-12">
            <div />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <blockquote className="max-w-md">
                <p className="font-[family-name:var(--font-display)] text-3xl text-white leading-relaxed mb-6">
                  &ldquo;Furniture that tells a story of craftsmanship, comfort,
                  and timeless elegance.&rdquo;
                </p>
                <footer className="text-white/70 text-sm tracking-wide uppercase">
                  The Opus&amp;Oak Promise
                </footer>
              </blockquote>
            </motion.div>
            <div className="flex items-center gap-8">
              {[
                "10-Year Guarantee",
                "Bespoke Designs",
                "Premium Materials",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 text-white/80 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full border border-[var(--color-sand)] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[var(--color-sand)]" />
                  </div>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Logo for mobile */}
            <motion.div
              className="lg:hidden text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-charcoal)]">
                  Opus&amp;Oak
                </span>
              </Link>
            </motion.div>

            {/* Tabs */}
            <motion.div
              className="flex mb-10 border-b border-[var(--color-border)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { key: "login", label: "Sign In" },
                { key: "register", label: "Create Account" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => switchMode(tab.key as AuthMode)}
                  className={cn(
                    "flex-1 pb-4 text-sm font-medium tracking-wide uppercase transition-colors relative",
                    mode === tab.key
                      ? "text-[var(--color-charcoal)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
                  )}
                >
                  {tab.label}
                  {mode === tab.key && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-charcoal)]"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Form header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)] mb-3">
                  {mode === "login" ? "Welcome Back" : "Join Opus&Oak"}
                </h1>
                <p className="text-[var(--color-muted)]">
                  {mode === "login"
                    ? "Sign in to access your account and continue your journey."
                    : "Create an account to unlock exclusive benefits and save your favorites."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3.5 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 pr-12 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 pr-12 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}

                {mode === "register" && (
                  <div className="flex items-start gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required
                        className="peer sr-only"
                      />
                      <div
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            agreeToTerms: !prev.agreeToTerms,
                          }))
                        }
                        className={cn(
                          "w-5 h-5 border cursor-pointer flex items-center justify-center transition-all",
                          formData.agreeToTerms
                            ? "bg-[var(--color-charcoal)] border-[var(--color-charcoal)]"
                            : "border-[var(--color-border)]"
                        )}
                      >
                        {formData.agreeToTerms && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-[var(--color-muted)] cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[var(--color-charcoal)] underline hover:no-underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[var(--color-charcoal)] underline hover:no-underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-4 bg-[var(--color-charcoal)] text-white font-medium tracking-wide uppercase text-sm flex items-center justify-center gap-2 transition-all",
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[var(--color-ink)]"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--color-border)]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[var(--color-background)] px-4 text-sm text-[var(--color-muted)]">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-charcoal)] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 py-3.5 border border-[var(--color-border)] hover:border-[var(--color-charcoal)] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>

            {/* Benefits (mobile) */}
            <motion.div
              className="lg:hidden mt-12 pt-8 border-t border-[var(--color-border)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xs uppercase tracking-wide text-[var(--color-muted)] mb-4">
                Member Benefits
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Exclusive access to new collections",
                  "Save favorites & track orders",
                  "Personalized recommendations",
                  "Early access to sales",
                ].map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm text-[var(--color-warm-gray)]"
                  >
                    <div className="w-5 h-5 border border-[var(--color-sand)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[var(--color-primary)]" />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
