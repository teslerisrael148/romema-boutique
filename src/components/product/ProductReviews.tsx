import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

export function ProductReviews({ product }: { product: Product }) {
  return (
    <section className="mt-20">
      <div className="flex flex-col gap-6 border-b border-warmgray-100 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold ">
            ביקורות לקוחות
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={product.rating} showValue size={18} />
            <span className="text-sm text-warmgray-500">
              מבוסס על {product.reviews.length} ביקורות
            </span>
          </div>
        </div>
        <Link href="/contact" className="btn-outline self-start">
          יצירת קשר
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {product.reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-warmgray-100 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 font-serif font-bold text-blush-700">
                  {review.author.charAt(0)}
                </span>
                <div>
                  <p className="font-medium text-warmgray-900">{review.author}</p>
                  <p className="text-xs text-warmgray-400">
                    {formatDate(review.date)}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} size={14} />
            </div>
            <h3 className="mt-4 font-medium ">{review.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-warmgray-600">
              {review.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
