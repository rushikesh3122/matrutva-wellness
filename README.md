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
  icon.svg                     favicon (peacock mark)
  images/products/             product images (placeholders cropped from brand board)
src/
  app/
    globals.css                brand colours, fonts, breakpoints, utilities (Tailwind @theme)
    layout.tsx                 fonts + Header + Footer for every page
    page.tsx                   temporary home placeholder
    style-guide/page.tsx       preview of every brand component
    not-found.tsx              branded "coming soon" page
  components/
    brand/   Logo, LogoMark (SVG), FeatherWave
    layout/  Header, Navigation, MobileMenu, Footer, NewsletterForm
    ui/      Button, Container, SectionHeading
    product/ ProductCard
  data/products.ts             sample product data
  lib/site.ts                  brand info + navigation links
  lib/utils.ts                 cn() class helper, formatPrice()
  types/product.ts             Product type
```

## Brand tokens

| Token            | Hex       | Tailwind class      |
| ---------------- | --------- | ------------------- |
| Emerald Green    | `#003D32` | `bg-emerald`        |
| Peacock Teal     | `#006B70` | `text-teal`         |
| Muted Gold       | `#C9A66A` | `text-gold`         |
| Warm Ivory       | `#F6F0E4` | `bg-ivory`          |
| Dark Forest      | `#173B32` | `bg-forest`         |

Fonts: Cinzel (`font-display`), Cormorant Garamond (`font-serif`), Jost (`font-sans`), Tiro Devanagari Marathi (`font-devanagari`).
Extra breakpoints: `xs` 480px and `3xl` 1920px, on top of Tailwind's defaults.
