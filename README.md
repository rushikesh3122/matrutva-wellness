# Matrutva Wellness — Website

Premium spirulina & wellness e-commerce site for **MATRUTVA WELLNESS** (मातृवत् पोषणम्).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React and Framer Motion.
No payment gateway is integrated.

## Requirements

- Node.js **20.9 or newer** (check with `node -v`)
- npm (comes with Node.js)
- Internet connection on first run (Google Fonts are downloaded by Next.js)

## Run it in VS Code

```bash
# 1. open the unzipped folder in VS Code, then in the terminal (Ctrl + `):
npm install

# 2. start the development server
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/style-guide

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

| Colour          | Hex       | Class            | Use                                         |
| --------------- | --------- | ---------------- | ------------------------------------------- |
| Primary Emerald | `#003D32` | `emerald`        | primary buttons, footer, headings           |
| Peacock Teal    | `#006B70` | `teal`           | labels, links, accents                      |
| Muted Gold      | `#C9A66A` | `gold`           | lines, icons, logo, text on dark            |
| Deep Gold       | `#7D5F28` | `gold-deep`      | gold text on light backgrounds (accessible) |
| Warm Ivory      | `#F6F0E4` | `ivory`          | page background                             |
| Light Sage      | `#E5EBDD` | `sage`           | soft section background                     |
| Dark Forest     | `#173B32` | `forest`         | body text                                   |
| White           | `#FFFFFF` | `white`          | cards                                       |

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
