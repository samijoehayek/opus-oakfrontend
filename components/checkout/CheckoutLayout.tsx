"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ChevronLeft } from "lucide-react";

interface CheckoutLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function CheckoutLayout({ children, sidebar }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Checkout Header */}
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Cart</span>
            </Link>

            <Link href="/" className="flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium tracking-tight text-[var(--color-charcoal)]">
                Opus&amp;Oak
              </span>
            </Link>

            <div className="flex items-center gap-2 text-[var(--color-muted)]">
              <Lock className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-7 order-2 lg:order-1">{children}</div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 order-1 lg:order-2">{sidebar}</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-[var(--color-charcoal)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[var(--color-charcoal)]"
              >
                Terms of Service
              </Link>
              <Link
                href="/returns"
                className="hover:text-[var(--color-charcoal)]"
              >
                Returns
              </Link>
            </div>
            <p>
              © {new Date().getFullYear()} Opus&amp;Oak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
