import { ApiError } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error: ApiError = {
        statusCode: response.status,
        message: data?.message || "An error occurred",
        error: data?.error,
      };

      // Handle token expiration
      if (response.status === 401) {
        // Clear stored tokens
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          // Optionally redirect to login
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }
      }

      throw error;
    }

    return data as T;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      method = "GET",
      body,
      headers = {},
      requiresAuth = false,
    } = options;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (requiresAuth) {
      const token = this.getAccessToken();
      if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    return this.handleResponse<T>(response);
  }

  // Convenience methods
  get<T>(endpoint: string, requiresAuth = false) {
    return this.request<T>(endpoint, { method: "GET", requiresAuth });
  }

  post<T>(endpoint: string, body: unknown, requiresAuth = false) {
    return this.request<T>(endpoint, { method: "POST", body, requiresAuth });
  }

  put<T>(endpoint: string, body: unknown, requiresAuth = false) {
    return this.request<T>(endpoint, { method: "PUT", body, requiresAuth });
  }

  patch<T>(endpoint: string, body: unknown, requiresAuth = false) {
    return this.request<T>(endpoint, { method: "PATCH", body, requiresAuth });
  }

  delete<T>(endpoint: string, requiresAuth = false) {
    return this.request<T>(endpoint, { method: "DELETE", requiresAuth });
  }
}

export const apiClient = new ApiClient(API_URL);
