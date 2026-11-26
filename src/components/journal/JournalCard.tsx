import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";

/** Journal card in the Figma style: rounded image, mono meta line, Kalnia title. */
export function JournalCard({ post, index = 0 }: { post: JournalPost; index?: number }) {
  const href = `/journal/${post.slug}`;
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group flex h-full flex-col">
        <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden rounded-figure bg-white">
          <Image
            src={post.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </Link>
        <p className="eyebrow mt-6 text-[0.62rem] text-teal-deep">
          {post.category} · {post.readingTime}
        </p>
        <h2 className="mt-3 font-display text-2xl leading-snug text-emerald">
          <Link href={href} className="hover:text-teal-deep">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-forest/70">{post.excerpt}</p>
      </article>
    </Reveal>
  );
}
