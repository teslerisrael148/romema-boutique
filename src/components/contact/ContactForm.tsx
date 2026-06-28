"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: לחבר ל-API route / Supabase / שירות מיילים בעת מעבר לייצור.
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl bg-blush-50 p-12 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne-500 text-white">
          <Check size={30} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold ">
          ההודעה נשלחה בהצלחה!
        </h3>
        <p className="mt-2 text-warmgray-600">
          תודה שפנית אלינו {form.name}. נחזור אלייך בהקדם האפשרי 💕
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-warmgray-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="שם מלא" required>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="input-lux"
            placeholder="השם שלך"
          />
        </Field>
        <Field label="טלפון">
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className="input-lux"
            placeholder="050-0000000"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="אימייל" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className="input-lux"
            placeholder="name@email.com"
          />
        </Field>
        <Field label="נושא">
          <input
            value={form.subject}
            onChange={update("subject")}
            className="input-lux"
            placeholder="במה נוכל לעזור?"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="הודעה" required>
          <textarea
            required
            value={form.message}
            onChange={update("message")}
            rows={5}
            className="input-lux resize-none"
            placeholder="כתבי לנו כאן..."
          />
        </Field>
      </div>

      <button type="submit" className="btn-gold mt-6 w-full sm:w-auto">
        <Send size={18} />
        שליחת הודעה
      </button>

      <style jsx>{`
        :global(.input-lux) {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #d8d3cc;
          background: #fdfbf6;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        :global(.input-lux:focus) {
          border-color: #d2a865;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-warmgray-800">
        {label}
        {required ? <span className="text-blush-500"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
