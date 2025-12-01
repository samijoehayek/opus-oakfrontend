export interface CheckoutState {
  step: CheckoutStep;
  contact: ContactInfo;
  shipping: ShippingInfo;
  billing: BillingInfo;
  payment: PaymentInfo;
  sameAsShipping: boolean;
}

export type CheckoutStep = "contact" | "shipping" | "payment" | "review";

export interface ContactInfo {
  email: string;
  phone: string;
  marketingConsent: boolean;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
  deliveryInstructions?: string;
}

export interface BillingInfo extends ShippingInfo {}

export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
  saveCard?: boolean;
}

export type PaymentMethod = "card" | "cash_on_delivery" | "bank_transfer";

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: "standard" | "express" | "white_glove";
}

export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}
