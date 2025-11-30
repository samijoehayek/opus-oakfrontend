"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

type AuthMode = "login" | "register";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
}

// Password requirements checker
const checkPasswordRequirements = (password: string) => ({
  minLength: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumberOrSpecial: /(\d|\W)/.test(password),
});

export function AuthPage() {
  const router = useRouter();
  const {
    login,
    register,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    agreeToTerms: false,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Sync auth error with form errors
  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const passwordRequirements = checkPasswordRequirements(formData.password);
  const allPasswordRequirementsMet =
    Object.values(passwordRequirements).every(Boolean);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (mode === "register" && !allPasswordRequirementsMet) {
      newErrors.password = "Password does not meet requirements";
    }

    // Register-specific validations
    if (mode === "register") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.agreeToTerms) {
        newErrors.general = "You must agree to the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
        });
      }
      // Redirect handled by useEffect
    } catch (err) {
      // Error handled by auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    clearError();
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      agreeToTerms: false,
    });
  };

  // Don't render form if already authenticated (prevents flash)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-[20px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[20px]">
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

            {/* Error Alert */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                  <button
                    onClick={() => {
                      setErrors((prev) => ({ ...prev, general: undefined }));
                      clearError();
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

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
                        className={cn(
                          "w-full px-4 py-3.5 bg-transparent border text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none transition-colors",
                          errors.firstName
                            ? "border-red-400 focus:border-red-500"
                            : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                        )}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.firstName}
                        </p>
                      )}
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
                        className={cn(
                          "w-full px-4 py-3.5 bg-transparent border text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none transition-colors",
                          errors.lastName
                            ? "border-red-400 focus:border-red-500"
                            : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                        )}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.lastName}
                        </p>
                      )}
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
                    className={cn(
                      "w-full px-4 py-3.5 bg-transparent border text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none transition-colors",
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                    )}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2"
                    >
                      Phone Number{" "}
                      <span className="text-[var(--color-muted)]">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-transparent border border-[var(--color-border)] text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-charcoal)] transition-colors"
                      placeholder="+961 70 123 456"
                    />
                  </div>
                )}

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
                      onFocus={() =>
                        mode === "register" && setShowPasswordRequirements(true)
                      }
                      onBlur={() => setShowPasswordRequirements(false)}
                      className={cn(
                        "w-full px-4 py-3.5 pr-12 bg-transparent border text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none transition-colors",
                        errors.password
                          ? "border-red-400 focus:border-red-500"
                          : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                      )}
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
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}

                  {/* Password requirements */}
                  {mode === "register" && showPasswordRequirements && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-3 bg-[var(--color-cream-dark)] text-sm"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)] mb-2">
                        Password must contain:
                      </p>
                      <div className="space-y-1">
                        {[
                          { key: "minLength", label: "At least 8 characters" },
                          {
                            key: "hasUppercase",
                            label: "One uppercase letter",
                          },
                          {
                            key: "hasLowercase",
                            label: "One lowercase letter",
                          },
                          {
                            key: "hasNumberOrSpecial",
                            label: "One number or special character",
                          },
                        ].map((req) => (
                          <div
                            key={req.key}
                            className={cn(
                              "flex items-center gap-2 text-xs transition-colors",
                              passwordRequirements[
                                req.key as keyof typeof passwordRequirements
                              ]
                                ? "text-green-600"
                                : "text-[var(--color-muted)]"
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full flex items-center justify-center transition-colors",
                                passwordRequirements[
                                  req.key as keyof typeof passwordRequirements
                                ]
                                  ? "bg-green-100"
                                  : "bg-[var(--color-sand)]"
                              )}
                            >
                              {passwordRequirements[
                                req.key as keyof typeof passwordRequirements
                              ] && <Check className="w-3 h-3" />}
                            </div>
                            {req.label}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
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
                        className={cn(
                          "w-full px-4 py-3.5 pr-12 bg-transparent border text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none transition-colors",
                          errors.confirmPassword
                            ? "border-red-400 focus:border-red-500"
                            : "border-[var(--color-border)] focus:border-[var(--color-charcoal)]"
                        )}
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
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
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
                  disabled={isSubmitting || authLoading}
                  className={cn(
                    "w-full py-4 bg-[var(--color-charcoal)] text-white font-medium tracking-wide uppercase text-sm flex items-center justify-center gap-2 transition-all",
                    isSubmitting || authLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[var(--color-ink)]"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting || authLoading ? (
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
                ].map((benefit) => (
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
