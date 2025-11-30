"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={cn("divide-y divide-[var(--color-border)]", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ id, children, className }: AccordionItemProps) {
  return (
    <div className={cn("", className)} data-accordion-item={id}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({
  id,
  children,
  className,
}: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within Accordion");

  const isOpen = context.openItems.includes(id);

  return (
    <button
      onClick={() => context.toggleItem(id)}
      className={cn(
        "flex w-full items-center justify-between py-5 text-left font-medium transition-colors hover:text-[var(--color-primary)]",
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 text-[var(--color-muted)] transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({
  id,
  children,
  className,
}: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within Accordion");

  const isOpen = context.openItems.includes(id);

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-5 text-[var(--color-warm-gray)]", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
