// ============================================
// PRODUCT TYPES
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

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface MaterialOption {
  id: string;
  name: string;
  type: string;
  priceModifier: number;
  textureUrl?: string;
  isDefault: boolean;
  isAvailable: boolean;
}

export interface ColorOption {
  id: string;
  name: string;
  hexCode: string;
  priceModifier: number;
  textureUrl?: string;
  isDefault: boolean;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  story?: string;
  badge?: string;
  category: FurnitureCategory;
  basePrice: number;
  originalPrice?: number;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  modelUrl?: string;
  modelThumbnail?: string;
  leadTimeDays: number;
  isActive: boolean;
  isFeatured: boolean;
  images: ProductImage[];
  materialOptions: MaterialOption[];
  colorOptions: ColorOption[];
  optionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

// Type used by ProductCard component
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

// Helper to map API Product to CategoryProduct
export function mapProductToCategoryProduct(product: Product): CategoryProduct {
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
