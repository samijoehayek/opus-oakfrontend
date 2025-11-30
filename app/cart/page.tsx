"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Minus,
  Plus,
  X,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  RotateCcw,
  Check,
  AlertCircle,
  Loader2,
  Heart,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import type { CartItem, PromoCode } from "@/types/cart";

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "prod-1",
    productName: "The Belmont Sofa",
    productSlug: "belmont-sofa",
    productImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    configuration: {
      material: "Premium Leather",
      color: "Cognac Brown",
      size: "3 Seater",
    },
    quantity: 1,
    unitPrice: 4500,
    totalPrice: 4500,
  },
  {
    id: "cart-2",
    productId: "prod-2",
    productName: "The Windsor Armchair",
    productSlug: "windsor-armchair",
    productImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop",
    configuration: {
      material: "Velvet",
      color: "Forest Green",
    },
    quantity: 2,
    unitPrice: 2200,
    totalPrice: 4400,
  },
];

const validPromoCodes: PromoCode[] = [
  { code: "WELCOME10", discountType: "percentage", discountValue: 10 },
  {
    code: "SAVE50",
    discountType: "fixed",
    discountValue: 50,
    minimumOrder: 500,
  },
];

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingCost = subtotal > 1000 ? 0 : 150;
  const promoDiscount = appliedPromo
    ? appliedPromo.discountType === "percentage"
      ? (subtotal * appliedPromo.discountValue) / 100
      : appliedPromo.discountValue
    : 0;
  const tax = (subtotal - promoDiscount) * 0.11; // 11% VAT for Lebanon
  const total = subtotal - promoDiscount + shippingCost + tax;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const loadCart = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCartItems(mockCartItems);
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItemId(itemId);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.unitPrice * newQuantity,
            }
          : item
      )
    );
    setUpdatingItemId(null);
  };

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItemId(itemId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setRemovingItemId(null);
  };

  const handleApplyPromo = async () => {
    setPromoError(null);
    setIsApplyingPromo(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundPromo = validPromoCodes.find(
      (p) => p.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (!foundPromo) {
      setPromoError("Invalid promo code");
      setIsApplyingPromo(false);
      return;
    }

    if (foundPromo.minimumOrder && subtotal < foundPromo.minimumOrder) {
      setPromoError(
        `Minimum order of $${foundPromo.minimumOrder} required for this code`
      );
      setIsApplyingPromo(false);
      return;
    }

    setAppliedPromo(foundPromo);
    setPromoCode("");
    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/auth?redirect=/checkout");
    }
  };

  const handleMoveToWishlist = async (item: CartItem) => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/cart");
      return;
    }
    // Move to wishlist logic
    await handleRemoveItem(item.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] pt-[88px]">
        <div className="w-full px-4 md:px-8 lg:px-12 py-12">
          <div className="h-10 w-48 bg-[var(--color-cream-dark)] animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-[var(--color-cream-dark)] animate-pulse"
                />
              ))}
            </div>
            <div className="h-96 bg-[var(--color-cream-dark)] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[88px]">
      <div className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-charcoal)]">
            Shopping Bag
          </h1>
          <p className="text-[var(--color-muted)] mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[var(--color-border)] p-12 md:p-16 text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-[var(--color-cream-dark)] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-[var(--color-muted)]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-charcoal)] mb-3">
              Your bag is empty
            </h2>
            <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your bag yet. Start
              exploring our collection of bespoke furniture.
            </p>
            <Link
              href="/sofas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-charcoal)] text-white font-medium hover:bg-[var(--color-ink)] transition-colors"
            >
              Explore Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "bg-white border border-[var(--color-border)] p-4 md:p-6",
                      removingItemId === item.id && "opacity-50"
                    )}
                  >
                    <div className="flex gap-4 md:gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[var(--color-cream-dark)] overflow-hidden group">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/products/${item.productSlug}`}>
                              <h3 className="font-medium text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors">
                                {item.productName}
                              </h3>
                            </Link>
                            <p className="text-lg font-semibold text-[var(--color-charcoal)] mt-1">
                              ${item.unitPrice.toLocaleString()}
                            </p>
                          </div>

                          {/* Remove button - Desktop */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItemId === item.id}
                            className="hidden md:flex p-2 text-[var(--color-muted)] hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Configuration */}
                        <div className="mt-3 space-y-1">
                          {Object.entries(item.configuration).map(
                            ([key, value]) => (
                              <p
                                key={key}
                                className="text-sm text-[var(--color-muted)]"
                              >
                                <span className="capitalize">{key}:</span>{" "}
                                <span className="text-[var(--color-charcoal)]">
                                  {value}
                                </span>
                              </p>
                            )
                          )}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-[var(--color-border)]">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={
                                item.quantity <= 1 || updatingItemId === item.id
                              }
                              className="p-2 hover:bg-[var(--color-cream-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {updatingItemId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              disabled={updatingItemId === item.id}
                              className="p-2 hover:bg-[var(--color-cream-dark)] disabled:opacity-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <p className="font-semibold text-[var(--color-charcoal)]">
                            ${item.totalPrice.toLocaleString()}
                          </p>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center gap-4 mt-4 md:hidden">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            Save for later
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removingItemId === item.id}
                            className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Move to wishlist */}
                    <div className="hidden md:flex items-center justify-end pt-4 mt-4 border-t border-[var(--color-border)]">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        Move to Wishlist
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <Link
                href="/sofas"
                className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-charcoal)] transition-colors mt-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[var(--color-border)] sticky top-[120px]"
              >
                <div className="p-6 border-b border-[var(--color-border)]">
                  <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-charcoal)]">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-muted)]">Subtotal</span>
                    <span className="font-medium text-[var(--color-charcoal)]">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Promo Discount */}
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-green-600">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{appliedPromo.code}</span>
                        <button
                          onClick={handleRemovePromo}
                          className="text-[var(--color-muted)] hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <span>-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--color-muted)]">
                        Shipping
                      </span>
                      {shippingCost === 0 && (
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 font-medium">
                          FREE
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-[var(--color-charcoal)]">
                      {shippingCost === 0 ? "$0" : `$${shippingCost}`}
                    </span>
                  </div>

                  {/* Free shipping progress */}
                  {shippingCost > 0 && (
                    <div className="bg-[var(--color-cream-dark)] p-3">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Truck className="h-4 w-4 text-[var(--color-primary)]" />
                        <span className="text-[var(--color-charcoal)]">
                          Add ${(1000 - subtotal).toLocaleString()} more for
                          free shipping
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--color-sand)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((subtotal / 1000) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tax */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--color-muted)]">
                        Estimated Tax (11%)
                      </span>
                      <button className="text-[var(--color-muted)]">
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-medium text-[var(--color-charcoal)]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  {/* Promo Code Input */}
                  {!appliedPromo && (
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError(null);
                          }}
                          className="flex-1 px-3 py-2 border border-[var(--color-border)] focus:border-[var(--color-charcoal)] focus:outline-none text-sm"
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={!promoCode || isApplyingPromo}
                          className="px-4 py-2 bg-[var(--color-cream-dark)] text-[var(--color-charcoal)] text-sm font-medium hover:bg-[var(--color-sand)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isApplyingPromo ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {promoError}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <span className="text-lg font-medium text-[var(--color-charcoal)]">
                      Total
                    </span>
                    <span className="text-2xl font-semibold text-[var(--color-charcoal)]">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[var(--color-charcoal)] text-white font-medium flex items-center justify-center gap-2 hover:bg-[var(--color-ink)] transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  {/* Guest checkout note */}
                  {!isAuthenticated && (
                    <p className="text-xs text-center text-[var(--color-muted)]">
                      You&apos;ll be asked to sign in or create an account
                    </p>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-cream-dark)]/50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-[var(--color-border)]">
                        <Truck className="h-5 w-5 text-[var(--color-charcoal)]" />
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">
                        Free Shipping
                        <br />
                        Over $1000
                      </p>
                    </div>
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-[var(--color-border)]">
                        <Shield className="h-5 w-5 text-[var(--color-charcoal)]" />
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">
                        Secure
                        <br />
                        Payment
                      </p>
                    </div>
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-[var(--color-border)]">
                        <RotateCcw className="h-5 w-5 text-[var(--color-charcoal)]" />
                      </div>
                      <p className="text-xs text-[var(--color-muted)]">
                        14-Day
                        <br />
                        Returns
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 bg-[var(--color-cream-dark)] border border-[var(--color-border)]"
              >
                <h3 className="font-medium text-[var(--color-charcoal)] mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Delivery Information
                </h3>
                <ul className="text-sm text-[var(--color-muted)] space-y-1">
                  <li>• Made-to-order items: 3-6 weeks</li>
                  <li>• In-stock items: 5-7 business days</li>
                  <li>• White glove delivery included</li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}

        {/* Recently Viewed / You May Also Like */}
        {cartItems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-16 border-t border-[var(--color-border)]"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-charcoal)] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "The Kensington Sofa",
                  price: 5200,
                  image:
                    "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=400&fit=crop",
                  slug: "kensington-sofa",
                },
                {
                  name: "The Chelsea Coffee Table",
                  price: 1800,
                  image:
                    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
                  slug: "chelsea-coffee-table",
                },
                {
                  name: "The Hampton Armchair",
                  price: 2400,
                  image:
                    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
                  slug: "hampton-armchair",
                },
                {
                  name: "The Oxford Side Table",
                  price: 950,
                  image:
                    "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400&h=400&fit=crop",
                  slug: "oxford-side-table",
                },
              ].map((product, index) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-[var(--color-cream-dark)] overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[var(--color-muted)]">
                      ${product.price.toLocaleString()}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
