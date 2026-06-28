import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "הסיפור שלי",
  description:
    "הסיפור האישי של רומי הודיה — רוממה, מותג יוקרה לכיסויי ראש שנולד מתוך נשיות, עוצמה ואמונה.",
};

const storyParagraphs = [
  "מגיל צעיר הרגשתי חיבור לעולם של רוח, משמעות ורוממות.",
  "שמי הוא רומי הודיה, ובמשך השנים רבים קראו לי 'רוממה' ככינוי אוהב.",
  "עם הזמן הבנתי שרוממה היא הרבה יותר מכינוי – היא חלק ממי שאני.",
  "היא מסמלת עבורי נשיות, עוצמה, אמונה והיכולת להתרומם בכל שלב בחיים.",
  "מתוך המקום הזה נולד המותג ROMEMA.",
  "לא רק כמותג לכיסויי ראש, אלא כדרך להעביר תחושה של יופי, כבוד ורוממות לכל אישה.",
  "כי רוממה היא לא רק שם.",
  "זו דרך, זו תחושה, וזו תזכורת יומיומית להרים את הראש בגאווה ולהאיר את האור שבך. ✨🤍👑",
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-blush-fade py-20 sm:py-28">
        <div className="grain absolute inset-0" />
        <div className="container-lux relative z-10 text-center">
          <Reveal>
            <p className="label-overline mb-3">הסיפור שלי</p>
            <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              ROMEMA
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-lux py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-right">
          <Reveal>
            <div className="space-y-6 leading-relaxed text-warmgray-600 sm:text-lg">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
