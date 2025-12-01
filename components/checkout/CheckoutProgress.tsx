"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckoutStep } from "@/types/checkout";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
  completedSteps: CheckoutStep[];
  onStepClick: (step: CheckoutStep) => void;
}

const steps: { key: CheckoutStep; label: string; number: number }[] = [
  { key: "contact", label: "Contact", number: 1 },
  { key: "shipping", label: "Shipping", number: 2 },
  { key: "payment", label: "Payment", number: 3 },
  { key: "review", label: "Review", number: 4 },
];

export function CheckoutProgress({
  currentStep,
  completedSteps,
  onStepClick,
}: CheckoutProgressProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-8">
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.key);
          const isCurrent = currentStep === step.key;
          const isClickable = isCompleted || index <= currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <button
                onClick={() => isClickable && onStepClick(step.key)}
                disabled={!isClickable}
                className={cn(
                  "flex items-center gap-3 group",
                  isClickable ? "cursor-pointer" : "cursor-not-allowed"
                )}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors",
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-[var(--color-charcoal)] text-white"
                      : "bg-[var(--color-cream-dark)] text-[var(--color-muted)]"
                  )}
                  whileHover={isClickable ? { scale: 1.05 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step.number}
                </motion.div>
                <span
                  className={cn(
                    "font-medium transition-colors",
                    isCurrent
                      ? "text-[var(--color-charcoal)]"
                      : isCompleted
                      ? "text-green-600"
                      : "text-[var(--color-muted)]",
                    isClickable && "group-hover:text-[var(--color-charcoal)]"
                  )}
                >
                  {step.label}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-[2px] bg-[var(--color-border)] relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-green-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-charcoal)]">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            {steps[currentIndex].label}
          </span>
        </div>
        <div className="h-2 bg-[var(--color-cream-dark)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-charcoal)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
