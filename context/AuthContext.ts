"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ApiError,
} from "@/types/auth";
import { authService } from "@/services/auth.service";

// 1. Define the context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

// 2. Create context with a default value that matches the type
const defaultContextValue: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
  clearError: () => {},
};

// 3. Create the context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// 4. Provider props type
interface AuthProviderProps {
  children: React.ReactNode;
}

// 5. Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authService.getStoredUser();
        const token = authService.getAccessToken();

        if (storedUser && token) {
          try {
            const freshUser = await authService.getProfile();
            setUser(freshUser);
          } catch {
            authService.clearSession();
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Listen for logout events
  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      router.push("/auth");
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [router]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      const message = Array.isArray(apiError.message)
        ? apiError.message[0]
        : apiError.message;
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(credentials);
      setUser(response.user);
    } catch (err) {
      const apiError = err as ApiError;
      const message = Array.isArray(apiError.message)
        ? apiError.message[0]
        : apiError.message;
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    router.push("/");
  }, [router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Build the context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
}

// 6. Custom hook to use the context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context;
}
