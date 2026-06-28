"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </WishlistProvider>
  );
}
