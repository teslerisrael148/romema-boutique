"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, CreditCard, Store, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { shippingMethods } from "@/lib/config";
import { cn, formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { OrderSummary } from "@/components/cart/OrderSummary";

const shippingIcons = { courier: Truck, registered: Truck, pickup: Store } as const;

export function CheckoutView() {
  const { lines, shippingMethod, setShippingMethodId, clear, total, freeShippingEligible } =
    useCart();
  const [placed, setPlaced] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notes, setNotes] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    // TODO: לחבר לספק סליקה (Stripe / CardCom / Tranzila) בעת מעבר לייצור.
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg rounded-3xl bg-blush-50 p-12 text-center"
      >
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-champagne-500 text-white">
          <Check size={40} />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-bold ">
          תודה על הזמנתך! 💕
        </h2>
        <p className="mt-3 text-warmgray-600">
          ההזמנה התקבלה בהצלחה. שלחנו אישור למייל שלך, וניצור קשר בקרוב לתיאום
          המשלוח.
        </p>
        <Link href="/shop" className="btn-gold mt-8">
          להמשך קנייה
        </Link>
      </motion.div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-warmgray-200 py-24 text-center">
        <p className="font-serif text-2xl text-warmgray-700">הסל ריק</p>
        <p className="mt-2 text-warmgray-500">לא ניתן להמשיך לתשלום</p>
        <Link href="/shop" className="btn-gold mt-7">
          למעבר לחנות
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="grid gap-10 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        {/* Contact */}
        <Section step={1} title="פרטי התקשרות">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="שם מלא" required placeholder="השם שלך" />
            <Input label="טלפון" type="tel" required placeholder="050-0000000" />
            <Input
              label="אימייל"
              type="email"
              required
              placeholder="name@email.com"
              className="sm:col-span-2"
            />
          </div>
        </Section>

        {/* Shipping method */}
        <Section step={2} title="אופן קבלת ההזמנה">
          <div className="space-y-3">
            {shippingMethods.map((method) => {
              const Icon = shippingIcons[method.id];
              const active = shippingMethod.id === method.id;
              return (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setShippingMethodId(method.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition-all",
                    active
                      ? "border-champagne-400 bg-champagne-50"
                      : "border-warmgray-200 bg-white hover:border-warmgray-300",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      active
                        ? "border-champagne-500 bg-champagne-500"
                        : "border-warmgray-300",
                    )}
                  >
                    {active ? (
                      <Check size={12} className="text-white" />
                    ) : null}
                  </span>
                  <Icon size={22} className="shrink-0 text-warmgray-500" />
                  <span className="flex-1">
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-warmgray-900">
                        {method.name}
                      </span>
                      <span className="font-medium text-warmgray-900">
                        {method.price === 0 || freeShippingEligible
                          ? "חינם"
                          : formatPrice(method.price)}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center justify-between text-sm text-warmgray-500">
                      <span>{method.description}</span>
                      <span>{method.estimate}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Payment (UI only) */}
        <Section step={3} title="פרטי תשלום">
          <div className="rounded-2xl border border-warmgray-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-warmgray-600">
              <CreditCard size={18} className="text-champagne-600" />
              תשלום מאובטח בכרטיס אשראי
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="מספר כרטיס"
                placeholder="0000 0000 0000 0000"
                className="sm:col-span-2"
              />
              <Input label="תוקף" placeholder="MM/YY" />
              <Input label="CVV" placeholder="123" />
            </div>
            <p className="mt-3 text-xs text-warmgray-400">
              * ממשק לדוגמה. הסליקה האמיתית תחובר לספק (Stripe / CardCom / Tranzila)
              בעת העלייה לאוויר.
            </p>
          </div>
        </Section>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-28">
          <OrderSummary>
            <Textarea
              label="הערות"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="הערות מיוחדות, בקשות לאריזה, זמן מועדף למשלוח וכו'"
              className="mb-4"
            />
            <label className="mb-4 flex cursor-pointer items-start gap-3 text-right text-sm leading-relaxed text-warmgray-600">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-warmgray-300 text-champagne-600 focus:ring-champagne-400"
              />
              <span>
                קראתי ואני מסכימ/ה ל
                <Link
                  href="/faq?from=/checkout"
                  className="mx-1 font-medium text-champagne-700 underline underline-offset-2 hover:text-champagne-800"
                >
                  תנאי השימוש
                </Link>
                של האתר
              </span>
            </label>
            <button
              type="submit"
              disabled={!termsAccepted}
              className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              לתשלום {formatPrice(total)}
            </button>
          </OrderSummary>

          {/* Mini items list */}
          <div className="mt-5 rounded-3xl border border-warmgray-100 bg-white p-5">
            <p className="mb-3 text-sm font-medium text-warmgray-800">
              פריטים בהזמנה
            </p>
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={`${line.productId}-${line.variantId}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <ProductImage
                      seed={line.product.slug}
                      className="h-14 w-12"
                    />
                    <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-warmgray-900 text-[10px] font-bold text-white">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-warmgray-900">
                      {line.product.name}
                    </p>
                    <p className="text-xs text-warmgray-500">
                      {line.variantName}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-warmgray-900">
                    {formatPrice(line.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-warmgray-100 bg-white p-6 shadow-card">
      <h2 className="mb-5 flex items-center gap-3 font-serif text-xl font-semibold ">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warmgray-900 text-sm text-ivory">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Input({
  label,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-warmgray-800">
        {label}
        {required ? <span className="text-blush-500"> *</span> : null}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-warmgray-200 bg-ivory px-4 py-2.5 text-sm outline-none transition-colors focus:border-champagne-400"
      />
    </label>
  );
}

function Textarea({
  label,
  required,
  placeholder,
  className,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-warmgray-800">
        {label}
        {required ? <span className="text-blush-500"> *</span> : null}
      </span>
      <textarea
        rows={3}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full resize-y rounded-xl border border-warmgray-200 bg-ivory px-4 py-2.5 text-sm outline-none transition-colors focus:border-champagne-400"
      />
    </label>
  );
}
