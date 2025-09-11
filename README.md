# Big Lou's Bakery – Next.js + Square + Sanity Starter

This is a minimal starter that pulls **products from Square**, creates **Square Payment Links** for checkout,
and leaves room for **Sanity**-powered content pages.

## Quick start
1) `cp .env.example .env.local` and fill values:
- `SQUARE_ACCESS_TOKEN` (Sandbox for testing)
- `SQUARE_LOCATION_ID`
- `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- (Optional) `SANITY_PROJECT_ID` + `SANITY_DATASET`

2) `npm install`
3) `npm run dev`

## Setup Checklist (What to do)
- Install Node 18.17+ (Node 20 LTS recommended) and npm.
- Copy envs: `cp .env.example .env.local`.
- For demo/local without credentials: leave placeholders — the app uses safe mock data for products and Instagram.
- When ready to go live, set at least:
  - `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `SQUARE_ENVIRONMENT`
  - `NEXT_PUBLIC_BASE_URL` (your site URL)
  - Optional Sanity: `SANITY_PROJECT_ID`, `SANITY_DATASET` (and `SANITY_API_READ_TOKEN` only for preview)
- Run: `npm install && npm run dev` then open `http://localhost:3000`.
- Health checks (no secrets in responses): `/api/envdebug`, `/api/squarehealth`, `/api/sanityhealth`.

### Navigation (when Sanity is not configured)
- If Sanity env vars are missing, the navbar shows a default set of links: Shop, About, FAQ.
- If you configure Sanity later, navigation switches to your CMS‑defined links/pages automatically.

## Square setup
- Add products in **Square Dashboard → Items**. Variations/prices appear automatically.
- Shipping & Local Pickup are configured in Square. The checkout page will handle addresses.
- The product page includes a "Pickup note" field (stored on the line item).

## Sanity (optional)
- If you want editable About/FAQ/Hours, run `npm create sanity@latest` and add your schemas.
- Put credentials in `.env.local` and query with `lib/sanity.ts`.

### Example Sanity Schemas
Add these in your Sanity Studio (e.g., `schemas/page.ts` and `schemas/faqItem.ts`) and include them in your schema export.

page.ts
```ts
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'content', type: 'text' },
    { name: 'image', type: 'image', options: { hotspot: true } },
  ],
};
```

faqItem.ts
```ts
export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    { name: 'order', type: 'number' },
    { name: 'question', type: 'string', validation: (r: any) => r.required() },
    { name: 'answer', type: 'text' },
  ],
};
```

This repo already includes optional pages that query Sanity if configured:
- `app/about/page.tsx` – uses `getPage('about')` with a graceful fallback
- `app/faq/page.tsx` – uses `getFaq()` with a graceful fallback
- `app/thanks/page.tsx` – Square redirect target

Set these env vars when using Sanity (public datasets recommended for read-only):
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`

### Sanity Health Check
- Endpoint: `GET /api/sanityhealth` returns a small JSON diagnostic (no secrets).

### Square Health Check
- Endpoint: `GET /api/squarehealth` validates env vars and attempts a minimal API call
  - Shows if access token is present, selected environment (sandbox/production), and whether a fetch succeeds.
 - Also returns number of locations and a sample catalog item id if available.

## Colors (pulled from logo)
- brand: #12332e
- accent: #cac2b0
- cream:  #e9e7e2
- ink:    #1f2937

Adjust or add shades in `tailwind.config.js`.

## Deployment / Env Setup
- Production env vars (host settings, e.g., Vercel → Project Settings → Environment Variables):
  - `SQUARE_ACCESS_TOKEN` (Production)
  - `SQUARE_LOCATION_ID` (Production)
  - `SQUARE_ENVIRONMENT=production`
  - `NEXT_PUBLIC_BASE_URL=https://your-domain.com`
  - (Optional Sanity) `SANITY_PROJECT_ID`, `SANITY_DATASET`, and a read token only if using preview
- Preview/Dev env vars:
  - Use Sandbox values for Square (`SQUARE_ENVIRONMENT=sandbox`)
  - `NEXT_PUBLIC_BASE_URL` can be your local URL or deployed preview URL
- Studio preview:
  - Choose a `SANITY_PREVIEW_SECRET` (random string). Do not embed real secrets into a public Studio build; you can paste it in the Preview Pane (it persists to localStorage).
- Image domains:
  - Production Square images are allowed via `next.config.js` (both sandbox and production buckets configured).
- Safety:
  - `.env.local` is git‑ignored. Avoid committing a plain `.env` file; this repo now also ignores `.env`.

## License and Assets
- Code: MIT license (see `LICENSE`).
- Images/brand assets: Provided for demo only and remain the property of their respective owners; not licensed for reuse or redistribution.

## Image Optimization (Optional)
- One-time local optimization for assets in `public/`:
  1) Install tool: `npm i -D sharp`
  2) Run: `npm run img:optimize`
  3) Outputs optimized AVIF/WebP variants to `public/optimized/<width>/...`
- Next.js built-in optimization is enabled (AVIF/WebP). For remote images (Square/Sanity/Unsplash), Next serves optimized formats at the right sizes.
- Tips:
  - Prefer using `next/image` with accurate `sizes` hints for best clarity.
  - Static assets: swap to optimized variants if you want smaller payloads.
