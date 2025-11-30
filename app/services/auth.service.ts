import { apiClient } from "@/app/lib/api-client";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  ChangePasswordData,
} from "@/app/types/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    this.setSession(response);
    return response;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    this.setSession(response);
    return response;
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>("/auth/profile", true);
  },

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(
      "/auth/change-password",
      data,
      true
    );
  },

  setSession(authResponse: AuthResponse): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", authResponse.accessToken);
    localStorage.setItem("user", JSON.stringify(authResponse.user));
  },

  clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};
