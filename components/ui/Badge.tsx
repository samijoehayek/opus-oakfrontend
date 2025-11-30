import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-charcoal)] text-white",
        secondary: "bg-[var(--color-sand)] text-[var(--color-charcoal)]",
        accent: "bg-[var(--color-primary)] text-white",
        success: "bg-[var(--color-sage)] text-white",
        outline:
          "border border-[var(--color-charcoal)] text-[var(--color-charcoal)] bg-transparent",
      },
      size: {
        sm: "text-xs px-2 py-0.5 rounded",
        md: "text-xs px-2.5 py-1 rounded-md",
        lg: "text-sm px-3 py-1.5 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
