"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { useAuth } from "@/app/context/AuthContext";

const navigationItems = [
  { label: "Sofas", href: "/sofas" },
  { label: "Armchairs", href: "/armchairs" },
  { label: "Beds", href: "/beds" },
  { label: "Tables", href: "/tables" },
  { label: "Accessories", href: "/accessories" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-[var(--color-charcoal)] text-white">
        <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-end py-2 text-xs">
          <div className="flex items-center gap-6">
            <Link
              href="/contact-us"
              className="uppercase tracking-wide hover:text-[var(--color-sand)] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/designers"
              className="uppercase tracking-wide hover:text-[var(--color-sand)] transition-colors"
            >
              Designers
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "bg-[var(--color-background)] border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <div className="w-full px-4 md:px-8 lg:px-12 grid grid-cols-3 items-center py-5">
          {/* Left - Navigation */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center gap-0">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-base font-medium transition-colors hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 justify-self-start"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>

          {/* Center - Logo */}
          <Link href="/" className="flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl font-medium tracking-tight text-[var(--color-charcoal)]">
              Opus&amp;Oak
            </span>
          </Link>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 justify-end">
            <button className="p-3 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors">
              <Search className="h-6 w-6" />
            </button>

            {/* User menu */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="hidden sm:flex items-center gap-2 p-3 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-medium">
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {/* User dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-[var(--color-border)] shadow-lg min-w-[200px]">
                        <div className="px-4 py-3 border-b border-[var(--color-border)]">
                          <p className="font-medium text-[var(--color-charcoal)]">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-[var(--color-muted)]">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/account"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)] transition-colors"
                          >
                            My Account
                          </Link>
                          <Link
                            href="/orders"
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-cream-dark)] transition-colors"
                          >
                            Orders
                          </Link>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              logout();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link href="/auth">
                  <button className="hidden sm:block p-3 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors">
                    <User className="h-6 w-6" />
                  </button>
                </Link>
              )}
            </div>

            <button className="hidden sm:block p-3 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors relative">
              <Heart className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4.5 w-4.5 bg-[var(--color-primary)] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-3 hover:bg-[var(--color-cream-dark)] rounded-full transition-colors relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4.5 w-4.5 bg-[var(--color-primary)] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[117px] bg-white z-40 overflow-y-auto animate-fade-in">
          <nav className="px-4 md:px-8 py-6">
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
                </Link>
              </div>
            ))}
            <div className="mt-6 space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 bg-[var(--color-cream-dark)]">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {user?.email}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" fullWidth>
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}
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
