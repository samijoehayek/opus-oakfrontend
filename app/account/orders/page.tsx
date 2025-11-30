"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountHeader } from "@/components/account";
import type { OrderSummary, OrderStatus } from "@/types/account";

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; color: string }
> = {
  PENDING_PAYMENT: {
    label: "Pending Payment",
    icon: Clock,
    color: "text-amber-600 bg-amber-50",
  },
  PAYMENT_FAILED: {
    label: "Payment Failed",
    icon: AlertCircle,
    color: "text-red-600 bg-red-50",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-50",
  },
  IN_PRODUCTION: {
    label: "In Production",
    icon: Package,
    color: "text-purple-600 bg-purple-50",
  },
  READY_FOR_SHIPPING: {
    label: "Ready to Ship",
    icon: Package,
    color: "text-indigo-600 bg-indigo-50",
  },
  SHIPPED: { label: "Shipped", icon: Truck, color: "text-blue-600 bg-blue-50" },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: AlertCircle,
    color: "text-gray-600 bg-gray-50",
  },
  REFUNDED: {
    label: "Refunded",
    icon: AlertCircle,
    color: "text-gray-600 bg-gray-50",
  },
};

const filterOptions: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All Orders", value: "ALL" },
  { label: "Pending", value: "PENDING_PAYMENT" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "In Production", value: "IN_PRODUCTION" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

// Mock data
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
  {
    id: "3",
    orderNumber: "ORD-2023-089",
    status: "DELIVERED",
    total: 4500,
    currency: "USD",
    itemCount: 3,
    createdAt: "2023-12-20T09:15:00Z",
  },
  {
    id: "4",
    orderNumber: "ORD-2023-076",
    status: "CANCELLED",
    total: 1200,
    currency: "USD",
    itemCount: 1,
    createdAt: "2023-11-05T16:45:00Z",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  useEffect(() => {
    const loadOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(mockOrders);
      setIsLoading(false);
    };
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-[var(--color-cream-dark)] animate-pulse" />
        <div className="h-16 bg-[var(--color-cream-dark)] animate-pulse" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-[var(--color-cream-dark)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccountHeader
        title="Your Orders"
        description="Track and manage all your orders"
      />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
          <input
            type="text"
            placeholder="Search by order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-muted)]" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as OrderStatus | "ALL")
            }
            className="pl-10 pr-8 py-3 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none appearance-none bg-white cursor-pointer min-w-[180px]"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-[var(--color-border)] p-12 text-center">
          <Package className="h-16 w-16 text-[var(--color-muted)] mx-auto mb-4" />
          <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-2">
            No orders found
          </h3>
          <p className="text-[var(--color-muted)] mb-6">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your search or filter criteria."
              : "When you place your first order, it will appear here."}
          </p>
          {!searchQuery && statusFilter === "ALL" && (
            <Link
              href="/sofas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/account/orders/${order.id}`}
                  className="block bg-white border border-[var(--color-border)] hover:border-[var(--color-charcoal)] transition-colors group"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-lg", status.color)}>
                          <StatusIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[var(--color-charcoal)] text-lg">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-[var(--color-muted)]">
                            Placed on{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-semibold text-[var(--color-charcoal)]">
                          ${order.total.toLocaleString()}
                        </p>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            status.color.split(" ")[0]
                          )}
                        >
                          {status.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
                        <span>
                          {order.itemCount}{" "}
                          {order.itemCount === 1 ? "item" : "items"}
                        </span>
                        {order.estimatedDelivery && (
                          <span>
                            Est. delivery:{" "}
                            {new Date(
                              order.estimatedDelivery
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline flex items-center gap-1">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
