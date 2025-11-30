import { apiClient } from "@/lib/api-client";
import type {
  Address,
  OrderSummary,
  WishlistItem,
  UpdateProfileData,
} from "@/types/account";
import type { User } from "@/types/auth";

export const accountService = {
  // Profile
  async updateProfile(data: UpdateProfileData): Promise<User> {
    return apiClient.patch<User>("/users/profile", data, true);
  },

  // Addresses
  async getAddresses(): Promise<Address[]> {
    return apiClient.get<Address[]>("/users/addresses", true);
  },

  async addAddress(address: Omit<Address, "id">): Promise<Address> {
    return apiClient.post<Address>("/users/addresses", address, true);
  },

  async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    return apiClient.patch<Address>(`/users/addresses/${id}`, address, true);
  },

  async deleteAddress(id: string): Promise<void> {
    return apiClient.delete<void>(`/users/addresses/${id}`, true);
  },

  async setDefaultAddress(id: string): Promise<Address> {
    return apiClient.patch<Address>(`/users/addresses/${id}/default`, {}, true);
  },

  // Orders
  async getRecentOrders(limit = 5): Promise<OrderSummary[]> {
    return apiClient.get<OrderSummary[]>(`/orders?limit=${limit}`, true);
  },

  // Wishlist
  async getWishlist(): Promise<WishlistItem[]> {
    return apiClient.get<WishlistItem[]>("/wishlist", true);
  },

  async removeFromWishlist(productId: string): Promise<void> {
    return apiClient.delete<void>(`/wishlist/${productId}`, true);
  },
};
