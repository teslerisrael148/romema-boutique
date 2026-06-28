import type { Metadata } from "next";
import { Instagram } from "lucide-react";
import { gradientFor } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { GalleryItem } from "@/components/gallery/GalleryItem";

export const metadata: Metadata = {
  title: "גלריה",
  description:
    "גלריית סטייל ולייפסטייל של רוממה — השראה, סטיילינג ורגעים יפים מהקהילה שלנו.",
};

const galleryItems = [
  { id: "g1", caption: "אורורה בשמפניה", tall: true },
  { id: "g2", caption: "סטייל שבת" },
  { id: "g3", caption: "ערב חגיגי" },
  { id: "g4", caption: "בובואי צרפתי", tall: true },
  { id: "g5", caption: "גוונים רכים" },
  { id: "g6", caption: "מאחורי הקלעים" },
  { id: "g7", caption: "קולקציית חורף", tall: true },
  { id: "g8", caption: "פרטים קטנים" },
  { id: "g9", caption: "יום בבוטיק" },
  { id: "g10", caption: "כלה ביום חתונתה" },
  { id: "g11", caption: "מטפחת קטיפה", tall: true },
  { id: "g12", caption: "רגע של נחת" },
];

export default function GalleryPage() {
  return (
    <div className="container-lux py-12 sm:py-16">
      <header className="mb-12 text-center">
        <Reveal>
          <p className="label-overline mb-3">גלריה</p>
          <h1 className="font-serif text-4xl font-bold  sm:text-5xl">
            רגעים של יופי
          </h1>
          <div className="divider-gold mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-warmgray-600">
            הצצה לעולם של רוממה — סטיילינג, השראה ורגעים יפים מהקהילה שלנו. תייגו
            אותנו ב-{` `}
            <span className="font-medium text-champagne-700">
              @{siteConfig.social.instagramHandle}
            </span>
          </p>
        </Reveal>
      </header>

      <StaggerGroup className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {galleryItems.map((item, i) => (
          <GalleryItem
            key={item.id}
            caption={item.caption}
            gradient={gradientFor(item.id, i)}
            tall={item.tall}
          />
        ))}
      </StaggerGroup>

      <div className="mt-14 text-center">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          <Instagram size={18} />
          לעוד השראה באינסטגרם
        </a>
      </div>
    </div>
  );
}
