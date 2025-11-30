"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderSummary, OrderStatus } from "@/types/account";

interface RecentOrdersProps {
  orders: OrderSummary[];
}

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
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    color: "text-blue-600 bg-blue-50",
  },
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

export function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white border border-[var(--color-border)] p-8 text-center">
        <Package className="h-12 w-12 text-[var(--color-muted)] mx-auto mb-4" />
        <h3 className="font-medium text-[var(--color-charcoal)] mb-2">
          No orders yet
        </h3>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          When you place your first order, it will appear here.
        </p>
        <Link
          href="/sofas"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-border)]">
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-medium text-[var(--color-charcoal)]">
          Recent Orders
        </h3>
        <Link
          href="/account/orders"
          className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {orders.map((order, index) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-[var(--color-cream-dark)]/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg", status.color)}>
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">
                      Order #{order.orderNumber}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      {order.itemCount}{" "}
                      {order.itemCount === 1 ? "item" : "items"} •{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-medium text-[var(--color-charcoal)]">
                      ${order.total.toLocaleString()}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-medium",
                        status.color.split(" ")[0]
                      )}
                    >
                      {status.label}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
