import { Product, NavigationItem, RelatedProduct } from "@/types";

export const mockProduct: Product = {
  id: "squisharoo-sofa-bed",
  name: "Squisharoo Sofa Bed",
  slug: "squisharoo-sofa-bed-non-flat-pack",
  tagline: "A few Loafy things all in one",
  description:
    "A sofa with a comfy upright sit. A snuggly bed with a pocket sprung mattress.",
  longDescription: `This scrummy sofa bed has a slightly more upright sit than some of our others. But is still absolutely packed with loads of our signature squish. Sit up and sink in.

The hidden mattress is the real deal. Pocket sprung, properly tufted and made from breathable materials. Your guests will thank you for it.

We use Blighty's best to handcraft our wares. Generations of know-how go into every pleat, fold and frame.`,
  category: "Sofas",
  subcategory: "Sofa Beds",
  images: [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed front view",
      type: "main",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed in living room",
      type: "lifestyle",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed fabric detail",
      type: "detail",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed as bed",
      type: "main",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed styled",
      type: "lifestyle",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=800&fit=crop",
      alt: "Squisharoo Sofa Bed room setting",
      type: "lifestyle",
    },
  ],
  sizes: [
    {
      id: "small",
      name: "Small",
      label: "Small (2 Seater)",
      dimensions: {
        width: 176,
        depth: 98,
        height: 84,
        seatHeight: 45,
        seatDepth: 58,
      },
      bedDimensions: {
        width: 120,
        length: 180,
      },
      price: 2795,
      inStock: true,
      leadTime: "8-10 weeks",
    },
    {
      id: "medium",
      name: "Medium",
      label: "Medium (2.5 Seater)",
      dimensions: {
        width: 198,
        depth: 98,
        height: 84,
        seatHeight: 45,
        seatDepth: 58,
      },
      bedDimensions: {
        width: 140,
        length: 190,
      },
      price: 3095,
      inStock: true,
      leadTime: "8-10 weeks",
    },
    {
      id: "large",
      name: "Large",
      label: "Large (3 Seater)",
      dimensions: {
        width: 220,
        depth: 98,
        height: 84,
        seatHeight: 45,
        seatDepth: 58,
      },
      bedDimensions: {
        width: 160,
        length: 200,
      },
      price: 3395,
      inStock: true,
      leadTime: "8-10 weeks",
    },
  ],
  fabricCategories: [
    { id: "cotton", name: "Cotton Blend", description: "Soft and breathable" },
    { id: "linen", name: "Linen", description: "Naturally textured" },
    { id: "velvet", name: "Velvet", description: "Luxuriously soft" },
    { id: "wool", name: "Wool Blend", description: "Durable and cosy" },
    { id: "leather", name: "Leather", description: "Classic and refined" },
  ],
  fabrics: [
    {
      id: "oyster-cotton",
      name: "Oyster",
      color: "Oyster",
      hexColor: "#E8E4DC",
      category: "cotton",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 0,
      inStock: true,
    },
    {
      id: "stone-cotton",
      name: "Stone",
      color: "Stone",
      hexColor: "#B8AFA5",
      category: "cotton",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 0,
      inStock: true,
    },
    {
      id: "charcoal-cotton",
      name: "Charcoal",
      color: "Charcoal",
      hexColor: "#4A4A4A",
      category: "cotton",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 0,
      inStock: true,
    },
    {
      id: "sage-linen",
      name: "Sage",
      color: "Sage",
      hexColor: "#9CAF88",
      category: "linen",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 150,
      inStock: true,
    },
    {
      id: "oatmeal-linen",
      name: "Oatmeal",
      color: "Oatmeal",
      hexColor: "#D4C8B8",
      category: "linen",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 150,
      inStock: true,
    },
    {
      id: "midnight-velvet",
      name: "Midnight",
      color: "Midnight",
      hexColor: "#2C3E50",
      category: "velvet",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 250,
      inStock: true,
    },
    {
      id: "blush-velvet",
      name: "Blush",
      color: "Blush",
      hexColor: "#E8B4B8",
      category: "velvet",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 250,
      inStock: true,
    },
    {
      id: "forest-velvet",
      name: "Forest",
      color: "Forest",
      hexColor: "#2D5A4A",
      category: "velvet",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 250,
      inStock: true,
    },
    {
      id: "mustard-velvet",
      name: "Mustard",
      color: "Mustard",
      hexColor: "#D4A855",
      category: "velvet",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 250,
      inStock: true,
    },
    {
      id: "terracotta-wool",
      name: "Terracotta",
      color: "Terracotta",
      hexColor: "#C47D5E",
      category: "wool",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 200,
      inStock: true,
    },
    {
      id: "heather-wool",
      name: "Heather",
      color: "Heather",
      hexColor: "#8B7D8E",
      category: "wool",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 200,
      inStock: true,
    },
    {
      id: "tan-leather",
      name: "Tan",
      color: "Tan",
      hexColor: "#C4956A",
      category: "leather",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      price: 500,
      inStock: true,
    },
  ],
  features: [
    {
      id: "handcrafted",
      icon: "hammer",
      title: "Handcrafted in Britain",
      description:
        "We use Blighty's best to handcraft our wares. Generations of know-how go into every pleat, fold and frame.",
    },
    {
      id: "comfort",
      icon: "cloud",
      title: "Signature Squish",
      description:
        "Our winning recipe of feather, foam and fibre makes for less plumping, more slumping.",
    },
    {
      id: "mattress",
      icon: "bed",
      title: "Proper Mattress",
      description:
        "The hidden mattress is the real deal. Pocket sprung, properly tufted and made from breathable materials.",
    },
    {
      id: "frame",
      icon: "frame",
      title: "Solid Timber Frame",
      description:
        "The timber frame is glued and screwed the old-fashioned way.",
    },
  ],
  specifications: [
    {
      label: "Seat Cushion",
      value:
        "Foam, fibre, responsibly sourced duck feather. Seat cushions slowly bounce after every sit to help reduce plumping.",
    },
    {
      label: "Back Cushion",
      value: "100% responsibly sourced duck feather",
    },
    {
      label: "Mattress",
      value:
        "Made with breathable wool and cotton, plus super-soft polyester. Covered with a neutral damask and edged with Egyptian cotton ticking.",
    },
    { label: "Legs", value: "100% solid oak" },
    { label: "Frame", value: "Kiln-dried solid hardwood" },
    { label: "Assembly", value: "No assembly required" },
    { label: "Reassembly", value: "Can be disassembled for moving" },
  ],
  reviews: [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2024-11-15",
      title: "Absolutely gorgeous and so comfortable!",
      content:
        "We ordered the medium size in the sage linen and it's absolutely stunning. The quality is incredible and it's just as comfy as it looks. The bed is a proper mattress too - our guests have been very impressed!",
      verified: true,
      helpful: 24,
    },
    {
      id: "2",
      author: "James T.",
      rating: 5,
      date: "2024-11-02",
      title: "Worth every penny",
      content:
        "After much deliberation we went for this sofa bed and couldn't be happier. It's beautifully made and the attention to detail is fantastic. The delivery team were brilliant too.",
      verified: true,
      helpful: 18,
    },
    {
      id: "3",
      author: "Emma L.",
      rating: 4,
      date: "2024-10-28",
      title: "Beautiful but takes time",
      content:
        "Love the sofa - it's gorgeous and super comfortable. Only giving 4 stars as the wait time was longer than expected, but it was definitely worth it in the end.",
      verified: true,
      helpful: 12,
    },
    {
      id: "4",
      author: "Michael R.",
      rating: 5,
      date: "2024-10-15",
      title: "Best sofa bed we've owned",
      content:
        "This is our third sofa bed and by far the best. The mattress is genuinely comfortable - not like other thin sofa bed mattresses. The fabric is beautiful and it's held up really well.",
      verified: true,
      helpful: 31,
    },
  ],
  relatedProducts: [
    {
      id: "squisharoo-sofa",
      name: "Squisharoo Sofa",
      slug: "squisharoo-sofa",
      price: 2195,
      imageUrl:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
      category: "Sofas",
    },
    {
      id: "squisharoo-armchair",
      name: "Squisharoo Armchair",
      slug: "squisharoo-armchair",
      price: 1295,
      imageUrl:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
      category: "Armchairs",
    },
    {
      id: "squishmeister-sofa-bed",
      name: "Squishmeister Sofa Bed",
      slug: "squishmeister-sofa-bed",
      price: 3295,
      imageUrl:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=400&fit=crop",
      category: "Sofa Beds",
    },
    {
      id: "pudding-footstool",
      name: "Pudding Footstool",
      slug: "pudding-footstool",
      price: 495,
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: "Footstools",
    },
  ],
  averageRating: 4.8,
  totalReviews: 127,
  badges: ["Best Seller", "Made in Britain"],
  deliveryInfo: {
    price: 95,
    description:
      "Our delivery price covers an expert two-person team who'll bring everything in, set it up properly, and make sure everything's perfect.",
    leadTime: "8-10 weeks",
  },
  returns: {
    days: 14,
    description:
      "Test out your new Squisharoo Sofa Bed at home for 14 days. If for any reason you're not 100% happy, you can exchange it or return it.",
  },
  warranty: {
    years: 10,
    description: "10 year frame guarantee on all our sofas.",
  },
  careInstructions: [
    "Plump cushions regularly to maintain shape",
    "Vacuum with a soft brush attachment",
    "Blot spills immediately",
    "Professional cleaning recommended for deep stains",
    "Keep away from direct sunlight to prevent fading",
  ],
  assembly:
    "No assembly required. Our delivery crew will install your sofa bed and take away the packaging.",
  madeIn: "Long Eaton, England",
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Sofas",
    href: "/sofas",
    children: [
      { label: "All Sofas", href: "/sofas" },
      { label: "Corner Sofas", href: "/sofas/corner" },
      { label: "Chaise Sofas", href: "/sofas/chaise" },
      { label: "Sofa Beds", href: "/sofas/sofa-beds" },
      { label: "2 Seater Sofas", href: "/sofas/2-seater" },
      { label: "3 Seater Sofas", href: "/sofas/3-seater" },
    ],
    featured: [
      {
        title: "New In",
        description: "Discover our latest sofa arrivals",
        imageUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        href: "/sofas/new",
      },
    ],
  },
  {
    label: "Armchairs",
    href: "/armchairs",
    children: [
      { label: "All Armchairs", href: "/armchairs" },
      { label: "Accent Chairs", href: "/armchairs/accent" },
      { label: "Snuggler Chairs", href: "/armchairs/snuggler" },
    ],
  },
  {
    label: "Beds",
    href: "/beds",
    children: [
      { label: "All Beds", href: "/beds" },
      { label: "Upholstered Beds", href: "/beds/upholstered" },
      { label: "Wooden Beds", href: "/beds/wooden" },
      { label: "Storage Beds", href: "/beds/storage" },
    ],
  },
  {
    label: "Furniture",
    href: "/furniture",
    children: [
      { label: "Coffee Tables", href: "/furniture/coffee-tables" },
      { label: "Side Tables", href: "/furniture/side-tables" },
      { label: "Dining Tables", href: "/furniture/dining" },
      { label: "Storage", href: "/furniture/storage" },
    ],
  },
  {
    label: "Homeware",
    href: "/homeware",
    children: [
      { label: "Cushions", href: "/homeware/cushions" },
      { label: "Throws", href: "/homeware/throws" },
      { label: "Rugs", href: "/homeware/rugs" },
      { label: "Lighting", href: "/homeware/lighting" },
    ],
  },
  {
    label: "Clearance",
    href: "/clearance",
  },
];

export const featuredProducts: RelatedProduct[] = [
  {
    id: "1",
    name: "Squishmeister Corner Sofa",
    slug: "squishmeister-corner",
    price: 4295,
    imageUrl:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=400&fit=crop",
    category: "Corner Sofas",
  },
  {
    id: "2",
    name: "Crumpet Snuggler",
    slug: "crumpet-snuggler",
    price: 1595,
    imageUrl:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
    category: "Armchairs",
  },
  {
    id: "3",
    name: "Dusk Bed",
    slug: "dusk-bed",
    price: 1895,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop",
    category: "Beds",
  },
  {
    id: "4",
    name: "Cloud Coffee Table",
    slug: "cloud-coffee-table",
    price: 595,
    imageUrl:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=400&fit=crop",
    category: "Coffee Tables",
  },
];
