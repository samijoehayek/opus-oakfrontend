export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  configuration: CartItemConfiguration;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartItemConfiguration {
  material?: string;
  color?: string;
  size?: string;
  [key: string]: string | undefined;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrder?: number;
}
