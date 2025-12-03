import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { productsService } from "@/services/product.service";

// Fetch product data on the server
async function getProduct(slug: string) {
  try {
    const product = await productsService.getProductDetail(slug);
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
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
      title: "Product Not Found | Opus&Oak",
    };
  }

  const primaryImage =
    product.images.find((img: { isPrimary: any }) => img.isPrimary) ||
    product.images[0];

  return {
    title: `${product.name} | Opus&Oak`,
    description: product.tagline || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Opus&Oak`,
      description: product.tagline || product.description.slice(0, 160),
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              width: 1200,
              height: 630,
              alt: primaryImage.altText || product.name,
            },
          ]
        : [],
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
