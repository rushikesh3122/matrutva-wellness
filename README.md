# Matrutva Wellness — Website

Premium spirulina & wellness e-commerce site for **MATRUTVA WELLNESS** (मातृवत् पोषणम्).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React and Framer Motion.
No payment gateway is integrated.

## Requirements

- Node.js **20.9 or newer** (check with `node -v`)
- npm (comes with Node.js)
- Fonts are bundled in `src/fonts/`, so no font downloads are needed to run the site

## Run it in VS Code

```bash
# 1. open the unzipped folder in VS Code, then in the terminal (Ctrl + `):
npm install

# 2. start the development server
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/style-guide

After pulling new changes, run `npm install` only if `package.json` or `package-lock.json` changed. Otherwise `npm run dev` is enough.

## Faster `npm install` and `npm run dev` on Windows

The first `npm run dev` compiles the site and saves a cache in `.next/`. Later runs reuse it and start much faster, so don't delete `.next/` unless something breaks. The first page you open after starting also takes a few seconds while it compiles.

Most of the remaining slowness on Windows comes from the PC scanning or syncing thousands of small files in `node_modules/` and `.next/`:

1. **Exclude the project folder from Windows Defender.** Open Windows Security, go to Virus & threat protection, then Manage settings, then Exclusions, and add the project folder. This is usually the biggest win for both install and dev start.
2. **Keep the project out of OneDrive.** Folders like Desktop and Documents are often synced by OneDrive. Move the project to a plain folder such as `C:\dev\matrutva-wellness`.
3. **Use Node.js 22 LTS** from nodejs.org. Newer Node versions install and run faster.
4. **Use `npm ci` for a clean reinstall.** It is faster than `npm install` when `node_modules` is missing or broken.
5. Close other heavy apps while the first compile runs. VS Code's own file watcher is fine.

The project's `.npmrc` already turns off npm's audit and funding checks during install, which saves a few network round trips.

## Other commands

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `npm run dev`    | Development server with hot reload        |
| `npm run build`  | Production build (checks types too)       |
| `npm start`      | Serve the production build (after build)  |
| `npm run lint`   | Lint the code with ESLint                 |

## Folder structure

```
public/
  brand/                       logo files: full logo (SVG/PNG), emblem, gold emblem, favicon
  images/products/             product images (placeholders cropped from the brand board)
src/
  app/
    globals.css                design tokens: colours, type scale, widths, radii, breakpoints
    layout.tsx                 fonts, SEO metadata, providers, Header + Footer
    page.tsx                   temporary home placeholder (Stage 3 builds the real homepage)
    style-guide/page.tsx       live preview of the whole design system
    not-found.tsx              branded "coming soon" page
    icon.svg, favicon.ico, apple-icon.png, opengraph-image.jpg
    robots.ts, sitemap.ts, manifest.ts
  components/
    brand/      BrandLogo, LogoMark (SVG emblem), FeatherWave
    layout/     AnnouncementBar, Header, DesktopNavigation, MobileNavigation, SearchOverlay, Footer
    ui/         Button (+ PrimaryButton, SecondaryButton), Container, Section, SectionHeading,
                NewsletterForm, SocialIcons
    product/    ProductCard
    sections/   NewsletterSection
    providers/  MotionProvider (lightweight Framer Motion)
    seo/        JsonLd (structured data)
  context/CartContext.tsx      front-end cart (saved in the browser, no payment gateway)
  data/products.ts             sample product data
  hooks/useLockBody.ts         scroll lock + Escape key for drawers
  lib/site.ts                  brand info, navigation, footer links, announcements
  lib/seo.ts                   site URL + structured data
  lib/utils.ts                 cn(), formatPrice(), isActivePath()
  types/product.ts             Product type
```

## Design tokens

| Colour          | Hex       | Class             | Use                                        |
| --------------- | --------- | ----------------- | ------------------------------------------ |
| Deep Green      | `#123324` | `emerald`         | headings, dark sections, Order button      |
| Peacock Teal    | `#1F8A80` | `teal`            | large accents (hero "Nothing else.")       |
| Teal (text)     | `#176B63` | `teal-deep`       | small teal text, teal buttons (AA)         |
| Saffron         | `#E7A53A` | `gold`            | numerals, Devanagari, turmeric button      |
| Moss            | `#2C6244` | `moss`            | moringa accent                             |
| Terracotta      | `#A4532A` | `terracotta-deep` | fruit & veg accent                         |
| Aqua            | `#37C6B6` | `aqua`            | highlight on deep green                    |
| Warm Ivory      | `#F7F5EF` | `ivory`           | page background                            |
| Ink             | `#0C2419` | `forest`          | body text                                  |

Fonts (bundled in `src/fonts/`): **Kalnia** for headings and numbers, **Figtree** for body text, **DM Mono** for small capitals labels, **Tiro Devanagari Marathi** for मातृवत् पोषणम्, and **Cinzel** only for the MATRUTVA wordmark.

- **Type:** Cinzel (`font-display`, headings), Cormorant Garamond (`font-serif`, accents), Jost (`font-sans`, body), Tiro Devanagari Marathi (`font-devanagari`).
  Sizes: `text-display`, `text-h1` … `text-h4`, `text-lead`, `text-body`, `text-caption`, `text-label`.
- **Spacing:** `section-y` / `section-y-sm` or `<Section>`; `<Container size="narrow | content | wide">` (768 / 1280 / 1536px).
- **Corners:** `rounded-card` (24px), `rounded-panel` (32px), `rounded-full` for buttons.
- **Breakpoints:** `xs` 480, `sm` 640, `md` 768, `lg` 1024, `xl` 1280 (desktop nav), `2xl` 1536, `3xl` 1920.

## Before going live

Create `.env.local` (or set it in your hosting dashboard):

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

This is used for canonical URLs, the sitemap and social-media previews.
