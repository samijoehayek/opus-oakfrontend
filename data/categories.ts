export interface CategoryProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  images: {
    src: string;
    alt: string;
  }[];
  badge?: string;
  fabricCount?: number;
  category: string;
}

export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  introTitle: string;
  introText: string;
}

export const categories: Record<string, CategoryConfig> = {
  sofas: {
    slug: "sofas",
    title: "Sofas",
    description:
      "Handcrafted with precision, designed for those who appreciate the art of refined living.",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop",
    introTitle: "The Opus&Oak Sofa Collection",
    introText:
      "Every sofa in our collection is a testament to exceptional craftsmanship. We partner with Europe's finest ateliers to create pieces that blend timeless design with uncompromising comfort. Choose your size, select from our curated fabric collection, and let us craft something truly yours.",
  },
  armchairs: {
    slug: "armchairs",
    title: "Armchairs",
    description:
      "Statement pieces that combine sculptural beauty with exceptional comfort.",
    heroImage:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1920&h=1080&fit=crop",
    introTitle: "The Opus&Oak Armchair Collection",
    introText:
      "An armchair is more than a seat—it's a personal retreat. Our collection features designs that command attention while inviting you to sink in and stay awhile. Each piece is crafted with the same dedication to quality that defines everything we do.",
  },
  beds: {
    slug: "beds",
    title: "Beds",
    description: "Where exceptional design meets the perfect night's sleep.",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1920&h=1080&fit=crop",
    introTitle: "The Opus&Oak Bed Collection",
    introText:
      "Your bedroom should be a sanctuary. Our beds are designed to be the centerpiece of that space—beautiful to look at, impossible to leave. Upholstered in your choice of premium fabrics and built on frames that will last for generations.",
  },
  tables: {
    slug: "tables",
    title: "Tables",
    description: "The foundation of every gathering, crafted to perfection.",
    heroImage:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1920&h=1080&fit=crop",
    introTitle: "The Opus&Oak Table Collection",
    introText:
      "From intimate dinners to grand celebrations, our tables set the stage. Each piece is crafted from the finest materials—solid hardwoods, natural stone, and artisan metals—designed to anchor your space with quiet confidence.",
  },
  accessories: {
    slug: "accessories",
    title: "Accessories",
    description: "The finishing touches that complete your space.",
    heroImage:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
    introTitle: "The Opus&Oak Accessories Collection",
    introText:
      "It's the details that transform a house into a home. Our curated collection of accessories—from sculptural lighting to artisan cushions—adds the final layer of refinement to your space.",
  },
};

// Product data organized by category
export const products: CategoryProduct[] = [
  // Sofas
  {
    id: "sofa-1",
    name: "The Belmont",
    slug: "belmont-sofa",
    tagline: "Classic elegance meets modern comfort",
    price: 4500,
    category: "sofas",
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
    id: "sofa-2",
    name: "The Kensington",
    slug: "kensington-sofa",
    tagline: "Deep comfort with refined lines",
    price: 5200,
    originalPrice: 5800,
    category: "sofas",
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
  // Armchairs
  {
    id: "armchair-1",
    name: "The Windsor",
    slug: "windsor-armchair",
    tagline: "Sculptural elegance for any corner",
    price: 2200,
    category: "armchairs",
    images: [
      {
        src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
        alt: "Windsor Armchair front view",
      },
      {
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop",
        alt: "Windsor Armchair angle view",
      },
    ],
    fabricCount: 90,
  },
  {
    id: "armchair-2",
    name: "The Marlowe",
    slug: "marlowe-armchair",
    tagline: "Mid-century inspired, modern comfort",
    price: 1850,
    category: "armchairs",
    images: [
      {
        src: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop",
        alt: "Marlowe Armchair front view",
      },
      {
        src: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop",
        alt: "Marlowe Armchair in room",
      },
    ],
    badge: "New",
    fabricCount: 85,
  },
  // Beds
  {
    id: "bed-1",
    name: "The Mayfair",
    slug: "mayfair-bed",
    tagline: "Grand proportions, timeless appeal",
    price: 3800,
    category: "beds",
    images: [
      {
        src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
        alt: "Mayfair Bed front view",
      },
      {
        src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
        alt: "Mayfair Bed in bedroom",
      },
    ],
    badge: "Best Seller",
    fabricCount: 100,
  },
  {
    id: "bed-2",
    name: "The Chelsea",
    slug: "chelsea-bed",
    tagline: "Understated luxury for restful nights",
    price: 3200,
    category: "beds",
    images: [
      {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop",
        alt: "Chelsea Bed front view",
      },
      {
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop",
        alt: "Chelsea Bed styled",
      },
    ],
    fabricCount: 95,
  },
  // Tables
  {
    id: "table-1",
    name: "The Harrington",
    slug: "harrington-table",
    tagline: "Solid oak, endless possibilities",
    price: 2800,
    category: "tables",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=600&fit=crop",
        alt: "Harrington Table front view",
      },
      {
        src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
        alt: "Harrington Table detail",
      },
    ],
    badge: "New",
  },
  {
    id: "table-2",
    name: "The Bromley",
    slug: "bromley-table",
    tagline: "Contemporary lines, natural materials",
    price: 2400,
    category: "tables",
    images: [
      {
        src: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&h=600&fit=crop",
        alt: "Bromley Table front view",
      },
      {
        src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
        alt: "Bromley Table in dining room",
      },
    ],
  },
  // Accessories
  {
    id: "accessory-1",
    name: "The Luxe Throw",
    slug: "luxe-throw",
    tagline: "Cashmere blend, pure comfort",
    price: 280,
    category: "accessories",
    images: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        alt: "Luxe Throw draped",
      },
      {
        src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop",
        alt: "Luxe Throw on sofa",
      },
    ],
  },
  {
    id: "accessory-2",
    name: "The Artisan Cushion Set",
    slug: "artisan-cushion-set",
    tagline: "Hand-finished, naturally textured",
    price: 180,
    category: "accessories",
    images: [
      {
        src: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&h=600&fit=crop",
        alt: "Artisan Cushion Set",
      },
      {
        src: "https://images.unsplash.com/photo-1558882224-dda166733046?w=800&h=600&fit=crop",
        alt: "Artisan Cushions on chair",
      },
    ],
    badge: "New",
  },
];

// Helper function to get products by category
export function getProductsByCategory(categorySlug: string): CategoryProduct[] {
  return products.filter((product) => product.category === categorySlug);
}

// Helper function to get category config
export function getCategoryConfig(
  categorySlug: string
): CategoryConfig | undefined {
  return categories[categorySlug];
}
