"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-lux flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-bold text-champagne-300">!</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold">משהו השתבש</h1>
      <p className="mt-3 max-w-md text-warmgray-600">
        אירעה שגיאה בטעינת העמוד. אפשר לנסות שוב או לחזור לדף הבית.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-gold">
          ניסיון נוסף
        </button>
        <Link href="/" className="btn-outline">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
