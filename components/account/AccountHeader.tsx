"use client";

import { motion } from "framer-motion";

interface AccountHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AccountHeader({
  title,
  description,
  action,
}: AccountHeaderProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[var(--color-border)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--color-charcoal)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--color-muted)] mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
