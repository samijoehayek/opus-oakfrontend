"use client";

import { forwardRef, ButtonHTMLAttributes, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-ink)] focus-visible:ring-[var(--color-charcoal)]",
        secondary:
          "bg-transparent border-2 border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white",
        tertiary:
          "bg-transparent text-[var(--color-charcoal)] underline underline-offset-4 hover:text-[var(--color-primary)]",
        accent:
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]",
        ghost:
          "bg-transparent hover:bg-[var(--color-sand)] text-[var(--color-charcoal)]",
        link: "bg-transparent text-[var(--color-charcoal)] hover:text-[var(--color-primary)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-md",
        md: "h-11 px-6 text-sm rounded-md",
        lg: "h-14 px-8 text-base rounded-lg",
        xl: "h-16 px-10 text-lg rounded-lg",
        icon: "h-10 w-10 rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    // If asChild, we render the child directly with our classes
    if (asChild && children) {
      const child = children as ReactElement<{ className?: string }>;
      return (
        <span
          className={cn(
            buttonVariants({ variant, size, fullWidth, className })
          )}
        >
          {child}
        </span>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
