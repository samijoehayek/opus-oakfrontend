import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { featuredProducts } from "@/app/data/products";
import { formatPrice } from "@/app/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop"
          alt="Beautiful living room with Loaf sofa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        {/* Content in the middle of the hero section */}
        {/* <div className="absolute inset-0 flex items-center">
          <div className="container-wide">
            <div className="max-w-xl text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                New Collection
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight">
                Timeless
                <br />
                <em>Opus&Oak</em>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                Seriously comfy sofas, beautiful beds and laid-back furniture
                for the whole home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="accent">
                  Shop Sofas
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* Trust Bar */}
      <section className="bg-[var(--color-charcoal)] text-white py-4">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>Expert 2-person delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              <span>14 day home trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>10 year frame guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>140+ fabric options</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container-wide py-16 md:py-24">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-4">
          Shop by Category
        </h2>
        <p className="text-[var(--color-muted)] text-center mb-12 max-w-xl mx-auto">
          From squishy sofas to beautiful beds, find the perfect piece for your
          laid-back lifestyle.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              name: "Sofas",
              href: "/sofas",
              image:
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
            },
            {
              name: "Beds",
              href: "/beds",
              image:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop",
            },
            {
              name: "Armchairs",
              href: "/armchairs",
              image:
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop",
            },
            {
              name: "Furniture",
              href: "/furniture",
              image:
                "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=400&fit=crop",
            },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white mb-2">
                  {category.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white transition-colors">
                  Shop now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Product */}
      <section className="bg-[var(--color-cream-dark)]">
        <div className="container-wide py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=900&fit=crop"
                alt="Squisharoo Sofa Bed"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white text-sm rounded-full mb-4">
                Best Seller
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
                Squisharoo Sofa Bed
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg mb-6 leading-relaxed">
                A few Loafy things all in one. A sofa with a comfy upright sit.
                A snuggly bed with a pocket sprung mattress. Your guests will
                thank you for it.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Handcrafted in Britain",
                  "Pocket sprung mattress",
                  "140+ fabric options",
                  "14 day home trial",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-[var(--color-charcoal)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <Link href="/products/squisharoo-sofa-bed-non-flat-pack">
                  <Button size="lg">
                    View Squisharoo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <span className="text-lg font-medium text-[var(--color-charcoal)]">
                  From £2,795
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container-wide py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-2">
              Loafer Favourites
            </h2>
            <p className="text-[var(--color-muted)]">
              The pieces our customers can&apos;t get enough of
            </p>
          </div>
          <Link
            href="/all"
            className="hidden md:flex items-center gap-2 text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-cream-dark)] mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-[var(--color-muted)] mb-1">
                {product.category}
              </p>
              <h3 className="font-medium text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {product.name}
              </h3>
              <p className="font-medium text-[var(--color-charcoal)]">
                From {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/all">
            <Button variant="secondary">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Showroom CTA */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
          alt="Loaf Showroom"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-white mb-4">
              Visit a Loaf Shack
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Our shacks are more slowroom than showroom. Rest-drive our wares
              and stay as long as you like.
            </p>
            <Link href="/showrooms">
              <Button size="lg" variant="accent">
                Find your nearest
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container-wide py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-6">
            Made by hand, built to last
          </h2>
          <p className="text-[var(--color-warm-gray)] text-lg leading-relaxed mb-8">
            We use Blighty&apos;s best to handcraft our wares. Generations of
            know-how go into every pleat, fold and frame. Our winning recipe of
            feather, foam and fibre makes for less plumping, more slumping.
          </p>
          <Link href="/about">
            <Button variant="secondary">
              Our story
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
