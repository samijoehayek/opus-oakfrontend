"use client";

import { motion } from "framer-motion";
import { Package, Heart, MapPin, CreditCard } from "lucide-react";

interface QuickStatsProps {
  ordersCount: number;
  wishlistCount: number;
  addressesCount: number;
  totalSpent: number;
}

export function QuickStats({
  ordersCount,
  wishlistCount,
  addressesCount,
  totalSpent,
}: QuickStatsProps) {
  const stats = [
    {
      label: "Total Orders",
      value: ordersCount,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Wishlist Items",
      value: wishlistCount,
      icon: Heart,
      color: "bg-pink-50 text-pink-600",
    },
    {
      label: "Saved Addresses",
      value: addressesCount,
      icon: MapPin,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: CreditCard,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white border border-[var(--color-border)] p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={`inline-flex p-2.5 rounded-lg ${stat.color} mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold text-[var(--color-charcoal)]">
            {stat.value}
          </p>
          <p className="text-sm text-[var(--color-muted)]">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
