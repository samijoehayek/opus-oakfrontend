export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  type: "main" | "lifestyle" | "detail" | "video-thumbnail";
}

export interface ProductSize {
  id: string;
  name: string;
  label: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    seatHeight?: number;
    seatDepth?: number;
  };
  bedDimensions?: {
    width: number;
    length: number;
  };
  price: number;
  originalPrice?: number;
  inStock: boolean;
  leadTime: string;
}

export interface FabricCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Fabric {
  id: string;
  name: string;
  color: string;
  hexColor: string;
  category: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
}

export interface ProductFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  subcategory: string;
  images: ProductImage[];
  sizes: ProductSize[];
  fabrics: Fabric[];
  fabricCategories: FabricCategory[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  relatedProducts: RelatedProduct[];
  averageRating: number;
  totalReviews: number;
  badges: string[];
  deliveryInfo: {
    price: number;
    description: string;
    leadTime: string;
  };
  returns: {
    days: number;
    description: string;
  };
  warranty: {
    years: number;
    description: string;
  };
  careInstructions: string[];
  assembly: string;
  madeIn: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  sizeId: string;
  sizeName: string;
  fabricId: string;
  fabricName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  featured?: {
    title: string;
    description: string;
    imageUrl: string;
    href: string;
  }[];
}
