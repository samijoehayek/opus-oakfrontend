"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Ruler, Palette, Award, Hammer } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Add this component to your page or create a separate file
export function CustomFurnitureSection() {
  const features = [
    {
      icon: Ruler,
      title: "Made to Measure",
      description: "Every piece crafted to your exact specifications",
    },
    {
      icon: Palette,
      title: "Premium Materials",
      description: "Sourced from the world's finest suppliers",
    },
    {
      icon: Award,
      title: "Designer Brands",
      description: "Partnered with renowned European ateliers",
    },
    {
      icon: Hammer,
      title: "Master Craftsmen",
      description: "Built by hands with decades of expertise",
    },
  ];

  return (
    <section className="relative bg-[var(--color-charcoal)] text-white overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-12 py-24 md:py-32">
        {/* Top content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 md:mb-32">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block text-[var(--color-sand)] text-sm tracking-[0.2em] uppercase mb-6">
              The Opus&Oak Difference
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1]">
              Bespoke Furniture,
              <br />
              <span className="text-[var(--color-sand)]">
                Uncompromising Quality
              </span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              We partner with Europe's most prestigious design houses to bring
              you furniture that's made exactly to your vision—crafted with
              materials that last generations, at prices that make sense.
            </p>
            <Link href="/custom">
              <Button
                size="lg"
                className="bg-[var(--color-sand)] text-[var(--color-charcoal)] hover:bg-white"
              >
                Start Your Design
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Image composition */}
          <div className="relative h-[500px] md:h-[600px]">
            <motion.div
              className="absolute top-0 right-0 w-[70%] h-[65%] z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop"
                alt="Luxury custom sofa"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-[60%] h-[55%] z-20 border-8 border-[var(--color-charcoal)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop"
                alt="Craftsman at work"
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Decorative element */}
            <motion.div
              className="absolute top-[20%] left-[10%] w-24 h-24 border border-[var(--color-sand)]/30 z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 border border-[var(--color-sand)]/30 text-[var(--color-sand)]">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom marquee */}
        <div className="mt-20 md:mt-32 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  "B&B Italia",
                  "Poltrona Frau",
                  "Cassina",
                  "Minotti",
                  "Flexform",
                  "Molteni&C",
                ].map((brand) => (
                  <span
                    key={`${brand}-${i}`}
                    className="mx-8 md:mx-16 text-2xl md:text-4xl font-[family-name:var(--font-display)] text-white/20"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
