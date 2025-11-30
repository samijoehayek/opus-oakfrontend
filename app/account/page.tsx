"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AccountHeader,
  QuickStats,
  RecentOrders,
  SavedAddresses,
  WishlistPreview,
  ProfileCard,
} from "@/components/account";
import { useAuth } from "@/context/AuthContext";
import type { OrderSummary, Address, WishlistItem } from "@/types/account";

// Mock data - replace with actual API calls
const mockOrders: OrderSummary[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    status: "IN_PRODUCTION",
    total: 5200,
    currency: "USD",
    itemCount: 2,
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    status: "DELIVERED",
    total: 2800,
    currency: "USD",
    itemCount: 1,
    createdAt: "2024-01-10T14:20:00Z",
  },
];

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
];

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    productId: "prod-1",
    productName: "The Belmont Sofa",
    productSlug: "belmont-sofa",
    productImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    price: 4500,
    addedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    productId: "prod-2",
    productName: "The Windsor Armchair",
    productSlug: "windsor-armchair",
    productImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop",
    price: 2200,
    addedAt: "2024-01-18T14:20:00Z",
  },
];

export default function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(mockOrders);
      setAddresses(mockAddresses);
      setWishlist(mockWishlist);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const totalSpent = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.total, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-[var(--color-cream-dark)] animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-[var(--color-cream-dark)] animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 bg-[var(--color-cream-dark)] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AccountHeader
        title={`Welcome back, ${user?.firstName}`}
        description="Here's what's happening with your account."
      />

      {/* Quick Stats */}
      <QuickStats
        ordersCount={orders.length}
        wishlistCount={wishlist.length}
        addressesCount={addresses.length}
        totalSpent={totalSpent}
      />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <RecentOrders orders={orders} />
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProfileCard />
        </motion.div>

        {/* Saved Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SavedAddresses
            addresses={addresses}
            onAdd={() => console.log("Add address")}
          />
        </motion.div>

        {/* Wishlist Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <WishlistPreview items={wishlist} />
        </motion.div>
      </div>
    </div>
  );
}
