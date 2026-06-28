import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";
import { Newsletter } from "@/components/Newsletter";

export function ContactCta() {
  return (
    <section className="container-lux py-20 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-warmgray-900 px-6 py-14 text-center text-ivory sm:px-12 sm:py-20">
        <div className="grain absolute inset-0" />
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #d2a865, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #eeb6b3, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-2xl">
          <p className="label-overline inline-flex items-center justify-center gap-2 text-champagne-300">
            <Sparkles size={14} /> מוזמנות לדבר איתנו
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
            לא בטוחה מה מתאים לך? אנחנו כאן בשבילך
          </h2>
          <p className="mt-4 text-base text-ivory/70 sm:text-lg">
            צוות רוממה ישמח לייעץ, להתאים ולעזור לך לבחור את הכיסוי המושלם — בלי
            התחייבות ובאהבה גדולה.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(`שלום ${siteConfig.name}, אשמח לקבל ייעוץ ✨`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              שיחה בוואטסאפ
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="btn w-full border border-white/20 text-ivory hover:bg-white/10 sm:w-auto"
            >
              <Phone size={18} />
              {siteConfig.contact.phone}
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-md border-t border-white/10 pt-10">
            <p className="mb-4 text-sm text-ivory/70">
              או הצטרפי למועדון וקבלי 10% הנחה
            </p>
            <Newsletter variant="dark" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
