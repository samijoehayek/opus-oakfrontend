"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { navigationItems } from "@/app/data/products";
import { Button } from "@/app/components/ui/Button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)]">
      {/* Top bar */}
      <div className="bg-[var(--color-charcoal)] text-white">
        <div className="container-wide flex items-center justify-between py-2 text-xs">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/showrooms"
              className="flex items-center gap-1.5 hover:text-[var(--color-sand)] transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Find a Showroom</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 hover:text-[var(--color-sand)] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Contact Us</span>
            </Link>
          </div>
          <p className="flex-1 text-center md:flex-none">
            Free fabric samples • 14 day home trial
          </p>
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-[var(--color-border)]">
        <div className="container-wide flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-charcoal)]">
              Loaf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
                    activeDropdown === item.label &&
                      "text-[var(--color-primary)]"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-2 animate-fade-in">
                    <div className="bg-white rounded-lg shadow-large border border-[var(--color-border)] min-w-[200px] py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-[var(--color-cream-dark)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="p-2.5 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden sm:block p-2.5 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="hidden sm:block p-2.5 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[var(--color-primary)] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2.5 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[var(--color-primary)] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[105px] bg-white z-40 overflow-y-auto animate-fade-in">
          <nav className="container-wide py-6">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-[var(--color-border)]"
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-5 w-5" />}
                </Link>
              </div>
            ))}
            <div className="mt-6 space-y-4">
              <Button variant="secondary" fullWidth>
                <User className="h-4 w-4" />
                Sign In
              </Button>
              <Button variant="primary" fullWidth>
                <Heart className="h-4 w-4" />
                Wishlist (3)
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
