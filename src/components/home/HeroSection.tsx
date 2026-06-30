"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function HeroSection() {
  return (
    <section>
      <div className="relative min-h-[70vh] overflow-hidden bg-ivory sm:min-h-[75vh] lg:min-h-[85vh]">
        <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="container-lux relative z-10 flex min-h-[70vh] items-end pb-10 pt-28 sm:min-h-[75vh] sm:pb-12 sm:pt-32 lg:min-h-[85vh] lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-lg lg:text-right">
          <p className="label-overline hero-fade-in inline-flex items-center gap-2">
            <Sparkles size={14} /> בוטיק יוקרה לכיסויי ראש
          </p>

          <h1 className="heading-plain hero-fade-in hero-fade-in-delay-1 mt-3 font-serif text-3xl font-bold leading-[1.28] sm:text-4xl sm:leading-[1.22] lg:text-[2.75rem] lg:leading-[1.18]">
            <span className="text-gold-sparkle">רבות בנות עשו חייל</span>
            <br />
            <span className="heading-rose">ואת עלית על כולנה</span>
          </h1>

          <p className="hero-fade-in hero-fade-in-delay-2 mx-auto mt-4 max-w-sm text-sm leading-relaxed text-warmgray-600 sm:text-base lg:mx-0">
            רוממה – מלשון רוממות.
            <br />
            מותג יוקרה לכיסויי ראש ואופנה צנועה, שנולד מתוך רצון לרומם כל אישה ולהעניק לה
            תחושת יופי, כבוד וביטחון, בעבודת יד מוקפדת ובאיכות ללא פשרות
          </p>

          <div className="hero-fade-in hero-fade-in-delay-3 mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row lg:justify-start">
            <Link href="/shop" className="btn-gold w-full sm:w-auto">
              לכל המוצרים
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
            <Link href="/about" className="btn-outline w-full sm:w-auto">
              רוממה - הסיפור שלי
            </Link>
          </div>

          <div className="hero-fade-in hero-fade-in-delay-4 mt-6 flex items-center justify-center gap-6 text-xs text-warmgray-500 lg:justify-start">
            <div>
              <p className="font-serif text-xl font-bold heading-gold">100%</p>
              <p>עבודת יד</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Marquee */}
      <div className="border-y border-warmgray-200/60 bg-ivory/40 py-3">
        <div className="flex gap-12 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee-rtl gap-12 text-sm font-medium text-warmgray-500">
            {Array.from({ length: 2 }).map((_, g) => (
              <div key={g} className="flex gap-12">
                <span>✦ משלוח חינם בהזמנה מעל {siteConfig.shipping.freeShippingThreshold} ₪</span>
                <span>✦ אריזת מתנה בכל קניה</span>
                <span>✦ 100% עבודת יד</span>
                <span>✦ החזרה תוך 14 יום</span>
                <span>✦ ייעוץ אישי בוואטסאפ</span>
                <span>✦ תשלום מאובטח</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
