"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  Download,
  Share2,
  Home,
  FileText,
} from "lucide-react";

// Mock order data
const mockOrder = {
  orderNumber: "ORD-2024-001",
  email: "john@example.com",
  phone: "+961 70 123 456",
  estimatedDelivery: "February 15-22, 2024",
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "Beirut",
    region: "Beirut",
    country: "Lebanon",
  },
  shippingMethod: "White Glove Service",
  paymentMethod: "Card ending in 4242",
  items: [
    {
      name: "The Belmont Sofa",
      configuration: "Premium Leather, Cognac Brown, 3 Seater",
      quantity: 1,
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
    },
    {
      name: "The Windsor Armchair",
      configuration: "Velvet, Forest Green",
      quantity: 2,
      price: 4400,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop",
    },
  ],
  subtotal: 8900,
  shipping: 500,
  tax: 1034,
  total: 10434,
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || mockOrder.orderNumber;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Success Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <header className="bg-white border-b border-[var(--color-border)]">
        <div className="w-full px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-center">
            <Link href="/">
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium tracking-tight text-[var(--color-charcoal)]">
                Opus&amp;Oak
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <motion.h1
              className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Thank You for Your Order!
            </motion.h1>

            <motion.p
              className="text-lg text-[var(--color-muted)] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your order has been confirmed and will be shipped soon.
            </motion.p>

            <motion.p
              className="text-[var(--color-charcoal)] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Order Number:{" "}
              <span className="text-[var(--color-primary)]">{orderNumber}</span>
            </motion.p>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            className="bg-white border border-[var(--color-border)] p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)] mb-6">
              What Happens Next?
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[var(--color-border)]" />

              {/* Timeline Steps */}
              <div className="space-y-8">
                {[
                  {
                    icon: Mail,
                    title: "Order Confirmation",
                    description: `A confirmation email has been sent to ${mockOrder.email}`,
                    status: "completed",
                  },
                  {
                    icon: Package,
                    title: "Crafting Your Furniture",
                    description:
                      "Our artisans will begin crafting your bespoke pieces",
                    status: "current",
                  },
                  {
                    icon: Truck,
                    title: "White Glove Delivery",
                    description: `Estimated delivery: ${mockOrder.estimatedDelivery}`,
                    status: "upcoming",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        step.status === "completed"
                          ? "bg-green-500 text-white"
                          : step.status === "current"
                          ? "bg-[var(--color-charcoal)] text-white"
                          : "bg-[var(--color-cream-dark)] text-[var(--color-muted)]"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-medium text-[var(--color-charcoal)]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--color-muted)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Details */}
            <motion.div
              className="bg-white border border-[var(--color-border)] p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[var(--color-charcoal)]" />
                <h3 className="font-medium text-[var(--color-charcoal)]">
                  Shipping Address
                </h3>
              </div>
              <div className="text-sm text-[var(--color-muted)] space-y-1">
                <p className="text-[var(--color-charcoal)] font-medium">
                  {mockOrder.shippingAddress.name}
                </p>
                <p>{mockOrder.shippingAddress.address}</p>
                <p>
                  {mockOrder.shippingAddress.city},{" "}
                  {mockOrder.shippingAddress.region}
                </p>
                <p>{mockOrder.shippingAddress.country}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm">
                  <span className="text-[var(--color-muted)]">Method: </span>
                  <span className="text-[var(--color-charcoal)]">
                    {mockOrder.shippingMethod}
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Contact & Payment */}
            <motion.div
              className="bg-white border border-[var(--color-border)] p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-[var(--color-charcoal)]" />
                <h3 className="font-medium text-[var(--color-charcoal)]">
                  Contact & Payment
                </h3>
              </div>
              <div className="text-sm space-y-3">
                <div>
                  <p className="text-[var(--color-muted)]">Email</p>
                  <p className="text-[var(--color-charcoal)]">
                    {mockOrder.email}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-muted)]">Phone</p>
                  <p className="text-[var(--color-charcoal)]">
                    {mockOrder.phone}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--color-border)]">
                  <p className="text-[var(--color-muted)]">Payment Method</p>
                  <p className="text-[var(--color-charcoal)]">
                    {mockOrder.paymentMethod}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Items */}
          <motion.div
            className="bg-white border border-[var(--color-border)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="font-medium text-[var(--color-charcoal)]">
                Order Items
              </h3>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {mockOrder.items.map((item, index) => (
                <div key={index} className="p-6 flex gap-4">
                  <div className="relative w-20 h-20 bg-[var(--color-cream-dark)] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-charcoal)] text-white text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[var(--color-charcoal)]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[var(--color-muted)]">
                      {item.configuration}
                    </p>
                  </div>
                  <p className="font-medium text-[var(--color-charcoal)]">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="p-6 bg-[var(--color-cream-dark)]/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Subtotal</span>
                  <span className="text-[var(--color-charcoal)]">
                    ${mockOrder.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Shipping</span>
                  <span className="text-[var(--color-charcoal)]">
                    ${mockOrder.shipping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Tax</span>
                  <span className="text-[var(--color-charcoal)]">
                    ${mockOrder.tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--color-border)]">
                  <span className="font-medium text-[var(--color-charcoal)]">
                    Total
                  </span>
                  <span className="text-xl font-semibold text-[var(--color-charcoal)]">
                    ${mockOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/account/orders"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
            >
              <FileText className="w-5 h-5" />
              View Order Details
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-charcoal)] font-medium hover:bg-[var(--color-cream-dark)] transition-colors"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-[var(--color-muted)] mb-2">
              Have questions about your order?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a
                href="mailto:support@opusoak.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                support@opusoak.com
              </a>
              <span className="text-[var(--color-border)]">|</span>
              <a
                href="tel:+9611234567"
                className="text-[var(--color-primary)] hover:underline"
              >
                +961 1 234 567
              </a>
              <span className="text-[var(--color-border)]">|</span>
              <Link
                href="/help"
                className="text-[var(--color-primary)] hover:underline"
              >
                Help Center
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6 mt-12">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <p className="text-center text-sm text-[var(--color-muted)]">
            © {new Date().getFullYear()} Opus&amp;Oak. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
