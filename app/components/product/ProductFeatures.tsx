import {
  Hammer,
  Cloud,
  BedDouble,
  Frame,
  Truck,
  RotateCcw,
  Shield,
  Leaf,
} from "lucide-react";
import { ProductFeature } from "@/app/types";

const iconMap: Record<string, React.ReactNode> = {
  hammer: <Hammer className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  bed: <BedDouble className="h-6 w-6" />,
  frame: <Frame className="h-6 w-6" />,
  truck: <Truck className="h-6 w-6" />,
  return: <RotateCcw className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
};

interface ProductFeaturesProps {
  features: ProductFeature[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {features.map((feature) => (
        <div key={feature.id} className="flex gap-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-[var(--color-cream-dark)] flex items-center justify-center text-[var(--color-charcoal)]">
            {iconMap[feature.icon] || <Cloud className="h-6 w-6" />}
          </div>
          <div>
            <h4 className="font-medium text-[var(--color-charcoal)] mb-1">
              {feature.title}
            </h4>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
