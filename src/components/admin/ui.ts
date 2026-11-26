export const inputCls =
  "h-11 w-full rounded-xl border border-forest/20 bg-white px-3 text-forest focus:border-teal-deep focus:ring-2 focus:ring-teal-deep/20 focus:outline-none";
export const btnCls =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-teal-deep px-5 text-sm font-medium text-ivory transition-colors hover:bg-emerald disabled:opacity-50";
export const ghostCls =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest/20 px-5 text-sm font-medium text-emerald transition-colors hover:bg-white disabled:opacity-50";

export const rupees = (n: number | null | undefined) =>
  n === null || n === undefined ? "—" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
