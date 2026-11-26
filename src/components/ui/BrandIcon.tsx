import {
  Droplets,
  Factory,
  FileText,
  FlaskConical,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
  Sprout,
  Sun,
  type LucideProps,
} from "lucide-react";

/** Maps the icon names used in content files to Lucide icons, so copy stays plain data. */
const icons = {
  leaf: Leaf,
  shield: ShieldCheck,
  flask: FlaskConical,
  sun: Sun,
  file: FileText,
  map: MapPin,
  droplets: Droplets,
  sprout: Sprout,
  factory: Factory,
  package: Package,
} as const;

export type BrandIconName = keyof typeof icons;

export function BrandIcon({ name, ...props }: { name: BrandIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.4} {...props} />;
}
