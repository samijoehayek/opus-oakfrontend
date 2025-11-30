import { ProtectedRoute } from "@/components/auth";
import { AccountSidebar } from "@/components/account";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--color-background)] pt-[88px]">
        <div className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
