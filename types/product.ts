// ============================================
// ENUMS
// ============================================

export type FurnitureCategory =
  | "TABLES"
  | "CHAIRS"
  | "SOFAS"
  | "BEDS"
  | "STORAGE"
  | "LIGHTING"
  | "OUTDOOR"
  | "ACCESSORIES";

export type ImageType =
  | "PHOTO"
  | "VIDEO_THUMBNAIL"
  | "LIFESTYLE"
  | "DETAIL"
  | "DIMENSION";

// ============================================
// PRODUCT LIST TYPES (for category pages)
// ============================================

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  type: ImageType;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductListItem {
  id: string;
  sku: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  badge?: string;
  category: FurnitureCategory;
  basePrice: number;
  originalPrice?: number;
  images: ProductImage[];
  optionCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface ProductListResponse {
  products: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================
// PRODUCT DETAIL TYPES
// ============================================

export interface ProductSize {
  id: string;
  label: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    seatHeight?: number;
  };
  bedDimensions?: {
    width: number;
    length: number;
  };
  inStock: boolean;
  leadTime?: string;
  sortOrder: number;
  isDefault: boolean;
}

export interface Fabric {
  id: string;
  name: string;
  hexColor: string;
  textureUrl?: string;
  price: number;
  inStock: boolean;
  category: string;
  sortOrder: number;
  isDefault: boolean;
}

export interface FabricCategory {
  id: string;
  name: string;
  sortOrder: number;
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
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  date: string;
}

export interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
}

export interface DeliveryInfo {
  price: number;
  description?: string;
}

export interface ReturnsInfo {
  days: number;
  description?: string;
}

export interface WarrantyInfo {
  years: number;
  description?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  story?: string;
  badge?: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  originalPrice?: number;

  // Media
  images: ProductImage[];

  // Variants
  sizes: ProductSize[];
  fabricCategories: FabricCategory[];
  fabrics: Fabric[];

  // Features & Specs
  features: ProductFeature[];
  specifications: ProductSpecification[];

  // Delivery & Returns
  deliveryInfo: DeliveryInfo;
  returns: ReturnsInfo;
  warranty: WarrantyInfo;

  // Additional
  assembly?: string;
  madeIn?: string;
  careInstructions: string[];

  // Reviews
  averageRating: number;
  totalReviews: number;
  reviews: ProductReview[];

  // Related
  relatedProducts: RelatedProduct[];

  // Badges
  badges: string[];

  // Status
  isActive: boolean;
  isFeatured: boolean;
  leadTimeDays: number;

  createdAt: string;
  updatedAt: string;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface CategoryMetadata {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroImage: string;
  introTitle: string;
  introText: string;
  productCount: number;
}

// ============================================
// QUERY TYPES
// ============================================

export type ProductSortBy = "featured" | "price-asc" | "price-desc" | "newest";

export interface ProductQueryParams {
  category?: FurnitureCategory;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: ProductSortBy;
}

// ============================================
// MAPPED TYPES FOR COMPONENTS
// ============================================

// Type used by ProductCard component in category pages
export interface CategoryProduct {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  price: number;
  originalPrice?: number;
  images: {
    src: string;
    alt: string;
  }[];
  badge?: string;
  fabricCount?: number;
}

// Helper to map API ProductListItem to CategoryProduct
export function mapProductToCategoryProduct(
  product: ProductListItem
): CategoryProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline || product.description.slice(0, 100),
    price: product.basePrice,
    originalPrice: product.originalPrice,
    images: product.images.map((img) => ({
      src: img.url,
      alt: img.altText || product.name,
    })),
    badge: product.badge,
    fabricCount: product.optionCount > 0 ? product.optionCount : undefined,
  };
}

// ============================================
// REVIEW SUBMISSION
// ============================================

export interface CreateReviewData {
  author: string;
  email?: string;
  rating: number;
  title: string;
  content: string;
}
