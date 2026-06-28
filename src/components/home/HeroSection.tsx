"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section>
      <div className="relative min-h-[70vh] overflow-hidden sm:min-h-[75vh] lg:min-h-[85vh]">
        {/* Full-hero background */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_12%] brightness-[1.08] contrast-[1.03] sm:object-[center_18%] lg:object-[72%_center]"
          />
        </div>

        {/* Warm wash + center scrim — keeps typography readable on all breakpoints */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ivory/45 via-ivory/20 to-ivory/50 sm:from-ivory/40 sm:via-ivory/15 sm:to-ivory/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_55%,rgba(253,251,246,0.72)_0%,rgba(253,251,246,0.28)_55%,rgba(253,246,245,0.08)_100%)] sm:bg-[radial-gradient(ellipse_75%_55%_at_42%_58%,rgba(253,251,246,0.68)_0%,rgba(253,251,246,0.22)_50%,rgba(253,246,245,0.06)_100%)]"
          aria-hidden="true"
        />
        <div className="grain absolute inset-0 opacity-60" />

        <div className="container-lux relative z-10 flex min-h-[70vh] items-end pb-10 pt-28 sm:min-h-[75vh] sm:pb-12 sm:pt-32 lg:min-h-[85vh] lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-lg lg:text-right">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="label-overline inline-flex items-center gap-2"
          >
            <Sparkles size={14} /> בוטיק יוקרה לכיסויי ראש
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="heading-plain mt-3 font-serif text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="text-gold-sparkle">רבות בנות עשו חייל</span>
            <br />
            ואת עלית על כולנה
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-warmgray-600 sm:text-base lg:mx-0"
          >
            רוממה – מלשון רוממות.
            <br />
            מותג יוקרה לכיסויי ראש ואופנה צנועה, שנולד מתוך רצון לרומם כל אישה ולהעניק לה
            תחושת יופי, כבוד וביטחון, בעבודת יד מוקפדת ובאיכות ללא פשרות
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row lg:justify-start"
          >
            <Link href="/shop" className="btn-gold w-full sm:w-auto">
              לכל המוצרים
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
            <Link href="/about" className="btn-outline w-full sm:w-auto">
              רוממה - הסיפור שלי
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-warmgray-500 lg:justify-start"
          >
            <div>
              <p className="font-serif text-xl font-bold heading-gold">100%</p>
              <p>עבודת יד</p>
            </div>
          </motion.div>
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
