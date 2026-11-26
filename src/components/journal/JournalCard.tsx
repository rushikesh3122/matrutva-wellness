import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { JournalPost } from "@/types/product";
import { Reveal } from "@/components/ui/Reveal";

export function JournalCard({ post, index = 0 }: { post: JournalPost; index?: number }) {
  const href = `/journal/${post.slug}`;
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-card border border-gold/20 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
        <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[16/10] overflow-hidden bg-sage">
          <Image
            src={post.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.15em] text-emerald uppercase backdrop-blur">
            {post.category}
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-caption text-forest/70">{post.readingTime}</p>
          <h3 className="mt-2 font-display text-h4 text-emerald">
            <Link href={href} className="transition-colors hover:text-teal">
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 text-caption text-forest/80">{post.excerpt}</p>
          <Link
            href={href}
            className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-medium tracking-[0.18em] text-teal uppercase transition-colors hover:text-emerald"
          >
            Read more <span className="sr-only">: {post.title}</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
