import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBestSellers } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";

export function BestSellers() {
  const products = getBestSellers(8);

  return (
    <section className="container-lux py-20 sm:py-28">
      <SectionHeading
        overline="כל המוצרים"
        title="המטפחות שכולן אוהבות"
        description="הדגמים המבוקשים שלנו — נבחרו על ידי אלפי לקוחות מרוצות."
      />

      <ProductGrid products={products} className="mt-14" />

      <Reveal className="mt-12 text-center">
        <Link href="/shop" className="btn-outline">
          לכל המוצרים
          <ArrowLeft size={18} />
        </Link>
      </Reveal>
    </section>
  );
}
