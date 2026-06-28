import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { StaggerGroup } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-warmgray-200 py-20 text-center">
        <p className="font-serif text-xl text-warmgray-700">
          לא נמצאו מוצרים תואמים
        </p>
        <p className="mt-2 text-sm text-warmgray-500">
          נסי לשנות את הסינון או החיפוש
        </p>
      </div>
    );
  }

  return (
    <StaggerGroup
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </StaggerGroup>
  );
}
