import type { Product } from "@/types/product";

/** Label details in the Figma style: usage, ingredients, a nutrition table, storage and warnings. */
export function LabelDetails({ label }: { label: NonNullable<Product["label"]> }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-figure border border-forest/10 bg-forest/10 md:grid-cols-2">
      <div className="bg-ivory p-7 sm:p-9">
        <h3 className="eyebrow text-teal-deep">Suggested use</h3>
        <p className="mt-3 text-lg leading-relaxed text-forest/80">{label.usage}</p>
        <h3 className="eyebrow mt-8 text-teal-deep">Ingredients</h3>
        <p className="mt-3 font-display text-2xl text-emerald">{label.ingredients}</p>
      </div>
      <div className="bg-ivory p-7 sm:p-9">
        <table className="w-full text-left">
          <caption className="eyebrow pb-3 text-left text-teal-deep">{label.nutritionTitle}</caption>
          <tbody className="divide-y divide-forest/10">
            {label.nutrition.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="py-3 font-normal text-forest/75">
                  {row.label}
                </th>
                <td className="py-3 text-right font-display text-xl text-emerald">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-ivory p-7 sm:p-9">
        <h3 className="eyebrow text-teal-deep">Storage</h3>
        <p className="mt-3 leading-relaxed text-forest/80">{label.storage}</p>
      </div>
      <div className="bg-ivory p-7 sm:p-9">
        <h3 className="eyebrow text-terracotta-deep">Please note</h3>
        <ul className="mt-3 space-y-1 leading-relaxed text-forest/80">
          {label.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
