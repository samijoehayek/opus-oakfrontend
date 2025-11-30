import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { mockProduct } from "@/data/products";

// In a real app, this would fetch from your backend
async function getProduct(slug: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // For now, return mock product for matching slugs
  if (
    slug === "squisharoo-sofa-bed-non-flat-pack" ||
    slug === mockProduct.slug
  ) {
    return mockProduct;
  }

  // Return mock product for any product slug (for demo purposes)
  return {
    ...mockProduct,
    slug,
    name: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Loaf",
    };
  }

  return {
    title: `${product.name} | Loaf`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Loaf`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.src || "",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
