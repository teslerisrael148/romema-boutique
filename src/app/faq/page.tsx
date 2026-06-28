import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { faqCategories } from "@/data/faq";
import { siteConfig, whatsappLink } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description:
    "תשובות לשאלות הנפוצות על משלוחים, החזרות, הזמנות ותשלומים ברוממה.",
};

export default function FaqPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-12 text-center">
        <Reveal>
          <p className="label-overline mb-3">תמיכה</p>
          <h1 className="font-serif text-4xl font-bold  sm:text-5xl">
            שאלות נפוצות
          </h1>
          <div className="divider-gold mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-warmgray-600">
            ריכזנו עבורך את כל מה שצריך לדעת. לא מצאת תשובה? אנחנו כאן בשבילך.
          </p>
        </Reveal>
      </header>

      <div className="mx-auto max-w-3xl space-y-12">
        {faqCategories.map((category, i) => (
          <Reveal key={category.title} delay={i * 0.05}>
            <h2 className="mb-5 font-serif text-2xl font-semibold ">
              {category.title}
            </h2>
            <FaqAccordion items={category.items} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-16 max-w-3xl rounded-3xl bg-blush-fade p-8 text-center sm:p-12">
        <h2 className="font-serif text-2xl font-semibold ">
          עדיין יש לך שאלה?
        </h2>
        <p className="mt-3 text-warmgray-600">
          צוות רוממה זמין עבורך וישמח לעזור בכל שאלה או התלבטות.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(`שלום ${siteConfig.name}, יש לי שאלה 🙂`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto"
          >
            <MessageCircle size={18} />
            שיחה בוואטסאפ
          </a>
          <Link href="/contact" className="btn-outline w-full sm:w-auto">
            לעמוד יצירת קשר
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
