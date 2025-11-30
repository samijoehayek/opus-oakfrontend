"use client";

import { motion } from "framer-motion";

interface CategoryIntroProps {
  title: string;
  text: string;
}

export function CategoryIntro({ title, text }: CategoryIntroProps) {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-20">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-charcoal)] mb-4">
          {title}
        </h2>
        <p className="text-[var(--color-warm-gray)] leading-relaxed">{text}</p>
      </motion.div>
    </section>
  );
}
