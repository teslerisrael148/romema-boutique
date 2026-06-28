import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/config";
import { categories } from "@/data/categories";

const shopLinks = [
  { href: "/shop", label: "כל המוצרים" },
  { href: "/shop?sort=bestsellers", label: "המבוקשים ביותר" },
  { href: "/wishlist", label: "המועדפים שלי" },
];

const infoLinks = [
  { href: "/about", label: "הסיפור שלי" },
  { href: "/gallery", label: "גלריה" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "צור קשר" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-warmgray-900 text-ivory">
      <div className="grain absolute inset-0" />

      <div className="container-lux relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-serif text-3xl font-bold heading-rose">{siteConfig.name}</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/15 p-2.5 transition-colors hover:border-champagne-300 hover:text-champagne-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-white/15 p-2.5 transition-colors hover:border-champagne-300 hover:text-champagne-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-white/15 p-2.5 transition-colors hover:border-champagne-300 hover:text-champagne-300"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-champagne-300">
            קטגוריות
          </h4>
          <ul className="space-y-2.5 text-sm text-ivory/65">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="transition-colors hover:text-ivory"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop + Info */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-champagne-300">
            חנות
          </h4>
          <ul className="space-y-2.5 text-sm text-ivory/65">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
            {infoLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-champagne-300">
            יצירת קשר
          </h4>
          <ul className="space-y-3 text-sm text-ivory/65">
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-champagne-300" />
              <a href={siteConfig.contact.phoneHref} className="hover:text-ivory">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-champagne-300" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-ivory"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 text-xs text-ivory/50">
            {siteConfig.contact.hours.map((h) => (
              <p key={h.day}>{h.time}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.
          </p>
          <div className="flex gap-5">
            <Link href="/faq" className="hover:text-ivory/80">
              מדיניות משלוחים
            </Link>
            <Link href="/faq" className="hover:text-ivory/80">
              תקנון והחזרות
            </Link>
            <Link href="/contact" className="hover:text-ivory/80">
              צור קשר
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
