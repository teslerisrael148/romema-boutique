"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Newsletter({ variant = "light", className }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: לחבר לספק דיוור (Mailchimp / Supabase) בעת מעבר לייצור.
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  const dark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row",
          dark ? "" : "",
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="כתובת המייל שלך"
          aria-label="כתובת המייל שלך"
          className={cn(
            "flex-1 rounded-full px-5 py-3 text-sm outline-none transition-all",
            dark
              ? "bg-white/10 text-ivory placeholder:text-ivory/50 focus:bg-white/15"
              : "border border-warmgray-200 bg-white text-warmgray-800 placeholder:text-warmgray-400 focus:border-champagne-400",
          )}
        />
        <button type="submit" className="btn-gold whitespace-nowrap">
          {done ? (
            <>
              <Check size={16} /> נרשמת בהצלחה
            </>
          ) : (
            <>
              <Send size={16} /> הצטרפות למועדון
            </>
          )}
        </button>
      </div>
      {done ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "mt-3 text-sm",
            dark ? "text-champagne-200" : "text-champagne-700",
          )}
        >
          תודה שהצטרפת! מחכה לך 10% הנחה במייל הראשון ✨
        </motion.p>
      ) : null}
    </form>
  );
}
