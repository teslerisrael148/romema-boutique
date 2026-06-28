import { cn, gradientFor } from "@/lib/utils";

interface ProductImageProps {
  seed: string;
  index?: number;
  label?: string;
  className?: string;
  rounded?: boolean;
}

/**
 * Placeholder תמונה גנרטיבי ויוקרתי.
 * בעת מעבר לסביבת ייצור — להחליף ב-<Image> של next/image עם תמונות אמיתיות.
 */
export function ProductImage({
  seed,
  index = 0,
  label,
  className,
  rounded = true,
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        rounded && "rounded-2xl",
        className,
      )}
      style={{ background: gradientFor(seed, index) }}
      role="img"
      aria-label={label ?? "תמונת מוצר"}
    >
      {/* Monogram watermark */}
      <span className="select-none font-serif text-[22vw] font-bold leading-none text-white/25 sm:text-[120px]">
        ר
      </span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20" />
      {label ? (
        <span className="absolute bottom-3 right-3 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-warmgray-800 backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}
