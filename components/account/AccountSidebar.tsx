"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    label: "Overview",
    href: "/account",
    icon: User,
    description: "Your account at a glance",
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: Package,
    description: "Track and manage orders",
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
    description: "Manage delivery addresses",
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
    description: "Your saved items",
  },
  {
    label: "Settings",
    href: "/account/settings",
    icon: Settings,
    description: "Account preferences",
  },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      {/* User info card */}
      <div className="bg-[var(--color-charcoal)] text-white p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-sand)] text-[var(--color-charcoal)] flex items-center justify-center text-2xl font-[family-name:var(--font-display)]">
            {user?.firstName?.charAt(0).toUpperCase()}
            {user?.lastName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-white/60 text-sm">{user?.email}</p>
          </div>
        </div>
        <p className="text-xs text-white/40 uppercase tracking-wide">
          Member since{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/account" && pathname.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center justify-between p-4 transition-colors group",
                  isActive
                    ? "bg-[var(--color-cream-dark)] border-l-2 border-[var(--color-charcoal)]"
                    : "hover:bg-[var(--color-cream-dark)]/50"
                )}
                whileHover={{ x: isActive ? 0 : 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-[var(--color-charcoal)]"
                        : "text-[var(--color-muted)]"
                    )}
                  />
                  <div>
                    <p
                      className={cn(
                        "font-medium text-sm",
                        isActive
                          ? "text-[var(--color-charcoal)]"
                          : "text-[var(--color-warm-gray)]"
                      )}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] hidden sm:block">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-opacity",
                    isActive
                      ? "opacity-100 text-[var(--color-charcoal)]"
                      : "opacity-0 group-hover:opacity-100 text-[var(--color-muted)]"
                  )}
                />
              </motion.div>
            </Link>
          );
        })}

        {/* Logout button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 transition-colors mt-4"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
