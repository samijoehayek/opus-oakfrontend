import { apiClient } from "@/lib/api-client";
import type {
  Product,
  ProductListItem,
  ProductListResponse,
  CategoryMetadata,
  ProductQueryParams,
  ProductSortBy,
  CreateReviewData,
} from "@/types/product";

// Map frontend sort values to backend format
const mapSortBy = (sortBy: ProductSortBy): string => {
  switch (sortBy) {
    case "price-asc":
      return "price_asc";
    case "price-desc":
      return "price_desc";
    case "newest":
      return "newest";
    case "featured":
    default:
      return "featured";
  }
};

// Map category slug to backend enum
const mapCategorySlugToEnum = (slug: string): string => {
  const mapping: Record<string, string> = {
    sofas: "SOFAS",
    beds: "BEDS",
    tables: "TABLES",
    armchairs: "CHAIRS",
    chairs: "CHAIRS",
    accessories: "ACCESSORIES",
    storage: "STORAGE",
    lighting: "LIGHTING",
    outdoor: "OUTDOOR",
  };
  return mapping[slug.toLowerCase()] || slug.toUpperCase();
};

class ProductsService {
  /**
   * Get all products with filtering and pagination
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductListResponse> {
    const searchParams = new URLSearchParams();

    if (params?.category) {
      searchParams.append("category", params.category);
    }
    if (params?.isFeatured !== undefined) {
      searchParams.append("isFeatured", String(params.isFeatured));
    }
    if (params?.isActive !== undefined) {
      searchParams.append("isActive", String(params.isActive));
    }
    if (params?.search) {
      searchParams.append("search", params.search);
    }
    if (params?.minPrice !== undefined) {
      searchParams.append("minPrice", String(params.minPrice));
    }
    if (params?.maxPrice !== undefined) {
      searchParams.append("maxPrice", String(params.maxPrice));
    }
    if (params?.page !== undefined) {
      searchParams.append("page", String(params.page));
    }
    if (params?.limit !== undefined) {
      searchParams.append("limit", String(params.limit));
    }
    if (params?.sortBy) {
      searchParams.append("sortBy", mapSortBy(params.sortBy));
    }

    const queryString = searchParams.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    return apiClient.get<ProductListResponse>(url);
  }

  /**
   * Get products by category slug
   */
  async getProductsByCategory(
    categorySlug: string,
    sortBy: ProductSortBy = "featured",
    limit: number = 50
  ): Promise<ProductListItem[]> {
    const categoryEnum = mapCategorySlugToEnum(categorySlug);
    const backendSortBy = mapSortBy(sortBy);

    return apiClient.get<ProductListItem[]>(
      `/products/category/${categoryEnum}?sortBy=${backendSortBy}&limit=${limit}`
    );
  }

  /**
   * Get category metadata
   */
  async getCategoryMetadata(categorySlug: string): Promise<CategoryMetadata> {
    return apiClient.get<CategoryMetadata>(
      `/products/categories/${categorySlug}`
    );
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<CategoryMetadata[]> {
    return apiClient.get<CategoryMetadata[]>("/products/categories");
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<ProductListItem[]> {
    return apiClient.get<ProductListItem[]>(
      `/products/featured?limit=${limit}`
    );
  }

  /**
   * Get single product (basic info)
   */
  async getProduct(idOrSlug: string): Promise<ProductListItem> {
    return apiClient.get<ProductListItem>(`/products/${idOrSlug}`);
  }

  /**
   * Get single product (full detail)
   */
  async getProductDetail(idOrSlug: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${idOrSlug}/detail`);
  }

  /**
   * Add a review to a product
   */
  async addReview(productId: string, data: CreateReviewData): Promise<Product> {
    return apiClient.post<Product>(`/products/${productId}/reviews`, data);
  }

  /**
   * Mark a review as helpful
   */
  async markReviewHelpful(reviewId: string): Promise<{ helpful: number }> {
    return apiClient.post<{ helpful: number }>(
      `/products/reviews/${reviewId}/helpful`,
      {}
    );
  }
}

export const productsService = new ProductsService();
