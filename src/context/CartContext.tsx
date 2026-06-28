"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Coupon, Product, ShippingMethod } from "@/lib/types";
import { products } from "@/data/products";
import { coupons, shippingMethods, siteConfig } from "@/lib/config";

const STORAGE_KEY = "romema_cart_v1";

interface StoredCart {
  items: CartItem[];
  appliedCoupon?: string | null;
  shippingId?: ShippingMethod["id"];
}

export interface CartLine extends CartItem {
  product: Product;
  variantName: string;
  lineTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  shippingMethod: ShippingMethod;
  shippingCost: number;
  total: number;
  appliedCoupon: Coupon | null;
  freeShippingEligible: boolean;
  addItem: (
    productId: string,
    variantId: string,
    quantity?: number,
    options?: { openDrawer?: boolean },
  ) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  setShippingMethodId: (id: ShippingMethod["id"]) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const candidate = item as CartItem;
  return (
    typeof candidate.productId === "string" &&
    typeof candidate.variantId === "string" &&
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0
  );
}

function parseStoredCart(raw: string): StoredCart {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return { items: parsed.filter(isValidCartItem) };
    }

    if (parsed && typeof parsed === "object" && "items" in parsed) {
      const stored = parsed as StoredCart;
      const items = Array.isArray(stored.items)
        ? stored.items.filter(isValidCartItem)
        : [];
      const shippingId = shippingMethods.some((m) => m.id === stored.shippingId)
        ? stored.shippingId
        : undefined;
      const appliedCoupon =
        typeof stored.appliedCoupon === "string" ? stored.appliedCoupon : null;

      return { items, shippingId, appliedCoupon };
    }
  } catch {
    /* ignore */
  }

  return { items: [] };
}

function pruneInvalidItems(items: CartItem[]): CartItem[] {
  return items.filter((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return false;
    return product.variants.some((v) => v.id === item.variantId);
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingId, setShippingId] = useState<ShippingMethod["id"]>("courier");
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = parseStoredCart(raw);
        setItems(pruneInvalidItems(stored.items));

        if (stored.shippingId) {
          setShippingId(stored.shippingId);
        }

        if (stored.appliedCoupon) {
          const found = coupons.find(
            (c) => c.code.toLowerCase() === stored.appliedCoupon!.toLowerCase(),
          );
          if (found) setAppliedCoupon(found);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: StoredCart = {
        items,
        shippingId,
        appliedCoupon: appliedCoupon?.code ?? null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore */
    }
  }, [items, shippingId, appliedCoupon, hydrated]);

  const addItem = useCallback(
    (
      productId: string,
      variantId: string,
      quantity = 1,
      options?: { openDrawer?: boolean },
    ) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.variantId === variantId,
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { productId, variantId, quantity }];
      });
      if (options?.openDrawer !== false) {
        setOpen(true);
      }
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter(
              (i) => !(i.productId === productId && i.variantId === variantId),
            )
          : prev.map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, quantity }
                : i,
            ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId),
      ),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const found = coupons.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase(),
    );
    if (!found) {
      return { ok: false, message: "קוד הקופון אינו תקף" };
    }
    setAppliedCoupon(found);
    return { ok: true, message: `הקופון הופעל — ${found.percentOff}% הנחה` };
  }, []);

  const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

  const lines: CartLine[] = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant) return null;
        return {
          ...item,
          product,
          variantName: variant.name,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((l): l is CartLine => l !== null);
  }, [items]);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines],
  );

  const discount = useMemo(
    () =>
      appliedCoupon ? Math.round((subtotal * appliedCoupon.percentOff) / 100) : 0,
    [appliedCoupon, subtotal],
  );

  const shippingMethod = useMemo(
    () => shippingMethods.find((m) => m.id === shippingId) ?? shippingMethods[0],
    [shippingId],
  );

  const freeShippingEligible =
    subtotal >= siteConfig.shipping.freeShippingThreshold;

  const shippingCost = useMemo(() => {
    if (shippingMethod.id === "pickup") return 0;
    if (freeShippingEligible) return 0;
    return shippingMethod.price;
  }, [shippingMethod, freeShippingEligible]);

  const total = Math.max(0, subtotal - discount) + shippingCost;

  const value: CartContextValue = {
    items,
    lines,
    count,
    subtotal,
    discount,
    shippingMethod,
    shippingCost,
    total,
    appliedCoupon,
    freeShippingEligible,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    applyCoupon,
    removeCoupon,
    setShippingMethodId: setShippingId,
    isOpen,
    setOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
