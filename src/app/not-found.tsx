import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lux flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-[120px] font-bold leading-none text-champagne-300">
        404
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold ">
        העמוד לא נמצא
      </h1>
      <p className="mt-3 max-w-md text-warmgray-600">
        מצטערות, העמוד שחיפשת אינו קיים או שהוסר. בואי נחזור לדברים היפים.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold">
          חזרה לדף הבית
        </Link>
        <Link href="/shop" className="btn-outline">
          למעבר לחנות
        </Link>
      </div>
    </div>
  );
}
