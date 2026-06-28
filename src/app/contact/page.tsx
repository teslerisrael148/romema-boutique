import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "נשמח לשמוע ממך! פרטי יצירת קשר, שעות פעילות וכתובת הבוטיק של רוממה.",
};

export default function ContactPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-12 text-center">
        <Reveal>
          <p className="label-overline mb-3">יצירת קשר</p>
          <h1 className="font-serif text-4xl font-bold  sm:text-5xl">
            נשמח לשמוע ממך
          </h1>
          <div className="divider-gold mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-warmgray-600">
            יש לך שאלה, התלבטות או בקשה מיוחדת? אנחנו כאן בשבילך בכל ערוץ שנוח לך.
          </p>
        </Reveal>
      </header>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Info */}
        <Reveal className="lg:col-span-2">
          <div className="space-y-4">
            <InfoCard
              icon={MapPin}
              title="כתובת הבוטיק"
              lines={[siteConfig.contact.address]}
            />
            <InfoCard
              icon={Phone}
              title="טלפון"
              lines={[siteConfig.contact.phone]}
              href={siteConfig.contact.phoneHref}
            />
            <InfoCard
              icon={Mail}
              title="אימייל"
              lines={[siteConfig.contact.email]}
              href={`mailto:${siteConfig.contact.email}`}
            />
            <a
              href={whatsappLink(`שלום ${siteConfig.name} 🙂`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <MessageCircle size={22} />
              </span>
              <div>
                <p className="font-medium">וואטסאפ</p>
                <p className="text-sm text-white/85">לחצי לשיחה מיידית</p>
              </div>
            </a>

            <div className="rounded-2xl border border-warmgray-100 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 font-medium text-warmgray-900">
                <Clock size={18} className="text-champagne-600" />
                שעות פעילות
              </div>
              <ul className="space-y-2 text-sm text-warmgray-600">
                {siteConfig.contact.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span className="font-medium text-warmgray-800">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>

      {/* Map placeholder */}
      <Reveal className="mt-10 overflow-hidden rounded-3xl">
        <div className="relative flex h-72 items-center justify-center bg-cream">
          <div className="text-center">
            <MapPin size={36} className="mx-auto text-champagne-500" />
            <p className="mt-3 font-serif text-lg text-warmgray-700">
              {siteConfig.contact.address}
            </p>
            <p className="mt-1 text-sm text-warmgray-500">
              מפה אינטראקטיבית תשולב כאן בעת העלייה לאוויר
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-warmgray-100 bg-white p-5 transition-colors hover:border-champagne-300">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush-100 text-champagne-600">
        <Icon size={22} />
      </span>
      <div>
        <p className="font-medium text-warmgray-900">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-warmgray-600">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
