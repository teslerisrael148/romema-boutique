"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function OrderSummary({
  showCouponInput = true,
  children,
}: {
  showCouponInput?: boolean;
  children?: React.ReactNode;
}) {
  const {
    subtotal,
    discount,
    shippingCost,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingMethod,
  } = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const handleApply = () => {
    if (!code.trim()) return;
    const result = applyCoupon(code);
    setFeedback(result);
    if (result.ok) setCode("");
  };

  return (
    <div className="rounded-3xl border border-warmgray-100 bg-white p-6 shadow-card">
      <h2 className="font-serif text-xl font-semibold ">
        סיכום הזמנה
      </h2>

      {showCouponInput ? (
        <div className="mt-5">
          {appliedCoupon ? (
            <div className="flex items-center justify-between rounded-xl bg-blush-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <Tag size={15} className="text-champagne-600" />
                <span className="font-medium text-warmgray-800">
                  {appliedCoupon.code}
                </span>
                <span className="text-warmgray-500">
                  ({appliedCoupon.percentOff}% הנחה)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  removeCoupon();
                  setFeedback(null);
                }}
                aria-label="הסרת קופון"
                className="text-warmgray-400 hover:text-blush-500"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="קוד קופון"
                  className="flex-1 rounded-full border border-warmgray-200 bg-ivory px-4 py-2.5 text-sm outline-none focus:border-champagne-400"
                />
                <button
                  type="button"
                  onClick={handleApply}
                  className="btn-outline !px-5 !py-2.5"
                >
                  החל
                </button>
              </div>
              {feedback ? (
                <p
                  className={`mt-2 text-xs ${
                    feedback.ok ? "text-champagne-700" : "text-blush-600"
                  }`}
                >
                  {feedback.message}
                </p>
              ) : (
                <p className="mt-2 text-xs text-warmgray-400">
                  נסי: ROMEMA10 · WELCOME15
                </p>
              )}
            </>
          )}
        </div>
      ) : null}

      <dl className="mt-5 space-y-3 border-t border-warmgray-100 pt-5 text-sm">
        <Row label="סכום ביניים" value={formatPrice(subtotal)} />
        {discount > 0 ? (
          <Row
            label="הנחה"
            value={`-${formatPrice(discount)}`}
            accent="text-champagne-700"
          />
        ) : null}
        <Row
          label={`משלוח (${shippingMethod.name})`}
          value={shippingCost === 0 ? "חינם" : formatPrice(shippingCost)}
        />
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-warmgray-100 pt-5">
        <span className="font-medium text-warmgray-900">סך הכל לתשלום</span>
        <span className="font-serif text-2xl font-bold text-warmgray-900">
          {formatPrice(total)}
        </span>
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-warmgray-600">{label}</dt>
      <dd className={accent ?? "font-medium text-warmgray-900"}>{value}</dd>
    </div>
  );
}
