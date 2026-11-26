import { Plus } from "lucide-react";

/** Accordion FAQ with native <details>: works without JavaScript and is fully indexable. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl text-emerald [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-teal-deep transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-6 text-lg leading-relaxed text-forest/75">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
