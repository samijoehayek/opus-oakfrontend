"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  CheckoutLayout,
  CheckoutProgress,
  ContactStep,
  ShippingStep,
  PaymentStep,
  ReviewStep,
  OrderSummary,
} from "@/components/checkout";
import { useAuth } from "@/context/AuthContext";
import type {
  CheckoutStep,
  ContactInfo,
  ShippingInfo,
  BillingInfo,
  PaymentInfo,
} from "@/types/checkout";
import type { CartItem } from "@/types/cart";

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

const shippingMethods = [
  { id: "standard", name: "Standard Delivery", price: 150 },
  { id: "express", name: "Express Delivery", price: 300 },
  { id: "white_glove", name: "White Glove Service", price: 500 },
];

const emptyContact: ContactInfo = {
  email: "",
  phone: "",
  marketingConsent: false,
};

const emptyShipping: ShippingInfo = {
  firstName: "",
  lastName: "",
  company: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "Lebanon",
  deliveryInstructions: "",
};

const emptyBilling: BillingInfo = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "Lebanon",
};

const emptyPayment: PaymentInfo = {
  method: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  cardName: "",
  saveCard: false,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [billing, setBilling] = useState<BillingInfo>(emptyBilling);
  const [payment, setPayment] = useState<PaymentInfo>(emptyPayment);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("white_glove");

  // Promo code
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  // Cart data
  const [cartItems] = useState<CartItem[]>(mockCartItems);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingCost =
    shippingMethods.find((m) => m.id === selectedShippingMethod)?.price || 0;
  const tax = (subtotal - discount + shippingCost) * 0.11;
  const total = subtotal - discount + shippingCost + tax;

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && user) {
        setContact({
          ...contact,
          email: user.email,
          phone: user.phone || "",
        });
        setShipping({
          ...shipping,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
      setIsLoading(false);
    }
  }, [isAuthenticated, user, authLoading]);

  const handleStepComplete = (step: CheckoutStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step);
  };

  const handleApplyPromo = async (code: string): Promise<boolean> => {
    // Mock promo validation
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (code.toUpperCase() === "WELCOME10") {
      setPromoCode(code.toUpperCase());
      setDiscount(subtotal * 0.1);
      return true;
    }

    return false;
  };

  const handleRemovePromo = () => {
    setPromoCode(null);
    setDiscount(0);
  };

  const handlePlaceOrder = async () => {
    // Mock order placement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to confirmation page
    router.push("/checkout/confirmation?order=ORD-2024-001");
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-muted)]">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const shippingMethodName =
    shippingMethods.find((m) => m.id === selectedShippingMethod)?.name ||
    "Standard";

  return (
    <CheckoutLayout
      sidebar={
        <OrderSummary
          items={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          shippingMethodName={shippingMethodName}
          tax={tax}
          discount={discount}
          total={total}
          promoCode={promoCode || undefined}
          onApplyPromo={handleApplyPromo}
          onRemovePromo={handleRemovePromo}
        />
      }
    >
      <CheckoutProgress
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      <AnimatePresence mode="wait">
        {currentStep === "contact" && (
          <ContactStep
            key="contact"
            data={contact}
            onChange={setContact}
            onNext={() => {
              handleStepComplete("contact");
              setCurrentStep("shipping");
            }}
            isLoggedIn={isAuthenticated}
            userEmail={user?.email}
          />
        )}

        {currentStep === "shipping" && (
          <ShippingStep
            key="shipping"
            data={shipping}
            onChange={setShipping}
            onNext={() => {
              handleStepComplete("shipping");
              setCurrentStep("payment");
            }}
            onBack={() => setCurrentStep("contact")}
            selectedShippingMethod={selectedShippingMethod}
            onShippingMethodChange={setSelectedShippingMethod}
            isLoggedIn={isAuthenticated}
          />
        )}

        {currentStep === "payment" && (
          <PaymentStep
            key="payment"
            data={payment}
            onChange={setPayment}
            billingData={billing}
            onBillingChange={setBilling}
            shippingData={shipping}
            sameAsShipping={sameAsShipping}
            onSameAsShippingChange={setSameAsShipping}
            onNext={() => {
              handleStepComplete("payment");
              setCurrentStep("review");
            }}
            onBack={() => setCurrentStep("shipping")}
          />
        )}

        {currentStep === "review" && (
          <ReviewStep
            key="review"
            contact={contact}
            shipping={shipping}
            payment={payment}
            shippingMethodName={shippingMethodName}
            shippingCost={shippingCost}
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onEdit={goToStep}
            onBack={() => setCurrentStep("payment")}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </AnimatePresence>
    </CheckoutLayout>
  );
}
