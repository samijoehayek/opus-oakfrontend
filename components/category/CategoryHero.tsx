"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryHeroProps {
  title: string;
  description: string;
  heroImage: string;
}

export function CategoryHero({
  title,
  description,
  heroImage,
}: CategoryHeroProps) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src={heroImage}
        alt={`${title} collection`}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
