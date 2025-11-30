import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[var(--color-cream-dark)] mb-6">
          <Search className="h-10 w-10 text-[var(--color-muted)]" />
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
          Product not found
        </h1>
        <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It
          might have been removed or the link might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
          <Link href="/sofas">
            <Button variant="secondary">Browse sofas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
