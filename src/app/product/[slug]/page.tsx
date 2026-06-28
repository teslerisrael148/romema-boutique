import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { getCategory } from "@/data/categories";
import { siteConfig } from "@/lib/config";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "מוצר לא נמצא" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
    },
  };
}

const guarantees = [
  { icon: Truck, title: "משלוח מהיר", text: "1–3 ימי עסקים" },
  { icon: RefreshCw, title: "החזרה קלה", text: "תוך 14 יום" },
  { icon: ShieldCheck, title: "תשלום מאובטח", text: "בתקן PCI" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-lux py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-warmgray-500">
        <Link href="/" className="hover:text-champagne-700">
          בית
        </Link>
        <ChevronLeft size={14} />
        <Link href="/shop" className="hover:text-champagne-700">
          חנות
        </Link>
        <ChevronLeft size={14} />
        <Link
          href={`/shop?category=${category.slug}`}
          className="hover:text-champagne-700"
        >
          {category.name}
        </Link>
        <ChevronLeft size={14} />
        <span className="text-warmgray-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery
            seed={product.slug}
            imageCount={product.imageCount}
            name={product.name}
          />
        </div>

        <div>
          <ProductBuyBox product={product} />

          <div className="mt-8 grid grid-cols-3 gap-3">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl bg-cream p-4 text-center"
              >
                <g.icon size={22} className="mx-auto text-champagne-600" />
                <p className="mt-2 text-sm font-medium text-warmgray-900">
                  {g.title}
                </p>
                <p className="text-xs text-warmgray-500">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductReviews product={product} />

      <section className="mt-24">
        <SectionHeading
          overline="אולי יעניין אותך"
          title="מוצרים נוספים"
        />
        <ProductGrid products={related} className="mt-12" />
      </section>
    </div>
  );
}
