import type { Metadata } from "next";
import { AuthProvider } from "@/app/context/AuthContext";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opus & Oak",
  description: "Bespoke furniture crafted with precision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
