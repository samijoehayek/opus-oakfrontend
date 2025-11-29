"use client";

import { useState, useMemo } from "react";
import {
  SofasHero,
  SofasIntro,
  SofasFilter,
  SofasGrid,
  SofaProduct,
} from "@/app/components/sofas";

// Mock data - replace with real data fetching
const sofasData: SofaProduct[] = [
  {
    id: "1",
    name: "The Belmont",
    slug: "belmont-sofa",
    tagline: "Classic elegance meets modern comfort",
    price: 4500,
    images: [
      {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        alt: "Belmont Sofa front view",
      },
      {
        src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
        alt: "Belmont Sofa angle view",
      },
    ],
    badge: "Best Seller",
    fabricCount: 140,
  },
  {
    id: "2",
    name: "The Kensington",
    slug: "kensington-sofa",
    tagline: "Deep comfort with refined lines",
    price: 5200,
    originalPrice: 5800,
    images: [
      {
        src: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&h=600&fit=crop",
        alt: "Kensington Sofa front view",
      },
      {
        src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop",
        alt: "Kensington Sofa in living room",
      },
    ],
    badge: "New",
    fabricCount: 120,
  },
];

export default function SofasPage() {
  const [sortBy, setSortBy] = useState("featured");

  const sortedProducts = useMemo(() => {
    const products = [...sofasData];

    switch (sortBy) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "newest":
        return products.reverse();
      default:
        return products;
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <SofasHero />
      <SofasIntro />
      <SofasFilter
        totalProducts={sortedProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <SofasGrid products={sortedProducts} />
    </div>
  );
}
