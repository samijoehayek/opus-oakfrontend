"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Allow confirmation page without auth check
    if (pathname === "/checkout/confirmation") {
      setIsChecking(false);
      return;
    }

    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/auth?redirect=/checkout");
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading while checking auth (except for confirmation page)
  if (pathname !== "/checkout/confirmation" && (isLoading || isChecking)) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--color-charcoal)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
