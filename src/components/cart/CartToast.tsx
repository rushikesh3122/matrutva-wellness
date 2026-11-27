"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

/** Short notice at the top of the screen, e.g. "We only have 2 pieces left at the moment". */
export function CartToast() {
  const { notice } = useCart();
  const [visible, setVisible] = useState<number | null>(null);

  useEffect(() => {
    if (!notice) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- show each new notice
    setVisible(notice.id);
    const t = window.setTimeout(() => setVisible(null), 3200);
    return () => window.clearTimeout(t);
  }, [notice]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-[70] flex justify-center px-4">
      {notice && visible === notice.id && (
        <p
          key={notice.id}
          className={cn("animate-fade-up flex max-w-md items-center gap-3 rounded-2xl bg-forest px-5 py-3.5 text-sm font-medium text-ivory shadow-lift sm:text-base")}
        >
          <Info className="size-5 shrink-0 text-gold-light" aria-hidden />
          {notice.text}
        </p>
      )}
    </div>
  );
}
