"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";

/**
 * Lightweight front-end cart (no payment gateway).
 * Saved in localStorage so the item count survives page reloads.
 * The full cart page and drawer are built in a later stage.
 */
export type CartItem = {
  id: string;
  slug: string;
  name: string;
  /** null while the product price is not announced */
  price: number | null;
  image?: string;
  quantity: number;
  /** Most that can be ordered (stock left), when stock is tracked. */
  max?: number;
};

/** Most of one product in a cart, whatever the stock. */
export const CART_LIMIT = 20;

/** Most of this product a customer can have in the cart. */
export const maxFor = (p: { maxQuantity?: number; max?: number }) => Math.min(CART_LIMIT, p.maxQuantity ?? p.max ?? CART_LIMIT);

type CartContextValue = {
  items: CartItem[];
  /** False until the saved cart has been read from localStorage. */
  ready: boolean;
  count: number;
  subtotal: number;
  /** Adds up to the stock left; returns how many were actually added (0 = already at the limit). */
  addItem: (product: Product, quantity?: number) => number;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  /** Records the stock left for an item and brings its quantity down to it. */
  setLimit: (id: string, max: number | undefined) => void;
  clear: () => void;
};

const STORAGE_KEY = "matrutva-cart-v2";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Read the saved cart after mount (avoids server/client mismatch).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      const max = maxFor(product);
      const inCart = items.find((i) => i.id === product.id)?.quantity ?? 0;
      const added = Math.max(0, Math.min(quantity, max - inCart));
      if (added === 0) return 0;
      setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: Math.min(max, i.quantity + added), max: product.maxQuantity } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0]?.src,
          quantity: added,
          max: product.maxQuantity,
        },
      ];
      });
      return added;
    },
    [items],
  );

  const removeItem = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, maxFor(i)) } : i)),
    );
  }, []);

  const setLimit = useCallback((id: string, max: number | undefined) => {
    setItems((prev) =>
      prev.some((i) => i.id === id && (i.max !== max || i.quantity > maxFor({ max })))
        ? prev.map((i) => (i.id === id ? { ...i, max, quantity: Math.min(i.quantity, maxFor({ max })) } : i)).filter((i) => i.quantity > 0)
        : prev,
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready: loaded,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + (i.price ?? 0) * i.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      setLimit,
      clear,
    }),
    [items, loaded, addItem, removeItem, updateQuantity, setLimit, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
