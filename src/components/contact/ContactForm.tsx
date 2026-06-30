"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const WHATSAPP_PHONE = "972533454205";

export function ContactForm() {
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

    const { name, phone, email, subject, message } = form;

    const text = `שלום! השארתי פרטים בטופס יצירת הקשר באתר. הנה הפרטים שלי:
👤 שם: ${name}
📞 טלפון: ${phone}
📧 אימייל: ${email}
📌 נושא: ${subject}
💬 הודעה: ${message}`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

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
